/**
 * 更新 skills.js — 从 hotBooks.js 提取结构化技能数据
 * v2: 全面覆盖各种 RIA 格式，优先提取步骤和 A 内容
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function loadHotBooks() {
  const raw = readFileSync(resolve(ROOT, 'src/data/hotBooks.js'), 'utf-8')
  const start = raw.indexOf('const hotBooks = [')
  const end = raw.lastIndexOf(']')
  return JSON.parse(raw.slice(start + 'const hotBooks = '.length, end + 1))
}

// ─── v2 extraction (same as pipeline-cangjie) ───

function extractSection(text, label) {
  if (!text) return ''
  const re1 = new RegExp(`【${label}[^】]*】\\s*([\\s\\S]*?)(?=\n\\s*【[^】]+】|\n\\s*\\*\\*\\(?[A-Z]|\n\\s*\\(\\*\\*[A-Z]|\n##|\n---|$)`, 'i')
  const m1 = text.match(re1)
  if (m1) return m1[1].trim()
  const re2 = new RegExp(`\\(?\\*\\*${label}\\*\\*\\)?\\s*[：:]?\\s*([\\s\\S]*?)(?=\n\\s*\\*\\*\\(?[A-Z]|\n\\s*【[^】]+】|\n##|\n---|$)`, 'i')
  const m2 = text.match(re2)
  if (m2) return m2[1].trim()
  return ''
}

function extractStepsFromAll(text) {
  if (!text) return []
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const steps = []

  // Numbered lines
  for (const line of lines) {
    const m = line.match(/^(\d+)[.．、\)）]\s*(.{4,})/)
    if (m) steps.push(m[2].replace(/\s+/g, ' ').trim())
  }
  if (steps.length >= 2) return steps.slice(0, 6)

  // Chinese numbered
  const cnNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  for (const line of lines) {
    for (let i = 0; i < cnNums.length; i++) {
      const m = line.match(new RegExp(`^第?${cnNums[i]}步[：:]\\s*(.{4,})`))
      if (m && !steps.includes(m[1].trim())) steps.push(m[1].trim())
    }
  }
  if (steps.length >= 2) return steps.slice(0, 6)

  return []
}

function extractFinalSteps(explains, topic) {
  const howText = extractSection(explains, 'how') || extractSection(explains, 'How')
  if (howText) {
    const steps = extractStepsFromAll(howText)
    if (steps.length >= 2) return steps
  }
  const allSteps = extractStepsFromAll(explains)
  if (allSteps.length >= 2) return allSteps

  // Infer from topic name with step count
  const stepMatch = topic.match(/([三四五六七八九十])步[法势路]?/)
  if (stepMatch) {
    const numMap = { '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 }
    const count = numMap[stepMatch[1]] || 3
    const steps = []
    for (let i = 1; i <= count; i++) {
      steps.push(`第${i}步：按照${topic.replace(/—–-.*$/, '').trim()}的要求执行`)
    }
    return steps
  }

  // Extract action phrases
  const actionPhrases = (explains || '').split('\n')
    .map(l => l.trim())
    .filter(l => (l.includes('：') || l.includes(':')) && l.length > 6 && l.length < 60 && !l.match(/^[【\*\(]/))
    .map(l => l.replace(/^[•·\-—]\s*/, '').trim())
    .slice(0, 5)
  if (actionPhrases.length >= 2) return actionPhrases

  return []
}

function extractQuote(texts) {
  if (!texts?.[0]?.quote) return ''
  const q = texts[0].quote
  const sen = q.split(/[。！？\n]/).filter(s => s.trim().length > 10)
  return (sen[0] || q).trim().slice(0, 120)
}

// ─── Main ───

const hotBooks = loadHotBooks()
const skillSets = []

for (const book of hotBooks) {
  if (!book.memoirs || book.memoirs.length === 0) continue
  const items = []
  for (const m of book.memoirs) {
    const topic = m.topic.replace(/[〔（【《\[«].*?[〕）】》\]»\"]/g, '').trim()
    if (!topic) continue
    const explains = m.texts?.[0]?.explains || ''
    const steps = extractFinalSteps(explains, topic)
    const quote = extractQuote(m.texts) || m.remark?.slice(0, 100) || ''
    items.push({
      name: topic,
      level: m.level || '拆书',
      steps: steps.length > 0 ? steps : [m.remark?.slice(0, 80) || topic],
      quote: quote,
      source: `${m.user || '拆书帮'} ${m.activity?.date || ''} ${m.level || ''}`.trim()
    })
  }
  if (items.length === 0) continue

  const idBase = book.title.replace(/[^\w一-鿿]/g, '').slice(0, 20).toLowerCase() || `book-${book.id}`
  skillSets.push({
    id: `skill-nw-${idBase}`,
    name: `${book.title} · 技能包`,
    author: book.author.replace(/[[\]〔〕]/g, '').trim(),
    book: book.title,
    description: book.intro?.slice(0, 120) || `${book.title}核心技能框架`,
    items
  })
}

// Format with clean output
const json = JSON.stringify(skillSets, null, 2)
const lines = json.split('\n')
const result = []
for (const line of lines) {
  const newLine = line.replace(/^\s*"(\w+)"(:)/, (match, p1, p2) => {
    return '  '.repeat((match.match(/\s/g) || []).length / 2) + p1 + p2
  })
  result.push(newLine)
}

const output = `// Auto-generated skill data — 仓颉拆书管线 v2
// 生成时间: ${new Date().toISOString().slice(0, 10)}

const skills = ${result.join('\n')}

export default skills
`

writeFileSync(resolve(ROOT, 'src/data/skills.js'), output, 'utf-8')
const totalItems = skillSets.reduce((s, ss) => s + ss.items.length, 0)
console.log(`✅ skills.js 已更新: ${skillSets.length} 个技能包, ${totalItems} 个技能`)
