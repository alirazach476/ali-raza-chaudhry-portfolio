export interface EducationEntry {
  id: string
  degree: string
  institution: string
  startDate: string
  endDate: string
  location: string
  description?: string
  highlights?: string[]
  initials: string
  gradient: string
  glow: string
  current?: boolean
}

export const EDUCATION: EducationEntry[] = [
  {
    id: 'comsats-bce',
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'COMSATS University',
    startDate: '2022',
    endDate: '2026',
    location: 'Lahore, Pakistan',
    description:
      'Computer systems, software engineering, and applied AI — spanning algorithms, embedded systems, and data-driven applications.',
    highlights: ['Computer Engineering', 'Software Systems', 'AI & Data'],
    initials: 'CU',
    gradient: 'from-cyan-400 to-violet-500',
    glow: 'rgba(34, 211, 238, 0.2)',
  },
]
