"use client";

import InteractiveCard from "@/components/interactive-card"

const portfolioCategories = [
  {
    id: "ps-apocalypse",
    title: "P.S. Apocalypse",
    description: "Illustrations de concepts d'environnement pour un monde post-apocalyptique",
    image: "/images/Portfolio/ps_apocalypse/1.jpg",
    count: 4,
  },
  {
    id: "ethian-redem",
    title: "The Ethians Redeemed",
    description: "Designs de personnages et environnements pour un RPG narratif dans un monde dystopique",
    image: "/images/title/titletitre.png",
    count: 6,
  },
  {
    id: "other-works",
    title: "Autres œuvres",
    description: "Divers projets de concept art et travaux personnels",
    image: "/placeholder.svg?height=600&width=800",
    count: 15,
  },
]

export default function PortfolioPageFr() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* Section Portfolio */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h1>
          <p className="text-xl text-zinc-300 max-w-3xl">
            Découvrez mon travail à travers différents projets, de la conception d'environnements aux concepts de personnages et au développement visuel.
          </p>
        </div>
      </section>

      {/* Catégories */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category) => (
              <InteractiveCard
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                href={`/fr/portfolio/${category.id}`}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
