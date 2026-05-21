import { motion } from 'framer-motion'
import skills from '../data/skills'

export default function Skills() {
  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-400 text-sm">
            仓颉拆书 · 技能萃取
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Skill 技能工坊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            从拆书实录中萃取可执行的技能框架，每一套都是经过 RIA 验证的练习工具
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8">
          {skills.map((skill, i) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
