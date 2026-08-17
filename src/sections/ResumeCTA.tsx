import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../components/MagneticButton'
import { ResumeButton } from '../components/ResumeButton'
import { AvailabilityBadge } from '../components/AvailabilityBadge'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function ResumeCTA() {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!cardRef.current || reduced) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
      }
    )
  }, [reduced])

  return (
    <section id="resume" className="section-block">
      <div className="max-w-[1100px] mx-auto">
        <div
          ref={cardRef}
          className="relative overflow-hidden glass rounded-3xl px-6 py-10 md:px-12 md:py-14 text-center"
        >
          <div
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-[140%] rounded-full opacity-20 blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.6), rgba(34,211,238,0.2), transparent)' }}
            aria-hidden="true"
          />

          <div className="relative">
            <AvailabilityBadge className="mb-5" />

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-text leading-tight mb-3">
              Ready to build your product?
            </h2>
            <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto mb-7">
              Whether it&apos;s a full SaaS from scratch, an AI integration, or a computer vision
              pipeline — let&apos;s ship it. Grab my resume or reach out directly.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              <MagneticButton className="w-full sm:w-auto" onClick={() => scrollTo('#contact')}>
                Hire Me
              </MagneticButton>
              <ResumeButton className="w-full sm:w-auto !justify-center" variant="outline" label="Download Resume ↗" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
