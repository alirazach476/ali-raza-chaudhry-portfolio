import { SOCIALS } from '../data/content'

const SITE_URL = 'https://abdullahyaseen.dev'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdullah Yaseen',
    jobTitle: 'Full-Stack Developer & AI / Computer Vision Engineer',
    description:
      'I build interfaces that convert — and AI that sees. Full-stack web development and real-time computer vision systems.',
    url: SITE_URL,
    email: 'abdullahyaseen6500@gmail.com',
    sameAs: [SOCIALS.linkedin, SOCIALS.github],
    knowsAbout: [
      'React',
      'TypeScript',
      'Computer Vision',
      'YOLO',
      'OpenCV',
      'Node.js',
      'Machine Learning',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
