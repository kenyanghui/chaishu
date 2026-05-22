/**
 * 仓颉拆书管线 v2 — 拆页 → SKILL.md 自动生成
 *
 * v2 改进: 全面覆盖各种 RIA 内容格式，优先提取 How 和 A
 * - 支持 (**What)** / 【what】 / **What** 等所有格式变体
 * - 从 explains 全文提取编号步骤 (不限于【how】段)
 * - 提取 A1/A2/A3 交互内容
 * - 从 prologue/learnGoal 提取学习目标和方法名
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = resolve(ROOT, '.claude/skills')
if (!existsSync(SKILLS_DIR)) mkdirSync(SKILLS_DIR, { recursive: true })

// ─── Helpers ───

function slugify(text) {
  return text
    .replace(/[〔（【《\[].+?[〕）】》\]\]]/g, '')
    .replace(/^[\s-]+/, '').trim()
    .replace(/[\s　]+/g, '-')
    .replace(/[—–―·・]/g, '-')
    .replace(/[^a-zA-Z0-9一-鿿-]/g, '')
    .replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

function kebabify(level, topic, fallback) {
  const base = level.replace(/[\[\]]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const t = slugify(topic || fallback).slice(0, 40)
  return `${base}-${t}`.replace(/^-+/g, '')
}

function loadHotBooks() {
  const raw = readFileSync(resolve(ROOT, 'src/data/hotBooks.js'), 'utf-8')
  const start = raw.indexOf('const hotBooks = [')
  const end = raw.lastIndexOf(']')
  if (start < 0 || end < 0) throw new Error('Cannot parse hotBooks.js')
  return JSON.parse(raw.slice(start + 'const hotBooks = '.length, end + 1))
}

// ─── v2: Smart Explain Parser ───

/**
 * Extracts a section by trying multiple header formats.
 * Supports: 【what】/ (**What)** / **What** / What: / 【what-xxx】
 */
function extractSection(text, label) {
  if (!text) return ''
  const labelEsc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Priority 1: 【label】or 【label-xxx】
  const re1 = new RegExp(`【${labelEsc}[^】]*】\\s*([\\s\\S]*?)(?=\n\\s*【[^】]+】|\n\\s*\\*\\*\\(?[A-Z]|\n\\s*\\(\\*\\*[A-Z]|\n##|\n---|$)`, 'i')
  const m1 = text.match(re1)
  if (m1) return m1[1].trim()

  // Priority 2: (**Label)** or **Label**
  const re2 = new RegExp(`\\(?\\*\\*${labelEsc}\\*\\*\\)?\\s*[：:]?\\s*([\\s\\S]*?)(?=\n\\s*\\*\\*\\(?[A-Z]|\n\\s*【[^】]+】|\n##|\n---|$)`, 'i')
  const m2 = text.match(re2)
  if (m2) return m2[1].trim()

  // Priority 3: standalone Label: at start of line
  const re3 = new RegExp(`^${labelEsc}[：:]\\s*([\\s\\S]*?)(?=\n[A-Za-z一-鿿]+[：:]|\n##|\n---|$)`, 'im')
  const m3 = text.match(re3)
  if (m3) return m3[1].trim()

  return ''
}

/**
 * Extract numbered steps from ANY text, not just 【how】.
 * Looks for: 1. xxx / 1、xxx / 第一步：xxx / 关键词N / 编号列表
 */
function extractStepsFromAll(text) {
  if (!text) return []

  // Normalize line endings
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const steps = []

  // Pattern 1: Numbered lines like "1. xxx" or "1、xxx" or "1）xxx"
  for (const line of lines) {
    const m = line.match(/^(\d+)[.．、\)）]\s*(.{4,})/)
    if (m) {
      const step = m[2].replace(/\s+/g, ' ').trim()
      if (step.length > 4) steps.push(step)
    }
  }
  if (steps.length >= 2) return steps

  // Pattern 2: Chinese numbered like "第一步：xxx" or "步骤一：xxx"
  const cnNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  for (const line of lines) {
    for (let i = 0; i < cnNums.length; i++) {
      const re = new RegExp(`^第?${cnNums[i]}步[：:]\\s*(.{4,})`)
      const m = line.match(re)
      if (m) {
        const step = m[1].replace(/\s+/g, ' ').trim()
        if (step.length > 4 && !steps.includes(step)) steps.push(step)
      }
    }
  }
  if (steps.length >= 2) return steps

  // Pattern 3: Bullet points with action content
  const bullets = lines.filter(l => l.match(/^[•·\-—]\s(.{8,})/) && (l.includes('：') || l.includes(':') || l.includes('→') || l.includes('做')))
  if (bullets.length >= 2) {
    return bullets.map(l => l.replace(/^[•·\-—]\s*/, '').trim()).slice(0, 6)
  }

  // Pattern 4: LearnGoal mentions a method name with numbered steps
  return []
}

