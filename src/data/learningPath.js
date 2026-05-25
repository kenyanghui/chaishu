const levels = [
  {
    id: 'tf1',
    title: '基础拆书家',
    subtitle: '掌握 RIA 便签法，能独立过级',
    range: 'TF1-1 ~ TF1-2',
    color: 'from-indigo-600 to-indigo-400',
    light: 'from-indigo-500/20 to-indigo-500/20',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    desc: '拆书之路的起点。掌握 RIA 便签法的核心技能——从书中提取拆页（R）、鲜活内化解读（I）、催化应用行动（A），能独立完成 TF1-1 和 TF1-2 过级。',
    skills: [
      '移情聆听四步法 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '双赢过程四步法 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '要事第一 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '拒绝后撤策略 · 罗伯特·西奥迪尼《影响力》',
      '高质量赞美三步法 · 艾伦·加纳《谈话的力量》',
      'SCQA 搭建序言 · 李忠秋《结构思考力》',
      '自控力三步法 · 凯利·麦格尼格尔《自控力》',
      '3个问题解决对立 · 八幡纰芦史《重要的事情说3点》',
      '赢得合作4步法 · 简·尼尔森《正面管教》',
      '检视阅读 · 赵周《这样读书就够了》',
    ],
    outcomes: [
      '理解 RIA 便签法的完整方法论',
      '能独立完成 TF1-1 和 TF1-2 过级',
      '掌握 3-5 个基础沟通和时间管理技能',
      '建立拆书学习的底层习惯',
    ],
  },
  {
    id: 'tf2',
    title: '拆书教练',
    subtitle: '能设计拆书课，引导学习者',
    range: 'TF2-1 ~ TF2-4',
    color: 'from-cyan-600 to-cyan-400',
    light: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    desc: '从拆书家升级为教练。不仅要自己能拆书，更要能设计完整的拆书课，引导学习者完成 RIA 学习闭环。需要掌握引导技巧、课程设计、互动反馈等教练能力。',
    skills: [
      '冲突沟通四步法 · 科里·帕特森《关键对话》',
      'GROW 教练模型 · 约翰·惠特默《高绩效教练》',
      '责任型授权五步法 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '番茄工作法 · 邹鑫《小强升职记》',
      '能力迁移四步法 · 赵周《这样读书就够了》',
      '情感回应 · 马歇尔·卢森堡《非暴力沟通》',
      '抓要事三步法 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '自我管理四步法 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '知觉检核 · 罗纳德·阿德勒《沟通的艺术》',
      '联机学习 · 古典《跃迁》',
    ],
    outcomes: [
      '能独立设计 2 小时以上拆书课',
      '掌握引导式提问和教练式沟通',
      '能处理课堂冲突和学习者情绪',
      '完成 TF2-1 到 TF2-4 全部过级',
    ],
  },
  {
    id: 'tf3',
    title: '高级拆书家',
    subtitle: '能带徒弟，设计工作坊',
    range: 'TF3-1 ~ TF3-3',
    color: 'from-amber-600 to-yellow-500',
    light: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    desc: '成为三级拆书家，具备带徒弟和设计工作坊的能力。这个阶段的核心是"教"——不仅自己能做，还能培养下一个拆书家，形成传承的闭环。',
    skills: [
      '凭感觉做顶级成长 · 周岭《认知觉醒》',
      '感受的预防针 · 马东《好好说话》',
      '高效学习有目的的练习 · 采铜《精进》',
      '积极暂停化解冲突 · 简·尼尔森《正面管教》',
      '自嘲与自谦沟通法 · 马东《好好说话》',
      '爱的五种语言 · 盖瑞·查普曼《爱的五种语言》',
      '互惠双剑 · 罗伯特·西奥迪尼《影响力》',
      '高效学习两步法 · 安德斯·艾利克森《刻意练习》',
    ],
    outcomes: [
      '完成 TF3 全部过级，成为三级拆书家',
      '能带 1-2 名徒弟，指导过级',
      '能设计半日/全日拆书工作坊',
      '具备分享和演讲能力',
    ],
  },
  {
    id: 'ai',
    title: 'AI 拆书家',
    subtitle: '用 AI 重构拆书流程',
    range: '元技能 + AI 管线',
    color: 'from-violet-600 to-purple-500',
    light: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    desc: '超越传统拆书，用 AI 赋能拆书全流程。从作者思想蒸馏到技能包的持续进化，AI 拆书家不仅能快速产出高质量拆书成果，更能构建个人知识体系。',
    skills: [
      '作者蒸馏 → 用 AI 分析作者思想体系，构建知识图谱',
      '便签拆书 → 自动从拆页提取 RIA 内容，生成教练 SKILL',
      '高清大图 → 将技能框架转化为信息图',
      '知识卡片 → 生成 Anki 间隔复习卡片',
      '达尔文进化 → 评分+爬山优化，持续迭代技能',
    ],
    pipeline: [
      { name: '作者蒸馏', desc: '用 AI 深度分析作者思想体系、知识背景和核心观点，构建完整的作者知识图谱', color: 'from-rose-600 to-pink-500' },
      { name: '便签拆书', desc: '运用 RIA 拆书法，将全书拆解为可行动的框架：R 提取核心片段，I 鲜活内化解读，A 设计应用场景', color: 'from-cyan-600 to-cyan-400' },
      { name: '高清大图', desc: '将抽象的知识体系转化为高清信息图、思维导图和知识地图，一目了然把握全书脉络', color: 'from-amber-600 to-yellow-500' },
      { name: '知识卡片', desc: '将拆解内容制作为结构化知识卡片，适配 Anki 等间隔重复系统，构建可长期复习的知识体系', color: 'from-emerald-600 to-teal-400' },
      { name: '达尔文进化', desc: '基于使用反馈和学习数据，用 AI 持续优化所有技能产出，形成知识进化的正向循环', color: 'from-violet-600 to-purple-500' },
    ],
    outcomes: [
      '独立产出 AI 辅助拆书技能包',
      '掌握 AI 拆书管线全流程操作',
      '构建个人知识体系的可视化呈现',
      '成为 AI 拆书家，赋能更多学习者',
    ],
  },
]

export function getLevelForTF(tfLevel) {
  if (!tfLevel) return null
  if (tfLevel.startsWith('TF1')) return 0
  if (tfLevel.startsWith('TF2')) return 1
  if (tfLevel.startsWith('TF3')) return 2
  return null
}

export function classifySkill(skill) {
  const tfLevels = skill.items.map(i => i.level).filter(l => l && l.startsWith('TF'))
  if (tfLevels.length === 0) return { levelIndex: -1, levelName: '未分类' }
  const minLevel = Math.min(...tfLevels.map(l => parseInt(l.replace('TF', '').split('-')[0])))
  if (minLevel <= 1) return { levelIndex: 0, levelName: '基础拆书家' }
  if (minLevel <= 2) return { levelIndex: 1, levelName: '拆书教练' }
  return { levelIndex: 2, levelName: '高级拆书家' }
}

export default levels
