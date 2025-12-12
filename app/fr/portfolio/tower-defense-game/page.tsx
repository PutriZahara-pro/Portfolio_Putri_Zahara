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
    'Vue Générale',
    'Tour d\'Automne',
    'Tour d\'Été',
    'Tour d\'Hiver',
    'Éléments & Props'
  ];
  const subDescriptions = [
    'Vue panoramique du monde du jeu Tower Defense',
    'Concept art d\'une tour défensive dans un environnement automnal',
    'Concept art d\'une tour défensive dans un environnement estival',
    'Concept art d\'une tour défensive dans un environnement hivernal',
    'Divers éléments et accessoires du monde Tower Defense'
  ];
  return {
    src,
    alt: descriptions[index],
    description: subDescriptions[index]
  };
});

export default function TowerDefenseGamePageFr() {
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
            Retour au Portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tower Defense Game</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Projet de concept art pour un jeu de tower defense, créant des assets d'habitations et d'environnements variés
              adaptés à différentes saisons.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Projet Personnel</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2023-2024</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Environnements & Tours saisonnières</p>
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
            <h2 className="text-3xl font-bold mb-8">À propos du projet</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                Ce projet de concept art explore l'univers des jeux tower defense à travers des designs 
                d'environnements saisonniers et d'habitations stylisées. Chaque tour a été conçue pour 
                s'intégrer harmonieusement dans son environnement tout en conservant une identité visuelle cohérente.
              </p>
              <p>
                L'approche créative s'est concentrée sur la façon dont l'architecture pourrait s'adapter 
                aux différentes conditions climatiques tout en maintenant sa fonction défensive. Les variations 
                saisonnières - été, automne et hiver - démontrent comment un même concept architectural 
                évolue visuellement tout en conservant son gameplay.
              </p>
              <p>
                Les props et éléments additionnels enrichissent le monde du jeu en ajoutant des détails 
                permettant de créer une expérience immersive pour le joueur. Ces détails contribuent à la
                construction d'un univers cohérent et crédible, tout en soutenant la direction artistique
                globale du projet.
              </p>
              <p>
                En tant que concept artist, j'ai cherché à créer un monde visuellement riche qui puisse
                servir de base solide pour un jeu complet, avec une attention particulière portée à
                l'intégration des éléments de gameplay dans le design des environnements.
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
