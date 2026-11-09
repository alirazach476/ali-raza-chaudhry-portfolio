import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { AICardMedia } from '../components/AICardMedia'
import { ProjectScreenshot } from '../components/ProjectScreenshot'
import { VideoLightbox } from '../components/VideoLightbox'
import {
  WEB_PROJECTS,
  DATA_PROJECTS,
  AI_PROJECTS,
  GEN_AI_PROJECTS,
} from '../data/content'
import { hasCaseStudy } from '../data/caseStudies'
import { useReducedMotion } from '../hooks/useReducedMotion'

type AIVideoOpen = { src: string; title: string; poster?: string } | null
type CategoryId = 'data' | 'web' | 'cv' | 'genai'
type Filter = 'all' | CategoryId
type WebCardProject =
  | (typeof WEB_PROJECTS)[0]
  | (typeof DATA_PROJECTS)[0]
  | (typeof GEN_AI_PROJECTS)[0]

interface Category {
  id: CategoryId
  /** Short label used on the filter chip and card eyebrow. */
  label: string
  title: string
  blurb: string
  color: string
  count: number
}

// Order here is the order on the page (and on the filter bar).
const CATEGORIES: Category[] = [
  {
    id: 'data',
    label: 'Data Science',
    title: 'Data Science & Data Engineering',
    blurb: 'Lakehouses, statistics, ML models and analytics dashboards on real data.',
    color: '#f59e0b',
    count: DATA_PROJECTS.length,
  },
  {
    id: 'web',
    label: 'Web Development',
    title: 'Web Development',
    blurb: 'Interfaces that convert — live demos linked below.',
    color: '#a78bfa',
    count: WEB_PROJECTS.length,
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    title: 'Computer Vision',
    blurb: 'Beyond the browser — real-time systems that see.',
    color: '#22d3ee',
    count: AI_PROJECTS.length,
  },
  {
    id: 'genai',
    label: 'Generative AI',
    title: 'Generative AI',
    blurb: 'RAG agents, LLMs, and grounded document intelligence.',
    color: '#e879f9',
    count: GEN_AI_PROJECTS.length,
  },
]

const ALL_COUNT = CATEGORIES.reduce((sum, c) => sum + c.count, 0)

const catStyle = (color: string) => ({ '--cat': color }) as CSSProperties

function Reveal({
  index,
  reduced,
  children,
}: {
  index: number
  reduced: boolean
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="h-full"
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.07 }}
    >
      {children}
    </motion.div>
  )
}

function CardEyebrow({ category, caseStudy }: { category: Category; caseStudy: boolean }) {
  return (
    <div className="project-card-eyebrow">
      <span className="project-card-category">
        <span className="project-card-dot" aria-hidden="true" />
        {category.label}
      </span>
      {caseStudy && <span className="project-card-case">Case Study</span>}
    </div>
  )
}

