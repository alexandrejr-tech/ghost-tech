import { useEffect, useRef } from 'react'

export default function ParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId = null
    let particles = []
    const mouse = { x: null, y: null }

    const config = {
      particleCount: 50,
      particleColor: 'rgba(255, 215, 0, 0.5)',
      lineColor: 'rgba(255, 215, 0, 0.1)',
      particleSize: 2,
      maxSpeed: 0.5,
      connectionDistance: 150,
      mouseRadius: 100
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      createParticles()
    }

    const createParticles = () => {
      const count = window.innerWidth < 768 ? config.particleCount / 2 : config.particleCount
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.maxSpeed,
          vy: (Math.random() - 0.5) * config.maxSpeed,
          size: Math.random() * config.particleSize + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        if (mouse.x && mouse.y) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < config.mouseRadius) {
            const force = (config.mouseRadius - distance) / config.mouseRadius
            particle.x -= dx * force * 0.02
            particle.y -= dy * force * 0.02
          }
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = config.particleColor.replace('0.5', particle.opacity)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < config.connectionDistance) {
            const opacity = 1 - (distance / config.connectionDistance)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = config.lineColor.replace('0.1', opacity * 0.1)
            ctx.stroke()
          }
        }
      })
    }

    resize()

    let lastMove = 0
    const onMouseMove = (e) => {
      const now = Date.now()
      if (now - lastMove > 16) {
        mouse.x = e.clientX
        mouse.y = e.clientY
        lastMove = now
      }
    }
    const onMouseLeave = () => { mouse.x = null; mouse.y = null }
    const onVisChange = () => {
      if (document.hidden) {
        if (animationId) cancelAnimationFrame(animationId)
      } else {
        animate()
      }
    }

    window.addEventListener('resize', resize)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisChange)

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisChange)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true"></canvas>
}
