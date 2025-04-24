"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Keyboard, Zoom } from "swiper/modules"

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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
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

      {/* Swiper */}
      <div className="relative z-10 w-full h-full max-w-7xl max-h-[90vh] px-16">
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          navigation={{
            nextEl: ".lightbox-next-button",
            prevEl: ".lightbox-prev-button",
          }}
          keyboard={{
            enabled: true,
          }}
          zoom={true}
          initialSlide={initialSlide}
          spaceBetween={30}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <div className="swiper-zoom-container">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
