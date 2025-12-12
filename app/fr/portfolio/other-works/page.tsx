"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, ZoomIn } from "lucide-react"
import { useState, useEffect } from "react"
import ImageLightbox, { ZoomableImage } from "@/components/image-lightbox"

// Définition des catégories
const CATEGORIES = {
  ALL: "Tous les projets",
  CREATURES: "Créatures",
  PROPS: "Props",
  ENVIRONMENTS: "Environnements",
  CHARACTERS: "Personnages",
}

// Restructurer les artworks pour regrouper les images par projet
const projects = [
  {
    id: 1,
    title: "Chaudrons",
    description: "Designs de chaudrons magiques avec des thématiques spécifiques.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Chaudrons/Chaudron_araignée.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Chaudrons/Chaudron_araignée.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Chaudrons/Chaudron_filtre_damour.jpg"
    ],
    year: "2023",
    tools: "Digital Painting",
    category: CATEGORIES.PROPS,
    featured: true,
  },
  {
    id: 2,
    title: "Concept Monstres",
    description: "Créatures fantastiques inspirées de mythologies diverses.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Ismi.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Ismi.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Karkinos.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Iran.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Pili.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/compilation_concepts.png",
    ],
    year: "2023",
    tools: "Digital Painting",
    category: CATEGORIES.CREATURES,
    featured: true,
  },
  {
    id: 3,
    title: "Fallout Fanart",
    description: "Environnement post-apocalyptique inspiré de l'univers Fallout.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Fallout_fanart/Zahara_Putri_AG4_Fallout_environnement.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Fallout_fanart/Zahara_Putri_AG4_Fallout_environnement.jpg"
    ],
    year: "2022",
    tools: "Digital Painting",
    category: CATEGORIES.ENVIRONMENTS,
    featured: true,
  },
  {
    id: 4,
    title: "Gnomes",
    description: "Études volumétriques et recherches de gnomes.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/gnome_3_volume.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/gnome_3_volume.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/gnome_recherche.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/volume_1.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/volume_2.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/volume_3.jpg"
    ],
    year: "2022",
    tools: "Digital Painting",
    category: CATEGORIES.CHARACTERS,
    featured: false,
  },
  {
    id: 5,
    title: "Marchand Ambulant",
    description: "Concept de personnage et chariot de marchand ambulant.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_chariot_couleur.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_chariot_couleur.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_personnage.jpg",
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_chariot.jpg"
    ],
    year: "2023",
    tools: "Digital Painting",
    category: CATEGORIES.CHARACTERS,
    featured: true,
  },
  {
    id: 6,
    title: "Machine à Laver",
    description: "Étude.",
    mainImage: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Washing_machine/Washing_machine.jpg",
    images: [
      "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Washing_machine/Washing_machine.jpg"
    ],
    year: "2022",
    tools: "Digital Painting",
    category: CATEGORIES.PROPS,
    featured: false,
  },
  {
    id: 7,
    title: "Bâtiment Moderne",
    description: "Étude.",
    mainImage: "/images/Portfolio/Other_works/building/1E1A1C08-ED86-407D-A752-0091CA984F94.jpg",
    images: [
      "/images/Portfolio/Other_works/building/1E1A1C08-ED86-407D-A752-0091CA984F94.jpg"
    ],
    year: "2023",
    tools: "Digital Painting",
    category: CATEGORIES.ENVIRONMENTS,
    featured: true,
  },
  {
    id: 8,
    title: "Champ Électrique",
    description: "Étude.",
    mainImage: "/images/Portfolio/Other_works/eletric_field/6FA3148D-3C31-49D4-8000-7EEE421AB5E9.jpg",
    images: [
      "/images/Portfolio/Other_works/eletric_field/6FA3148D-3C31-49D4-8000-7EEE421AB5E9.jpg"
    ],
    year: "2023",
    tools: "Digital Painting",
    category: CATEGORIES.ENVIRONMENTS,
    featured: true,
  },
]

