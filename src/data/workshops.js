const workshops = [
  {
    id: 'wk1',
    no: '01',
    title: '知识库 · 微信公众号自动化工作流',
    short: '把读过的、想的、写的，全部装进 AI，让它替你干活',
    tools: ['ima', 'workbuddy'],
    // ============ 生命周期只认这两个字段 ============
    // 定档：填 dateISO（带 +08:00 时区）；结课：填 dateEndISO。到点页面自动翻转，
    // 报名/已交付/排期中/文案/按钮全部派生，改站只需改这里两行。
    dateISO: '2026-11-01T14:00:00+08:00',
    dateEndISO: '2026-11-01T17:00:00+08:00',
    signupUrl: 'https://mp.weixin.qq.com/s/4lIyWBUPOFqsNlyJNd1K-Q',
    date: '2026-11-01（周日）14:00–17:00',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 10 人',
    summary: '第一期从每个学习者最痛的地方开始：资料散落各处、想法转瞬即逝、公众号更新靠意志力。现场拆 ima 和 workbuddy 两个 AI 软件，3 小时做出你自己的知识库和日更工作流。',
    outcomes: ['个人 AI 知识库（ima，现场建好）', '公众号自动化工作流（workbuddy，当场跑通一次）', '30 天 AI 进化计划（带走即执行）'],
    who: ['想建个人知识库的内容创作者', '想公众号日更又总断更的写作者', '零基础、想把 AI 用起来的学习者'],
    link: '/workshop/',
  },
  {
    id: 'wk2',
    no: '02',
    title: '知识库 · 网站 · 公众号：一库一站一号内容飞轮',
    short: '把第一期的库和号接到你的网站上：素材只写一次，网站和公众号同时更新',
    tools: ['ima', 'GitHub Pages', 'workbuddy', '微信公众号'],
    date: '2026-11-08（周日）9:30–12:30',
    dateISO: '2026-11-08T09:30:00+08:00',
    dateEndISO: '2026-11-08T12:30:00+08:00',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 12 人',
    summary: '承接第一期：你的 ima 知识库是源头，公众号是分发，这一期补上中间那个「打开就能看的家」。半天做出个人网站（GitHub Pages 免费托管），再把产线接成双出口——同一篇内容，网站和公众号草稿箱同时更新。新学员也收：第 0 节 20 分钟补齐 ima 与公众号底盘。本站 chai.aibay.asia 就是这么搭的，现场照着拆。',
    outcomes: ['一个免费上线的个人网站', '双出口产线：库 → 网站 + 公众号草稿箱', '30 天库/站/号飞轮计划', '底盘补齐凭证（新学员 ima + 公众号）'],
    who: ['上过第一期、想把库和号接起来的学员', '想打造个人品牌的专业人士', '自由职业者、顾问、教练', '新学员也收：第 0 节现场补齐底盘'],
    link: '/workshop/02/',
  },
  {
    id: 'wk3',
    no: '03',
    title: '企查查 · 读懂你的客户',
    short: '接单之前，先读懂你的客户——他是谁、靠什么赚钱、账期稳不稳',
    tools: ['企查查', 'workbuddy'],
    date: '11 月 · 具体时间待定',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 10 人',
    summary: '拆企查查：输入一个名字，自动拉出工商、股权、风险、关联企业全貌——客户靠什么赚钱、这单能不能接、账期稳不稳、背后是谁，让 AI 帮你先读懂再谈合作。做生意的"识人"能力，3 小时装进你的工作流。',
    outcomes: ['一张读懂客户的自动画像', '风险与关联关系速查', '跟进客户情报档案'],
    who: ['接单前想摸清客户底细的自由职业者', '中小企业主', '销售与商务负责人'],
    link: '/workshop/03/',
  },
  {
    id: 'wk4',
    no: '04',
    title: '知识星球 · 私域知识变现工作流',
    short: '把持续输出的内容，变成持续收到的年费',
    tools: ['知识星球', 'workbuddy'],
    date: '11 月 · 具体时间待定',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 10 人',
    summary: '拆知识星球：AI 帮你选题、成稿、定时发布，精华帖自动整理成新会员引导包，到期提醒自动跟进续费。把"想起来才更新"的星球，做成一条内容产线。',
    outcomes: ['星球内容半自动产线', '精华沉淀与新人引导包', '续费提醒工作流'],
    who: ['想开星球的知识博主', '已有星球但更新吃力的星主', '做付费社群的运营者'],
    link: '/workshop/04/',
  },
  {
    id: 'wk5',
    no: '05',
    title: 'DeepSeek Harness · 搭建企业自动化工作台',
    short: '把重复的文档审核，交给一条你亲手搭出来的工作流',
    tools: ['DeepSeek Harness', 'workbuddy'],
    date: '11 月 · 具体时间待定',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 10 人',
    summary: '拆 DeepSeek Harness：模型、工具、流程编排的工程化骨架，参照「自动化文档审核工作台」成品（批次总览/项目卷宗/功能点审核/费用审核/技术评审/知识库六大模块），现场搭出第一条「文档进→要点出」初审流水线。演示数据为合成、不对应真实项目；AI 建议只作初稿，结论由评审人确认；敏感数据不出内网。',
    outcomes: ['一条能跑的文档初审工作流', '一份 AI 初审+人工确认的审核意见书', '一套可复用的审核规则知识库'],
    who: ['天天跟卷宗、合同、报告打交道的评审与审核人员', '财务、审计与合规岗', '想把重复审核交给工作流的中小企业主'],
    link: '/workshop/05/',
  },
  {
    id: 'wk6',
    no: '06',
    title: 'AI 手机 · 让手机成为你的 AI 生产力',
    short: '拍照、录音、说句话——杂事在路上就办完',
    tools: ['手机 AI', 'workbuddy'],
    date: '11 月 · 具体时间待定',
    location: '广州越秀区雅苑·培正 5 号楼',
    fee: '非会员 39 元（含茶歇+资料）· 会员免费 · 仅限 10 人',
    summary: '拆手机 AI：语音助手、拍照识别、录音转写统称的「手机 AI」能力，配上 workbuddy 做分类归档——会议录音、名片、白板照片、灵感语音随手收，自动变成纪要、待办和档案。通勤路上语音调档案、口述发周报，一天的杂事路上清零。手机还是那部手机，3 小时后它开始替你干活。',
    outcomes: ['一套「随手收」的采集清单', '一条「拍/录完自动变纪要和待办」的手机工作流', '一份通勤即可完成的每日 AI 清单'],
    who: ['天天开会、跑外勤的项目负责人', '想把碎片时间用起来的销售与顾问', '通勤时间长、想「路上办公」的职场人'],
    link: '/workshop/06/',
  },
]

