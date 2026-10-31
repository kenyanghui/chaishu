import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import workshops, { seriesIntro, voteThemes } from '../data/workshops'

const VOTE_KEY = 'chai-votes-v1'
const HEART = 'M12 21s-6.7-4.35-9.33-8.11C.9 10.2 1.96 6.5 5.05 5.36 7.13 4.6 9.4 5.3 12 7.5c2.6-2.2 4.87-2.9 6.95-2.14 3.09 1.14 4.15 4.84 2.38 7.53C18.7 16.65 12 21 12 21z'

function SupportCard({ t, i }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(Number(localStorage.getItem(`${VOTE_KEY}:count:${t.id}`) || 0))
  }, [t.id])
  const bump = () => {
    const nc = count + 1
    setCount(nc)
    localStorage.setItem(`${VOTE_KEY}:count:${t.id}`, String(nc))
  }
  return (
    <motion.button
      type="button"
      onClick={bump}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
      className="apple-card p-5 text-left transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-[#0071e3]/[.07] text-[#0071e3] text-[11px] font-semibold">{t.cat}</span>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#ff2d55]">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="#ff2d55" stroke="#ff2d55" strokeWidth={1.8}>
            <path d={HEART} />
          </svg>
          我支持 {count}
        </span>
      </div>
      <div className="text-[16px] font-bold text-[#1d1d1f] mb-1">{t.title}</div>
      <div className="text-[13px] text-[#6e6e73] leading-relaxed">{t.desc}</div>
    </motion.button>
  )
}

export default function Workshops() {
  const open = workshops.filter(w => w.status === 'open')
  const soon = workshops.filter(w => w.status === 'soon')
  const cats = [...new Set(voteThemes.map(t => t.cat))]

  return (
    <div className="hero-wash">
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">拆书帮小蛮腰 拆AI工作坊</div>
          <h1 className="headline text-[38px] md:text-[52px] mb-5">想拆哪个，<span className="gradient-text">你说了算</span></h1>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-[#6e6e73] max-w-2xl mx-auto">{seriesIntro}</p>
        </div>
      </section>

      {open.map(w => (
        <motion.section
          key={w.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 pb-8"
        >
          <div className="max-w-4xl mx-auto apple-card p-8 md:p-10 border-[#0071e3]/25 shadow-[0_10px_36px_rgba(0,113,227,.10)]">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
                {w.statusLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[11px] text-[#86868b] font-semibold tracking-wide">拆的软件</span>
                {w.tools.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-[#1d1d1f] text-white text-[12.5px] font-bold tracking-wide">{t}</span>
                ))}
              </span>
            </div>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-3">{w.no} · {w.title}</h2>
            <p className="text-[15.5px] leading-relaxed text-[#6e6e73] mb-7 max-w-2xl">{w.summary}</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-7">
              {[
                ['时间', w.date],
                ['地点', w.location],
                ['费用', w.fee],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#f5f5f7] px-4 py-3">
                  <div className="text-[11px] text-[#86868b] font-semibold mb-0.5">{k}</div>
                  <div className="text-[13px] text-[#1d1d1f] leading-snug">{v}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-[13px] font-bold text-[#1d1d1f] mb-3">现场带走</div>
                <ul className="space-y-2">
                  {w.outcomes.map(o => (
                    <li key={o} className="flex gap-2 text-[13.5px] text-[#424245] leading-relaxed">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <div className="text-[13px] font-bold text-[#1d1d1f] mb-3">适合谁</div>
                <div className="flex flex-wrap gap-2">
                  {w.who.map(p => (
                    <span key={p} className="px-3 py-1.5 rounded-full bg-black/[.04] text-[#424245] text-[13px]">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {w.signupUrl ? (
                <a href={w.signupUrl} target="_blank" rel="noreferrer" className="btn-primary">立即报名（拆书帮公众号）→</a>
              ) : (
                <button type="button" onClick={() => { try { navigator.clipboard?.writeText('ikoning365') } catch (e) {} }} className="btn-primary" title="点击复制微信号">立即报名（微信 ikoning365）→</button>
              )}
              <a href="/workshop/" className="btn-secondary">看本场完整介绍 →</a>
            </div>
          </div>
        </motion.section>
      ))}

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-6">已排上 · 11 月排期中</div>
          <div className="space-y-4">
            {soon.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="apple-card p-6 md:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[22px] font-bold text-[#c7c7cc]">{w.no}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black/[.05] text-[#86868b] text-[11.5px] font-semibold">{w.statusLabel}</span>
                    </div>
                    <h3 className="text-[19px] font-bold text-[#1d1d1f] mb-1.5">{w.title}</h3>
                    <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-2.5 max-w-xl">{w.short}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[11px] text-[#86868b] font-semibold tracking-wide">拆的软件</span>
                      {w.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-[#1d1d1f] text-white text-[12px] font-bold tracking-wide">{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {w.outcomes.map(o => (
                        <span key={o} className="px-2.5 py-1 rounded-lg bg-[#0071e3]/[.06] text-[#424245] text-[12.5px]">{o}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 主题投票：我支持 ==================== */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">想拆哪个 · 我支持</div>
            <h2 className="headline text-[30px] md:text-[38px] mb-4">主题投票，<span className="gradient-text">支持数高的先开</span></h2>
            <p className="text-[15px] text-[#6e6e73] max-w-2xl mx-auto">
              默认 AI 平台 workbuddy。点「我支持」为你想拆的主题投票——支持数最高的优先排期开课。列表里没有你想拆的？加微信 ikoning365 告诉我。
            </p>
          </div>
          {cats.map(cat => (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[15px] font-bold text-[#1d1d1f]">{cat}</span>
                <span className="h-px flex-1 bg-black/[.06]" />
                <span className="text-[12px] text-[#86868b]">{voteThemes.filter(t => t.cat === cat).length} 个主题</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {voteThemes.filter(t => t.cat === cat).map((t, i) => (
                  <SupportCard key={t.id} t={t} i={i} />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 mb-4 text-center">
            <p className="text-[14px] text-[#6e6e73] mb-5">
              投完票想聊聊？加微信 ikoning365，备注「工作坊」——也帮你想拆的软件出出主意。
            </p>
            <a href="https://mp.weixin.qq.com/s/4lIyWBUPOFqsNlyJNd1K-Q" target="_blank" rel="noreferrer" className="btn-primary">报名首场（拆书帮公众号）→</a>
            <button type="button" onClick={() => { try { navigator.clipboard?.writeText('ikoning365') } catch (e) {} }} className="btn-secondary" title="点击复制微信号">后续场次报名：微信 ikoning365 📋</button>
          </div>
        </div>
      </section>
    </div>
  )
}
