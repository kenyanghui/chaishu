const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'hotBooks.js'), 'utf8');
const start = content.indexOf('[');
const end = content.lastIndexOf(']');
const jsonStr = content.substring(start, end + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error('Parse failed:', e.message);
  process.exit(1);
}

console.log('Total books:', data.length);
let totalMem = 0;

data.forEach(b => {
  const mCount = (b.memoirs || []).length;
  totalMem += mCount;
  const users = [...new Set((b.memoirs || []).map(m => m.user || 'unknown'))];
  const levels = [...new Set((b.memoirs || []).map(m => m.level).filter(Boolean))];
  console.log(`${b.title}|作者:${b.author}|场次:${mCount}|等级:${levels.join(',')}|拆书家:${users.join(',')}`);
});

console.log('\n---');
console.log('Total memoirs:', totalMem);
