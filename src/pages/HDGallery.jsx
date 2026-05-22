import { motion } from 'framer-motion'

const categories = [
  {
    id: '沟通表达',
    title: '沟通表达',
    subtitle: '非暴力沟通 · 关键对话 · 好好说话 · 谈话的力量 · 沟通的艺术 · 高情商沟通术 · 重要的事情说3点 · 内向者沟通圣经 · 拆出你的沟通力I',
    color: 'from-teal-500 to-cyan-500',
    light: 'from-teal-500/20 to-cyan-500/20',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
    bg: 'bg-teal-500/10',
    books: ['非暴力沟通', '关键对话', '好好说话', '谈话的力量', '沟通的艺术（插图修订第14版）', '高情商沟通术', '重要的事情说3点', '内向者沟通圣经', '拆出你的沟通力I'],
  },
  {
    id: '管理领导',
    title: '管理领导',
    subtitle: '高效能人士的七个习惯 · 卓有成效的管理者 · 横向领导力 · 可复制的领导力 · 带团队的方法 · 领导梯队 · 逆向管理 · 4D卓越团队 · 团队协作的五大障碍 · OKR · 小微企业经营笔记 · 高效执行4原则',
    color: 'from-blue-600 to-indigo-500',
    light: 'from-blue-500/20 to-indigo-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    books: ['高效能人士的七个习惯（精华版）', '高效能人士的七个习惯', '卓有成效的管理者', '横向领导力', '可复制的领导力', '带团队的方法', '领导梯队', '逆向管理', '4D卓越团队', '团队协作的五大障碍', 'OKR：源于英特尔和谷歌的目标管理利器', '小微企业经营笔记', '高效执行4原则', '高效执行4原则2.0', '10人以下小团队管理手册'],
  },
  {
    id: '认知思维',
    title: '认知思维',
    subtitle: '认知觉醒 · 认知红利 · 结构思考力 · 逻辑思维只要5步 · 思维力 · 麦肯锡结构化战略思维 · 第3选择 · 终身成长 · 成长型思维 · 创新者的思考',
    color: 'from-violet-600 to-purple-500',
    light: 'from-violet-500/20 to-purple-500/20',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    books: ['认知觉醒', '认知红利', '结构思考力', '逻辑思维，只要5步', '思维力：高效的系统思维', '麦肯锡结构化战略思维', '第3选择：解决人生所有难题的关键思维', '终身成长', '成长型思维', '创新者的思考', '复盘(对过去的事情做思维演练实践版)'],
  },
  {
    id: '学习精进',
    title: '学习精进',
    subtitle: '这样读书就够了 · 精进 · 刻意练习 · 跃迁 · 复盘',
    color: 'from-emerald-600 to-green-500',
    light: 'from-emerald-500/20 to-green-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    books: ['这样读书就够了', '精进', '刻意练习', '跃迁'],
  },
  {
    id: '教练指导',
    title: '教练指导',
    subtitle: '高绩效教练 · 提问的威力 · 教练式沟通',
    color: 'from-cyan-600 to-teal-500',
    light: 'from-cyan-500/20 to-teal-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    books: ['高绩效教练', '提问的威力：教练问题全清单', '教练式沟通'],
  },
  {
    id: '决策影响力',
    title: '决策 · 影响力',
    subtitle: '做出好决定 · 决策的艺术 · 斯坦福商业决策课 · 聪明的投资者 · 影响力 · 优势谈判 · 沃顿商学院最受欢迎的谈判课',
    color: 'from-rose-600 to-pink-500',
    light: 'from-rose-500/20 to-pink-500/20',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    books: ['做出好决定', '决策的艺术', '斯坦福商业决策课', '聪明的投资者', '影响力', '优势谈判', '沃顿商学院最受欢迎的谈判课'],
  },
  {
    id: '亲子教育',
    title: '亲子 · 自我管理',
    subtitle: '正面管教 · 如何说孩子才会听 · 爱的五种语言 · 自控力 · 小强升职记 · 精力管理',
    color: 'from-amber-500 to-orange-500',
    light: 'from-amber-500/20 to-orange-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    books: ['正面管教', '如何说孩子才会听，怎么听孩子才肯说', '爱的五种语言', '自控力', '小强升职记', '精力管理'],
  },
]

import skills from '../data/skills'

function getItemsForPack(pack) {
  return pack.items.map(item => {
    const slug = item.name.replace(/[\s:：,，.。!！?？"「」『』【】()（）·]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
    return { ...item, packName: pack.name, book: pack.book, slug }
  })
}

function getBookCategory(book) {
  for (const cat of categories) {
    if (cat.books.some(b => book.includes(b) || b.includes(book))) return cat.id
  }
  return null
}

export default function HDGallery() {
  // Group items by category
  const byCategory = {}
  for (const cat of categories) {
    byCategory[cat.id] = { cat, items: [] }
  }
  byCategory['其他'] = { cat: { id: '其他', title: '其他', color: 'from-slate-600 to-slate-400', text: 'text-slate-400', border: 'border-slate-500/30', bg: 'bg-slate-500/10', light: 'from-slate-500/20 to-slate-500/20' }, items: [] }

  for (const pack of skills) {
    const catId = getBookCategory(pack.book)
    const target = byCategory[catId] || byCategory['其他']
    for (const item of getItemsForPack(pack)) {
      target.items.push(item)
    }
  }

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-8">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-400 text-sm">
            高清大图 · 知识视觉化
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">高清大图画廊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            HTML 信息图 + AI 封面图 · 点击技能查看完整信息图
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {categories.map((cat, ci) => {
          const group = byCategory[cat.id]
          if (!group || group.items.length === 0) return null
          return (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
            >
              {/* Category Cover + Header */}
              <div
                className={`relative rounded-2xl overflow-hidden mb-6 border ${cat.border} group cursor-pointer`}
              >
                <img
                  src={`/chaishu/images/hd/category-${cat.id}.png`}
                  alt={cat.title}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className={`inline-block mb-2 px-3 py-1 rounded-full ${cat.bg} border ${cat.border} ${cat.text} text-xs font-bold`}>
                    {group.items.length} 个技能
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                    {cat.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl line-clamp-1">{cat.subtitle}</p>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {group.items.map((item, i) => (
                  <motion.a
                    key={`${item.slug}-${i}`}
                    href={`/chaishu/images/skills/${encodeURIComponent(item.slug)}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 12) * 0.03 }}
                    className={`glass rounded-xl p-4 border ${cat.border} hover:border-white/40 transition-all group block`}
                  >
                    <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${cat.bg} ${cat.text}`}>
                      {item.level || '拆书'}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-2 mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      《{item.book}》
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400/60 group-hover:text-amber-400 transition-colors">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      查看信息图
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}
