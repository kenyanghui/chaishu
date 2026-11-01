import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import workshops, { seriesIntro } from '../data/workshops'

const pains = [
  { q: '收藏了一百篇干货，要用时一篇都找不到', a: '知识没有库，就等于没有。11 月 1 日首场，先把它装进去。' },
  { q: '公众号定了周更，三个月只发了两篇', a: '靠意志力的更新必断。让工作流替你写，你只管按发布。' },
  { q: 'AI 工具收藏了一排，一个都没用起来', a: '工具不在多，在拆。拆透一个，胜过收藏十个。' },
  { q: '看了很多 AI 课程，还是做不出自己的东西', a: '因为课里拆的是别人的案例。这里，拆你自己的。' },
]

const chaifa = [
  { k: '拆什么', d: '拆 AI 软件，拆 AI 本身——只拆 workbuddy 连接器里真实存在的：ima、微信读书、腾讯会议、企查查、飞猪……每一个都是当场拆开、当场接上的真软件。', icon: 'M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zm0 5c0 1.66 3.58 3 8 3s8-1.34 8-3m-16 5c0 1.66 3.58 3 8 3s8-1.34 8-3' },
  { k: '怎么拆', d: '沿用拆书帮 RIA 方法论：R 找到软件里对你有用的片段，I 用自己的话重述它，A 规划出你的下一步行动。', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { k: '拆为己用', d: '不是学完就散，是带走你自己的知识库、工作流、阵地和复盘看板。', icon: 'M16 7l-4 4-4-4m8 6l-4 4-4-4' },
]

export default function Home() {
  const first = workshops[0]
  const rest = workshops.slice(1)

  return (
    <div className="hero-wash">
      {/* ==================== Hero ==================== */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow mb-4">拆书帮广州小蛮腰分舵 AI拆书工作坊阵地</div>
            <h1 className="headline text-[44px] md:text-[64px] mb-6">
              别再学 AI 了，<br />
              <span className="gradient-text">把它拆开，为己所用。</span>
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-[#6e6e73] max-w-2xl mx-auto mb-9">
              这里不教你收藏工具。每一期工作坊，我们当场拆开一个真实在跑的 AI 软件，
              用拆书帮的 RIA 方法论拆为己用——3 小时，带走一件你亲手做出来的东西。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/workshop/" className="btn-primary">
                报名工作坊 →
              </a>
              <Link to="/workshops" className="btn-secondary">
                看全部主题 & 投票 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 学习者痛点 ==================== */}
      <section className="py-20 px-4 bg-white border-y border-black/[.05]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">从你出发</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">这些卡点，是不是很熟悉？</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="apple-card p-6"
              >
                <div className="text-[16px] font-semibold text-[#1d1d1f] mb-2.5">“{p.q}”</div>
                <div className="text-[14px] leading-relaxed text-[#6e6e73]">{p.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 拆法 RIA 重释 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">我们的拆法</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-4">拆的是 AI，拆为己用</h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-12 max-w-2xl mx-auto">
            把 AI 软件拆成你的生产力。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {chaifa.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="apple-card p-7 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#0071e3]/[.08] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2.5">{c.k}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 工作坊主题 ==================== */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">工作坊全系列</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-4">首场 11 月 1 日开课，<span className="gradient-text">其余你说了算</span></h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-12 max-w-3xl mx-auto">{seriesIntro}</p>

          {/* 首场 spotlight */}
          <div className="apple-card p-8 mb-4 border-[#0071e3]/25 shadow-[0_10px_36px_rgba(0,113,227,.10)]">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] animate-pulse" />
                  {first.statusLabel}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[11px] text-[#86868b] font-semibold tracking-wide">拆的软件</span>
                  {first.tools.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#1d1d1f] text-white text-[12px] font-bold tracking-wide">{t}</span>
                  ))}
                </div>
                <h3 className="text-[26px] font-bold text-[#1d1d1f] tracking-tight">{first.title}</h3>
                <p className="text-[#6e6e73] text-[15px] mt-2 max-w-xl">{first.short}</p>
              </div>
              <a href={first.signupUrl} target="_blank" rel="noreferrer" className="btn-primary shrink-0">立即报名</a>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ['时间', first.date],
                ['地点', first.location],
                ['费用', first.fee],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#f5f5f7] px-4 py-3">
                  <div className="text-[11px] text-[#86868b] font-semibold mb-0.5">{k}</div>
                  <div className="text-[13px] text-[#1d1d1f] leading-snug">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 02-04 期 compact */}
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="apple-card p-6"
              >
                <div className="inline-flex px-2.5 py-0.5 rounded-full bg-black/[.05] text-[#86868b] text-[11.5px] font-semibold mb-3">{w.statusLabel}</div>
                <div className="text-[17px] font-bold text-[#1d1d1f] mb-1.5">{w.title}</div>
                <p className="text-[13.5px] text-[#6e6e73] leading-relaxed mb-3">{w.short}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {w.tools.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#1d1d1f] text-white text-[12px] font-bold tracking-wide">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/workshops" className="btn-secondary">36 个主题 · 点「我支持」投票 →</Link>
          </div>
        </div>
      </section>

      {/* ==================== 三个带走 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">验收标准</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">每期只认一个标准：你带走了什么</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['做出来', '不是听完，是当场做出来。每期 3 小时，一半时间你在动手，讲师和助教巡场兜底。'],
              ['带得走', '产出全部落在你自己的账号里：你的知识库、你的工作流、你的网站、你的看板。'],
              ['用得上', '每期配 30 天行动计划和复盘卡。第 2 期开课时，先验收上一期你用得怎么样。'],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-[34px] font-bold gradient-text mb-3">0{i + 1}</div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2">{t}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-white border-t border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[28px] md:text-[36px] mb-4">第一期，从你的知识库开始。</h2>
          <p className="text-[#6e6e73] text-[15px] mb-6">
            2026-11-01（周日）14:00–17:00 · 广州越秀 · 仅限 10 人，先到先得。
          </p>
          <div className="flex flex-col items-center gap-3">
            <img src="/images/ima-knowledge-qr.png" alt="【AI拆书帮】知识库二维码" className="w-[200px] rounded-2xl border border-black/[.06] shadow-[0_8px_28px_rgba(0,0,0,.10)]" />
            <p className="text-[14px] text-[#6e6e73] font-semibold">微信或 ima 扫码，订阅【AI拆书帮】知识库</p>
            <a href="/workshop/" className="text-[13px] text-[#0071e3] hover:underline">了解第一期课程 →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
