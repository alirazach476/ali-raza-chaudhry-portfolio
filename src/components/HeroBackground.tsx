import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface HeroBackgroundProps {
  mouse: { x: number; y: number }
}

const FLOATERS = [
  { label: 'React', top: '18%', left: '8%', color: 'text-cyan/40', delay: 0 },
  { label: 'Next.js', top: '30%', left: '86%', color: 'text-white/25', delay: 0.6 },
  { label: 'Python', top: '62%', left: '6%', color: 'text-pink-300/35', delay: 1.2 },
  { label: 'Node.js', top: '72%', left: '88%', color: 'text-emerald-300/35', delay: 0.9 },
  { label: 'FastAPI', top: '46%', left: '92%', color: 'text-violet-300/35', delay: 1.6 },
  { label: 'AI', top: '82%', left: '18%', color: 'text-cyan/35', delay: 0.3 },
]

export function HeroBackground({ mouse }: HeroBackgroundProps) {
  const reduced = useReducedMotion()

  const orbStyle = (depth: number) =>
    reduced ? undefined : { transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)` }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-grid-bg" />

      <div className="hero-orb hero-orb-violet" style={orbStyle(-18)} />
      <div className="hero-orb hero-orb-cyan" style={orbStyle(14)} />

      <div className="hero-spotlight" />

      {!reduced && (
        <div className="hidden lg:block">
          {FLOATERS.map((f) => (
            <motion.span
              key={f.label}
              className={`absolute font-display text-sm tracking-[0.2em] uppercase ${f.color} select-none`}
              style={{ top: f.top, left: f.left }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -14, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 + f.delay },
                y: { duration: 6 + f.delay, repeat: Infinity, ease: 'easeInOut', delay: f.delay },
              }}
            >
              {f.label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  )
}
