export const PROFILE = {
  email: 'alirazach1003@gmail.com',
  stats: [
    { label: 'Projects Shipped', value: 40, suffix: '+' },
    { label: 'Live Sites', value: 15, suffix: '+' },
    { label: 'AI Systems Built', value: 20, suffix: '+' },
  ],
  bio: `I'm an AI/ML Engineer and Data Scientist who builds end-to-end systems — from computer vision pipelines that detect, track, and recognize in real time, to generative AI agents, RAG apps, and polished full-stack products. I work across Python, PyTorch, TensorFlow, OpenCV, YOLO, LangChain, LangGraph, FastAPI, React, and Next.js, shipping production-ready AI with measurable business impact.`,
  skills: [
    { name: 'Python / FastAPI', category: 'Backend' },
    { name: 'React / Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js / Express', category: 'Backend' },
    { name: 'YOLO / OpenCV', category: 'AI' },
    { name: 'PyTorch / TensorFlow', category: 'AI' },
    { name: 'LangChain / LangGraph', category: 'AI' },
    { name: 'RAG / AI Agents', category: 'AI' },
    { name: 'SQL / PostgreSQL', category: 'Backend' },
    { name: 'MediaPipe', category: 'AI' },
    { name: 'Docker / AWS', category: 'Tools' },
  ],
}

export const EXPERTISE = [
  {
    id: '01',
    title: 'Computer Vision',
    description:
      'Real-time detection, tracking, pose estimation, OCR, and recognition systems processing live video at production scale.',
    tags: ['YOLO', 'OpenCV', 'MediaPipe', 'ALPR', 'Tracking'],
  },
  {
    id: '02',
    title: 'AI / ML & Generative AI',
    description:
      'Training, evaluating, and deploying models — plus LLM agents, RAG pipelines, and LangGraph workflows that ship.',
    tags: ['PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG'],
  },
  {
    id: '03',
    title: 'Full-Stack Development',
    description:
      'End-to-end web products with secure APIs, polished UI, and production deployments across React, Next.js, and FastAPI.',
    tags: ['React', 'Next.js', 'FastAPI', 'Node.js', 'REST APIs'],
  },
  {
    id: '04',
    title: 'Data Science & Analytics',
    description:
      'EDA, statistical modeling, Bayesian analysis, time series forecasting, and dashboards that drive decisions.',
    tags: ['Pandas', 'Scikit-learn', 'R', 'Power BI', 'Tableau'],
  },
]

export const FEATURED_PROJECTS = [
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
    name: 'Smart Vehicle Gate Access',
    slug: 'alpr',
    url: 'https://automated-gate-access.vercel.app',
    tagline: 'LPD + VMMR automated gate access (FYP)',
    description:
      'License-plate detection and vehicle make/model recognition for automated gate access — engineered for reliable all-weather performance.',
    features: [
      'License plate detection & OCR pipeline',
      'Vehicle make/model recognition (VMMR)',
      'Production web dashboard for access control',
    ],
    tags: ['YOLO', 'OpenCV', 'OCR', 'React'],
    gradient: 'from-indigo/40 via-violet/30 to-pink/20',
    accent: 'rgba(34, 211, 238, 0.4)',
  },
]

