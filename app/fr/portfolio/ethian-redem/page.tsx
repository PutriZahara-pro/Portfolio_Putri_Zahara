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
  alt: `Image ${index + 1} du projet The Ethians Redeemed`,
  description: 'Illustration du projet The Ethians Redeemed'
}));

export default function EthianRedemPageFr() {
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
      {/* En-tête du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Ethians Redeemed</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Designs de personnages, environnements et illustrations clés pour un RPG narratif dans un monde dystopique.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Projet de fin d'année</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2024-2025</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Artiste conceptuel & Game Designer</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Designs de personnages, concepts d'environnements, interface utilisateur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie du projet */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {images.map((image, index) => (
              <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-hidden cursor-pointer" onClick={() => openLightbox(index)}>
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

      {/* Description détaillée */}
      <section className="pb-20 bg-zinc-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos du projet</h2>
            <p className="text-lg text-zinc-300 mb-6">
              The Ethians Redeemed est un RPG narratif se déroulant dans un monde dystopique où l'Empire Yirie règne d'une main de fer. 
              Les joueurs incarnent Dimitreus, un fermier dont la vie a été bouleversée lorsque les forces impériales ont envahi sa patrie.
            </p>
            <p className="text-lg text-zinc-300 mb-6">
              Ce projet combine une narration immersive avec des mécaniques de jeu inspirées de jeux comme Undertale, 
              où les choix du joueur influencent directement le déroulement de l'histoire et les relations avec les autres personnages.
            </p>
            <p className="text-lg text-zinc-300">
              Mon rôle dans ce projet était de créer les designs des personnages principaux, de concevoir les environnements clés 
              et de développer une interface utilisateur immersive qui reflète l'atmosphère oppressante de ce monde.
            </p>
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
