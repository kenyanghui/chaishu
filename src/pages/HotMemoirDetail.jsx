import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'

export default function HotMemoirDetail() {
  const { id } = useParams()
  const memoirId = parseInt(id)

  // Find memoir across all books
  let memoir = null
  let book = null
  for (const b of hotBooks) {
    const found = b.memoirs.find(m => m.id === memoirId)
    if (found) {
      memoir = found
      book = b
      break
    }
  }

  if (!memoir || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-3">未找到该拆页</h2>
          <Link to="/hot" className="text-cyan-400 hover:underline">返回热门书库</Link>
        </div>
      </div>
    )
  }

  const texts = memoir.texts || []

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to={`/hot/book/${encodeURIComponent(book.title)}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回《{book.title}》
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 font-bold">
              {memoir.level}
            </span>
            {memoir.user === '玥清' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 font-bold">
                玥清
              </span>
            )}
            <span className="text-xs text-slate-500">{memoir.user}</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white mb-3">{memoir.topic}</h1>
          <div className="flex items-center gap-2">
            <Link to={`/hot/book/${encodeURIComponent(book.title)}`} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              《{book.title}》· {book.author}
            </Link>
          </div>
          {memoir.remark && (
            <p className="mt-3 text-sm text-slate-400 p-3 rounded-lg bg-dark-card-hover/50 border border-dark-border">
              {memoir.remark}
            </p>
          )}
        </motion.div>

        {/* RIA Content */}
        {texts.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="ria-section">
              <span className="ria-label bg-purple-500/15 text-purple-400 border border-purple-500/20">
                R · 阅读拆页
              </span>
              <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {text.quote || '（暂无原文内容）'}
              </div>
            </div>

            {text.explains && (
              <div className="ria-section">
                <span className="ria-label bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                  I · 讲解引导
                </span>
                <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {text.explains}
                </div>
              </div>
            )}

            {text.interaction && (
              <div className="ria-section">
                <span className="ria-label bg-teal-500/15 text-teal-400 border border-teal-500/20">
                  A · 拆为己用
                </span>
                <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                  {text.interaction}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
