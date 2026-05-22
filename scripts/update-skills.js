/**
 * 生成完整的 skills.js — 从 hotBooks.js 提取结构化技能数据
 * 支持多种 explains 格式: 【how】/ (**How)** / 数字编号列表
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

/** Extract steps from explains text — supports multiple formats */
function extractSteps(explan) {
  if (!explan) return []

  // Format 1: 【how】 section with numbered steps
  const howSection = explan.match(/【how】\s*([\s\S]*?)(?=\n\s*\n|【where|【互动|【a\d|$)/i)
  || explan.match(/\*\*\[?how\]?\*\*\s*([\s\S]*?)(?=\n\s*\n|\*\*\[?what|\[\*|【|$)/i)
  || explan.match(/\(?\*\*?[Hh]ow\*?\*?\)?\s*[：:]\s*([\s\S]*?)(?=\n\s*\n|\*\*?[Ww]hat|\(\*|【|$)/)

  const text = howSection ? howSection[1] : explan

  // Try to find numbered steps: "1. xxx" or "1、xxx" or "第一步：xxx"
  const stepLines = text.split('\n')
    .map(l => l.trim())
    .filter(l => {
      // Skip short lines and headers
      if (l.length < 4) return false
      if (l.match(/^[一二三四五六七八九十]+[、．.]/)) return true
      if (l.match(/^\d+[、.．\)）]/)) return true
      if (l.match(/^步骤[一二三四五六七八九十]/)) return true
      return false
    })
    .map(l => l.replace(/^[一二三四五六七八九十]+[、．.]\s*/, '').replace(/^\d+[、.．\)）]\s*/, '').trim())

  if (stepLines.length >= 2) return stepLines

  // Try to find bullet points
  const bulletLines = text.split('\n')
    .map(l => l.trim())
    .filter(l => l.match(/^[•·\-—]\s/) && l.length > 5)
    .map(l => l.replace(/^[•·\-—]\s*/, '').trim())
  if (bulletLines.length >= 2) return bulletLines

  // Fallback: look for any line with action-oriented content
  const actionLines = text.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 8 && l.length < 80 && (l.includes('：') || l.includes(':') || l.includes('—')))
  if (actionLines.length >= 2) return actionLines.slice(0, 5)

  // Last resort: return first meaningful sentence as a single step
  const clean = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  const firstStep = clean.match(/^[^。！？\n]{10,80}/)
  return firstStep ? [firstStep[0] + '…'] : []
}

function extractQuote(texts) {
  if (!texts?.[0]?.quote) return ''
  const q = texts[0].quote
  const sen = q.split(/[。！？\n]/).filter(s => s.trim().length > 10)
  return (sen[0] || q).trim().slice(0, 120)
}

const hotBooks = loadHotBooks()
const skillSets = []

for (const book of hotBooks) {
  if (!book.memoirs || book.memoirs.length === 0) continue
  const items = []
  for (const m of book.memoirs) {
    const topic = m.topic.replace(/[〔（【《\[«].*?[〕）】》\]»\"]/g, '').trim()
    if (!topic) continue
    const steps = extractSteps(m.texts?.[0]?.explains)
    if (steps.length === 0 && !m.remark) continue
    items.push({
      name: topic,
      level: m.level || '拆书',
      steps: steps.length > 0 ? steps : [m.remark?.slice(0, 80) || topic],
      quote: extractQuote(m.texts) || m.remark?.slice(0, 100) || '',
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

// Format as JS module with clean output
const json = JSON.stringify(skillSets, null, 2)
// Remove quotes from property names (approximate JS object style)
const lines = json.split('\n')
const result = []
for (const line of lines) {
  // Convert "key": to key: for unquoted property names (common in JS)
  const newLine = line.replace(/^\s*"(\w+)"(:)/, (match, p1, p2) => {
    // Only unquote if it's a data property, not a string value
    return '  '.repeat((match.match(/\s/g) || []).length / 2) + p1 + p2
  })
  result.push(newLine)
}

const output = `// Auto-generated skill data — 仓颉拆书管线
// 女娲蒸馏 → 仓颉拆书 → 高清大图 → ljg-card → 达尔文进化
// 生成时间: ${new Date().toISOString().slice(0, 10)}

const skills = ${result.join('\n')}

export default skills
`

writeFileSync(resolve(ROOT, 'src/data/skills.js'), output, 'utf-8')
console.log(`✅ skills.js 已更新: ${skillSets.length} 个技能包, ${skillSets.reduce((s, ss) => s + ss.items.length, 0)} 个技能`)
