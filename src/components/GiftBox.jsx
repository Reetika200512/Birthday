import { motion } from 'framer-motion'
import { useState } from 'react'
import Confetti from 'react-confetti'

function GiftBox({ celebrate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setShowConfetti(true)
    celebrate?.()
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-100 to-pink-200 relative overflow-hidden flex items-center justify-center min-h-screen">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="max-w-2xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          A Special Gift For You 🎁
        </motion.h2>

        <motion.div
          className="flex justify-center"
          animate={!isOpen ? { y: [0, -20, 0] } : {}}
          transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
        >
          <motion.div
            className="gift-box cursor-pointer"
            onClick={handleOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {!isOpen ? (
              <div className="text-9xl">🎁</div>
            ) : (
              <div className="text-9xl animate-spin">🎉</div>
            )}
          </motion.div>
        </motion.div>

        <p className="text-center text-purple-900 text-lg font-bold mt-8">
          {isOpen ? '✨ Happy Birthday! ✨' : '👆 Click to open your gift!'}
        </p>

        {isOpen && (
          <motion.div
            className="mt-12 bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl text-gray-800 text-center leading-relaxed">
              <span className="text-3xl block mb-4">🎂 🎈 🎊</span>
              This gift is wrapped with all my love and warmest wishes for you. May every moment of your birthday be as special as you are. 
              <span className="text-2xl block mt-4">You deserve all the happiness in the world! 💖</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GiftBox