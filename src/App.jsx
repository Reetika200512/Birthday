import { useState } from 'react'
import Confetti from 'react-confetti'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Cake3D from './components/Cake3D'
import BalloonAnimation from './components/BalloonAnimation'
import BackgroundEffects from './components/BackgroundEffects'
import Fireworks from './components/Fireworks'
import MusicToggle from './components/MusicToggle'
import SpecialMessage from './components/SpecialMessage'
import GiftBox from './components/GiftBox'
import CelebrationSection from './components/CelebrationSection'
import AlbumSlideshow from './components/AlbumSlideshow'
import './index.css'

const JOURNEY_STEPS = [
  { key: 'lights', path: '/lights', label: 'Lights' },
  { key: 'room', path: '/room', label: 'Room' },
  { key: 'cake', path: '/cake', label: 'Cake' },
  { key: 'music', path: '/music', label: 'Music' },
  { key: 'wish', path: '/wish', label: 'Wish' },
  { key: 'message', path: '/message', label: 'Message' },
  { key: 'gift', path: '/gift', label: 'Gift' },
  { key: 'albums', path: '/albums', label: 'Albums' },
]

function JourneyPage({
  showConfetti,
  celebrate,
  handleCelebrateCake,
  handleBlowCandles,
  candlesBlown,
  cakeEffectTick,
}) {
  const candleVideoSrc = `${import.meta.env.BASE_URL}candle-blowing.mp4`
  const navigate = useNavigate()
  const { stage } = useParams()
  const [albumAudioActive, setAlbumAudioActive] = useState(false)
  const currentIndex = JOURNEY_STEPS.findIndex((step) => step.key === stage)

  if (currentIndex === -1) {
    return <Navigate to="/lights" replace />
  }

  const prevIndex = currentIndex === 0 ? JOURNEY_STEPS.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === JOURNEY_STEPS.length - 1 ? 0 : currentIndex + 1

  const goPrev = () => navigate(JOURNEY_STEPS[prevIndex].path)
  const goNext = () => navigate(JOURNEY_STEPS[nextIndex].path)
  const currentStep = JOURNEY_STEPS[currentIndex]

  const isIntro = stage === 'lights'
  const backgroundClass = isIntro
    ? 'bg-gradient-to-br from-slate-950 via-zinc-900 to-black'
    : 'bg-gradient-to-br from-pink-200 via-rose-100 to-blue-200'

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-700 ${backgroundClass}`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={220} />}
      {currentIndex >= 1 && <BalloonAnimation />}
      {currentIndex >= 1 && <BackgroundEffects />}
      {currentIndex >= 3 && !albumAudioActive && <MusicToggle shouldPlay />}
      {currentIndex >= 4 && <Fireworks />}

      <div className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:bottom-5 sm:right-5 z-50 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
        <span className="hidden sm:inline-flex px-3 py-2 rounded-full bg-black/55 text-white text-xs tracking-wide">
          {currentStep.label}
        </span>
        <button
          onClick={goPrev}
          className="px-4 py-2 rounded-full bg-black/65 text-white font-semibold hover:bg-black/80 transition"
        >
          Back
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
        >
          Continue
        </button>
      </div>

      {stage === 'lights' && (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-16">
          <div className="absolute inset-0 bg-black/45" />
          <motion.div
            className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/25 bg-white/10 backdrop-blur-xl p-6 md:p-10 shadow-2xl"
            style={{ perspective: 1400 }}
            initial={{ opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="text-white/80 tracking-widest uppercase text-xs md:text-sm">Birthday Journey</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">Turn on the Lights</h1>
            <p className="text-white/90 mt-4 text-lg">Start here, then move through each moment.</p>
            <button onClick={goNext} className="confirm-btn mt-6">
              Start Journey
            </button>
          </motion.div>
        </section>
      )}

      {stage === 'room' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            className="w-full max-w-3xl rounded-3xl bg-white/80 border border-white/70 p-8 text-center shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 25, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-bold text-rose-700">Arrange the Room</h2>
            <p className="text-lg text-gray-700 mt-4">Decorations are up. Balloons and dreamy effects are active.</p>
            <button onClick={goNext} className="confirm-btn mt-6">
              Bring the Cake
            </button>
          </motion.div>
        </section>
      )}

      {stage === 'cake' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            className="w-full max-w-4xl rounded-3xl bg-white/80 border border-white/70 p-6 md:p-10 shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 25, rotateY: 8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-bold text-rose-700 text-center">Cake Time</h2>
            <p className="text-center text-gray-700 mt-3">Click celebrate on the cake, then continue.</p>
            <div className="mt-8">
              <Cake3D
                onCelebrateCake={handleCelebrateCake}
                candlesBlown={candlesBlown}
                cakeEffectTick={cakeEffectTick}
              />
            </div>
            <div className="text-center mt-8">
              <button onClick={goNext} className="confirm-btn">
                Start Music
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {stage === 'music' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div
            className="w-full max-w-3xl rounded-3xl bg-white/80 border border-white/70 p-8 text-center shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 24, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-bold text-rose-700">Music On</h2>
            <p className="text-lg text-gray-700 mt-4">Birthday song is now playing. Move to the wish page.</p>
            <button onClick={goNext} className="confirm-btn mt-6">
              Make a Wish
            </button>
          </motion.div>
        </section>
      )}

      {stage === 'wish' && (
        <div className="pt-16">
          <CelebrationSection
            celebrate={celebrate}
            candlesBlown={candlesBlown}
            onBlowCandles={handleBlowCandles}
            candleVideoSrc={candleVideoSrc}
          />
        </div>
      )}

      {stage === 'message' && (
        <div className="pt-16">
          <SpecialMessage />
        </div>
      )}

      {stage === 'gift' && (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-700 mb-6">Gift Surprise</h2>
            <GiftBox celebrate={celebrate} />
          </div>
        </section>
      )}

      {stage === 'albums' && (
        <div className="pt-16">
          <AlbumSlideshow onAlbumPlaybackChange={setAlbumAudioActive} />
        </div>
      )}
    </div>
  )
}

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [cakeEffectTick, setCakeEffectTick] = useState(0)

  const fireBurst = (originY = 0.62) => {
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 55,
      origin: { x: 0.5, y: originY },
      colors: ['#ef4444', '#f59e0b', '#f472b6', '#fef08a', '#fb7185'],
    })
  }

  const triggerConfettiLayer = (ms = 3500) => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), ms)
  }

  const celebrate = () => {
    triggerConfettiLayer(3000)
    fireBurst(0.6)
  }

  const handleCelebrateCake = () => {
    setCakeEffectTick((v) => v + 1)
    setCandlesBlown(false)
    triggerConfettiLayer(2600)
    fireBurst(0.5)
  }

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    triggerConfettiLayer(3000)
    confetti({
      particleCount: 120,
      spread: 95,
      startVelocity: 42,
      gravity: 1.1,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#c4b5fd', '#f9a8d4', '#fff7c2', '#93c5fd', '#fca5a5'],
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lights" replace />} />
        <Route
          path="/:stage"
          element={
            <JourneyPage
              showConfetti={showConfetti}
              celebrate={celebrate}
              handleCelebrateCake={handleCelebrateCake}
              handleBlowCandles={handleBlowCandles}
              candlesBlown={candlesBlown}
              cakeEffectTick={cakeEffectTick}
            />
          }
        />
        <Route path="*" element={<Navigate to="/lights" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
