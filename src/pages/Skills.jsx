import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import skills from '../data/skills'

function slugify(name) {
  return name.replace(/[\s:：,，.。!！?？"「」『』【】()（）·]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
}

export default function Skills() {
  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-400 text-sm">
            仓颉拆书 · 技能萃取
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Skill 技能工坊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            从拆书实录中萃取可执行的技能框架，每一套都是经过 RIA 验证的练习工具
          </p>

          {/* Pipeline Outputs Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/chaishu/images/skills/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              高清大图画廊
            </a>
            <a
              href="/chaishu/cards/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Anki 卡片组下载
            </a>
            <a
              href="/chaishu/darwin-report.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass text-xs text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              达尔文进化报告
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8">
          {skills.map((skill, i) => {
            const packSlug = slugify(skill.name)
            return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 border border-dark-border"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{skill.name}</h2>
                  <p className="text-sm text-slate-400">
                    《{skill.book}》· {skill.author}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 mb-6">{skill.description}</p>

              <div className="grid gap-4">
                {skill.items.map((item, j) => (
                  <div key={j} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-neon-purple text-xs font-bold">
                        {item.level}
                      </span>
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                    </div>

                    {item.steps && item.steps.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.steps.map((step, k) => (
                          <span key={k} className="flex items-center gap-1 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shrink-0" />
                            {step}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.quote && (
                      <p className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3 my-2">
                        {item.quote}
                      </p>
                    )}

                    <p className="text-[10px] text-slate-600 mt-1">
                      {item.source}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
