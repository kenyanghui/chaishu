import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { nextOpen } from '../data/workshops'

const navLinks = [
  { path: '/learning-path', label: '成长路径' },
  { path: '/hot', label: '经典拆页' },
  { path: '/chailive/', label: '拆学习', external: true },
  { path: '/workshops', label: '拆软件' },
  { path: '/skills', label: '拆技能' },
  { path: '/skill-fusion', label: '拆专家' },
  { path: '/hd-gallery', label: '共拆AI' },
  { path: '/about', label: '关于' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const nx = nextOpen()

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
          <span className="text-[19px] font-bold tracking-tight text-[#1d1d1f]">小蛮腰·拆AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => link.external ? (
            <a
              key={link.path}
              href={link.path}
              className="px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[.04]"
            >
              {link.label}
            </a>
          ) : (
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
            href={nx ? nx.link : '/workshops'}
            className="ml-2 px-4 py-1.5 rounded-full text-[13.5px] font-semibold bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors shadow-[0_4px_14px_rgba(0,113,227,.3)]"
          >
            {nx ? '报名工作坊' : '课程回看'}
          </a>
        </div>

        <a href={nx ? nx.link : '/workshops'} className="md:hidden px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#0071e3] text-white">{nx ? '报名' : '回看'}</a>
      </div>
    </nav>
  )
}
