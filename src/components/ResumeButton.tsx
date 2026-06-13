import { useState } from 'react'
import { MagneticButton } from './MagneticButton'

const RESUME_PATHS = [
  '/Abdullah-Yaseen-Resume.pdf',
  '/Abdullah-Yaseen-Resume.pdf.pdf',
  '/resume.pdf',
]

interface ResumeButtonProps {
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  label?: string
}

export function ResumeButton({ variant = 'outline', className = '', label = 'Download Resume' }: ResumeButtonProps) {
  const [missing, setMissing] = useState(false)

  const handleClick = async () => {
    for (const path of RESUME_PATHS) {
      try {
        const res = await fetch(path, { method: 'HEAD' })
        if (res.ok) {
          const a = document.createElement('a')
          a.href = path
          a.download = 'Abdullah-Yaseen-Resume.pdf'
          a.click()
          setMissing(false)
          return
        }
      } catch {
        /* try next */
      }
    }
    setMissing(true)
    setTimeout(() => setMissing(false), 3000)
  }

  return (
    <div className={`relative ${className.includes('w-full') ? 'w-full' : ''}`}>
      <MagneticButton variant={variant} className={className} onClick={handleClick} strength={0.25}>
        {missing ? 'Resume not found' : label}
      </MagneticButton>
      {missing && (
        <p className="absolute top-full mt-2 text-xs text-text-muted whitespace-nowrap left-1/2 -translate-x-1/2">
          Drop your PDF in <code className="text-cyan">/public/</code>
        </p>
      )}
    </div>
  )
}
