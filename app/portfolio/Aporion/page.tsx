"use client";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

const images = [
  {
    src: '/images/Portfolio/Aporion/Harbor_thumbnail_final_obi.jpg',
    title: 'Harbour river town',
    description: 'This concept art shows a crowded harbour in a lively river town. The scene captures the daily rush of business, featuring merchant ships unloading goods and a bustling marketplace.',
  },
  {
    src: '/images/Portfolio/Aporion/1.jpg',
    title: 'Callout Warehouse',
    description: "A centerpiece of the river town's harbor, this warehouse design has become one of the area's most iconic architectural feats",
  },
  {
    src: '/images/Portfolio/Aporion/2.jpg',
    title: 'Warehouse',
    description: '',
  },
  {
    src: '/images/Portfolio/Aporion/3.jpg',
    title: 'Crane machine',
    description: 'Creating a design for the crane machine and determining how it functions during gameplay',
  },
  {
    src: '/images/Portfolio/Aporion/4.jpg',
    title: 'Harbour layout and process',
    description: 'Visualizing the harbor layout and A step-by-step process from initial 3D blocking to final concept art',
  },
  {
    src: '/images/Portfolio/Aporion/riiver_town_city_obi_final.jpg',
    title: 'River town city',
    description: 'This scene captures the heart of the town, highlighting the historic church and the lively energy of the local market',
  },
  {
    src: '/images/Portfolio/Aporion/3A46DB2E-AAFB-4E55-AE14-3FA791B8B74E.jpg',
    title: 'Layout of the river town',
    description: 'Comprehensive river town layout and navigation map Designed to assist the 3D team with spatial scaling, landmark placement, and environmental storytelling',
  },
  {
    src: '/images/Portfolio/Aporion/castle_final.jpg',
    title: 'Castle of river town',
    description: 'This scene emphasizes verticality and isolation. The castle is situated on high terrain, separated from the town by a bridge, with a navigable river for ship traffic at its base',
  },
  {
    src: '/images/Portfolio/Aporion/6.jpg',
    title: 'River town castle indicators',
    description: 'This guide shows the design, materials, and layout of the castle area',
  },
  {
    src: '/images/Portfolio/Aporion/7.jpg',
    title: 'River town sketch and callout',
    description: 'Showing the callouts and sketches for the Castle River Town.',
  },
].map((image) => ({
  src: image.src,
  alt: image.title,
  title: image.title,
  description: image.description,
}));

export default function AporionPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Aporion</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Aporion VTT is the next generation of virtual tabletop platforms, offering unparalleled tools for game masters and players to create, customize, and explore immersive adventures together—no matter where they are.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Olive Branch Interactive</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2025 - 2026</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Environment Concept Art</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-zinc-400 mb-2 text-sm">TOOLS</h3>
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
            <h2 className="text-3xl font-bold mb-8">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                In this project, I served as the Environment Concept Artist for 'Aporion,' an upcoming tabletop game by Olive Branch Interactive, based in Groningen, Netherlands. I utilized a workflow combining Photoshop for 2D design and Blender for 3D block-outs. This technique streamlines the process, allowing for faster iterations and higher efficiency to meet production demands
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
