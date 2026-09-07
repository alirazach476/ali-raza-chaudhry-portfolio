export type CertificateIssuer =
  | 'Coursera'
  | 'Udemy'
  | 'OpenCV University'
  | 'Google'
  | 'Global Skills Academy'
  | 'DeepLearn Academy'
  | 'UniAthena'

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
    id: 'opencv-bootcamp',
    title: 'OpenCV Bootcamp — Certificate of Excellence (100%)',
    issuer: 'OpenCV University',
    provider: 'OpenCV.org',
    date: 'Jul 2025',
    image: '/certificates/opencv-bootcamp.png',
    tags: ['OpenCV', 'Computer Vision'],
  },
  {
    id: 'coursera-ml',
    title: 'Machine Learning',
    issuer: 'Coursera',
    provider: 'DeepLearning.AI',
    date: 'Aug 2025',
    image: '/certificates/coursera-ml-deeplearningai.png',
    verifyUrl: 'https://coursera.org/verify/4F7H2K9Q8D3J',
    tags: ['Machine Learning', 'Andrew Ng'],
  },
  {
    id: 'google-python-automation',
    title: 'Python Automation',
    issuer: 'Google',
    provider: 'Google Career Certificates',
    date: 'Aug 2026',
    image: '/certificates/google-python-automation.png',
    tags: ['Python', 'Automation', 'APIs'],
  },
  {
    id: 'gsa-data-science',
    title: 'Professional Certificate in Data Science',
    issuer: 'Global Skills Academy',
    provider: 'Global Skills Academy',
    date: 'Aug 2026',
    image: '/certificates/gsa-data-science.png',
    tags: ['Data Science', 'Machine Learning'],
  },
  {
    id: 'deeplearn-ai-agents',
    title: 'AI Agents: Build, Deploy and Automate',
    issuer: 'DeepLearn Academy',
    provider: 'DeepLearn Academy',
    date: 'Aug 2026',
    image: '/certificates/deeplearn-ai-agents.png',
    tags: ['AI Agents', 'LangChain', 'LLMs'],
  },
  {
    id: 'uniathena-ml',
    title: 'Basics of Machine Learning Algorithms',
    issuer: 'UniAthena',
    provider: 'UniAthena / CIQ UK',
    date: 'Aug 2026',
    image: '/certificates/uniathena-ml-algorithms.png',
    tags: ['Machine Learning'],
  },
  {
    id: 'uniathena-ai',
    title: 'Basics of Artificial Intelligence: Learning Models',
    issuer: 'UniAthena',
    provider: 'UniAthena / CIQ UK',
    date: 'Aug 2026',
    image: '/certificates/uniathena-ai-models.png',
    tags: ['Artificial Intelligence'],
  },
  {
    id: 'uniathena-python',
    title: 'Basics of Python',
    issuer: 'UniAthena',
    provider: 'UniAthena / CIQ UK',
    date: 'Aug 2026',
    image: '/certificates/uniathena-python.png',
    tags: ['Python'],
  },
  {
    id: 'udemy-python-ml',
    title: 'Python Machine Learning',
    issuer: 'Udemy',
    provider: 'Udemy',
    date: '2025',
    image: '/certificates/python-ml.png',
    tags: ['Python', 'Machine Learning'],
  },
]
