export const PROFILE = {
  name: 'Abdullah Yaseen',
  email: 'abdullahyaseen6500@gmail.com',
  phone: '+92 319 2560463',
  headline: 'Full-Stack Developer • AI / Python Engineer • SaaS Builder',
  summary:
    'I ship production-grade SaaS from idea to deploy — React, Next.js, Node.js, Python, SQL/NoSQL, AI automation, and clean REST API design. Founder of two launched SaaS products, with 30+ freelance projects delivered at a consistent 5-star rating.',
  stats: [
    { label: 'SaaS Launched', value: 2, suffix: '' },
    { label: 'Freelance Projects', value: 30, suffix: '+' },
    { label: 'Client Rating', value: 5, suffix: '★' },
  ],
  education: {
    degree: 'BS Computer Engineering',
    school: 'COMSATS University, Lahore',
  },
  certifications: [
    'AWS Essentials',
    'Python Machine Learning',
    'Python Automation',
    'Introduction to GitHub',
  ],
}

export type SkillGroup = {
  category: string
  accent: 'violet' | 'cyan' | 'pink' | 'amber' | 'emerald' | 'blue'
  skills: string[]
}

export const SKILLS: SkillGroup[] = [
  {
    category: 'Frontend',
    accent: 'cyan',
    skills: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    category: 'Backend',
    accent: 'violet',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST API Design'],
  },
  {
    category: 'Databases',
    accent: 'blue',
    skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'SQL Server'],
  },
  {
    category: 'AI / ML',
    accent: 'pink',
    skills: ['LLM Integrations', 'Machine Learning', 'Computer Vision', 'NLP', 'Chatbots', 'Automation'],
  },
  {
    category: 'Cloud / DevOps',
    accent: 'amber',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'Linux'],
  },
  {
    category: 'Tools',
    accent: 'emerald',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
]

export interface FeaturedProject {
  name: string
  slug: string
  url: string
  tagline: string
  description: string
  features: string[]
  tags: string[]
  gradient: string
  accent: string
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'Clipzy',
    slug: 'clipzy',
    url: 'https://clipzy.xynovix.com',
    tagline: 'AI live-streaming & content studio',
    description:
      'Record streams and podcasts with multi-guest support, then let AI handle post-production — thumbnails, descriptions, and tags — and publish to every platform in one click.',
    features: [
      'Multi-guest stream & podcast recording',
      'AI post-production: thumbnails, descriptions, tags',
      'One-click multi-platform publishing',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'AI APIs'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
    accent: 'rgba(124, 58, 237, 0.4)',
  },
  {
    name: 'RaahBaan',
    slug: 'raahban',
    url: 'https://raahban.com',
    tagline: 'AI education & career guidance for Pakistan',
    description:
      'A full guidance platform: merit calculator, scholarship & university explorer, study planner, past papers, mock tests, a career simulator, and an AI counselor plus tutor.',
    features: [
      'Merit calculator & university / scholarship explorer',
      'Study planner, past papers & mock tests',
      'AI counselor, tutor & career simulator',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'Supabase', 'LLM'],
    gradient: 'from-emerald-400/30 via-cyan/30 to-blue-500/20',
    accent: 'rgba(34, 211, 238, 0.4)',
  },
]

export interface SelectedProject {
  name: string
  slug: string
  url: string
  description: string
  tags: string[]
  gradient: string
}

export const SELECTED_PROJECTS: SelectedProject[] = [
  {
    name: 'FamLink',
    slug: 'famlink',
    url: 'https://famlink.care',
    description: 'Family & caregiver coordination platform.',
    tags: ['React', 'Web App'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
  },
  {
    name: '3D Web Experience',
    slug: 'nova',
    url: 'https://core-sevenhenna.vercel.app',
    description: 'Interactive in-browser 3D experience.',
    tags: ['Three.js', 'React', '3D'],
    gradient: 'from-rose/30 via-violet/30 to-indigo/20',
  },
  {
    name: 'Luxury Watch Store',
    slug: 'watches',
    url: 'https://watchs-gray.vercel.app',
    description: 'Next.js e-commerce storefront.',
    tags: ['Next.js', 'E-commerce'],
    gradient: 'from-violet/40 via-cyan/20 to-indigo/30',
  },
  {
    name: 'Stepping Stone',
    slug: 'steppingstone',
    url: 'https://stteppingstone.netlify.app',
    description: 'Clean, responsive business website.',
    tags: ['React', 'Netlify'],
    gradient: 'from-pink/20 via-violet/30 to-indigo/20',
  },
  {
    name: 'Construction Company',
    slug: 'construction',
    url: 'https://constractioncompany.netlify.app',
    description: 'Marketing site for a construction firm.',
    tags: ['React', 'Marketing'],
    gradient: 'from-indigo/30 via-violet/30 to-cyan/20',
  },
  {
    name: 'Healthy Start NC',
    slug: 'healthystartnc',
    url: 'https://healthystartnc.com',
    description: 'Healthcare website (WordPress / PHP).',
    tags: ['WordPress', 'PHP'],
    gradient: 'from-cyan/30 via-indigo/30 to-violet/20',
  },
]

export interface AIProject {
  name: string
  slug: string
  description: string
  tags: string[]
  image: string
}

export const AI_PROJECTS: AIProject[] = [
  {
    name: 'Automatic Product Scanning & Billing',
    slug: 'product-scanning',
    description: 'Real-time product detection with automated billing from a live camera feed.',
    tags: ['Python', 'Computer Vision', 'Real-Time'],
    image: '/ai/product-scanning',
  },
  {
    name: 'Real-Time Multi-Person Tracking',
    slug: 'tracking',
    description: 'Persistent ID tracking across multiple people in crowded, dynamic scenes.',
    tags: ['Python', 'OpenCV', 'Tracking'],
    image: '/ai/tracking',
  },
  {
    name: 'Automatic Vehicle Counting',
    slug: 'vehicle-counting',
    description: 'Lane-aware vehicle detection and counting for traffic analytics.',
    tags: ['Python', 'OpenCV', 'Analytics'],
    image: '/ai/vehicle-counting',
  },
  {
    name: 'Real-Time People Detection',
    slug: 'people-detection',
    description: 'High-FPS person detection with live bounding boxes on video streams.',
    tags: ['Python', 'Computer Vision', 'Real-Time'],
    image: '/ai/people-detection',
  },
  {
    name: 'License Plate Recognition (ALPR)',
    slug: 'alpr',
    description: 'End-to-end plate detection, OCR, and validation pipeline.',
    tags: ['Python', 'OCR', 'ALPR'],
    image: '/ai/alpr',
  },
]

export const MARQUEE_KEYWORDS = [
  'React', 'Next.js', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Supabase',
  'MongoDB', 'LLM Integrations', 'Computer Vision', 'AWS', 'Docker', 'Kubernetes',
  'Tailwind', 'REST APIs', 'Automation', 'Vercel', 'CI/CD',
]

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/abdullah-yaseen1',
  github: 'https://github.com/AbdullahYaseen01',
  whatsapp: 'https://wa.me/923192560463',
  whatsappDisplay: '+92 319 2560463',
  email: 'abdullahyaseen6500@gmail.com',
  phone: '+92 319 2560463',
}
