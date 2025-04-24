"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GameEngine from "@/components/game/game-engine"
import { Button } from "@/components/ui/button"

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  return (
    <main className="pt-16 min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-400">The Ethians Redeemed</h1>
            <Link 
              href="/portfolio/ethian-redem/" 
              className="bg-zinc-800 hover:bg-zinc-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm transition-all duration-300 border border-emerald-600/30 hover:border-emerald-500"
            >
              <span className="font-medium text-emerald-400">Concept art</span>
              <span className="h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold">P</span>
            </Link>
          </div>
          <p className="text-xl text-zinc-300 mb-8">
            An interactive story set in the neo-medieval world of The Ethians Redeemed.
          </p>

          {showIntro && !gameStarted ? (
            <div className="bg-zinc-900 rounded-xl mb-8 overflow-hidden shadow-lg border border-zinc-800">
              {/* Banner de jeu */}
              <div className="h-40 bg-gradient-to-r from-emerald-900/80 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/Portfolio_Putri_Zahara/images/title/titletitre.png')] bg-cover bg-center"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                <h2 className="text-3xl font-bold text-white relative z-10 text-center">The Ethians Redeemed Experience</h2>
              </div>
              
              <div className="p-8">
                <div className="max-w-2xl mx-auto text-center mb-8">
                  <h3 className="text-xl font-medium mb-3 text-emerald-400">About This Game</h3>
                 
                  <div className="space-y-4">
                    <p className="text-zinc-300">Play as Dimitreus, a farmer enslaved by the Empire Yirie after losing his family during the invasion of his homeland.</p>
                    <div className="flex justify-center my-6">
                      <div className="h-px w-24 bg-emerald-500/30"></div>
                    </div>
                    <p className="text-zinc-300">Your choices determine your fate: seek revenge or find a different path to freedom. Every decision shapes your destiny in this neo-medieval world.</p>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6">
                  <Button
                    onClick={() => {
                      setShowIntro(false)
                      setGameStarted(true)
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 h-auto text-base font-medium rounded-full"
                  >
                    Start Game
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowIntro(false)}
                    className="border-zinc-600 hover:border-zinc-400 px-8 py-6 h-auto text-base font-medium rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ) : !gameStarted ? (
            <div className="bg-zinc-800 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">The World of The Ethians Redeemed</h2>
              <p className="mb-4">
                The Ethians Redeemed is set in a unique world that combines medieval aesthetics with elements from the
                20th century. The Empire Yirie, facing overpopulation and resource scarcity, has conquered the Kingdom
                of Ether for its fertile lands.
              </p>
              <p className="mb-4">
                You play as Dimitreus, a former farmer whose peaceful life was shattered when the Empire invaded,
                killing his family and enslaving him. Now, working in a labor camp, Dimitreus plans his escape and
                revenge.
              </p>
              <p className="mb-4">
                The game features key characters including Prince Haikal (the exiled heir to Ether's throne), the cruel
                Commandant Milo, Emperor Hades, and Queen Ellis of the Kingdom Vulkan.
              </p>
              <p className="mb-6">
                Will you choose violence and revenge, or find another path? Your choices will shape the fate of
                Dimitreus and the world around him.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => setGameStarted(true)} className="bg-emerald-600 hover:bg-emerald-700 rounded-full">
                  Start Game
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowIntro(true)}
                  className="border-zinc-600 hover:border-zinc-400 rounded-full"
                >
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <GameEngine />
          )}
        </div>
      </div>
    </main>
  )
}
