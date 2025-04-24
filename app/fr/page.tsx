import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"

export default function PageFr() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Section Héros */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/key_frame_base_camp.jpg"
            alt="Illustration conceptuelle montrant une clairière avec de petites structures"
            className="object-cover opacity-40 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="text-emerald-400">Putri Zahara</span>
              <br />
              Concept Artist
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8">
              Je crée des mondes immersifs et des récits captivants grâce à la narration visuelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/fr/portfolio"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center group transition-all"
              >
                Voir le portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/fr/about"
                className="border border-zinc-600 hover:border-zinc-400 px-8 py-3 rounded-md font-medium flex items-center justify-center"
              >
                À propos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
