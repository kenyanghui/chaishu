import { motion } from 'framer-motion'
import workshops, { seriesIntro } from '../data/workshops'

export default function Workshops() {
  const open = workshops.filter(w => w.status === 'open')
  const soon = workshops.filter(w => w.status === 'soon')

  return (
    <div className="hero-wash">
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">工作坊全系列</div>
          <h1 className="headline text-[38px] md:text-[52px] mb-5">五期一个体系，<span className="gradient-text">从知识库到数字员工</span></h1>
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
              <span className="text-[12px] text-[#86868b] font-medium">{w.target}</span>
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
              <a href={w.link} className="btn-primary">立即报名 · 微信 ikoning365</a>
              <a href="/workshop/" className="btn-secondary">看第 1 期完整介绍 →</a>
            </div>
          </div>
        </motion.section>
      ))}

      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-6">后续各期 · 筹备中</div>
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
                    <div className="text-[12.5px] text-[#0071e3] font-medium mb-3">{w.target}</div>
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

          <div className="mt-10 mb-4 text-center">
            <p className="text-[14px] text-[#6e6e73] mb-5">
              想优先开哪一期？或在等待列表占个位——加微信 ikoning365，备注「工作坊」。
            </p>
            <a href="/workshop/" className="btn-primary">报名工作坊 →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
