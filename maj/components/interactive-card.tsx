"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface CardProps {
  id: string
  title: string
  description: string
  image: string
  href: string
  count?: number
}

export default function InteractiveCard({ id, title, description, image, href, count }: CardProps) {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth)
      setHeight(cardRef.current.offsetHeight)
    }

    const handleResize = () => {
      if (cardRef.current) {
        setWidth(cardRef.current.offsetWidth)
        setHeight(cardRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMouseX(e.clientX - rect.left - width / 2)
      setMouseY(e.clientY - rect.top - height / 2)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTimeout(() => {
      setMouseX(0)
      setMouseY(0)
    }, 1000)
  }

  const mousePX = mouseX / (width || 1)
  const mousePY = mouseY / (height || 1)
  const rX = mousePX * 30
  const rY = mousePY * -30
  const tX = mousePX * -40
  const tY = mousePY * -40

  return (
    <Link href={href} className="block">
      <div
        className="card-wrap transform perspective-[800px] preserve-3d cursor-pointer m-2"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="card relative flex-none w-full h-[320px] bg-zinc-800 overflow-hidden rounded-lg shadow-lg transition-all duration-1000"
          style={{
            transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
            boxShadow: isHovering
              ? "rgba(255, 255, 255, 0.2) 0 0 40px 5px, rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px"
              : "rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px",
          }}
        >
          <div
            className="card-bg absolute -top-5 -left-5 w-[calc(100%+40px)] h-[calc(100%+40px)] bg-no-repeat bg-center bg-cover pointer-events-none transition-all duration-1000"
            style={{
              transform: `translateX(${tX}px) translateY(${tY}px)`,
              opacity: isHovering ? 0.8 : 0.5,
              backgroundImage: `url(${image})`,
            }}
          />
          <div
            className="card-info p-5 absolute bottom-0 text-white transition-all duration-600"
            style={{
              transform: isHovering ? "translateY(0)" : "translateY(40%)",
              transition: isHovering
                ? "0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                : "0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-2 relative z-10 text-shadow"
              style={{
                textShadow: "rgba(0, 0, 0, 0.5) 0 10px 10px",
              }}
            >
              {title}
            </h2>
            <p
              className="text-zinc-200 relative z-10"
              style={{
                opacity: isHovering ? 1 : 0,
                textShadow: "rgba(0, 0, 0, 1) 0 2px 3px",
                transition: isHovering
                  ? "0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                  : "0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
              }}
            >
              {description}
            </p>
            {count && (
              <div
                className="mt-2 text-sm text-zinc-300 relative z-10"
                style={{
                  opacity: isHovering ? 1 : 0,
                  transition: isHovering
                    ? "0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                    : "0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
                }}
              >
                {count} artworks
              </div>
            )}
            <div
              className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 transform translate-y-full"
              style={{
                opacity: isHovering ? 1 : 0,
                transform: isHovering ? "translateY(0)" : "translateY(100%)",
                transition: isHovering
                  ? "5s cubic-bezier(0.23, 1, 0.32, 1)"
                  : "5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
