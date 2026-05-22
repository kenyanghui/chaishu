import { useState } from 'react'
import { skillSources, fusionPacks } from '../data/skillFusion'

const BASE = import.meta.env.BASE_URL || '/'

const catColors = {
  '东方智慧': 'border-emerald-500/30 from-emerald-500/10 to-transparent',
  '思维方法': 'border-violet-500/30 from-violet-500/10 to-transparent',
  '战略方法': 'border-red-500/30 from-red-500/10 to-transparent',
  '投资智慧': 'border-amber-500/30 from-amber-500/10 to-transparent',
}

const catAccents = {
  '东方智慧': 'text-emerald-400',
  '思维方法': 'text-violet-400',
  '战略方法': 'text-red-400',
  '投资智慧': 'text-amber-400',
}

function dl(url, name) {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function dlTar(sourceId) {
  // 知本创业法 use sub-category tars
  if (sourceId === 'book2startup') {
    // Don't have a single tar for all - handled per category
    return
  }
  dl(`${BASE}skills/${sourceId}.tar.gz`, `${sourceId}.tar.gz`)
}

function dlSubTar(categorySlug) {
  dl(`${BASE}skills/book2startup-${categorySlug}.tar.gz`, `book2startup-${categorySlug}.tar.gz`)
}

function dlSkill(sourceId, slug) {
  // book2startup entries are categories, use sub-tar instead
  if (sourceId === 'book2startup') {
    dlSubTar(slug)
    return
  }
  dl(`${BASE}skills/${sourceId}/${slug}.md`, `${sourceId}-${slug}.md`)
}

function dlFusion(name, id) {
  const encoded = encodeURIComponent(name)
  dl(`${BASE}skills/fusion-packs/${encoded}.md`, `${id}.md`)
}

export default function SkillFusion() {
  const [expandedId, setExpandedId] = useState(null)
  const [expandedPack, setExpandedPack] = useState(null)
  const [tab, setTab] = useState('sources')

  const total = skillSources.reduce((s, src) => s + src.skills.length, 0)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">
            <span className="gradient-text">技能融合工坊</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            8 个思想体系、<span className="text-neon-purple font-bold">{total}</span> 个技能、<span className="text-neon-purple font-bold">6</span> 个融合组合包 — 全部本站直接下载
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {[
            { k: 'sources', l: '技能来源' },
            { k: 'fusion', l: '融合组合包' },
          ].map(t => (
            <button key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.k
                  ? 'bg-neon-purple text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >{t.l}</button>
          ))}
        </div>

        {tab === 'sources' && (
          <div className="grid gap-4">
            {skillSources.map(src => (
              <div key={src.id}
                className={`rounded-xl border bg-gradient-to-br ${catColors[src.category] || 'border-slate-700/50 from-slate-800/50 to-slate-900/50'} overflow-hidden`}
              >
                <button
                  onClick={() => setExpandedId(expandedId === src.id ? null : src.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xl font-black ${catAccents[src.category] || 'text-slate-300'}`}>
                      {src.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-400">
                      {src.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-400">
                      {src.skills.length} 技能
                    </span>
                  </div>
                  <svg className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${expandedId === src.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedId === src.id && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-500 mb-4">{src.description}</p>

                    {/* 下载全部 */}
                    {src.id !== 'book2startup' && (
                      <button onClick={() => dlTar(src.id)}
                        className="mb-4 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-all inline-flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        下载全部 ({src.id}.tar.gz)
                      </button>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
                      {src.skills.map(sk => (
                        <div key={sk.slug}
                          className="group flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                              {sk.name}
                            </div>
                            <div className="text-[11px] text-slate-600 truncate">{sk.desc}</div>
                          </div>
                          <button onClick={() => dlSkill(src.id, sk.slug)}
                            className="ml-2 p-1.5 rounded hover:bg-white/10 text-slate-600 hover:text-neon-purple transition-all opacity-0 group-hover:opacity-100 shrink-0"
                            title="下载">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {tab === 'fusion' && (
          <div className="grid md:grid-cols-2 gap-5">
            {fusionPacks.map(p => (
              <div key={p.id}
                className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-neon-purple/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPack(expandedPack === p.id ? null : p.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xl mr-2">{p.emoji}</span>
                      <span className="text-lg font-bold text-white">{p.name}</span>
                    </div>
                    <svg className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform ${expandedPack === p.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">{p.description}</p>
                </button>

                {expandedPack === p.id && (
                  <div className="px-5 pb-5">
                    <div className="space-y-1.5 mb-4">
                      {p.combinations.map((c, i) => {
                        const src = skillSources.find(s => s.id === c.from)
                        const sk = src?.skills.find(s => s.slug === c.skill)
                        return (
                          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03]">
                            <span className="text-xs font-bold text-neon-purple mt-0.5 shrink-0">#{i + 1}</span>
                            <div className="min-w-0">
                              <div className="text-sm text-white truncate">
                                <span className="font-medium">{sk?.name || c.skill}</span>
                                <span className="text-slate-600 mx-1">·</span>
                                <span className="text-slate-500">{src?.name}</span>
                              </div>
                              <div className="text-xs text-slate-600 truncate">{c.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <button onClick={() => dlFusion(p.name, p.id)}
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
