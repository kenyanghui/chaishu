/**
 * 高清大图管线 — 技能信息图/思维导图自动生成
 *
 * 读取 .claude/skills/*.md → 生成自包含 HTML 高清信息图
 * 输出到 public/images/skills/*.html
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILLS_DIR = resolve(ROOT, '.claude/skills')
const OUT_DIR = resolve(ROOT, 'public/images/skills')

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return { frontmatter: {}, body: raw }
  const fm = {}
  const lines = match[1].split('\n')
  let currentKey = null
  for (const line of lines) {
    const kv = line.match(/^(\w+):\s*(.*)/)
    if (kv) {
      currentKey = kv[1]
      fm[currentKey] = kv[2].replace(/^['"]|['"]$/g, '')
    } else if (currentKey && line.match(/^\s+-/)) {
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

function extractSteps(body) {
  const how = extractSection(body, 'How')
  if (!how) return []

  // Check code block first
  const cb = how.match(/```[\s\S]*?```/g)
  if (cb) {
    for (const block of cb) {
      const items = block.split('\n').map(l => l.trim()).filter(l => l.match(/^(\d+[.．、]|第)/) && l.length > 3)
      if (items.length > 0) return items.map(l => l.replace(/^\d+[.．、]\s*/, '').trim())
    }
  }

  const lines = how.split('\n').map(l => l.trim()).filter(l => l.match(/^\d+[.．\)、]/) && l.length > 3)
  return lines.map(l => l.replace(/^\d+[.．\)、]\s*/, '').trim())
}

function extractCoachingFlow(body) {
  const names = ['诊断', '教学', '演练', '反馈']
  const steps = []
  for (let i = 0; i < 4; i++) {
    const p = new RegExp(`### 第[${'一二三四'[i]}]步：${names[i]}\\s*([\\s\\S]*?)(?=\\n### |\\n---|\\n## |$)`)
    const m = body.match(p)
    if (m) {
      const lines = m[1].split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('```'))
      steps.push({ name: names[i], detail: lines.slice(0, 2).join(' · ').slice(0, 120) })
    }
  }
  return steps
}

const COLORS = {
  tf1: { accent: '#818cf8', name: 'indigo' },
  tf2: { accent: '#22d3ee', name: 'cyan' },
  tf3: { accent: '#fbbf24', name: 'amber' },
}

function pickColor(level) {
  const key = Object.keys(COLORS).find(k => level.startsWith(k))
  return COLORS[key] || COLORS.tf2
}

