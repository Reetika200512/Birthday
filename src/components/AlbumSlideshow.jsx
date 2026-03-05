import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'

function AlbumSlideshow({ onAlbumPlaybackChange }) {
  const baseUrl = import.meta.env.BASE_URL
  const withBase = (assetPath = '') => {
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
    return `${baseUrl}${cleanPath}`
  }

  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeAlbum, setActiveAlbum] = useState(null)
  const [slide, setSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [albumAudioPlaying, setAlbumAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  const currentPhotos = useMemo(() => activeAlbum?.photos ?? [], [activeAlbum])
  const total = currentPhotos.length

  useEffect(() => {
    const messageBank = [
      'A memory we will replay forever.',
      'Every frame feels like a warm hug.',
      'Laughter lives here, always.',
      'One of our favorite little moments.',
      'The vibe in this photo is unbeatable.',
      'Proof that joy looks perfect on us.',
      'This one deserves a permanent spotlight.',
    ]

    const loadAlbums = async () => {
      try {
        const response = await fetch(withBase('albums/manifest.json'))
        const data = await response.json()
        const formattedAlbums = Array.isArray(data)
          ? data.map((album) => ({
              ...album,
              cover: withBase(album.cover),
              song: album.song ? withBase(album.song) : '',
              photos: (album.photos ?? []).map((photo, idx) => ({
                ...photo,
                src: withBase(photo.src),
                caption: `${messageBank[idx % messageBank.length]} ${album.title} edition.`,
              })),
            }))
          : []
        setAlbums(formattedAlbums)
      } catch {
        setAlbums([])
      } finally {
        setLoading(false)
      }
    }

    loadAlbums()
  }, [])

  useEffect(() => {
    if (!activeAlbum) return
    setSlide(0)
    setAutoPlay(true)
  }, [activeAlbum])

  useEffect(() => {
    onAlbumPlaybackChange?.(Boolean(activeAlbum))
    return () => onAlbumPlaybackChange?.(false)
  }, [activeAlbum, onAlbumPlaybackChange])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!activeAlbum?.song) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      setAlbumAudioPlaying(false)
      return
    }

    audio.src = activeAlbum.song
    audio.loop = true
    audio.load()
    audio
      .play()
      .then(() => setAlbumAudioPlaying(true))
      .catch(() => setAlbumAudioPlaying(false))

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [activeAlbum])

  useEffect(() => {
    if (!activeAlbum || !autoPlay || total < 2) return
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % total)
    }, 2500)

    return () => clearInterval(timer)
  }, [activeAlbum, autoPlay, total])

  const goNext = () => setSlide((prev) => (prev + 1) % total)
  const goPrev = () => setSlide((prev) => (prev - 1 + total) % total)
  const closeAlbum = () => setActiveAlbum(null)

  const toggleAlbumAudio = async () => {
    const audio = audioRef.current
    if (!audio || !activeAlbum?.song) return

    if (albumAudioPlaying) {
      audio.pause()
      setAlbumAudioPlaying(false)
      return
    }

    try {
      await audio.play()
      setAlbumAudioPlaying(true)
    } catch {
      setAlbumAudioPlaying(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-100 via-pink-100 to-blue-100">
      <audio ref={audioRef} />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-700">Our Albums</h2>
        <p className="text-center text-gray-600 mt-3">Tap an album to start.</p>

        {loading && <p className="text-center text-gray-600 mt-8">Loading albums...</p>}
        {!loading && albums.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No album photos found.</p>
        )}

        <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setActiveAlbum(album)}
              className="group text-left rounded-2xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 transition-transform w-full"
            >
              <img src={album.cover} alt={album.title} className="w-full h-52 object-cover" />
              <div className="p-4">
                <p className="text-xl font-bold text-rose-700">{album.title}</p>
                <p className="text-sm text-gray-500 mt-1">{album.photos.length} photos</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeAlbum && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAlbum}
          >
            <motion.div
              className="w-full max-w-5xl max-h-[92vh] rounded-t-2xl sm:rounded-2xl bg-white overflow-hidden shadow-2xl flex flex-col"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start sm:items-center justify-between px-3 sm:px-4 py-3 border-b gap-3">
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-rose-700 truncate">{activeAlbum.title}</p>
                  <p className="text-sm text-gray-500">
                    {slide + 1}/{total}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={toggleAlbumAudio}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label={albumAudioPlaying ? 'Pause album song' : 'Play album song'}
                    title={albumAudioPlaying ? 'Pause album song' : 'Play album song'}
                  >
                    {albumAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                  <button
                    onClick={() => setAutoPlay((v) => !v)}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label={autoPlay ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {autoPlay ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={closeAlbum}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label="Close album"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative bg-black flex-1 min-h-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeAlbum.id}-${slide}`}
                    src={currentPhotos[slide]?.src}
                    alt={currentPhotos[slide]?.caption}
                    className="w-full h-[46vh] sm:h-[58vh] object-contain"
                    initial={{ opacity: 0.2, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.2, scale: 1.02 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>

                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 rounded-full bg-white/90 hover:bg-white"
                  aria-label="Previous photo"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 rounded-full bg-white/90 hover:bg-white"
                  aria-label="Next photo"
                >
                  <ChevronRight />
                </button>
              </div>

              <p className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base text-gray-700">
                {currentPhotos[slide]?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default AlbumSlideshow
