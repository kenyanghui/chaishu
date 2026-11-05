import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { nextOpen } from '../data/workshops'

const navLinks = [
  { path: '/learning-path', label: '拆成长' },
  { path: '/hot', label: '拆经典' },
  { path: '/chailive/', label: '拆指南', external: true },
  { path: '/chaibuddy', label: '拆搭子' },
  { path: '/workshops', label: '拆软件' },
  { path: '/skills', label: '拆技能' },
  { path: '/skill-fusion', label: '拆专家' },
  { path: '/coai', label: '共拆AI' },
  { path: '/about', label: '关于' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const nx = nextOpen()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[.06]' : 'bg-white/60 backdrop-blur-md'
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

        <div className="flex items-center gap-1.5 md:hidden">
          <a href={nx ? nx.link : '/workshops'} className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#0071e3] text-white">{nx ? '报名' : '回看'}</a>
          <button
            type="button"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="p-2.5 -mr-1.5 rounded-full text-[#1d1d1f] hover:bg-black/[.05] active:bg-black/[.08] transition-colors"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/[.06] shadow-[0_12px_32px_rgba(0,0,0,.08)]">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map(link => link.external ? (
              <a
                key={link.path}
                href={link.path}
                className="py-3 text-[15px] font-medium text-[#6e6e73] border-b border-black/[.04] last:border-0 active:text-[#1d1d1f]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-[15px] border-b border-black/[.04] last:border-0 ${
                  location.pathname === link.path
                    ? 'text-[#1d1d1f] font-semibold'
                    : 'text-[#6e6e73] font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
