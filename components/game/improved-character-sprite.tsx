"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useSceneConfig, CharacterConfig, getCharacterConfigForScene, getBaseCharacterConfig } from "./scene-config-loader"

interface CharacterSpriteProps {
  characterId: string
  sceneId: string
  action?: 'idle' | 'hurt' | 'attack' | 'victory' | 'defeat'
  isBattle?: boolean
  customScale?: number
  customPosition?: {
    left?: string
    right?: string
    top?: string
    bottom?: string
  }
}

export default function ImprovedCharacterSprite({
  characterId,
  sceneId,
  action = 'idle',
  isBattle = false,
  customScale,
  customPosition
}: CharacterSpriteProps) {
  const [config, isConfigLoaded] = useSceneConfig()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [errorLoading, setErrorLoading] = useState(false)
  
  // Récupérer les configurations du personnage
  const sceneCharacterConfig = useMemo(() => 
    getCharacterConfigForScene(config, sceneId, characterId), 
    [config, sceneId, characterId]
  )
  
  const baseCharacterConfig = useMemo(() => 
    getBaseCharacterConfig(config, characterId), 
    [config, characterId]
  )
  
  // Déterminer le chemin de l'image
  const imagePath = useMemo(() => {
    // Supprimer le slash initial s'il existe pour éviter les doubles slashes
    const getCorrectImagePath = (path: string) => {
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io') 
        ? '/Portfolio_Putri_Zahara/' 
        : '/';
      return `${basePath}${cleanPath}`;
    };
    
    // Utiliser les noms de fichiers qui existent réellement sur le serveur
    switch(characterId) {
      case "demetrius":
        return getCorrectImagePath("images/characters/Demetrius_concept_art_new.png");
      case "haikal":
        return getCorrectImagePath("images/characters/haikal_personnage_alone.png"); 
      case "milo":
        return getCorrectImagePath("images/characters/commandant_milo.png");
      case "guard":
        return getCorrectImagePath("images/characters/imperial_guard.png");
      case "ellis":
        return getCorrectImagePath("images/characters/ellis_queen.png");
      case "hades":
        return getCorrectImagePath("images/characters/emepror_hades.png");
      default:
        console.log(`Image spécifique non trouvée pour ${characterId}, utilisation du garde impérial`);
        return getCorrectImagePath("images/characters/imperial_guard.png");
    }
  }, [characterId])
  
  // Calculer la taille finale
  const size = useMemo(() => {
    if (!isConfigLoaded) return { width: 500, height: 700 }
    
    // Priorité: configuration de scène > configuration de base > taille par défaut
    const defaultSize = { width: 500, height: 700 }
    
    if (sceneCharacterConfig?.size) {
      return sceneCharacterConfig.size
    } else if (baseCharacterConfig?.baseSize) {
      return baseCharacterConfig.baseSize
    }
    
    return defaultSize
  }, [isConfigLoaded, sceneCharacterConfig, baseCharacterConfig])
  
  // Calculer l'échelle finale
  const scale = useMemo(() => {
    if (!isConfigLoaded) return 1
    
    // Priorité: customScale > configuration de scène > configuration de base > échelle par défaut
    if (customScale) {
      return customScale
    } else if (sceneCharacterConfig?.scale) {
      return sceneCharacterConfig.scale
    } else if (baseCharacterConfig?.baseScale) {
      return baseCharacterConfig.baseScale
    }
    
    // Appliquer une échelle plus grande pour les combats
    return isBattle ? 1.2 : 1
  }, [isConfigLoaded, customScale, sceneCharacterConfig, baseCharacterConfig, isBattle])
  
  // Calculer la position finale
  const position = useMemo(() => {
    if (!isConfigLoaded) {
      return { left: '50%', top: '10%', transform: 'translateX(-50%)' }
    }
    
    // Récupérer la configuration du personnage pour la scène actuelle
    const sceneCharConfig = config.scenes[sceneId]?.characters?.[characterId]
    console.log(`Configuration pour ${characterId} dans la scène ${sceneId}:`, sceneCharConfig)
    
    // Priorité: customPosition > configuration de scène > configuration par défaut
    let finalPosition: Record<string, string> = {}
    
    if (customPosition) {
      finalPosition = { ...customPosition }
    } else if (sceneCharConfig?.position) {
      // Utiliser toutes les propriétés de position dans sceneCharConfig
      if (sceneCharConfig.position.left) finalPosition.left = sceneCharConfig.position.left
      if (sceneCharConfig.position.right) finalPosition.right = sceneCharConfig.position.right
      if (sceneCharConfig.position.top) finalPosition.top = sceneCharConfig.position.top
      if (sceneCharConfig.position.bottom) finalPosition.bottom = sceneCharConfig.position.bottom
      
      // Appliquer le centrage si nécessaire
      if (sceneCharConfig.position.center) {
        finalPosition.left = '50%'
        finalPosition.transform = 'translateX(-50%)'
      }
    } else {
      // Position par défaut selon le type de personnage
      if (characterId === 'demetrius') {
        finalPosition = { left: '30%', top: '6%' }
      } else {
        finalPosition = { right: '30%', top: '6%' }
      }
    }
    
    console.log(`Position finale pour ${characterId} dans ${sceneId}:`, finalPosition)
    return finalPosition
  }, [isConfigLoaded, customPosition, config, characterId, sceneId])
  
  // Déterminer l'animation
  const getAnimationVariant = () => {
    switch(action) {
      case 'idle':
        return {
          animate: {
            y: [0, -10, 0],
            transition: {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror" as const
            }
          }
        }
      case 'hurt':
        return {
          animate: {
            x: [0, -10, 10, -5, 5, 0],
            filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            }
          }
        }
      case 'attack':
        return {
          animate: {
            x: [0, 20, 0],
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            }
          }
        }
      case 'victory':
        return {
          animate: {
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.6,
              ease: "easeOut",
            }
          }
        }
      case 'defeat':
        return {
          animate: {
            opacity: [1, 0],
            y: [0, 20],
            transition: {
              duration: 0.8,
              ease: "easeIn",
            }
          }
        }
      default:
        return {}
    }
  }
  
  const handleImageLoad = () => setIsImageLoaded(true)
  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image pour ${characterId}: ${imagePath}`)
    setErrorLoading(true)
  }
  
  // Calculer le z-index
  const zIndex = baseCharacterConfig?.zIndex || 10
  
  // Flip horizontalement si nécessaire
  const shouldFlip = sceneCharacterConfig?.flip || false
  
  // Afficher un placeholder pendant le chargement ou en cas d'erreur
  if (errorLoading || !isConfigLoaded) {
    return (
      <div className="absolute bg-zinc-800/50 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 backdrop-blur-sm"
           style={{
             width: "150px", 
             height: "300px",
             ...position,
             zIndex: zIndex
           }}>
        <div className="w-full h-full flex items-center justify-center text-sm text-emerald-400 flex-col gap-2">
          <div className="w-8 h-8 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
          {!isConfigLoaded ? "Chargement..." : "Erreur de chargement"}
        </div>
      </div>
    )
  }
  
  // Nom du personnage
  const characterName = baseCharacterConfig?.name || characterId
  
  // Variant d'animation
  const animationVariant = getAnimationVariant()
  
  // Rendre le sprite avec framer-motion
  return (
    <motion.div 
      style={{
        position: 'absolute',
        ...position,
        zIndex: zIndex,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      {...animationVariant}
    >
      <div className="relative rounded-lg overflow-hidden hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-shadow duration-300">
        <Image 
          src={imagePath}
          alt={characterName}
          width={size.width}
          height={size.height}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            opacity: isImageLoaded ? 1 : 0,
            filter: isBattle ? 'drop-shadow(0 0 8px rgba(39, 245, 131, 0.3))' : 'none',
            transformOrigin: 'bottom center',
            transform: `scale(${scale}) ${shouldFlip ? 'scaleX(-1)' : ''}`,
            transition: 'all 0.5s ease-in-out'
          }}
          className="rounded-lg border border-emerald-500/10"
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-zinc-800/70 rounded-xl border border-emerald-500/30 animate-pulse flex items-center justify-center">
            <div className="text-sm text-emerald-300">Chargement {characterName}...</div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
