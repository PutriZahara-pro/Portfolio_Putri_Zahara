"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ImageLightbox from "@/components/image-lightbox"

const artworks = [
  {
    id: 1,
    title: "Fantasy Landscape",
    description: "Concept art for a fantasy world with floating islands.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 2,
    title: "Sci-Fi Interior",
    description: "Futuristic space station interior design.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 3,
    title: "Character Lineup",
    description: "Various character designs for an animated series.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
  {
    id: 4,
    title: "Creature Study",
    description: "Exploration of mythical creature designs.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
]

export default function OtherWorksPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Other Works</h1>
            <p className="text-xl text-zinc-300 mb-8">
              A collection of various concept art projects and personal works spanning different genres and styles.
            </p>
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
            <h2 className="text-3xl font-bold mb-8">About These Works</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                This collection showcases a variety of concept art projects and personal works that I've created over
                the years. These pieces span different genres, styles, and techniques, demonstrating my versatility as
                an artist.
              </p>
              <p>
                Some of these works were created for client projects, while others are personal explorations and
                studies. Each piece represents a different challenge and opportunity to experiment with new ideas and
                techniques.
              </p>
              <p>
                Through these works, I've been able to explore different themes, moods, and visual styles. From
                fantastical landscapes to sci-fi environments, from character designs to creature concepts, each piece
                has allowed me to grow and develop as an artist.
              </p>
              <p>
                I believe that personal work and experimentation are essential for artistic growth. These pieces
                represent my ongoing journey to push my boundaries and explore new creative territories.
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
