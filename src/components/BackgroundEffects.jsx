import { useEffect } from 'react'

function BackgroundEffects() {
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      sparkle.innerHTML = '✨'
      sparkle.style.left = Math.random() * window.innerWidth + 'px'
      sparkle.style.top = Math.random() * window.innerHeight + 'px'

      document.body.appendChild(sparkle)

      // Remove after animation
      setTimeout(() => sparkle.remove(), 2000)
    }

    const sparkleInterval = setInterval(createSparkle, 500)
    return () => clearInterval(sparkleInterval)
  }, [])

  return null
}

export default BackgroundEffects