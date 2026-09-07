import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { HeroPhoto } from '../components/HeroPhoto'
import { MagneticButton } from '../components/MagneticButton'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { SOCIALS as SOCIAL_URLS, PROFILE } from '../data/content'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene }))
)

function HeroScenePlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(124,58,237,0.22) 0%, rgba(34,211,238,0.08) 45%, transparent 72%)',
      }}
      aria-hidden="true"
    />
  )
}

function shouldLoadHeroScene() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

const ROLE_PILLS = [
  {
    label: 'Full-Stack Developer',
    gradient: 'from-cyan/25 to-blue-500/10',
    border: 'border-cyan/40',
    text: 'text-cyan',
    glow: 'rgba(34, 211, 238, 0.2)',
  },
  {
    label: 'AI Engineer',
    gradient: 'from-pink/25 to-fuchsia/500/10',
    border: 'border-pink/40',
    text: 'text-pink-300',
    glow: 'rgba(244, 114, 182, 0.2)',
  },
  {
    label: 'Problem Solver',
    gradient: 'from-violet/25 to-indigo/500/10',
    border: 'border-violet/40',
    text: 'text-violet-300',
    glow: 'rgba(124, 58, 237, 0.2)',
  },
] as const

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: SOCIAL_URLS.linkedin,
    accent: 'linkedin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: SOCIAL_URLS.github,
    accent: 'github',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: SOCIAL_URLS.whatsapp,
    accent: 'whatsapp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

const NAME_PARTS = [
  { text: 'Ali Raza', variant: 'gradient' as const },
  { text: 'Chaudhry', variant: 'white' as const },
]

const BIO_SNIPPET =
  'I build computer vision systems, generative AI agents, and full-stack products — from YOLO & OpenCV to LangChain, FastAPI, React & Next.js.'

const FULL_NAME = 'Ali Raza Chaudhry'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [enableScene, setEnableScene] = useState(false)

  useEffect(() => {
    if (reduced || !shouldLoadHeroScene()) return

    let cancelled = false
    const enable = () => {
      if (!cancelled) setEnableScene(true)
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(enable, { timeout: 2500 })
      return () => {
        cancelled = true
        win.cancelIdleCallback?.(id)
      }
    }

    const timer = setTimeout(enable, 500)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(
      pillsRef.current?.children ?? [],
      { opacity: 0, y: 16, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }
    )

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.hero-letter')
      tl.fromTo(
        letters,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.03,
        },
        '-=0.3'
      )
    }

    tl.fromTo(
      contentRef.current?.querySelectorAll('.hero-reveal') ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    ).fromTo(
      bioRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [reduced])

  return (
    <section id="hero" className="hero-immersive" aria-label="Hero">
      {/* Full-screen 3D background */}
      <div className="hero-scene-layer" aria-hidden="true">
        {enableScene ? (
          <Suspense fallback={<HeroScenePlaceholder />}>
            <HeroScene mouse={mouse} />
          </Suspense>
        ) : (
          <HeroScenePlaceholder />
        )}
      </div>

      {/* Full-hero portrait */}
      <HeroPhoto immersive />

      <div className="hero-top-scrim" aria-hidden="true" />

      <div className="hero-immersive-vignette" aria-hidden="true" />
      <div className="hero-immersive-fade-bottom" aria-hidden="true" />

      <div ref={contentRef} className="hero-overlay">
        <div className="hero-overlay-inner">
          <div className="hero-overlay-left">
            <h1 ref={nameRef} className="hero-full-name hero-name-split" aria-label={FULL_NAME}>
              {NAME_PARTS.map((part) => (
                <span
                  key={part.text}
                  className={part.variant === 'gradient' ? 'first' : 'last'}
                >
                  {part.text.split('').map((char, i) => (
                    <span
                      key={`${part.text}-${i}`}
                      className={`hero-letter inline-block ${
                        part.variant === 'gradient' ? 'hero-letter-gradient' : 'hero-letter-white'
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div ref={pillsRef} className="hero-role-pills">
              {ROLE_PILLS.map((role) => (
                <span
                  key={role.label}
                  className={`hero-role-pill bg-gradient-to-br ${role.gradient} ${role.border}`}
                  style={{ '--role-glow': role.glow } as React.CSSProperties}
                >
                  <span className={`hero-role-pill-dot ${role.text}`} />
                  <span className={role.text}>{role.label}</span>
                </span>
              ))}
            </div>

            <div className="hero-stats hero-reveal">
              {PROFILE.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-pill">
                  <span className="hero-stat-value">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <nav className="hero-social-rail hero-reveal" aria-label="Social links">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hero-social-pill hero-social-pill--${link.accent}`}
                  data-cursor-hover
                >
                  <span className="hero-social-pill-icon">{link.icon}</span>
                  <span className="hero-social-pill-label">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="hero-overlay-right">
            <p className="hero-tagline-italic hero-reveal">
              Interfaces that convert.
              <br />
              <span className="hero-tagline-accent">AI that sees.</span>
            </p>

            <div className="hero-cta-row hero-reveal">
              <MagneticButton onClick={() => scrollTo('#projects')}>
                View Work
              </MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollTo('#contact')}>
                Contact
              </MagneticButton>
            </div>
          </div>

        <p ref={bioRef} className="hero-bio-bar hero-bio-bar--immersive hero-bio-in-grid">
          {BIO_SNIPPET}
        </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#about')}
        className="hero-scroll-cue"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </button>
    </section>
  )
}
