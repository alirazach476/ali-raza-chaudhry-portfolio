export type EmploymentType = 'Full-time' | 'Contract' | 'Part-time' | 'Self-employed' | 'Freelance'

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
    id: 'autozy-fullstack',
    role: 'Full-Stack Developer',
    company: 'Autozy',
    employmentType: 'Full-time',
    startDate: '2025',
    endDate: '2026',
    duration: 'Remote · USA',
    location: 'United States · Remote',
    description:
      'Built and shipped production features across Next.js / Node / PostgreSQL apps — designed REST APIs and optimized React components for performance.',
    skills: ['Next.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'React'],
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
    employmentType: 'Full-time',
    startDate: '2024',
    endDate: '2025',
    duration: '1 yr',
    location: 'Remote',
    description:
      'Engineered scalable Python backends and REST APIs, reducing latency and hardening the platform for production traffic.',
    skills: ['Python', 'FastAPI', 'REST APIs', 'Database Design', 'Performance'],
    url: 'https://nyutonenterprises.com',
    initials: 'NY',
    logo: '/logos/nyuton.webp',
    preview: '/projects/nyuton.webp',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'freelance-fullstack-ai',
    role: 'Freelance Full-Stack & AI Automation',
    company: 'Fiverr (Level 2) & Upwork',
    employmentType: 'Freelance',
    startDate: '2020',
    endDate: '2023',
    duration: '30+ projects',
    location: 'Remote · Worldwide',
    description:
      'Delivered 30+ projects at a consistent 5-star rating — web apps, AI chatbots, and lead-generation automation for clients across Fiverr (Level 2) and Upwork.',
    skills: ['React', 'Node.js', 'Python', 'AI Chatbots', 'Automation'],
    initials: 'FL',
    gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
    glow: 'rgba(124, 58, 237, 0.2)',
  },
]
