import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function SpecialMessage() {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = `Dear Spiti,

As another year begins, I want you to know how much you mean to me. Your friendship has been a beacon of light in my life, and your kindness knows no bounds.

From the laughter we've shared to the moments we've overcome together, every memory with you is a treasure I hold close to my heart.

Today, we celebrate you — not just your birthday, but the incredible person you are every single day. Your warmth, your compassion, and your infectious spirit make the world a brighter place.

May this year bring you endless joy, adventures, and dreams coming true. Thank you for being the extraordinary friend that you are.

With all my love,
Your Friend 💖`

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index))
        index++
      }
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-pink-100 to-purple-100 relative overflow-hidden">
      {/* Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: -window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          💕
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          A Special Message For Spiti 💖
        </motion.h2>

        <motion.div
          className="bg-white/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-wrap font-poppins">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        {/* Decorative Sparkles */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-3xl"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            className="text-3xl"
          >
            💫
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            className="text-3xl"
          >
            ⭐
          </motion.span>
        </div>
      </div>
    </section>
  )
}

export default SpecialMessage