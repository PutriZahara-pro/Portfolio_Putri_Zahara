"use client";
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react"

const screens = [
  {
    src: "/images/Portfolio/cuisine-royale/screen-menu.png",
    label: "Écran 1 — Menu principal",
    title: "Menu principal",
    description:
      "L'écran d'accueil plonge le joueur dans l'univers culinaire royal du jeu. Il découvre le gain maximal et peut lancer une partie ou consulter les règles.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-regles.png",
    label: "Écran 2 — Règles",
    title: "Règles",
    description:
      "Une popup de règles s'affiche sur un panneau en bois chaleureux. Le joueur comprend le fonctionnement du grattage avant de choisir sa mise.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-gameplay.png",
    label: "Écran 3 — Gameplay",
    title: "Gameplay",
    description:
      "Une grille de 3×3 plats couverts à gratter un par un. Les niveaux de mise à 2€, 4€ ou 6€ ajustent le jackpot. Un compteur indique les grattages restants, avec un bouton « Révéler » pour tout découvrir d'un coup.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-reveal.png",
    label: "Écran 4 — Révélation",
    title: "Révélation",
    description:
      "Le plat gagnant est dévoilé avec une animation de cloche. Le montant du gain s'affiche en grand sur une bannière bordée d'or, avec la possibilité de continuer ou de retourner au menu.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-felicitations.png",
    label: "Écran 5 — Félicitations",
    title: "Félicitations",
    description:
      "L'écran gagnant explose de confettis et d'étoiles. Le gain est confirmé en grande typographie dorée, avec des boutons clairs pour rejouer ou retourner au menu.",
  },
  {
    src: "/images/Portfolio/cuisine-royale/screen-termine.png",
    label: "Écran 6 — Terminé",
    title: "Terminé",
    description:
      "En cas de partie sans gain, le joueur voit un écran sobre avec son résultat et une invitation à rejouer — le ton reste léger pour encourager l'engagement.",
  },
]

export default function CuisineRoyalePageFr() {
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

      {/* En-tête — mockup en fond avec fade */}
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
          {/* Desktop : fade depuis la gauche */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-zinc-900 from-40% via-zinc-900/70 via-65% to-transparent" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-b from-zinc-900/50 via-transparent to-zinc-900/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Cuisine Royale</h1>
            <p className="text-base text-zinc-300 mb-8 leading-relaxed">
              Projet UI/UX pour un jeu web mobile au format grattage, inspiré des jeux Illiko de la FDJ. Un univers culinaire royal avec des mécaniques de jeu immersives, conçu pour une expérience mobile-first.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Client</p>
                <p className="text-zinc-200">Projet personnel</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Année</p>
                <p className="text-zinc-200">2025</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Rôle</p>
                <p className="text-zinc-200">UI/UX Designer</p>
              </div>
              <div>
                <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">Livrables</p>
                <p className="text-zinc-200">Design application mobile</p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3">Outils</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Figma</span>
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Blender</span>
                <span className="px-4 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-full text-sm text-zinc-300">Photoshop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie des écrans — layout alterné case study */}
      <section className="pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-14 text-zinc-100">Écrans de l'application</h2>
          <div className="flex flex-col gap-20 max-w-4xl mx-auto">
            {screens.map((screen, i) => (
              <div
                key={screen.label}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Phone frame — cliquable */}
                <button
                  onClick={() => openLightbox(i)}
                  className="group flex-shrink-0 w-[220px] md:w-[240px] rounded-[36px] overflow-hidden border-2 border-zinc-700 hover:border-purple-500 shadow-2xl bg-zinc-950 ring-1 ring-white/5 hover:ring-purple-500/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 relative cursor-zoom-in"
                  aria-label={`Voir ${screen.title} en grand`}
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

      {/* Description du projet */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos du projet</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                Cuisine Royale est un projet UI/UX pour un jeu web mobile au format ticket à gratter, inspiré des jeux Illiko de la FDJ. Le concept mêle un univers culinaire royal à des mécaniques de jeu interactives, pensées pour une expérience mobile fluide et immersive.
              </p>
              <p className="mb-4">
                Le parcours joueur s'articule autour de six écrans clés : un menu principal avec l'accroche du jackpot, une popup de règles, la grille de gameplay où les plats sont grattés, un moment de révélation animé, un écran de félicitations et un écran de fin de partie. Chaque transition et micro-interaction a été pensée pour maintenir l'atmosphère immersive du jeu.
              </p>
              <p>
                Le projet a été entièrement conçu sur Figma pour les interfaces et les flows d'interaction, avec Blender pour la visualisation 3D des assets et Photoshop pour les textures et la finition visuelle.
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
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 p-3 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors z-10"
            aria-label="Écran précédent"
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
            aria-label="Écran suivant"
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
                  aria-label={`Écran ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
