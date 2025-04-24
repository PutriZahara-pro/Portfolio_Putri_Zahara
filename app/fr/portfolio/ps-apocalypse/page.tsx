"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox from "@/components/image-lightbox"

const images = [
  '/images/Portfolio/ps_apocalypse/1.jpg',
  '/images/Portfolio/ps_apocalypse/2.jpg',
  '/images/Portfolio/ps_apocalypse/3.jpg',
  '/images/Portfolio/ps_apocalypse/4.jpg'
].map((src, index) => ({
  src,
  alt: `Image ${index + 1} du projet P.S. Apocalypse`,
  description: 'Illustration du projet P.S. Apocalypse'
}));

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
              Art conceptuel environnemental pour un jeu post-apocalyptique où la nature a repris ses droits sur des établissements humains abandonnés.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Projet personnel</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2024-2025</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Artiste conceptuel</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Designs d'environnements</p>
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
              P.S. Apocalypse explore un monde post-apocalyptique où la nature a lentement repris ses droits sur les vestiges de la civilisation.
              Ce projet artistique vise à créer des environnements immersifs qui racontent l'histoire de ce qui s'est passé, tout en laissant place à l'imagination du spectateur.
            </p>
            <p className="text-lg text-zinc-300 mb-6">
              Chaque concept art montre un équilibre entre désolation et renouveau, entre les ruines de la civilisation humaine et la résurgence de la vie naturelle.
              Les couleurs, la composition et l'éclairage ont été soigneusement choisis pour évoquer à la fois mélancolie et espoir.
            </p>
            <p className="text-lg text-zinc-300">
              Mon objectif était de créer des environnements qui pourraient servir de base à un jeu vidéo post-apocalyptique, 
              tout en ayant une valeur artistique intrinsèque. Chaque image raconte sa propre histoire, tout en faisant partie d'un récit plus vaste.
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
