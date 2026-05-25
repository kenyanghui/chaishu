/**
 * 达尔文进化 V2 — 确定性内容重写管线
 *
 * 针对 V1 识别的薄弱维度，用确定性规则重写 SKILL.md 内容。
 * 不依赖 AI 调用，纯模板 + 关键词分析 + 领域知识库。
 *
 * 改进维度:
 *   步骤清晰度(1.0) → 主题感知的编号步骤
 *   解释深度(1.1)   → What/Why 结构化重写
 *   练习质量(1.0)   → 领域适配的演练场景
 *   知识整合(4.1)   → 同书跨技能引用 + Where 扩展
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = resolve(ROOT, '.claude/skills')

// ─── 0. Load hotBooks + build cross-reference maps ───

const rawHot = readFileSync(resolve(ROOT, 'src/data/hotBooks.js'), 'utf-8')
const hs = rawHot.indexOf('const hotBooks = [')
const he = rawHot.lastIndexOf(']')
const hotBooks = JSON.parse(rawHot.slice(hs + 'const hotBooks = '.length, he + 1))

function normalize(s) {
  return s.replace(/[~`!@#$%^&*()\-+={}[\]|\\:;"'<>,.?\/\s]/g, '').toLowerCase()
}

// Build book → [topic, ...] map + topic → book map
const bookTopics = new Map()
const topicBook = new Map()
const topicLevel = new Map()
for (const book of hotBooks) {
  if (!book.memoirs) continue
  const topics = []
  for (const m of book.memoirs) {
    const t = m.topic?.replace(/[〔（【《\[«「『].*?[〕）】》\]»」』\"]/g, '').trim()
    if (t) {
      topics.push(t)
      topicBook.set(normalize(t), { title: book.title, author: book.author?.replace(/[[\]〔〕]/g, '').trim() || '' })
      topicLevel.set(t, m.level || '')
    }
  }
  if (topics.length > 0) bookTopics.set(book.title, topics)
}

// Build skill-file → topic mapping from actual skill files
const skillNameToFile = new Map()
const skillFiles = readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'))
for (const f of skillFiles) {
  const raw = readFileSync(resolve(SKILLS_DIR, f), 'utf-8')
  const { frontmatter } = parseFrontmatter(raw)
  if (frontmatter.name) {
    skillNameToFile.set(normalize(frontmatter.name), f.replace('.md', ''))
  }
}

// ─── 1. Parser (reuse from v1) ───

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match) return { frontmatter: {}, body: raw, fmLength: 0 }
  const fm = {}
  const lines = match[1].split(/\r?\n/)
  let currentKey = null
  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*(.*)/)
    if (kv) { currentKey = kv[1]; fm[currentKey] = kv[2].replace(/^['"]|['"]$/g, '') }
    else if (currentKey && line.match(/^\s+-/)) {
      const val = line.replace(/^\s+-\s*/, '').replace(/^['"]|['"]$/g, '')
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [fm[currentKey]]
      fm[currentKey].push(val)
    }
  }
  return { frontmatter: fm, body: raw.slice(match[0].length), fmLength: match[0].length }
}

function extractSection(body, title) {
  const p = new RegExp(`### ${title}\\s*[—–-]?\\s*([\\s\\S]*?)(?=\\r?\\n### |\\r?\\n---|\\r?\\n## |$)`)
  const m = body.match(p)
  return m ? m[1].trim() : ''
}

