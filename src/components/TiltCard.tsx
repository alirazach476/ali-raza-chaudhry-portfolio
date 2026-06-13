import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
  }

  return (
    <motion.div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
