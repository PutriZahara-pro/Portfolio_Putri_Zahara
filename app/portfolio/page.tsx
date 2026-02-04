"use client";

import InteractiveCard from "@/components/interactive-card"
import SlidingImageCard from "@/components/sliding-image-card"

// Images pour le défilement de la carte "Other Works"
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
  logoSrc?: string;
  logoAlt?: string;
  imagePosition?: string;
}

const portfolioCategories: PortfolioCategory[] = [
  {
    id: "Aporion",
    title: "Aporion",
    description: "Alternate gallery view of the project",
    image: "/images/Portfolio/Aporion/thumbnail.png",
    count: 10,
    logoSrc: "/images/Portfolio/Aporion/45T2jk7r3uq9zPyPdDvbsrkAD4M (1).png",
    logoAlt: "Aporion logo",
  },
  {
    id: "The_Ethians_Redeemed",
    title: "The Ethians Redeemed",
    description: "Character designs and key art for a dystopian RPG",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png",
    count: 18,
    imagePosition: "54% center",
  },
  {
    id: "ps-apocalypse",
    title: "P.S. Apocalypse",
    description: "Environmental concept art for a post-apocalyptic game world",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg",
    count: 4,
  },
  {
    id: "tower-defense-game",
    title: "Tower Defense Game",
    description: "Concept art project of tower defense game, creating assets of habitations and environments",
    image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/WORKSHOP_BATTLE_CHESS_1.jpg",
    count: 5,
  },
  {
    id: "book",
    title: "Sleeping Honey Beauty",
    description: "Children's pop-up book with illustrated fairytale story",
    image: "/images/Book/image pour cart 3D.jpg",
    count: 11,
  },
  {
    id: "other-works",
    title: "Other Works",
    description: "Various concept art projects and personal works",
    images: otherWorksImages,
    count: 8,
  },
]

export default function PortfolioPage() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Portfolio Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Explore my work across various projects, from environmental design to character concepts and visual
            development.
          </p>
        </div>
      </section>

      {/* Portfolio Categories */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {portfolioCategories.map((category) => {
              if (category.id === "other-works" && category.images) {
                return (
                  <SlidingImageCard
                    key={category.id}
                    id={category.id}
                    title={category.title}
                    description={category.description}
                    images={category.images}
                    href={`/portfolio/${category.id}`}
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
                  href={`/portfolio/${category.id}`}
                  count={category.count}
                  logoSrc={category.logoSrc}
                  logoAlt={category.logoAlt}
                  imagePosition={category.imagePosition}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
