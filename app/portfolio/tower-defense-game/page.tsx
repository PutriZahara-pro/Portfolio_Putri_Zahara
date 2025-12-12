"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/general_view.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/Tower_Automne.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/Tower_Summer.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/Tower_Winter.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/Props.jpg'
].map((src, index) => {
  const descriptions = [
    'Overview',
    'Autumn Tower',
    'Summer Tower',
    'Winter Tower',
    'Elements & Props'
  ];
  const subDescriptions = [
    'Panoramic view of the Tower Defense game world',
    'Concept art of a defensive tower in an autumn environment',
    'Concept art of a defensive tower in a summer environment',
    'Concept art of a defensive tower in a winter environment',
    'Various elements and props from the Tower Defense world'
  ];
  return {
    src,
    alt: descriptions[index],
    description: subDescriptions[index]
  };
});

export default function TowerDefenseGamePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tower Defense Game</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Concept art project for a tower defense game, creating assets of habitations and varied environments
              adapted to different seasons.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Personal Project</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2023-2024</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Environments & Seasonal Towers</p>
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
            <h2 className="text-3xl font-bold mb-8">About the Project</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                This concept art project explores the universe of tower defense games through designs 
                of seasonal environments and stylized habitations. Each tower was designed to 
                integrate harmoniously into its environment while maintaining a coherent visual identity.
              </p>
              <p>
                The creative approach focused on how architecture could adapt 
                to different climate conditions while maintaining its defensive function. The seasonal 
                variations - summer, autumn, and winter - demonstrate how the same architectural concept 
                evolves visually while preserving its gameplay.
              </p>
              <p>
                The props and additional elements enrich the game world by adding details 
                that create an immersive experience for the player. These details contribute to 
                building a coherent and credible universe, while supporting the overall artistic 
                direction of the project.
              </p>
              <p>
                As a concept artist, I sought to create a visually rich world that could 
                serve as a solid foundation for a complete game, with particular attention paid to 
                integrating gameplay elements into the environmental design.
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
