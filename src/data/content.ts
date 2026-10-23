export const PROFILE = {
  email: 'alirazach1003@gmail.com',
  stats: [
    { label: 'Projects Shown', value: 34, suffix: '' },
    { label: 'Live Demos', value: 24, suffix: '' },
    { label: 'AI & CV Systems', value: 14, suffix: '' },
  ],
  bio: `I'm an AI/ML Engineer, Data Scientist, and Software Engineer who builds end-to-end systems — from computer vision pipelines that detect, track, and recognize in real time, to generative AI agents, RAG apps, and polished web products. I work across Python, PyTorch, TensorFlow, OpenCV, YOLO, LangChain, LangGraph, FastAPI, React, and Next.js.`,
  skills: [
    { name: 'Python / FastAPI', category: 'Backend' },
    { name: 'React / Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'YOLO / OpenCV', category: 'AI' },
    { name: 'PyTorch / TensorFlow', category: 'AI' },
    { name: 'LangChain / LangGraph', category: 'AI' },
    { name: 'RAG / AI Agents', category: 'AI' },
    { name: 'SQL / PostgreSQL', category: 'Backend' },
    { name: 'MediaPipe', category: 'AI' },
    { name: 'Docker / Vercel', category: 'Tools' },
  ],
}

export const EXPERTISE = [
  {
    id: '01',
    title: 'Programming & Core',
    description:
      'Strong foundations across languages and scientific Python — from algorithms and OOP to data wrangling and visualization.',
    tags: [
      'Python',
      'SQL',
      'R',
      'JavaScript',
      'C++',
      'DSA',
      'OOP',
      'Pandas',
      'NumPy',
      'Matplotlib',
    ],
  },
  {
    id: '02',
    title: 'Machine Learning',
    description:
      'Classical ML pipelines — feature engineering, model evaluation, and supervised/unsupervised methods used in my analytics demos.',
    tags: [
      'Scikit-learn',
      'XGBoost',
      'Feature Engineering',
      'Model Evaluation',
      'Classification',
      'Regression',
      'Clustering',
    ],
  },
  {
    id: '03',
    title: 'Deep Learning',
    description:
      'Neural networks for vision tasks — training, transfer learning, and deployment-ready model workflows.',
    tags: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'CNNs',
      'Transfer Learning',
      'Model Training',
      'Model Deployment',
    ],
  },
  {
    id: '04',
    title: 'Data Engineering',
    description:
      'ETL/ELT-style pipelines, warehouse-connected BI apps, data modeling, and validation for analytics dashboards.',
    tags: [
      'ETL/ELT',
      'Data Pipelines',
      'Data Modeling',
      'Data Warehousing',
      'Data Validation',
      'PostgreSQL',
    ],
  },
  {
    id: '05',
    title: 'Frontend & Backend',
    description:
      'Full-stack product engineering — polished UIs and secure APIs from React/Next.js to FastAPI and Node.',
    tags: [
      'HTML',
      'CSS',
      'React',
      'Next.js',
      'Tailwind',
      'TypeScript',
      'FastAPI',
      'Node.js',
      'REST APIs',
    ],
  },
  {
    id: '06',
    title: 'Databases',
    description:
      'SQL and PostgreSQL for analytics warehouses and application backends shown in my live demos.',
    tags: ['PostgreSQL', 'SQL'],
  },
  {
    id: '07',
    title: 'Analytics & Statistics',
    description:
      'From messy data to decisions — EDA, hypothesis testing, time series, and forecasting that stakeholders can act on.',
    tags: [
      'EDA',
      'Data Cleaning',
      'Statistical Analysis',
      'Hypothesis Testing',
      'Time Series',
      'Forecasting',
    ],
  },
  {
    id: '08',
    title: 'Computer Vision',
    description:
      'Real-time detection, tracking, pose, OCR, and edge deployment on camera feeds and demo apps.',
    tags: [
      'OpenCV',
      'Object Detection',
      'Object Tracking',
      'Pose Estimation',
      'OCR',
      'Image Classification',
      'YOLO',
      'MediaPipe',
      'Edge Deployment',
    ],
  },
  {
    id: '09',
    title: 'Generative AI',
    description:
      'LLM apps and agents — RAG, embeddings, and orchestration with LangChain and LangGraph on Streamlit demos.',
    tags: [
      'LLMs',
      'Prompt Engineering',
      'RAG',
      'Embeddings',
      'FAISS',
      'LangChain',
      'LangGraph',
      'AI Agents',
      'Streamlit',
      'Groq',
    ],
  },
  {
    id: '10',
    title: 'Tools & Deploy',
    description:
      'Shipping toolkit — version control, containers, notebooks, and hosting for demos and live apps.',
    tags: [
      'Git',
      'Docker',
      'Linux (basic)',
      'Jupyter',
      'Vercel',
      'Netlify',
      'Streamlit Cloud',
      'Cursor',
      'Excel',
    ],
  },
]

