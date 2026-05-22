/**
 * ljg-card 管线 — Anki 知识卡片组自动生成
 *
 * 读取 .claude/skills/*.md → 生成 Anki 兼容 CSV
 * 输出到 public/cards/*.csv
 *
 * Anki 导入格式：字段 = 技能名 | 卡片类型 | 正面 | 背面 | 标签 | 出处
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = resolve(ROOT, '.claude/skills')
const OUT_DIR = resolve(ROOT, 'public/cards')

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { frontmatter: {}, body: raw }
  const fm = {}
  const lines = match[1].split('\n')
  let currentKey = null
  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*(.*)/)
    if (kv) {
      currentKey = kv[1]
      fm[currentKey] = kv[2].replace(/^['"]|['"]$/g, '')
    } else if (currentKey && line.match(/^\s+-/)) {
      const val = line.replace(/^\s+-\s*/, '').replace(/^['"]|['"]$/g, '')
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [fm[currentKey]]
      fm[currentKey].push(val)
    }
  }
  return { frontmatter: fm, body: raw.slice(match[0].length) }
}

function extractSection(body, title) {
  const p = new RegExp(`### ${title}\\s*[—–-]?\\s*([\\s\\S]*?)(?=\\n### |\\n---|\\n## |$)`)
  const m = body.match(p)
  return m ? m[1].trim() : ''
}

function extractSteps(body) {
  const how = extractSection(body, 'How')
  if (!how) return []

  const cb = how.match(/```[\s\S]*?```/g)
  if (cb) {
    for (const block of cb) {
      const items = block.split('\n').map(l => l.trim()).filter(l => l.match(/^(\d+[.．、]|第)/) && l.length > 3)
      if (items.length > 0) return items.map(l => l.replace(/^\d+[.．、]\s*/, '').trim())
    }
  }

  const lines = how.split('\n').map(l => l.trim()).filter(l => l.match(/^\d+[.．\)、]/) && l.length > 3)
  return lines.map(l => l.replace(/^\d+[.．\)、]\s*/, '').trim())
}

function extractSource(body) {
  const m = body.match(/\*\*书籍\*\*[：:]\s*(.*?)(?:\n|$)/)
  const a = body.match(/\*\*拆书家\*\*[：:]\s*(.*?)(?:\n|$)/)
  const l = body.match(/\*\*级别\*\*[：:]\s*(.*?)(?:\n|$)/)
  const book = m ? m[1].trim() : ''
  const author = a ? a[1].trim() : ''
  const level = l ? l[1].trim() : ''
  return `${book} | ${author} | ${level}`
}

