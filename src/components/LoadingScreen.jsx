import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setHidden(true), 1000)
    const timer2 = setTimeout(() => setRemoved(true), 1500)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  if (removed) return null

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="loader">
        <div className="loader-ring"></div>
        <span className="loader-text">Carregando...</span>
      </div>
    </div>
  )
}
