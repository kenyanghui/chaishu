import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'

// Show only books that have 玥清's personal memoirs
function getBooks() {
  return hotBooks.filter(b => b.memoirs.some(m => m.user === '玥清'))
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export default function Home() {
  const books = getBooks()
  const totalSessions = books.reduce((s, b) => s + b.memoirs.filter(m => m.user === '玥清').length, 0)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-sm">
              AI 辅助拆书 · 知识深度呈现
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="gradient-text">玥清</span>
              <span className="text-white"> 的 </span>
              <br className="md:hidden" />
              <span className="gradient-text">AI 拆书工坊</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              我是玥清，企业咨询顾问、前微软工程师、三级拆书家。
              <br />
              用 AI 重构 RIA 拆书法，将每本书的智慧蒸馏为可行动的框架。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/hot"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                开始探索
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-xl glass text-slate-300 font-medium hover:text-white transition-all duration-300"
              >
                关于我
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { num: books.length, label: '拆解书籍' },
              { num: totalSessions, label: '拆页场次' },
              { num: 'RIA', label: '拆书法框架' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text">{stat.num}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Books Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">拆解书单</h2>
          <p className="text-slate-400">每本书都经过 AI 辅助深度拆解，呈现 RIA 完整框架</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {books.map(book => (
            <motion.div key={book.title} variants={itemVariants}>
              <Link to={`/hot/book/${encodeURIComponent(book.title)}`} className="block group">
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="flex gap-6">
                    <div className="w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-dark-card-hover">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = `https://placehold.co/96x128/1e1e4a/6366f1?text=${encodeURIComponent(book.title.slice(0, 2))}`
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neon-purple font-bold text-lg">
                          {book.title.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all mb-1">
                        《{book.title}》
                      </h3>
                      <p className="text-sm text-slate-400 mb-2">{book.author} · {book.publisher}</p>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-3">{book.intro}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 rounded bg-neon-purple/10 text-neon-purple text-xs">
                          {book.memoirs.filter(m => m.user === '玥清').length} 个拆页
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs text-slate-500">
                          {book.memoirs.filter(m => m.user === '玥清').map(m => m.level).join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RIA Introduction */}
      <section className="border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">RIA 拆书法</h2>
            <p className="text-slate-400">拆书帮核心方法论，经 AI 辅助增强</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'R', title: '阅读拆页', color: 'from-purple-600 to-purple-400', desc: '从书中提取核心片段，精确定位值得深挖的知识点', bg: 'bg-purple-500/10' },
              { label: 'I', title: '讲解引导', color: 'from-cyan-600 to-cyan-400', desc: '用自己的语言重述知识，联系经验进行深度解读', bg: 'bg-cyan-500/10' },
              { label: 'A', title: '拆为己用', color: 'from-teal-600 to-teal-400', desc: '设计催化应用场景，将知识转化为可执行的行动方案', bg: 'bg-teal-500/10' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className={`text-3xl font-black bg-gradient-to-b ${item.color} bg-clip-text text-transparent`}>
                    {item.label}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
