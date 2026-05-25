import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import skills from '../data/skills'

function slugify(name) {
  return name.replace(/[\s:：,，.。!！?？"「」『』【】()（）·]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
}

const TF_LEVELS = [
  { key: 'all', label: '全部', color: 'from-slate-500 to-slate-400' },
  { key: 'TF1', label: 'TF1 基础', color: 'from-indigo-600 to-indigo-400' },
  { key: 'TF2', label: 'TF2 教练', color: 'from-cyan-600 to-cyan-400' },
  { key: 'TF3', label: 'TF3 高级', color: 'from-amber-600 to-yellow-500' },
]

export default function Skills() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [tfFilter, setTfFilter] = useState('all')

  // Read ?level=N from URL (e.g. /skills?level=1 from learning path)
  useEffect(() => {
    const level = searchParams.get('level')
    if (level === '1') setTfFilter('TF1')
    else if (level === '2') setTfFilter('TF2')
    else if (level === '3') setTfFilter('TF3')
    else if (level === '4') setTfFilter('all')
  }, [searchParams])

  // Extract unique books for filter
  const allBooks = useMemo(() => {
    const books = new Map()
    for (const s of skills) {
      if (!books.has(s.book)) {
        books.set(s.book, { book: s.book, author: s.author, count: 0 })
      }
      books.get(s.book).count += s.items.length
    }
    return Array.from(books.values()).sort((a, b) => b.count - a.count)
  }, [])

  const filteredSkills = useMemo(() => {
    return skills.map(pack => {
      const items = pack.items.filter(item => {
        if (tfFilter !== 'all' && !item.level?.startsWith(tfFilter)) return false
        if (search) {
          const q = search.toLowerCase()
          const nameMatch = item.name.toLowerCase().includes(q)
          const bookMatch = pack.book.toLowerCase().includes(q)
          const authorMatch = pack.author.toLowerCase().includes(q)
          const levelMatch = item.level?.toLowerCase().includes(q)
          return nameMatch || bookMatch || authorMatch || levelMatch
        }
        return true
      })
      return { ...pack, items }
    }).filter(p => p.items.length > 0)
  }, [search, tfFilter])

  const totalItems = useMemo(() => skills.reduce((s, p) => s + p.items.length, 0), [])
  const filteredCount = useMemo(() => filteredSkills.reduce((s, p) => s + p.items.length, 0), [filteredSkills])

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-400 text-sm">
            便签拆书 · 技能萃取
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Skill 技能工坊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            从拆书实录中萃取可执行的技能框架，共 <span className="text-neon-purple font-bold">{totalItems}</span> 个教练技能
          </p>

          {/* Pipeline Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a href="/chaishu/images/skills/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              高清大图画廊
            </a>
            <a href="/chaishu/cards/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Anki 卡片组
            </a>
            <a href="/chaishu/darwin-report.html" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              达尔文进化
            </a>
          </div>

          {/* Search + Filter */}
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="搜索技能名称、书籍、作者..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-card/80 border border-dark-border text-slate-300 placeholder-slate-600 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/20 transition-all text-sm"
              />
            </div>

            {/* TF Level Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TF_LEVELS.map(lv => (
                <button
                  key={lv.key}
                  onClick={() => setTfFilter(lv.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    tfFilter === lv.key
                      ? `bg-gradient-to-r ${lv.color} text-white shadow-lg`
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {lv.label}
                </button>
              ))}
            </div>

            {/* Count */}
            <p className="text-xs text-slate-600">
              {search || tfFilter !== 'all'
                ? `显示 ${filteredCount} 个技能（共 ${totalItems} 个）`
                : `共 ${totalItems} 个教练技能`}
            </p>
          </div>
        </div>
      </section>

      {/* Skills List */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8">
          {filteredSkills.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4 opacity-30">🔍</div>
              <p className="text-slate-500">没有找到匹配的技能，试试其他关键词</p>
              <button
                onClick={() => { setSearch(''); setTfFilter('all') }}
                className="mt-4 px-4 py-2 rounded-lg glass text-sm text-slate-400 hover:text-white transition-all"
              >
                清除筛选
              </button>
            </div>
          ) : (
            filteredSkills.map((skill, i) => {
              const packSlug = slugify(skill.name)
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 1) }}
                  className="glass rounded-2xl p-6 md:p-8 border border-dark-border"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">{skill.name}</h2>
                      <p className="text-sm text-slate-400">
                        《{skill.book}》· {skill.author}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-500">
                      {skill.items.length} 项
                    </span>
                  </div>

                  {skill.description && (
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">{skill.description}</p>
                  )}

                  <div className="grid gap-4">
                    {skill.items.map((item, j) => (
                      <div key={j} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            item.level?.startsWith('TF3') ? 'bg-amber-500/20 text-amber-400' :
                            item.level?.startsWith('TF2') ? 'bg-cyan-500/20 text-cyan-400' :
                            item.level?.startsWith('TF1') ? 'bg-indigo-500/20 text-indigo-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {item.level}
                          </span>
                          <h3 className="text-base font-bold text-white">{item.name}</h3>
                        </div>

                        {item.steps && item.steps.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.steps.map((step, k) => (
                              <span key={k} className="flex items-center gap-1 text-xs text-slate-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shrink-0" />
                                {step}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.quote && (
                          <p className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3 my-2 line-clamp-2">
                            {item.quote}
                          </p>
                        )}

                        <p className="text-[10px] text-slate-600 mt-1">{item.source}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
