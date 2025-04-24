"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ImageLightbox from "@/components/image-lightbox"

const artworks = [
  {
    id: 1,
    title: "Main Character Design",
    description: "The protagonist of Ethian Redem, a warrior with a mysterious past.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 2,
    title: "Antagonist Design",
    description: "The main villain of the story, corrupted by ancient magic.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 3,
    title: "Supporting Characters",
    description: "The hero's companions on their journey.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
  {
    id: 4,
    title: "Creature Designs",
    description: "Various creatures and monsters from the world of Ethian.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
]

export default function EthianRedemPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const lightboxImages = artworks.map((artwork) => ({
    src: artwork.image,
    alt: artwork.title,
  }))

  return (
    <main className="pt-16 bg-zinc-900">
      {/* Project Header */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Link href="/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ethian Redem</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Character designs and key art for a fantasy RPG set in the mythical world of Ethian.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Crystal Forge Studios</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2022-2023</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Junior Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Character Designs, Creature Concepts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className="bg-zinc-800 rounded-lg overflow-hidden">
                <div
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="sr-only">View image</span>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/80 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14 21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                  <p className="text-zinc-300 mb-4">{artwork.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <span>{artwork.year}</span>
                    <span>•</span>
                    <span>{artwork.tools}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                Ethian Redem is a fantasy RPG set in a world where ancient magic and modern technology coexist. The game
                follows the journey of a hero who must unite warring factions to face a common threat.
              </p>
              <p>
                As the character concept artist, I was responsible for designing the main characters, supporting cast,
                and various creatures that inhabit the world of Ethian. Each character was designed with a unique visual
                identity that reflects their personality, background, and role in the story.
              </p>
              <p>
                The art direction for the characters focused on creating designs that are both visually striking and
                functional within the game world. The character designs blend elements of traditional fantasy with
                unique cultural influences to create a fresh and distinctive look.
              </p>
              <p>
                Special attention was paid to the details of each character's costume, weapons, and accessories to
                ensure they tell a story about who the character is and their place in the world. These visual cues help
                players connect with the characters and understand their motivations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        initialSlide={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  )
}
