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
    'Design d\'environnement du camp de travail',
    'Design de décor du camp de travail',
    'Art d\'environnement de la porte de la capitale Yirie',
    'Design de décor du château de Yirie',
    'Design du bâtiment principal de Yirie',
    'Design de la bannière et de la porte principale de Yirie',
    'Concept d\'environnement du camp de base de Demetrius',
    'Design de la maison creusée',
    'Design de décor de la maison creusée',
    'Design du personnage Demetrius',
    'Design du personnage Ellis',
    'Design du personnage Hades',
    'Design du personnage Haikal',
    'Design du personnage Milo',
    'Concepts de design du Château Vulkan',
    'Designs des accessoires de la forêt',
    'Designs des équipements d\'esclave',
    'Design d\'environnement Ether'
  ];
  return {
    src,
    alt: descriptions[index],
    description: descriptions[index]
  };
});

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
              Un projet de concept art pour un RPG néo-médiéval où l'esclave Demetrius se soulève et combat contre un empire cruel.
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
                <p>Concept Artist & Game Designer</p>
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

      {/* Description du projet */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos de ce projet</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                <em>Note: Le jeu présenté ici n'est pas représentatif du design visuel et systémique final, mais sert à illustrer le point de vue et l'intrigue.</em>
              </p>
              <p>
                The Ethians Redeemed est un RPG narratif se déroulant dans un monde dystopique néo-médiéval où l'Empire Yirie règne d'une main de fer.
                Le jeu suit Demetrius, un esclave qui se soulève pour combattre l'empire oppressif qui a dévasté sa patrie.
              </p>
              <p>
                Le concept art présente divers environnements, notamment des camps de travail, l'imposante capitale de Yirie, le camp de base caché de Demetrius, 
                ainsi que des designs de personnages qui reflètent la dure réalité de ce monde. Le style visuel mêle esthétique médiévale et éléments dystopiques
                pour créer une atmosphère unique.
              </p>
              <p>
                Mon rôle dans ce projet était de développer l'identité visuelle globale, comprenant les concepts d'environnements, les designs de personnages, 
                et les éléments architecturaux qui racontent l'histoire de l'oppression et de la résistance. Chaque lieu et personnage a été conçu
                pour véhiculer des éléments narratifs spécifiques et une résonance émotionnelle.
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