// ============ 投票主题池：点「我支持」，支持数高的先开 ============
// 均基于 workbuddy 平台；证券类为需求探测（暂无连接器，票高优先补）
export const voteThemes = [
  // —— 赚钱 · 盯盘投研（原 14 条按交付价值聚合成 3 个主题，竞品合并）——
  { id: 'c-pan', cat: '赚钱 · 盯盘投研', title: 'AI 盯盘与自动复盘', platform: 'need', desc: '自选股异动、龙虎榜、打新日历全盯住，收盘后自动出复盘和次日关注清单——通达信/同花顺/东方财富/雪球等任选' },
  { id: 'c-touyan', cat: '赚钱 · 盯盘投研', title: 'AI 投研助手', platform: 'need', desc: '输入一只票，10 分钟出财报要点、同行对比与可溯源结论，不构成投资建议——问财/Wind/Choice 等任选' },
  { id: 'c-gangmei', cat: '赚钱 · 盯盘投研', title: '港美股账户 AI 日报', platform: 'need', desc: '开盘前要闻+持仓分析自动摆上桌，多市场账户每天一份日报——富途/老虎等任选' },
  // —— 上班 · 办公一条线 ——
  { id: 'c-jiyao', cat: '上班 · 办公一条线', title: '会议纪要到待办闭环', platform: 'loongbuddy', desc: '录音一键变带出处的纪要和待办，自动进清单——腾讯会议/飞书/企业微信任选' },
  { id: 'c-zhoubao', cat: '上班 · 办公一条线', title: '周报日报自动生成', platform: 'loongbuddy', desc: '从邮件、文档、群消息自动起草，人只核对口径——QQ 邮箱/腾讯文档/企业微信/滴答清单任选' },
  { id: 'c-ppt', cat: '上班 · 办公一条线', title: '汇报 PPT 一键成稿', platform: 'loongbuddy', desc: '素材自动盘点、大纲到成稿一键完成，汇报前夜不再熬夜' },
  { id: 'c-duowei', cat: '上班 · 办公一条线', title: '多维表格 AI 中枢', platform: 'loongbuddy', desc: '表格一键清洗汇总，变成能对话的轻 CRM——飞书/腾讯文档多维表格任选' },
  // —— 认知 · 知识产线 ——
  { id: 'c-zhishiku', cat: '认知 · 知识产线', title: '个人 AI 知识库（收藏变可用）', platform: 'loongbuddy', desc: '网页、视频、书、PDF 自动剪藏、摘要、归档，收藏变成随时能用的素材库——ima/微信读书/有道云笔记/Notion/微云等' },
  { id: 'c-wiki', cat: '认知 · 知识产线', title: 'AI 笔记整理与个人 Wiki', platform: 'loongbuddy', desc: '笔记自动打标归类、建立连接，沉淀成 AI 能读懂的个人知识库' },
  { id: 'c-tuandui', cat: '认知 · 知识产线', title: '团队知识库与自建 AI 平台', platform: 'loongbuddy', desc: '企业知识库问答、私有化部署、自建 AI 应用——腾讯乐享/WeKnora/Dify 任选' },
  // —— 生活 · 出行账本 ——
  { id: 'c-xingcheng', cat: '生活 · 出行账本', title: 'AI 行程规划与出行代办', platform: 'loongbuddy', desc: '一句话出含预算的行程，订票订房打车一条线——飞猪/携程/美团/百度地图/滴滴任选' },
  { id: 'c-jizhang', cat: '生活 · 出行账本', title: 'AI 记账与账单整理', platform: 'need', desc: '微信/支付宝账单自动导入、分类、对账，钱花哪儿了一目了然' },
  { id: 'c-jiuzhi', cat: '生活 · 出行账本', title: 'AI 求职流水线', platform: 'need', desc: '简历定制、岗位匹配、自动投递与进度跟踪，求职全流程 AI 代办' },
  { id: 'c-shenghuo', cat: '生活 · 出行账本', title: 'AI 懂你的生活', platform: 'loongbuddy', desc: '歌单自动生成、年度听歌报告、你的私人 AI DJ——QQ音乐等' },
  // —— 科研 · 文献综述 ——
  { id: 'c-wenxian', cat: '科研 · 文献综述', title: '文献综述与选题助手', platform: 'loongbuddy', desc: '从检索到综述初稿，全程真实引用可核查——OpenAlex 学术数据库' },
  // —— 做生意 · 尽调风控 ——
  { id: 'c-jindiao', cat: '做生意 · 尽调风控', title: '企业尽调与法律风控', platform: 'loongbuddy', desc: '客户画像、风险速查、合同法律检查，接单前先读懂对方——企查查/元典' },
]

