import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const balloonColors = ['#FF6B9D', '#FF69B4', '#FFB6D9', '#FF1493', '#FF00FF', '#E73C7E']

function Balloon() {
  const [balloonColor] = useState(balloonColors[Math.floor(Math.random() * balloonColors.length)])
  const [startX] = useState(Math.random() * window.innerWidth)
  const [duration] = useState(8 + Math.random() * 4)

  return (
    <motion.div
      className="fixed pointer-events-none cursor-pointer"
      style={{
        left: startX,
        bottom: -50,
        width: '40px',
        height: '50px',
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: window.innerHeight + 100,
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
      }}
      transition={{
        duration,
        ease: 'linear',
      }}
      onClick={(e) => {
        e.stopPropagation()
        // Balloon pop effect
        const confetti = document.createElement('div')
        confetti.innerHTML = '🎉'
        confetti.style.position = 'fixed'
        confetti.style.left = startX + 'px'
        confetti.style.top = (window.innerHeight - 200) + 'px'
        confetti.style.fontSize = '20px'
        confetti.className = 'confetti'
        document.body.appendChild(confetti)
        setTimeout(() => confetti.remove(), 3000)
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="40"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Balloon */}
        <circle cx="50" cy="35" r="30" fill={balloonColor} opacity="0.8" />
        <path
          d="M 50 65 Q 48 75 50 85"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Shine */}
        <circle cx="40" cy="25" r="8" fill="white" opacity="0.3" />
      </svg>
    </motion.div>
  )
}

function BalloonAnimation() {
  const [balloons, setBalloons] = useState([...Array(8)])

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, {}])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloons.map((_, i) => (
        <Balloon key={i} />
      ))}
    </div>
  )
}

export default BalloonAnimation