function extractExamples(body) {
  const examples = []
  // Find practice scenarios
  const scenarioMatch = body.match(/(?:场景|练习)[\s\S]*?(?=\n### |\n---|$)/g)
  if (scenarioMatch) {
    for (const s of scenarioMatch) {
      const lines = s.split('\n').map(l => l.trim()).filter(l => l.length > 5 && !l.startsWith('```') && !l.startsWith('#'))
      for (const line of lines.slice(0, 3)) {
        examples.push(line.replace(/^[•·\-—]\s*/, '').slice(0, 100))
      }
    }
  }
  return examples
}

function escapeCSV(s) {
  if (!s) return ''
  const str = String(s).replace(/"/g, '""')
  return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str
}

function generateCards(fm, body, filePath) {
  const name = fm.name || basename(filePath).replace('.md', '')
  const steps = extractSteps(body)
  const source = extractSource(body)
  const examples = extractExamples(body)
  const triggers = Array.isArray(fm.trigger) ? fm.trigger.slice(0, 4) : (fm.trigger ? [fm.trigger] : [])
  const tags = triggers.map(t => t.replace(/[\s　]+/g, '-').replace(/[^\w一-鿿-]/g, '')).filter(t => t.length > 1).slice(0, 4).join(' ')

  const rows = []

  // Card 1: Overview (skill framework card)
  const what = extractSection(body, 'What')?.slice(0, 200) || ''
  const why = extractSection(body, 'Why')?.slice(0, 200) || ''
  const overviewBack = `【核心】${name}<br><br>${what ? `【是什么】${what}<br><br>` : ''}${why ? `【为什么】${why}` : ''}`
  rows.push([name, '框架概览', `【${name}】核心框架`, overviewBack, tags, source])

  // Cards 2-N: Each step as a card
  for (let i = 0; i < steps.length; i++) {
    const stepNum = i + 1
    const front = `【${name}】第${stepNum}步：${steps[i].split(/[—–]/)[0].trim()}`
    const back = `【${name}】第${stepNum}步<br><br><b>操作：</b>${steps[i]}<br><br><i>来源：${source}</i>`
    rows.push([name, '操作步骤', front, back, tags, source])
  }

  // Cards: Practice scenarios
  for (let i = 0; i < examples.length; i++) {
    const front = `【${name}】练习场景 ${i + 1}`
    const back = `【${name}】练习场景<br><br>${examples[i]}<br><br><i>运用所学的步骤进行练习</i>`
    rows.push([name, '练习场景', front, back, tags, source])
  }

  // Card: Coaching tips
  const diag = extractSection(body, '第一步：诊断')
  if (diag) {
    const tips = diag.split('\n').map(l => l.trim()).filter(l => l.length > 10 && !l.startsWith('```')).slice(0, 3).join('<br>')
    rows.push([name, '教练提示', `【${name}】教练诊断要点`, tips || '参考 SKILL.md 诊断部分', tags, source])
  }

  return rows
}

function main() {
  const files = readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'))
  let totalCards = 0
  let totalFiles = 0

  for (const file of files) {
    try {
      const raw = readFileSync(resolve(SKILLS_DIR, file), 'utf-8')
      const { frontmatter, body } = parseFrontmatter(raw)
      if (!frontmatter.name) continue

      const cards = generateCards(frontmatter, body, resolve(SKILLS_DIR, file))
      if (cards.length === 0) continue

      // Generate CSV
      const header = '技能名,卡片类型,正面,背面,标签,出处'
      const csvRows = cards.map(row => row.map(escapeCSV).join(','))
      const csv = `${header}\n${csvRows.join('\n')}\n`

      const slug = frontmatter.name.replace(/[\s:：,，.。!！?？"“”"『』【】()（）]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
      writeFileSync(resolve(OUT_DIR, `${slug}.csv`), csv, 'utf-8')
      totalCards += cards.length
      totalFiles++
      console.log(`✓ ${frontmatter.name} → ${cards.length} 张卡片`)
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`)
    }
  }

  // Generate combined deck
  console.log(`\n✅ ljg-card 完成：${totalFiles} 个技能包, ${totalCards} 张知识卡片`)
  console.log(`   输出目录：${OUT_DIR}`)

  // Summary report
  const summary = `# ljg-card Anki 卡片组

生成时间：${new Date().toISOString().slice(0, 10)}
技能包数：${totalFiles}
卡片总数：${totalCards}

## 导入 Anki 方法

1. 打开 Anki → 文件 → 导入
2. 选择 CSV 文件
3. 字段分隔符：逗号
4. 导入选项：
   - 字段 1: 技能名 (忽略)
   - 字段 2: 卡片类型
   - 字段 3: 正面 (正向)
   - 字段 4: 背面 (反向)
   - 字段 5: 标签
   - 字段 6: 出处 (忽略)
5. 点击导入

## 文件清单

${files.filter(f => f.endsWith('.md')).map(f => {
  const raw = readFileSync(resolve(SKILLS_DIR, f), 'utf-8')
  const { frontmatter } = parseFrontmatter(raw)
  return frontmatter.name ? `- ${frontmatter.name}.csv` : ''
}).filter(Boolean).join('\n')}
`
  writeFileSync(resolve(OUT_DIR, 'README.md'), summary, 'utf-8')
  console.log(`📋 导入指南：${resolve(OUT_DIR, 'README.md')}`)
}

main()
