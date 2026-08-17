import { SOCIALS } from '../data/content'

const SITE_URL = 'https://abdullahyaseen.dev'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdullah Yaseen',
    jobTitle: 'Full-Stack Developer & AI / Python Engineer',
    description:
      'Full-Stack Developer and AI / Python Engineer who ships production-grade SaaS from idea to deploy. Founder of 2 launched SaaS products.',
    url: SITE_URL,
    email: 'abdullahyaseen6500@gmail.com',
    telephone: '+92 319 2560463',
    sameAs: [SOCIALS.linkedin, SOCIALS.github],
    alumniOf: 'COMSATS University, Lahore',
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'AI Automation',
      'Computer Vision',
      'SaaS Development',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
