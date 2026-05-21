import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import memoirs from '../data/memoirs'

export default function BookDetail() {
  const { title } = useParams()
  const decodedTitle = decodeURIComponent(title)

  const sessions = memoirs.filter(m => m.book.title === decodedTitle)
  const book = sessions.length > 0 ? sessions[0].book : null

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到该书</h2>
          <Link to="/" className="text-neon-purple hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-neon-purple transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        {/* Book header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-40 h-56 shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden bg-dark-card-hover">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://placehold.co/160x224/1e1e4a/6366f1?text=${encodeURIComponent(book.title.slice(0, 2))}`
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neon-purple font-bold text-2xl">
                  {book.title.slice(0, 2)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">《{book.title}》</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {[
                  { label: '作者', value: book.author },
                  { label: '出版社', value: book.publisher },
                  { label: '出版日期', value: book.pubdate },
                ].map(info => (
                  <div key={info.label}>
                    <div className="text-xs text-slate-500 mb-0.5">{info.label}</div>
                    <div className="text-sm text-slate-300">{info.value}</div>
                  </div>
                ))}
              </div>
              {book.url && (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:text-neon-blue transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  豆瓣读书
                </a>
              )}
              {book.intro && (
                <div className="mt-4 p-4 rounded-xl bg-dark-card-hover/50">
                  <div className="text-xs text-slate-500 mb-1">内容简介</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{book.intro}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sessions list */}
        <h2 className="text-2xl font-bold text-white mb-6">
          拆页列表
          <span className="text-base text-slate-500 font-normal ml-3">共 {sessions.length} 场</span>
        </h2>

        <div className="space-y-4">
          {sessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/memoir/${session.id}`}
                className="block glass rounded-xl p-5 group hover:border-neon-purple/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-neon-purple text-xs font-bold">
                        {session.level}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(session.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all">
                      {session.topic}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-1">{session.activity?.subject}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs text-slate-500">{session.texts.length} 个拆页</span>
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-neon-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
