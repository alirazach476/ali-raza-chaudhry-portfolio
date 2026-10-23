import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { MagneticButton } from '../components/MagneticButton'
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

gsap.registerPlugin(ScrollTrigger)

function WebProjectCard({
  project,
}: {
  project:
    | (typeof WEB_PROJECTS)[0]
    | (typeof DATA_PROJECTS)[0]
    | (typeof GEN_AI_PROJECTS)[0]
}) {
  const caseStudy = hasCaseStudy(project.slug)
  const description = 'description' in project ? project.description : undefined
  const githubUrl = 'githubUrl' in project ? project.githubUrl : undefined

  const card = (
    <div className="portfolio-card glass h-full flex flex-col group">
      <div className="relative p-3 pb-0">
        <ProjectScreenshot
          slug={project.slug}
          name={project.name}
          url={project.url}
          gradient={project.gradient}
        />
        {caseStudy && (
          <span className="absolute top-5 left-5 z-10 px-2 py-0.5 rounded text-[9px] font-mono bg-base/90 text-violet border border-violet/30 backdrop-blur-sm">
            Case Study
          </span>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg md:text-xl mb-2 text-white leading-snug tracking-tight">
          {project.name}
        </h3>
        {description && (
          <p className="text-text-muted text-sm mb-4 leading-relaxed">{description}</p>
        )}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="portfolio-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="text-sm text-violet hover:text-cyan transition-colors font-medium"
              data-cursor-hover
            >
              Read case study →
            </Link>
          )}
          <MagneticButton
            as="a"
            href={project.url}
            variant="ghost"
            className="!px-0 !py-0 text-cyan hover:!text-cyan text-sm font-medium"
            strength={0.2}
          >
            View Live ↗
          </MagneticButton>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-white transition-colors font-medium"
              data-cursor-hover
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return <TiltCard className="h-full">{card}</TiltCard>
}

function AIProjectCard({
  project,
  onOpenVideo,
}: {
  project: (typeof AI_PROJECTS)[0]
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

  return (
    <div className="portfolio-card glass group text-text h-full flex flex-col">
      {hasVideo ? (
        <button
          type="button"
          className="relative block w-full text-left border-0 bg-transparent p-0 cursor-pointer"
          data-cursor-hover
          aria-label={`Watch ${project.name} demo video`}
          onClick={openDemo}
        >
          <AICardMedia
            name={project.name}
            slug={project.slug}
            image={project.image}
            video={project.video}
          />
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-cyan border border-cyan/30 pointer-events-none">
            CV
          </div>
          {caseStudy && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-violet border border-violet/30 pointer-events-none">
              Case Study
            </span>
          )}
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
          <AICardMedia
            name={project.name}
            slug={project.slug}
            image={project.image}
            video={project.video}
          />
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-cyan border border-cyan/30 pointer-events-none">
            CV
          </div>
          {caseStudy && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-violet border border-violet/30 pointer-events-none">
              Case Study
            </span>
          )}
        </a>
      )}

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {hasVideo ? (
          <button
            type="button"
            className="text-left border-0 bg-transparent p-0 cursor-pointer"
            data-cursor-hover
            onClick={openDemo}
          >
            <h3 className="font-display text-base md:text-lg mb-2 leading-snug text-white hover:text-cyan transition-colors">
              {project.name}
            </h3>
          </button>
        ) : (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            data-cursor-hover
          >
            <h3 className="font-display text-base md:text-lg mb-2 leading-snug text-white hover:text-cyan transition-colors">
              {project.name}
            </h3>
          </a>
        )}
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span key={tag} className="portfolio-tag text-cyan/85 border-cyan/20">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          {hasVideo && (
            <button
              type="button"
              onClick={openDemo}
              className="text-sm text-cyan hover:text-white transition-colors font-medium bg-transparent border-0 p-0 cursor-pointer"
              data-cursor-hover
            >
              Watch demo ▶
            </button>
          )}
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="text-sm text-violet hover:text-cyan transition-colors font-medium"
              data-cursor-hover
            >
              Read case study →
            </Link>
          )}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan hover:text-white transition-colors font-medium"
              data-cursor-hover
            >
              View on GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const webGridRef = useRef<HTMLDivElement>(null)
  const dataGridRef = useRef<HTMLDivElement>(null)
  const aiGridRef = useRef<HTMLDivElement>(null)
  const genAiGridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [openVideo, setOpenVideo] = useState<AIVideoOpen>(null)

  useEffect(() => {
    const animateGrid = (ref: { current: HTMLDivElement | null }) => {
      if (!ref.current || reduced) return
      const cards = ref.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    animateGrid(webGridRef)
    animateGrid(dataGridRef)
    animateGrid(aiGridRef)
    animateGrid(genAiGridRef)
  }, [reduced])

  return (
    <section id="projects" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Featured Projects"
          title="Products I've launched."
          subtitle="Web apps, data platforms, computer vision, and generative AI — with live demos you can open."
          className="!mb-2"
        />

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-violet" />
            Web Development
          </h3>
          <p className="text-text-muted text-sm ml-11">Interfaces that convert — live demos linked below.</p>
        </div>

        <div
          ref={webGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-10"
        >
          {WEB_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-amber-400/80" />
            Data Science & Data Engineering
          </h3>
          <p className="text-text-muted text-sm ml-11">
            Warehouse BI, forecasting, Bayesian modeling, and ML analytics dashboards.
          </p>
        </div>

        <div
          ref={dataGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-10"
        >
          {DATA_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl gradient-text-warm mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan" />
            Computer Vision
          </h3>
          <p className="text-text-muted text-sm ml-11">
            Beyond the browser — real-time systems that see.
          </p>
        </div>

        <div
          ref={aiGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10"
        >
          {AI_PROJECTS.map((project) => (
            <AIProjectCard
              key={project.slug}
              project={project}
              onOpenVideo={setOpenVideo}
            />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-fuchsia-400/80" />
            Generative AI
          </h3>
          <p className="text-text-muted text-sm ml-11">
            RAG agents, LLMs, and grounded document intelligence.
          </p>
        </div>

        <div
          ref={genAiGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {GEN_AI_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
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
