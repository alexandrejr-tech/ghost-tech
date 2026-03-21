import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    const onMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }
      if (follower) {
        setTimeout(() => {
          follower.style.left = `${e.clientX}px`
          follower.style.top = `${e.clientY}px`
        }, 100)
      }
    }

    const onMouseEnterInteractive = () => {
      if (follower) follower.classList.add('expand')
    }
    const onMouseLeaveInteractive = () => {
      if (follower) follower.classList.remove('expand')
    }

    document.addEventListener('mousemove', onMouseMove)

    const addInteractiveListeners = () => {
      const elements = document.querySelectorAll('a, button, .project__card, .filter__btn, .social-link, input, textarea, .service__card')
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    // Delay to ensure DOM is ready
    setTimeout(addInteractiveListeners, 2000)

    const onDocLeave = () => {
      if (cursor) cursor.style.opacity = '0'
      if (follower) follower.style.opacity = '0'
    }
    const onDocEnter = () => {
      if (cursor) cursor.style.opacity = '1'
      if (follower) follower.style.opacity = '1'
    }

    document.addEventListener('mouseleave', onDocLeave)
    document.addEventListener('mouseenter', onDocEnter)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onDocLeave)
      document.removeEventListener('mouseenter', onDocEnter)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} aria-hidden="true"></div>
      <div className="cursor-follower" ref={followerRef} aria-hidden="true"></div>
    </>
  )
}
