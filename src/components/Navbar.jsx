import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navLinks = [
  { path: '/workshops', label: '拆书帮小蛮腰AI拆书课 玄龙拆AI工作坊' },
  { path: '/learning-path', label: '成长路径' },
  { path: '/hot', label: '经典拆页' },
  { path: '/skills', label: '技能萃取' },
  { path: '/hd-gallery', label: '拆书赏鉴' },
  { path: '/about', label: '关于' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[.06]' : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[19px] font-bold tracking-tight text-[#1d1d1f]">玄龙·拆AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-black/[.05] text-[#1d1d1f]'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/workshop/"
            className="ml-2 px-4 py-1.5 rounded-full text-[13.5px] font-semibold bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors shadow-[0_4px_14px_rgba(0,113,227,.3)]"
          >
            报名工作坊
          </a>
        </div>

        <a href="/workshop/" className="md:hidden px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#0071e3] text-white">报名</a>
      </div>
    </nav>
  )
}
