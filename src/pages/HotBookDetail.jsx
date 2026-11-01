import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'
import fetchJSON, { isShifu } from '../lib/hotData'

export default function HotBookDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setData(null)
    setError(false)
    fetchJSON(`/hot/books/${id}.json`)
      .then(setData)
      .catch(() => setError(true))
  }, [id])

  // 兼容旧 title 路由：按 id 加载失败时用索引反查书名
  const [byTitle, setByTitle] = useState(null)
  useEffect(() => {
    if (!error) return
    const decoded = decodeURIComponent(id)
    if (/^\d+$/.test(id)) return
    fetchJSON('/hot/index.json.gz')
      .then(idx => setByTitle(idx.find(b => b.title === decoded) || null))
      .catch(() => fetchJSON('/hot/index.json')
        .then(idx => setByTitle(idx.find(b => b.title === decoded) || null))
        .catch(() => {}))
  }, [error, id])

  // 兼容旧 title 路由的收藏书（bundle 内 Top30）
  const legacy = hotBooks.find(b => String(b.id) === id || b.title === decodeURIComponent(id))
  const book = data?.book || byTitle || legacy
  const memoirs = data?.memoirs || legacy?.memoirs || []

  if (error && !book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">未找到该书</h2>
          <Link to="/hot" className="text-[#0071e3] hover:underline">返回经典拆页</Link>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center text-[#86868b]">加载中…</div>
      </div>
    )
  }

  const hasFullText = data || (legacy?.memoirs?.length > 0)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/hot" className="inline-flex items-center gap-2 text-sm text-[#86868b] hover:text-[#0071e3] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回经典拆页
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-44 shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden bg-dark-card-hover">
              {book.image ? (
                <img src={book.image} alt={book.title} className="w-full h-full object-cover"
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = `https://placehold.co/128x176/1e1e4a/06b6d4?text=${encodeURIComponent(book.title.slice(0, 2))}`
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#0071e3] font-bold text-2xl">{book.title.slice(0, 2)}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-[#0071e3]">
                  {book.memCount} 个拆页
                </span>
                {legacy && (
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">
                    已进仓颉管线
                  </span>
                )}
                {book.url && (
                  <a href={book.url} target="_blank" rel="noreferrer" className="text-xs text-[#86868b] hover:text-[#0071e3] transition-colors">
                    豆瓣页面 ↗
                  </a>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-[#1d1d1f] mb-3">《{book.title}》</h1>
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div><span className="text-[#86868b]">作者</span><br/><span className="text-[#424245]">{book.author}</span></div>
                <div><span className="text-[#86868b]">出版社</span><br/><span className="text-[#424245]">{book.publisher}</span></div>
                <div><span className="text-[#86868b]">出版日期</span><br/><span className="text-[#424245]">{book.pubdate}</span></div>
                {book.translator && (
                  <div><span className="text-[#86868b]">译者</span><br/><span className="text-[#424245]">{book.translator}</span></div>
                )}
              </div>
              {book.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {book.tags.split(',').map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-dark-card-hover text-[#6e6e73]">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              {book.intro && (
                <p className="text-sm text-[#6e6e73] leading-relaxed line-clamp-3">{book.intro}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Memoirs */}
        <h2 className="text-xl font-bold text-[#1d1d1f] mb-4">
          拆页列表 <span className="text-sm text-[#86868b] font-normal">共 {memoirs.length} 篇{!hasFullText && memoirs.length === 0 ? ' · 该书拆页同步中' : ''}</span>
        </h2>

        {memoirs.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-[#86868b] text-sm">
            该书暂无公开拆页数据
          </div>
        ) : (
          <div className="space-y-3">
            {memoirs.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
              >
                <Link
                  to={`/hot/memoir/${m.id}`}
                  className="block glass rounded-xl p-4 group hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {m.level && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-[#0071e3] font-bold">
                        {m.level}
                      </span>
                    )}
                    {isShifu(m.user) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 font-bold">
                        玄龙
                      </span>
                    )}
                    {m.user && <span className="text-xs text-[#86868b]">{m.user}</span>}
                    {m.examResult && (
                      <span className="text-xs text-[#86868b] ml-auto">{m.examResult}</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors mb-1">
                    {m.topic || '（未命名拆页）'}
                  </h3>
                  {m.remark && (
                    <p className="text-sm text-[#6e6e73] line-clamp-1">{m.remark}</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
