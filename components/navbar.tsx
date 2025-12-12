"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, GamepadIcon, GlobeIcon, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/components/game/translations"

// Définir l'interface pour les liens de navigation
interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subLinks?: { name: string; href: string }[];
  devMode?: boolean;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Portfolio",
    href: "/portfolio",
    subLinks: [
      { name: "P.S. Apocalypse", href: "/portfolio/ps-apocalypse" },
      { name: "The Ethians Redeemed", href: "/portfolio/The_Ethians_Redeemed/" },
      { name: "Other Works", href: "/portfolio/other-works" },
    ],
  },
  { name: "News", href: "/news" },
  { name: "Game", href: "/game", icon: <GamepadIcon className="h-4 w-4 mr-1" />, devMode: true },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { language, toggleLanguage } = useLanguage()

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const devModeLabel = language === 'fr' ? 'En cours de développement' : 'Under development'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-emerald-400">
            Putri Zahara
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="text-zinc-300 hover:text-white py-2 flex items-center"
                    >
                      {link.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === link.name && (
                      <div className="absolute left-0 mt-2 w-48 bg-zinc-800 shadow-lg py-1 z-10">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-zinc-300 hover:text-white py-2 flex items-center ${link.name === "Game" ? "" : ""}`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                    {link.devMode && (
                      <span className="ml-1 text-xs text-orange-500">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {devModeLabel}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Language toggle button - desktop */}
            <button 
              onClick={toggleLanguage}
              className="text-zinc-300 hover:text-white py-2 flex items-center gap-1 px-2 transition-colors"
              aria-label="Change language"
            >
              <GlobeIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {getTranslation('ui.language', language)}
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-zinc-800 border-b border-zinc-700">
        <div className="container mx-auto px-4 py-3">
          {navLinks.map((link) => (
            <div key={link.name} className="py-2">
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex justify-between items-center w-full text-zinc-300 hover:text-white py-2"
                  >
                    {link.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === link.name && (
                    <div className="pl-4 mt-1 border-l border-zinc-700">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block py-2 text-zinc-400 hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className={`flex items-center text-zinc-300 hover:text-white py-2 ${link.name === "Game" ? "" : "block"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && link.icon}
                  {link.name}
                  {link.devMode && (
                    <span className="ml-1 text-xs text-orange-500">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {devModeLabel}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
          
          {/* Language toggle button - mobile */}
          <div className="py-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-zinc-300 hover:text-white py-2 w-full"
            >
              <GlobeIcon className="h-4 w-4 mr-2" />
              <span>
                {language === 'fr' ? 'English' : 'Français'}
              </span>
            </button>
          </div>
        </div>
      </div>
      )}
    </header>
  )
}