export const WEB_PROJECTS = [
  {
    name: 'Clipzy',
    slug: 'clipzy',
    url: 'https://clipzy.xynovix.com',
    description:
      'AI live-streaming & content studio — multi-guest recording, AI post-production (thumbnails, descriptions, tags), and one-click multi-platform publishing.',
    tags: ['Next.js', 'React', 'Node.js', 'AI APIs'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
  },
  {
    name: 'Smart Vehicle Gate Access',
    slug: 'alpr',
    url: 'https://automated-gate-access.vercel.app',
    description:
      'LPD + VMMR automated gate access dashboard — license-plate OCR, vehicle make/model recognition, and live allow/deny monitoring (FYP).',
    tags: ['YOLO', 'OpenCV', 'OCR', 'React'],
    gradient: 'from-indigo/40 via-violet/30 to-pink/20',
  },
  {
    name: 'Techlo Agency',
    slug: 'techlo',
    url: 'https://techloagenccy.netlify.app/',
    tags: ['Agency', 'React', 'Netlify'],
    gradient: 'from-cyan/30 via-violet/30 to-indigo/20',
  },
  {
    name: 'Westora Style',
    slug: 'westora',
    url: 'https://westorastyle.com',
    tags: ['E-commerce', 'Next.js', 'Tailwind CSS'],
    gradient: 'from-amber/20 via-violet/30 to-cyan/20',
  },
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
    tags: ['React', 'Three.js', 'React Three Fiber'],
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

export const DATA_PROJECTS = [
  {
    name: 'RideFlow Analytics',
    slug: 'rideflow',
    url: 'https://rideflow-analytics-eight.vercel.app/',
    description:
      'Executive ride BI on a live PostgreSQL warehouse — revenue trends, city performance, surge pricing, cancellations, and anomaly monitoring.',
    tags: ['PostgreSQL', 'BI', 'Analytics', 'Anomaly Detection'],
    gradient: 'from-cyan/30 via-violet/30 to-indigo/20',
  },
  {
    name: 'NovaBank Transaction Analytics',
    slug: 'novabank',
    url: 'https://banking-transaction-analytics.vercel.app/dashboard',
    description:
      'Warehouse-connected banking BI — channel volume, customer segments, branch performance, and a high-severity anomaly review queue.',
    tags: ['PostgreSQL', 'BI', 'Finance', 'Anomaly Detection'],
    gradient: 'from-indigo/40 via-cyan/20 to-violet/30',
  },
  {
    name: 'Pakistan E-commerce Analytics',
    slug: 'pk-ecommerce',
    url: 'https://pakistanecommerce.vercel.app/',
    description:
      'Full-funnel e-commerce BI in PKR — revenue, orders, AOV, category/province breakdowns, payments, logistics, and returns.',
    tags: ['BI', 'E-commerce', 'SQL', 'Dashboard'],
    gradient: 'from-violet/30 via-pink/20 to-cyan/20',
  },
  {
    name: 'AI Market Price Intelligence',
    slug: 'market-price',
    url: 'https://ai-market-price-analysis.vercel.app/',
    description:
      'Market intelligence platform for price analysis and competitive signal tracking across product markets.',
    tags: ['Python', 'Pricing', 'Analytics', 'BI'],
    gradient: 'from-amber/20 via-violet/30 to-indigo/20',
  },
  {
    name: 'Chicken Price Time Series BI',
    slug: 'time-series',
    url: 'https://time-series-analysis-zeta.vercel.app/',
    description:
      'ARIMA/SARIMA forecasting on wholesale chicken prices — model lab, holdout diagnostics, and 24-month outlook with confidence bands.',
    tags: ['ARIMA', 'SARIMA', 'R', 'Forecasting'],
    gradient: 'from-cyan/30 via-indigo/30 to-violet/20',
  },
  {
    name: 'Bayesian Military Aid Analysis',
    slug: 'bayesian-aid',
    url: 'https://bayesian-analysis.vercel.app/',
    description:
      'Hierarchical Bayesian models & Gibbs sampling on U.S. aid-to-Ukraine survey responses — DIC comparison and posterior predictive checks.',
    tags: ['Bayesian', 'MCMC', 'Gibbs', 'BI'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
  },
  {
    name: 'Bayesian Insurance Cost BI',
    slug: 'bayesian-insurance',
    url: 'https://real-world-dataset-bayesian-analysi.vercel.app/',
    description:
      'Bayesian linear regression on log(insurance charges) with interactive filters for smoker, region, sex, and BMI.',
    tags: ['Bayesian', 'MCMC', 'Regression', 'BI'],
    gradient: 'from-indigo/30 via-violet/30 to-pink/20',
  },
  {
    name: 'DDoS Detection BI',
    slug: 'ddos-bi',
    url: 'https://ddos-detection-bi.vercel.app/',
    description:
      'ML/DL DDoS detection on SDN flows — model leaderboard, confusion matrices, feature importances, and attack traffic profiling.',
    tags: ['Random Forest', 'CNN', 'ML', 'Cybersecurity'],
    gradient: 'from-pink/20 via-violet/30 to-cyan/20',
  },
]

export const AI_PROJECTS = [
  {
    name: 'AI Baseball Swing Analyzer',
    slug: 'baseball',
    url: 'https://github.com/alirazach476/ai-baseball-swing-analyzer',
    description:
      'Pose estimation for pitcher & batter, swing-phase detection, mound/strike-zone tracking, and biomechanics scoring dashboard.',
    tags: ['MediaPipe', 'YOLO', 'Pose', 'Streamlit'],
    image: '/ai/baseball.jpg',
    video: '/ai/baseball.mp4',
  },
  {
    name: 'Cricket Match Analytics',
    slug: 'cricket',
    url: 'https://github.com/alirazach476/Cricket-AI',
    description:
      'MetaDesk internship project — YOLOv8 + OpenCV player/ball detection, pitch mapping, ball-speed analytics, and live field map overlays on broadcast footage.',
    tags: ['YOLOv8', 'OpenCV', 'MetaDesk', 'Internship'],
    image: '/ai/cricket.jpg',
    video: '/ai/cricket.mp4',
  },
  {
    name: 'Smart Football Analysis',
    slug: 'football',
    url: 'https://github.com/alirazach476/Smart-Football-Analysis',
    description:
      'Player/ball tracking, team classification, bird’s-eye minimap, and real-time speed/sprint estimation on match footage.',
    tags: ['YOLO', 'Tracking', 'Sports AI'],
    image: '/ai/football.jpg',
    video: '/ai/football.mp4',
  },
  {
    name: 'UFC Vision AI',
    slug: 'ufc-vision',
    url: 'https://github.com/alirazach476/UFC-Analysis',
    description:
      'Real-time MMA fight analysis: fighter detection & pose skeletons, punch/kick/grapple counters, stance & balance metrics, range measurement, and octagon heatmaps.',
    tags: ['YOLO', 'Pose', 'Tracking', 'Sports AI'],
    image: '/ai/ufc-vision.jpg',
    video: '/ai/ufc-vision.mp4',
  },
  {
    name: 'AI Golf Skeleton & Swing',
    slug: 'golf',
    url: 'https://github.com/alirazach476/AI-GOLF-Skeleton',
    description:
      'MediaPipe pose skeleton (30+ FPS), posture reference lines, and ball tracking for golf swing coaching feedback.',
    tags: ['MediaPipe', 'Pose', 'FastAPI'],
    image: '/ai/golf.jpg',
    video: '/ai/golf.mp4',
  },
  {
    name: 'Automatic Vehicle Gate Access (FYP)',
    slug: 'alpr',
    url: 'https://github.com/alirazach476/Smart-Vehicle-Access-System-LPD-VMMR',
    description:
      'Edge-AI smart gate: YOLOv8n plate + character OCR, EfficientNet-B4 make/model, fog/rain/night preprocessing, dual-modality authorization, Orange Pi → React dashboard.',
    tags: ['YOLOv8n', 'EfficientNet', 'ALPR', 'VMMR', 'Edge AI'],
    image: '/ai/alpr.jpg',
    video: '/ai/alpr.mp4',
  },
  {
    name: 'Vehicle Damage & Billing',
    slug: 'vehicle-damage',
    url: 'https://github.com/alirazach476/vehicle-damage',
    description:
      'Upload a vehicle photo, run damage detection, and generate an invoice in the Ali Vehicle Repair House billing app.',
    tags: ['YOLO', 'ONNX', 'Billing'],
    image: '/ai/vehicle-damage.jpg',
    video: '/ai/vehicle-damage.mp4',
  },
  {
    name: 'Medicine Detection & Pharmacy Billing',
    slug: 'medicine',
    url: 'https://github.com/alirazach476/medicine-detection',
    description:
      'YOLOv11 medicine-box detection with live class counts for smart pharmacy / billing workflows.',
    tags: ['YOLOv11', 'Detection', 'Billing'],
    image: '/ai/medicine.jpg',
    video: '/ai/medicine.mp4',
  },
  {
    name: 'Mechanical Tools Detection',
    slug: 'mechanical-tools',
    url: 'https://github.com/alirazach476/mechanical-tools',
    description:
      'Real-time detection of hammers, wrenches, pliers, screwdrivers, and drills with confidence and size metrics.',
    tags: ['YOLO', 'OpenCV', 'Detection'],
    image: '/ai/mechanical-tools.jpg',
    video: '/ai/mechanical-tools.mp4',
  },
  {
    name: 'Multi-Person Tracking',
    slug: 'tracking',
    url: 'https://github.com/alirazach476/Multi-Person-Tracking',
    description:
      'Persistent ID tracking across multiple people with trajectory trails for crowded outdoor scenes.',
    tags: ['YOLOv8', 'DeepSORT', 'Real-Time'],
    image: '/ai/tracking.jpg',
    video: '/ai/tracking.mp4',
  },
  {
    name: 'Driving Hand-Signal Interpreter',
    slug: 'driver-safety',
    url: 'https://github.com/alirazach476/ai_driving_hand_signal',
    description:
      'MediaPipe hand-landmark interpreter that classifies driving hand signals from camera input for in-cabin assistive feedback.',
    tags: ['MediaPipe', 'OpenCV', 'Hand Landmarks'],
    image: '/ai/driver-safety.jpg',
    video: '/ai/driver-safety.mp4',
  },
]

export const GEN_AI_PROJECTS = [
  {
    name: 'DocuMind RAG',
    slug: 'documind-rag',
    url: 'https://documindrag.streamlit.app/',
    githubUrl: 'https://github.com/alirazach476/rag-document-qa-agent',
    description:
      'Retrieval-Augmented Generation agent for document Q&A — chunk, embed, and index PDFs/Markdown in FAISS, then answer with grounded citations via LangChain + Ollama, Groq, or OpenAI.',
    tags: ['LangChain', 'FAISS', 'RAG', 'Streamlit', 'Ollama'],
    gradient: 'from-violet/40 via-fuchsia/25 to-cyan/20',
  },
  {
    name: 'NovaMart Support Agent',
    slug: 'novamart-support',
    url: 'https://novamartsupport.streamlit.app/',
    githubUrl: 'https://github.com/alirazach476/llm-customer-support-agent',
    description:
      'LangGraph customer-support agent that classifies intent, grounds replies in a knowledge base, logs tickets, and escalates low-confidence or sensitive cases — powered by Groq.',
    tags: ['LangGraph', 'LangChain', 'Groq', 'Streamlit', 'Agents'],
    gradient: 'from-cyan/30 via-violet/35 to-fuchsia/20',
  },
  {
    name: 'Aether Knowledge',
    slug: 'aether-knowledge',
    url: 'https://aetherknowledge.streamlit.app/',
    githubUrl: 'https://github.com/alirazach476/multi-agent-knowledge-system',
    description:
      'LangGraph multi-agent RAG — a supervisor routes each question through Researcher, Analyst, and Writer agents over a FAISS knowledge base, with live step traces and cited answers.',
    tags: ['LangGraph', 'Multi-Agent', 'FAISS', 'RAG', 'Streamlit'],
    gradient: 'from-fuchsia/30 via-violet/35 to-indigo/25',
  },
]

export const TECH_STACK = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'],
  Backend: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL'],
  'AI & ML': ['YOLO', 'OpenCV', 'MediaPipe', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG'],
  'Tools & Deploy': ['Git', 'Docker', 'Vercel', 'Netlify', 'Streamlit Cloud', 'Linux', 'VS Code'],
}

export const MARQUEE_KEYWORDS = [
  'Python', 'YOLO', 'OpenCV', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'RAG',
  'React', 'Next.js', 'FastAPI', 'MediaPipe', 'Computer Vision', 'AI Agents', 'Docker', 'Vercel',
]

export const APPROACH = [
  {
    title: 'VISION THAT SHIPS.',
    body: 'Computer vision systems I can demo end-to-end — detection, tracking, OCR, pose, and billing pipelines on camera feeds and video.',
  },
  {
    title: 'AGENTS THAT REASON.',
    body: 'I build LLM agents and RAG systems with LangChain and LangGraph — retrieval, multi-agent routing, and grounded answers you can try live.',
  },
  {
    title: 'PRODUCTS THAT CONVERT.',
    body: 'From Clipzy to FamLink to construction and healthcare sites — full-stack web products with live demos, not prototypes stuck on localhost.',
  },
]

export const SITE_URL = 'https://ali-raza-chaudhry-portfolio.vercel.app'
export const GITHUB_PROFILE = 'https://github.com/alirazach476'
export const GITHUB_REPO = 'https://github.com/alirazach476/ali-raza-chaudhry-portfolio'

export const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/ali-raza-chaudhry-16a19a29b',
  github: GITHUB_PROFILE,
  whatsapp: 'https://wa.me/923226085459',
  whatsappDisplay: '+92 322 6085459',
}
