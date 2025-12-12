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
    'Projet P.S. Apocalypse',
    'Evelyn',
    'Explorations',
    'Maison'
  ];
  const subDescriptions = [
    'Concept art pour le projet P.S. Apocalypse',
    'Design de personnage avec accessoires',
    'Recherches et croquis',
    'Concept de bâtiment'
  ];
  return {
    src,
    alt: descriptions[index],
    description: subDescriptions[index]
  };
});

export default function PsApocalypsePageFr() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">P.S. Apocalypse</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Projet de concept art pour un jeu où Evelyn tente de survivre dans sa ville natale Brooklyn (Park Slope) dans un monde post-apocalyptique.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Projet personnel</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2022-2023</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Concept Artiste</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Designs d'environnements & personnages</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-zinc-400 mb-1">OUTILS</h3>
              <p className="flex items-center gap-3">
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Photoshop</span>
                <span className="bg-zinc-700 px-3 py-1 rounded-full">Blender</span>
              </p>
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

      {/* Description du projet */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos de ce projet</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                P.S. Apocalypse est un jeu post-apocalyptique se déroulant dans un monde où la nature a repris ses droits sur des établissements humains abandonnés. Le jeu explore des thèmes de survie, d'espoir et de reconstruction dans un monde à jamais changé par la catastrophe.
              </p>
              <p>
                L'objectif de ce projet est de créer une représentation visuelle d'un monde apocalyptique du point de vue de la vie d'une adolescente, Evelyn. Plutôt que de présenter une ambiance sombre et déprimante, le projet vise à transmettre une atmosphère littéralement "Génération Z" malgré le contexte apocalyptique.
              </p>
              <p>
                En tant qu'artiste concept, j'étais responsable d'établir le langage visuel du monde du jeu, en me concentrant sur le quartier de Park Slope à Brooklyn comme décor principal. Cela comprenait la création de concepts d'environnements, de designs de personnages et de concepts de bâtiments qui reflètent comment une protagoniste adolescente navigue et interprète ce monde transformé.
              </p>
              <p>
                La direction artistique met l'accent sur un équilibre entre la dureté d'un cadre post-apocalyptique et la perspective vibrante, parfois irrévérencieuse, d'un personnage de la Génération Z. Cela crée une esthétique unique qui raconte une histoire convaincante d'adaptation et de résilience à travers le prisme contemporain d'une adolescente.
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
