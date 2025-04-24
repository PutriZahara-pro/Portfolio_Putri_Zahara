"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox from "@/components/image-lightbox"

const images = [
  '/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/2.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/3.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/4.jpg'
].map((src, index) => ({
  src,
  alt: `Image ${index + 1} of P.S. Apocalypse Project`,
  description: 'Illustration for P.S. Apocalypse project'
}));

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
              Environmental concept art for a post-apocalyptic game world where nature has reclaimed abandoned human
              settlements.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
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
                <p>Junior Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Environment designs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {images.map((image, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg">
                <div
                  className="overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full object-cover" 
                    loading={index === 0 ? "eager" : "lazy"}
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
                settlements. The game explores themes of survival, hope, and rebuilding in a world forever changed by
                catastrophe.
              </p>
              <p>
                As the lead concept artist, I was responsible for establishing the visual language of the game world.
                This included creating environment concepts, key art, and mood boards to guide the art direction of the
                project.
              </p>
              <p>
                The art direction focused on creating a world that feels both desolate and beautiful, where nature's
                reclamation of human structures creates a unique aesthetic that is both haunting and hopeful. The color
                palette emphasizes the contrast between the lush greens of nature and the decaying grays of human
                civilization.
              </p>
              <p>
                Each environment was designed to tell a story about the people who once lived there and the events that
                led to their abandonment. Small details and environmental storytelling were key to creating a rich and
                immersive world for players to explore.
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
