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
  const wrapperClass = compact ? 'mb-4 md:mb-5' : 'mb-5 md:mb-6'
  const titleClass = compact
    ? 'font-display text-2xl md:text-[1.85rem] lg:text-3xl gradient-text leading-[1.15]'
    : 'font-display text-3xl md:text-4xl gradient-text leading-[1.12]'
  const subtitleClass = compact
    ? 'mt-2 text-text-muted text-sm max-w-2xl leading-relaxed'
    : 'mt-2.5 text-text-muted text-sm md:text-base max-w-2xl leading-relaxed'

  return (
    <div className={`${wrapperClass} ${className}`}>
      {label && (
        <p className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-cyan font-medium mb-2">
          <span className="w-5 h-px bg-cyan/70" aria-hidden="true" />
          {label}
        </p>
      )}
      <h2 className={titleClass}>{title}</h2>
      {subtitle && <p className={subtitleClass}>{subtitle}</p>}
    </div>
  )
}
