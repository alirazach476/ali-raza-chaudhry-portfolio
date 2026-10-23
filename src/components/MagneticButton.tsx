import { useRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode
  strength?: number
  as?: 'button' | 'a'
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
}

type MagneticButtonAllProps = MagneticButtonProps & Partial<Pick<AnchorProps, 'target' | 'rel' | 'download'>>

export function MagneticButton({
  children,
  strength = 0.35,
  as = 'button',
  href,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}: MagneticButtonAllProps) {
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
      'bg-gradient-to-r from-violet via-indigo to-cyan text-white shadow-[0_8px_28px_rgba(124,58,237,0.28)] hover:shadow-[0_10px_36px_rgba(124,58,237,0.4)] border border-white/10',
    outline:
      'border border-white/14 text-text bg-white/[0.04] hover:border-cyan/35 hover:bg-white/[0.07]',
    ghost: 'text-text-muted hover:text-cyan bg-transparent',
  }

  const baseClass = `
    relative inline-flex items-center justify-center gap-2
    px-7 py-3.5 rounded-full font-medium text-sm tracking-wide
    transition-[box-shadow,background,border-color,transform] duration-300 cursor-none active:scale-[0.97]
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
    const isExternal = /^https?:\/\//i.test(href)
    return (
      <a
        {...(sharedProps as object)}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return <button {...sharedProps}>{children}</button>
}
