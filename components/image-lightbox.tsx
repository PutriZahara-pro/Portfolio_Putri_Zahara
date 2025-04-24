"use client";

import React, { useState, useEffect } from "react";
import { X, ZoomIn, MousePointer } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

// Ajout des styles CSS pour le zoom
const zoomStyles = `
.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-in;
}

.swiper-zoom-container img {
  transition: transform 0.3s;
}

.swiper-zoom-container.zoomed {
  cursor: grab;
}

.swiper-zoom-container.zoomed:active {
  cursor: grabbing;
}

.zoom-instructions {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  transition: opacity 0.3s;
  z-index: 100;
}

.zoom-instructions:hover {
  opacity: 1;
}

.lightbox-nav-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.lightbox-nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
`;

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  initialSlide?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialSlide = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Afficher les instructions pendant 5 secondes
      setShowInstructions(true);
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Ajout des styles CSS pour le zoom */}
      <style>{zoomStyles}</style>
      
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 transition-colors"
      >
        <X size={24} />
      </button>
      
      <button 
        className="lightbox-nav-button lightbox-prev-button absolute left-4 z-50"
        aria-label="Previous image"
      >
        &lsaquo;
      </button>
      
      <button 
        className="lightbox-nav-button lightbox-next-button absolute right-4 z-50"
        aria-label="Next image"
      >
        &rsaquo;
      </button>
      
      {showInstructions && (
        <div className="zoom-instructions">
          <ZoomIn size={16} />
          <span>Cliquez sur l'image pour zoomer, double-cliquez pour réinitialiser</span>
          <MousePointer size={16} />
        </div>
      )}
      
      <div className="relative z-10 w-full h-full max-w-5xl max-h-[90vh] px-8">
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          navigation={{
            prevEl: ".lightbox-prev-button",
            nextEl: ".lightbox-next-button",
          }}
          keyboard={{ enabled: true }}
          zoom={{
            maxRatio: 3,
            minRatio: 1
          }}
          initialSlide={initialSlide}
          spaceBetween={20}
          className="w-full h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <div className="swiper-zoom-container">
                <img 
                  src={img.src || "/placeholder.svg"} 
                  alt={img.alt} 
                  className="max-h-[85vh] object-contain" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
