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
    desc: '拆书之路的起点，两场 10 分钟现场实录。TF1-1 走通 RIA 便签法全流程：选出拆页（R）、用自己的话重述（I）、激活过往经验（A1）、规划未来应用（A2）；TF1-2 聚焦 how 类拆页——把书中的行动建议讲清楚、配上对应案例，并学会现场分组与清晰指令。所有技能点均对照观察家记录表评审。',
    skills: [
      '选书与选拆页：实用类/理论类图书，不超 2 页内页（TF1-1）',
      '拆书预备表：含 I/A1/A2 逐字稿与各环节时间分配（TF1-1）',
      '介绍「拆书是什么」：2~3 分钟讲清拆书与拆书帮（TF1-1）',
      '【I】用自己的话重述：诠释、准确、清晰、致用（TF1-1）',
      '【A1】鲜活经验：自己的具体经历，有时间有人物有起因结果（TF1-1）',
      '【A2】规划应用：写下未来可执行的具体行动（TF1-1）',
      'how 拆页讲解：复述行动步骤，并配成功案例（TF1-2）',
      '现场分组与指令：3~6 人一组，指令五要素清晰（TF1-2）',
    ],
    value: [
      '把任何致用类书拆成行动：RIA 便签法终身受用',
      '第一次登台实录：10 分钟讲清一个知识点并带出行动',
      '现场表达与倾听的基本功，家庭职场即刻可用',
    ],
    outcomes: [
      '理解 RIA 便签法的完整方法论',
      '独立完成 TF1-1、TF1-2 两场过级实录',
      '能现场讲清一个 how 并配出对应案例',
      '获得观察家评审通过的第一批实录',
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
    desc: '从「自己会」到「带人会」的四连关。二级在一级的 I/A 功底上补齐课程设计手艺：写可观察、可测量的学习目标，用 FAB 介绍图书，讲清不做的坏处，预判并回应学习者异议，细化行动步骤或意译案例四选其全；再用显像提问、分步催化和 A3 场景演练点燃现场，最终在 TF2-4 用两个有逻辑关系的拆页完成一场完整拆书课。',
    skills: [
      '学习目标设计：可观察、可测量的行为动词（TF2-1）',
      'FAB 图书介绍法：特征 F、优势 A、利益 B（TF2-1）',
      '讲清不做的坏处：惯常做法与糟糕后果（TF2-2）',
      '举例子：具体案例对应 how，反例变正例（TF2-2）',
      '预防异议：预判学习者异议，给预防性讲解（TF2-2）',
      '细化行动步骤：给出比原文更易操作的 how（TF2-3）',
      '意译案例：脉络一致、贴近学习者的本土案例（TF2-3）',
      '显像提问：用情境画面激活过往经验（TF2-1/2-4）',
      '分步催化：分步勾勒未来应用场景（TF2-2）',
      'A3 场景演练：设计具体、确定的演练场景（TF2-3/2-4）',
      '双拆页逻辑设计：递进或补充，总内容不超 4 页（TF2-4）',
    ],
    value: [
      '从会做到会教：课程设计与现场引导能力',
      '显像提问、分步催化的临场功力，路演/汇报直接受益',
      '可独立开出双拆页完整拆书课，教学影响力起步',
    ],
    outcomes: [
      '独立设计双拆页递进式拆书课（TF2-4）',
      '掌握四种讲解技巧：坏处、异议、细化、意译',
      '能用显像提问与 A3 场景演练带动全场',
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
    desc: '三级九拆的最后三关。拆页换成不带 how 的 why/what 或纯案例——考的是拆书家自己提炼行动建议、辨析概念适用边界的功力；现场引导全面升级：量表自测、编剧本催化、选择题式控场互动，直至 TF3-3 的微行动学习五步流程与回应式反馈。2026 版评分表还新增 AI 技能点：用 AI 设计量表、给任务找茬，并现场主持人机协作共创方案。',
    skills: [
      'why/what 拆页：选择不带 how 的理念或案例拆页（TF3-1）',
      '从原文提炼 how：给出行动建议与具体步骤（TF3-1）',
      '场景介绍法四步：事件、提问、影响、解决（TF3-1）',
      '概念辨析：概念与例子对比、易混概念与适用边界（TF3-3）',
      '控场互动：选择题、填空题等精准互动技术（TF3-2）',
      '自测量表设计：一题一事，引发自我觉察（TF3-2/3-3）',
      '编剧本催化：人物、对话、起因经过结果的故事创作（TF3-1/3-3）',
      '小组讨论引导：形成解决方案的 A3 设计（TF3-2）',
      '课后任务设计：五要素指令，回收学习者应用实录（TF3-2/3-3）',
      '时间掌控：总时长与各环节时长精准分配（TF3 全级）',
      '微行动学习 MAL：引导提问题、讨本质、定方案五步（TF3-3）',
      '回应式反馈：用提问话术回应学习者的分享与提问（TF3-3）',
      '2026 新增·AI 备稿协作：苏格拉底式量表设计、任务找茬（TF3-2）',
      '2026 新增·人机协作指挥官：现场五步与 AI 共创方案（TF3-3）',
    ],
    value: [
      '从教一个人到带一群人：徒弟成长是你的作品',
      '能主持微行动学习工作坊，成为分舵中坚',
      '进入师父精进训练营通道，向精英师父进阶',
    ],
    outcomes: [
      '完成 TF3 全部过级，成为三级拆书家',
      '能在无 how 拆页上现场提炼行动建议',
      '能主持微行动学习工作坊（TF3-3）',
      '掌握 2026 新增 AI 人机协作技能点',
    ],
  },
  {
    id: 'ai',
    title: 'AI 拆书家',
    subtitle: '用 RIA 便签法拆 AI，拆为己用',
    range: '元技能 + RIA 拆 AI',
    color: 'from-violet-600 to-purple-700',
    light: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/30',
    text: 'text-violet-700',
    icon: 'text-violet-600',
    bg: 'bg-violet-500/10',
    desc: '在三级九拆之上，用你最熟的 RIA 便签法来拆 AI：R 不是拆页，而是安装配置 AI 软件——先让 AI 在你的设备上跑起来；I 不是重述原文，而是匹配你的使用场景——用自己的话讲清 AI 在哪些真实场景为你所用；A 不是规划应用，而是反思和定制——把每次使用沉淀成专属技能、可召唤的 AI 专家和自己的 AI Agent。一个人也能拥有编辑部的产能。',
    skills: [
      '【R】选型与安装：命令行 / 桌面端 / 手机端 AI 软件，跑通第一次对话',
      '【R】配置与接入：模型选择、账号密钥、常用插件，搭好自己的 AI 工位',
      '【I】场景重述：用自己的话说清「AI 在我的哪些场景有用」——读书、拆书、写作、工作流',
      '【I】场景匹配：把 AI 对到真实任务上（作者蒸馏、便签拆书、赏鉴出图、知识卡片），而非背功能清单',
      '【A】反思：回顾每次人机协作的效果，哪里省时、哪里跑偏、下次怎么问更好',
      '【A】定制技能：把有效用法固化成专属 Skill 技能包，可复用、可分享、可教学',
      '【A】定制专家与 Agent：召唤 8 套思想体系的 AI 专家，定制自己的 AI Agent，达尔文式持续进化',
    ],
    pipeline: [
      { name: 'R · 安装配置 AI 软件', desc: '像选拆页一样选工具：装好 AI 软件（命令行/桌面端/手机端），配好模型与账号，跑通第一次人机对话——先让 AI 上桌', color: 'from-rose-600 to-pink-500' },
      { name: 'I · 匹配使用场景', desc: '用自己的话重述：AI 在我的哪些场景有用？读书拆书、写作输出、日常工作流——把工具对到真实场景，而不是背功能清单', color: 'from-cyan-600 to-cyan-400' },
      { name: 'A · 反思和定制', desc: '拆为己用：反思每次使用的效果，定制专属技能、可召唤的 AI 专家与自己的 AI Agent，让 AI 长成你的编辑部', color: 'from-violet-600 to-purple-500' },
    ],
    outputs: [
      { name: '作者蒸馏', desc: '用 AI 分析作者思想体系，构建知识图谱' },
      { name: '便签拆书', desc: '自动从拆页提取 RIA 内容，生成教练 SKILL' },
      { name: '拆书赏鉴', desc: '将技能框架转化为信息图' },
      { name: '知识卡片', desc: '生成 Anki 间隔复习卡片' },
      { name: '达尔文进化', desc: '评分+爬山优化，持续迭代技能' },
    ],
    value: [
      '拆书成果变资产：技能包可复用、可分享、可教学',
      '一人产出，千人可用——AI 放大你的教学影响力',
      '个人知识体系可视化，成长看得见、带得走',
    ],
    outcomes: [
      '独立产出 AI 辅助拆书技能包',
      '走通 R·I·A 三步：装好 AI、对准场景、定制出自己的技能与平台',
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
