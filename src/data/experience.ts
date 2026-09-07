export type EmploymentType = 'Full-time' | 'Contract' | 'Part-time' | 'Self-employed' | 'Internship'

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
    id: 'fiverr-cv',
    role: 'Freelance Computer Vision Engineer',
    company: 'Self-Employed / Fiverr',
    employmentType: 'Self-employed',
    startDate: '2025',
    endDate: null,
    duration: 'Present',
    location: 'Pakistan · Remote',
    description:
      'Built YOLO-based computer vision solutions with FastAPI deployment, including a golf swing tracking system using pose estimation for coaching feedback on swing angles and tempo.',
    skills: ['YOLO', 'OpenCV', 'MediaPipe', 'FastAPI', 'Computer Vision'],
    url: 'https://github.com/alirazach476',
    initials: 'CV',
    gradient: 'from-cyan-400 to-teal-500',
    glow: 'rgba(34, 211, 238, 0.2)',
    current: true,
  },
  {
    id: 'metadesk-intern',
    role: 'Embedded Systems Intern',
    company: 'Meta Desk Global',
    employmentType: 'Internship',
    startDate: 'Jul 2025',
    endDate: 'Jul 2026',
    duration: '1 yr',
    location: 'Lahore, Punjab, Pakistan',
    description:
      'Worked on AI/ML, Data Science, Computer Vision, and NLP — data preprocessing, model development, evaluation, and optimization — plus microcontroller programming, circuit interfacing, and hardware debugging.',
    skills: ['AI/ML', 'Computer Vision', 'NLP', 'Embedded Systems', 'Python'],
    initials: 'MD',
    gradient: 'from-violet-400 to-indigo-500',
    glow: 'rgba(124, 58, 237, 0.22)',
  },
]
