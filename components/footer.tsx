"use client"

import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname() || ""
  const isFrenchVersion = pathname.startsWith("/fr")
  const prefix = isFrenchVersion ? "/fr" : ""

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href={isFrenchVersion ? "/fr" : "/"} className="text-xl font-bold text-emerald-400 mb-4 block">
              Putri Zahara
            </Link>
            <p className="text-zinc-400 mb-6 max-w-md">
              Junior concept artist for games, films, and animation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/putri-zaharapro/" className="text-zinc-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:putrizahara972015@gmail.com" className="text-zinc-400 hover:text-white">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{isFrenchVersion ? "Navigation" : "Navigation"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={isFrenchVersion ? "/fr" : "/"} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "Accueil" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/about`} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "À propos" : "About"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio`} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "Portfolio" : "Portfolio"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/contact`} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "Contact" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{isFrenchVersion ? "Projets" : "Projects"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${prefix}/portfolio/ps-apocalypse`} className="text-zinc-400 hover:text-white">
                  P.S. Apocalypse
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio/The_Ethians_Redeemed`} className="text-zinc-400 hover:text-white">
                  The Ethians Redeemed
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio/Aporion`} className="text-zinc-400 hover:text-white">
                  Aporion
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio/tower-defense-game`} className="text-zinc-400 hover:text-white">
                  Tower Defense Game
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio/book`} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "La Belle au miel dormant" : "Sleeping Honey Beauty"}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/portfolio/other-works`} className="text-zinc-400 hover:text-white">
                  {isFrenchVersion ? "Autres œuvres" : "Other Works"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
          <p>&copy; 2022-2025 Putri Zahara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
