import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const artworks = [
  {
    id: 1,
    title: "Paysage fantastique",
    description: "Concept art pour un monde fantastique avec îles flottantes.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 2,
    title: "Intérieur SF",
    description: "Conception d'intérieur de station spatiale futuriste.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2023",
    tools: "Digital Painting",
  },
  {
    id: 3,
    title: "Série de personnages",
    description: "Divers designs de personnages pour une série animée.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
  {
    id: 4,
    title: "Étude de créature",
    description: "Exploration de designs de créatures mythiques.",
    image: "/placeholder.svg?height=600&width=800",
    year: "2022",
    tools: "Digital Painting",
  },
]

export default function OtherWorksPageFr() {
  return (
    <main className="pt-16 bg-zinc-900">
      {/* En-tête du projet */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Link href="/fr/portfolio" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au portfolio
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Autres œuvres</h1>
            <p className="text-xl text-zinc-300 mb-8">
              Une collection de divers projets de concept art et de travaux personnels couvrant différents genres et styles.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie du projet */}
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

      {/* Description du projet */}
      <section className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">À propos de ces œuvres</h2>
            <div className="prose prose-invert max-w-none">
              <p>
                Cette collection présente une variété de projets de concept art et de travaux personnels que j'ai réalisés au fil des ans. Ces pièces couvrent différents genres, styles et techniques, démontrant ma polyvalence en tant qu'artiste.
              </p>
              <p>
                Certains de ces travaux ont été créés pour des clients, tandis que d'autres sont des explorations et études personnelles. Chaque pièce représente un défi différent et une opportunité d'expérimenter de nouvelles idées et techniques.
              </p>
              <p>
                À travers ces œuvres, j'ai pu explorer différents thèmes, ambiances et styles visuels. Des paysages fantastiques aux environnements de science-fiction, des designs de personnages aux concepts de créatures, chaque pièce m'a permis de grandir et de progresser en tant qu'artiste.
              </p>
              <p>
                Je crois que les travaux personnels et l'expérimentation sont essentiels pour la croissance artistique. Ces pièces représentent mon parcours continu pour repousser mes limites et explorer de nouveaux territoires créatifs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
