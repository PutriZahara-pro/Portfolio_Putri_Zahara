"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox from "@/components/image-lightbox"

const images = [
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/camp_du_travail_keyframe.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/design_dome_yirie.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/design_yirie_banner.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/dug_out_house.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/gate_capital_yirie.png',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/key_frame_base_camp.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_dimi_new.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_haikal_new.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_camp_travail.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_dug_out_house.jpg',
  '/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_yirie.jpg'
].map((src, index) => ({
  src,
  alt: `Image ${index + 1} of The Ethians Redeemed Project`,
  description: 'Illustration for The Ethians Redeemed project'
}));

export default function EthianRedemPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Ethians Redeemed</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Character designs and key art for a fantasy RPG set in the mythical world of Ethian.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>End-of-year project</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2024-2025</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Concept Artist & Game Designer</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Character Designs, Environment Concepts, UI</p>
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
                The Ethians Redeemed is a narrative RPG set in a dystopian world where the Yirie Empire rules with an iron fist.
                The game follows Demetreus, a farmer whose life was upended when imperial forces invaded his homeland.
              </p>
              <p>
                This project combines immersive storytelling with gameplay mechanics inspired by games like Undertale,
                where player choices directly influence the story progression and relationships with other characters.
              </p>
              <p>
                My role in this project was to create the main character designs, key environment concepts,
                and develop an immersive user interface that reflects the oppressive atmosphere of this world.
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
