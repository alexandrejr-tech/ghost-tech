import { useEffect, useRef } from 'react'

export default function About() {
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

  const scrollTo = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const headerHeight = document.getElementById('header')?.offsetHeight || 80
      window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll" data-animation="fade-up">
          <span className="section__subtitle">Conheça</span>
          <h2 className="section__title">Sobre <span className="text-gradient">Mim</span></h2>
        </div>

        <div className="about__container">
          <div className="about__image animate-on-scroll" data-animation="fade-right">
            <div className="about__image-wrapper">
              <img src="/assets/images/img-perfil.jpeg" alt="Sobre Alexandre Junior" className="about__img" loading="lazy" />
              <div className="about__image-decoration"></div>
            </div>
            <div className="about__experience-badge">
              <span className="badge__number">2+</span>
              <span className="badge__text">Anos de<br/>Experiência</span>
            </div>
          </div>

          <div className="about__content">
            <p className="about__description animate-on-scroll" data-animation="fade-up">
              Sou o <strong>Alexandre Junior</strong>, <strong>Desenvolvedor Full-Stack</strong> com 2 anos de experiência
              construindo aplicações web completas, do front-end ao back-end.
            </p>
            <p className="about__description animate-on-scroll" data-animation="fade-up" data-delay="100">
              Na <strong>ODuo Assessoria</strong>, desenvolvi 60+ projetos web — entre landing pages, sites institucionais,
              dashboards e ferramentas internas — além de 8+ automações via N8N que reduziram operações manuais em 60%.
              Tenho formação complementar em Gestão de Projetos (MBA), que agrega visão estratégica ao desenvolvimento,
              sempre com foco em soluções digitais orientadas a resultado.
            </p>

            <div className="about__info animate-on-scroll" data-animation="fade-up" data-delay="200">
              <div className="about__info-item">
                <span className="info__number">60+</span>
                <span className="info__title">Projetos<br/>Entregues</span>
              </div>
              <div className="about__info-item">
                <span className="info__number">2</span>
                <span className="info__title">Empresas em que<br/>Atuei</span>
              </div>
              <div className="about__info-item">
                <span className="info__number">10+</span>
                <span className="info__title">Tecnologias<br/>Dominadas</span>
              </div>
            </div>

            <div className="about__specialties animate-on-scroll" data-animation="fade-up" data-delay="300">
              <h3 className="specialties__title">Especialidades:</h3>
              <div className="specialties__tags">
                {['React.js', 'Node.js', 'JavaScript', 'PHP', 'PostgreSQL', 'N8N', 'Git / GitHub', 'REST APIs', 'HTML / CSS'].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn btn--primary animate-on-scroll" data-animation="fade-up" data-delay="400" onClick={(e) => scrollTo(e, 'contact')}>
              <span>Vamos Conversar</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
