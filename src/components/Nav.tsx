import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ResumeButton } from './ResumeButton'
import { AvailabilityBadge } from './AvailabilityBadge'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useActiveSection } from '../hooks/useActiveSection'

const LINKS = [
  { label: 'About', href: '#about', id: 'about', accent: 'violet' },
  { label: 'Experience', href: '#experience', id: 'experience', accent: 'cyan' },
  { label: 'Work', href: '#projects', id: 'projects', accent: 'pink' },
  { label: 'Expertise', href: '#expertise', id: 'expertise', accent: 'amber' },
  { label: 'Services', href: '#services', id: 'services', accent: 'indigo' },
  { label: 'Stack', href: '#stack', id: 'stack', accent: 'cyan' },
  { label: 'Contact', href: '#contact', id: 'contact', accent: 'pink' },
] as const

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
      className={`nav-header fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'nav-header--scrolled py-3' : 'py-4 md:py-5'
      }`}
    >
      <div
        className={`nav-shell mx-4 md:mx-8 transition-all duration-500 ${
          scrolled ? 'nav-shell--scrolled' : 'nav-shell--hero'
        }`}
      >
        <nav className="nav-inner flex items-center justify-between px-4 md:px-7 py-2.5" aria-label="Main navigation">
          <Link
            to="/"
            className="nav-logo focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded-xl"
            data-cursor-hover
          >
            <span className="nav-logo-mark font-display">AY</span>
          </Link>

          <div className="nav-links hidden lg:flex items-center gap-0.5 px-1.5 py-1">
            {LINKS.map((link) => {
              const isActive = isHome && activeSection === link.id
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  data-accent={link.accent}
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                  data-cursor-hover
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="nav-link-bg" aria-hidden="true" />
                  <span className="nav-link-text">{link.label}</span>
                  {isActive && <span className="nav-link-indicator" aria-hidden="true" />}
                </button>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AvailabilityBadge className="hidden lg:inline-flex" />
            <ResumeButton
              variant="primary"
              className="nav-resume-btn !px-5 !py-2.5 !text-xs !font-semibold"
              label="Resume"
            />
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
        <div className="nav-mobile-panel md:hidden mx-4 mt-2 p-4">
            <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <AvailabilityBadge className="w-full sm:w-auto justify-center" />
              <ResumeButton
                variant="primary"
                className="nav-resume-btn w-full sm:w-auto !justify-center !px-5 !py-3 !text-xs"
                label="Download Resume ↗"
              />
            </div>
            <div className="nav-mobile-links">
              {LINKS.map((link) => {
                const isActive = isHome && activeSection === link.id
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    data-accent={link.accent}
                    className={`nav-mobile-link ${isActive ? 'nav-mobile-link--active' : ''}`}
                  >
                    <span className="nav-mobile-link-dot" aria-hidden="true" />
                    <span className="nav-mobile-link-text">{link.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
    </header>
  )
}
