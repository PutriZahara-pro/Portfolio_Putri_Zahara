"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function EnhancedNavbar() {
  const [activeItem, setActiveItem] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [documentHeight, setDocumentHeight] = useState(1000)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || ""
  
  // Determine if current page is in French
  const isFrenchVersion = pathname.startsWith("/fr")
  
  // Function to get the equivalent path in the other language
  const getLanguageSwitchPath = () => {
    if (isFrenchVersion) {
      // If we're on a French page, get the English equivalent
      return pathname.replace(/^\/fr/, "") || "/"
    } else {
      // If we're on an English page, get the French equivalent
      return `/fr${pathname === "/" ? "" : pathname}`
    }
  }

  const { scrollY } = useScroll()
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(24, 24, 27, 0)", "rgba(24, 24, 27, 0.95)"])
  const navHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"])
  const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const getMagneticTarget = (index: number) => {
    if (!navRef.current) return null
    const wrapper = navRef.current.querySelectorAll(".menu-item")[index] as HTMLElement | undefined
    if (!wrapper) return null
    return (wrapper.firstElementChild as HTMLElement | null) ?? wrapper
  }

  const resetMagneticTransforms = () => {
    if (!navRef.current) return
    const menuEls = navRef.current.querySelectorAll(".menu-item") as NodeListOf<HTMLElement>
    menuEls.forEach((wrapper) => {
      const target = (wrapper.firstElementChild as HTMLElement | null) ?? wrapper
      target.style.transform = "translate(0, 0)"
    })
    setHoverIndex(null)
  }

  // Update document height on client-side only
  useEffect(() => {
    const updateDocumentHeight = () => {
      setDocumentHeight(document.body.scrollHeight - window.innerHeight)
    }
    
    // Initial calculation
    updateDocumentHeight()
    
    // Recalculate on resize
    window.addEventListener('resize', updateDocumentHeight)
    
    return () => window.removeEventListener('resize', updateDocumentHeight)
  }, [])

  // Handle resize events for responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Set active item based on current path when component mounts
  useEffect(() => {
    const path = pathname.replace(/^\/fr/, "").substring(1) || "home"
    const formattedPath = path.charAt(0).toUpperCase() + path.slice(1)
    
    if (menuItems.includes(formattedPath)) {
      setActiveItem(formattedPath)
    }

    resetMagneticTransforms()
  }, [pathname])

  const menuItems = ["Home", "About", "Portfolio", "News", "Game", "Contact"]

  // Magnetic effect for menu items
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!navRef.current) return

    const menuItem = getMagneticTarget(index)
    if (!menuItem) return

    const rect = menuItem.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    menuItem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = (index: number) => {
    const menuItem = getMagneticTarget(index)
    if (!menuItem) return

    menuItem.style.transform = "translate(0, 0)"
    setHoverIndex(null)
  }

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm"
      style={{
        backgroundColor: navBackground,
        height: navHeight,
        paddingTop: navPadding,
        paddingBottom: navPadding,
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <motion.div
            className="flex-shrink-0"
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href={isFrenchVersion ? "/fr" : "/"} className="flex items-center">
              <motion.div className="relative overflow-hidden" whileHover="hover">
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 text-xl font-bold"
                  variants={{
                    hover: {
                      backgroundPosition: ["0% 50%", "100% 50%"],
                      transition: {
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "mirror",
                        duration: 2,
                        ease: "linear",
                      },
                    },
                  }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  Putri Zahara
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-600"
                  variants={{
                    hover: {
                      scaleX: [0, 1],
                      transition: {
                        duration: 0.5,
                      },
                    },
                  }}
                  initial={{ scaleX: 0 }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-6 items-center">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  className="menu-item relative"
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  onHoverStart={() => setHoverIndex(i)}
                  whileHover={{ y: -2 }}
                  animate={{ y: hoverIndex === i ? -2 : 0 }}
                >
                  <Link
                    href={`${isFrenchVersion ? "/fr" : ""}/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className={`text-sm font-medium relative px-1 py-2 flex items-center ${
                      activeItem === item ? "text-emerald-400" : "text-zinc-300 hover:text-emerald-400"
                    }`}
                    onClick={() => {
                      resetMagneticTransforms()
                      setActiveItem(item)
                    }}
                  >
                    {item}
                    {item === "Game" && <Gamepad2 className="inline-block ml-1 w-4 h-4" />}
                  </Link>

                  {/* Active indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-600"
                    initial={false}
                    animate={{ scaleX: activeItem === item ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    style={{ transformOrigin: "center" }}
                  />
                </motion.div>
              ))}
              
              {/* Language Switcher */}
              <motion.div
                className="menu-item relative"
                onMouseMove={(e) => handleMouseMove(e, menuItems.length)}
                onMouseLeave={() => handleMouseLeave(menuItems.length)}
                onHoverStart={() => setHoverIndex(menuItems.length)}
                whileHover={{ y: -2 }}
                animate={{ y: hoverIndex === menuItems.length ? -2 : 0 }}
              >
                <Link
                  href={getLanguageSwitchPath()}
                  className="text-sm font-medium relative px-1 py-2 flex items-center text-zinc-300 hover:text-emerald-400"
                  onClick={() => resetMagneticTransforms()}
                >
                  <motion.div
                    className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-zinc-500 hover:border-emerald-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-xs font-bold">{isFrenchVersion ? "EN" : "FR"}</span>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-300 hover:text-emerald-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <div className="w-6 h-6 flex flex-col justify-between items-center">
                <motion.span
                  className="w-full h-0.5 bg-emerald-400 block"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-emerald-400 block"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-emerald-400 block"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-zinc-900/95 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`${isFrenchVersion ? "/fr" : ""}/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      activeItem === item
                        ? "text-emerald-400 border-l-2 border-emerald-600 pl-2"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400"
                    }`}
                    onClick={() => {
                      resetMagneticTransforms()
                      setActiveItem(item)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {item}
                    {item === "Game" && <Gamepad2 className="inline-block ml-1 w-4 h-4" />}
                  </Link>
                </motion.div>
              ))}
              
              {/* Language Switcher Mobile */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: menuItems.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href={getLanguageSwitchPath()}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400"
                  onClick={() => {
                    resetMagneticTransforms()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-zinc-500 mr-2">
                    <span className="text-xs font-bold">{isFrenchVersion ? "EN" : "FR"}</span>
                  </div>
                  <span>{isFrenchVersion ? "Switch to English" : "Changer de langue"}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-600"
        style={{
          scaleX: useTransform(scrollY, [0, documentHeight], [0, 1]),
          transformOrigin: "left",
        }}
      />
    </motion.nav>
  )
}
