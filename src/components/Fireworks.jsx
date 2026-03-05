import { useEffect } from 'react'

function Fireworks() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      // Trigger at 90% scroll
      if (scrollTop / docHeight > 0.9) {
        createFireworks()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const createFireworks = () => {
    const fireworks = ['🎆', '🎇', '✨', '⭐', '💥']

    for (let i = 0; i < 30; i++) {
      const spark = document.createElement('div')
      spark.innerHTML = fireworks[Math.floor(Math.random() * fireworks.length)]
      spark.style.position = 'fixed'
      spark.style.left = Math.random() * window.innerWidth + 'px'
      spark.style.top = window.innerHeight + 'px'
      spark.style.fontSize = '24px'
      spark.style.pointerEvents = 'none'
      spark.style.animation = `rise ${2 + Math.random() * 2}s ease-out forwards`
      document.body.appendChild(spark)

      setTimeout(() => spark.remove(), 4000)
    }
  }

  return null
}

export default Fireworks