// ============ 生命周期状态机：站点文案全部由 dateISO 派生 ============
// open=报名中（现在 < 开课）；live=进行中（开课~结课之间）；done=已交付；soon=排期中（未定档）。
// React 客户端渲染，Date.now() 取访客侧时间——到点自动翻转，改站只需在对应场次填/改
// dateISO、dateEndISO 两行，任何组件都不用再动。
const HOUR = 3600 * 1000
const ts = w => (w.dateISO ? new Date(w.dateISO).getTime() : NaN)
const endTs = w => (w.dateEndISO ? new Date(w.dateEndISO).getTime() : ts(w) + 4 * HOUR)

export function stageOf(w) {
  const t = ts(w)
  if (Number.isNaN(t)) return 'soon'
  const now = Date.now()
  if (now >= endTs(w)) return 'done'
  if (now >= t) return 'live'
  return 'open'
}

export function statusLabelOf(w) {
  const s = stageOf(w)
  if (s === 'open') return `${w.date} · 报名中`
  if (s === 'live') return '今天进行中'
  if (s === 'done') return '已交付 · 材料回看'
  return `${w.date} · 排期中`
}

export function shortDate(w) {
  const d = new Date(w.dateISO)
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日`
}

export const nextOpen = () =>
  workshops.filter(w => stageOf(w) === 'open').sort((a, b) => ts(a) - ts(b))[0] || null

export const doneList = () => workshops.filter(w => stageOf(w) === 'done')

export const seriesIntro = (() => {
  const nx = nextOpen()
  const n = doneList().length
  const lead = '每期一个真实 AI 软件，当场拆、当场接、当场跑通。'
  const mid = nx
    ? `下一场 ${shortDate(nx)} 开课，正在报名`
    : n > 0
      ? '上一场已交付，材料可回看，下一期排期中'
      : '首场时间即将公布'
  return `${lead}${mid}；其余全部开放投票——点「我支持」，支持数高的先开。想拆的在列表里没有？加微信 ikoning365 告诉我。`
})()

export default workshops
