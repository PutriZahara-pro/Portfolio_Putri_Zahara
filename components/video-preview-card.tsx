"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface VideoPreviewCardProps {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  href: string;
  priority?: boolean;
}

export default function VideoPreviewCard({
  title,
  description,
  videoSrc,
  poster,
  href,
}: VideoPreviewCardProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [width, setWidth]   = useState(0);
  const [height, setHeight] = useState(0);
  const [hover, setHover]   = useState(false);

  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Taille de la carte ───────────────────────────────── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => { setWidth(el.offsetWidth); setHeight(el.offsetHeight); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Reset vidéo ─────────────────────────────────────── */
  const resetVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    v.pause();
    v.currentTime = 0;
  }, []);

  /* ── Hover enter : lecture 2s puis reset ─────────────── */
  const onEnter = useCallback(() => {
    setHover(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    timerRef.current = setTimeout(() => {
      v.pause();
      v.currentTime = 0;
    }, 5000);
  }, []);

  /* ── Hover leave : stop immédiat + reset ─────────────── */
  const onLeave = useCallback(() => {
    setHover(false);
    resetVideo();
    setTimeout(() => { setMouseX(0); setMouseY(0); }, 300);
  }, [resetVideo]);

  /* ── Inclinaison 3D ──────────────────────────────────── */
  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - width  / 2);
    setMouseY(e.clientY - rect.top  - height / 2);
  };

  const px = mouseX / (width  || 1);
  const py = mouseY / (height || 1);
  const rX =  py * 20;
  const rY = -px * 20;

  const neonGlow = {
    boxShadow: hover
      ? "0 0 5px #a855f7, 0 0 12px #a855f7, 0 0 25px rgba(168,85,247,0.5), 0 20px 40px rgba(0,0,0,0.6)"
      : "0 10px 20px rgba(0,0,0,0.4)",
    transition: "box-shadow 0.3s ease",
    borderRadius: "0.5rem",
  };

  return (
    <Link href={href} className="block w-full max-w-md">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ perspective: 800 }}
        className="relative w-full h-[320px]"
      >
        <div
          className="w-full h-full bg-zinc-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-200"
          style={{
            transform: `rotateX(${rX}deg) rotateY(${rY}deg)`,
            transformStyle: "preserve-3d",
            ...neonGlow,
          }}
        >
          {/* Video */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="relative w-full h-full transition-transform duration-200"
              style={{ transform: hover ? "scale(1.08) translateZ(30px)" : "scale(1) translateZ(0)" }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onLoadedData={() => {
                  const v = videoRef.current;
                  if (v && !hover) {
                    v.currentTime = 0.001;
                  }
                }}
              />
            </div>
          </div>

          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black/70 to-transparent"
            style={{
              transform: hover ? "translateY(0)" : "translateY(60%)",
              transition: "transform 0.3s ease",
            }}
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{ textShadow: hover ? "0 0 5px rgba(168,85,247,0.6)" : "none", transition: "text-shadow 0.3s" }}
            >
              {title}
            </h3>
            <div style={{ opacity: hover ? 1 : 0.7, transition: "opacity 0.3s" }}>
              <p className="text-sm leading-snug line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