/**
 * Parse explains into What/Why/How/Where
 */
function parseExplains(text) {
  if (!text) return { what: '', why: '', how: '', where: '' }

  const result = {
    what: extractSection(text, 'what') || extractSection(text, 'What'),
    why: extractSection(text, 'why') || extractSection(text, 'Why'),
    how: extractSection(text, 'how') || extractSection(text, 'How'),
    where: extractSection(text, 'where') || extractSection(text, 'Where'),
  }

  // If no structured sections found, try to split by common markers
  if (!result.what && !result.why && !result.how) {
    // Try (What) / (Why) patterns used in some拆页
    const whatM = text.match(/\(\*?What\*?\)[：:]?\s*([\s\S]*?)(?=\n\s*\(\*?Why|$)/i)
    if (whatM) result.what = whatM[1].trim()
    const whyM = text.match(/\(\*?Why\*?\)[：:]?\s*([\s\S]*?)(?=\n\s*\(\*?How|$)/i)
    if (whyM) result.why = whyM[1].trim()
  }

  return result
}

/**
 * Extract steps - tries 【how】first, then full text scan
 */
function extractFinalSteps(explains, topic, learnGoal) {
  // First try structured How section
  const howText = extractSection(explains, 'how') || extractSection(explains, 'How')
  if (howText) {
    const steps = extractStepsFromAll(howText)
    if (steps.length >= 2) return steps
  }

  // Then try full explains text
  const allSteps = extractStepsFromAll(explains)
  if (allSteps.length >= 2) return allSteps

  // Infer from topic name if it contains step indicators
  const stepMatch = topic.match(/([三四五六七八九十])步[法势路]?/)
  if (stepMatch) {
    const numMap = { '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 }
    const count = numMap[stepMatch[1]] || 3
    const methodName = topic.replace(/—–-.*$/, '').trim()
    const steps = []
    for (let i = 1; i <= count; i++) {
      steps.push(`第${i}步：按照${methodName}的要求逐步执行`)
    }
    return steps
  }

  // Extract action phrases from explains text
  const actionPhrases = (explains || '').split('\n')
    .map(l => l.trim())
    .filter(l => (l.includes('：') || l.includes(':')) && l.length > 6 && l.length < 60 && !l.match(/^[【\*\(]/))
    .map(l => l.replace(/^[•·\-—]\s*/, '').trim())
    .slice(0, 5)
  if (actionPhrases.length >= 2) return actionPhrases

  // Infer from learnGoal
  if (learnGoal) {
    const methodMatch = learnGoal.match(/运用["「『]?([^"」』]{2,20}法?)["」』]?/)
    if (methodMatch) {
      const method = methodMatch[1]
      return [
        `理解「${method}」的核心原理和适用场景`,
        `按照${method}的结构逐步练习应用`,
        `复盘总结，内化为自己的技能`
      ]
    }
  }

  // Infer from known method patterns in topic
  const methodKeywords = ['法', '式', '模型', '法则', '原则', '步骤', '流程', '框架', '矩阵', '策略']
  for (const kw of methodKeywords) {
    if (topic.includes(kw)) {
      return [
        `理解「${topic}」的核心概念和原理`,
        `按照方法步骤逐步练习和应用`,
        `结合实际场景复盘，形成自己的经验`
      ]
    }
  }

  // Last resort: generate generic skill-building steps based on topic
  return [
    `学习「${topic}」的核心要点和关键方法`,
    `在真实场景中练习和应用所学内容`,
    `反思总结，将方法内化为自己的能力`
  ]
}

/**
 * Extract quote from memoir
 */
function extractQuote(memoir) {
  if (memoir.texts?.[0]?.quote) {
    const q = memoir.texts[0].quote
    const sentences = q.split(/[。！？\n]/).filter(s => s.trim().length > 10)
    return sentences[0]?.trim()?.slice(0, 120) || q.slice(0, 120)
  }
  return memoir.remark?.slice(0, 120) || ''
}

/**
 * Extract learning goal from various fields
 */
function extractLearnGoal(memoir) {
  if (memoir.learnGoal) return memoir.learnGoal
  // Check prologue for learning goal
  if (memoir.prologue) {
    const m = memoir.prologue.match(/【[学习目标]*[^】]*】\s*([\s\S]*?)(?=\n\n|\n【|$)/)
    if (m) return m[1].trim().slice(0, 300)
    const m2 = memoir.prologue.match(/\*\*学习目标\*\*[：:]\s*([^。\n]+)/)
    if (m2) return m2[1].trim()
  }
  const tg = memoir.texts?.[0]?.explains || ''
  const m3 = tg.match(/学习目标[：:]\s*([^。\n]{10,})/)
  return m3 ? m3[1].trim() : ''
}

/**
 * Parse interaction into A1/A2/A3
 */
function parseInteraction(text) {
  const result = { a1: '', a2: '', a3: '' }

  if (!text) return result

  // A1 variants: 【A1】/ 【A1激活经验】/ A1激活经验(显像提问) / 【A1联系具体经验】
  const a1Match = text.match(/【A1[^】]*】\s*([\s\S]*?)(?=\n\s*【A[23]|\n\s*A[12]|\n\s*\(A1|\n\s*\(|$)/i)
    || text.match(/A1激活经验[（(][^)）]*[)）]?\s*([\s\S]*?)(?=\n\s*[A-Z][0-9]|\n\s*\(|$)/i)
    || text.match(/\(A1[^)）]*\)\s*([\s\S]*?)(?=\n\s*[A-Z][0-9]|\n\s*\*\*|$)/i)
  if (a1Match) result.a1 = a1Match[1].trim().slice(0, 500)

  // A2 variants: 【A2】/ 【A2催化应用】
  const a2Match = text.match(/【A2[^】]*】\s*([\s\S]*?)(?=\n\s*【A[13]|\n\s*A[13]|\n\s*\(|$)/i)
    || text.match(/A2催化应用[（(][^)）]*[)）]?\s*([\s\S]*?)(?=\n\s*[A-Z][0-9]|\n\s*\(|$)/i)
    || text.match(/【A2催化应用】\s*([\s\S]*?)(?=\n\s*\*?\*?[A-Z]|$)/i)
  if (a2Match) result.a2 = a2Match[1].trim().slice(0, 500)

  // A3 variants: 【A3】/ 【A3场景应用】
  const a3Match = text.match(/【A3[^】]*】\s*([\s\S]*?)(?=\n\s*【A[12]|\n\s*A[12]|\n\s*\*?\*?[A-Z]|$)/i)
  if (a3Match) result.a3 = a3Match[1].trim().slice(0, 500)

  // If no structured A1/A2 but has content, try to extract story/reflect as A1
  if (!result.a1 && !result.a2 && text.length > 50) {
    const storyMatch = text.match(/【Story】\s*([\s\S]*?)(?=\n【|$)/i)
    if (storyMatch) {
      result.a1 = storyMatch[1].trim().slice(0, 300) + '\n\n反思：请学习者回想自己的类似经历。'
    }
  }

  return result
}

// ─── SKILL.md Generator ───

function generateSKILLMD(memoir, book, parsed, interaction, steps, quote, goal) {
  const { what, why, how, where } = parsed
  const { a1, a2, a3 } = interaction
  const topicClean = memoir.topic.replace(/[〔（【《\[].+?[〕）】》\]\]]/g, '').trim()
  const nameSlug = kebabify(memoir.level, topicClean, memoir.topic)

  // Trigger words
  const triggerWords = [topicClean, `${book.author} 教练`]
  if (steps.length > 0) triggerWords.push(steps[0]?.split(/[—–]/)[0]?.trim())
  triggerWords.push(book.title, book.author)

  // Step bullets
  const stepBullets = steps.length > 0
    ? steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')
    : '  （参阅拆书片段中的方法）'

  // A sections
  const a1Section = a1 ? `### A1 激活经验 — 引导用户回忆相关经历

引导用户思考：

\`\`\`
教练引导：「${a1.slice(0, 200)}${a1.length > 200 ? '…' : ''}」
\`\`\`
` : `### A1 激活经验 — 引导用户回忆相关经历

引导用户思考以下问题：

\`\`\`
教练：「回想一下，你过去在「${topicClean}」方面有没有成功的经验或失败的教训？
当时你是怎么处理的？如果现在用学到的方法重新做，会有什么不同？」
用户：（描述自己的经历和反思）
\`\`\`

**示例引导**：
- 你遇到过需要「${topicClean}」的场景吗？
- 当时你是怎么做的？结果如何？
- 如果用今天学的方法重新处理，你会改变什么？
`

  const a2Section = a2 ? `### A2 催化应用 — 设计行动方案

\`\`\`
${a2.slice(0, 400)}${a2.length > 400 ? '…' : ''}
\`\`\`
` : `### A2 催化应用 — 设计行动方案

引导用户制定具体行动计划：

\`\`\`
教练：「接下来一周内，你计划在哪个具体场景中应用「${topicClean}」？
请写下：
1. 应用场景：______
2. 具体步骤：______
3. 预期效果：______
4. 如何复盘：______」
用户：（写下行动计划）
\`\`\`

**课后作业**：请在 3 天内完成一次实际应用，并记录应用过程中的体会和改进点。
`

  const a3Section = a3 ? `### A3 场景应用 — 现场演练

\`\`\`
${a3.slice(0, 400)}${a3.length > 400 ? '…' : ''}
\`\`\`
` : ''

  const goalSection = goal ? `**学习目标**：${goal}

` : ''

  const whatSection = what ? `### What — 这是什么

${what.slice(0, 600)}
` : `### What — 这是什么

基于 ${book.author}《${book.title}》中关于「${topicClean}」的核心方法。`

  const whySection = why ? `### Why — 为什么重要

${why.slice(0, 600)}
` : ''

  const whereSection = where ? `### Where — 适用场景

${where.slice(0, 400)}
` : `### Where — 适用场景

- 需要应用「${topicClean}」的各种场景
- 希望提升相关能力的日常练习`

  return `---
name: ${topicClean}
description: ${memoir.remark?.slice(0, 100) || book.title} 教练技能
trigger:
  - ${triggerWords.join('\n  - ')}
---

# ${topicClean} · 教练技能

基于 ${book.author}《${book.title}》的教练技能。
拆书家：${memoir.user || '拆书帮'}
${memoir.activity?.date ? `拆书日期：${memoir.activity.date}` : ''}

${goalSection}
## 核心方法论

${whatSection}
${whySection}
### How — 操作步骤

${stepBullets}

${whereSection}
## 教练流程

### 第一步：诊断 — 了解用户当前水平

引导用户回顾相关场景：

\`\`\`
教练：「关于「${topicClean}」，你目前的使用情况如何？
遇到过什么困难或困惑吗？」
用户：（描述自己的情况）
\`\`\`

### 第二步：教学 — 讲解核心方法

${steps.length > 1
  ? `用以下步骤引导用户逐步练习：

${stepBullets}

每一步让用户用自己的话复述，确认理解后再进入下一步。`
  : '讲解核心原理，让用户理解其价值。'
}

### 第三步：演练 — 场景模拟

选择一个贴近用户实际的场景进行练习：

\`\`\`
场景：<让用户描述一个真实应用场景>
用户：（尝试应用方法回应）
教练：（给予反馈和指导）
\`\`\`

${a3Section}
${a1Section}
${a2Section}
### 第四步：反馈 — 评估与改进

从以下维度评估：

| 维度 | 描述 |
|------|------|
| 理解准确度 | 是否正确理解方法的核心要点 |
| 应用能力 | 能否在场景中灵活运用 |
| 表达清晰度 | 表达是否清晰、有条理 |
| 改进意愿 | 是否愿意根据反馈调整 |

---

## 出处

- **书籍**：《${book.title}》${book.author}
- **拆书家**：${memoir.user || '拆书帮'}
- **级别**：${memoir.level}
- **日期**：${memoir.activity?.date || ''}
${book.intro ? `- **简介**：${book.intro.slice(0, 200)}` : ''}

> ${quote}
`
}

// ─── Main ───

function main() {
  const hotBooks = loadHotBooks()
  if (!existsSync(SKILLS_DIR)) mkdirSync(SKILLS_DIR, { recursive: true })

  let total = 0

  for (const book of hotBooks) {
    if (!book.memoirs || book.memoirs.length === 0) continue

    for (const memoir of book.memoirs) {
      const explains = memoir.texts?.[0]?.explains || ''
      const interactionText = memoir.texts?.[0]?.interaction || ''

      const parsed = parseExplains(explains)
      const interaction = parseInteraction(interactionText)
      const goal = extractLearnGoal(memoir)
      const steps = extractFinalSteps(explains, memoir.topic, goal)
      const quote = extractQuote(memoir)

      const md = generateSKILLMD(memoir, book, parsed, interaction, steps, quote, goal)
      const filename = kebabify(memoir.level, memoir.topic, `skill-${memoir.id}`)
      const filepath = resolve(SKILLS_DIR, `${filename}.md`)

      writeFileSync(filepath, md, 'utf-8')
      total++

      const stepInfo = steps.length >= 2 ? `${steps.length}步` : '待补充'
      const aInfo = (interaction.a1 || interaction.a2) ? '有A' : ''
      console.log(`✓ ${memoir.level} ${memoir.topic} [${stepInfo}] ${aInfo}`)
    }
  }

  console.log(`\n✅ 仓颉拆书 v2 完成：共 ${total} 个 SKILL.md`)
  console.log(`   目录：${SKILLS_DIR}`)
}

main()
