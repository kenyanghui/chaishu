import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我' },
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
      scrolled ? 'bg-dark-bg/90 backdrop-blur-lg border-b border-dark-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black gradient-text">玥清·AI拆书</span>
          <span className="text-xs text-slate-500 group-hover:text-neon-purple transition-colors">alpha</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-neon-purple/10 text-neon-purple'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
