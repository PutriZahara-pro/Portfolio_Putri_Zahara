"use client"

import { useEffect, useState } from 'react'

// Types for scene configuration
export interface CharacterConfig {
  position?: {
    left?: string
    right?: string
    top?: string
    bottom?: string
    center?: boolean
  }
  scale?: number
  animation?: string
  size?: {
    width: number
    height: number
  }
  flip?: boolean
  zIndex?: number
}

export interface SceneConfig {
  name: string
  description: string
  background: string
  characters: Record<string, CharacterConfig>
  type?: string
}

export interface AnimationConfig {
  duration: string
  timing: string
  iteration: string | number
  direction?: string
}

export interface CharacterBaseConfig {
  name: string
  baseSize: {
    width: number
    height: number
  }
  baseScale: number
  zIndex: number
  animations: Record<string, string>
}

export interface ScenesConfigData {
  version: number
  lastUpdate: number
  scenes: Record<string, SceneConfig>
  defaultSettings: {
    positions: Record<string, any>
    sizes: Record<string, any>
    scales: Record<string, number>
  }
  characters: Record<string, CharacterBaseConfig>
  animations: Record<string, AnimationConfig>
}

// Default configuration in case the fetch fails
const DEFAULT_CONFIG: ScenesConfigData = {
  version: 1,
  lastUpdate: Date.now(),
  scenes: {
    intro: {
      name: "Introduction",
      description: "Scène d'introduction du jeu",
      background: "/images/title/background.png",
      characters: {
        demetrius: {
          position: {
            left: "50%",
            top: "6%"
          },
          center: true,
          scale: 1.2,
          animation: "fade-in"
        }
      }
    }
  },
  defaultSettings: {
    positions: {
      left: { left: "30%", top: "6%" },
      right: { left: "65%", top: "6%" },
      center: { left: "50%", top: "6%", center: true }
    },
    sizes: {
      normal: { width: 535, height: 748 },
      small: { width: 400, height: 560 },
      large: { width: 600, height: 840 }
    },
    scales: {
      normal: 1,
      small: 0.8,
      large: 1.5,
      battle: 1.2
    }
  },
  characters: {
    demetrius: {
      name: "Demetrius",
      baseSize: { width: 520, height: 720 },
      baseScale: 1.15,
      zIndex: 20,
      animations: {
        idle: "float",
        attack: "shake"
      }
    }
  },
  animations: {
    idle: {
      duration: "2s",
      timing: "ease-in-out",
      iteration: "infinite",
      direction: "alternate"
    }
  }
}

// Hook to load scene configuration
export function useSceneConfig(): [ScenesConfigData, boolean, string?] {
  const [config, setConfig] = useState<ScenesConfigData>(DEFAULT_CONFIG)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Vérifier d'abord s'il y a une configuration en cache dans localStorage
        const cachedConfig = localStorage.getItem('game-config')
        if (cachedConfig) {
          try {
            const parsedConfig = JSON.parse(cachedConfig)
            console.log("Utilisation de la configuration mise en cache:", parsedConfig)
            setConfig(parsedConfig)
            setIsLoaded(true)
            return // Utiliser la configuration mise en cache
          } catch (e) {
            console.warn("Erreur lors de la lecture de la configuration mise en cache:", e)
            // Continuer avec le chargement depuis le fichier
          }
        }
        
        // Determine path prefix for GitHub Pages
        const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io')
          ? '/Portfolio_Putri_Zahara'
          : ''

        // Utiliser fetch avec un timestamp pour éviter le cache
        console.log("Chargement de la configuration depuis:", `${basePath}/config/scenes-config.json?t=${Date.now()}`)
        
        // Tentatives multiples en cas d'échec
        let response: Response | null = null;
        let retries = 3;
        
        while (retries > 0 && !response) {
          try {
            response = await fetch(`${basePath}/config/scenes-config.json?t=${Date.now()}`, {
              headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
              }
            });
            
            if (!response.ok) {
              throw new Error(`Failed to load configuration: ${response.status}`);
            }
          } catch (err) {
            console.warn(`Tentative de chargement échouée (${retries} restantes):`, err);
            retries--;
            response = null;
            
            if (retries > 0) {
              // Attendre 500ms avant de réessayer
              await new Promise(resolve => setTimeout(resolve, 500));
            } else {
              throw err; // Relancer l'erreur après la dernière tentative
            }
          }
        }
        
        if (!response) {
          throw new Error(`Failed to load configuration after multiple attempts`);
        }
        
        const data: ScenesConfigData = await response.json();
        console.log("Scene configuration loaded successfully", data)
        
        // Mettre en cache la configuration pour un accès plus rapide la prochaine fois
        localStorage.setItem('game-config', JSON.stringify(data))
        
        setConfig(data)
        setIsLoaded(true)
      } catch (err) {
        console.error("Error loading scene configuration:", err)
        setError(err instanceof Error ? err.message : "Unknown error loading configuration")
        setIsLoaded(true) // Mark as loaded even on error so we use default config
      }
    }

    loadConfig()
  }, [])

  return [config, isLoaded, error]
}

// Helper to get scene configuration
export function getSceneConfig(config: ScenesConfigData, sceneId: string): SceneConfig | null {
  return config.scenes[sceneId] || null
}

// Helper to get character configuration for a scene
export function getCharacterConfigForScene(
  config: ScenesConfigData, 
  sceneId: string, 
  characterId: string
): CharacterConfig | null {
  const scene = getSceneConfig(config, sceneId)
  return scene?.characters?.[characterId] || null
}

// Helper to get base character configuration
export function getBaseCharacterConfig(
  config: ScenesConfigData,
  characterId: string
): CharacterBaseConfig | null {
  return config.characters[characterId] || null
}

// Helper to get animation configuration
export function getAnimationConfig(
  config: ScenesConfigData,
  animationKey: string
): AnimationConfig | null {
  return config.animations[animationKey] || null
}
