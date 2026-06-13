interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
  compact?: boolean
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className = '',
  compact = true,
}: SectionHeadingProps) {
  const wrapperClass = compact ? 'mb-3 md:mb-4' : 'mb-4 md:mb-5'
  const titleClass = compact
    ? 'font-display text-2xl md:text-3xl gradient-text leading-tight'
    : 'font-display text-3xl md:text-4xl gradient-text leading-tight'
  const subtitleClass = compact
    ? 'mt-1.5 text-text-muted text-sm max-w-2xl leading-relaxed'
    : 'mt-2 text-text-muted text-sm md:text-base max-w-2xl leading-relaxed'

  return (
    <div className={`${wrapperClass} ${className}`}>
      {label && (
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-cyan font-medium mb-1.5">
          {label}
        </p>
      )}
      <h2 className={titleClass}>{title}</h2>
      {subtitle && <p className={subtitleClass}>{subtitle}</p>}
    </div>
  )
}
