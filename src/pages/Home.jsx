import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import skills from '../data/skills'

const stats = { books: 69, sessions: 156 }

const pipelineSteps = [
  { id: 'nuwa', name: '作者蒸馏', subtitle: '作者智慧萃取', color: 'from-rose-600 to-pink-500', light: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30', text: 'text-rose-400', desc: '用 AI 深度分析作者的思想体系、知识背景和核心观点，构建完整的作者知识图谱，让每一本书的智慧源头清晰可见。', output: '作者知识图谱 · 思想脉络图' },
  { id: 'cangjie', name: '便签拆书', subtitle: 'RIA 深度拆解', color: 'from-cyan-600 to-cyan-400', light: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', desc: '运用 RIA 拆书法，将全书拆解为可行动的框架：R 提取核心片段，I 鲜活内化解读，A 设计应用场景，让知识真正为你所用。', output: 'RIA 拆书笔记 · 行动框架' },
  { id: 'hd-image', name: '高清大图', subtitle: '知识视觉化', color: 'from-amber-600 to-yellow-500', light: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/30', text: 'text-amber-400', desc: '将抽象的知识体系转化为高清信息图、思维导图和知识地图，一目了然把握全书脉络，让复杂概念可视化呈现。', output: '知识地图 · 思维导图 · 信息图解' },
  { id: 'knowledge-card', name: '知识卡片', subtitle: '知识卡片化', color: 'from-emerald-600 to-teal-400', light: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', desc: '将拆解内容制作为结构化知识卡片，适配 Anki 等间隔重复系统，用卡片组构建可长期复习的知识体系，对抗遗忘曲线。', output: 'Anki 卡片组 · 知识闪卡' },
  { id: 'darwin', name: '达尔文进化', subtitle: '技能持续进化', color: 'from-violet-600 to-purple-500', light: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30', text: 'text-violet-400', desc: '基于使用反馈和学习数据，用 AI 持续优化所有技能产出。每一版都比前一版更精准、更实用，形成知识进化的正向循环。', output: '持续迭代的 Skill 技能包' },
]

export default function Home() {
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
              我是玥清 · AI 摆渡人。前微软工程师、企业咨询顾问、拆书家。
              <br />
              以"AI+心智"双轮驱动，将每本书的智慧蒸馏为可行动的框架。
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
              { num: stats.books, label: '拆解书籍' },
              { num: stats.sessions, label: '拆页场次' },
              { num: 152, label: '教练技能' },
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


      {/* ==================== 平台亮点 Section ==================== */}
      <section className="border-t border-dark-border">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">
              平台特色
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              AI 拆书工坊 <span className="gradient-text">与众不同</span>
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              这不是一个内容展示站，而是一个可进化的知识工程系统 ——
              输入拆页，输出技能，自动评估，持续进化
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                ),
                title: '端到端知识工厂',
                desc: '从拆书实录到结构化技能包，全链路自动化。作者蒸馏 → 便签拆书 → 高清大图 → 知识卡片 → 达尔文进化，五步闭环，让每本书的智慧系统化产出。',
                color: 'from-rose-500/20 to-pink-500/20',
                border: 'border-rose-500/20',
                text: 'text-rose-400',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                ),
                title: '达尔文进化系统',
                desc: '每个技能从 8 个维度量化评分（触发覆盖、步骤清晰度、解释深度、教练流程、练习质量、评估体系、互动设计、知识整合），自动识别薄弱环节，持续优化内容质量。',
                color: 'from-violet-500/20 to-purple-500/20',
                border: 'border-violet-500/20',
                text: 'text-violet-400',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
                ),
                title: '双层技能架构',
                desc: '融合拆书帮官方 TF 等级技能（152 个教练技能）与跨思想体系技能（黄帝内经、巴菲特、芒格、毛选等 8 大来源），支持组合成 "融合包" 跨学科打包下载。',
                color: 'from-blue-500/20 to-cyan-500/20',
                border: 'border-blue-500/20',
                text: 'text-blue-400',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                ),
                title: '多形态知识产出',
                desc: '同一份内容输出四种形态：教练 Skill Markdown 文件、高清信息图（HTML）、Anki 间隔复习卡片（CSV）、可下载 tar.gz 技能包。适配阅读、复习、教学多场景。',
                color: 'from-emerald-500/20 to-teal-500/20',
                border: 'border-emerald-500/20',
                text: 'text-emerald-400',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                ),
                title: '拆书家成长路径',
                desc: '完整覆盖 L1 基础拆书家 → L2 拆书教练 → L3 高级拆书家 → S 级 AI 拆书家 四级进阶体系。每级有明确的技能清单和学习成果，学习路径与技能工坊联动跳转。',
                color: 'from-indigo-500/20 to-violet-500/20',
                border: 'border-indigo-500/20',
                text: 'text-indigo-400',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                ),
                title: '数据规模',
                desc: '69 本书、156+ 场拆书实录、152 个自动生成的教练技能、21 个技能包、6 个跨思想体系融合包。覆盖沟通、管理、认知、领导力、亲子教育等多个领域。',
                color: 'from-amber-500/20 to-yellow-500/20',
                border: 'border-amber-500/20',
                text: 'text-amber-400',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-5 group hover:border-white/20 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} border ${item.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${item.text}`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
                  {i < pipelineSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center">
                      <svg className="w-5 h-5 text-slate-600 -my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}

                  <div className="glass rounded-xl p-4 md:p-5 text-center h-full group hover:border-cyan-500/30 transition-all">
                    <h3 className={`text-lg font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-1`}>
                      {step.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{step.subtitle}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.desc}</p>
                    <div className={`inline-block text-[10px] px-2 py-1 rounded-md bg-gradient-to-r ${step.light} ${step.text} border ${step.border}`}>
                      {step.output}
                    </div>
                  </div>
                </motion.div>
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
                <span key={s.id} className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${s.light} ${s.text}`}>
                  {s.name}
                </span>
              ))}
            </div>
            <p className="text-slate-300 text-sm md:text-base">
              从 <span className="text-rose-400">作者蒸馏</span> 萃取智慧，
              经 <span className="text-cyan-400">便签拆书</span> 深度解构，
              通过 <span className="text-amber-400">高清大图</span> 与 <span className="text-emerald-400">知识卡片</span> 多形态输出，
              最后由 <span className="text-violet-400">达尔文进化</span> 持续迭代 —
              <span className="text-white font-bold"> AI 拆书，不止于拆书，更是 Skill 的系统性产出</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== 拆书家成长之路 Section ==================== */}
      <section className="border-t border-dark-border py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
              学 · 练 · 教 · 进化
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              拆书家<span className="gradient-text">成长之路</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              从零基础到 AI 拆书家，四个阶段逐级进阶，每一步都有明确的技能目标。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { level: 'L1', title: '基础拆书家', sub: '掌握 RIA 便签法', theme: 'from-indigo-600 to-indigo-400', border: 'border-indigo-500/20', text: 'text-indigo-400', bg: 'bg-indigo-500/10', range: 'TF1-1 ~ TF1-2', icon: '01' },
              { level: 'L2', title: '拆书教练', sub: '能设计拆书课', theme: 'from-cyan-600 to-cyan-400', border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-500/10', range: 'TF2-1 ~ TF2-4', icon: '02' },
              { level: 'L3', title: '高级拆书家', sub: '能带徒弟设计工作坊', theme: 'from-amber-600 to-yellow-500', border: 'border-amber-500/20', text: 'text-amber-400', bg: 'bg-amber-500/10', range: 'TF3-1 ~ TF3-3', icon: '03' },
              { level: 'L4', title: 'AI 拆书家', sub: '用 AI 重构拆书', theme: 'from-violet-600 to-purple-500', border: 'border-violet-500/20', text: 'text-violet-400', bg: 'bg-violet-500/10', range: 'AI 管线', icon: '04' },
            ].map((item, i) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 group hover:border-white/20 transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-[64px] -translate-y-1/2 translate-x-1/2`} />
                <div className="relative z-10">
                  <span className={`text-3xl font-black bg-gradient-to-r ${item.theme} bg-clip-text text-transparent`}>
                    {item.icon}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{item.sub}</p>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full ${item.bg} ${item.text} border ${item.border}`}>
                    {item.range}
                  </span>
                </div>
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
              to="/learning-path"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              查看完整成长路径
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
                <h3 className="text-base font-bold text-white mb-1 group-hover:gradient-text transition-all">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  《{skill.book}》· {skill.author}
                </p>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(skill.items || []).slice(0, 4).map(item => (
                    <span key={item.name} className="text-[10px] px-1.5 py-0.5 rounded bg-dark-card-hover text-slate-500">
                      {item.level}
                    </span>
                  ))}
                  {(skill.items || []).length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-dark-card-hover text-neon-purple">
                      +{skill.items.length - 4}
                    </span>
                  )}
                </div>
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  查看全部
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
