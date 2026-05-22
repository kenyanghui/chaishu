import { readFileSync } from 'fs'

const raw = readFileSync('src/data/hotBooks.js', 'utf-8')
const start = raw.indexOf('const hotBooks = [')
const end = raw.lastIndexOf(']')
const books = JSON.parse(raw.slice(start + 'const hotBooks = '.length, end + 1))

// Show 6 random memoirs WITHOUT how markers, to see what we can extract
let shown = 0
for (const book of books) {
  if (!book.memoirs || shown >= 6) continue
  for (const m of book.memoirs) {
    if (shown >= 6) continue
    const e = m.texts?.[0]?.explains || ''
    if (e.match(/【how】/i)) continue // skip ones with how

    const ir = m.texts?.[0]?.interaction || ''
    const hasContent = e.length > 50 || ir.length > 10

    if (hasContent) {
      shown++
      console.log(`\n═══════════════════════════════════════`)
      console.log(`主题: ${m.topic}`)
      console.log(`书籍: ${book.title} - ${book.author}`)
      console.log(`级别: ${m.level}`)
      console.log(`═══════════════════════════════════════`)

      if (e) console.log(`\n【explains】(${e.length}字):\n${e.slice(0, 500)}`)
      if (e.length > 500) console.log(`  ...(截断，共${e.length}字)`)

      if (ir) console.log(`\n【interaction】(${ir.length}字):\n${ir.slice(0, 300)}`)

      if (m.remark) console.log(`\n【remark】: ${m.remark.slice(0, 150)}`)
      if (m.learnGoal) console.log(`【learnGoal】: ${m.learnGoal.slice(0, 150)}`)
      if (m.prologue) console.log(`【prologue】: ${m.prologue.slice(0, 150)}`)

      // Check quote
      const q = m.texts?.[0]?.quote || ''
      if (q) console.log(`\n【quote】(${q.length}字): ${q.slice(0, 200)}`)
    }
  }
}

// Also show memoirs with empty explains entirely
console.log('\n\n═══════════════════════════════════════')
console.log('空 explains 的拆页统计:')
let empty = 0, total = 0
for (const book of books) {
  if (!book.memoirs) continue
  for (const m of book.memoirs) {
    total++
    if (!m.texts?.[0]?.explains?.trim()) empty++
  }
}
console.log(`总拆页: ${total}, 空explains: ${empty}, 有内容: ${total - empty}`)
