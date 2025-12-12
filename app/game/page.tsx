"use client"

import { ArrowLeft, AlertTriangle, Gamepad2, Info, RefreshCw, Maximize2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function GamePage() {
  const [isClient, setIsClient] = useState(false)
  const [gameStatus, setGameStatus] = useState<'loading' | 'ready' | 'error'>('ready')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadingInterval = useRef<NodeJS.Timeout | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fonction pour recharger le jeu en cas d'erreur
  const reloadGame = () => {
    // Recharger l'iframe
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }
  
  // Fonction pour basculer en plein écran
  const toggleFullscreen = () => {
    if (!iframeRef.current) return
    
    try {
      if (!isFullscreen) {
        // Si l'iframe est dans un conteneur, mettre le conteneur en plein écran
        const container = iframeRef.current.parentElement
        if (container) {
          if (container.requestFullscreen) {
            container.requestFullscreen()
          }
          setIsFullscreen(true)
        }
      } else {
        // Sortir du mode plein écran
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Erreur lors du passage en plein écran:', error)
    }
  }

  return (
    <main className="pt-16 min-h-screen bg-zinc-900">
      {/* Banner d'avertissement de développement */}
      <div className="mx-auto px-4 py-6">
        <div className="bg-orange-950/30 border-2 border-orange-500 rounded-xl p-4 mb-8 shadow-lg relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/5 blur-xl"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <div>
              <h2 className="text-xl font-bold text-orange-500 flex items-center">
                Under Development
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              </h2>
              <p className="text-zinc-300">
                This game section is currently in development. Some features may not work as expected.
                Thank you for your patience!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-400">The Ethians Redeemed</h1>
            <Link 
              href="/portfolio/The_Ethians_Redeemed/" 
              className="bg-zinc-800 hover:bg-zinc-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm transition-all duration-300 border border-emerald-600/30 hover:border-emerald-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            >
              <span className="font-medium text-emerald-400">Concept Art</span>
            </Link>
          </div>
          
          {isClient ? (
            <div className="rounded-xl border border-emerald-500/30 bg-zinc-800/70 shadow-lg backdrop-blur-sm p-4 mb-8 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
              {/* Conteneur principal avec taille fixe et centrage */}
              {/* Conteneur du jeu avec effets néon et coins arrondis */}
              <div className="w-full flex items-center justify-center bg-black rounded-xl overflow-hidden relative group shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300">
                {/* Barre d'outils */}
                <div className="absolute top-2 right-2 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full text-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-300"
                    title="Plein écran"
                  >
                    <Maximize2 size={16} />
                  </button>
                  <button 
                    onClick={reloadGame}
                    className="p-2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full text-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-300"
                    title="Recharger"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
                
                {/* Conteneur du jeu avec dimensions fixes */}
                <div className="relative w-[800px] h-[600px]">
                  {/* Le jeu Ren'Py lui-même */}
                  <iframe 
                    ref={iframeRef}
                    src="/games/ethians_web/index.html" 
                    className="w-full h-full border-0"
                    title="The Ethians Redeemed"
                    allow="fullscreen"
                  ></iframe>
                  
                  {/* L'overlay de chargement a été supprimé */}
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-700/50">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Instructions</h3>
                <p className="text-zinc-300 text-sm">
                  Cliquez pour interagir avec l'histoire. Utilisez les options de dialogue pour prendre des décisions et 
                  faire avancer le récit. Vous pouvez suivre l'aventure de Demetrius dans sa quête pour libérer son peuple.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={toggleFullscreen}
                      className="px-5 py-2.5 rounded-full bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:bg-zinc-700 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300 text-sm font-medium flex items-center space-x-2"
                    >
                      <Maximize2 size={16} />
                      <span>Fullscreen</span>
                    </button>
                    <button 
                      onClick={reloadGame}
                      className="px-5 py-2.5 rounded-full bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:bg-zinc-700 hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-300 text-sm font-medium flex items-center space-x-2"
                    >
                      <RefreshCw size={16} />
                      <span>Reload Game</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                    <Info size={18} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <p className="text-xs text-zinc-300">
                      <span className="text-emerald-400 font-medium">Tip:</span> Use the fullscreen button for a better gaming experience. Press ESC to exit fullscreen mode.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-500/30 bg-zinc-800/70 shadow-lg backdrop-blur-sm p-8 mb-8">
              <div className="text-center">
                <div className="inline-block bg-zinc-900/50 p-3 rounded-full mb-6">
                  <Gamepad2 className="h-10 w-10 text-emerald-400" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                  Loading game...
                </h2>
                
                <div className="w-24 h-1 mx-auto bg-emerald-500 rounded-full mb-6"></div>
                
                <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
                  Please wait while the game experience loads.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Nous n'avons plus besoin de charger des scripts externes car le jeu est dans l'iframe */}
    </main>
  )
}

// Nous n'utilisons plus l'objet global EthiansGame
