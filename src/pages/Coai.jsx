import { motion } from 'framer-motion'

// ===== 六条合作线（与 Chaibuddy.jsx 的 MODES 同族，本页是展开版详细介绍）=====
const PROJECTS = [
  {
    id: 'cohost',
    emoji: '🎤',
    name: '联合带场',
    full: '把共拆AI工作坊带回你的分舵 / 企业',
    project: '六场共拆AI工作坊',
    href: '/workshops',
    cta: '看六场课件',
    accent: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    bar: 'from-amber-500/20 to-yellow-500/10',
    what: '「共拆AI」系列已经跑出六场完整工作坊：从 RIA 便签法×AI、AI 拆书家养成，到知识地图、信息图蒸馏。每一场的课件、带场流程与互动设计全部开放，不设门槛。',
    who: ['培训讲师', 'HR人力', '教练', '管理者', '演讲表达'],
    how: '看完六场课件，挑一场你最有感觉的，跟站长约联合主讲——你带场景与学员，我们带方法与 AI 工具链。',
  },
  {
    id: 'expert',
    emoji: '🧠',
    name: '领域 AI 专家',
    full: '共创你的「XX 领域 AI 专家」Skill',
    project: '拆专家工坊',
    href: '/skill-fusion',
    cta: '看拆专家工坊',
    accent: 'text-violet-500 border-violet-500/30 bg-violet-500/10',
    bar: 'from-violet-500/20 to-purple-500/10',
    what: '拆书家的领域拆页是稀缺语料。拆专家工坊把你的领域知识——心理、法律、财务、医疗……整理成结构化技能，训练出一个「XX 领域 AI 专家」，成为该领域第一个共拆样本。',
    who: ['心理咨询', '教练', '财务会计', '法律', '医疗健康', '宝妈亲子'],
    how: '带着你最熟的 3-5 本书来，一起提炼技能蓝图，从拆页语料到可用的 AI 技能全程共建。',
  },
  {
    id: 'factory',
    emoji: '🏭',
    name: '内容工厂',
    full: '把知识库变成日更公众号',
    project: 'WorkBuddy 内容工厂 Skill（开源）',
    href: 'https://github.com/kenyanghui/wechat-pub-workbuddy',
    cta: '看开源 Skill',
    accent: 'text-sky-500 border-sky-500/30 bg-sky-500/10',
    bar: 'from-sky-500/20 to-blue-500/10',
    what: '开源的 WorkBuddy skill 把你的知识库变成一条内容产线：每天自动产出 3 篇原创草稿直进公众号草稿箱，你只做终审与排版，日更不再靠意志力。',
    who: ['自媒体', '文案写作', '读书阅读'],
    how: 'fork 开源仓，接入你自己的知识库与公众号——跑通第一条产线大约一个下午。',
  },
  {
    id: 'opensource',
    emoji: '🛠️',
    name: '开源共建',
    full: '共建 AI 拆书方法论',
    project: 'chaiflow 开源仓（MIT）',
    href: 'https://github.com/kenyanghui/chaiflow',
    cta: '看开源仓',
    accent: 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10',
    bar: 'from-emerald-500/20 to-green-500/10',
    what: 'chaiflow 开源仓摊开了整条 AI 拆书管线：建站决策记录、爬取纪律、部署踩坑复盘、生产操作手册，原样公开。你要复刻一条知识管线，或者把方法论带进自己的领域，都能直接抄作业。',
    who: ['程序员', '产品经理', '设计师'],
    how: '从提 issue 开始——哪条经验对你有用、哪里缺文档，都是好 PR；想共建 skill 生态的直接看 playbooks。',
  },
  {
    id: 'library',
    emoji: '📚',
    name: '全库共拆',
    full: '2255 本书任你拆',
    project: 'chailive 全库站',
    href: 'https://www.aibay.asia/chailive/',
    cta: '进全库站',
    accent: 'text-teal-500 border-teal-500/30 bg-teal-500/10',
    bar: 'from-teal-500/20 to-cyan-500/10',
    what: 'chailive 全库站已拆 2255 本书、19262 页拆页，按兴趣归成六大模块。这是最能直接上手的一条线：认领你领域的书补拆或校对，成果署名入库。',
    who: ['读书阅读', '学生', '英语', '时间管理'],
    how: '进全库站挑一个兴趣模块 → 找到想认领的书 → 按拆页格式提交，署名共建。',
  },
  {
    id: 'visual',
    emoji: '🎨',
    name: '知识视觉化',
    full: '共创看得懂的信息图',
    project: '拆书赏鉴信息图画廊',
    href: '/chaibuddy#gallery',
    cta: '看信息图画廊',
    accent: 'text-rose-500 border-rose-500/30 bg-rose-500/10',
    bar: 'from-rose-500/20 to-pink-500/10',
    what: '每个拆书技能都产出一张高清信息图——把十几页拆页蒸馏成一张看得懂的知识地图。画廊里已有整批成品，风格与模板都是现成的。',
    who: ['设计师', '摄影', '手绘'],
    how: '从画廊挑一张你喜欢的风格，认领一个技能开做——站长提供原始拆页语料与信息图模板。',
  },
]

