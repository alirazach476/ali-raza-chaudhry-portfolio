import { SOCIALS } from '../data/content'

const SITE_URL = 'https://github.com/alirazach476'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Raza Chaudhry',
    jobTitle: 'AI/ML Engineer | Data Scientist | Computer Vision | Generative AI',
    description:
      'AI/ML Engineer and Data Scientist building computer vision systems, generative AI agents, RAG apps, and full-stack products.',
    url: SITE_URL,
    email: 'alirazach1003@gmail.com',
    sameAs: [SOCIALS.linkedin, SOCIALS.github],
    knowsAbout: [
      'Computer Vision',
      'YOLO',
      'OpenCV',
      'PyTorch',
      'Machine Learning',
      'LangChain',
      'LangGraph',
      'RAG',
      'React',
      'FastAPI',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
