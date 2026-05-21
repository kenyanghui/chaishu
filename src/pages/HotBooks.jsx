import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function HotBooks() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
            拆书帮全平台热门
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">热门拆书书库</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            拆书帮精选热门书籍，每本都经过拆书家的深度拆解，呈现 RIA 完整框架
          </p>
          <div className="mt-4 text-sm text-slate-500">
            共 {hotBooks.length} 本书 · {hotBooks.reduce((s, b) => s + b.memCount, 0)}+ 个拆页
          </div>
        </div>
      </section>

      {/* Book Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {hotBooks.map(book => (
            <motion.div key={book.id} variants={itemVariants}>
              <Link
                to={`/hot/book/${encodeURIComponent(book.title)}`}
                className="block glass rounded-xl p-4 h-full group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-22 shrink-0 rounded-lg overflow-hidden bg-dark-card-hover">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.onerror = null
                          e.target.src = `https://placehold.co/64x88/1e1e4a/06b6d4?text=${encodeURIComponent(book.title.slice(0, 2))}`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                        {book.title.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight mb-1">
                      《{book.title}》
                    </h3>
                    <p className="text-xs text-slate-400 truncate mb-1">{book.author}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                        {book.memCount} 拆页
                      </span>
                      {book.memoirs.length > 0 && (
                        <span className="text-slate-500">
                          {book.memoirs[0].level}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {book.tags.split(',').slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-dark-card-hover text-slate-500">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
