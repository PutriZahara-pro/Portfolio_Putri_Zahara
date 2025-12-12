import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import GithubImage from "@/components/github-image"
import InnovativeButtons from "@/components/innovative-buttons"
import { Metadata } from "next"
import { pagesSEO } from "@/data/seo-content"

export const metadata: Metadata = {
  title: pagesSEO.home.title,
  description: pagesSEO.home.description,
  keywords: pagesSEO.home.keywords.join(", "),
  openGraph: {
    title: pagesSEO.home.openGraph?.title,
    description: pagesSEO.home.openGraph?.description,
    images: [pagesSEO.home.openGraph?.image || ""],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: pagesSEO.home.openGraph?.title,
    description: pagesSEO.home.openGraph?.description,
    images: [pagesSEO.home.openGraph?.image || ""],
  },
  alternates: {
    canonical: "https://putrizahara.com/fr/",
    languages: {
      'en': "https://putrizahara.com/en/",
      'fr': "https://putrizahara.com/fr/",
    },
  },
}

export default function PageFr() {
  return (
    <main className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Section Héros */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GithubImage
            src="images/environement/key_frame_base_camp.jpg"
            alt="Concept art environnement The Ethians Redeemed - Vue panoramique d'un camp de base dystopique avec structures détaillées par Putri Zahara concept artist"
            className="object-cover opacity-40 w-full h-full"
            priority={true}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-emerald-400 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Putri Zahara</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 text-zinc-100">Concept Artist</h2>
            <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Je crée des mondes immersifs et des récits captivants grâce à la narration visuelle
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <InnovativeButtons frenchVersion={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
