import { useEffect, useRef } from 'react'
import { services } from '../data/services'

const serviceIcons = {
  landing: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  site: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  system: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
      <line x1="14" y1="4" x2="10" y2="20"/>
    </svg>
  ),
  automation: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}

export default function Services({ onSelectService }) {
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
    <section className="services section" id="services" ref={sectionRef}>
      <div className="container">
        <div className="section__header animate-on-scroll" data-animation="fade-up">
          <span className="section__subtitle">O Que Eu Ofereço</span>
          <h2 className="section__title">Meus <span className="text-gradient">Serviços</span></h2>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service__card animate-on-scroll"
              data-animation="fade-up"
              data-delay={index * 100}
            >
              <div className="service__icon">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="service__title">{service.title}</h3>
              <span className="service__subtitle">{service.subtitle}</span>
              <p className="service__description">{service.description}</p>
              <ul className="service__features">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="service__footer">
                <div>
                  <span className="service__price">{service.price}</span>
                  <br />
                  <span className="service__deadline">{service.deadline}</span>
                </div>
              </div>
              <button
                className="service__cta"
                onClick={() => onSelectService(service)}
              >
                <span>Solicitar Orçamento</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
