import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Cake3D({ onCelebrateCake, candlesBlown, cakeEffectTick }) {
  const [showSparkBurst, setShowSparkBurst] = useState(false)
  const [showSmoke, setShowSmoke] = useState(false)

  useEffect(() => {
    if (!cakeEffectTick) return
    setShowSparkBurst(true)
    const timer = setTimeout(() => setShowSparkBurst(false), 1200)
    return () => clearTimeout(timer)
  }, [cakeEffectTick])

  useEffect(() => {
    if (!candlesBlown) return
    setShowSmoke(true)
    const timer = setTimeout(() => setShowSmoke(false), 2200)
    return () => clearTimeout(timer)
  }, [candlesBlown])

  return (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        animate={showSparkBurst ? { scale: [1, 1.04, 1], rotate: [0, -1.1, 1.1, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border-4 border-rose-200 shadow-[0_20px_70px_rgba(236,72,153,0.35)] bg-black/40"
      >
        <img
          src="/cake-reference.jpeg"
          alt="Birthday cake with candles"
          className="w-[360px] sm:w-[460px] md:w-[560px] h-auto object-cover"
        />

        {!candlesBlown && (
          <div className="absolute inset-x-0 top-3 flex justify-center gap-10 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-5 h-10 rounded-full blur-[1px]"
                style={{
                  background: 'radial-gradient(circle, #fff7c7 0%, #ffb454 55%, rgba(255,117,31,0) 100%)',
                }}
                animate={{
                  scaleY: [1, 1.2, 0.95, 1.15, 1],
                  opacity: [0.9, 1, 0.78, 1],
                }}
                transition={{
                  duration: 0.9 + i * 0.12,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {showSmoke && (
            <motion.div
              className="absolute inset-x-0 top-6 flex justify-center gap-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={`smoke-${i}`}
                  className="block w-4 h-4 rounded-full bg-gray-200/80 blur-sm"
                  initial={{ y: 0, opacity: 0.7, scale: 0.6 }}
                  animate={{ y: -36, opacity: 0, scale: 1.8 }}
                  transition={{ duration: 1.2, delay: i * 0.08, repeat: 1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSparkBurst && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(16)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-yellow-200"
                  style={{ left: '50%', top: '52%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i / 16) * Math.PI * 2) * 160,
                    y: Math.sin((i / 16) * Math.PI * 2) * 120,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        onClick={onCelebrateCake}
        className="confirm-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        Celebrate the Cake
      </motion.button>
    </div>
  )
}

export default Cake3D
