"use client"

import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export default function GamePage() {
  return (
    <main className="pt-16 min-h-screen bg-zinc-900">
      {/* Bannière d'avertissement de développement */}
      <div className="mx-auto px-4 py-6">
        <div className="bg-orange-950/30 border-2 border-orange-500 rounded-xl p-4 mb-8 shadow-lg relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/5 blur-xl"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div>
              <h2 className="text-xl font-bold text-orange-500 flex items-center">
                En cours de développement
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              </h2>
              <p className="text-zinc-300">
                Cette section de jeu est actuellement en développement. Certaines fonctionnalités peuvent ne pas fonctionner comme prévu.
                Merci pour votre patience !
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/fr" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-400">The Ethians Redeemed</h1>
            <Link 
              href="/fr/portfolio/The_Ethians_Redeemed/" 
              className="bg-zinc-800 hover:bg-zinc-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm transition-all duration-300 border border-emerald-600/30 hover:border-emerald-500"
            >
              <span className="font-medium text-emerald-400">Concept Art</span>
              <span className="h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold">P</span>
            </Link>
          </div>
          
          <div className="rounded-xl border border-emerald-500/30 bg-zinc-800/70 shadow-lg backdrop-blur-sm p-4 mb-8 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
            {/* Conteneur principal avec taille fixe et centrage */}
            <div className="w-full flex items-center justify-center bg-black rounded-xl overflow-hidden">
              {/* Conteneur du jeu avec dimensions fixes */}
              <div id="game-wrapper" className="relative w-[800px] h-[600px]">
                {/* Le jeu lui-même */}
                <div id="game-container" className="w-full h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
