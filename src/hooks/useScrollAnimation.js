import { useEffect, useRef } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add('animated')
            }, delay)
          }
        })
      },
      { threshold: options.threshold || 0.1 }
    )

    const elements = element.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

export function useSkillsAnimation() {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            const bars = element.querySelectorAll('.skill__progress')
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

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
