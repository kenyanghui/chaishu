import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import skills from '../data/skills'

// ===== 合作模式（与构建脚本 /tmp/octopus/csb/build_buddy.py 的 MODES 同源，改文案两边同步）=====
const MODES = {
  cohost: {
    name: '联合带场',
    full: '联合带场 · 把共拆AI带回你的舵/企业',
    tags: ['培训讲师', 'HR人力', '教练', '管理者', '演讲表达'],
    why: '你有带人/讲课的经验——六场共拆AI课件全部开放，可直接联合主讲，把工作坊带回分舵或企业内训',
    href: '/workshops',
    cta: '看六场课件',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  expert: {
    name: '领域 AI 专家',
    full: '共创你的领域 AI 专家 Skill',
    tags: ['心理咨询', '教练', '财务会计', '法律', '医疗健康', '宝妈亲子'],
    why: '你的领域拆页是稀缺语料——一起把它训练成「XX 领域 AI 专家」技能，成为该领域第一个共拆样本',
    href: '/skill-fusion',
    cta: '看拆专家工坊',
    accent: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  },
  factory: {
    name: '内容工厂',
    full: '内容工厂 · 知识库变日更公众号',
    tags: ['自媒体', '文案写作', '读书阅读'],
    why: '你有内容手感——用开源的 WorkBuddy 内容工厂 skill，把自己的知识库变成每天 3 篇进草稿箱的原创产线',
    href: 'https://github.com/kenyanghui/rsi-ima-workbuddy-wechatpub',
    cta: '看内容工厂 Skill',
    accent: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  },
  opensource: {
    name: '开源共建',
    full: '开源共建 · AI 拆书方法论',
    tags: ['程序员', '产品经理', '设计师'],
    why: '你有构建能力——chaiflow 开源仓摊开了整条 AI 拆书管线，欢迎来提 PR、共建 skill 生态',
    href: 'https://github.com/kenyanghui/chaiflow',
    cta: '看开源仓',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  library: {
    name: '全库共拆',
    full: '全库共拆 · 2255 本书任你拆',
    tags: ['读书阅读', '学生', '英语', '时间管理'],
    why: '你是重度阅读者——chailive 全库站已拆 19262 页，认领你领域的书补拆/校对，署名共建',
    href: 'https://www.aibay.asia/chailive/',
    cta: '进全库站',
    accent: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
  },
  visual: {
    name: '知识视觉化',
    full: '知识视觉化 · 共创信息图',
    tags: ['设计师', '摄影', '手绘'],
    why: '你有视觉表达力——拆书赏鉴每个技能都产出高清信息图，一起把拆页蒸馏成看得懂的知识地图',
    href: '#gallery',
    cta: '看信息图赏鉴',
    accent: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  },
}
const DEFAULT_MODE = {
  id: 'start',
  name: '从一场开始',
  full: '从一场工作坊开始',
  why: '还没从简介里读到你的职业标签——最快的方式：来现场或线上参加一场共拆AI，边拆边定你的合作模式',
  href: '/workshops',
  cta: '看近期场次',
  accent: 'text-[#6e6e73] border-slate-500/30 bg-slate-500/10',
}
const ALL_MODES = { ...MODES, start: DEFAULT_MODE }

const CONTACT_URL = 'https://www.chaishubang.com/'
const OWNER_MAIL = '554176937@qq.com'
const OWNER_WX = 'ikoning365'
const NEEDS_API = 'https://api.aibay.asia/needs/needs'

// ===== 牵线弹窗表单 =====
function BrokerModal({ p, onClose }) {
  const isPerson = !!p
  const [form, setForm] = useState({ name: isPerson ? p.n : '', rudder: isPerson ? p.r : '', contact: '', note: '' })
  const [picked, setPicked] = useState(isPerson && p.m && p.m.length ? [...p.m] : [])
  const [state, setState] = useState('idle')
  const [msg, setMsg] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const toggle = id => setPicked(v => (v.includes(id) ? v.filter(x => x !== id) : [...v, id]))

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && state !== 'sending') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, state])

  const modeNames = picked.map(id => (ALL_MODES[id] ? ALL_MODES[id].full : '另有想法'))
  const mailtoHref = `mailto:${OWNER_MAIL}?subject=${encodeURIComponent(`拆搭子合作牵线 · ${form.name.trim() || '（未署名）'}`)}&body=${encodeURIComponent(`杨辉你好，我是${form.name.trim()}${form.rudder.trim() ? `（${form.rudder.trim()}）` : ''}。\n\n想聊的合作模式：${modeNames.length ? modeNames.join('；') : '待定'}\n\n我的想法：${form.note.trim() || '（见面聊）'}\n\n我的联系方式：${form.contact.trim() || '（邮件回复即可）'}`)}`

  const submit = async e => {
    e.preventDefault()
    if (state === 'sending') return
    if (form.name.trim().length < 1) { setState('error'); setMsg('请留下你的名字'); return }
    if (form.contact.trim().length < 5) { setState('error'); setMsg('请留联系方式（微信号 / 手机号 / 邮箱）'); return }
    if (picked.length === 0 && form.note.trim().length < 4) { setState('error'); setMsg('挑一个感兴趣的合作模式，或写一句你的想法'); return }
    setState('sending'); setMsg('')
    try {
      const r = await fetch(NEEDS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          software: `【拆搭子牵线】${form.name.trim()}（${form.rudder.trim() || '未填分舵'}）`,
          scene: `想聊的模式：${modeNames.length ? modeNames.join('；') : '待定'}${isPerson && p.t && p.t.length ? ` ｜ 标签：${p.t.join('/')}` : ''}`,
          expect: form.note.trim() || '（未填具体想法，待联系）',
          contact: form.contact.trim(),
          website: '',
        }),
      })
      const d = await r.json().catch(() => ({}))
      if (r.ok && d.ok) setState('ok')
      else { setState('error'); setMsg(d.error || '提交失败，请稍后再试') }
    } catch {
      setState('error'); setMsg('网络异常，提交失败——可改用邮件发送')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="找站长牵线">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={state === 'sending' ? undefined : onClose} />
      <div className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-white border border-black/10 shadow-2xl">
        {state === 'ok' ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">🤝</div>
            <h3 className="text-lg font-black text-[#1d1d1f] mt-4">牵线卡已发出！</h3>
            <p className="text-sm text-[#6e6e73] mt-2 leading-relaxed">
              你的合作意向已发到站长邮箱（{OWNER_MAIL}），杨辉会通过你留的联系方式尽快回复你。
            </p>
            <button type="button" onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] transition-colors">好的</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-lg font-black text-[#1d1d1f]">找站长牵线 🤝</h3>
              <button type="button" onClick={onClose} className="text-[#86868b] hover:text-[#1d1d1f] text-lg leading-none" aria-label="关闭">✕</button>
            </div>
            <p className="text-xs text-[#6e6e73] mb-5">
              {isPerson ? '已按你的名片预填，补上联系方式和想法即可发送' : '填一张合作意向卡，站长收到邮件后直接联系你'}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#1d1d1f]">名字</span>
                <input value={form.name} onChange={set('name')} maxLength={30} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="你的名字" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#1d1d1f]">分舵</span>
                <input value={form.rudder} onChange={set('rudder')} maxLength={30} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="如：广州小蛮腰分舵" />
              </label>
            </div>

            <div className="mb-3">
              <span className="text-[11px] font-bold text-[#1d1d1f]">想聊的合作模式 <span className="text-[#86868b] font-normal">（可多选）</span></span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Object.entries(MODES).map(([id, m]) => (
                  <button type="button" key={id} onClick={() => toggle(id)}
                    className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${picked.includes(id) ? 'bg-amber-500/15 text-amber-600 border-amber-500/50' : 'bg-black/[.03] text-[#6e6e73] border-black/10 hover:border-black/25'}`}>
                    {picked.includes(id) ? '✓ ' : ''}{m.name}
                  </button>
                ))}
                <button type="button" onClick={() => toggle('other')}
                  className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${picked.includes('other') ? 'bg-amber-500/15 text-amber-600 border-amber-500/50' : 'bg-black/[.03] text-[#6e6e73] border-black/10 hover:border-black/25'}`}>
                  {picked.includes('other') ? '✓ ' : ''}另有想法
                </button>
              </div>
            </div>

            <label className="flex flex-col gap-1 mb-3">
              <span className="text-[11px] font-bold text-[#1d1d1f]">联系方式 <span className="text-rose-500">*</span></span>
              <input value={form.contact} onChange={set('contact')} maxLength={60} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-amber-500/40" placeholder="微信号 / 手机号 / 邮箱（站长通过它联系你）" />
            </label>

            <label className="flex flex-col gap-1 mb-4">
              <span className="text-[11px] font-bold text-[#1d1d1f]">想说的话 <span className="text-[#86868b] font-normal">（可不填）</span></span>
              <textarea value={form.note} onChange={set('note')} maxLength={300} rows={3} className="rounded-xl bg-[#f5f5f7] px-3.5 py-2.5 text-[13px] text-[#1d1d1f] outline-none focus:ring-2 focus:ring-amber-500/40 resize-none" placeholder="一句话介绍你自己 / 你想怎么合作 / 你的疑问……" />
            </label>

            {state === 'error' && (
              <div className="mb-4 rounded-xl bg-rose-500/10 border border-rose-500/25 px-4 py-3 text-xs text-rose-600">
                {msg}
                <a href={mailtoHref} className="underline underline-offset-2 ml-1 font-bold">改用邮件发送 →</a>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button type="submit" disabled={state === 'sending'} className="flex-1 px-5 py-3 rounded-xl text-sm font-bold bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] transition-colors disabled:opacity-50">
                {state === 'sending' ? '发送中…' : '发送牵线卡 ✉️'}
              </button>
              <a href={mailtoHref} className="px-4 py-3 rounded-xl text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] underline underline-offset-2 whitespace-nowrap">改用邮件</a>
            </div>
            <p className="text-[10px] text-[#86868b] mt-3 text-center">直接发到站长邮箱 {OWNER_MAIL} · 不自动群发、不留存名录</p>
          </form>
        )}
      </div>
    </div>
  )
}

