import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { SERVICES, PROCESS_STEPS } from '../data/services'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const animate = (ref: { current: HTMLDivElement | null }) => {
      if (!ref.current || reduced) return
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        }
      )
    }
    animate(servicesRef)
    animate(processRef)
  }, [reduced])

  return (
    <section id="services" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          compact
          label="Services"
          title="What I offer."
          subtitle="Clear offerings for clients who need web, full-stack, or AI/CV expertise."
        />

        <div ref={servicesRef} className="grid md:grid-cols-3 gap-5 mb-8 md:mb-10">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-6 md:p-7 hover:border-violet/20 transition-colors duration-500"
            >
              <h3 className="font-display text-xl gradient-text mb-2">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{service.description}</p>
              <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">What you get</p>
              <ul className="space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="text-sm text-text-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-cyan shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SectionHeading
          compact
          title="How we'll work together."
          subtitle="A clear process so you know what to expect from day one."
          className="!mb-4"
        />

        <div ref={processRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.step} className="relative glass rounded-2xl p-5 md:p-6">
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-violet/30" aria-hidden="true" />
              )}
              <span className="text-[10px] tracking-[0.3em] text-cyan">{step.step}</span>
              <h4 className="font-display text-lg mt-2 mb-2">{step.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
