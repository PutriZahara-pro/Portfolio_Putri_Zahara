"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/2.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/3.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/4.jpg'
].map((src, index) => {
  const descriptions = [
    'P.S. Apocalypse Project',
    'Evelyn',
    'Explorations',
    'House'
  ];
  const subDescriptions = [
    'Concept art for P.S. Apocalypse project',
    'Character design with some props',
    'Research and sketch',
    'Concept building'
  ];
  return {
    src,
    alt: descriptions[index],
    description: subDescriptions[index]
  };
});

export default function PSApocalypsePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const lightboxImages = images.map(image => ({
    src: image.src,
    alt: image.alt
  }))

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">P.S. Apocalypse</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Concept art project for a game where a character named Evelyn tries to survive in their hometown Brooklyn (Park Slope) in a post-apocalyptic world.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Personal Project</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2022-2023</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Environment & Character designs</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-zinc-400 mb-1">TOOLS</h3>
              <p className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Photoshop</span>
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Blender</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {images.map((image, index) => (
              <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div
                  className="overflow-hidden"
                >
                  <ZoomableImage 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full object-cover" 
                    onClick={() => openLightbox(index)}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{image.alt}</h2>
                  <p className="text-zinc-300 mb-4">{image.description}</p>
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
                P.S. Apocalypse is a post-apocalyptic game set in a world where nature has reclaimed abandoned human
                settlements. The game explores themes of survival, hope, and rebuilding in a world forever changed by catastrophe.
              </p>
              <p>
                The purpose of this project is to create a visual of apocalyptic world from the point of view of teenager Evelyn's life.
                Rather than presenting a dark and depressing ambiance, the project aims to convey a literal Gen Z atmosphere
                despite being set in an apocalyptic world.
              </p>
              <p>
                As concept artist, I was responsible for establishing the visual language of the game world, focusing on
                Brooklyn's Park Slope neighborhood as the main setting. This included creating environment concepts, character
                designs, and building concepts that reflect how a teenage protagonist would navigate and interpret this changed world.
              </p>
              <p>
                The art direction emphasizes a balance between the harshness of a post-apocalyptic setting and the vibrant,
                sometimes irreverent perspective of a Gen Z character. This creates a unique aesthetic that tells a compelling
                story about adaptation and resilience through a contemporary teenage lens.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ImageLightbox
        images={lightboxImages}
        initialSlide={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </main>
  )
}
