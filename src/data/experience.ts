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
    id: 'metadesk-intern',
    role: 'AI Engineering Intern',
    company: 'MetaDesk Global',
    employmentType: 'Internship',
    startDate: 'Apr 2026',
    endDate: 'Sep 2026',
    duration: '6 mos',
    location: 'Lahore, Punjab, Pakistan',
    description:
      'Contributed to a Cricket Match Analytics System spanning computer vision, edge hardware, and a full data stack. Built YOLOv8 + OpenCV player/ball tracking with pitch mapping and frame-based ball-speed estimation; deployed live inference on Orange Pi with a USB camera under outdoor lighting; engineered a Python pipeline (Pandas, PostgreSQL) for tracking data; and shipped a React + FastAPI dashboard for delivery stats, speed trends, and live field overlay. Also supported microcontroller programming, sensor/camera interfacing, and hardware debugging.',
    skills: [
      'YOLOv8',
      'OpenCV',
      'Orange Pi',
      'Python',
      'Pandas',
      'PostgreSQL',
      'React',
      'FastAPI',
      'Computer Vision',
      'Embedded Systems',
    ],
    url: 'https://www.metadeskglobal.com',
    initials: 'MD',
    gradient: 'from-violet-400 to-indigo-500',
    glow: 'rgba(124, 58, 237, 0.22)',
  },
  {
    id: 'fiverr-aiml',
    role: 'AI/ML Engineer',
    company: 'Fiverr',
    employmentType: 'Contract',
    startDate: '2025',
    endDate: null,
    duration: 'Present',
    location: 'Remote · USA & Thailand',
    description:
      'Contract freelance work for clients in the United States and Thailand. Built SwingLab, a golf-swing analysis platform: MediaPipe pose estimation, 33-joint skeleton JSON, swing key-frame metrics, annotated video, coach charts and a web dashboard. Also delivered ARIMA/SARIMA forecasting and Bayesian regression analyses in R. 5-star reviews, with repeat clients.',
    skills: [
      'MediaPipe',
      'Pose Estimation',
      'Python',
      'R',
      'ARIMA/SARIMA',
      'Bayesian Regression',
      'Computer Vision',
      'Dashboards',
    ],
    url: 'https://www.fiverr.com',
    initials: 'FV',
    gradient: 'from-cyan-400 to-teal-500',
    glow: 'rgba(34, 211, 238, 0.2)',
    current: true,
  },
]
