import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { PROFILE } from '../data/content'
import { IMPACT_STATS } from '../data/socialProof'
import { useCountUp } from '../hooks/useCountUp'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type SkillCategory = 'Frontend' | 'Backend' | 'AI' | 'Tools'

const CATEGORY_ACCENTS: Record<
  SkillCategory,
  { gradient: string; border: string; label: string; dot: string; glow: string }
> = {
  Frontend: {
    gradient: 'from-cyan/25 via-blue-500/10 to-transparent',
    border: 'border-cyan/25 hover:border-cyan/50',
    label: 'text-cyan',
    dot: 'bg-cyan',
    glow: 'rgba(34, 211, 238, 0.18)',
  },
  Backend: {
    gradient: 'from-violet/25 via-indigo/500/10 to-transparent',
    border: 'border-violet/25 hover:border-violet/50',
    label: 'text-violet-300',
    dot: 'bg-violet',
    glow: 'rgba(124, 58, 237, 0.2)',
  },
  AI: {
    gradient: 'from-pink/25 via-fuchsia/500/10 to-transparent',
    border: 'border-pink/30 hover:border-pink/55',
    label: 'text-pink-300',
    dot: 'bg-pink',
    glow: 'rgba(244, 114, 182, 0.18)',
  },
  Tools: {
    gradient: 'from-amber/20 via-orange/500/10 to-transparent',
    border: 'border-amber/25 hover:border-amber/50',
    label: 'text-amber-300',
    dot: 'bg-amber-400',
    glow: 'rgba(245, 158, 11, 0.16)',
  },
}

const STAT_ACCENTS = [
  { gradient: 'from-violet to-indigo', glow: 'rgba(124, 58, 237, 0.22)', ring: 'ring-violet/20' },
  { gradient: 'from-cyan to-blue-500', glow: 'rgba(34, 211, 238, 0.2)', ring: 'ring-cyan/20' },
  { gradient: 'from-pink to-violet', glow: 'rgba(244, 114, 182, 0.2)', ring: 'ring-pink/20' },
  { gradient: 'from-amber-400 to-orange-500', glow: 'rgba(245, 158, 11, 0.18)', ring: 'ring-amber/20' },
]

const SKILL_ORDER: SkillCategory[] = ['Frontend', 'Backend', 'AI', 'Tools']

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

function SkillCard({ name, category }: { name: string; category: SkillCategory }) {
  const accent = CATEGORY_ACCENTS[category]

  return (
    <div
      className={`about-skill-card skill-card group relative overflow-hidden rounded-xl border px-4 py-3.5 text-center transition-all duration-500 hover:-translate-y-0.5 bg-gradient-to-br ${accent.gradient} ${accent.border}`}
      style={{ '--about-skill-glow': accent.glow } as React.CSSProperties}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 about-skill-shine pointer-events-none" />
      <span className="relative text-sm text-white font-medium">{name}</span>
      <span className={`relative block text-[10px] mt-1 uppercase tracking-wider font-medium ${accent.label}`}>
        {category}
      </span>
    </div>
  )
}

export function About() {
  const bioRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const animate = (
      ref: { current: HTMLElement | null },
      selector: string,
      stagger = 0.06
    ) => {
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
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }

    animate(bioRef, '.about-reveal', 0.1)
    animate(gridRef, '.skill-card', 0.04)
    animate(statsRef, '.about-stat-card', 0.08)
  }, [reduced])

  const skillsByCategory = SKILL_ORDER.map((category) => ({
    category,
    skills: PROFILE.skills.filter((s) => s.category === category),
  }))

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
          title="Two worlds. One builder."
          subtitle="Full-stack web development and real-time AI — rarely in the same engineer."
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div ref={bioRef} className="space-y-5">
            <div className="about-reveal about-pathways">
              <div className="about-pathway about-pathway--web">
                <div className="about-pathway-icon">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                    <path
                      d="M4 5h16v14H4V5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M4 9h16" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-cyan font-semibold">Web</p>
                  <p className="text-sm text-white font-medium mt-0.5">Interfaces that convert</p>
                </div>
              </div>

              <div className="about-pathway-bridge" aria-hidden="true">
                <span className="about-pathway-dot" />
                <span className="about-pathway-line" />
                <span className="about-pathway-dot about-pathway-dot--pink" />
              </div>

              <div className="about-pathway about-pathway--ai">
                <div className="about-pathway-icon about-pathway-icon--ai">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-pink-300 font-semibold">AI</p>
                  <p className="text-sm text-white font-medium mt-0.5">Systems that see & predict</p>
                </div>
              </div>
            </div>

            <p className="about-reveal about-intro">
              I&apos;m a full-stack developer who doesn&apos;t stop at the browser — two disciplines, one builder.
            </p>

            <div className="about-reveal about-bio-dual">
              <div className="about-bio-panel about-bio-panel--web">
                <div className="about-bio-panel-header">
                  <span className="about-bio-panel-badge about-bio-panel-badge--web">Web</span>
                </div>
                <p className="about-bio-text">
                  I craft{' '}
                  <span className="about-highlight about-highlight--web">pixel-perfect interfaces</span> with{' '}
                  <span className="about-highlight about-highlight--web">React, Next.js, and modern CSS</span> — sites
                  that load fast, convert visitors, and feel premium.
                </p>
              </div>

              <div className="about-bio-panel about-bio-panel--ai">
                <div className="about-bio-panel-header">
                  <span className="about-bio-panel-badge about-bio-panel-badge--ai">AI</span>
                </div>
                <p className="about-bio-text">
                  I build{' '}
                  <span className="about-highlight about-highlight--ai">real-time AI and computer vision</span> systems
                  that detect, track, and recognize — from product scanning to license plate recognition,{' '}
                  <span className="about-highlight about-highlight--ai">deployed and running in production</span>.
                </p>
              </div>
            </div>

            <blockquote className="about-reveal about-quote">
              &ldquo;Rarely do you get both — a builder who ships beautiful web products and production AI.&rdquo;
            </blockquote>
          </div>

          <div ref={gridRef} className="space-y-4">
            {skillsByCategory.map(({ category, skills }) => {
              const accent = CATEGORY_ACCENTS[category]
              return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-2.5 px-1">
                    <span className={`w-2 h-2 rounded-full ${accent.dot} shadow-[0_0_8px_var(--about-cat-glow)]`} style={{ '--about-cat-glow': accent.glow } as React.CSSProperties} />
                    <p className={`text-[10px] tracking-[0.3em] uppercase font-semibold ${accent.label}`}>
                      {category}
                    </p>
                    <div className={`flex-1 h-px bg-gradient-to-r ${accent.gradient} opacity-60`} />
                  </div>
                  <div
                    className={`grid gap-2.5 ${
                      skills.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'
                    }`}
                  >
                    {skills.map((skill) => (
                      <SkillCard key={skill.name} name={skill.name} category={category} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8"
        >
          {IMPACT_STATS.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} accent={STAT_ACCENTS[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
