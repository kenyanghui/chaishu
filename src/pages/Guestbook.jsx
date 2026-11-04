import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Guestbook() {
  const ref = useRef(null)

  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://giscus.app/client.js'
    s.async = true
    s.crossOrigin = 'anonymous'
    s.setAttribute('data-repo', 'kenyanghui/chaishu')
    s.setAttribute('data-repo-id', 'R_kgDOSj2K0g')
    s.setAttribute('data-category', 'General')
    s.setAttribute('data-category-id', 'DIC_kwDOSj2K0s4DKVmK')
    s.setAttribute('data-mapping', 'specific')
    s.setAttribute('data-term', '留言板 Guestbook')
    s.setAttribute('data-strict', '1')
    s.setAttribute('data-reactions-enabled', '1')
    s.setAttribute('data-emit-metadata', '0')
    s.setAttribute('data-input-position', 'top')
    s.setAttribute('data-theme', 'transparent_dark')
    s.setAttribute('data-lang', 'zh-CN')
    ref.current.appendChild(s)
  }, [])

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-3xl">💬</div>
            <h1 className="text-3xl font-black text-[#1d1d1f] mb-2">留言板</h1>
            <p className="text-sm text-[#86868b]">
              有话想说？在这里给杨教练和站友们留言——建议、疑问、感想都欢迎。
            </p>
            <p className="text-xs text-[#86868b] mt-2">
              留言需登录 GitHub 账号（免费注册），内容托管在本站开源仓库 Discussions。
            </p>
          </div>
          <div ref={ref} className="giscus" />
        </motion.div>
      </div>
    </div>
  )
}