function CardTags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="project-card-tags">
      {tags.map((tag) => (
        <li key={tag} className="project-card-tag">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function WebProjectCard({
  project,
  category,
}: {
  project: WebCardProject
  category: Category
}) {
  const caseStudy = hasCaseStudy(project.slug)
  const description = 'description' in project ? project.description : undefined
  const githubUrl = 'githubUrl' in project ? project.githubUrl : undefined

  return (
    <article className="project-card group" style={catStyle(category.color)}>
      <div className="project-card-media">
        <ProjectScreenshot
          slug={project.slug}
          name={project.name}
          url={project.url}
          gradient={project.gradient}
        />
      </div>

      <div className="project-card-body">
        <CardEyebrow category={category} caseStudy={caseStudy} />
        <h3 className="project-card-title">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
          >
            {project.name}
            <span className="project-card-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </h3>
        {description && <p className="project-card-desc">{description}</p>}
        <CardTags tags={project.tags} />
        <div className="project-card-actions">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-cta"
            data-cursor-hover
          >
            View live ↗
          </a>
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="project-card-link"
              data-cursor-hover
            >
              Case study →
            </Link>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              data-cursor-hover
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function AIProjectCard({
  project,
  category,
  onOpenVideo,
}: {
  project: (typeof AI_PROJECTS)[0]
  category: Category
  onOpenVideo: (payload: NonNullable<AIVideoOpen>) => void
}) {
  const caseStudy = hasCaseStudy(project.slug)
  const projectUrl = 'url' in project ? project.url : undefined
  const hasVideo = Boolean(project.video)

  const openDemo = () => {
    if (!project.video) return
    onOpenVideo({
      src: project.video,
      title: project.name,
      poster: project.image,
    })
  }

  const media = (
    <AICardMedia
      name={project.name}
      slug={project.slug}
      image={project.image}
      video={project.video}
    />
  )

  return (
    <article className="project-card group" style={catStyle(category.color)}>
      <div className="project-card-media">
        {hasVideo ? (
          <button
            type="button"
            className="relative block w-full text-left border-0 bg-transparent p-0 cursor-pointer"
            data-cursor-hover
            aria-label={`Watch ${project.name} demo video`}
            onClick={openDemo}
          >
            {media}
            <span className="ai-video-play-hint pointer-events-none">▶ Watch</span>
          </button>
        ) : (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block no-underline"
            data-cursor-hover
            aria-label={`Open ${project.name} on GitHub`}
          >
            {media}
          </a>
        )}
      </div>

      <div className="project-card-body">
        <CardEyebrow category={category} caseStudy={caseStudy} />
        <h3 className="project-card-title">
          {hasVideo ? (
            <button
              type="button"
              className="project-card-title-btn"
              data-cursor-hover
              onClick={openDemo}
            >
              {project.name}
              <span className="project-card-arrow" aria-hidden="true">
                ▶
              </span>
            </button>
          ) : (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" data-cursor-hover>
              {project.name}
              <span className="project-card-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </h3>
        <p className="project-card-desc">{project.description}</p>
        <CardTags tags={project.tags} />
        <div className="project-card-actions">
          {hasVideo && (
            <button
              type="button"
              onClick={openDemo}
              className="project-card-cta"
              data-cursor-hover
            >
              Watch demo ▶
            </button>
          )}
          {!hasVideo && projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-cta"
              data-cursor-hover
            >
              View on GitHub ↗
            </a>
          )}
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="project-card-link"
              data-cursor-hover
            >
              Case study →
            </Link>
          )}
          {hasVideo && projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              data-cursor-hover
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('all')
  const [openVideo, setOpenVideo] = useState<AIVideoOpen>(null)
  const gridsRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  // After switching filters the page height changes; if the reader was scrolled
  // deep into the list, bring them back to the top of the results.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = gridsRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 150
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' })
  }, [filter])

  const visible = filter === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter)

  const chips: { id: Filter; label: string; color: string; count: number }[] = [
    { id: 'all', label: 'All projects', color: '#818cf8', count: ALL_COUNT },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label, color: c.color, count: c.count })),
  ]

  const renderGrid = (category: Category) => {
    switch (category.id) {
      case 'data':
        return DATA_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} index={i} reduced={reduced}>
            <WebProjectCard project={p} category={category} />
          </Reveal>
        ))
      case 'web':
        return WEB_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} index={i} reduced={reduced}>
            <WebProjectCard project={p} category={category} />
          </Reveal>
        ))
      case 'cv':
        return AI_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} index={i} reduced={reduced}>
            <AIProjectCard project={p} category={category} onOpenVideo={setOpenVideo} />
          </Reveal>
        ))
      case 'genai':
        return GEN_AI_PROJECTS.map((p, i) => (
          <Reveal key={p.slug} index={i} reduced={reduced}>
            <WebProjectCard project={p} category={category} />
          </Reveal>
        ))
    }
  }

  return (
    <section id="projects" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Featured Projects"
          title="Products I've launched."
          subtitle="Data platforms, web apps, computer vision, and generative AI — with live demos you can open."
          className="!mb-5"
        />

        <div className="project-filter-wrap">
          <div className="project-filter" role="group" aria-label="Filter projects by type">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className="project-filter-chip"
                style={catStyle(chip.color)}
                aria-pressed={filter === chip.id}
                data-cursor-hover
                onClick={() => setFilter(chip.id)}
              >
                <span className="project-filter-dot" aria-hidden="true" />
                {chip.label}
                <span className="project-filter-count">{chip.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={gridsRef}>
          {visible.map((category) => (
            <div key={`${filter}-${category.id}`} className="project-group">
              <div className="project-group-head" style={catStyle(category.color)}>
                <h3 className="project-group-title">
                  <span className="project-group-line" aria-hidden="true" />
                  {category.title}
                  <span className="project-group-count">{category.count}</span>
                </h3>
                <p className="project-group-blurb">{category.blurb}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {renderGrid(category)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {openVideo && (
        <VideoLightbox
          src={openVideo.src}
          title={openVideo.title}
          poster={openVideo.poster}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  )
}
