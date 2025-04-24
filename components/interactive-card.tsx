"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  count?: number;
}

export default function InteractiveCard({ id, title, description, image, href, count }: CardProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Style dynamique pour l'effet néon
  const neonGlowStyle = {
    boxShadow: hover
      ? "0 0 5px #4ade80, 0 0 10px #4ade80, 0 0 20px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.4), 0 20px 40px rgba(0, 0, 0, 0.6)"
      : "0 10px 20px rgba(0, 0, 0, 0.4)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    borderRadius: "0.5rem", // 8px
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

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - width / 2);
    setMouseY(e.clientY - rect.top - height / 2);
  };

  const onEnter = () => setHover(true);
  const onLeave = () => {
    setHover(false);
    setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 300);
  };

  const px = mouseX / (width || 1);
  const py = mouseY / (height || 1);
  const rX = py * 20;
  const rY = px * -20;

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
          className="w-full h-full bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-200"
          style={{
            transform: `rotateX(${rX}deg) rotateY(${rY}deg)`,
            transformStyle: "preserve-3d",
            ...neonGlowStyle,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="relative w-full h-full transition-transform duration-200"
              style={{
                transform: hover
                  ? "scale(1.1) translateZ(30px)"
                  : "scale(1) translateZ(0)",
              }}
            >
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
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
