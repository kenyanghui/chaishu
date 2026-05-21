import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'

export default function HotBookDetail() {
  const { title } = useParams()
  const decoded = decodeURIComponent(title)
  const book = hotBooks.find(b => b.title === decoded)

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-3">未找到该书</h2>
          <Link to="/hot" className="text-cyan-400 hover:underline">返回热门书库</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/hot" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回热门书库
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
                <div className="w-full h-full flex items-center justify-center text-cyan-400 font-bold text-2xl">{book.title.slice(0, 2)}</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                  {book.memCount} 个拆页
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-3">《{book.title}》</h1>
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div><span className="text-slate-500">作者</span><br/><span className="text-slate-300">{book.author}</span></div>
                <div><span className="text-slate-500">出版社</span><br/><span className="text-slate-300">{book.publisher}</span></div>
                <div><span className="text-slate-500">出版日期</span><br/><span className="text-slate-300">{book.pubdate}</span></div>
              </div>
              {book.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {book.tags.split(',').map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-dark-card-hover text-slate-400">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              {book.intro && (
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{book.intro}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Memoirs */}
        <h2 className="text-xl font-bold text-white mb-4">
          热门拆页 <span className="text-sm text-slate-500 font-normal">共 {book.memoirs.length} 篇</span>
        </h2>

        <div className="space-y-3">
          {book.memoirs.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/hot/memoir/${m.id}`}
                className="block glass rounded-xl p-4 group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 font-bold">
                    {m.level}
                  </span>
                  <span className="text-xs text-slate-500">{m.user}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {m.topic}
                </h3>
                {m.remark && (
                  <p className="text-sm text-slate-400 line-clamp-1">{m.remark}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <span>{m.texts?.length || 0} 个拆页</span>
                  <svg className="w-4 h-4 ml-auto text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
