"use client";

import InteractiveCard from "@/components/interactive-card"
import SlidingImageCard from "@/components/sliding-image-card"
import { Metadata } from "next"
import { pagesSEO } from "@/data/seo-content"

// Export des métadonnées pour le SEO (doit être dans un composant serveur séparé)
// export const metadata: Metadata = {
//   title: pagesSEO.portfolio.title,
//   description: pagesSEO.portfolio.description,
//   keywords: pagesSEO.portfolio.keywords.join(", "),
//   openGraph: pagesSEO.portfolio.openGraph,
// }

// Images pour le défilement de la carte "Autres œuvres" avec alt texts optimisés
const otherWorksImages = [
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Fallout_fanart/Zahara_Putri_AG4_Fallout_environnement.jpg",
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Chaudrons/Chaudron_araignée.jpg",
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Ismi.jpg",
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/gnome_3_volume.jpg",
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_chariot_couleur.jpg",
  "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Washing_machine/Washing_machine.jpg",
  "/images/Portfolio/Other_works/building/1E1A1C08-ED86-407D-A752-0091CA984F94.jpg",
  "/images/Portfolio/Other_works/eletric_field/6FA3148D-3C31-49D4-8000-7EEE421AB5E9.jpg",
];

// Mise à jour de l'interface pour inclure le champ 'images'
interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  count: number;
}

const portfolioCategories: PortfolioCategory[] = [
  {
    id: "The_Ethians_Redeemed",
    title: "The Ethians Redeemed",
    description: "Designs de personnages et environnements pour un RPG narratif dans un monde dystopique. Explorez la carte du monde complète, les environnements de Demetrius, Yirie, Ether et Vulkan, ainsi que les personnages principaux avec leurs équipements détaillés.",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png",
    count: 18,
  },
  {
    id: "ps-apocalypse",
    title: "P.S. Apocalypse",
    description: "Illustrations de concepts d'environnement pour un monde post-apocalyptique. Découvrez des paysages désolés où la nature reprend ses droits sur les ruines de la civilisation.",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg",
    count: 4,
  },
  {
    id: "tower-defense-game",
    title: "Tower Defense Game",
    description: "Projet de concept art pour un jeu de tower defense médiéval-fantastique. Création d'habitations, d'ateliers de bataille et d'environnements stratégiques pour gameplay immersif.",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/WORKSHOP_BATTLE_CHESS_1.jpg",
    count: 5,
  },
  {
    id: "book",
    title: "La Belle aux miel dormant",
    description: "Livre pop-up pour enfants avec une histoire de conte de fées illustrée. Création d'un univers narratif complet avec personnages, décors et mécanismes pop-up interactifs.",
    image: "/images/Book/image pour cart 3D.jpg",
    count: 11,
  },
  {
    id: "other-works",
    title: "Autres œuvres",
    description: "Collection variée de projets de concept art et travaux personnels : fanart Fallout, créatures originales, objets magiques, gnomes fantasy, véhicules futuristes et designs expérimentaux.",
    images: otherWorksImages,
    count: 8,
  },
]

export default function PortfolioPageFr() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio Concept Art - Putri Zahara",
            "description": pagesSEO.portfolio.description,
            "url": "https://putrizahara.com/fr/portfolio",
            "author": {
              "@type": "Person",
              "name": "Putri Zahara",
              "jobTitle": "Concept Artist",
              "url": "https://putrizahara.com"
            },
            "mainEntity": {
              "@type": "ImageGallery",
              "name": "Portfolio Concept Art",
              "description": "Collection de concept art pour jeux vidéo, environnements et personnages"
            }
          })
        }}
      />

      {/* Section Portfolio */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio Concept Art</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Découvrez mon travail à travers différents projets, de la conception d'environnements dystopiques aux concepts de personnages détaillés et au développement visuel pour jeux vidéo et médias interactifs.
          </p>
        </div>
      </section>

      {/* Catégories */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category) => {
              if (category.id === "other-works" && category.images) {
                return (
                  <SlidingImageCard
                    key={category.id}
                    id={category.id}
                    title={category.title}
                    description={category.description}
                    images={category.images}
                    href={`/fr/portfolio/${category.id}`}
                    count={category.count}
                  />
                );
              }
              
              return (
                <InteractiveCard
                  key={category.id}
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  image={category.image || ""}
                  href={`/fr/portfolio/${category.id}`}
                  count={category.count}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
