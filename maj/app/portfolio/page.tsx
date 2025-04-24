import InteractiveCard from "@/components/interactive-card"

const portfolioCategories = [
  {
    id: "ps-apocalypse",
    title: "P.S. Apocalypse",
    description: "Environmental concept art for a post-apocalyptic game world",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/key_frame_base_camp.jpg-mXXBlBNExQxCj43bmzDmz8YYC98BZw.jpeg",
    count: 8,
  },
  {
    id: "ethian-redem",
    title: "Ethian Redem",
    description: "Character designs and key art for fantasy RPG",
    image: "/placeholder.svg?height=600&width=800",
    count: 12,
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
          <h2 className="text-3xl font-bold mb-8 text-center">Portfolio Categories</h2>

          <div className="flex flex-wrap justify-center">
            {portfolioCategories.map((category) => (
              <div key={category.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                <InteractiveCard
                  id={category.id}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  href={`/portfolio/${category.id}`}
                  count={category.count}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
