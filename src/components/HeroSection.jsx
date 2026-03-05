import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxStyle = {
    x: mousePosition.x * 0.02,
    y: mousePosition.y * 0.02,
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-bl from-pink-200 via-purple-200 to-blue-200 overflow-hidden flex items-center justify-center">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Birthday Message */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white glow-text mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉 Happy Birthday Spiti! 🎂
        </motion.h1>

        {/* Heartfelt Message */}
        <motion.div
          className="max-w-3xl mx-auto mt-8 bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-white leading-relaxed">
            <span className="text-2xl block mb-4">💖</span>
            Today is all about celebrating <span className="font-bold">you</span> — your smile, your kindness, and all the wonderful moments you bring into our lives. You're not just an amazing friend but someone who makes every day brighter.
          </p>
          <p className="text-base md:text-lg text-pink-100 leading-relaxed mt-6">
            May your birthday be filled with happiness, laughter, love, and unforgettable memories. Thank you for being such a special part of my life. 
          </p>
          <p className="text-3xl mt-6">✨💕🎉</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-white text-sm">✨ Scroll to explore ✨</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection