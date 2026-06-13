import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface ParallaxOptions {
  intensity?: number
  enabled?: boolean
}

export function useMouseParallax({ intensity = 20, enabled = true }: ParallaxOptions = {}) {
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled || reduced) return

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * intensity
      const y = (e.clientY / window.innerHeight - 0.5) * intensity
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [enabled, intensity, reduced])

  return offset
}
