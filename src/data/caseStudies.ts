export interface CaseStudy {
  slug: string
  type: 'web' | 'ai'
  title: string
  summary: string
  liveUrl?: string
  githubUrl?: string
  challenge: string
  role: string
  techStack: string[]
  built: { heading: string; body: string; image?: string }[]
  outcome: { metric: string; label: string }[]
  nextSlug?: string
}

export const CASE_STUDY_SLUGS = ['autozy', 'raahban', 'watches', 'alpr', 'tracking'] as const

export const CASE_STUDIES: Record<string, CaseStudy> = {
  autozy: {
    slug: 'autozy',
    type: 'web',
    title: 'Autozy',
    summary: 'A premium automotive platform with conversion-focused UX and a fast, modern frontend.',
    liveUrl: 'https://autozy.co',
    challenge:
      'Autozy needed a digital presence that matched the premium feel of their brand — fast load times, mobile-first design, and clear paths to inquiry without overwhelming visitors.',
    role: 'Lead frontend developer — architecture, UI implementation, animation system, and Vercel deployment.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    built: [
      {
        heading: 'Conversion-first landing experience',
        body: 'Designed and built a hero-to-CTA flow with staggered reveals, trust signals, and service cards that guide users toward contact — not just scroll.',
        image: '/projects/autozy.png',
      },
      {
        heading: 'Performance & SEO baseline',
        body: 'Implemented image optimization, semantic HTML, meta tags, and Core Web Vitals-friendly loading so the site ranks and feels instant on mobile.',
      },
    ],
    outcome: [
      { metric: 'Live', label: 'Production on autozy.co' },
      { metric: '<2s', label: 'Target LCP on mobile' },
      { metric: '100%', label: 'Responsive breakpoints' },
    ],
    nextSlug: 'raahban',
  },
  raahban: {
    slug: 'raahban',
    type: 'web',
    title: 'Raahban',
    summary: 'Full-stack web application with a polished interface and production-grade MERN architecture.',
    liveUrl: 'https://raahban.com',
    challenge:
      'The client needed a full-featured web app — not a template — with secure data handling, a scalable API layer, and an interface that feels trustworthy to end users.',
    role: 'Full-stack developer — React frontend, Node/Express API, MongoDB schema design, and deployment.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth'],
    built: [
      {
        heading: 'MERN application architecture',
        body: 'Built a modular API with authentication, role-based access patterns, and a React SPA that consumes REST endpoints with proper error and loading states.',
        image: '/projects/raahban.png',
      },
      {
        heading: 'UI that earns trust',
        body: 'Crafted a clean dashboard and public-facing pages with consistent typography, form validation, and responsive layouts across devices.',
      },
    ],
    outcome: [
      { metric: 'Live', label: 'Deployed at raahban.com' },
      { metric: 'MERN', label: 'Full-stack delivery' },
      { metric: 'Secure', label: 'Auth & API layer' },
    ],
    nextSlug: 'watches',
  },
  watches: {
    slug: 'watches',
    type: 'web',
    title: 'Watches Store (3D)',
    summary: 'An immersive 3D e-commerce experience showcasing products with Three.js and React.',
    liveUrl: 'https://watchs-gray.vercel.app',
    challenge:
      'Stand out in e-commerce with a memorable 3D product experience — without sacrificing performance or confusing the purchase path.',
    role: 'Frontend & 3D developer — Three.js scene, product interactions, cart flow, and Vercel deploy.',
    techStack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Vercel'],
    built: [
      {
        heading: '3D product showcase',
        body: 'Interactive 3D models with lighting, orbit controls, and smooth transitions between product views — keeping the experience premium, not gimmicky.',
        image: '/projects/watches.png',
      },
      {
        heading: 'E-commerce UX layer',
        body: 'Clear product info, pricing, and CTA placement so the 3D wow-factor supports conversion instead of distracting from it.',
      },
    ],
    outcome: [
      { metric: '3D', label: 'WebGL product viewer' },
      { metric: 'Live', label: 'Vercel deployment' },
      { metric: '60fps', label: 'Target frame rate' },
    ],
    nextSlug: 'alpr',
  },
  alpr: {
    slug: 'alpr',
    type: 'ai',
    title: 'License Plate Recognition (ALPR)',
    summary: 'End-to-end real-time plate detection, OCR, and validation from live camera feeds.',
    liveUrl: undefined,
    githubUrl: undefined,
    challenge:
      'Build a production-ready ALPR pipeline that detects plates in varied lighting, angles, and motion blur — then extracts and validates plate text in real time.',
    role: 'AI / CV engineer — model selection, training pipeline, inference optimization, and integration with camera streams.',
    techStack: ['YOLO', 'OpenCV', 'Python', 'OCR', 'Real-Time Inference', 'ONNX'],
    built: [
      {
        heading: 'Detection + OCR pipeline',
        body: 'Two-stage system: YOLO-based plate localization followed by OCR with post-processing rules for format validation and confidence filtering.',
      },
      {
        heading: 'Real-time performance',
        body: 'Optimized inference for live feeds with frame skipping strategies, GPU acceleration where available, and bounding-box overlay for monitoring.',
      },
    ],
    outcome: [
      { metric: 'Real-time', label: 'Live camera processing' },
      { metric: '95%+', label: 'Detection accuracy (clear conditions)' },
      { metric: '<50ms', label: 'Inference per frame (GPU)' },
    ],
    nextSlug: 'tracking',
  },
  tracking: {
    slug: 'tracking',
    type: 'ai',
    title: 'Real-Time Multi-Person Tracking',
    summary: 'Persistent ID tracking across multiple people in crowded, dynamic scenes.',
    liveUrl: undefined,
    githubUrl: undefined,
    challenge:
      'Track individuals consistently as they move, occlude each other, and enter/exit frame — maintaining stable IDs for analytics and security use cases.',
    role: 'Computer vision engineer — detection model tuning, DeepSORT integration, pipeline architecture, and performance profiling.',
    techStack: ['YOLO', 'DeepSORT', 'OpenCV', 'Python', 'Real-Time', 'CUDA'],
    built: [
      {
        heading: 'Detection + tracking fusion',
        body: 'YOLOv8 for person detection paired with DeepSORT for re-identification — handling occlusions and brief disappearances without ID swaps.',
      },
      {
        heading: 'Multi-camera ready architecture',
        body: 'Modular pipeline design supporting multiple input streams, configurable confidence thresholds, and exportable tracking data for downstream analytics.',
      },
    ],
    outcome: [
      { metric: '30+ FPS', label: 'On mid-range GPU' },
      { metric: 'Stable IDs', label: 'Across occlusions' },
      { metric: 'Multi-person', label: 'Crowded scene support' },
    ],
    nextSlug: 'autozy',
  },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug]
}

export function hasCaseStudy(slug: string): boolean {
  return CASE_STUDY_SLUGS.includes(slug as (typeof CASE_STUDY_SLUGS)[number])
}
