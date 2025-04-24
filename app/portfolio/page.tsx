"use client";

import InteractiveCard from "@/components/interactive-card"

const portfolioCategories = [
  {
    id: "ps-apocalypse",
    title: "P.S. Apocalypse",
    description: "Environmental concept art for a post-apocalyptic game world",
    image: "/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg",
    count: 4,
  },
  {
    id: "ethian-redem",
    title: "The Ethians Redeemed",
    description: "Character designs and key art for a dystopian RPG",
    image: "/Portfolio_Putri_Zahara/images/title/titletitre.png",
    count: 11,
  },
  {
    id: "other-works",
    title: "Other Works",
    description: "Various concept art projects and personal works",
    image: "/placeholder.svg?height=600&width=800",
    count: 15,
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category) => (
              <InteractiveCard
                key={category.id}
                id={category.id}
                title={category.title}
                description={category.description}
                image={category.image}
                href={`/portfolio/${category.id}`}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
