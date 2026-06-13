import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { TESTIMONIALS, TRUSTED_LOGOS } from '../data/socialProof'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function TestimonialAvatar({
  avatar,
  initials,
  name,
}: {
  avatar?: string
  initials: string
  name: string
}) {
  const [error, setError] = useState(false)

  if (!avatar || error) {
    return (
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-white/15">
        {initials}
      </div>
    )
  }

  return (
    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-white/15 shadow-[0_0_16px_rgba(124,58,237,0.25)]">
      <img
        src={avatar}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setError(true)}
      />
    </div>
  )
}

function TrustedLogoMark({
  logo,
  initials,
  name,
  gradient,
  glow,
}: {
  logo?: string
  initials: string
  name: string
  gradient: string
  glow: string
}) {
  const [error, setError] = useState(false)

  return (
    <div
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center overflow-hidden p-2.5
        bg-gradient-to-br ${gradient}
        transition-all duration-500 ease-out
        group-hover:scale-105 group-hover:-translate-y-0.5`}
      style={{ boxShadow: `0 6px 24px ${glow}` }}
    >
      {logo && !error ? (
        <div className="w-full h-full rounded-lg bg-white/95 flex items-center justify-center p-1.5 shadow-inner">
          <img
            src={logo}
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <span className="relative font-display text-lg md:text-xl text-white drop-shadow-sm">
          {initials}
        </span>
      )}
    </div>
  )
}

export function Testimonials() {
  const gridRef = useRef<HTMLDivElement>(null)
  const trustedRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      }
    )
  }, [reduced])

  useEffect(() => {
    if (!trustedRef.current || reduced) return
    const logos = trustedRef.current.querySelectorAll('.trusted-logo')
    gsap.fromTo(
      logos,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: trustedRef.current, start: 'top 88%', once: true },
      }
    )
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <section id="testimonials" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          compact
          label="Social Proof"
          title="What clients say."
          subtitle="Real feedback from teams I've shipped for — web, AI, and production systems."
        />

        <div ref={gridRef} className="grid md:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name + i}
              className={`relative glass rounded-2xl p-5 md:p-6 transition-all duration-500 overflow-hidden ${
                active === i && !reduced
                  ? 'border-violet/35 shadow-[0_0_30px_rgba(124,58,237,0.12)]'
                  : 'border-white/6'
              }`}
            >
              <span
                className="absolute top-4 right-5 font-display text-4xl leading-none text-violet/20 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="relative text-text-muted text-sm leading-relaxed mb-5 pr-4">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <TestimonialAvatar avatar={t.avatar} initials={t.initials} name={t.name} />
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={trustedRef} className="relative rounded-2xl overflow-hidden p-6 md:p-8 glass">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(34,211,238,0.06) 100%)',
            }}
          />

          <p className="relative text-[10px] tracking-[0.35em] uppercase text-cyan text-center mb-1 font-medium">
            Trusted by / Worked with
          </p>
          <p className="relative text-text-muted text-sm text-center mb-6 max-w-md mx-auto">
            Brands and teams I&apos;ve built for — live in production.
          </p>

          <div className="relative flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {TRUSTED_LOGOS.map((logo) => (
              <a
                key={logo.name}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="trusted-logo group flex flex-col items-center gap-2 no-underline"
                data-cursor-hover
              >
                <TrustedLogoMark
                  logo={logo.logo}
                  initials={logo.initials}
                  name={logo.name}
                  gradient={logo.gradient}
                  glow={logo.glow}
                />
                <span className="text-[11px] md:text-xs font-medium text-text-muted group-hover:text-cyan transition-colors duration-300">
                  {logo.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
