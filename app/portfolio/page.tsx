import Image from "next/image"
import Link from "next/link"

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category) => (
              <Link key={category.id} href={`/portfolio/${category.id}`} className="group">
                <div className="bg-zinc-800 rounded-lg overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                    <p className="text-zinc-300 mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">{category.count} artworks</span>
                      <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
