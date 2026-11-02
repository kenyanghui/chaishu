const levels = [
  {
    id: 'tf1',
    title: '基础拆书家',
    subtitle: '掌握 RIA 便签法，TF1-1 / TF1-2 过级',
    range: 'TF1-1 ~ TF1-2',
    color: 'from-indigo-600 to-indigo-700',
    light: 'from-indigo-500/20 to-indigo-500/20',
    border: 'border-indigo-500/30',
    text: 'text-indigo-700',
    icon: 'text-indigo-600',
    bg: 'bg-indigo-500/10',
    desc: '拆书之路的起点。用 RIA 便签法把「读完就忘」变成「读完就用」：从书中挑出拆页（R），写出自己的解读（I），落成可执行的行动（A）。TF1 聚焦倾听与表达这两项一辈子用得上的基本功——7000+ 条真实过级记录里，非暴力沟通、这样读书就够了、正面管教是被拆得最多的三本。',
    skills: [
      '区分观察与评论 · 马歇尔·卢森堡《非暴力沟通》',
      '体会与表达感受 · 马歇尔·卢森堡《非暴力沟通》',
      'RIA 便签三步：拆页→解读→行动 · 赵周《这样读书就够了》',
      '移情聆听 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '赢得合作四步法 · 简·尼尔森《正面管教》',
      '真诚赞美与倾听回应 · 《沟通圣经》',
    ],
    value: [
      '说话有人听：倾听与表达升级，家庭职场都受用',
      '第一次「教会别人」的完整体验，建立教学信心',
      '养成「任何一本书都能拆出行动」的底层习惯',
    ],
    outcomes: [
      '理解 RIA 便签法的完整方法论',
      '独立完成 TF1-1、TF1-2 两道过级',
      '掌握 4-6 个沟通基本功，随取随用',
      '积累第一批评审认可的拆书案例',
    ],
  },
  {
    id: 'tf2',
    title: '拆书教练',
    subtitle: '能设计拆书课，引导学习者',
    range: 'TF2-1 ~ TF2-4',
    color: 'from-cyan-600 to-cyan-700',
    light: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-700',
    icon: 'text-cyan-600',
    bg: 'bg-cyan-500/10',
    desc: '从「自己会」升级为「带人会」。TF2 四道过级，练的是教练的核心手艺：设计课程、引导讨论、处理冲突、给学习者即时反馈。这一层也是职场领导力的加速器——拆书帮训练营的原话：无论你想成为优秀师父，还是希望提升职场领导力与个人影响力，这门课都带给你实用的方法与工具。',
    skills: [
      '冲突对话四步法 · 科里·帕特森《关键对话》',
      '请求反馈，确认理解对齐 · 马歇尔·卢森堡《非暴力沟通》',
      'SCQA 结构化表达 · 李忠秋《结构思考力》',
      '引导式提问 · 赵周《提问力》',
      '感受的预防针 · 马东《好好说话》',
      '刻意练习设计 · 安德斯·艾利克森《刻意练习》',
    ],
    value: [
      '从会做到会教：课程设计与现场引导能力',
      '处理冲突与冷场的临场功力，路演/汇报直接受益',
      '可独立开办 2 小时拆书课，教学影响力起步',
    ],
    outcomes: [
      '独立设计并主持 2 小时以上拆书课',
      '掌握引导式提问与教练式反馈',
      '能化解课堂冲突与学习者情绪',
      '完成 TF2-1 至 TF2-4 全部过级',
    ],
  },
  {
    id: 'tf3',
    title: '高级拆书家',
    subtitle: '能带徒弟，设计工作坊',
    range: 'TF3-1 ~ TF3-3',
    color: 'from-amber-600 to-amber-700',
    light: 'from-amber-500/20 to-yellow-500/20',
    border: 'border-amber-500/40',
    text: 'text-amber-700',
    icon: 'text-amber-600',
    bg: 'bg-amber-500/10',
    desc: '三级九拆的最后一关，也是「师父」的门槛。这一阶段的核心是传承：凭经验带徒变成有标准、有方法、有路径——师徒契约与双向选择、因材施教定方向、全景看板控节奏、停滞诊断给破局。拆书帮「师父精进训练营」的七节课，教的正是这一整套带徒方法论。',
    skills: [
      '师徒契约与双向选择（训练营第 2 课）',
      '因材施教：探寻痛点给拆书方向（训练营第 4 课）',
      '全景看板与辅导节奏把控（训练营第 5 课）',
      '停滞诊断与四大行动卡片（训练营第 6 课）',
      '责任型授权 · 史蒂芬·柯维《高效能人士的七个习惯》',
      '互惠影响力 · 罗伯特·西奥迪尼《影响力》',
    ],
    value: [
      '从教一个人到带一群人：徒弟成长是你的作品',
      '工作坊与分享能力变现，成为分舵中坚',
      '进入师父精进训练营通道，向精英师父进阶',
    ],
    outcomes: [
      '完成 TF3 全部过级，成为三级拆书家',
      '能带 1-2 名徒弟走完过级路径',
      '能设计半日/全日拆书工作坊',
      '具备分舵分享与公开演讲能力',
    ],
  },
  {
    id: 'ai',
    title: 'AI 拆书家',
    subtitle: '用 AI 重构拆书流程',
    range: '元技能 + AI 管线',
    color: 'from-violet-600 to-purple-700',
    light: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-700',
    icon: 'text-violet-600',
    bg: 'bg-violet-500/10',
    desc: '在三级九拆之上，用 AI 管线把每次拆书沉淀为可复用的数字资产：作者蒸馏建知识图谱，便签拆书生成教练技能包，赏鉴出图、卡片入库、达尔文进化持续迭代。一个人也能拥有编辑部的产能——你拆的每一个拆页，都变成别人拿来就能用的教练 Skill。',
    skills: [
      '作者蒸馏 → 用 AI 分析作者思想体系，构建知识图谱',
      '便签拆书 → 自动从拆页提取 RIA 内容，生成教练 SKILL',
      '拆书赏鉴 → 将技能框架转化为信息图',
      '知识卡片 → 生成 Anki 间隔复习卡片',
      '达尔文进化 → 评分+爬山优化，持续迭代技能',
    ],
    pipeline: [
      { name: '作者蒸馏', desc: '用 AI 深度分析作者思想体系、知识背景和核心观点，构建完整的作者知识图谱', color: 'from-rose-600 to-pink-500' },
      { name: '便签拆书', desc: '运用 RIA 拆书法，将全书拆解为可行动的框架：R 提取核心片段，I 鲜活内化解读，A 设计应用场景', color: 'from-cyan-600 to-cyan-400' },
      { name: '拆书赏鉴', desc: '将抽象的知识体系转化为高清信息图、思维导图和知识地图，一目了然把握全书脉络', color: 'from-amber-600 to-yellow-500' },
      { name: '知识卡片', desc: '将拆解内容制作为结构化知识卡片，适配 Anki 等间隔重复系统，构建可长期复习的知识体系', color: 'from-emerald-600 to-teal-400' },
      { name: '达尔文进化', desc: '基于使用反馈和学习数据，用 AI 持续优化所有技能产出，形成知识进化的正向循环', color: 'from-violet-600 to-purple-500' },
    ],
    value: [
      '拆书成果变资产：技能包可复用、可分享、可教学',
      '一人产出，千人可用——AI 放大你的教学影响力',
      '个人知识体系可视化，成长看得见、带得走',
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