function slugFromName(name) {
  return name.replace(/[^\w一-鿿]/g, '').toLowerCase().slice(0, 30)
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateInfographic(fm, body, filePath) {
  const level = basename(filePath).split('-')[0]
  const color = pickColor(level)
  const a = color.accent

  const what = extractSection(body, 'What')
  const why = extractSection(body, 'Why')
  const howSteps = extractSteps(body)
  const where = extractSection(body, 'Where')
  const flow = extractCoachingFlow(body)
  const name = escapeHtml(fm.name || '技能')
  const desc = escapeHtml((fm.description || '').slice(0, 150))
  const triggers = Array.isArray(fm.trigger) ? fm.trigger.slice(0, 8) : (fm.trigger ? [fm.trigger] : [])

  const buildStepCard = (s, i) =>
    `<div class="step-card">
      <div class="step-num" style="background:${a}">${i + 1}</div>
      <div class="step-text">${escapeHtml(s)}</div>
    </div>`

  const buildFlowStep = (s, i) =>
    `<div class="flow-step">
      ${i < flow.length - 1 ? `<div class="flow-arrow">→</div>` : ''}
      <div class="flow-dot" style="background:${a}">${s.name[0]}</div>
      <div class="flow-title" style="color:${a}">${s.name}</div>
      <div class="flow-detail">${escapeHtml(s.detail)}</div>
    </div>`

  const infoCard = (label, title, body_, accent) => body_ ? `
    <div class="info-card" style="background:linear-gradient(135deg,${accent}10,#1e1b4b15);border-color:${accent}20">
      <div class="info-bar" style="background:linear-gradient(90deg,${accent},${accent}00)"></div>
      <div class="info-label" style="color:${accent}">${label}</div>
      <div class="info-title">${title}</div>
      <div class="info-body">${escapeHtml(body_.slice(0, 200))}${body_.length > 200 ? '…' : ''}</div>
    </div>` : ''

  const stepsHtml = howSteps.map(buildStepCard).join('\n')
  const flowHtml = flow.map(buildFlowStep).join('\n')
  const triggerHtml = triggers.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('\n')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} · 高清大图</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:'Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;
    background:linear-gradient(135deg,#0a0a1a 0%,#1a0a2e 50%,#0a1628 100%);
    min-height:100vh;color:#e2e8f0;display:flex;justify-content:center;padding:40px 20px;
    -webkit-print-color-adjust:exact;print-color-adjust:exact;
  }
  .canvas{max-width:1000px;width:100%}

  .header{text-align:center;padding:48px 40px 36px;border-radius:24px;background:radial-gradient(ellipse at 50% 0%,${a}12 0%,transparent 70%);border:1px solid ${a}18;margin-bottom:28px}
  .badge{display:inline-block;padding:5px 16px;border-radius:20px;background:${a}12;border:1px solid ${a}25;color:${a};font-size:11px;font-weight:700;letter-spacing:2px;margin-bottom:14px}
  h1{font-size:40px;font-weight:900;background:linear-gradient(135deg,${a},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px;line-height:1.3}
  .sub{color:#94a3b8;font-size:14px;margin:0 auto 16px;max-width:600px;line-height:1.6}

  .tags{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:28px}
  .tag{padding:3px 12px;border-radius:10px;background:#ffffff08;border:1px solid #ffffff12;font-size:11px;color:#94a3b8}

  .sec{display:flex;align-items:center;gap:12px;margin:36px 0 16px;font-size:18px;font-weight:700;color:#f1f5f9}
  .sec .ln{flex:1;height:1px;background:linear-gradient(90deg,${a}40,transparent)}

  .steps{display:flex;flex-direction:column;gap:10px}
  .step-card{display:flex;align-items:flex-start;gap:16px;padding:18px 22px;background:#ffffff08;border:1px solid #ffffff10;border-radius:14px;transition:all .2s}
  .step-card:hover{background:#ffffff12;border-color:${a}30;transform:translateX(6px)}
  .step-num{min-width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900;color:#fff;flex-shrink:0}
  .step-text{font-size:14px;line-height:1.7;color:#cbd5e1;padding-top:6px}

  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .info-card{padding:22px;border-radius:14px;border:1px solid #ffffff10;position:relative;overflow:hidden}
  .info-bar{position:absolute;top:0;left:0;right:0;height:3px}
  .info-label{font-size:10px;font-weight:700;letter-spacing:1px;margin-bottom:3px}
  .info-title{font-size:15px;font-weight:700;margin-bottom:6px;color:#f1f5f9}
  .info-body{font-size:12px;line-height:1.7;color:#94a3b8}

  .flow{display:flex;justify-content:space-between;gap:12px;padding:28px 20px;background:#ffffff08;border-radius:16px;border:1px solid #ffffff10}
  .flow-step{flex:1;text-align:center;position:relative}
  .flow-arrow{position:absolute;right:-10px;top:14px;color:${a}50;font-size:18px;font-weight:300}
  .flow-dot{width:36px;height:36px;border-radius:50%;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;color:#fff}
  .flow-title{font-size:13px;font-weight:700;margin-bottom:3px}
  .flow-detail{font-size:10px;color:#64748b;line-height:1.5}

  .footer{text-align:center;margin-top:40px;padding:16px;font-size:11px;color:#475569;border-top:1px solid #ffffff08}

  @media print{body{padding:0;background:#0a0a1a!important}@page{margin:.5cm;size:A4 portrait}.step-card:hover{transform:none}}
  @media(max-width:768px){
    h1{font-size:26px}.grid{grid-template-columns:1fr}
    .flow{flex-direction:column;gap:20px}
    .flow-arrow{display:none}
    .header{padding:32px 20px}
  }
</style>
</head>
<body>
<div class="canvas">

<div class="header">
  <div class="badge">✦ 教练技能</div>
  <h1>${name}</h1>
  <p class="sub">${desc}</p>
</div>

${triggerHtml ? `<div class="tags">${triggerHtml}</div>` : ''}

${(what || why || where) ? `
<div class="sec"><span>核心方法论</span><span class="ln"></span></div>
<div class="grid">
  ${infoCard('WHAT', '这是什么', what, '#a855f7')}
  ${infoCard('WHY', '为什么重要', why, '#22d3ee')}
  ${infoCard('WHERE', '适用场景', where, '#34d399')}
</div>` : ''}

${stepsHtml ? `
<div class="sec"><span>操作步骤</span><span class="ln"></span></div>
<div class="steps">${stepsHtml}</div>` : ''}

${flowHtml ? `
<div class="sec"><span>教练流程</span><span class="ln"></span></div>
<div class="flow">${flowHtml}</div>` : ''}

<div class="footer">
  AI 拆书工坊 · 高清大图 · ${new Date().toISOString().slice(0, 10)}
</div>

</div>
</body>
</html>`
}

function main() {
  const files = readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'))
  let ok = 0, err = 0
  for (const file of files) {
    try {
      const raw = readFileSync(resolve(SKILLS_DIR, file), 'utf-8')
      const { frontmatter, body } = parseFrontmatter(raw)
      if (!frontmatter.name) continue
      const html = generateInfographic(frontmatter, body, resolve(SKILLS_DIR, file))
      writeFileSync(resolve(OUT_DIR, `${slugFromName(frontmatter.name)}.html`), html, 'utf-8')
      ok++
      console.log(`✓ ${frontmatter.name}`)
    } catch (e) {
      err++
      console.error(`✗ ${file}: ${e.message}`)
    }
  }
  console.log(`\n✅ 高清大图: ${ok} 个, 错误 ${err} 个`)
}

main()
