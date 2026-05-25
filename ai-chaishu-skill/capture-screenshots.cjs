/**
 * 截图脚本 v2 — 直接用 puppeteer 指定 chromium 路径
 * 用法: node capture-screenshots.js
 */

const BASE_URL = 'http://localhost:5173/chaishu' // fallback — check actual port with `npx vite --host`
const OUT_DIR = __dirname + '/screenshots'
const CHROME_PATH = 'C:/Users/yangh/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe'

const pages = [
  // 横屏 1440x900 视口截图，适合论坛展示
  { path: '/',              name: '01-home',          fullPage: false },
  { path: '/skills',        name: '02-skills',        fullPage: false },
  { path: '/skills?level=1',name: '03-skills-tf1',    fullPage: false },
  { path: '/learning-path', name: '04-learning-path', fullPage: false },
  { path: '/hd-gallery',    name: '05-hd-gallery',    fullPage: false },
  { path: '/skill-fusion',  name: '06-skill-fusion',  fullPage: false },
  { path: '/hot',           name: '07-hot-books',     fullPage: false },
]

const fs = require('fs')
const puppeteer = require('puppeteer')

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox']
  })

  for (const p of pages) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    try {
      const url = BASE_URL + p.path
      process.stdout.write(`Capturing ${url} ... `)
      await page.goto(url, { waitUntil: 'load', timeout: 30000 })
      await new Promise(r => setTimeout(r, 1500))

      const outPath = `${OUT_DIR}/${p.name}.png`
      await page.screenshot({ path: outPath, fullPage: p.fullPage })
      const size = fs.statSync(outPath).size
      process.stdout.write(`${(size/1024).toFixed(0)}KB ✓\n`)
    } catch (err) {
      process.stdout.write(`✗ ${err.message.slice(0,80)}\n`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log('\n全部截图完成！')
}

run().catch(err => { console.error(err); process.exit(1) })
