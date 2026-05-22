/**
 * 仓颉拆书管线 — 拆页 → SKILL.md 自动生成
 *
 * 流程：
 * 1. 读取 hotBooks.js 中的所有拆页
 * 2. 解析 RIA 内容（quote/explan/ interaction）
 * 3. 生成 coaching SKILL.md → .claude/skills/
 * 4. 输出结构化数据，用于更新 skills.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ─── Helpers ───

function slugify(text) {
  return text
    .replace(/[〔（【《\[].+?[〕）】》\]\]]/g, '')
    .replace(/^[\s-]+/, '')
    .trim()
    .replace(/[\s　]+/g, '-')
    .replace(/[—–―·・·・]/g, '-')
    .replace(/[^a-zA-Z0-9一-鿿-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .replace(/[一-鿿]/g, m => encodeURIComponent(m))
}

function kebabify(level, topic, fallback) {
  const base = level
    .replace(/[\[\]]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const t = slugify(topic || fallback).slice(0, 40)
  return `${base}-${t}`.replace(/^-+/g, '')
}

// ─── Parse hotBooks.js ───

function loadHotBooks() {
  const raw = readFileSync(resolve(ROOT, 'src/data/hotBooks.js'), 'utf-8')
  // Extract the array content between const hotBooks = [ and ]
  const start = raw.indexOf('const hotBooks = [')
  const end = raw.lastIndexOf(']')
  if (start < 0 || end < 0) throw new Error('Cannot parse hotBooks.js')
  const jsonStr = raw.slice(start + 'const hotBooks = '.length, end + 1)
  return JSON.parse(jsonStr)
}

// ─── Extract skill data from memoir ───

function extractSteps(explan) {
  // Try to extract numbered steps (How section)
  const howMatch = explan.match(/【how】\s*([\s\S]*?)(?=\n\s*\n|【where|【互动|$)/i)
  if (!howMatch) return []

  const text = howMatch[1]
  const steps = []
  const lines = text.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    // Match patterns like: "1. stepname" or "第一步：... " or "1、stepname"
    const stepMatch = trimmed.match(/^(?:\d+[\.、）\)]\s*|第[一二三四五六七八九十]+步[：:]\s*)(.+)/)
    if (stepMatch) {
      steps.push(stepMatch[1].replace(/\s+/g, ' ').trim())
    }
  }
  return steps.length > 0 ? steps : [trimmedSummary(text)]
}

function trimmedSummary(text) {
  const clean = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > 120 ? clean.slice(0, 120) + '…' : clean
}

function extractQuote(memoir) {
  if (memoir.texts && memoir.texts[0]?.quote) {
    const q = memoir.texts[0].quote
    // Take first meaningful sentence
    const sentences = q.split(/[。！？\n]/).filter(s => s.trim().length > 10)
    return sentences[0]?.trim()?.slice(0, 100) || q.slice(0, 100)
  }
  return memoir.remark?.slice(0, 100) || ''
}

function extractLearnGoal(memoir) {
  if (memoir.learnGoal) return memoir.learnGoal
  const tg = memoir.texts?.[0]?.explains || ''
  const m = tg.match(/学习目标[：:]\s*([^。\n]+)/)
  return m ? m[1].trim() : ''
}

// ─── Extract What/Why/How/Where ───

function parseExplains(text) {
  const result = { what: '', why: '', how: '', where: '' }

  const whatMatch = text.match(/【what】\s*([\s\S]*?)(?=\n\s*\n|【why|$)/i)
  if (whatMatch) result.what = whatMatch[1].trim()

  const whyMatch = text.match(/【why】\s*([\s\S]*?)(?=\n\s*\n|【how|$)/i)
  if (whyMatch) result.why = whyMatch[1].trim()

  const howMatch = text.match(/【how】\s*([\s\S]*?)(?=\n\s*\n|【where|【互动|【a|$)/i)
  if (howMatch) result.how = howMatch[1].trim()

  const whereMatch = text.match(/【where】\s*([\s\S]*?)(?=\n\s*\n|【互动|【a|$)/i)
  if (whereMatch) result.where = whereMatch[1].trim()

  return result
}

function parseInteraction(text) {
  const result = { a1: '', a2: '' }

  const a1Match = text.match(/【a1[^】]*】\s*([\s\S]*?)(?=\n\s*\n|【a2|【结束|总结|$)/i)
  if (a1Match) result.a1 = a1Match[1].trim()

  const a2Match = text.match(/【a2[^】]*】\s*([\s\S]*?)(?=\n\s*\n|【结束|总结|$)/i)
  if (a2Match) result.a2 = a2Match[1].trim()

  return result
}

// ─── Generate SKILL.md content ───

function generateSKILLMD(memoir, book, parsed) {
  const steps = extractSteps(memoir.texts?.[0]?.explains || '')
  const quote = extractQuote(memoir)
  const goal = extractLearnGoal(memoir)
  const { what, why, how, where } = parsed
  const { a1, a2 } = parseInteraction(memoir.texts?.[0]?.interaction || '')

  const topicClean = memoir.topic.replace(/[〔（【《\[].+?[〕）】》\]\]]/g, '').trim()
  const nameSlug = kebabify(memoir.level, topicClean, memoir.topic)

  // Triggers from topic
  const triggerWords = [topicClean, `${book.author} 教练`]
  if (steps.length > 0) triggerWords.push(steps[0]?.split(/[—–]/)[0]?.trim())

  const stepBullets = steps.length > 0
    ? steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')
    : '  （步骤待补充）'

  const a1Section = a1
    ? `### A1 激活经验 — 引导用户回忆相关经历

引导用户思考：

\`\`\`
${a1.slice(0, 300)}${a1.length > 300 ? '…' : ''}
\`\`\`
`
    : ''

  const a2Section = a2
    ? `### A2 催化应用 — 设计行动方案

引导用户制定具体行动计划：

\`\`\`
${a2.slice(0, 300)}${a2.length > 300 ? '…' : ''}
\`\`\`
`
    : ''

  const goalSection = goal
    ? `**学习目标**：${goal}

`
    : ''

  const whatSection = what
    ? `### What — 这是什么

${what.slice(0, 500)}
`
    : ''

  const whySection = why
    ? `### Why — 为什么重要

${why.slice(0, 500)}
`
    : ''

  const whereSection = where
    ? `### Where — 适用场景

${where.slice(0, 300)}
`
    : ''

  return `---
name: ${topicClean}
description: ${memoir.remark?.slice(0, 100) || book.title} 教练技能
trigger:
  - ${triggerWords.join('\n  - ')}
  - ${book.title}
  - ${book.author}
---

# ${topicClean} · 教练技能

基于 ${book.author}《${book.title}》的教练技能。
拆书家：${memoir.user || '拆书帮'}

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

根据回答判断用户所处阶段并针对性辅导。

### 第二步：教学 — 讲解核心方法

${steps.length > 0
  ? `用以下步骤引导用户逐步练习：

${stepBullets}

每一步让用户用自己的话复述，确认理解后再进入下一步。`
  : '讲解核心原理，让用户理解其价值。'
}

### 第三步：演练 — 场景模拟

选择一个贴近用户实际的场景进行练习：

\`\`\`
场景：<让用户描述一个真实沟通/应用场景>
用户：（尝试应用方法回应）
教练：（给予反馈和指导）
\`\`\`

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
  const skillsDir = resolve(ROOT, '.claude/skills')
  if (!existsSync(skillsDir)) mkdirSync(skillsDir, { recursive: true })

  let total = 0
  const generated = []

  for (const book of hotBooks) {
    if (!book.memoirs || book.memoirs.length === 0) continue

    for (const memoir of book.memoirs) {
      const parsed = parseExplains(memoir.texts?.[0]?.explains || '')
      const md = generateSKILLMD(memoir, book, parsed)
      const filename = kebabify(memoir.level, memoir.topic, `skill-${memoir.id}`)
      const filepath = resolve(skillsDir, `${filename}.md`)

      writeFileSync(filepath, md, 'utf-8')
      total++

      // Track for skills.js update
      generated.push({
        book,
        memoir,
        steps: extractSteps(memoir.texts?.[0]?.explains || ''),
        quote: extractQuote(memoir),
        filename
      })

      console.log(`✓ ${memoir.level} ${memoir.topic} → ${filename}.md`)
    }
  }

  console.log(`\n✅ 完成：共生成 ${total} 个 SKILL.md`)
  console.log(`   目录：${skillsDir}`)

  // Generate skills.js update data
  const summary = {}
  for (const g of generated) {
    const key = g.book.title
    if (!summary[key]) {
      summary[key] = {
        title: g.book.title,
        author: g.book.author,
        description: g.book.intro?.slice(0, 100) || '',
        items: []
      }
    }
    summary[key].items.push({
      name: g.memoir.topic,
      level: g.memoir.level,
      steps: g.steps,
      quote: g.quote,
      source: `${g.memoir.user || '拆书帮'} ${g.memoir.activity?.date || ''} ${g.memoir.level}`,
      file: `${g.filename}.md`
    })
  }

  // Output structured data for skills.js update
  console.log('\n=== skills.js 新增数据预览 ===')
  for (const [title, s] of Object.entries(summary)) {
    console.log(`\n## ${title} (${s.items.length} skills)`)
    for (const item of s.items) {
      console.log(`  ${item.level} ${item.name}`)
    }
  }
}

main()
