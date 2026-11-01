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
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-[#0071e3]/[.07] text-[#0071e3] text-[11px] font-semibold">{t.cat}</span>
          {t.platform === 'loongbuddy' && (
            <span className="px-2 py-0.5 rounded-full bg-[#1d1d1f]/[.06] text-[#1d1d1f] text-[11px] font-semibold">⚡ LoongBuddy</span>
          )}
          {t.platform === 'need' && (
            <span className="px-2 py-0.5 rounded-full bg-[#86868b]/[.12] text-[#86868b] text-[11px] font-medium">连接器待补</span>
          )}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#ff2d55] shrink-0">
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

const NEEDS_API = 'https://api.aibay.asia/needs/needs'

function NeedsForm() {
  const [form, setForm] = useState({ software: '', scene: '', expect: '', contact: '', website: '' })
  const [state, setState] = useState('idle')
  const [msg, setMsg] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (state === 'sending') return
    if (form.contact.trim().length < 5) {
      setState('error')
      setMsg('请留联系方式（微信号 / 手机号）')
      return
    }
    if (form.software.trim().length + form.scene.trim().length + form.expect.trim().length < 4) {
      setState('error')
      setMsg('请至少写一点想拆的软件或使用场景')
      return
    }
    setState('sending')
    setMsg('')
    try {
      const r = await fetch(NEEDS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok && d.ok) {
        setState('ok')
        setForm({ software: '', scene: '', expect: '', contact: '', website: '' })
      } else {
        setState('error')
        setMsg(d.error || '提交失败，请稍后再试，或直接加微信 ikoning365')
      }
    } catch {
      setState('error')
      setMsg('网络异常，提交失败——加微信 ikoning365 一样能提需求')
    }
  }

  return (
    <form onSubmit={submit} className="apple-card p-6 md:p-10 text-left">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-bold text-[#1d1d1f] mb-1.5">想拆的软件 / 工具 <span className="text-[#86868b] font-normal">（可不填）</span></label>
          <input value={form.software} onChange={set('software')} maxLength={120} className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-[14px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-[#0071e3]/40" placeholder="如：京东价保监控、券商 App" />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[#1d1d1f] mb-1.5">联系方式 <span className="text-[#ff2d55]">*</span></label>
          <input value={form.contact} onChange={set('contact')} maxLength={60} className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-[14px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-[#0071e3]/40" placeholder="微信号 / 手机号" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#1d1d1f] mb-1.5">你现在是怎么做的</label>
          <textarea value={form.scene} onChange={set('scene')} rows={3} maxLength={600} className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-[14px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-[#0071e3]/40 resize-none" placeholder="比如：每天早上手动打开 5 个软件挨个看，大概花 40 分钟" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#1d1d1f] mb-1.5">想要 AI 帮你做到什么</label>
          <textarea value={form.expect} onChange={set('expect')} rows={3} maxLength={600} className="w-full rounded-xl bg-[#f5f5f7] px-4 py-3 text-[14px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-[#0071e3]/40 resize-none" placeholder="比如：早上 8 点自动汇总成一条消息发给我" />
        </div>
      </div>
      <input type="text" name="website" value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state === 'ok' ? (
        <div className="mt-5 rounded-xl bg-[#34c759]/10 text-[#1d8a3e] text-[14px] px-4 py-3 font-semibold">已收到！我们按需求排期后，会通过你留的联系方式告诉你。</div>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={state === 'sending'} className="btn-primary">{state === 'sending' ? '提交中…' : '提交需求 →'}</button>
          <span className="text-[13px] text-[#86868b]">提交后由工作坊老师人工跟进，不群发打扰。</span>
        </div>
      )}
      {state === 'error' && (
        <div className="mt-4 rounded-xl bg-[#ff2d55]/10 text-[#d1334e] text-[13.5px] px-4 py-3">
          {msg}
          <button type="button" onClick={() => { try { navigator.clipboard?.writeText('ikoning365') } catch (e) {} }} className="ml-2 underline font-semibold">复制微信 ikoning365</button>
        </div>
      )}
    </form>
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
          <div className="eyebrow mb-4">拆书帮小蛮腰AI拆书课 玄龙拆AI工作坊</div>
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
              {w.link && <a href={w.link} className="btn-secondary">看本场完整介绍 →</a>}
            </div>
          </div>
        </motion.section>
      ))}

      {soon.length > 0 && (
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
                    {w.link && (
                      <div className="mt-3">
                        <a href={w.link} className="text-[13px] font-semibold text-[#0071e3] hover:underline">看本场完整介绍 →</a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ==================== 主题投票：我支持 ==================== */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">想拆哪个 · 我支持</div>
            <h2 className="headline text-[30px] md:text-[38px] mb-4">主题投票，<span className="gradient-text">支持数高的先开</span></h2>
            <p className="text-[15px] text-[#6e6e73] max-w-2xl mx-auto">
              同类软件已合并为一个主题，开课时用你手头那款。优先平台 LoongBuddy（25+ 官方连接器），workbuddy 同步支持；带「连接器待补」的主题票高就立项补连接器。点「我支持」为你想拆的主题投票——支持数最高的优先排期开课。列表里没有你想拆的？到下方「说出你的需求」填一下。
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

      {/* ==================== 说出你的需求：客户自助填 ==================== */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">列表里没有 · 说出你的需求</div>
            <h2 className="headline text-[26px] md:text-[32px] mb-4">你想要的工作坊，<span className="gradient-text">填了就算投票</span></h2>
            <p className="text-[15px] text-[#6e6e73] max-w-xl mx-auto">
              想拆的软件不在列表里？花一分钟写下你现在的做法和想要的效果——需求集中同类多，就优先开成新一期工作坊。
            </p>
          </div>
          <NeedsForm />
        </div>
      </section>
    </div>
  )
}
