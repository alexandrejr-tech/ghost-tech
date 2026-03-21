import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ParticlesCanvas from './components/ParticlesCanvas'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import ServiceFunnel from './components/ServiceFunnel'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

function App() {
  const [funnelOpen, setFunnelOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const openFunnel = (service) => {
    setSelectedService(service)
    setFunnelOpen(true)
  }

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ParticlesCanvas />
      <Header />
      <main className="main">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Services onSelectService={openFunnel} />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ServiceFunnel
        isOpen={funnelOpen}
        onClose={() => setFunnelOpen(false)}
        selectedService={selectedService}
      />
    </>
  )
}

export default App
