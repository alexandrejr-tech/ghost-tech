import { useEffect, useRef } from 'react'
import { experiences } from '../data/experiences'

export default function Experience() {
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
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll" data-animation="fade-up">
          <span className="section__subtitle">Minha Trajetória</span>
          <h2 className="section__title">Experiência <span className="text-gradient">Profissional</span></h2>
        </div>

        <div className="experience__timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="timeline__item animate-on-scroll"
              data-animation="fade-up"
              data-delay={index * 100}
            >
              <div className="timeline__marker">
                <span className={`marker__dot${exp.isCurrent ? ' current' : ''}`}></span>
              </div>
              <div className="timeline__content">
                <div className="timeline__header">
                  <span className="timeline__date">{exp.date}</span>
                  {exp.isCurrent && <span className="timeline__badge">Atual</span>}
                </div>
                <h3 className="timeline__title">{exp.title}</h3>
                <h4 className="timeline__company">{exp.company}</h4>
                <p className="timeline__description">{exp.description}</p>
                <ul className="timeline__achievements">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
                <div className="timeline__tech">
                  {exp.tech.map(t => (
                    <span key={t} className="tech__tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
