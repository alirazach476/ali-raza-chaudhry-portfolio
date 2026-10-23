import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AvailabilityBadge } from './AvailabilityBadge'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useActiveSection } from '../hooks/useActiveSection'

const LINKS = [
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Certificates', href: '#certificates', id: 'certificates' },
  { label: 'Expertise', href: '#expertise', id: 'expertise' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    if (isHome) {
      scrollTo(href)
    } else {
      window.location.href = `/${href}`
    }
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`nav-shell mx-4 md:mx-8 rounded-2xl ${
          scrolled ? 'nav-shell--scrolled' : 'bg-transparent border border-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 md:px-8 py-3" aria-label="Main navigation">
          <Link
            to="/"
            className="font-display text-sm tracking-wider gradient-text focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded"
            data-cursor-hover
          >
            ARC
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {LINKS.map((link) => {
              const isActive = isHome && activeSection === link.id
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-3.5 py-2 text-[13px] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded-lg ${
                    isActive
                      ? 'nav-link-active'
                      : 'text-text-muted hover:text-text hover:bg-white/[0.03]'
                  }`}
                  data-cursor-hover
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AvailabilityBadge className="hidden lg:inline-flex" />
          </div>

          <button
            className="md:hidden p-2 text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-panel md:hidden mx-4 mt-2 glass rounded-2xl p-3.5">
          <div className="mb-3 flex items-center justify-center">
            <AvailabilityBadge className="w-full justify-center" />
          </div>
          <div className="flex flex-col gap-0.5">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                  isHome && activeSection === link.id
                    ? 'text-cyan bg-white/[0.04]'
                    : 'text-text-muted hover:text-text hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
