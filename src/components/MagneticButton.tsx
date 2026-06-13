import { useRef, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  strength?: number
  as?: 'button' | 'a'
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
}

export function MagneticButton({
  children,
  strength = 0.35,
  as = 'button',
  href,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const reduced = useReducedMotion()

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  const variants = {
    primary:
      'bg-gradient-to-r from-violet via-indigo to-cyan text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]',
    outline:
      'border border-white/15 text-text bg-white/5 hover:border-violet/40 hover:bg-white/8',
    ghost: 'text-text-muted hover:text-text bg-transparent',
  }

  const baseClass = `
    relative inline-flex items-center justify-center gap-2
    px-7 py-3.5 rounded-full font-medium text-sm tracking-wide
    transition-shadow duration-500 cursor-none active:scale-[0.97]
    ${variants[variant]} ${className}
  `

  const sharedProps = {
    ref,
    'data-magnetic': true,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: baseClass,
    onClick,
    ...props,
  }

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...(sharedProps as object)}
      >
        {children}
      </a>
    )
  }

  return <button {...sharedProps}>{children}</button>
}
