import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function Portfolio() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => entry.target.classList.add('animated'), delay)
          }
        })
      },
      { threshold: 0.1 }
    )
    sectionRef.current.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="portfolio section" id="portfolio" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll" data-animation="fade-up">
          <span className="section__subtitle">Meu Trabalho</span>
          <h2 className="section__title">Projetos em <span className="text-gradient">Destaque</span></h2>
        </div>

        <div className="portfolio__grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project__card animate-on-scroll"
              data-animation="fade-up"
              data-delay={index * 100}
            >
              <div className="project__image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project__overlay">
                  <div className="project__links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project__link" aria-label="Ver código no GitHub">
                      <GitHubIcon />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project__link" aria-label="Ver demo do projeto">
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </div>
              <div className="project__content">
                <h3 className="project__title">{project.title}</h3>
                <p className="project__description">{project.description}</p>
                <div className="project__tech">
                  {project.tech.map(t => (
                    <span key={t} className="tech__tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
