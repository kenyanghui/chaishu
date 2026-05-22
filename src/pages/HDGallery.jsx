import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import skills from '../data/skills'

const LEVEL_COLORS = {
  tf1: { bg: 'from-indigo-900/40 to-purple-900/40', accent: 'text-indigo-400', border: 'border-indigo-500/30', tag: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  tf2: { bg: 'from-slate-900/40 to-cyan-900/40', accent: 'text-cyan-400', border: 'border-cyan-500/30', tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  tf3: { bg: 'from-gray-900/40 to-amber-900/40', accent: 'text-amber-400', border: 'border-amber-500/30', tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
}

function getItems() {
  const items = []
  for (const pack of skills) {
    for (const item of pack.items) {
      const level = item.level?.toLowerCase().startsWith('tf3') ? 'tf3'
        : item.level?.toLowerCase().startsWith('tf2') ? 'tf2' : 'tf1'
      const slug = item.name.replace(/[\s:：,，.。!！?？"「」『』【】()（）·]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
      items.push({
        name: item.name,
        level: item.level,
        book: pack.book,
        author: pack.author,
        slug,
        color: LEVEL_COLORS[level] || LEVEL_COLORS.tf2
      })
    }
  }
  return items
}

export default function HDGallery() {
  const items = getItems()

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-400 text-sm">
            高清大图 · 知识视觉化
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">高清大图画廊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            每个技能的信息图可视化，支持打印为 PDF 或截图保存
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.a
              key={`${item.slug}-${i}`}
              href={`/chaishu/images/skills/${encodeURIComponent(item.slug)}.html`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`glass rounded-xl p-5 border ${item.color.border} hover:border-cyan-500/40 transition-all group block`}
            >
              <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${item.color.tag} mb-3`}>
                {item.level}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-[10px] text-slate-500 line-clamp-1">
                《{item.book}》· {item.author}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-400/60 group-hover:text-amber-400 transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                查看大图
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
