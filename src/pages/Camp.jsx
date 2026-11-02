import { motion } from 'framer-motion'

const tracks = [
  {
    id: 'workflow',
    emoji: '🔗',
    name: '工作流版块',
    tagline: '一件事交给 AI 一串步骤做完',
    desc: '拆 GitHub 热门工作流项目，自己动手接一条：官网自动更新、内容自动发布、资料自动归档。你正在看的这个网站，就是工作流搭的。',
    demos: [
      { name: '本站 chai.aibay.asia', url: 'https://chai.aibay.asia/', note: '工作流自动更新的活案例' },
      { name: '工作手册 /workbook', url: 'https://chai.aibay.asia/workbook', note: '线上可翻的实操手册' },
    ],
    outcome: '带走 1 条自己接好的工作流',
  },
  {
    id: 'workbench',
    emoji: '🛠️',
    name: '工作台版块',
    tagline: '你的 AI 工作台，装机即用',
    desc: 'LoongBuddy 场景陪跑 + LoongHarness 工作台，五平台直接下载，Windows / macOS / Linux 全覆盖。营内带你从零装到跑通第一个任务。',
    demos: [
      { name: 'Loong Desktop 下载', url: 'https://www.aibay.asia/#download', note: '五平台直链 + SHA256 校验' },
      { name: 'LoongHarness 在线演示', url: 'https://kenyanghui.github.io/dsh-workbench/', note: '打开就能玩的工作台原型' },
    ],
    outcome: '带走 1 个能干活的本机 AI 工作台',
  },
  {
    id: 'quant',
    emoji: '📈',
    name: '量化版块',
    tagline: '用数据说话，让纪律替你盯盘',
    desc: '拆开源量化工具：回测框架、选股器、财报解读、盯盘提醒。从开源软件改造入手，营内验证你的第一个量化小原型。',
    demos: [
      { name: '量化训练营网站', url: 'https://www.aibay.asia/coach/', note: '决策系统训练营·工具拆解 30+ 篇' },
    ],
    outcome: '带走 1 个跑通的开源量化小原型',
  },
]

export default function Camp() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <main className="flex-1">
        <div className="hero-wash">
          <section className="px-4 pt-14 pb-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="eyebrow mb-4">线上 · 拆AI营</div>
              <h1 className="text-[34px] sm:text-[44px] font-bold text-[#f5f5f7] tracking-tight leading-tight mb-5">
                拆AI营 · 三个版块<br />每版块带走一个真原型
              </h1>
              <p className="text-[16px] text-[#a1a1c2] leading-relaxed max-w-2xl mx-auto">
                拆的是 AI，拆为己用。工作流 / 工作台 / 量化三个版块，目标不是听课，
                是<b className="text-[#f5f5f7]">验证你自己的原型</b>——想深入，再走 Loong FDE 实现路径；
                想随身带，AI 手机开机即用。
              </p>
            </div>
          </section>

          <section className="px-4 pb-12">
            <div className="max-w-4xl mx-auto space-y-5">
              {tracks.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/[.04] border border-white/[.08] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[24px]">{t.emoji}</span>
                    <h2 className="text-[20px] font-bold text-[#f5f5f7]">{t.name}</h2>
                    <span className="text-[13px] text-[#8e8e93] ml-auto hidden sm:block">{t.tagline}</span>
                  </div>
                  <p className="text-[14px] text-[#a1a1c2] leading-relaxed mb-4">{t.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.demos.map(d => (
                      <a key={d.name} href={d.url} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/[.06] border border-white/[.1] px-3.5 py-1.5 text-[13px] text-[#d1d1d6] hover:bg-white/[.1] transition-colors">
                        {d.name} <span className="text-[#8e8e93]">· {d.note} ↗</span>
                      </a>
                    ))}
                  </div>
                  <div className="text-[13px] text-[#6e6e73]">🎯 {t.outcome}</div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="px-4 pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="rounded-2xl bg-white/[.04] border border-white/[.08] p-8">
                <h3 className="text-[20px] font-bold text-[#f5f5f7] mb-3">怎么加入</h3>
                <p className="text-[14px] text-[#a1a1c2] leading-relaxed mb-2">
                  每周三晚线上开拆（腾讯会议），单次 90 分钟。三个版块轮着拆，
                  公众号每篇文章就是当周预告。
                </p>
                <p className="text-[13px] text-[#6e6e73] mb-6">
                  关注公众号「AI创新增长杨教练」看每周拆什么 · 加微信 ikoning365 备注「拆AI营」占座
                </p>
                <button type="button" onClick={() => { try { navigator.clipboard?.writeText('ikoning365') } catch (e) {} }}
                  className="btn-primary" title="点击复制微信号">复制微信号 ikoning365 📋</button>
              </div>
              <p className="text-[12px] text-[#6e6e73] mt-6">
                原型跑通想深做？<a href="https://www.aibay.asia/#partner" className="text-[#2997ff] hover:underline">Loong FDE 实现路径 ↗</a>
                &nbsp;·&nbsp;想随身带走？<a href="https://www.aibay.asia/#phone" className="text-[#2997ff] hover:underline">AI 手机开机即用 ↗</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