const OWNER_MAIL = '554176937@qq.com'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export default function Coai() {
  return (
    <div className="pt-24 pb-20">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden mb-12">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold">
            六条合作线 · 六个在跑项目
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tight">
            共拆AI<span className="text-amber-500">.</span>
          </h1>
          <p className="text-[#6e6e73] max-w-2xl mx-auto leading-relaxed mt-4">
            「共拆AI」不是一门课，是一条<b className="text-[#1d1d1f]">开放共建</b>的产线：
            每种合作模式背后都是一个正在运转的真实项目——课件、代码、数据、方法论全部摊开。
            你不必从零开始，挑一条线加入即可。
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap mt-6 text-xs text-[#86868b]">
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">六种合作模式</span>
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">六个真实项目</span>
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">5473 位搭子在名录</span>
          </div>
        </div>
      </section>

      {/* ===== 六条线 ===== */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, idx) => (
            <motion.div key={p.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: (idx % 2) * 0.08 }}
              className="glass rounded-2xl border border-white/10 p-6 hover:border-white/25 transition-all relative overflow-hidden">
              <div className={`absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gradient-to-br ${p.bar} blur-[70px] pointer-events-none`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-xl font-black text-[#1d1d1f]">{p.emoji} {p.name}</h2>
                    <p className="text-sm font-bold mt-0.5" style={{ color: 'currentColor' }}>
                      <span className={p.accent.split(' ')[0]}>{p.full}</span>
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${p.accent}`}>{p.project}</span>
                </div>

                <p className="text-[13px] text-[#6e6e73] leading-relaxed mt-4">{p.what}</p>

                <div className="flex items-center gap-1.5 flex-wrap mt-4">
                  <span className="text-[10px] font-bold text-[#86868b] mr-1">适合谁</span>
                  {p.who.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/25">{t}</span>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <p className="text-[11px] font-bold text-[#86868b] mb-1">怎么开始</p>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">{p.how}</p>
                </div>

                <div className="mt-4">
                  <a href={p.href} className={`inline-block px-4 py-2 rounded-xl text-xs font-bold border transition-transform hover:-translate-y-0.5 ${p.accent}`}
                    target={p.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {p.cta} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== 底部 CTA ===== */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <motion.div {...fadeUp} className="glass rounded-2xl border border-amber-500/25 p-8 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-[70px]" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f]">不知道自己适合哪条线？</h2>
            <p className="text-sm text-[#6e6e73] mt-2 max-w-xl mx-auto leading-relaxed">
              去「拆搭子」搜你自己的名字——系统会根据你的职业与兴趣标签，推荐最适合你的合作模式。
              也可以直接找站长聊。
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap mt-6">
              <a href="/chaibuddy" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] transition-colors">去拆搭子找自己 →</a>
              <a href={`mailto:${OWNER_MAIL}`} className="px-5 py-2.5 rounded-xl text-sm font-bold glass border border-white/15 text-[#1d1d1f] hover:border-white/30 transition-colors">邮件站长</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
