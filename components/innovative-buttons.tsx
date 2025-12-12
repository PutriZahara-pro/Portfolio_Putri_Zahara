"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface InnovativeButtonsProps {
  frenchVersion?: boolean;
}

export default function InnovativeButtons({ frenchVersion = false }: InnovativeButtonsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const portfolioRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const [portfolioOffset, setPortfolioOffset] = useState({ x: 0, y: 0 })
  const [aboutOffset, setAboutOffset] = useState({ x: 0, y: 0 })
  const [isHoveringPortfolio, setIsHoveringPortfolio] = useState(false)
  const [isHoveringAbout, setIsHoveringAbout] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (portfolioRef.current) {
        const rect = portfolioRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = (e.clientX - centerX) / 12
        const distanceY = (e.clientY - centerY) / 12

        // Only apply magnetic effect when cursor is close to the button
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
        if (distance < 200) {
          setPortfolioOffset({ x: distanceX, y: distanceY })
        } else {
          setPortfolioOffset({ x: 0, y: 0 })
        }
      }

      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = (e.clientX - centerX) / 12
        const distanceY = (e.clientY - centerY) / 12

        // Only apply magnetic effect when cursor is close to the button
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))
        if (distance < 200) {
          setAboutOffset({ x: distanceX, y: distanceY })
        } else {
          setAboutOffset({ x: 0, y: 0 })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Generate random particles
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 1 + 0.5,
    }))
  }

  const portfolioParticles = generateParticles(15)
  const aboutParticles = generateParticles(15)

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Portfolio Button - Green */}
      <motion.div
        ref={portfolioRef}
        className="group relative"
        animate={{
          x: portfolioOffset.x,
          y: portfolioOffset.y,
          rotateX: isHoveringPortfolio ? 10 : 0,
          rotateY: isHoveringPortfolio ? -10 : 0,
        }}
        onHoverStart={() => setIsHoveringPortfolio(true)}
        onHoverEnd={() => setIsHoveringPortfolio(false)}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 opacity-75 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"></div>

        {/* Particles for Portfolio button */}
        {isHoveringPortfolio &&
          portfolioParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full bg-green-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: particle.x,
                y: particle.y,
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              style={{
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}

        <Link
          href={frenchVersion ? "/fr/portfolio" : "/portfolio"}
          className="relative flex items-center justify-center rounded-xl bg-black px-10 py-5 text-xl font-bold text-white transition-all duration-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]"
        >
          <motion.span
            className="relative z-10 flex items-center gap-3"
            animate={{
              y: isHoveringPortfolio ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 font-bold">
              {frenchVersion ? "Voir Portfolio" : "View Portfolio"}
            </span>
            <motion.svg
              className="h-6 w-6 text-green-400"
              animate={{
                x: isHoveringPortfolio ? 5 : 0,
                rotate: isHoveringPortfolio ? 10 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.span>

          {/* 3D effect bottom layer */}
          <div className="absolute inset-0 -bottom-1 -z-10 rounded-xl bg-green-700 translate-y-1 translate-x-1 transition-transform duration-300 group-hover:translate-y-2 group-hover:translate-x-2"></div>
        </Link>
      </motion.div>

      {/* About Me Button - White */}
      <motion.div
        ref={aboutRef}
        className="group relative"
        animate={{
          x: aboutOffset.x,
          y: aboutOffset.y,
          rotateX: isHoveringAbout ? 10 : 0,
          rotateY: isHoveringAbout ? -10 : 0,
        }}
        onHoverStart={() => setIsHoveringAbout(true)}
        onHoverEnd={() => setIsHoveringAbout(false)}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-gray-200 via-white to-gray-300 opacity-75 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"></div>

        {/* Particles for About Me button */}
        {isHoveringAbout &&
          aboutParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: particle.x,
                y: particle.y,
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              style={{
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}

        <Link
          href={frenchVersion ? "/fr/about" : "/about"}
          className="relative flex items-center justify-center rounded-xl bg-black px-10 py-5 text-xl font-bold text-white transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
        >
          <motion.span
            className="relative z-10 flex items-center gap-3"
            animate={{
              y: isHoveringAbout ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 font-bold">
              {frenchVersion ? "À propos" : "About Me"}
            </span>
            <motion.svg
              className="h-6 w-6 text-white"
              animate={{
                rotate: isHoveringAbout ? 180 : 0,
                scale: isHoveringAbout ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </motion.svg>
          </motion.span>

          {/* 3D effect bottom layer */}
          <div className="absolute inset-0 -bottom-1 -z-10 rounded-xl bg-gray-400 translate-y-1 translate-x-1 transition-transform duration-300 group-hover:translate-y-2 group-hover:translate-x-2"></div>
        </Link>
      </motion.div>
    </div>
  )
}
