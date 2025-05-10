"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/camp_du_travail_keyframe.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_camp_travail.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/gate_capital_yirie.png',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_yirie.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/design_dome_yirie.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/design_yirie_banner.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/key_frame_base_camp.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/dug_out_house.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/set_design_dug_out_house.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_dimi_new.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_ellis_new.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_hades_new.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_haikal_new.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_perso_milo_new.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_castle_vulkan.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_props_forest.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_props_slave.jpg',
  'https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/planche_set_design_ether.jpg'
].map((src, index) => {
  const descriptions = [
    'Labor camp environment design',
    'Set design of the labor camp',
    'Environment art of the gate of the Yirie capital',
    'Set design of Yirie castle',
    'The design of the Yirie main building',
    'Design Yirie banner and the main gate',
    'Environment concept of Demetrius base camp',
    'Design of the dug out house',
    'Set design of the dug out house',
    'Character design of Demetrius',
    'Character design of Ellis',
    'Character design of Hades',
    'Character design of Haikal',
    'Character design of Milo',
    'Castle Vulkan design concepts',
    'Forest props designs',
    'Slave equipment props designs',
    'Ether environment set design'
  ];
  return {
    src,
    alt: descriptions[index],
    description: descriptions[index]
  };
});

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
              A concept art project for video game RPG, neo-medieval where the slave, Demetrius, rises and fights against the cruel empire.
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
              <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div
                  className="overflow-hidden"
                >
                  <ZoomableImage 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full object-cover h-[300px]" 
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
              <p className="mb-4">
                <em>Note: The game shown here is not representative of the final visual and systematic design, but serves to illustrate the point of view and storyline.</em>
              </p>
              <p>
                The Ethians Redeemed is a narrative RPG set in a neo-medieval dystopian world where the Yirie Empire rules with an iron fist.
                The game follows Demetrius, a slave who rises up to fight against the oppressive empire that has devastated his homeland.
              </p>
              <p>
                The concept art showcases various environments including labor camps, the imposing Yirie capital, Demetrius's hidden base camp, 
                and character designs that reflect the harsh reality of this world. The visual style blends medieval aesthetics with dystopian elements
                to create a unique atmosphere.
              </p>
              <p>
                My role in this project was to develop the overall visual identity, including environment concepts, character designs, 
                and architectural elements that tell the story of oppression and resistance. Each location and character was designed
                to convey specific narrative elements and emotional resonance.
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
