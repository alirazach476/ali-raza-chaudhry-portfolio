export type EmploymentType = 'Full-time' | 'Contract' | 'Part-time' | 'Self-employed'

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  employmentType: EmploymentType
  startDate: string
  endDate: string | null
  duration: string
  location: string
  description?: string
  skills: string[]
  url?: string
  initials: string
  gradient: string
  glow: string
  logo?: string
  preview?: string
  current?: boolean
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'raahban-founder',
    role: 'Founder',
    company: 'Raahban',
    employmentType: 'Self-employed',
    startDate: 'May 2026',
    endDate: null,
    duration: 'Present',
    location: 'Lahore, Punjab, Pakistan',
    description:
      'Founder of Raahban (raahban.com), an education-guidance platform helping FSc and pre-university students in Pakistan navigate degree choices, scholarships, exam prep, and international study opportunities.',
    skills: ['Product Strategy', 'Full-Stack Development', 'React', 'Node.js'],
    url: 'https://raahban.com',
    initials: 'RB',
    logo: '/logos/raahban.webp',
    preview: '/projects/raahban.webp',
    gradient: 'from-emerald-400 to-cyan-500',
    glow: 'rgba(52, 211, 153, 0.22)',
    current: true,
  },
  {
    id: 'autozy-fullstack',
    role: 'Full Stack Developer',
    company: 'Autozy',
    employmentType: 'Full-time',
    startDate: 'Dec 2025',
    endDate: 'Jun 2026',
    duration: '7 mos',
    location: 'United States · Remote',
    description:
      'Built and shipped Autozy’s production platform — full-stack features, APIs, and polished UI across the live product.',
    skills: ['Python', 'Full-Stack Development', 'React', 'Next.js', 'REST APIs', 'Production Deployments'],
    url: 'https://autozy.co',
    initials: 'AZ',
    logo: '/logos/autozy.webp',
    preview: '/projects/autozy.webp',
    gradient: 'from-cyan-400 to-teal-500',
    glow: 'rgba(34, 211, 238, 0.2)',
  },
  {
    id: 'nyuton-backend',
    role: 'Python Backend Engineer',
    company: 'Nyuton Enterprises',
    employmentType: 'Contract',
    startDate: 'Oct 2025',
    endDate: 'Dec 2025',
    duration: '3 mos',
    location: 'United States',
    description:
      'Developed Python backend services and APIs for Nyuton’s enterprise web platform — database design, integrations, and production deployment.',
    skills: ['Python', 'Back-End Web Development', 'REST APIs', 'Database Design'],
    url: 'https://nyutonenterprises.com',
    initials: 'NY',
    logo: '/logos/nyuton.webp',
    preview: '/projects/nyuton.webp',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'ethisol-frontend',
    role: 'Frontend Developer',
    company: 'Ethisol',
    employmentType: 'Part-time',
    startDate: 'Jan 2025',
    endDate: 'Oct 2025',
    duration: '10 mos',
    location: 'Lahore, Punjab, Pakistan · Remote',
    description:
      'Built responsive, interactive websites with HTML, CSS, JavaScript, and React — focused on performance, accessibility, animations, and clean component architecture.',
    skills: ['Front-End Development', 'React', 'JavaScript', 'CSS Animations', 'Responsive Design'],
    initials: 'ET',
    logo: '/logos/ethisol.webp',
    preview: '/projects/steppingstone.webp',
    gradient: 'from-blue-500 via-orange-400 to-rose-500',
    glow: 'rgba(59, 130, 246, 0.18)',
  },
]
