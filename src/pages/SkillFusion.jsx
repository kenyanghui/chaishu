import { useState } from 'react'
import { skillSources, fusionPacks } from '../data/skillFusion'

const categoryColors = {
  '东方智慧': 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
  '思维方法': 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
  '战略方法': 'from-red-500/20 to-rose-500/10 border-red-500/30',
  '投资智慧': 'from-amber-500/20 to-yellow-500/10 border-amber-500/30',
}

const catAccents = {
  '东方智慧': 'text-emerald-400',
  '思维方法': 'text-violet-400',
  '战略方法': 'text-red-400',
  '投资智慧': 'text-amber-400',
}

const BASE = import.meta.env.BASE_URL || '/'

function downloadFile(url, filename) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

function downloadFusionPack(pack) {
  const url = `${BASE}skills/fusion-packs/${pack.name}.md`
  downloadFile(url, `${pack.id}.md`)
}

function downloadSkill(sourceId, skillName, slug) {
  const url = `${BASE}skills/${sourceId}/${slug}.md`
  downloadFile(url, `${sourceId}-${slug}.md`)
}

export default function SkillFusion() {
  const [expandedSource, setExpandedSource] = useState(null)
  const [expandedPack, setExpandedPack] = useState(null)
  const [activeTab, setActiveTab] = useState('sources')

  const totalSkills = skillSources.reduce((s, src) => s + src.skills.length, 0)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">
            <span className="gradient-text">技能融合工坊</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            将 8 个思想体系、{totalSkills} 个技能跨域融合，产生全新的思维组合
          </p>
        </div>

        {/* Tab切换 */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'sources', label: '技能来源' },
            { id: 'fusion', label: '融合组合包' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-neon-purple text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'sources' && (
          <div className="grid gap-6">
            {skillSources.map(source => (
              <div
                key={source.id}
                className={`rounded-xl border bg-gradient-to-br ${categoryColors[source.category] || 'from-slate-800/50 to-slate-900/50 border-slate-700/50'}`}
              >
                <button
                  onClick={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
                  className="w-full text-left p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-black ${catAccents[source.category] || 'text-slate-300'}`}>
                      {source.name}
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-300">
                        {source.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-300">
                        {source.skills.length} 技能
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={source.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-sm text-slate-500 hover:text-neon-purple transition-colors"
                    >
                      GitHub →
                    </a>
                    <svg className={`w-5 h-5 text-slate-500 transition-transform ${expandedSource === source.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedSource === source.id && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-slate-400 mb-4">{source.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {source.skills.map(skill => (
                        <div
                          key={skill.slug}
                          className="group relative flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                              {skill.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">{skill.desc}</div>
                          </div>
                          <button
                            onClick={() => downloadSkill(source.id, skill.name, skill.slug)}
                            className="ml-2 p-1.5 rounded hover:bg-white/10 text-slate-500 hover:text-neon-purple transition-all opacity-0 group-hover:opacity-100 shrink-0"
                            title="下载 SKILL.md"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'fusion' && (
          <div className="grid md:grid-cols-2 gap-6">
            {fusionPacks.map(pack => (
              <div
                key={pack.id}
                className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-neon-purple/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPack(expandedPack === pack.id ? null : pack.id)}
                  className="w-full text-left p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-2xl mr-2">{pack.emoji}</span>
                      <span className="text-xl font-bold text-white">{pack.name}</span>
                    </div>
                    <svg className={`w-5 h-5 text-slate-500 transition-transform shrink-0 mt-1 ${expandedPack === pack.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-400">{pack.description}</p>
                </button>

                {expandedPack === pack.id && (
                  <div className="px-6 pb-6">
                    <div className="space-y-2 mb-4">
                      {pack.combinations.map((combo, i) => {
                        const source = skillSources.find(s => s.id === combo.from)
                        const skill = source?.skills.find(s => s.slug === combo.skill)
                        return (
                          <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-white/5">
                            <span className="text-xs font-bold text-neon-purple mt-0.5 shrink-0">#{i + 1}</span>
                            <div>
                              <div className="text-sm text-white">
                                <span className="font-medium">{skill?.name || combo.skill}</span>
                                <span className="text-slate-500 mx-1">·</span>
                                <span className="text-slate-400">{source?.name}</span>
                              </div>
                              <div className="text-xs text-slate-500">{combo.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => downloadFusionPack(pack)}
                      className="w-full py-2 rounded-lg bg-neon-purple/20 text-neon-purple text-sm font-medium hover:bg-neon-purple/30 transition-colors"
                    >
                      下载融合包 (.md)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
