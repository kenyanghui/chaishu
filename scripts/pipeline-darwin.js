/**
 * 达尔文进化管线 — SKILL.md 评分 + 爬山优化
 *
 * 对每个 SKILL.md 进行 8 维度评分，
 * 识别薄弱维度并生成改进版本。
 *
 * 评分维度 (1-10):
 * 1. 触发覆盖  — 触发词是否全面覆盖目标用户搜索场景
 * 2. 步骤清晰度 — How 步骤是否可操作、具体
 * 3. 解释深度  — What/Why 是否透彻
 * 4. 教练流程  — 诊断→教学→演练→反馈 完整性
 * 5. 练习质量  — 场景模拟是否丰富、贴近实际
 * 6. 评估体系  — 是否有明确的评价标准和毕业条件
 * 7. 互动设计  — 用户参与度和交互性
 * 8. 知识整合  — 是否连接了更广泛的知识体系
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = resolve(ROOT, '.claude/skills')

// ─── Parser ───

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { frontmatter: {}, body: raw }
  const fm = {}
  const lines = match[1].split('\n')
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
  return { frontmatter: fm, body: raw.slice(match[0].length) }
}

function extractSection(body, title) {
  const p = new RegExp(`### ${title}\\s*[—–-]?\\s*([\\s\\S]*?)(?=\\n### |\\n---|\\n## |$)`)
  const m = body.match(p)
  return m ? m[1].trim() : ''
}

function countWords(s) { return (s || '').replace(/[#*`\n]/g, ' ').split(/\s+/).filter(Boolean).length }

// ─── 8-Dimension Scoring ───

function scoreSkill(fm, body) {
  const name = fm.name || ''
  const triggers = Array.isArray(fm.trigger) ? fm.trigger : (fm.trigger ? [fm.trigger] : [])
  const what = extractSection(body, 'What')
  const why = extractSection(body, 'Why')
  const how = extractSection(body, 'How')
  const where = extractSection(body, 'Where')

  // Coaching flow sections
  const diag = extractSection(body, '第一步：诊断')
  const teach = extractSection(body, '第二步：教学')
  const practice = extractSection(body, '第三步：演练')
  const feedback = extractSection(body, '第四步：反馈')

  const hasA1 = body.includes('A1') || body.includes('激活经验')
  const hasA2 = body.includes('A2') || body.includes('催化应用')
  const hasAssessment = body.includes('评估') || body.includes('评分') || body.includes('毕业')

  // Dimension 1: Trigger Coverage (1-10)
  const d1 = Math.min(10, Math.max(1,
    triggers.length >= 8 ? 10 :
    triggers.length >= 6 ? 8 :
    triggers.length >= 4 ? 6 :
    triggers.length >= 2 ? 4 : 2
  ))

  // Dimension 2: Step Clarity (1-10)
  const howSteps = (how.match(/^\d+[.．、\)]/gm) || []).length
  const howWords = countWords(how)
  const d2 = Math.min(10, Math.max(1,
    howSteps >= 4 && howWords > 80 ? 10 :
    howSteps >= 3 && howWords > 60 ? 8 :
    howSteps >= 2 ? 6 :
    howSteps >= 1 ? 4 : 1
  ))

  // Dimension 3: Explanation Depth (1-10)
  const whatWords = countWords(what)
  const whyWords = countWords(why)
  const d3 = Math.min(10, Math.max(1,
    whatWords > 80 && whyWords > 80 ? 10 :
    whatWords > 50 && whyWords > 50 ? 8 :
    whatWords > 30 || whyWords > 30 ? 6 :
    whatWords > 10 || whyWords > 10 ? 4 : 1
  ))

  // Dimension 4: Coaching Flow (1-10)
  const flowSections = [diag, teach, practice, feedback].filter(Boolean).length
  const flowWords = [diag, teach, practice, feedback].reduce((s, x) => s + countWords(x), 0)
  const d4 = Math.min(10, Math.max(1,
    flowSections >= 4 && flowWords > 200 ? 10 :
    flowSections >= 3 && flowWords > 120 ? 8 :
    flowSections >= 2 && flowWords > 60 ? 6 :
    flowSections >= 1 ? 4 : 1
  ))

  // Dimension 5: Practice Quality (1-10)
  const practiceHasScenario = (practice || '').includes('场景') || (practice || '').includes('场景')
  const practiceWords = countWords(practice)
  const d5 = Math.min(10, Math.max(1,
    practiceHasScenario && practiceWords > 100 ? 10 :
    practiceHasScenario && practiceWords > 50 ? 8 :
    practiceWords > 30 ? 6 :
    practiceWords > 10 ? 4 : 1
  ))

  // Dimension 6: Assessment System (1-10)
  const feedbackWords = countWords(feedback)
  const hasTable = (feedback || '').includes('|')
  const d6 = Math.min(10, Math.max(1,
    hasTable && feedbackWords > 80 && hasAssessment ? 10 :
    hasTable && feedbackWords > 40 ? 8 :
    hasAssessment && feedbackWords > 20 ? 6 :
    hasAssessment ? 4 : 1
  ))

  // Dimension 7: Engagement Design (1-10)
  const hasInteraction = hasA1 || hasA2 || body.includes('互动') || body.includes('练习')
  const hasCodeBlock = (body.match(/```/g) || []).length >= 2
  const d7 = Math.min(10, Math.max(1,
    hasInteraction && hasCodeBlock ? 10 :
    hasInteraction ? 8 :
    hasCodeBlock ? 6 :
    body.includes('?') || body.includes('？') ? 4 : 2
  ))

  // Dimension 8: Knowledge Integration (1-10)
  const hasCompare = body.includes('对比') || body.includes('区别') || body.includes('比较')
  const hasReference = body.includes('参考') || body.includes('参见') || body.includes('延伸')
  const hasWhere = where && countWords(where) > 20
  const d8 = Math.min(10, Math.max(1,
    hasCompare && hasWhere ? 10 :
    (hasReference || hasCompare) ? 7 :
    hasWhere ? 5 :
    triggers.length > 2 ? 4 : 2
  ))

  const dimensions = [
    { name: '触发覆盖', short: 'TRG', score: d1, desc: '触发词覆盖面', max: 10 },
    { name: '步骤清晰度', short: 'STP', score: d2, desc: 'How步骤可操作性', max: 10 },
    { name: '解释深度', short: 'EXP', score: d3, desc: 'What/Why透彻度', max: 10 },
    { name: '教练流程', short: 'COA', score: d4, desc: '诊断→教学→演练→反馈', max: 10 },
    { name: '练习质量', short: 'PRC', score: d5, desc: '场景丰富度与真实性', max: 10 },
    { name: '评估体系', short: 'ASM', score: d6, desc: '评价标准明确性', max: 10 },
    { name: '互动设计', short: 'ENG', score: d7, desc: '用户参与度', max: 10 },
    { name: '知识整合', short: 'INT', score: d8, desc: '知识体系连接', max: 10 },
  ]

  const total = dimensions.reduce((s, d) => s + d.score, 0)
  const average = Number((total / dimensions.length).toFixed(1))

  // Identify weak dimensions (score <= 5)
  const weakPoints = dimensions.filter(d => d.score <= 5).map(d => d.name)

  // Generate recommendations
  const recommendations = []
  if (d1 <= 5) recommendations.push('增加触发词：从步骤关键词、相关场景、用户痛点中提取更多触发词')
  if (d2 <= 5) recommendations.push('细化步骤：确保每一步都有明确的操作描述，增加具体示例')
  if (d3 <= 5) recommendations.push('深化解释：补充 What 的定义和 Why 的价值对比，用数据或案例支撑')
  if (d4 <= 5) recommendations.push('完善教练流程：补充缺失的诊断/教学/演练/反馈环节')
  if (d5 <= 5) recommendations.push('丰富练习场景：增加 3 个以上贴近实际的场景模拟')
  if (d6 <= 5) recommendations.push('建立评估体系：增加评分量表和毕业标准')
  if (d7 <= 5) recommendations.push('增加互动：添加 A1 激活经验、A2 催化应用、练习题库')
  if (d8 <= 5) recommendations.push('强化知识连接：增加对比表格、延伸阅读、Where适用场景')

  return { name, dimensions, total, average, weakPoints, recommendations }
}

// ─── Improvement Generator ───

function generateImprovements(fm, body, score) {
  if (score.weakPoints.length === 0) return null

  let improvements = ''
  const name = fm.name || ''

  if (score.weakPoints.includes('触发覆盖')) {
    const existing = Array.isArray(fm.trigger) ? fm.trigger : (fm.trigger ? [fm.trigger] : [])
    const newTriggers = [
      `${name}练习`,
      `${name}方法`,
      `${name}步骤`,
      `${name}技巧`
    ]
    const all = [...new Set([...existing, ...newTriggers])]
    improvements += `\n### 触发词扩展\n\n建议增加: ${newTriggers.join('、')}\n当前: ${existing.join(', ')}\n→ 完整: ${all.join(', ')}\n`
  }

  if (score.weakPoints.includes('步骤清晰度')) {
    const how = extractSection(body, 'How')
    if (how && !how.match(/^\d+[.．、]/m)) {
      improvements += `\n### 步骤结构化\n\n当前 How 段落缺少编号步骤。建议将内容拆分为 3-5 个可操作步骤，每步用 "1. " 开头，包含具体动作描述。\n`
    }
  }

  if (score.weakPoints.includes('解释深度')) {
    const what = extractSection(body, 'What')
    if (!what || countWords(what) < 30) {
      improvements += `\n### What 补充\n\n建议补充：【What】这段内容讲的是什么？核心定义 + 关键概念 + 典型示例\n`
    }
    const why = extractSection(body, 'Why')
    if (!why || countWords(why) < 30) {
      improvements += `\n### Why 补充\n\n建议补充：【Why】为什么这个技能重要？用对比方式 (不用 vs 用的结果差异)\n`
    }
  }

  if (score.weakPoints.includes('练习质量')) {
    improvements += `\n### 练习场景模板\n\n\`\`\`\n场景 A：<职场场景>\n对话/情境描述...\n\n场景 B：<生活场景>\n对话/情境描述...\n\n场景 C：<进阶场景>\n对话/情境描述...\n\`\`\`\n`
  }

  if (score.weakPoints.includes('评估体系')) {
    improvements += `\n### 评估量表模板\n\n| 维度 | 1分 | 3分 | 5分 |\n|------|-----|-----|-----|\n| 理解准确度 | 有误解 | 基本正确 | 精准把握 |\n| 应用能力 | 无法应用 | 部分可用 | 灵活运用 |\n`
  }

  if (score.weakPoints.includes('互动设计')) {
    improvements += `\n### A1 激活经验 模板\n\n引导用户回忆：\n\`\`\`\n「你在过去遇到过类似情况吗？当时是怎么处理的？」\n\`\`\`\n\n### A2 催化应用 模板\n\n\`\`\`\n本周内，你计划在哪个具体场景中应用这个方法？写下你的行动计划：\n1. 场景：______\n2. 时间：______\n3. 具体做法：______\n\`\`\`\n`
  }

  return improvements || null
}

// ─── HTML Report Generator ───

function generateReport(allScores) {
  const sorted = [...allScores].sort((a, b) => a.total - b.total)
  const avgScore = (allScores.reduce((s, x) => s + x.total, 0) / allScores.length / 8).toFixed(1)

  const rows = sorted.map(s => `
    <div class="skill-card ${s.total < 32 ? 'low' : s.total < 48 ? 'mid' : 'high'}">
      <div class="skill-header">
        <div class="skill-name">${s.name}</div>
        <div class="skill-score">${s.average}</div>
      </div>
      <div class="bar-container">
        ${s.dimensions.map(d => `
        <div class="bar-row">
          <span class="bar-label">${d.short}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${d.score * 10}%;background:${d.score <= 5 ? '#ef4444' : d.score <= 7 ? '#f59e0b' : '#22d55e'}"></div>
          </div>
          <span class="bar-score">${d.score}</span>
        </div>`).join('\n        ')}
      </div>
      ${s.weakPoints.length > 0 ? `<div class="weak">弱项：${s.weakPoints.join('、')}</div>` : ''}
      ${s.recommendations.length > 0 ? `<div class="rec">建议：${s.recommendations.slice(0, 3).join('；')}</div>` : ''}
    </div>`).join('\n')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>达尔文进化 · 评分报告</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Noto Sans SC','PingFang SC',system-ui,sans-serif;background:#0a0a1a;color:#e2e8f0;padding:40px 20px;display:flex;justify-content:center}
  .report{max-width:900px;width:100%}
  h1{font-size:36px;font-weight:900;background:linear-gradient(135deg,#a855f7,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px;text-align:center}
  .sub{text-align:center;color:#64748b;font-size:14px;margin-bottom:40px}
  .summary{display:flex;gap:20px;margin-bottom:32px;flex-wrap:wrap;justify-content:center}
  .stat{text-align:center;padding:20px 32px;background:#ffffff08;border-radius:16px;border:1px solid #ffffff10;min-width:140px}
  .stat-num{font-size:32px;font-weight:900;background:linear-gradient(135deg,#a855f7,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .stat-label{font-size:12px;color:#64748b;margin-top:4px}

  .skill-card{padding:20px 24px;background:#ffffff08;border-radius:16px;border:1px solid #ffffff10;margin-bottom:16px}
  .skill-card.low{border-color:#ef444420}
  .skill-card.mid{border-color:#f59e0b20}
  .skill-card.high{border-color:#22d55e20}
  .skill-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
  .skill-name{font-size:16px;font-weight:700;color:#f1f5f9}
  .skill-score{font-size:24px;font-weight:900;color:#94a3b8}
  .skill-card.low .skill-score{color:#ef4444}
  .skill-card.mid .skill-score{color:#f59e0b}
  .skill-card.high .skill-score{color:#22d55e}

  .bar-container{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
  .bar-row{display:flex;align-items:center;gap:10px}
  .bar-label{font-size:11px;color:#64748b;width:32px;text-align:right;flex-shrink:0}
  .bar-track{flex:1;height:6px;background:#ffffff10;border-radius:3px;overflow:hidden}
  .bar-fill{height:100%;border-radius:3px;transition:width .3s}
  .bar-score{font-size:11px;color:#64748b;width:20px;text-align:right;flex-shrink:0}

  .weak{font-size:12px;color:#ef4444;margin-bottom:4px}
  .rec{font-size:11px;color:#94a3b8;line-height:1.5}
  .footer{text-align:center;margin-top:40px;font-size:11px;color:#475569;border-top:1px solid #ffffff08;padding-top:16px}
</style>
</head>
<body>
<div class="report">
  <h1>达尔文进化</h1>
  <p class="sub">SKILL.md 8维度评分报告 · ${new Date().toISOString().slice(0, 10)}</p>

  <div class="summary">
    <div class="stat"><div class="stat-num">${allScores.length}</div><div class="stat-label">技能总数</div></div>
    <div class="stat"><div class="stat-num">${avgScore}</div><div class="stat-label">平均分/10</div></div>
    <div class="stat"><div class="stat-num">${sorted.filter(s => s.total < 32).length}</div><div class="stat-label">需改进</div></div>
    <div class="stat"><div class="stat-num">${sorted.filter(s => s.total >= 48).length}</div><div class="stat-label">优秀</div></div>
  </div>

  ${rows}

  <div class="footer">达尔文进化 · 评分 + 爬山优化 · AI 拆书工坊</div>
</div>
</body>
</html>`
}

// ─── Main ───

function main() {
  const files = readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'))
  const allScores = []
  let improved = 0

  for (const file of files) {
    try {
      const raw = readFileSync(resolve(SKILLS_DIR, file), 'utf-8')
      const { frontmatter, body } = parseFrontmatter(raw)
      if (!frontmatter.name) continue

      const score = scoreSkill(frontmatter, body)
      allScores.push(score)

      // Generate improvements for weak skills
      const improvements = generateImprovements(frontmatter, body, score)
      if (improvements) {
        improved++
        console.log(`🔧 ${frontmatter.name} (${score.average}) ← ${score.weakPoints.join(', ')}`)
        // Append improvement suggestions to the SKILL.md
        const improvedContent = raw + `\n\n<!-- 达尔文进化 · ${new Date().toISOString().slice(0, 10)} -->\n${improvements}\n`
        writeFileSync(resolve(SKILLS_DIR, file), improvedContent, 'utf-8')
      } else {
        console.log(`✓ ${frontmatter.name} (${score.average})`)
      }
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`)
    }
  }

  // Generate report
  const report = generateReport(allScores)
  writeFileSync(resolve(ROOT, 'public/darwin-report.html'), report, 'utf-8')

  // Console summary
  console.log(`\n═══════════════════════════════════════════`)
  console.log(`  达尔文进化 · 评分报告`)
  console.log(`═══════════════════════════════════════════`)
  console.log(`  技能总数: ${allScores.length}`)
  console.log(`  平均分:   ${(allScores.reduce((s, x) => s + x.average, 0) / allScores.length).toFixed(1)}`)
  console.log(`  已改进:   ${improved} 个`)
  console.log(`  优秀(≥6): ${allScores.filter(s => s.average >= 6).length} 个`)
  console.log(`  待优化(<5): ${allScores.filter(s => s.average < 5).length} 个`)
  console.log(`  报告:     public/darwin-report.html`)

  // Per-dimension average
  const dims = ['触发覆盖', '步骤清晰度', '解释深度', '教练流程', '练习质量', '评估体系', '互动设计', '知识整合']
  console.log(`\n  维度平均分:`)
  for (let i = 0; i < dims.length; i++) {
    const avg = (allScores.reduce((s, x) => s + x.dimensions[i].score, 0) / allScores.length).toFixed(1)
    const bar = '█'.repeat(Math.round(Number(avg))) + '░'.repeat(10 - Math.round(Number(avg)))
    console.log(`  ${dims[i].padStart(6)}: ${avg}/10 ${bar}`)
  }
}

main()
