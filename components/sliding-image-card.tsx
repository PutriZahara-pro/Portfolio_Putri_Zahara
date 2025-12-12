"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getImagePath } from "../utils/image-path";
import { getImageSEO, generateSEOAlt } from "../data/seo-content";
import GithubImage from "./github-image";

interface SlidingImageCardProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  href: string;
  count?: number;
}

export default function SlidingImageCard({ id, title, description, images, href, count }: SlidingImageCardProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Style dynamique pour l'effet néon
  const neonGlowStyle = {
    boxShadow: hover
      ? "0 0 5px #4ade80, 0 0 10px #4ade80, 0 0 20px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4), 0 20px 40px rgba(0, 0, 0, 0.6)"
      : "0 10px 20px rgba(0, 0, 0, 0.4)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    borderRadius: "0.75rem", // 12px pour un look plus arrondi
  };

  // Générer les alt texts optimisés pour chaque image
  const getOptimizedAlt = (imageUrl: string, index: number) => {
    const seoData = getImageSEO(imageUrl);
    return seoData?.alt || generateSEOAlt(
      `${title}`, 
      `Image ${index + 1} - ${description}`, 
      ["concept art", "portfolio", "autres œuvres"]
    );
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setWidth(el.offsetWidth);
      setHeight(el.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Effet pour le défilement automatique des images uniquement au survol
  useEffect(() => {
    if (!images || images.length <= 1 || !hover) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change d'image toutes les 2 secondes
    
    return () => clearInterval(interval);
  }, [images, hover]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - width / 2);
    setMouseY(e.clientY - rect.top - height / 2);
  };

  const onEnter = () => setHover(true);
  const onLeave = () => {
    setHover(false);
    // Ne pas réinitialiser l'index d'image pour garder la dernière image affichée
    setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 300);
  };

  const px = mouseX / (width || 1);
  const py = mouseY / (height || 1);
  const rX = py * 20;
  const rY = px * -20;

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Link href={href} className="block w-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ perspective: 800 }}
        className="relative w-full h-[320px] m-2"
      >
        <div
          className="w-full h-full bg-zinc-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-200"
          style={{
            transform: `rotateX(${rX}deg) rotateY(${rY}deg)`,
            transformStyle: "preserve-3d",
            ...neonGlowStyle,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {images.map((image, index) => (
              <div
                key={`${id}-image-${index}`}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                }}
              >
                <GithubImage 
                  src={getImagePath(image)} 
                  alt={getOptimizedAlt(image, index)}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <div
            className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black/60 to-transparent"
            style={{
              transform: hover ? "translateY(0)" : "translateY(60%)",
              transition: "transform 0.3s ease",
            }}
          >
            <h3 className="text-xl font-bold mb-2 transition-all duration-300" style={{
              textShadow: hover ? "0 0 5px rgba(255,255,255,0.5)" : "none",
            }}>{title}</h3>
            
            <div className="space-y-2 transition-opacity duration-300" style={{
              opacity: hover ? 1 : 0.7,
            }}>
              <p className="text-sm leading-snug">{description}</p>
              
              {count != null && (
                <div className="flex items-center mt-3">
                  <span className="inline-flex items-center justify-center bg-emerald-600/70 rounded-full h-5 w-5 text-xs mr-2">
                    {count}
                  </span>
                  <p className="text-xs text-zinc-300">œuvres</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}