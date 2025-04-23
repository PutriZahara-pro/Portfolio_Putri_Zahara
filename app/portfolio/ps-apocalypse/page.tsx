import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const artworks = [
  {
    id: 1,
    title: "Forest Clearing",
    description: "A hidden camp in the forest with small structures scattered throughout the clearing.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/key_frame_base_camp.jpg-mXXBlBNExQxCj43bmzDmz8YYC98BZw.jpeg",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 2,
    title: "Abandoned City",
    description: "Urban landscape reclaimed by nature after the apocalypse.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 3,
    title: "Underground Shelter",
    description: "A survivor's hideout beneath the ruins.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 4,
    title: "Wasteland",
    description: "Barren landscape with remnants of civilization.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
]

export default function PSApocalypsePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">P.S. Apocalypse</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Environmental concept art for a post-apocalyptic game world where nature has reclaimed abandoned human
              settlements.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h3 className="text-zinc-400 mb-1">CLIENT</h3>
                <p>Horizon Games</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">YEAR</h3>
                <p>2022-2023</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">ROLE</h3>
                <p>Junior Concept Artist</p>
              </div>
              <div>
                <h3 className="text-zinc-400 mb-1">DELIVERABLES</h3>
                <p>Environment Concepts, Key Art</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="bg-zinc-800 rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                  <p className="text-zinc-300 mb-4">{artwork.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <span>{artwork.year}</span>
                    <span>•</span>
                    <span>{artwork.tools}</span>
                  </div>
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
              <p>
                P.S. Apocalypse is a post-apocalyptic game set in a world where nature has reclaimed abandoned human
                settlements. The game explores themes of survival, hope, and rebuilding in a world forever changed by
                catastrophe.
              </p>
              <p>
                As the lead concept artist, I was responsible for establishing the visual language of the game world.
                This included creating environment concepts, key art, and mood boards to guide the art direction of the
                project.
              </p>
              <p>
                The art direction focused on creating a world that feels both desolate and beautiful, where nature's
                reclamation of human structures creates a unique aesthetic that is both haunting and hopeful. The color
                palette emphasizes the contrast between the lush greens of nature and the decaying grays of human
                civilization.
              </p>
              <p>
                Each environment was designed to tell a story about the people who once lived there and the events that
                led to their abandonment. Small details and environmental storytelling were key to creating a rich and
                immersive world for players to explore.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
