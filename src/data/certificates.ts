export type CertificateIssuer = 'Coursera' | 'Udemy' | 'Workcango'

export interface Certificate {
  id: string
  title: string
  issuer: CertificateIssuer
  provider: string
  date: string
  image: string
  verifyUrl?: string
  tags: string[]
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 'workcango-internship',
    title: 'Internship Certificate — Junior Frontend Developer',
    issuer: 'Workcango',
    provider: 'Workcango S.A.S.',
    date: 'Apr 2026',
    image: '/certificates/workcango-internship.png',
    tags: ['Frontend', 'React', 'Netlify'],
  },
  {
    id: 'python-ml',
    title: 'Python Machine Learning: From Beginner to Pro',
    issuer: 'Udemy',
    provider: 'Learnify IT',
    date: 'Aug 2025',
    image: '/certificates/python-ml.png',
    verifyUrl: 'https://ude.my/UC-491f0608-4d19-4d92-bf7b-72551d538bcf',
    tags: ['Python', 'Machine Learning'],
  },
  {
    id: 'aws-essentials',
    title: 'AWS Essentials: A Complete Beginner\'s Guide',
    issuer: 'Udemy',
    provider: 'Learnify IT',
    date: 'Aug 2025',
    image: '/certificates/aws-essentials.png',
    verifyUrl: 'https://ude.my/UC-a693f8c2-d53b-4c39-abba-1e2e6f45e19b',
    tags: ['AWS', 'Cloud'],
  },
  {
    id: 'git-github',
    title: 'Introduction to Git and GitHub',
    issuer: 'Coursera',
    provider: 'Google',
    date: 'Aug 2025',
    image: '/certificates/git-github.png',
    verifyUrl: 'https://coursera.org/verify/OKQ0UYVTJZKD',
    tags: ['Git', 'GitHub'],
  },
  {
    id: 'python-crash-course',
    title: 'Crash Course on Python',
    issuer: 'Coursera',
    provider: 'Google',
    date: 'Aug 2025',
    image: '/certificates/python-crash-course.png',
    verifyUrl: 'https://coursera.org/verify/E2GQN5PVZ0YT',
    tags: ['Python'],
  },
]