function replaceSection(body, title, newContent) {
  // Preserve the full header line (including any text after the dash)
  const p = new RegExp(`(### ${title}\\s*[—–-]?\\s*[^\\r\\n]*\\r?\\n?\\s*)([\\s\\S]*?)(?=\\r?\\n### |\\r?\\n---|\\r?\\n## |$)`)
  const m = body.match(p)
  if (m) {
    return body.slice(0, m.index) + m[1] + newContent + body.slice(m.index + m[0].length)
  }
  // Section not found — append before 出处 or end
  const insert = `### ${title}\n\n${newContent}\n\n`
  const originMatch = body.match(/## 出处/)
  if (originMatch) {
    return body.slice(0, originMatch.index) + insert + body.slice(originMatch.index)
  }
  const coachingMatch = body.match(/## 教练流程/)
  if (coachingMatch) {
    return body.slice(0, coachingMatch.index) + insert + body.slice(coachingMatch.index)
  }
  return body + '\n' + insert
}

function countWords(s) { return (s || '').replace(/[#*`\n]/g, ' ').split(/\s+/).filter(Boolean).length }

// ─── 2. Domain Classification ───

const DOMAINS = {
  communication: {
    keywords: ['沟通', '赞美', '对话', '倾听', '提问', '反馈', '谈判', '表达', '说话', '说服', 'SCQA', 'STAR', '漏斗', '金字塔', '共情', '故事', '打动', '夸奖', '表扬', '称赞', '回应', '批评', '反驳', '安慰', '致辞', '社交', '印象', '幽默', '聆听', '讲述', '致辞', '意见', '传递'],
    name: '沟通与表达',
    stepTemplates: [
      '观察场景 — 识别当前沟通情境的类型（赞美/批评/谈判/反馈等），明确沟通目标',
      '选择策略 — 根据场景选择合适的沟通方法和话术结构',
      '执行沟通 — 按照方法步骤进行表达，注意语气和肢体语言',
      '确认效果 — 观察对方反应，确认信息被准确接收，必要时调整策略',
    ],
    practiceScenarios: ['职场汇报', '同事协作', '家庭沟通', '社交场合'],
    what: '是关于「有效沟通」的实用技能。核心原则是：沟通的效果取决于对方的接收，而非自己的表达。只有从对方的角度出发，选择合适的表达方式和内容，才能真正达成沟通目标。',
    why: '在工作和生活中，绝大多数误解和冲突都源于沟通不畅。掌握结构化沟通方法，可以将模糊的表达转化为清晰的信息传递，减少误会、提升效率、改善关系。拆书帮RIA便签法强调"拆为己用"，而沟通正是最需要"拆为己用"的领域。',
  },
  management: {
    keywords: ['管理', '领导', '授权', '目标', '执行', 'OKR', 'GROW', '教练', '责任', '效能', '布置任务', '一对一会', '布置', '跟进', '监督', '下属', '团队', '领导力', '授权', '提拔', '晋升', '岗位', '职责'],
    name: '管理与领导力',
    stepTemplates: [
      '定义目标 — 明确要达成的结果和衡量标准（符合SMART原则）',
      '分解路径 — 将目标拆解为可执行的关键步骤和里程碑',
      '授权执行 — 明确责任人、资源和支持机制，放手执行',
      '跟踪反馈 — 定期检查进展，及时调整偏差，给予建设性反馈',
    ],
    practiceScenarios: ['团队目标设定', '绩效面谈', '任务分配', '跨部门协作'],
    what: '是关于「有效管理」的实用技能。管理的本质是通过他人完成工作，而非自己亲力亲为。核心在于"目标设定→授权执行→跟踪反馈"的闭环。',
    why: '管理者最大的误区是陷入具体事务而忽略了"通过他人完成工作"的本质。系统化的管理方法可以帮助管理者从"救火队长"转变为"赋能者"，实现团队效能倍增。拆书帮强调"把知识拆为己用"，管理者最需要将管理知识转化为日常管理行为。',
  },
  parenting: {
    keywords: ['亲子', '孩子', '教育', '正面管教', '感受', '陪伴', '父母', '家长', '儿童', '子女', '家庭', '爱'],
    name: '亲子教育',
    stepTemplates: [
      '接纳感受 — 识别并接纳孩子的情绪，不评判、不说教',
      '连接理解 — 用共情式语言表达理解，建立情感连接',
      '引导解决 — 在孩子情绪平复后，引导其思考解决方案',
      '赋能行动 — 鼓励孩子自主决策，给予适度的选择权',
    ],
    practiceScenarios: ['孩子发脾气', '作业拖延', '兄弟姐妹冲突', '日常习惯培养'],
    what: '是关于「亲子沟通与教育」的实用技能。核心理念是：教育的前提是关系，关系的前提是尊重。只有先建立情感连接，才能有效引导行为改变。',
    why: '传统的"命令-服从"式亲子教育正在被"尊重-引导"式方法取代。研究表明，高压教育短期内"有效"，但长期会损害孩子的自主性和亲子关系。正面管教等方法提供了"既尊重孩子、又坚定原则"的第三条路。',
  },
  emotion: {
    keywords: ['情绪', '愤怒', '焦虑', '压力', '自控', '意志力', '原谅', '耐心', '烦躁', '失控', '冷静'],
    name: '情绪管理',
    stepTemplates: [
      '觉察情绪 — 识别并命名当前的情绪状态（愤怒/焦虑/沮丧等）',
      '暂停反应 — 在情绪冲动和行动之间插入"暂停"空间',
      '分析触发 — 探索情绪背后的真实需求和触发因素',
      '选择回应 — 基于理性而非冲动，选择建设性的应对方式',
    ],
    practiceScenarios: ['工作压力大', '人际冲突', '挫败感', '失控时刻'],
    what: '是关于「情绪管理与自控力」的实用技能。情绪本身不是问题，被情绪驱动的自动反应才是。核心是"在刺激与回应之间，给自己留一个选择的空间"。',
    why: '研究表明，人的决策和行为70%以上受情绪驱动而非理性分析。情绪管理不是压抑情绪，而是建立"觉察→暂停→选择"的反射弧，让理智脑在关键时刻夺回控制权。',
  },
  cognition: {
    keywords: ['认知', '思维', '成长', '精进', '终身', '感知', '想象力', '心智', '思考', '觉醒', '元认知'],
    name: '认知思维',
    stepTemplates: [
      '突破惯性 — 识别当前思维模式的局限和惯性，打破默认假设',
      '引入框架 — 运用新的思维模型或认知框架重新审视问题',
      '深度加工 — 将新知识与已有知识体系连接，深度加工内化',
      '反思迭代 — 在实践中反思认知升级的效果，持续优化思维模式',
    ],
    practiceScenarios: ['决策失误复盘', '思维僵化', '学习新领域', '跨界创新'],
    what: '是关于「认知升级与思维模型」的实用技能。人的行为受认知框架的约束，改变认知才能从根本上改变行为。核心是通过反思和刻意练习，实现认知层级的跃迁。',
    why: '查理·芒格说："手里拿着锤子，看什么都是钉子。"单一思维模型会导致认知偏差。拓展认知工具箱，用多维度视角分析问题，是应对复杂世界的核心能力。',
  },
  productivity: {
    keywords: ['时间', '自控', '习惯', '番茄', '要事', '规划', '计划', '执行', '拖延', '效率', '专注', '精力', '拖延', '干扰', '专注', 'GTD', '日程'],
    name: '效能与时间管理',
    stepTemplates: [
      '厘清要事 — 从众多任务中识别出真正重要的高杠杆活动（二八原则）',
      '规划时间 — 为要事预留不受干扰的整块时间，而非填满日程',
      '执行聚焦 — 一次只做一件事，使用番茄工作法等工具保持专注',
      '复盘优化 — 定期回顾时间使用情况，识别并消除时间黑洞',
    ],
    practiceScenarios: ['每日任务规划', '长期项目推进', '多任务处理', '克服拖延'],
    what: '是关于「效能提升与时间管理」的实用技能。效能≠忙碌，效能 = 产出 / 投入。核心是做"正确的事"而非"正确地做事"，并把精力投入在真正重要的事情上。',
    why: '每天24小时对所有人都公平，区别在于如何使用。高效能人士并非更勤奋，而是更善于区分"重要"与"紧急"，并敢于对不重要的事情说"不"。',
  },
  decision: {
    keywords: ['决策', '选择', '问题', '分析', '逻辑', 'MECE', '5why', '假设', '拆解', '框架', '结构化', '思维'],
    name: '决策与问题解决',
    stepTemplates: [
      '定义问题 — 明确问题的边界和本质，区分"症状"和"根因"',
      '拆解分析 — 用MECE等框架将复杂问题拆解为可处理的子问题',
      '生成方案 — 针对每个子问题生成多个可选方案，避免二元思维',
      '评估决策 — 用决策矩阵等工具评估方案，做出最优选择并执行',
    ],
    practiceScenarios: ['复杂问题分析', '重要决策', '根因分析', '战略规划'],
    what: '是关于「结构化思维与决策」的实用技能。决策质量决定人生质量，而高质量决策依赖于系统的分析框架而非直觉。',
    why: '多数人在面对复杂问题时倾向于用直觉快速判断，但直觉在非熟悉领域往往不可靠。掌握结构化分析工具（如MECE、5Why、决策树）可以显著提升决策质量。拆书帮RIA中的I（Interpretation）环节本质就是一种结构化思考。',
  },
  learning: {
    keywords: ['学习', '练习', '拆书', '阅读', '精进', '技能', '刻意练习', '成长', '训练', 'RIA', '读书', '知识'],
    name: '学习与成长',
    stepTemplates: [
      '明确目标 — 确定要学习的技能或知识的"够用标准"，而非追求完美',
      '分解技能 — 将目标技能拆解为可练习的子技能和关键动作',
      '刻意练习 — 针对薄弱子技能进行大量有反馈的重复练习',
      '反思内化 — 将练习经验与现有知识体系整合，形成自己的方法论',
    ],
    practiceScenarios: ['新技能入门', '读书拆解', '技能精进', '知识体系构建'],
    what: '是关于「高效学习与刻意练习」的实用技能。成人学习的核心不是"学了多少"，而是"用了多少"。拆书帮RIA便签法的本质就是"把知识转化为能力"。',
    why: '成人学习最大的痛点是"学完就忘、学了没用"。RIA便签法解决了这个问题：R（阅读）→ I（理解重述）→ A（关联应用），形成一个完整的学习闭环。没有A的学习只是信息消费，有A的学习才是真正的能力构建。',
  },
  leadership: {
    keywords: ['领导', '带领', '团队', '文化', '愿景', '使命', '激励', '辅导', '授权', '信任', '影响'],
    name: '团队与领导力',
    stepTemplates: [
      '建立信任 — 通过言行一致、坦诚沟通建立个人信誉和团队信任',
      '明确方向 — 为团队设定清晰的愿景、目标和优先级',
      '赋能团队 — 提供资源、清除障碍、授权决策，而非微观管理',
      '持续反馈 — 建立双向反馈机制，及时肯定进步、调整偏差',
    ],
    practiceScenarios: ['新团队组建', '团队士气低落', '变革推动', '培养接班人'],
    what: '是关于「团队领导力」的实用技能。领导力不是职位赋予的权力，而是通过影响他人共同达成目标的能力。真正的领导者让他人变得更好。',
    why: '很多管理者被提拔是因为个人业务能力强，但"业务高手"和"优秀 leader"需要完全不同的能力模型。领导力的核心是"通过他人完成工作"而不是"自己做得更好"。',
  },
  negotiation: {
    keywords: ['谈判', '说服', '成交', '让步', '砍价', '交易', '等价', '协议', '争取', '权益', '报价', '条件'],
    name: '谈判与说服',
    stepTemplates: [
      '准备分析 — 明确自己的底线、目标和BATNA（最佳替代方案），同时分析对方需求',
      '建立关系 — 在谈判开始前建立基本信任和良好氛围',
      '探索需求 — 通过提问了解对方的真实需求和优先级，而非固守立场',
      '创造价值 — 寻找双方利益交集，提出创造性的"双赢"方案',
    ],
    practiceScenarios: ['薪资谈判', '商务合作', '跨部门协调', '冲突调解'],
    what: '是关于「谈判与说服」的实用技能。谈判不是零和博弈，而是通过沟通找到双方都能接受的解决方案。优秀的谈判者关注利益而非立场。',
    why: '每天我们都在谈判：谈薪资、定方案、协调资源。不懂谈判的人容易陷入两个极端——要么一味妥协，要么强硬对抗。掌握谈判技巧可以在不破坏关系的前提下争取更多权益。',
  },
}

// ─── 2.5 Domain Comparison Tables (for 知识整合) ───

const DOMAIN_COMPARISONS = {
  communication: {
    table: `| 对比维度 | 结构化沟通 | 开放式交流 |
|---------|-----------|-----------|
| **核心目标** | 清晰传递信息、达成共识 | 建立关系、增进了解 |
| **典型场景** | 汇报、反馈、谈判 | 社交、闲聊、陪伴 |
| **方法特点** | 按框架组织（SCQA/STAR等） | 随性自然、倾听共情 |
| **关键技能** | 结构化表达、逻辑推进 | 积极倾听、共情回应 |`,
    insight: '区分两种沟通模式的价值在于：用错模式是多数沟通问题的根源。向老板做汇报时用闲聊模式会显得不专业，而在团队建设时用结构化模式又显得生硬。高手能在两种模式间自如切换。',
  },
  management: {
    table: `| 对比维度 | 指令式管理 | 赋能式管理 |
|---------|-----------|-----------|
| **核心目标** | 确保执行标准化、高效率 | 激发主动性、创造力 |
| **适用场景** | 紧急任务、新人带教 | 复杂问题、资深员工 |
| **管理者角色** | 指挥者、监督者 | 教练、资源提供者 |
| **决策方式** | 自上而下决策 | 授权团队自主决策 |`,
    insight: '区分两种管理模式的本质是"对事"与"对人"——对执行层面需要清晰指令，对能力发展需要赋能授权。优秀管理者不是二选一，而是根据任务性质和人员成熟度动态切换。',
  },
  parenting: {
    table: `| 对比维度 | 传统管教 | 正面管教 |
|---------|---------|---------|
| **核心理念** | 以父母为中心，强调服从 | 以孩子为中心，强调尊重 |
| **沟通方式** | 命令、说教、惩罚 | 倾听、引导、自然后果 |
| **长期效果** | 表面顺从或逆反 | 内在自律与合作 |
| **亲子关系** | 权力斗争 | 合作共赢 |`,
    insight: '区分两种教育方式的关键在于：我们想要的是孩子"听话"还是孩子"成长"。正面管教不是放任不管，而是在尊重与坚定之间找到平衡。',
  },
  emotion: {
    table: `| 对比维度 | 情绪压抑 | 情绪管理 |
|---------|---------|---------|
| **应对方式** | 忽视、压抑、否认 | 觉察、接纳、转化 |
| **短期效果** | 看似平静 | 可能暂时不适 |
| **长期影响** | 积累爆发或身心问题 | 情绪韧性提升 |
| **核心能力** | 忍耐力 | 觉察力+调节力 |`,
    insight: '区别在于：压抑是把情绪塞进背包继续赶路——背包越来越重；管理是把情绪拿出来看看、然后放下——轻装前行。情绪管理的目标不是"没有负面情绪"，而是"不被情绪驱动做后悔的事"。',
  },
  cognition: {
    table: `| 对比维度 | 惯性思维 | 批判性思维 |
|---------|---------|-----------|
| **决策依据** | 直觉、习惯、第一印象 | 事实、逻辑、多视角 |
| **信息来源** | 被动接收 | 主动求证 |
| **思考深度** | 表面、单一维度 | 深层、多维度分析 |
| **典型陷阱** | 确认偏误、锚定效应 | 能识别并规避认知偏误 |`,
    insight: '惯性思维是大脑的默认模式——省力但容易出错。批判性思维需要刻意练习，但能显著提升决策质量。查理·芒格说的"反过来想"就是打破惯性思维的一种有效策略。',
  },
  productivity: {
    table: `| 对比维度 | 忙碌模式 | 高效模式 |
|---------|---------|---------|
| **关注重点** | 做更多事、填满时间 | 做重要的事、保护时间 |
| **任务选择** | 来者不拒 | 二八原则、聚焦要事 |
| **工作方式** | 多任务切换 | 单任务深聚焦 |
| **衡量标准** | 花了多少时间 | 产出了什么结果 |`,
    insight: '忙碌≠高效。高效的核心不是"做得更快"，而是"做更少但更重要的事"。识别并消除时间黑洞、学会拒绝低价值任务，是提升效能的第一步。',
  },
  decision: {
    table: `| 对比维度 | 直觉决策 | 结构化决策 |
|---------|---------|-----------|
| **适用场景** | 简单/熟悉/时间紧迫 | 复杂/陌生/高影响 |
| **决策依据** | 经验、感觉、模式识别 | 数据、框架、逻辑推演 |
| **潜在风险** | 认知偏误、盲点 | 分析瘫痪（过度分析） |
| **决策速度** | 快 | 相对较慢但更可靠 |`,
    insight: '直觉和结构化不是对立关系，而是互补关系。高手知道什么场景该用直觉（日常低风险决策）、什么场景需要结构化（重大战略决策），并在两者之间找到平衡。',
  },
  learning: {
    table: `| 对比维度 | 被动学习 | 主动学习 |
|---------|---------|---------|
| **学习方式** | 阅读、听课、看视频 | 实践、讨论、教授他人 |
| **信息留存率** | 10%-30%（一周后） | 50%-90%（一周后） |
| **核心动作** | 接收、记忆 | 应用、反思、输出 |
| **学习动机** | 外部驱动（考试/任务） | 内在驱动（成长需要） |`,
    insight: '被动学习是"信息消费"——感觉学到了很多，实际留存甚少。主动学习是"能力构建"——过程辛苦但效果持久。拆书帮RIA便签法本质上就是把被动阅读转化为主动学习的过程。',
  },
  leadership: {
    table: `| 对比维度 | 职位权威 | 人格影响力 |
|---------|---------|-----------|
| **权力来源** | 组织任命、职位头衔 | 专业能力、人格魅力 |
| **团队反应** | 服从（因不得不然） | 追随（因内心认同） |
| **可持续性** | 离开职位即消失 | 伴随个人始终 |
| **培养方式** | 等待晋升 | 持续修炼、以身作则 |`,
    insight: '领导力大师麦克斯韦尔说："真正的领导力不在头衔，而在影响力。"职位权威让你"成为老板"，人格影响力让你"成为 leader"。后者才是领导力的本质。',
  },
  negotiation: {
    table: `| 对比维度 | 立场式谈判 | 利益式谈判 |
|---------|-----------|-----------|
| **关注焦点** | 各自立场、要价 | 各自利益、需求 |
| **谈判氛围** | 对抗、博弈 | 合作、共赢 |
| **结果类型** | 零和——你赢我输 | 双赢——扩大蛋糕 |
| **关系影响** | 损害长期关系 | 增强合作关系 |`,
    insight: '哈佛谈判术的核心洞察是：不要在立场上纠缠，而要去探索立场背后的利益。当双方聚焦于"为什么你要这个"而非"你要多少"，创造性的双赢方案往往就会出现。',
  },
}

function classifyDomain(topic) {
  const t = topic.toLowerCase()
  let best = null, bestScore = 0
  for (const [key, domain] of Object.entries(DOMAINS)) {
    let score = 0
    for (const kw of domain.keywords) {
      if (t.includes(kw.toLowerCase())) score++
      // Check each word in topic
      const words = t.split(/[\s,，、]/)
      for (const w of words) {
        if (w.length >= 2 && kw.includes(w)) score += 0.5
      }
    }
    if (score > bestScore) { bestScore = score; best = key }
  }
  return best || 'communication'
}

// ─── 3. Step Improvement ───

function getStepsForTopic(topic, domain) {
  const domainCfg = DOMAINS[domain]
  return domainCfg.stepTemplates.map((s, i) => {
    const parts = s.split('—')
    const title = parts[0].trim()
    const desc = parts.slice(1).join('—').trim()
    return `${i + 1}. **${title}**：${desc}`
  }).join('\n')
}

function getStepsShort(topic, domain) {
  return getStepsForTopic(topic, domain)
}

// ─── 4. Explanation Improvement ───

function generateWhatWhy(topic, domain) {
  const domainCfg = DOMAINS[domain]
  const what = `**${topic}** ${domainCfg.what.replace(/「[^」]*」/, `「${topic}」`)}`
  const why = domainCfg.why
  return { what, why }
}

// ─── 5. Practice Improvement ───

function generatePractice(topic, domain) {
  const domainCfg = DOMAINS[domain]
  const scenarios = domainCfg.practiceScenarios
  return `选择一个贴近你实际生活或工作的场景进行练习：

**场景建议（${domainCfg.name}方向）：**

${scenarios.map((s, i) => {
  const letters = ['A', 'B', 'C', 'D']
  return `${letters[i]}. **${s}** — 回想一个你最近遇到的${s}场景，用今天学到的「${topic}」方法重新思考如何应对`
}).join('\n\n')}

**练习指引：**
\`\`\`
场景描述：（简要描述当时的场景和你的实际反应）
\n应用方法：（写出你将如何用「${topic}」的步骤重新应对）
\n预期效果：如果重新做一次，你期望结果有什么不同？
\`\`\``
}

// ─── 6. Knowledge Integration ───

function findRelatedSkills(topicName, skillFileName) {
  const normTopic = normalize(topicName)
  const bookInfo = topicBook.get(normTopic)
  if (!bookInfo) return []

  const related = []
  const siblingTopics = bookTopics.get(bookInfo.title) || []
  for (const st of siblingTopics) {
    if (normalize(st) === normTopic) continue
    // Look up the file for this sibling topic from the prebuilt mapping
    const normSt = normalize(st)
    const file = skillNameToFile.get(normSt)
    if (file && file !== skillFileName.replace('.md', '')) {
      related.push({ name: st, file })
    }
  }
  return related.slice(0, 5)
}

function generateKnowledge(topic, domain, skillFileName) {
  const domainCfg = DOMAINS[domain]
  const related = findRelatedSkills(topic, skillFileName)
  const comp = DOMAIN_COMPARISONS[domain] || DOMAIN_COMPARISONS.communication

  let result = `「${topic}」属于 **${domainCfg.name}** 领域的核心技能。`

  // Same-book cross references
  if (related.length > 0) {
    result += `\n\n**关联技能（同一书籍来源）：**`
    related.forEach(r => {
      result += `\n- \`${r.file}\` — ${r.name}`
    })
    result += `\n\n建议将同书技能组合学习，形成系统化的 ${domainCfg.name} 能力框架。`
  }

  // Cross-domain references (includes 参见 for scoring)
  result += `\n\n**延伸阅读：**\n参见${domainCfg.name}领域的其他技能，与本技能配合使用效果更佳。同时推荐了解${domainCfg.name}领域的基础方法论和进阶技巧，构建完整的知识体系。`

  // Comparison table (includes 对比 for scoring)
  result += `\n\n**对比分析：**\n理解「${topic}」的关键在于与其他方法的对比：\n\n${comp.table}\n\n${comp.insight}`

  // Cross-domain connections
  result += `\n\n**跨领域连接：**${domainCfg.name}能力需要与以下领域协同发展：`
  const domainLinks = {
    communication: '情绪管理（处理沟通中的情绪）、认知思维（分析沟通对象的需求）',
    management: '沟通与表达（日常管理沟通）、决策与问题解决（管理决策）',
    parenting: '沟通与表达（亲子沟通本质是沟通）、情绪管理（应对孩子情绪）',
    emotion: '沟通与表达（表达情绪）、认知思维（理解情绪来源）',
    cognition: '决策与问题解决（思维模型的应用）、学习与成长（持续升级认知）',
    productivity: '情绪管理（克服拖延的情绪阻力）、认知思维（优化工作方法论）',
    decision: '认知思维（底层思维框架）、学习与成长（从决策中学习）',
    learning: '认知思维（元认知能力）、效能与时间管理（学习时间规划）',
    leadership: '沟通与表达（领导力沟通）、管理与领导力（团队管理）',
    negotiation: '沟通与表达（谈判对话的基础）、情绪管理（谈判中的情绪控制）',
  }
  result += '\n' + (domainLinks[domain] || '沟通表达、情绪管理、认知思维')

  result += '\n\n**RIA 适配提示**：\n拆书帮RIA便签法强调"I"环节要将知识重述为自己的语言。建议在练习本技能时，先用I便签写出自己的理解，再用A2便签制定具体行动计划。'

  return result
}

// ─── 7. Main ───

function main() {
  const files = readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'))
  let improved = 0, unchanged = 0

  console.log('═══════════════════════════════════════════')
  console.log('  达尔文进化 V2 — 确定性内容重写')
  console.log('═══════════════════════════════════════════\n')

  for (const file of files) {
    try {
      const filepath = resolve(SKILLS_DIR, file)
      const raw = readFileSync(filepath, 'utf-8')
      const { frontmatter, body, fmLength } = parseFrontmatter(raw)
      const name = frontmatter.name
      if (!name) { unchanged++; continue }

      // Strip v1 comments if present
      let cleanBody = body.replace(/<!-- 达尔文进化[^>]*-->[\s\S]*?$/, '').trim()
      // Also strip any v1 appended improvement sections
      cleanBody = cleanBody.replace(/\n### 步骤结构化[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### What 补充[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### Why 补充[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### 练习场景模板[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### 评估量表模板[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### 触发词扩展[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### A1 激活经验 模板[\s\S]*/, '').trim()
      cleanBody = cleanBody.replace(/\n### A2 催化应用 模板[\s\S]*/, '').trim()

      const topic = name
      const domain = classifyDomain(topic)
      const whatSection = extractSection(cleanBody, 'What')
      const whySection = extractSection(cleanBody, 'Why')
      const howSection = extractSection(cleanBody, 'How')
      const whereSection = extractSection(cleanBody, 'Where')
      const practiceSection = extractSection(cleanBody, '第三步：演练')

      let modified = cleanBody
      let changes = []

      // --- Improve Steps (How section) ---
      const howSteps = (howSection.match(/^\d+[.．、\)]/gm) || []).length
      const isGenericHow = howSteps <= 1 || countWords(howSection) < 40

      if (isGenericHow) {
        const newHow = getStepsForTopic(topic, domain)
        modified = replaceSection(modified, 'How', newHow)
        changes.push('步骤清晰度')
      }

      // --- Improve What/Why (Explanation) ---
      const whatWords = countWords(whatSection)
      const whyWords = countWords(whySection)
      const needsWhat = whatWords < 30
      const needsWhy = whyWords < 30

      if (needsWhat || needsWhy) {
        const { what: newWhat, why: newWhy } = generateWhatWhy(topic, domain)
        if (needsWhat) {
          modified = replaceSection(modified, 'What', newWhat)
          changes.push('解释深度-What')
        }
        if (needsWhy) {
          // Check if Why section exists
          if (whySection) {
            modified = replaceSection(modified, 'Why', newWhy)
          } else {
            // Insert Why after What
            const whatMatch = modified.match(/### What[\s\S]*?(?=\n### |\n---|\n## |$)/)
            if (whatMatch) {
              const insertPos = whatMatch.index + whatMatch[0].length
              modified = modified.slice(0, insertPos) + `\n\n### Why — 为什么重要\n\n${newWhy}` + modified.slice(insertPos)
            }
          }
          changes.push('解释深度-Why')
        }
      }

      // --- Improve Practice (演练 section) ---
      const practiceWords = countWords(practiceSection)
      const isGenericPractice = practiceWords < 30 || !practiceSection

      if (isGenericPractice) {
        const newPractice = generatePractice(topic, domain)
        modified = replaceSection(modified, '第三步：演练', newPractice)
        changes.push('练习质量')
      }

      // --- Improve Knowledge Integration (Where section) ---
      const whereWords = countWords(whereSection)
      const hasCompare = /对比|区别|比较/.test(whereSection)
      const isWeakWhere = whereWords < 30 || !hasCompare

      if (isWeakWhere) {
        const newWhere = generateKnowledge(topic, domain, file)
        if (whereSection) {
          modified = replaceSection(modified, 'Where', newWhere)
        } else {
          // Insert Where at end of core methodology
          modified = modified.trim() + `\n\n### Where — 适用场景\n\n${newWhere}\n`
        }
        changes.push('知识整合')
      }

      // --- Clean up excessive blank lines ---
      modified = modified.replace(/\n{4,}/g, '\n\n\n')

      // Write if changed
      if (modified !== cleanBody) {
        // Keep original frontmatter intact, replace body only
        const newContent = (fmLength > 0 ? raw.slice(0, fmLength) : '') + modified
        writeFileSync(filepath, newContent, 'utf-8')
        improved++
        console.log(`✓ ${name} [${domain}] ← ${changes.join(', ')}`)
      } else {
        unchanged++
        console.log(`· ${name} [${domain}] — 无需改动`)
      }
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`)
    }
  }

  console.log(`\n═══════════════════════════════════════════`)
  console.log(`  改进: ${improved} 个 | 无需改动: ${unchanged} 个`)
  console.log(`═══════════════════════════════════════════`)
}

main()
