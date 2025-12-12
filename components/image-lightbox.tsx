"use client"

import { useState, useEffect } from "react"
import { X, ZoomIn } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Keyboard, Zoom } from "swiper/modules"
import { getImagePath } from "../utils/image-path"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/zoom"

interface ImageLightboxProps {
  images: {
    src: string
    alt: string
  }[]
  initialSlide?: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({ images, initialSlide = 0, isOpen, onClose }: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-16 right-4 sm:top-20 z-50 p-3 sm:p-4 rounded-full bg-zinc-800/90 text-emerald-400 hover:bg-zinc-700/90 transition-colors shadow-lg border-2 border-emerald-500/30 hover:border-emerald-500/70 hover:text-emerald-300 hover:shadow-emerald-500/20 hover:shadow-xl"
        aria-label="Close lightbox"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      {/* Navigation buttons - positioned outside the swiper */}
      <button
        className="lightbox-nav-button lightbox-prev-button absolute left-4 z-50 p-3 rounded-full bg-zinc-800/80 text-emerald-400 hover:bg-zinc-700/80 transition-colors"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        className="lightbox-nav-button lightbox-next-button absolute right-4 z-50 p-3 rounded-full bg-zinc-800/80 text-emerald-400 hover:bg-zinc-700/80 transition-colors"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Image swiper */}
      <div className="relative z-10 w-full h-full max-w-[90vw] max-h-[90vh]">
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          navigation={{
            prevEl: ".lightbox-prev-button",
            nextEl: ".lightbox-next-button",
          }}
          keyboard={{
            enabled: true,
          }}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          initialSlide={initialSlide}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                <img
                  src={getImagePath(image.src)}
                  alt={image.alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

// Composant pour ajouter l'icône de zoom au survol des images
export function ZoomableImage({ src, alt, className = "", onClick = () => {} }) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-zoom-in"
      onClick={onClick}
    >
      <img 
        src={getImagePath(src)} 
        alt={alt} 
        className={`w-full transition-transform duration-300 group-hover:scale-105 ${className}`}
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-emerald-500/80 p-2 rounded-full">
          <ZoomIn className="text-white" size={24} />
        </div>
      </div>
    </div>
  )
}
