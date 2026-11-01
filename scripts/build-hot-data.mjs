/**
 * build-hot-data.mjs — 从爬取的 chaishubang 原始数据生成站点懒加载数据
 *
 * 输入: /tmp/octopus/hot-crawl/{books.json, memoirs/<bookId>.json}
 * 输出: public/hot/index.json          全量书目轻索引（列表页）
 *       public/hot/books/<id>.json     每本书拆页 meta（详情页懒加载，不含全文）
 *       public/hot/memoirs/<mid>.json  单拆页全文（RIA 三段，拆页详情页懒加载）
 *       public/hot/memoir-index.json   memoirId → bookId（拆页详情路由）
 *       public/hot/stats.json          总量统计
 *       src/data/hotBooks.js           Top30 兼容切片含全文（仓颉管线输入，不进 bundle）
 *
 * 脱敏: 剥离 password / remember_token / email / weixin_code（任何嵌套层级）
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { gzipSync, gunzipSync } from 'zlib'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const CRAWL = process.env.CRAWL_DIR || '/tmp/octopus/hot-crawl'
const OUT = resolve(ROOT, 'public/hot')
const TOP_N = 30

const STRIP = new Set(['password', 'remember_token', 'email', 'weixin_code'])

function sanitize(v) {
  if (Array.isArray(v)) return v.map(sanitize)
  if (v && typeof v === 'object') {
    const out = {}
    for (const [k, val] of Object.entries(v)) {
      if (STRIP.has(k)) continue
      out[k] = sanitize(val)
    }
    return out
  }
  return v
}

function stripHtml(s) {
  if (!s) return ''
  return s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim()
}

/** HTML → 保留段落的纯文本（拆页正文渲染用） */
function htmlToText(s) {
  if (!s) return ''
  return s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h\d|li|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function writeGz(path, obj) {
  writeFileSync(path, gzipSync(Buffer.from(JSON.stringify(obj))))
}

function readGz(path) {
  return JSON.parse(gunzipSync(readFileSync(path)))
}

// ── 载入书目
const books = JSON.parse(readFileSync(resolve(CRAWL, 'books.json'), 'utf-8'))
books.sort((a, b) => (b.memCount || 0) - (a.memCount || 0))

// ── 轻索引
const index = books.map(b => ({
  id: b.id,
  title: b.title,
  author: b.author,
  translator: b.translator || '',
  publisher: b.publisher || '',
  pubdate: b.pubdate || '',
  isbn: b.isbn || '',
  image: b.image || '',
  url: b.url || '',
  tags: b.tags || '',
  intro: stripHtml(b.intro).slice(0, 120),
  memCount: b.memCount || 0,
}))

// ── 每本书拆页数据 + memoir 索引
mkdirSync(resolve(OUT, 'books'), { recursive: true })
mkdirSync(resolve(OUT, 'memoirs'), { recursive: true })
const memoirIndex = {}
const topBooks = []
let totalMemoirs = 0
let booksWithMemoirs = 0

for (const b of books) {
  const f = resolve(CRAWL, 'memoirs', `${b.id}.json`)
  if (!existsSync(f)) continue
  const raw = JSON.parse(readFileSync(f, 'utf-8'))
  const memoirs = raw.map(m => {
    memoirIndex[m.id] = b.id
    const p = m.program || {}
    const act = p.activity || {}
    const u = m.user || {}
    const texts = (m.texts || []).map(t => ({
      quote: t.quote || '',
      explains: t.explains || '',
      interaction: t.interaction || '',
    }))
    // 单拆页全文（详情页懒加载）— 正文 HTML 转纯文本保留段落，gzip 落盘
    writeGz(resolve(OUT, 'memoirs', `${m.id}.json.gz`), {
      id: m.id,
      bookId: b.id,
      bookTitle: b.title,
      level: p.level || '',
      topic: p.topic || '',
      remark: p.remark || '',
      learnGoal: p.learn_goal || '',
      duration: p.duration || null,
      prologue: htmlToText(m.prologue),
      radioUrl: m.radioUrl || '',
      radioPwd: m.radioPwd || '',
      createdAt: m.created_at,
      user: u.username || u.name || '',
      activity: act.id ? {
        subject: stripHtml(act.content || '').slice(0, 60),
        date: act.active_date || '',
        address: act.address || '',
      } : null,
      ratings: (m.ratings || []).map(r => ({
        examResult: r.examResult || '',
        deliverDate: r.deliverDate || '',
        deliverMan: r.deliverMan || '',
        deliverTimes: r.deliverTimes || null,
      })),
      texts: texts.map(t => ({
        quote: htmlToText(t.quote),
        explains: htmlToText(t.explains),
        interaction: htmlToText(t.interaction),
      })),
    })
    return {
      id: m.id,
      level: p.level || '',
      topic: p.topic || '',
      remark: p.remark || '',
      duration: p.duration || null,
      createdAt: m.created_at,
      user: u.username || u.name || '',
      examResult: (m.ratings || []).find(r => r.examResult)?.examResult || '',
      textsCount: texts.length,
    }
  })
  if (memoirs.length > 0) booksWithMemoirs++
  totalMemoirs += memoirs.length
  const bookFull = { ...index.find(x => x.id === b.id), intro: stripHtml(b.intro) }
  const payload = { book: bookFull, memoirs }
  writeFileSync(resolve(OUT, 'books', `${b.id}.json`), JSON.stringify(payload))
  if (topBooks.length < TOP_N) topBooks.push(payload)
}

writeFileSync(resolve(OUT, 'index.json'), JSON.stringify(index))
writeFileSync(resolve(OUT, 'memoir-index.json'), JSON.stringify(memoirIndex))
writeFileSync(resolve(OUT, 'stats.json'), JSON.stringify({
  totalBooks: books.length,
  booksWithMemoirs,
  totalMemoirs,
  generatedAt: new Date().toISOString(),
}))

// ── 兼容 hotBooks.js（bundle 切片）：精选 69 本带全文拆页（玄龙收藏/已进管线），
//    其余书目只在 index.json（按需懒加载），保证 bundle 体积可控
const curatedPath = resolve(ROOT, 'scripts/curated-books.json')
const curated = existsSync(curatedPath) ? JSON.parse(readFileSync(curatedPath, 'utf-8')) : []
const curatedById = new Map(curated.map(c => [c.id, c]))
const legacy = []
for (const { book, memoirs } of topBooks) {
  const c = curatedById.get(book.id)
  if (!c) continue
  legacy.push({
    ...book,
    memCount: memoirs.length || book.memCount,
    memoirs: memoirs
      .filter(mm => c.memoirIds.includes(mm.id))
      .map(mm => {
        // bundle 切片 meta-only：正文/导语/审核详情一律懒加载 gz
        return {
          id: mm.id,
          level: mm.level,
          topic: mm.topic,
          remark: mm.remark,
          duration: mm.duration,
          createdAt: mm.createdAt,
          user: mm.user,
          textsCount: mm.textsCount,
        }
      }),
  })
}
// 精选书补齐：crawled-but-not-Top30 从 gz 语料组装；爬虫覆盖不到的（如 id=0 认知觉醒）回退 git 历史数据
const legacyFallback = existsSync(resolve(ROOT, 'scripts/curated-legacy.json'))
  ? JSON.parse(readFileSync(resolve(ROOT, 'scripts/curated-legacy.json'), 'utf-8').replace(/^[\s\S]*?const hotBooks = /, '').replace(/export default[\s\S]*$/, '').trim().replace(/,\s*$/, ''))
  : []
for (const c of curated) {
  if (legacy.some(b => b.id === c.id)) continue
  const f = resolve(CRAWL, 'memoirs', `${c.id}.json`)
  if (existsSync(f)) {
    const memoirs = c.memoirIds
      .map(mid => {
        const ff = resolve(OUT, 'memoirs', `${mid}.json.gz`)
        if (!existsSync(ff)) return null
        const mm = readGz(ff)
        // bundle 切片 meta-only：正文/导语/审核详情一律懒加载 gz
        return {
          id: mm.id,
          level: mm.level,
          topic: mm.topic,
          remark: mm.remark,
          duration: mm.duration,
          createdAt: mm.createdAt,
          user: mm.user,
          textsCount: (mm.texts || []).length,
        }
      })
      .filter(Boolean)
    const bookMeta = index.find(x => x.id === c.id) || { id: c.id, title: c.title, memCount: c.memoirIds.length }
    legacy.push({
      ...bookMeta,
      intro: stripHtml((books.find(b => b.id === c.id) || {}).intro || ''),
      memCount: c.memoirIds.length,
      memoirs,
    })
  } else {
    const old = legacyFallback.find(b => b.id === c.id)
    if (old) legacy.push(old)
  }
}
const js = `// Auto-generated by scripts/build-hot-data.mjs — do not edit by hand
// 源头: chaishubang.com 全量爬取, 本文件为 Top${TOP_N} 兼容切片（仓颉管线输入）
// 全量数据: public/hot/（index.json + books/<id>.json 懒加载）

const hotBooks = ${JSON.stringify(legacy, null, 2)}

export default hotBooks
`
writeFileSync(resolve(ROOT, 'src/data/hotBooks.js'), js)

console.log(`index: ${index.length} books`)
console.log(`books with memoirs: ${booksWithMemoirs}, total memoirs: ${totalMemoirs}`)
console.log(`legacy hotBooks.js: top ${legacy.length} books, ${legacy.reduce((s, b) => s + b.memoirs.length, 0)} memoirs`)
