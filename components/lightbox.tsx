"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageType {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

interface LightboxProps {
  images: ImageType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, currentIndex, setCurrentIndex, onClose }: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  
  const next = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
    setIsZoomed(false);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Gestionnaire des touches de clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " || e.key === "z") toggleZoom();
      if (e.key === "h") setShowControls(!showControls);
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Masquer l'aide après quelques secondes
    const timer = setTimeout(() => {
      setShowHelp(false);
    }, 3000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Aide et contrôles */}
        <AnimatePresence>
          {showHelp && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-zinc-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-zinc-300 text-sm z-[60] shadow-lg border border-emerald-500/20"
            >
              Utilisez les flèches ← → pour naviguer • Espace pour zoomer • H pour masquer les contrôles
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Principale */}
        <div 
          className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} transition-all duration-300 ease-out`}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          style={{
            maxWidth: isZoomed ? '90vw' : '75vw',
            maxHeight: isZoomed ? '90vh' : '75vh',
            overflow: 'hidden',
          }}
        >
          <motion.div
            className={`relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg shadow-emerald-500/20 transition-all ${isZoomed ? 'cursor-grab active:cursor-grabbing' : ''}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={isZoomed}
            dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
            style={{
              width: isZoomed ? 'auto' : '100%',
              height: isZoomed ? 'auto' : '100%',
              maxWidth: isZoomed ? '150vw' : '100%',
              maxHeight: isZoomed ? '150vh' : '100%',
            }}
          >
            <div className="relative">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                width={1200}
                height={800}
                quality={100}
                className={`transition-all duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </motion.div>
          
          {/* Légende de l'image */}
          <AnimatePresence>
            {showControls && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl"
              >
                <h3 className="text-xl font-semibold text-emerald-300">{images[currentIndex].title}</h3>
                <p className="text-zinc-300">{images[currentIndex].description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contrôles */}
        <AnimatePresence>
          {showControls && (
            <>
              {/* Bouton fermer */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-3 text-zinc-200 hover:text-white hover:shadow-emerald-500/30 hover:shadow-lg transition-all z-[60]"
                onClick={onClose}
              >
                <span className="text-xl font-bold">×</span>
              </motion.button>

              {/* Bouton zoom */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 left-4 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-3 text-zinc-200 hover:text-white hover:shadow-emerald-500/30 hover:shadow-lg transition-all z-[60]"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
              >
                <span className="text-xl font-bold">{isZoomed ? '−' : '+'}</span>
              </motion.button>

              {/* Bouton précédent */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-3 text-zinc-200 hover:text-white hover:shadow-emerald-500/30 hover:shadow-lg transition-all z-[60]"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <span className="text-xl font-bold">←</span>
              </motion.button>

              {/* Bouton suivant */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-3 text-zinc-200 hover:text-white hover:shadow-emerald-500/30 hover:shadow-lg transition-all z-[60]"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <span className="text-xl font-bold">→</span>
              </motion.button>

              {/* Indicateur de position */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800/80 backdrop-blur-sm rounded-full px-4 py-2 z-[60]"
              >
                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-emerald-400 w-4' 
                          : 'bg-zinc-500 hover:bg-zinc-400'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                        setIsZoomed(false);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
