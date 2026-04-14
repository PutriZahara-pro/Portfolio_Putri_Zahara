"use client";
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react"

const screens = [
  {
    src: "/images/Portfolio/cuisine-royale/screen-menu.png",
    label: "Screen 1 — Main Menu",
    title: "Main Menu",
    description:
      "The entry screen presents the game's royal culinary universe. The player sees the maximum prize and can start a scratch or consult the rules.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-regles.png",
    label: "Screen 2 — Rules",
    title: "Rules",
    description:
      "A rules popup overlays the main menu, displayed on a warm wooden panel. The player can read how the scratch mechanic works before committing to a bet.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-gameplay.png",
    label: "Screen 3 — Gameplay",
    title: "Gameplay",
    description:
      "A 3×3 grid of covered dishes to scratch one by one. Bet levels of €2, €4, or €6 adjust the prize pool. A counter tracks remaining scratches, with a 'Reveal' button to uncover all at once.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-reveal.png",
    label: "Screen 4 — Reveal",
    title: "Reveal",
    description:
      "The winning dish is unveiled with an animated cloche lift. The prize amount is displayed prominently on a gold-bordered banner, with options to continue or return to the menu.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-felicitations.png",
    label: "Screen 5 — Congratulations",
    title: "Congratulations",
    description:
      "The winner screen erupts with confetti and stars. The prize is confirmed in large gold typography, with clear calls to action to replay or return to the menu.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-termine.png",
    label: "Screen 6 — Game Over",
    title: "Game Over",
    description:
      "When no prize is won, the player sees a dignified end screen with their result and an invitation to try again — keeping the tone light and encouraging re-engagement.",
  },
]

export default function CuisineRoyalePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + screens.length) % screens.length : null))
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % screens.length : null))
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxIndex, goPrev, goNext])

  return (
    <main className="pt-16 bg-zinc-900 overflow-x-hidden">

      {/* Project Header — mockup background with fade */}
      <section className="relative overflow-hidden min-h-[560px] md:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/Portfolio/cuisine-royale/mokup.png"
            alt="Cuisine Royale — Mockup"
            fill
            className="object-cover hidden md:block"
            style={{ objectPosition: 'center' }}
            priority
          />
          {/* Desktop: fade from left, transparent on right */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-zinc-900 from-40% via-zinc-900/70 via-65% to-transparent" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <Link href="/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Cuisine Royale</h1>
            <p className="text-base text-zinc-300 mb-8 leading-relaxed">
              UI/UX design project for a mobile web game in a scratch card format, inspired by FDJ's Illiko games. A royal cooking theme with immersive game mechanics designed for mobile-first experience.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Client</p>
                <p className="text-zinc-200">Personal Project</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Year</p>
                <p className="text-zinc-200">2025</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Role</p>
                <p className="text-zinc-200">UI/UX Designer</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Deliverables</p>
                <p className="text-zinc-200">Mobile App Design</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3">Tools</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Figma</span>
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Blender</span>
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Photoshop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Gallery — case study alternating layout */}
      <section className="pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-14 text-zinc-100">App Screens</h2>
          <div className="flex flex-col gap-20 max-w-4xl mx-auto">
            {screens.map((screen, i) => (
              <div
                key={screen.label}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Phone frame — clickable */}
                <button
                  onClick={() => openLightbox(i)}
                  className="group flex-shrink-0 w-[220px] md:w-[240px] rounded-[36px] overflow-hidden border-2 border-zinc-700 hover:border-purple-500 shadow-2xl bg-zinc-950 ring-1 ring-white/5 hover:ring-purple-500/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 relative cursor-zoom-in"
                  aria-label={`View ${screen.title} full screen`}
                >
                  <Image
                    src={screen.src}
                    alt={screen.label}
                    width={390}
                    height={844}
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </button>

                {/* Description */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">{screen.label}</p>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-4">{screen.title}</h3>
                  <p className="text-base text-zinc-400 leading-relaxed">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                Cuisine Royale is a UI/UX project designed for a mobile web game in the scratch card format, drawing inspiration from FDJ's Illiko games. The concept blends a royal culinary universe with interactive game mechanics, crafted for a seamless mobile experience.
              </p>
              <p className="mb-4">
                The game flow guides the player through six key screens: a main menu with the prize headline, a rules popup, the gameplay grid where dishes are scratched, a reveal moment for the winning dish, a congratulations screen, and a dignified game over screen. Every transition and micro-interaction was carefully considered to maintain the immersive atmosphere.
              </p>
              <p>
                The project was built entirely in Figma for the interface design and interaction flows, with Blender used for 3D asset visualisation and Photoshop for texture and visual polish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors z-10"
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative w-[320px] md:w-[380px] rounded-[44px] overflow-hidden border-2 border-zinc-600 shadow-2xl bg-zinc-950 ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screens[lightboxIndex].src}
              alt={screens[lightboxIndex].label}
              width={390}
              height={844}
              className="w-full h-auto"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors z-10"
            aria-label="Next screen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3">
            <p className="text-sm text-zinc-300 font-medium">{screens[lightboxIndex].title}</p>
            <div className="flex gap-2">
              {screens.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx) }}
                  className={`h-2 rounded-full transition-all ${
                    idx === lightboxIndex ? "bg-purple-400 w-4" : "w-2 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                  aria-label={`Go to screen ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