export default function OtherWorksPageFr() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL)
  const [filteredProjects, setFilteredProjects] = useState(projects)

  // Filtrer les projets selon la catégorie sélectionnée
  useEffect(() => {
    if (selectedCategory === CATEGORIES.ALL) {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory))
    }
  }, [selectedCategory])

  // Préparer les images pour la lightbox quand un projet est cliqué
  const openProjectLightbox = (projectIndex: number, imageIndex: number = 0) => {
    const project = filteredProjects[projectIndex];
    setCurrentProjectImages(project.images);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <main className="pt-16 bg-zinc-900">
      {/* Section d'en-tête */}
      <section className="py-20 relative bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au Portfolio
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">Autres Œuvres</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Une collection de divers projets de concept art et travaux personnels présentant différents styles et sujets.
            </p>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 mb-10">
              {Object.values(CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {selectedCategory === CATEGORIES.ALL ? "Tous les Projets" : selectedCategory}
            <span className="text-zinc-400 text-sm ml-2">({filteredProjects.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, projectIndex) => (
              <div 
                key={project.id} 
                className="relative group bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => openProjectLightbox(projectIndex)}
              >
                {/* Effet de superposition d'images */}
                <div className="relative w-full overflow-hidden" style={{ minHeight: "220px" }}>
                  {/* Images en arrière-plan, décalées */}
                  {project.images.length > 1 && project.images.slice(1, 3).map((img, imgIndex) => (
                    <div 
                      key={imgIndex}
                      className="absolute"
                      style={{
                        top: `${5 + imgIndex * 3}px`,
                        left: `${5 + imgIndex * 5}px`,
                        right: `${5 + imgIndex * 3}px`,
                        bottom: '10px',
                        transform: `rotate(${imgIndex % 2 === 0 ? 2 : -2}deg)`,
                        zIndex: 1 + imgIndex
                      }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-lg">
                        <img 
                          src={img} 
                          alt={`${project.title}`} 
                          className="w-full h-full object-cover opacity-60"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* Image principale au-dessus */}
                  <div className="relative w-full h-full z-10">
                    <img 
                      src={project.mainImage} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-emerald-500/80 p-2 rounded-full">
                        <ZoomIn className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-xs bg-zinc-900/80 text-zinc-300 px-2 py-1 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  
                  {/* Indicateur montrant le nombre d'images */}
                  {project.images.length > 1 && (
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20">
                      {project.images.length} images
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-zinc-300 mb-4 text-sm flex-grow">{project.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-zinc-400 text-xs">{project.tools}</span>
                    <span className="text-emerald-500 text-xs font-medium bg-emerald-900/20 px-2 py-0.5 rounded-full">{project.category}</span>
                  </div>
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
            <h2 className="text-3xl font-bold mb-8 text-center">À Propos de Ces Travaux</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                Cette collection présente divers projets de concept art et travaux personnels que j'ai créés au fil 
                des années. Ces pièces couvrent différents genres, styles et techniques, démontrant ma polyvalence 
                en tant que Concept Artist.
              </p>
              <p>
                Certaines de ces œuvres ont été créées pour des projets clients, tandis que d'autres sont des 
                explorations et études personnelles. Chaque pièce représente un défi différent et une opportunité 
                d'expérimenter de nouvelles idées et techniques.
              </p>
              <p>
                À travers ces travaux, j'ai pu explorer différents thèmes, ambiances et styles visuels. Des paysages 
                fantastiques aux environnements de science-fiction, des designs de personnages aux concepts de 
                créatures, chaque pièce m'a permis de grandir et de me développer en tant qu'artiste.
              </p>
              <p>
                Je crois que le travail personnel et l'expérimentation sont essentiels pour la croissance artistique. 
                Ces pièces représentent mon parcours continu pour repousser mes limites et explorer de nouveaux 
                territoires créatifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <ImageLightbox
          images={currentProjectImages.map(src => ({ src, alt: '' }))}
          initialSlide={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </main>
  )
}
