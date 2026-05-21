import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'
import skills from '../data/skills'

function getBooks() {
  return hotBooks.filter(b => b.memoirs.some(m => m.user === '玥清'))
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const pipelineSteps = [
  {
    id: 'nuwa',
    name: '女娲蒸馏',
    subtitle: '作者智慧萃取',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="url(#nuwa-grad)" opacity="0.2"/>
        <path d="M16 8a3 3 0 100 6 3 3 0 000-6z" fill="url(#nuwa-grad)"/>
        <path d="M12 18c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="url(#nuwa-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 14l3 2-3 2" stroke="url(#nuwa-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 14l-3 2 3 2" stroke="url(#nuwa-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="nuwa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f43f5e"/><stop offset="1" stopColor="#fb7185"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'from-rose-600 to-pink-500',
    light: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    desc: '用 AI 深度分析作者的思想体系、知识背景和核心观点，构建完整的作者知识图谱，让每一本书的智慧源头清晰可见。',
    output: '作者知识图谱 · 思想脉络图',
  },
  {
    id: 'cangjie',
    name: '仓颉拆书',
    subtitle: 'RIA 深度拆解',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="url(#cj-grad)" strokeWidth="1.5" fill="url(#cj-grad)" fillOpacity="0.1"/>
        <path d="M10 10h12M10 14h8M10 18h12M10 22h6" stroke="url(#cj-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="cj-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#06b6d4"/><stop offset="1" stopColor="#22d3ee"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'from-cyan-600 to-cyan-400',
    light: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    desc: '运用 RIA 拆书法，将全书拆解为可行动的框架：R 提取核心片段，I 鲜活内化解读，A 设计应用场景，让知识真正为你所用。',
    output: 'RIA 拆书笔记 · 行动框架',
  },
  {
    id: 'hd-image',
    name: '高清大图',
    subtitle: '知识视觉化',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="url(#hd-grad)" strokeWidth="1.5" fill="url(#hd-grad)" fillOpacity="0.1"/>
        <circle cx="11" cy="14" r="2" fill="url(#hd-grad)"/>
        <path d="M4 20l6-6 4 4 4-6 6 8" stroke="url(#hd-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <linearGradient id="hd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d97706"/><stop offset="1" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'from-amber-600 to-yellow-500',
    light: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    desc: '将抽象的知识体系转化为高清信息图、思维导图和知识地图，一目了然把握全书脉络，让复杂概念可视化呈现。',
    output: '知识地图 · 思维导图 · 信息图解',
  },
  {
    id: 'ljg-card',
    name: 'ljg-card',
    subtitle: '知识卡片化',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="10" height="14" rx="1.5" stroke="url(#card-grad)" strokeWidth="1.5" fill="url(#card-grad)" fillOpacity="0.1"/>
        <rect x="18" y="6" width="10" height="14" rx="1.5" stroke="url(#card-grad)" strokeWidth="1.5" fill="url(#card-grad)" fillOpacity="0.1"/>
        <path d="M8 14h2M20 14h2" stroke="url(#card-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="7" y="23" width="18" height="4" rx="2" stroke="url(#card-grad)" strokeWidth="1.5" fill="url(#card-grad)" fillOpacity="0.1"/>
        <defs>
          <linearGradient id="card-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#059669"/><stop offset="1" stopColor="#34d399"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'from-emerald-600 to-teal-400',
    light: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    desc: '将拆解内容制作为结构化知识卡片，适配 Anki 等间隔重复系统，用卡片组构建可长期复习的知识体系，对抗遗忘曲线。',
    output: 'Anki 卡片组 · 知识闪卡',
  },
  {
    id: 'darwin',
    name: '达尔文进化',
    subtitle: '技能持续进化',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M6 26c2-8 6-14 10-14s8 6 10 14" stroke="url(#darwin-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 26c2-4 4-6 6-6" stroke="url(#darwin-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M26 26c-2-4-4-6-6-6" stroke="url(#darwin-grad)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="8" r="3" fill="url(#darwin-grad)" opacity="0.8"/>
        <path d="M16 5V3M13 6l-2-1M19 6l2-1" stroke="url(#darwin-grad)" strokeWidth="1" strokeLinecap="round"/>
        <defs>
          <linearGradient id="darwin-grad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#a78bfa"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: 'from-violet-600 to-purple-500',
    light: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    desc: '基于使用反馈和学习数据，用 AI 持续优化所有技能产出。每一版都比前一版更精准、更实用，形成知识进化的正向循环。',
    output: '持续迭代的 Skill 技能包',
  },
]

export default function Home() {
  const books = getBooks()
  const totalSessions = books.reduce((s, b) => s + b.memoirs.filter(m => m.user === '玥清').length, 0)
  const featuredSkills = skills.slice(0, 3)

  return (
    <div>
      {/* ==================== Hero ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>
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

      {/* ==================== Books Section ==================== */}
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

      {/* ==================== RIA Section ==================== */}
      <section className="border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
              拆书帮核心方法论
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">RIA 拆书法</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              拆书帮传承的核心方法论，经 AI 辅助增强，形成完整的知识内化闭环
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'R', title: '阅读拆页', en: 'Reading', color: 'from-purple-600 to-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', desc: '从书中提取核心片段，精确定位值得深挖的知识点，让阅读有的放矢', items: ['原文精选取舍', '核心概念定位', '知识点关联'] },
              { label: 'I', title: '讲解引导', en: 'Interpretation', color: 'from-cyan-600 to-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', desc: '用自己的语言重述知识，结合经验进行深度解读，完成鲜活内化', items: ['What-Why-How 拆解', '经验关联激活', '逻辑重构表达'] },
              { label: 'A', title: '拆为己用', en: 'Appropriation', color: 'from-teal-600 to-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', desc: '设计催化应用场景，将知识转化为可执行的行动方案，真正改变行为', items: ['A1 激活经验', 'A2 催化应用', '行动目标规划'] },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:border-cyan-500/30 transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-[64px] -translate-y-1/2 translate-x-1/2`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`text-3xl font-black bg-gradient-to-b ${item.color} bg-clip-text text-transparent`}>
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{item.en}</p>
                  <p className="text-sm text-slate-400 mb-4">{item.desc}</p>
                  <ul className="space-y-1">
                    {item.items.map((sub, j) => (
                      <li key={j} className="text-xs text-slate-500 flex items-center justify-center gap-1">
                        <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.color}`} />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI 拆书系统 Section ==================== */}
      <section className="relative py-20 overflow-hidden border-t border-dark-border">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-violet-500/10 border border-rose-500/20 text-rose-400 text-sm">
              系统性知识工程流水线
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              AI <span className="gradient-text">拆书系统</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              从作者蒸馏到技能进化，五大模块构成完整的知识工程闭环。
              每一本书产出的不仅是拆书笔记，更是可下载、可进化、可实践的 <span className="text-cyan-400">Skill 技能包</span>。
            </p>
          </motion.div>

          {/* Pipeline Flow */}
          <div className="relative">
            {/* Central Flow Line (desktop) */}
            <div className="hidden lg:block absolute top-[72px] left-[calc(10%+36px)] right-[calc(10%+36px)] h-0.5 bg-gradient-to-r from-rose-500/30 via-cyan-500/30 via-amber-500/30 via-emerald-500/30 to-violet-500/30" />

            <div className="grid lg:grid-cols-5 gap-4 lg:gap-6">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative"
                >
                  {/* Mobile connector */}
                  {i < pipelineSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center">
                      <svg className="w-5 h-5 text-slate-600 -my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}

                  {/* Node circle */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.light} border ${step.border} flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4 md:p-5 text-center h-full group hover:border-cyan-500/30 transition-all">
                    <h3 className={`text-lg font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-1`}>
                      {step.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{step.subtitle}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.desc}</p>
                    {/* Output tag */}
                    <div className={`inline-block text-[10px] px-2 py-1 rounded-md ${step.light} ${step.text} border ${step.border}`}>
                      {step.output}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flow arrows between nodes (desktop) */}
            <div className="hidden lg:flex justify-between mt-2 px-[calc(10%+20px)]">
              {pipelineSteps.slice(0, -1).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-slate-600 -mt-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              ))}
            </div>
          </div>

          {/* Summary callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 glass rounded-2xl p-6 md:p-8 text-center border border-cyan-500/20"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {pipelineSteps.map(s => (
                <span key={s.id} className={`text-xs px-2.5 py-1 rounded-full ${s.light} ${s.text}`}>
                  {s.name}
                </span>
              ))}
            </div>
            <p className="text-slate-300 text-sm md:text-base">
              从 <span className="text-rose-400">女娲蒸馏</span> 作者智慧，
              经 <span className="text-cyan-400">仓颉拆书</span> 深度解构，
              通过 <span className="text-amber-400">高清大图</span> 与 <span className="text-emerald-400">ljg-card</span> 多形态输出，
              最后由 <span className="text-violet-400">达尔文进化</span> 持续迭代 —
              <span className="text-white font-bold"> AI 拆书，不止于拆书，更是 Skill 的系统性产出</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== Skills 工坊 Section ==================== */}
      <section className="border-t border-dark-border py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 text-violet-400 text-sm">
              知识进化的终极形态
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Skill 技能工坊</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              每一本书都是一套完整的技能系统。下载即用，在实践中进化。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {featuredSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 group hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-400 font-bold">
                    {skill.version}
                  </span>
                  <span className="text-xs text-slate-500">{skill.downloads} 次下载</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:gradient-text transition-all">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  《{skill.book}》· {skill.author}
                </p>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {skill.files.map(f => (
                    <span key={f.name} className="text-[10px] px-1.5 py-0.5 rounded bg-dark-card-hover text-slate-500">
                      {f.type === 'pdf' ? 'PDF' : f.type === 'image' ? 'PNG' : f.type === 'card' ? 'APKG' : 'MD'}
                    </span>
                  ))}
                </div>
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  查看全部文件
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-slate-300 font-medium hover:text-white hover:border-cyan-500/30 transition-all border border-dark-border"
            >
              进入技能工坊
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
