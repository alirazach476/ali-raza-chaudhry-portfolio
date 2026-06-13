import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[10001] h-[2px] pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-violet via-indigo to-cyan transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
