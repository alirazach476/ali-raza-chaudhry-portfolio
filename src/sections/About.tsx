import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { PROFILE } from '../data/content'
import { IMPACT_STATS } from '../data/socialProof'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STAT_ACCENTS = [
  { gradient: 'from-violet to-indigo', glow: 'rgba(124, 58, 237, 0.22)', ring: 'ring-violet/20' },
  { gradient: 'from-cyan to-blue-500', glow: 'rgba(34, 211, 238, 0.2)', ring: 'ring-cyan/20' },
  { gradient: 'from-pink to-violet', glow: 'rgba(244, 114, 182, 0.2)', ring: 'ring-pink/20' },
  { gradient: 'from-amber-400 to-orange-500', glow: 'rgba(245, 158, 11, 0.18)', ring: 'ring-amber/20' },
]

function StatCounter({
  value,
  suffix,
  label,
  accent,
}: {
  value: number
  suffix: string
  label: string
  accent: (typeof STAT_ACCENTS)[number]
}) {
  const { ref, value: count } = useCountUp(value)

  return (
    <div
      className={`about-stat-card glass rounded-2xl p-5 md:p-6 text-center ring-1 ${accent.ring} transition-transform duration-500 hover:-translate-y-1`}
      style={{ '--about-stat-glow': accent.glow } as React.CSSProperties}
    >
      <div
        className={`font-display text-3xl md:text-4xl lg:text-5xl tabular-nums bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}
      >
        <span ref={ref}>{count}</span>
        <span className="text-cyan">{suffix}</span>
      </div>
      <p className="mt-2 text-[10px] md:text-xs text-text-muted tracking-[0.2em] uppercase font-medium">
        {label}
      </p>
    </div>
  )
}

export function About() {
  const bioRef = useRef<HTMLDivElement>(null)
  const sideRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const animate = (ref: { current: HTMLElement | null }, selector: string, stagger = 0.08) => {
      if (!ref.current) return
      const items = ref.current.querySelectorAll(selector)
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        }
      )
    }

    animate(bioRef, '.about-reveal', 0.1)
    animate(sideRef, '.about-reveal', 0.1)
    animate(statsRef, '.about-stat-card', 0.08)
  }, [reduced])

  return (
    <section id="about" className="section-block about-section overflow-hidden">
      <div className="about-ambient pointer-events-none" aria-hidden="true">
        <div className="about-orb about-orb--violet" />
        <div className="about-orb about-orb--cyan" />
        <div className="about-orb about-orb--pink" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <SectionHeading
          label="About"
          title="Idea to deploy."
          subtitle="A full-stack developer and AI/Python engineer who ships production SaaS end to end."
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div ref={bioRef} className="space-y-5">
            <p className="about-reveal about-intro">
              {PROFILE.summary}
            </p>

            <div className="about-reveal about-bio-dual">
              <div className="about-bio-panel about-bio-panel--web">
                <div className="about-bio-panel-header">
                  <span className="about-bio-panel-badge about-bio-panel-badge--web">Full-Stack</span>
                </div>
                <p className="about-bio-text">
                  I build <span className="about-highlight about-highlight--web">production web apps</span> with{' '}
                  <span className="about-highlight about-highlight--web">React, Next.js & Node</span> — fast,
                  responsive, and backed by clean REST APIs and SQL / NoSQL databases.
                </p>
              </div>

              <div className="about-bio-panel about-bio-panel--ai">
                <div className="about-bio-panel-header">
                  <span className="about-bio-panel-badge about-bio-panel-badge--ai">AI · Python</span>
                </div>
                <p className="about-bio-text">
                  I engineer <span className="about-highlight about-highlight--ai">AI automation & CV systems</span> in{' '}
                  <span className="about-highlight about-highlight--ai">Python</span> — from LLM integrations and
                  chatbots to real-time computer vision.
                </p>
              </div>
            </div>

            <blockquote className="about-reveal about-quote">
              &ldquo;Founder of two launched SaaS products — I don&apos;t just prototype, I ship.&rdquo;
            </blockquote>
          </div>

          <div ref={sideRef} className="space-y-4">
            <div className="about-reveal glass rounded-2xl p-5 md:p-6">
              <p className="text-[10px] tracking-[0.28em] uppercase text-violet-300 font-semibold mb-3">
                Founder
              </p>
              <p className="text-sm md:text-[0.95rem] text-white/85 leading-relaxed">
                Founder of <span className="text-white font-semibold">2 launched SaaS</span> products —{' '}
                <span className="text-cyan">Clipzy</span> (AI live-streaming studio) and{' '}
                <span className="text-cyan">RaahBaan</span> (AI education & career guidance). 30+ freelance
                projects delivered at a consistent 5-star rating.
              </p>
            </div>

            <div className="about-reveal glass rounded-2xl p-5 md:p-6">
              <p className="text-[10px] tracking-[0.28em] uppercase text-cyan font-semibold mb-3">
                Education
              </p>
              <p className="text-sm md:text-[0.95rem] text-white font-medium">{PROFILE.education.degree}</p>
              <p className="text-sm text-text-muted mt-0.5">{PROFILE.education.school}</p>
            </div>

            <div className="about-reveal glass rounded-2xl p-5 md:p-6">
              <p className="text-[10px] tracking-[0.28em] uppercase text-pink-300 font-semibold mb-3">
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {PROFILE.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 rounded-full text-xs text-white/80 border border-white/10 bg-white/[0.04]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
          {IMPACT_STATS.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} accent={STAT_ACCENTS[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
