import { useState, useEffect } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)

      const sections = document.querySelectorAll('section[id]')
      const scrollY = window.pageYOffset

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight
        const sectionTop = section.offsetTop - 150
        const sectionId = section.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    closeMenu()
    const target = document.getElementById(sectionId)
    if (target) {
      const headerHeight = document.getElementById('header')?.offsetHeight || 80
      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu()
    }
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('#nav-menu') && !e.target.closest('#nav-toggle')) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEsc)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Projetos' },
    { id: 'services', label: 'Serviços' },
    { id: 'experience', label: 'Experiência' },
    { id: 'contact', label: 'Contato' }
  ]

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <nav className="nav" aria-label="Navegação principal">
        <a href="#home" className="nav__logo" aria-label="Ir para o início" onClick={(e) => handleNavClick(e, 'home')}>
          <img src="/assets/images/logo-ghost-transparente.png" alt="Alexandre Junior Logo" className="logo-img" />
        </a>

        <div className={`nav__menu${menuOpen ? ' show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            {navItems.map(item => (
              <li key={item.id} className="nav__item">
                <a
                  href={`#${item.id}`}
                  className={`nav__link${activeSection === item.id ? ' active' : ''}`}
                  data-section={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button className="nav__close" onClick={closeMenu} aria-label="Fechar menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <button
          className={`nav__toggle${menuOpen ? ' active' : ''}`}
          onClick={openMenu}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger"></span>
        </button>
      </nav>
    </header>
  )
}
