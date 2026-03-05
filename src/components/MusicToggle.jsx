import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

function MusicToggle({ shouldPlay = false }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = '/hbd.mp3'
    audioRef.current.loop = true
  }, [])

  useEffect(() => {
    if (!audioRef.current || !shouldPlay) return
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false)
      })
  }, [shouldPlay])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} />
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </>
  )
}

export default MusicToggle
