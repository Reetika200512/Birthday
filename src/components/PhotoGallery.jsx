import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Replace these with actual photo paths
  const photos = [
    {
      id: 1,
      src: '/banner.png',
      caption: 'Beautiful moment together',
    },
    {
      id: 2,
      src: '/banner.png',
      caption: 'Good times and laughs',
    },
    {
      id: 3,
      src: '/banner.png',
      caption: 'Our special friendship',
    },
    {
      id: 4,
      src: '/banner.png',
      caption: 'Adventure time!',
    },
    {
      id: 5,
      src: '/banner.png',
      caption: 'Smiling moments',
    },
    {
      id: 6,
      src: '/banner.png',
      caption: 'Forever memories',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-purple-200 to-pink-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Beautiful Memories 📸
        </motion.h2>

        <div className="masonry-grid">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              className="masonry-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="polaroid p-3 bg-white cursor-pointer transform transition hover:shadow-2xl"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-64 object-cover rounded"
                />
                <p className="text-center text-gray-600 text-sm mt-4 font-handwriting">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="lightbox-content max-w-2xl max-h-96 rounded-xl"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
              >
                <X size={24} />
              </button>
              <p className="text-center text-white mt-4 text-lg">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default PhotoGallery
