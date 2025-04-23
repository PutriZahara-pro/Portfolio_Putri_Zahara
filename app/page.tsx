import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/key_frame_base_camp.jpg-mXXBlBNExQxCj43bmzDmz8YYC98BZw.jpeg"
            alt="Concept art showing a forest clearing with small structures"
            fill
            className="object-cover opacity-40"
            priority
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
              Creating immersive worlds and compelling narratives through visual storytelling
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center group transition-all"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="border border-zinc-600 hover:border-zinc-400 px-8 py-3 rounded-md font-medium flex items-center justify-center"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Works</h2>
            <Link href="/portfolio" className="text-emerald-400 hover:text-emerald-300 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Link href="/portfolio/ps-apocalypse" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/key_frame_base_camp.jpg-mXXBlBNExQxCj43bmzDmz8YYC98BZw.jpeg"
                  alt="P.S. Apocalypse concept art"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2">P.S. Apocalypse</h3>
                  <p className="text-zinc-300 text-sm">Environmental Concept Art</p>
                </div>
              </div>
            </Link>

            {/* Project 2 */}
            <Link href="/portfolio/ethian-redem" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Ethian Redem concept art"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Ethian Redem</h3>
                  <p className="text-zinc-300 text-sm">Character Design</p>
                </div>
              </div>
            </Link>

            {/* Project 3 */}
            <Link href="/portfolio/other-works" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Other concept art"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold mb-2">Other Works</h3>
                  <p className="text-zinc-300 text-sm">Various Projects</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
