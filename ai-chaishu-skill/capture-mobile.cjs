const puppeteer = require('puppeteer');
const CHROME_PATH = 'C:/Users/yangh/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe';
const BASE = 'http://localhost:5177/chaishu';
const OUT_DIR = __dirname + '/screenshots';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-gpu']
  });

  // Mobile home
  const p1 = await browser.newPage();
  await p1.setViewport({ width: 390, height: 844 });
  await p1.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await p1.screenshot({ path: OUT_DIR + '/08-mobile-home.png', fullPage: true });
  console.log('mobile home done');

  // Mobile skills
  const p2 = await browser.newPage();
  await p2.setViewport({ width: 390, height: 844 });
  await p2.goto(BASE + '/skills', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await p2.screenshot({ path: OUT_DIR + '/09-mobile-skills.png', fullPage: true });
  console.log('mobile skills done');

  await browser.close();
  console.log('all done');
})();
