import { useEffect, useRef } from 'react'
import { skillCategories } from '../data/skills'

export default function Skills() {
  const sectionRef = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const animObserver = new IntersectionObserver(
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
    sectionRef.current.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el))

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated.current) {
            const bars = sectionRef.current.querySelectorAll('.skill__progress')
            bars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.width = `${bar.dataset.progress}%`
              }, index * 100)
            })
            animated.current = true
          }
        })
      },
      { threshold: 0.3 }
    )
    skillObserver.observe(sectionRef.current)

    return () => { animObserver.disconnect(); skillObserver.disconnect() }
  }, [])

  const icons = {
    frontend: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    backend: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  }

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll" data-animation="fade-up">
          <span className="section__subtitle">Minhas Habilidades</span>
          <h2 className="section__title">Skills & <span className="text-gradient">Competências</span></h2>
        </div>

        <div className="skills__container">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="skills__category animate-on-scroll"
              data-animation="fade-up"
              data-delay={catIndex * 100}
            >
              <div className="category__header">
                <div className="category__icon">{icons[category.icon]}</div>
                <h3 className="category__title">{category.title}</h3>
              </div>
              <div className="skills__list">
                {category.skills.map(skill => (
                  <div key={skill.name} className="skill__item">
                    <div className="skill__info">
                      <span className="skill__name">{skill.name}</span>
                      <span className="skill__percentage">{skill.percentage}%</span>
                    </div>
                    <div className="skill__bar">
                      <div className="skill__progress" data-progress={skill.percentage}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
