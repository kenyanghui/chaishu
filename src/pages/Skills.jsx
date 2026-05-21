import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import skills from '../data/skills'

const stageColors = {
  '女娲蒸馏': 'from-pink-600 to-rose-400',
  '仓颉拆书': 'from-cyan-600 to-blue-400',
  '高清大图': 'from-amber-600 to-yellow-400',
  'ljg-card': 'from-emerald-600 to-teal-400',
  '达尔文进化': 'from-violet-600 to-purple-400',
}

const stageBg = {
  '女娲蒸馏': 'bg-pink-500/10',
  '仓颉拆书': 'bg-cyan-500/10',
  '高清大图': 'bg-amber-500/10',
  'ljg-card': 'bg-emerald-500/10',
  '达尔文进化': 'bg-violet-500/10',
}

const typeLabels = {
  pdf: 'PDF',
  image: '图片',
  card: '卡片',
  markdown: '文档',
}

export default function Skills() {
  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 text-pink-400 text-sm">
            达尔文进化 · 持续迭代
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">Skill 技能工坊</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            从作者蒸馏到行动框架，每一本书都是一套可下载、可进化、可实践的技能系统
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 border border-dark-border hover:border-pink-500/20 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-400 font-bold">
                      {skill.version}
                    </span>
                    <span className="text-xs text-slate-500">
                      {skill.downloads} 次下载
                    </span>
                    <span className="text-xs text-slate-500">
                      更新于 {skill.updatedAt}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{skill.name}</h2>
                  <p className="text-sm text-slate-400 mb-3">
                    《{skill.book}》· {skill.author}
                  </p>
                  <p className="text-sm text-slate-500 mb-4">{skill.description}</p>

                  {/* Pipeline stages */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {skill.stages.map((stage, j) => (
                      <span key={stage} className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${stageBg[stage]} text-slate-300`}>
                          {stage}
                        </span>
                        {j < skill.stages.length - 1 && (
                          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Files */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {skill.files.map(file => (
                      <button
                        key={file.name}
                        className="group relative flex items-center gap-2 p-2.5 rounded-xl bg-dark-card-hover/50 border border-dark-border hover:border-cyan-500/30 transition-all text-left"
                      >
                        <div className={`w-8 h-8 rounded-lg ${stageBg[file.stage]} flex items-center justify-center shrink-0`}>
                          {file.type === 'pdf' && (
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          )}
                          {file.type === 'image' && (
                            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {file.type === 'card' && (
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                          {file.type === 'markdown' && (
                            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-slate-300 truncate">{file.name}</div>
                          <div className="text-[10px] text-slate-600">{file.size}</div>
                        </div>
                        <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-dark-bg/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            下载
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
