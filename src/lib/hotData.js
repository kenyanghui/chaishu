/** fetchJSON — 透明解压 .gz JSON（DecompressionStream，现代浏览器原生） */
export default async function fetchJSON(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  if (path.endsWith('.gz')) {
    if (typeof DecompressionStream === 'undefined') throw new Error('gzip unsupported')
    const stream = res.body.pipeThrough(new DecompressionStream('gzip'))
    return new Response(stream).json()
  }
  return res.json()
}

/** 玄龙（站长）双名判定：站方账号名 杨辉，品牌名 玄龙 */
export function isShifu(user) {
  return user === '玄龙' || user === '杨辉'
}
