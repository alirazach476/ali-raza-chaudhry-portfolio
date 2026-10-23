import { SOCIALS, SITE_URL } from '../data/content'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ali Raza Chaudhry',
    jobTitle: 'AI/ML Engineer · Data Scientist · Software Engineer',
    description:
      'AI/ML Engineer, Data Scientist, and Software Engineer building computer vision systems, generative AI agents, RAG apps, and web products.',
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
