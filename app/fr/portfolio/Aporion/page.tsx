"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  {
    src: '/images/Portfolio/Aporion/Harbor_thumbnail_final_obi.jpg',
    title: 'Ville fluviale portuaire',
    description: 'Ce concept art montre un port bondé dans une ville fluviale animée. La scène capture l’effervescence quotidienne des affaires, avec des navires marchands qui déchargent leurs marchandises et un marché très fréquenté.',
  },
  {
    src: '/images/Portfolio/Aporion/1.jpg',
    title: 'Callout Warehouse',
    description: "Pièce maîtresse du port de la ville fluviale, le design de cet entrepôt est devenu l’un des exploits architecturaux les plus emblématiques de la zone",
  },
  {
    src: '/images/Portfolio/Aporion/2.jpg',
    title: 'Warehouse',
    description: '',
  },
  {
    src: '/images/Portfolio/Aporion/3.jpg',
    title: 'Crane machine',
    description: 'Créer le design de la Crane machine et définir son fonctionnement pendant le gameplay',
  },
  {
    src: '/images/Portfolio/Aporion/4.jpg',
    title: 'Layout du port et processus',
    description: 'Visualiser le layout du port et le processus étape par étape, du blocking 3D initial jusqu’au concept final.',
  },
  {
    src: '/images/Portfolio/Aporion/riiver_town_city_obi_final.jpg',
    title: 'Ville fluviale',
    description: 'Cette scène capture le cœur de la ville, en mettant en valeur l’église historique et l’énergie du marché local',
  },
  {
    src: '/images/Portfolio/Aporion/3A46DB2E-AAFB-4E55-AE14-3FA791B8B74E.jpg',
    title: 'Layout de la ville fluviale',
    description: 'Plan complet et carte de navigation de la ville fluviale. Conçu pour aider l’équipe 3D avec le scaling, le placement des repères et le storytelling environnemental',
  },
  {
    src: '/images/Portfolio/Aporion/castle_final.jpg',
    title: 'Château de la ville fluviale',
    description: 'Cette scène met l’accent sur la verticalité et l’isolement. Le château est situé sur un terrain élevé, séparé de la ville par un pont, avec une rivière navigable pour le trafic de navires à sa base',
  },
  {
    src: '/images/Portfolio/Aporion/6.jpg',
    title: 'Indicateurs du château de la ville fluviale',
    description: 'Ce guide présente le design, les matériaux et l’agencement de la zone du château',
  },
  {
    src: '/images/Portfolio/Aporion/7.jpg',
    title: 'Sketch et callouts de la ville fluviale',
    description: 'Présentation des callouts et sketches du château de la ville fluviale.',
  },
].map((image) => ({
  src: image.src,
  alt: image.title,
  title: image.title,
  description: image.description,
}));

export default function AporionPageFr() {
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
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Aporion</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Aporion VTT est une plateforme de jeu de rôle sur table virtuelle de nouvelle génération, offrant des outils avancés pour permettre aux maîtres de jeu et aux joueurs de créer, personnaliser et explorer des aventures immersives ensemble.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Olive Branch Interactive</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ANNÉE</h3>
                <p>2025 - 2026</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">RÔLE</h3>
                <p>Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">LIVRABLES</h3>
                <p>Concept art d'environnement</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-zinc-400 mb-2 text-sm">OUTILS</h3>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-2 bg-zinc-800 rounded-full text-sm">Photoshop</span>
                <span className="px-4 py-2 bg-zinc-800 rounded-full text-sm">Blender</span>
                <span className="px-4 py-2 bg-zinc-800 rounded-full text-sm">Procreate</span>
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
                  <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                  {image.description ? (
                    <p className="text-zinc-300 mb-4">{image.description}</p>
                  ) : null}
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
            <h2 className="text-3xl font-bold mb-8">À propos de ce projet</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                Dans ce projet, j’ai occupé le rôle de Environment Concept Artist sur « Aporion », un jeu de rôle sur table en cours de développement par Olive Branch Interactive, basé à Groningen, aux Pays-Bas. J’ai utilisé un workflow combinant Photoshop pour le design 2D et Blender pour le blocking 3D. Cette technique rationalise le processus, permet des itérations plus rapides et une meilleure efficacité afin de répondre aux exigences de production.
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