export const WEB_PROJECTS = [
  {
    name: 'Crown and Dial',
    slug: 'crown',
    url: 'https://crown-and-dial.netlify.app',
    tags: ['React', 'E-commerce', 'Netlify'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
  },
  {
    name: 'Healthy Start NC',
    slug: 'healthystartnc',
    url: 'https://healthystartnc.com',
    tags: ['WordPress', 'PHP', 'CSS'],
    gradient: 'from-cyan/30 via-indigo/30 to-violet/20',
  },
  {
    name: 'Nyuton Enterprises',
    slug: 'nyuton',
    url: 'https://nyutonenterprises.com',
    tags: ['WordPress', 'PHP'],
    gradient: 'from-amber/20 via-violet/30 to-indigo/20',
  },
  {
    name: 'Watches Store (3D)',
    slug: 'watches',
    url: 'https://watchs-gray.vercel.app',
    tags: ['Three.js', 'React', 'Next.js'],
    gradient: 'from-violet/40 via-cyan/20 to-indigo/30',
  },
  {
    name: 'Fine Crafted Structures',
    slug: 'construction',
    url: 'https://constractioncompany.netlify.app',
    tags: ['Next.js', 'React', 'Netlify'],
    gradient: 'from-indigo/30 via-violet/30 to-cyan/20',
  },
  {
    name: 'Stepping Stones CRI',
    slug: 'steppingstone',
    url: 'https://steppingstoness.netlify.app',
    tags: ['React', 'CSS', 'Netlify'],
    gradient: 'from-pink/20 via-violet/30 to-indigo/20',
  },
  {
    name: 'FamLink',
    slug: 'famlink',
    url: 'https://famlink.care',
    tags: ['React', 'Full-Stack'],
    gradient: 'from-cyan/30 via-violet/20 to-indigo/30',
  },
  {
    name: 'NFT Marketplace',
    slug: 'nft',
    url: 'https://nftmarketplaece.netlify.app',
    tags: ['React', 'Web3 UI'],
    gradient: 'from-violet/30 via-pink/20 to-indigo/20',
  },
  {
    name: 'Revara Real Estate',
    slug: 'revara',
    url: 'https://hotel-web-chi-tan.vercel.app',
    tags: ['Next.js', 'React'],
    gradient: 'from-indigo/30 via-cyan/20 to-violet/20',
  },
]

export const AI_PROJECTS = [
  {
    name: 'AI Baseball Swing Analyzer',
    slug: 'baseball',
    description:
      'Pose estimation for pitcher & batter, swing-phase detection, mound/strike-zone tracking, and biomechanics scoring dashboard.',
    tags: ['MediaPipe', 'YOLO', 'Pose', 'Streamlit'],
    image: '/ai/baseball.jpg',
    video: '/ai/baseball.mp4',
  },
  {
    name: 'Cricket Match Analytics',
    slug: 'cricket',
    description:
      'YOLOv8 + OpenCV player/ball detection, pitch mapping, ball-speed analytics, and live field map overlays on broadcast footage.',
    tags: ['YOLOv8', 'OpenCV', 'Analytics'],
    image: '/ai/cricket.jpg',
    video: '/ai/cricket.mp4',
  },
  {
    name: 'Smart Football Analysis',
    slug: 'football',
    description:
      'Player/ball tracking, team classification, bird’s-eye minimap, and real-time speed/sprint estimation on match footage.',
    tags: ['YOLO', 'Tracking', 'Sports AI'],
    image: '/ai/football.jpg',
    video: '/ai/football.mp4',
  },
  {
    name: 'AI Golf Skeleton & Swing',
    slug: 'golf',
    description:
      'MediaPipe pose skeleton (30+ FPS), posture reference lines, and ball tracking for golf swing coaching feedback.',
    tags: ['MediaPipe', 'Pose', 'FastAPI'],
    image: '/ai/golf.jpg',
    video: '/ai/golf.mp4',
  },
  {
    name: 'License Plate + VMMR Gate Access',
    slug: 'alpr',
    description:
      'Automatic vehicle recognition with license-plate OCR, make/model classification, and weather-aware detection (AVRS).',
    tags: ['YOLO', 'OCR', 'ALPR', 'VMMR'],
    image: '/ai/alpr.jpg',
    video: '/ai/alpr.mp4',
  },
  {
    name: 'Vehicle Damage & Billing',
    slug: 'vehicle-damage',
    description:
      'Upload a vehicle photo, run damage detection, and generate an invoice in the Ali Vehicle Repair House billing app.',
    tags: ['YOLO', 'ONNX', 'Billing'],
    image: '/ai/vehicle-damage.jpg',
    video: '/ai/vehicle-damage.mp4',
  },
  {
    name: 'Medicine Detection & Pharmacy Billing',
    slug: 'medicine',
    description:
      'YOLOv11 medicine-box detection with live class counts for smart pharmacy / billing workflows.',
    tags: ['YOLOv11', 'Detection', 'Billing'],
    image: '/ai/medicine.jpg',
    video: '/ai/medicine.mp4',
  },
  {
    name: 'Mechanical Tools Detection',
    slug: 'mechanical-tools',
    description:
      'Real-time detection of hammers, wrenches, pliers, screwdrivers, and drills with confidence and size metrics.',
    tags: ['YOLO', 'OpenCV', 'Detection'],
    image: '/ai/mechanical-tools.jpg',
    video: '/ai/mechanical-tools.mp4',
  },
  {
    name: 'Multi-Person Tracking',
    slug: 'tracking',
    description:
      'Persistent ID tracking across multiple people with trajectory trails for crowded outdoor scenes.',
    tags: ['YOLOv8', 'DeepSORT', 'Real-Time'],
    image: '/ai/tracking.jpg',
    video: '/ai/tracking.mp4',
  },
  {
    name: 'Driver Safety Detection',
    slug: 'driver-safety',
    description:
      'In-cabin computer vision for seatbelt worn status and phone-usage distraction detection.',
    tags: ['YOLO', 'OpenCV', 'Safety'],
    image: '/ai/driver-safety.jpg',
    video: '/ai/driver-safety.mp4',
  },
]

export const TECH_STACK = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'],
  Backend: ['Python', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  'AI & ML': ['YOLO', 'OpenCV', 'MediaPipe', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG'],
  'Tools & Deploy': ['Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Linux', 'VS Code'],
}

export const MARQUEE_KEYWORDS = [
  'Python', 'YOLO', 'OpenCV', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG',
  'React', 'Next.js', 'FastAPI', 'MediaPipe', 'Computer Vision', 'AI Agents', 'Docker', 'AWS',
]

export const APPROACH = [
  {
    title: 'VISION THAT SHIPS.',
    body: 'Computer vision isn\'t a demo for me — it\'s production systems: detection, tracking, OCR, pose, and billing pipelines running on real camera feeds.',
  },
  {
    title: 'AGENTS THAT REASON.',
    body: 'I build LLM agents and RAG systems with LangChain and LangGraph — tool use, critique loops, multi-agent workflows, and grounded answers.',
  },
  {
    title: 'PRODUCTS THAT CONVERT.',
    body: 'From Clipzy to FamLink to construction and healthcare sites — I ship full-stack products clients can point to, not prototypes stuck on localhost.',
  },
]

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/ali-raza-chaudhry',
  github: 'https://github.com/alirazach476',
  whatsapp: 'https://wa.me/923226085459',
  whatsappDisplay: '+92 322 6085459',
}
