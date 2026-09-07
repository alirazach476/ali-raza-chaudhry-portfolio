import { MagneticButton } from './MagneticButton'

export const RESUME_URL = '/ALI_RAZA_CHAUDHRY.pdf'

interface ResumeButtonProps {
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  label?: string
}

export function ResumeButton({
  variant = 'outline',
  className = '',
  label = 'Download Resume',
}: ResumeButtonProps) {
  return (
    <div className={className.includes('w-full') ? 'w-full' : 'relative'}>
      <MagneticButton
        as="a"
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        className={className}
        strength={0.25}
        download="ALI_RAZA_CHAUDHRY.pdf"
        aria-label="Download Ali Raza Chaudhry resume PDF"
      >
        {label}
      </MagneticButton>
    </div>
  )
}
