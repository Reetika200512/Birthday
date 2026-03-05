import { motion, AnimatePresence } from 'framer-motion'

function CelebrationSection({ celebrate, onBlowCandles, candlesBlown, candleVideoSrc }) {
  const resolvedCandleVideoSrc = candleVideoSrc || `${import.meta.env.BASE_URL}candle-blowing.mp4`
  const cakeImageSrc = `${import.meta.env.BASE_URL}cake-reference.jpeg`

  return (
    <section className="py-20 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden flex items-center justify-center min-h-screen">
      <div className="text-center space-y-8 relative z-10">
        <motion.div
          className="relative mx-auto w-fit rounded-3xl overflow-hidden border-4 border-rose-200 shadow-[0_18px_60px_rgba(236,72,153,0.35)]"
          style={{ perspective: 1200 }}
          animate={{ scale: [1, 1.02, 1], rotateX: [0, 2, 0], rotateY: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={cakeImageSrc}
            alt="Birthday cake"
            className="w-[280px] sm:w-[360px] md:w-[430px] h-auto object-cover"
          />

          <motion.button
            onClick={onBlowCandles}
            disabled={candlesBlown}
            className={`absolute top-3 right-3 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transition ${
              candlesBlown
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            }`}
            whileHover={candlesBlown ? {} : { scale: 1.06, y: -1 }}
            whileTap={candlesBlown ? {} : { scale: 0.96 }}
          >
            {candlesBlown ? 'Candles Blown' : 'Blow Candles'}
          </motion.button>

          {!candlesBlown && (
            <div className="absolute inset-x-0 top-3 flex justify-center gap-7 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={`flame-${i}`}
                  className="block w-4 h-8 rounded-full blur-[1px]"
                  style={{
                    background:
                      'radial-gradient(circle, #fff7c7 0%, #ffb454 55%, rgba(255,117,31,0) 100%)',
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
            {candlesBlown && (
              <>
                <motion.video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={resolvedCandleVideoSrc}
                  autoPlay
                  muted
                  playsInline
                  loop={false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.96 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                />
                <motion.div
                  className="absolute inset-x-0 top-4 flex justify-center gap-7 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={`smoke-${i}`}
                      className="block w-4 h-4 rounded-full bg-gray-200/80 blur-sm"
                      initial={{ y: 0, opacity: 0.7, scale: 0.6 }}
                      animate={{ y: -34, opacity: 0, scale: 1.7 }}
                      transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.4 }}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Make a Wish
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Close your eyes, make your wish, then blow out the candles.
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-pink-50 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {candlesBlown
            ? 'Candles are out. Wish locked in. This moment is magical.'
            : 'Candles are still glowing. Blow them to trigger the final moment.'}
        </motion.p>

        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={celebrate}
            className="confirm-btn bg-rose-500 hover:bg-rose-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Party Burst
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default CelebrationSection
