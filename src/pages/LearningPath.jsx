import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import levels from '../data/learningPath'
import skills from '../data/skills'

const levelIcons = [
  <svg key="tf1" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" /><path d="M8 7h6" /><path d="M8 11h8" /><path d="M8 15h5" /></svg>,
  <svg key="tf2" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6v12" /><path d="M17.196 9a6 6 0 100 6" /><circle cx="12" cy="12" r="10" /></svg>,
  <svg key="tf3" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  <svg key="ai" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 014 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 014-4z" /><path d="M12 16c-3 0-6 2-6 4h12c0-2-3-4-6-4z" /></svg>,
]

export default function LearningPath() {
  const classified = skills.map(s => ({
    ...s,
    levelIndex: (() => {
      const tfs = s.items.map(i => i.level).filter(l => l && l.startsWith('TF'))
      if (tfs.length === 0) return 3
      const min = Math.min(...tfs.map(l => parseInt(l.replace('TF', '').split('-')[0])))
      if (min <= 1) return 0
      if (min <= 2) return 1
      return 2
    })(),
  }))

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pb-8">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-neon-blue/10 rounded-full blur-[128px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-indigo-400 text-sm">
              拆书帮 · 六级过级体系
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <span className="gradient-text">拆书家成长之路</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              从零基础到 AI 拆书家，四个阶段、六级过级、288+ 教练技能。
              按你的节奏，走自己的拆书成长之路。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Level Map — 前三级 */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {levels.slice(0, 3).map((level, i) => {
          const levelSkillsCount = classified.filter(s => s.levelIndex === i).length
          return (
            <motion.section
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`glass rounded-2xl p-6 md:p-8 border ${level.border} group hover:border-white/20 transition-all`}>
                {/* Level Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${level.bg} border ${level.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                      {levelIcons[i]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className={`text-2xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                        Level {i + 1}: {level.title}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${level.bg} ${level.text} border ${level.border}`}>
                        {level.range}
                      </span>
                    </div>
                    <p className="text-slate-400">{level.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-6 leading-relaxed">{level.desc}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    核心技能 · {levelSkillsCount} 个技能
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {level.skills.map((skill, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-dark-card/50 border border-dark-border"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${level.color} mt-2 shrink-0`} />
                        <span className="text-sm text-slate-400">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">学习成果</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {level.outcomes.map((outcome, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/skills?level=${i + 1}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${level.color} text-white text-sm font-bold hover:shadow-lg transition-all`}
                  >
                    查看 Level {i + 1} 技能
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  {i < 2 && (
                    <Link
                      to={`/learning-path#lvl${i + 2}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-slate-300 text-sm font-medium hover:text-white transition-all border border-dark-border"
                    >
                      了解 Level {i + 2}
                    </Link>
                  )}
                </div>
              </div>

              {/* Arrow between levels */}
              <div className="flex justify-center py-3">
                <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.section>
          )
        })}

        {/* S 级：AI 拆书家 */}
        {(() => {
          const ai = levels[3]
          return (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl p-6 md:p-8 border-2 border-violet-500/40 bg-gradient-to-br from-violet-900/20 via-slate-900/50 to-slate-900/80 overflow-hidden group hover:border-violet-400/60 transition-all">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/15 rounded-full blur-[80px]" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-black text-violet-400">S</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                          S 级: {ai.title}
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                          {ai.range}
                        </span>
                      </div>
                      <p className="text-slate-400">{ai.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{ai.desc}</p>

                  {/* Pipeline */}
                  <div className="rounded-xl border border-violet-500/30 bg-violet-900/10 p-5 mb-6">
                    <h3 className="text-sm font-bold text-white mb-4">AI 拆书管线</h3>
                    <div className="grid sm:grid-cols-5 gap-3">
                      {ai.pipeline.map((step, j) => (
                        <div key={j} className="text-center">
                          <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{j + 1}</span>
                          </div>
                          <p className="text-xs font-bold text-white mb-1">{step.name}</p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">学习成果</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {ai.outcomes.map((outcome, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-slate-400">
                          <svg className="w-5 h-5 mt-0.5 shrink-0 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/skill-fusion"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                    >
                      进入技能融合工坊
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      to="/skills?level=4"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-slate-300 text-sm font-medium hover:text-white transition-all border border-violet-500/20"
                    >
                      查看 S 级技能
                    </Link>
                  </div>
                </div>
              </div>
            </motion.section>
          )
        })()}
      </div>
    </div>
  )
}