// ===== 单人卡 =====
function PersonCard({ p, highlight = false, onBroker, onFind }) {
  const modes = (p.m && p.m.length ? p.m : ['start']).map(id => ALL_MODES[id] || DEFAULT_MODE)
  return (
    <div className={`glass rounded-2xl border p-5 ${highlight ? 'border-amber-500/40 shadow-lg shadow-amber-500/10' : 'border-white/10'} hover:border-white/25 transition-all`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-black text-[#1d1d1f]">{p.n}</h3>
            {(p.t || []).map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/25">{t}</span>
            ))}
          </div>
          <p className="text-xs text-[#6e6e73] mt-1">
            认证拆书家 · {p.r}{p.c ? ` · ${p.c}` : ''}
          </p>
          {(p.sf || (p.td && p.td.length > 0)) && (
            <p className="text-[11px] text-[#86868b] mt-1.5 leading-relaxed">
              {p.sf && (
                <>
                  <span className="mr-1">师承</span>
                  {p.sf.in && onFind ? (
                    <button type="button" onClick={() => onFind(p.sf.n)} className="font-bold text-[#6e6e73] hover:text-amber-600 underline underline-offset-2 decoration-amber-500/40">{p.sf.n}</button>
                  ) : (
                    <span className="font-bold text-[#6e6e73]">{p.sf.n}</span>
                  )}
                </>
              )}
              {p.sf && p.td && p.td.length > 0 && <span className="mx-1.5">·</span>}
              {p.td && p.td.length > 0 && (
                <>
                  <span className="mr-1">徒弟</span>
                  {p.td.slice(0, 3).map((t, idx) => (
                    <span key={t.i}>
                      {t.in && onFind ? (
                        <button type="button" onClick={() => onFind(t.n)} className="font-bold text-[#6e6e73] hover:text-amber-600 underline underline-offset-2 decoration-amber-500/40">{t.n}</button>
                      ) : (
                        <span className="font-bold text-[#6e6e73]">{t.n}</span>
                      )}
                      {idx < Math.min(p.td.length, 3) - 1 && '、'}
                    </span>
                  ))}
                  {p.td.length > 3 && <span className="ml-1">等 {p.td.length} 人</span>}
                </>
              )}
            </p>
          )}
        </div>
      </div>

      {p.d && <p className="text-xs text-[#6e6e73] leading-relaxed mt-3 line-clamp-3">{p.d}</p>}

      <div className="mt-4 space-y-2">
        {modes.map(m => (
          <div key={m.id} className={`rounded-xl border p-3 ${m.accent}`}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-black">🤝 {m.full}</span>
              {m.href && (
                <a href={m.href} className="text-[10px] font-bold underline underline-offset-2 opacity-80 hover:opacity-100" target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {m.cta} →
                </a>
              )}
            </div>
            <p className="text-[10px] leading-relaxed mt-1 opacity-80">{m.why}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-2 flex-wrap">
        <p className="text-[10px] text-[#86868b]">
          {p.e ? `邮箱 ${p.e}` : ''}{p.e && p.w ? ' · ' : ''}{p.w ? `微信 ${p.w}` : ''}
          {p.e || p.w ? '（防爬虫已打码）' : ''}
        </p>
        <div className="flex items-center gap-2">
          <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#86868b] hover:text-[#0071e3] underline underline-offset-2">官网查询</a>
          <button type="button" onClick={() => onBroker(p)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] transition-colors">找站长牵线</button>
        </div>
      </div>
    </div>
  )
}

// ===== 原共拆AI 项目画廊数据（hd-gallery 下移）=====
const projects = [
  {
    id: 'chailive',
    name: 'chailive',
    tag: 'RIA 全库',
    status: '已上线',
    desc: '拆学习 · RIA 便签读书法全库：2255 本书、1713 本有拆页、19262 个拆页。单文件零依赖架构，双击即开、离线可用；RIA 三段卡（R 原文 / I 讲解 / A 促动）、全局拆页主题检索、大书自动分片、2229 张封面自托管。',
    stats: ['2255 本书', '19262 拆页', '零依赖单文件'],
    links: [
      { label: '在线阅读', href: 'https://www.aibay.asia/chailive/', primary: true },
      { label: 'GitHub 源码', href: 'https://github.com/kenyanghui/chailive' },
    ],
    updated: { date: '2026-11-04', text: '互动四件套上线：便签练武场 AI 评审、每日一拆打卡、知识地图点亮、分享海报；修复书目页 KPI' },
    accent: { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', glow: 'bg-amber-500/10' },
  },
  {
    id: 'chaiflow',
    name: 'chaiflow',
    tag: '开源方法论',
    status: '已开源 · MIT',
    desc: 'AI 拆书工作流的开源公开版：项目全景、关键决策（D7–D19）、三篇复盘、两本 playbook——把「每见到一本书的拆页，就产出一个可用的教练 Skill」这条管线完整摊开给所有人复用。',
    stats: ['决策档案 13 篇', '复盘 ×3', 'Playbook ×2'],
    links: [
      { label: 'GitHub 仓库', href: 'https://github.com/kenyanghui/chaiflow', primary: true },
    ],
    updated: { date: '2026-11-03', text: '新增复盘：拆搭子名录找搭子 + chailive 模块化改版（SPA 逆向挖 API、确定性标签引擎、隐私打码红线）' },
    accent: { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', glow: 'bg-emerald-500/10' },
  },
  {
    id: 'workbuddy',
    name: 'rsi-ima-workbuddy-wechatpub',
    tag: '内容工厂 Skill',
    status: '已开源',
    desc: 'WorkBuddy 技能：把你的 IMA 知识库变成公众号内容工厂——每天自动产 3 篇原创长文进草稿箱，RSI 自进化选题，绝不自动群发。本站二期「一库一站一号」飞轮里「一号」的生产引擎，现场照着拆的就是它。',
    stats: ['日更 3 篇进草稿箱', 'RSI 自进化', '绝不自动群发'],
    links: [
      { label: 'GitHub 仓库', href: 'https://github.com/kenyanghui/rsi-ima-workbuddy-wechatpub', primary: true },
    ],
    updated: { date: '2026-11-02', text: '推荐类文章三要素红线（veto:no_entry_point）：入口前置 + 真实实拍 + 数字核验' },
    accent: { text: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/10', glow: 'bg-sky-500/10' },
  },
  {
    id: 'hd-gallery',
    name: '拆书赏鉴',
    tag: '知识视觉化共创',
    status: '持续共创',
    desc: '每本共拆书产出高清 HTML 信息图与 AI 封面图，按沟通表达、管理领导、认知思维等七大类归档——把拆页蒸馏成一张看得懂的知识地图。点击任一技能卡查看完整信息图。',
    stats: ['7 大分类', '高清信息图', 'AI 封面图'],
    links: [],
    updated: { date: '2026-11-01', text: 'ima 知识库首场开课，个人网站·WorkBuddy、企查查·读懂你的客户、知识星球排期中' },
    accent: { text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', glow: 'bg-violet-500/10' },
  },
  {
    id: 'chaibuddy',
    name: 'chaibuddy',
    tag: '拆搭子名录',
    status: '已开源 · v1.0',
    desc: '本页的开源底座：拆书帮官网公开名录 5473 人脱敏数据集（邮箱/微信全打码、敏感字段丢弃）+ 单文件零依赖浏览器（搜索/城市/级别/合作模式筛选、师徒互链）+ 采集构建管线。克隆即得整个搭子库，离线可用。',
    stats: ['5473 人脱敏名录', '990 组师承关系', '7 种合作模式标签'],
    links: [
      { label: 'GitHub 仓库', href: 'https://github.com/kenyanghui/chaibuddy', primary: true },
      { label: '单文件浏览器', href: 'https://www.aibay.asia/chaibuddy/' },
    ],
    updated: { date: '2026-11-04', text: 'v1.0 开源：数据集+浏览器+管线三件套；卡面新增师承/徒弟互链；简介明文手机号补码' },
    accent: { text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', glow: 'bg-rose-500/10' },
  },
]

const categories = [
  {
    id: '沟通表达', title: '沟通表达',
    subtitle: '非暴力沟通 · 关键对话 · 好好说话 · 谈话的力量 · 沟通的艺术 · 高情商沟通术 · 重要的事情说3点 · 内向者沟通圣经 · 拆出你的沟通力I',
    color: 'from-teal-500 to-cyan-500', text: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500/10',
    books: ['非暴力沟通', '关键对话', '好好说话', '谈话的力量', '沟通的艺术（插图修订第14版）', '高情商沟通术', '重要的事情说3点', '内向者沟通圣经', '拆出你的沟通力I'],
  },
  {
    id: '管理领导', title: '管理领导',
    subtitle: '高效能人士的七个习惯 · 卓有成效的管理者 · 横向领导力 · 可复制的领导力 · 带团队的方法 · 领导梯队 · 逆向管理 · 4D卓越团队 · 团队协作的五大障碍 · OKR · 小微企业经营笔记 · 高效执行4原则',
    color: 'from-blue-600 to-indigo-500', text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10',
    books: ['高效能人士的七个习惯（精华版）', '高效能人士的七个习惯', '卓有成效的管理者', '横向领导力', '可复制的领导力', '带团队的方法', '领导梯队', '逆向管理', '4D卓越团队', '团队协作的五大障碍', 'OKR：源于英特尔和谷歌的目标管理利器', '小微企业经营笔记', '高效执行4原则', '高效执行4原则2.0', '10人以下小团队管理手册'],
  },
  {
    id: '认知思维', title: '认知思维',
    subtitle: '认知觉醒 · 认知红利 · 结构思考力 · 逻辑思维只要5步 · 思维力 · 麦肯锡结构化战略思维 · 第3选择 · 终身成长 · 成长型思维 · 创新者的思考',
    color: 'from-violet-600 to-purple-500', text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10',
    books: ['认知觉醒', '认知红利', '结构思考力', '逻辑思维，只要5步', '思维力：高效的系统思维', '麦肯锡结构化战略思维', '第3选择：解决人生所有难题的关键思维', '终身成长', '成长型思维', '创新者的思考', '复盘(对过去的事情做思维演练实践版)'],
  },
  {
    id: '学习精进', title: '学习精进',
    subtitle: '这样读书就够了 · 精进 · 刻意练习 · 跃迁 · 复盘',
    color: 'from-emerald-600 to-green-500', text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10',
    books: ['这样读书就够了', '精进', '刻意练习', '跃迁', '复盘'],
  },
  {
    id: '教练指导', title: '教练指导',
    subtitle: '高绩效教练 · 提问的威力 · 教练式沟通',
    color: 'from-cyan-600 to-teal-500', text: 'text-[#0071e3]', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10',
    books: ['高绩效教练', '提问的威力：教练问题全清单', '教练式沟通'],
  },
  {
    id: '决策影响力', title: '决策 · 影响力',
    subtitle: '做出好决定 · 决策的艺术 · 斯坦福商业决策课 · 聪明的投资者 · 影响力 · 优势谈判 · 沃顿商学院最受欢迎的谈判课',
    color: 'from-rose-600 to-pink-500', text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10',
    books: ['做出好决定', '决策的艺术', '斯坦福商业决策课', '聪明的投资者', '影响力', '优势谈判', '沃顿商学院最受欢迎的谈判课'],
  },
  {
    id: '亲子教育', title: '亲子 · 自我管理',
    subtitle: '正面管教 · 如何说孩子才会听 · 爱的五种语言 · 自控力 · 小强升职记 · 精力管理',
    color: 'from-amber-500 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10',
    books: ['正面管教', '如何说孩子才会听，怎么听孩子才肯说', '爱的五种语言', '自控力', '小强升职记', '精力管理'],
  },
]

function getItemsForPack(pack) {
  return pack.items.map(item => {
    const slug = item.name.replace(/[\s:：,，.。!！?？"「」『』【】()（）·]/g, '').replace(/[^a-zA-Z0-9一-鿿]/g, '').toLowerCase().slice(0, 30)
    return { ...item, packName: pack.name, book: pack.book, slug }
  })
}

function getBookCategory(book) {
  for (const cat of categories) {
    if (cat.books.some(b => book.includes(b) || b.includes(book))) return cat.id
  }
  return null
}

const PAGE_SIZE = 60

export default function Chaibuddy() {
  const [data, setData] = useState(null)
  const [loadErr, setLoadErr] = useState(false)
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')
  const [rudder, setRudder] = useState('')
  const [tag, setTag] = useState('')
  const [onlyRec, setOnlyRec] = useState(false)
  const [page, setPage] = useState(1)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [broker, setBroker] = useState(null) // null=关 | {}=通用 | person=预填
  const openBroker = p => setBroker(p)
  const searchBoxRef = useRef(null)
  const handleFind = name => {
    setQ(name)
    setCity(''); setRudder(''); setTag(''); setOnlyRec(false)
    setPage(1)
    if (searchBoxRef.current) window.scrollTo({ top: searchBoxRef.current.offsetTop - 90, behavior: 'smooth' })
  }

  useEffect(() => {
    fetch('/chaibuddy/people.json')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
      .then(setData)
      .catch(() => setLoadErr(true))
  }, [])

  const people = useMemo(() => (data ? data.people : []), [data])
  const cities = useMemo(() => [...new Set(people.map(p => p.c).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh')), [people])
  const rudders = useMemo(() => [...new Set(people.map(p => p.r).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh')), [people])
  const tags = useMemo(() => [...new Set(people.flatMap(p => p.t || []))].sort((a, b) => a.localeCompare(b, 'zh')), [people])

  // 找搭子：全局搜索（名字/分舵/城市/标签/简介）
  const found = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return null
    return people.filter(p =>
      p.n.toLowerCase().includes(s) ||
      (p.r || '').toLowerCase().includes(s) ||
      (p.c || '').toLowerCase().includes(s) ||
      (p.t || []).some(t => t.toLowerCase().includes(s)) ||
      (p.d || '').toLowerCase().includes(s)
    )
  }, [q, people])

  // 名录：筛选 + 分页
  const filtered = useMemo(() => people.filter(p =>
    (!city || p.c === city) &&
    (!rudder || p.r === rudder) &&
    (!tag || (p.t || []).includes(tag)) &&
    (!onlyRec || (p.m && p.m.length > 0))
  ), [people, city, rudder, tag, onlyRec])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const recCount = useMemo(() => people.filter(p => p.m && p.m.length > 0).length, [people])

  // 信息图分组（原画廊）
  const byCategory = {}
  for (const cat of categories) byCategory[cat.id] = { cat, items: [] }
  byCategory['其他'] = { cat: { id: '其他', title: '其他', color: 'from-slate-600 to-slate-400', text: 'text-[#6e6e73]', border: 'border-slate-500/30', bg: 'bg-slate-500/10' }, items: [] }
  for (const pack of skills) {
    const catId = getBookCategory(pack.book)
    const target = byCategory[catId] || byCategory['其他']
    for (const item of getItemsForPack(pack)) target.items.push(item)
  }

  return (
    <div className="pt-24 pb-20">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden mb-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-amber-500 text-sm">
            拆书帮全名录 · 83 分舵 · {people.length ? people.length.toLocaleString() : '5473'} 位拆书家 · 共拆AI 找搭子
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1d1d1f] mb-3">chai buddy · 找到你的共拆AI搭子</h1>
          <p className="text-[#6e6e73] max-w-2xl mx-auto leading-relaxed">
            我们不做「又一个读书会」。我们把拆书帮每一位拆书家的<b className="text-[#1d1d1f]">职业与兴趣标签</b>读出来，
            对到六种<b className="text-[#1d1d1f]">共拆AI合作模式</b>上——你进来搜到自己，就知道怎么跟我们合作。
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap mt-5 text-xs text-[#86868b]">
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">① 搜你的名字 / 分舵 / 职业</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">② 看你被推荐的协作模式</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full glass border border-white/10">③ 点进去开干，或找站长牵线</span>
          </div>
        </div>
      </section>

      {/* ===== 找搭子搜索 ===== */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <div ref={searchBoxRef} className="glass rounded-2xl border border-amber-500/25 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-[70px]" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f] mb-1">找到你自己 🔍</h2>
            <p className="text-xs text-[#6e6e73] mb-4">输入名字、分舵、城市或职业关键词（如「广州」「培训」「心理」）——看看系统为这位搭子推荐的合作模式</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/70 border border-black/10 rounded-xl px-4 py-3 focus-within:border-amber-500/50 transition-colors">
                <svg className="w-4 h-4 text-[#86868b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder="名字 / 分舵 / 城市 / 职业兴趣…"
                  className="w-full bg-transparent outline-none text-sm text-[#1d1d1f] placeholder:text-[#86868b]"
                />
                {q && (
                  <button onClick={() => setQ('')} className="text-xs text-[#86868b] hover:text-[#1d1d1f] shrink-0">清空</button>
                )}
              </div>
            </div>

            {loadErr && (
              <div className="mt-6 text-center text-sm text-rose-500">
                名录加载失败（网络或部署问题）——刷新重试，或直接邮件站长：{OWNER_MAIL}
              </div>
            )}
            {!data && !loadErr && (
              <div className="mt-6 text-center text-sm text-[#86868b]">正在加载拆书帮全量名录（约 1MB）…</div>
            )}

            {found && (
              <div className="mt-6">
                <p className="text-xs text-[#6e6e73] mb-3">
                  找到 <b className="text-[#1d1d1f]">{found.length}</b> 位搭子
                  {found.length > 0 && <>，其中 <b className="text-[#1d1d1f]">{found.filter(p => p.m && p.m.length).length}</b> 位已有明确推荐</>}
                </p>
                {found.length === 0 ? (
                  <div className="glass rounded-xl border border-white/10 p-6 text-center text-sm text-[#6e6e73]">
                    没搜到这位搭子——名录只覆盖拆书帮官网公开的拆书家（{people.length} 位）。
                    你可能还没在官网认证，没关系：直接看下面六种合作模式，挑一个找站长聊。
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {found.slice(0, 12).map(p => <PersonCard key={p.i} p={p} highlight onBroker={openBroker} onFind={handleFind} />)}
                    {found.length > 12 && (
                      <div className="glass rounded-2xl border border-white/10 p-6 text-center text-xs text-[#86868b] flex items-center justify-center">
                        还有 {found.length - 12} 位，去下方名录里按条件筛选查看 →
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {data && !q && (
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="glass rounded-xl border border-white/10 p-3"><div className="text-xl font-black text-amber-500">{people.length.toLocaleString()}</div><div className="text-[10px] text-[#86868b]">拆书家在册</div></div>
                <div className="glass rounded-xl border border-white/10 p-3"><div className="text-xl font-black text-amber-500">{recCount.toLocaleString()}</div><div className="text-[10px] text-[#86868b]">已有合作推荐</div></div>
                <div className="glass rounded-xl border border-white/10 p-3"><div className="text-xl font-black text-amber-500">83</div><div className="text-[10px] text-[#86868b]">分舵覆盖</div></div>
                <div className="glass rounded-xl border border-white/10 p-3"><div className="text-xl font-black text-amber-500">6</div><div className="text-[10px] text-[#86868b]">合作模式</div></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== 合作模式总览 ===== */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] mb-2">六种共拆AI合作模式</h2>
        <p className="text-sm text-[#6e6e73] mb-6">不看拆书家头衔，看你<b className="text-[#1d1d1f]">拆书之外</b>的职业与兴趣——每一种模式都对应本站一个已经在跑的真实项目</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(MODES).map(([id, m], i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl border p-5 ${m.accent.split(' ')[1]} hover:-translate-y-0.5 transition-transform`}
            >
              <div className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border mb-3 ${m.accent}`}>{m.name}</div>
              <h3 className="text-base font-black text-[#1d1d1f] mb-2">{m.full}</h3>
              <p className="text-xs text-[#6e6e73] leading-relaxed mb-3">{m.why}</p>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex flex-wrap gap-1">
                  {m.tags.map(t => <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-black/[.05] text-[#48484a]">{t}</span>)}
                </div>
                <a href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[11px] font-black underline underline-offset-2 opacity-80 hover:opacity-100">{m.cta} →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== 全员名录 ===== */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] mb-2">拆书家全员名录</h2>
        <p className="text-sm text-[#6e6e73] mb-5">
          数据来自拆书帮官网公开名录（{data ? data.meta.generated : '2026-11-04'} 采集，{people.length.toLocaleString()} 人去重）。
          邮箱/微信为防爬虫已打码，精确联系方式请到拆书帮官网或经站长牵线。
        </p>
        <div className="glass rounded-2xl border border-white/10 p-4 md:p-5 mb-5 flex items-end gap-3 flex-wrap">
          <label className="flex flex-col gap-1 text-[10px] text-[#86868b]">
            城市
            <select value={city} onChange={e => { setCity(e.target.value); setPage(1) }} className="bg-white/70 border border-black/10 rounded-lg px-3 py-2 text-xs text-[#1d1d1f] min-w-24">
              <option value="">全部</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[10px] text-[#86868b]">
            分舵
            <select value={rudder} onChange={e => { setRudder(e.target.value); setPage(1) }} className="bg-white/70 border border-black/10 rounded-lg px-3 py-2 text-xs text-[#1d1d1f] min-w-36">
              <option value="">全部</option>
              {rudders.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-[10px] text-[#86868b]">
            标签
            <select value={tag} onChange={e => { setTag(e.target.value); setPage(1) }} className="bg-white/70 border border-black/10 rounded-lg px-3 py-2 text-xs text-[#1d1d1f] min-w-28">
              <option value="">全部</option>
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-[#48484a] cursor-pointer select-none pb-2">
            <input type="checkbox" checked={onlyRec} onChange={e => { setOnlyRec(e.target.checked); setPage(1) }} className="accent-amber-500 w-4 h-4" />
            只看有合作推荐的
          </label>
          <div className="ml-auto text-xs text-[#86868b] pb-2">
            筛出 <b className="text-[#1d1d1f]">{filtered.length.toLocaleString()}</b> 人 · 第 {safePage}/{totalPages} 页
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pageRows.map(p => <PersonCard key={p.i} p={p} onBroker={openBroker} onFind={handleFind} />)}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button onClick={() => setPage(v => Math.max(1, v - 1))} disabled={safePage <= 1} className="px-3 py-1.5 rounded-lg text-xs glass border border-white/10 disabled:opacity-40 hover:border-white/30">上一页</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(n => n === 1 || n === totalPages || Math.abs(n - safePage) <= 2)
              .map((n, idx, arr) => (
                <span key={n} className="flex items-center">
                  {idx > 0 && n - arr[idx - 1] > 1 && <span className="px-1 text-xs text-[#86868b]">…</span>}
                  <button
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-lg text-xs transition-colors ${n === safePage ? 'bg-[#1d1d1f] text-white font-bold' : 'glass border border-white/10 hover:border-white/30'}`}
                  >
                    {n}
                  </button>
                </span>
              ))}
            <button onClick={() => setPage(v => Math.min(totalPages, v + 1))} disabled={safePage >= totalPages} className="px-3 py-1.5 rounded-lg text-xs glass border border-white/10 disabled:opacity-40 hover:border-white/30">下一页</button>
          </div>
        )}
      </section>

      {/* ===== 共拆AI 项目阵地（原共拆AI画廊下移）===== */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f] mb-2">共拆AI 项目阵地</h2>
        <p className="text-sm text-[#6e6e73] mb-6">上面六种合作模式对应的真实资产都在这里——开放的共拆共创阵地，每个项目都可以直接参与和复用</p>
        <div className="space-y-6">
          {projects.map((p, pi) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pi * 0.08 }}
              className={`glass rounded-2xl border ${p.accent.border} p-6 md:p-8 relative overflow-hidden`}
            >
              <div className={`absolute -top-20 -right-20 w-64 h-64 ${p.accent.glow} rounded-full blur-[80px]`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h3 className="text-xl md:text-2xl font-black text-[#1d1d1f]">{p.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${p.accent.bg} ${p.accent.text} border ${p.accent.border}`}>{p.tag}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-black/[.06] text-[#6e6e73]">{p.status}</span>
                </div>
                <p className="text-sm text-[#6e6e73] leading-relaxed max-w-3xl mb-4">{p.desc}</p>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {p.stats.map(s => (
                    <span key={s} className={`px-2 py-0.5 rounded text-[11px] font-medium ${p.accent.bg} ${p.accent.text}`}>{s}</span>
                  ))}
                </div>
                {p.updated && (
                  <p className="text-xs text-[#6e6e73] mb-4 flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded bg-black/[.05] text-[10px] font-bold text-[#86868b]">最新更新 {p.updated.date}</span>
                    <span>{p.updated.text}</span>
                  </p>
                )}
                {p.links.length > 0 && (
                  <div className="flex items-center gap-3 flex-wrap">
                    {p.links.map(l => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          l.primary
                            ? 'bg-[#1d1d1f] text-white hover:bg-[#3a3a3c]'
                            : `glass ${p.accent.text} border ${p.accent.border} hover:border-white/40`
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
                {p.id === 'hd-gallery' && (
                  <button
                    onClick={() => setGalleryOpen(v => !v)}
                    className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium glass ${p.accent.text} border ${p.accent.border} hover:border-white/40 transition-all`}
                  >
                    <svg className={`w-3.5 h-3.5 transition-transform ${galleryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {galleryOpen ? '收起信息图赏鉴' : '展开信息图赏鉴'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 高清图赏鉴（展开区） */}
        {galleryOpen && (
          <div className="space-y-10 mt-10">
            {categories.map((cat, ci) => {
              const group = byCategory[cat.id]
              if (!group || group.items.length === 0) return null
              return (
                <motion.section
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.05 }}
                >
                  <div className={`relative rounded-2xl overflow-hidden mb-6 border ${cat.border} group cursor-pointer`}>
                    <img
                      src={`/images/hd/category-${cat.id}.png`}
                      alt={cat.title}
                      className="w-full h-48 md:h-56 object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className={`inline-block mb-2 px-3 py-1 rounded-full ${cat.bg} border ${cat.border} ${cat.text} text-xs font-bold`}>
                        {group.items.length} 个技能
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                        {cat.title}
                      </h3>
                      <p className="text-xs text-[#86868b] mt-1 max-w-2xl line-clamp-1">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {group.items.map((item, i) => (
                      <motion.a
                        key={`${item.slug}-${i}`}
                        href={`/images/skills/${encodeURIComponent(item.slug)}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 12) * 0.03 }}
                        className={`glass rounded-xl p-4 border ${cat.border} hover:border-white/40 transition-all group block`}
                      >
                        <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${cat.bg} ${cat.text}`}>
                          {item.level || '拆书'}
                        </div>
                        <h4 className="text-sm font-bold text-[#1d1d1f] mt-2 mb-1 group-hover:text-[#0071e3] transition-colors line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-[#86868b] line-clamp-1">
                          《{item.book}》
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400/60 group-hover:text-amber-400 transition-colors">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          查看信息图
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>
        )}
      </section>

      {/* ===== 底部牵线 CTA ===== */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <div className="glass rounded-2xl border border-amber-500/25 p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-black text-[#1d1d1f] mb-2">没找到你？或者模式都对不上？</h2>
            <p className="text-sm text-[#6e6e73] mb-5 max-w-xl mx-auto">
              名录以拆书帮官网公开数据为准；合作模式也随时欢迎你提出第七种。加站长微信或邮件，聊 15 分钟就能定。
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setBroker({})}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] transition-colors"
              >
                🤝 填一张合作意向卡
              </button>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold glass border border-amber-500/30 text-amber-600">
                微信 {OWNER_WX}
              </span>
            </div>
          </div>
        </div>
      </section>

      {broker && <BrokerModal p={broker.i ? broker : null} onClose={() => setBroker(null)} />}
    </div>
  )
}
