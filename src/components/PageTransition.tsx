import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return <div className="page-enter">{children}</div>
}
