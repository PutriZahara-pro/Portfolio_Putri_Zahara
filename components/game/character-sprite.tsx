"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

interface CharacterSpriteProps {
  character: {
    id: string
    name: string
    image: string
  }
  position?: "left" | "right" | "center"
  isActive?: boolean
  scale?: number
  animation?: "idle" | "attack" | "hurt" | "victory" | "defeat"
  isBattle?: boolean
  currentScene: string
}

/**
 * Affiche un personnage du jeu avec sa position et taille configurées
 */
export default function CharacterSprite({
  character,
  position,
  isActive,
  scale = 1,
  animation = "idle",
  isBattle = false,
  currentScene
}: CharacterSpriteProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [errorLoading, setErrorLoading] = useState(false)
  const [finalPosition, setPosition] = useState<{ left?: string; top?: string; transform?: string }>({})

  // Déterminer position du personnage en fonction de son rôle et de la scène
  useEffect(() => {
    try {
      // Position par défaut basée sur le type de personnage
      const getDefaultPositionForCharacter = () => {
        if (character.id === 'demetrius') {
          // Demetrius au centre principal par défaut
          return {
            left: '50%',
            top: '6%',
            transform: 'translateX(-50%)'
          };
        } else if (character.id === 'milo' || character.id === 'hades') {
          // Antagonistes principaux à droite
          return {
            left: '75%',
            top: '6%'
          };
        } else if (character.id === 'guard') {
          // Gardes sur le côté droit
          return {
            left: '70%',
            top: '8%'
          };
        } else if (character.id === 'haikal') {
          // Haikal à droite mais un peu moins loin que les antagonistes
          return {
            left: '65%',
            top: '6%'
          };
        } else if (character.id === 'ellis') {
          // Ellis à droite mais proche de Demetrius
          return {
            left: '60%',
            top: '4%'
          };
        } else {
          // Autres personnages à gauche
          return {
            left: '30%',
            top: '6%'
          };
        }
      };

      // Positions spécifiques par scène
      const getSceneSpecificPosition = () => {
        const scenePositions = {
          // Positions pour la scène d'intro
          'intro': {
            'demetrius': { left: '50%', top: '6%', transform: 'translateX(-50%)' },
          },
          // Positions pour la scène du camp de travail
          'labor_camp': {
            'demetrius': { left: '40%', top: '6%' },
            'guard': { left: '70%', top: '8%' },
          },
          // Positions pour la scène d'évasion
          'escape': {
            'demetrius': { left: '35%', top: '6%' },
            'haikal': { left: '65%', top: '6%' },
            'guard': { left: '80%', top: '10%' },
          },
          // Positions pour la scène de la capitale
          'capital': {
            'demetrius': { left: '35%', top: '6%' },
            'ellis': { left: '65%', top: '4%' },
          },
          // Positions pour la scène du palais
          'palace': {
            'demetrius': { left: '30%', top: '6%' },
            'hades': { left: '70%', top: '4%' },
          },
          // Positions pour les scènes de bataille
          'battle': {
            'demetrius': { left: '30%', top: '20%' },
            'guard': { left: '70%', top: '20%' },
            'milo': { left: '70%', top: '20%' },
            'hades': { left: '70%', top: '20%' },
          }
        };

        // Si la scène et le personnage ont une position spécifique définie
        if (scenePositions[currentScene] && scenePositions[currentScene][character.id]) {
          return scenePositions[currentScene][character.id];
        }

        // Sinon, utiliser la position par défaut basée sur le type de personnage
        return getDefaultPositionForCharacter();
      };

      // Position basée sur le prop position fourni
      const getPositionFromProp = () => {
        if (position === "left") {
          return { left: '25%', top: '6%' };
        } else if (position === "right") {
          return { left: '75%', top: '6%' };
        } else if (position === "center") {
          return { left: '50%', top: '6%', transform: 'translateX(-50%)' };
        }
        return null;
      };

      // Priorité : 1) prop position, 2) position spécifique à la scène, 3) position par défaut
      const finalPos = getPositionFromProp() || getSceneSpecificPosition();
      
      console.log(`Positionnement pour ${character.id} dans ${currentScene}:`, finalPos);
      setPosition(finalPos);
    } catch (error) {
      console.error("Erreur lors du positionnement du personnage:", error);
      // Position de secours en cas d'erreur
      setPosition({ left: '50%', top: '6%', transform: 'translateX(-50%)' });
    }
  }, [character.id, position, currentScene]);

  // Déterminer le bon chemin d'image pour chaque personnage
  const getImagePath = () => {
    // Déterminer le préfixe des images selon l'environnement
    const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io') 
      ? '/Portfolio_Putri_Zahara' 
      : '';
    
    // Assurer que character.id existe pour éviter les erreurs
    if (!character || !character.id) {
      console.error("ID du personnage manquant");
      return `${basePath}/images/characters/imperial_guard.png`; // Image de repli fiable
    }

    // Utiliser les noms de fichiers qui existent réellement sur le serveur
    switch(character.id) {
      case "demetrius":
        return `${basePath}/images/characters/Demetrius_concept_art_new.png`;
      case "haikal":
        return `${basePath}/images/characters/haikal_personnage_alone.png`; // Nom correct du fichier
      case "milo":
        return `${basePath}/images/characters/commandant_milo.png`;
      case "guard":
        return `${basePath}/images/characters/imperial_guard.png`;
      case "ellis":
        return `${basePath}/images/characters/ellis_queen.png`;
      case "hades":
        return `${basePath}/images/characters/emepror_hades.png`;
      case "rebel1":
      case "rebel2":
      default:
        console.log(`Image spécifique non trouvée pour ${character.id}, utilisation du garde impérial`);
        return `${basePath}/images/characters/imperial_guard.png`;
    }
  }

  const imagePath = getImagePath();
  const handleImageLoad = () => setIsImageLoaded(true);
  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image pour ${character.id}: ${imagePath}`);
    setErrorLoading(true);
  };

  // Taille et échelle par défaut
  const finalSize = {
    width: 500,
    height: 700
  }
  
  // Afficher un placeholder pendant le chargement ou en cas d'erreur
  if (errorLoading) {
    return (
      <div className="absolute bg-zinc-800/50 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
           style={{
             width: "150px", 
             height: "300px",
             ...finalPosition,
             zIndex: 10
           }}>
        <div className="w-full h-full flex items-center justify-center text-sm text-emerald-300">
          Chargement personnage...
        </div>
      </div>
    )
  }

  // Rendre le sprite
  return (
    <div 
      style={{
        position: 'absolute',
        ...finalPosition,
        zIndex: 10,
        transition: 'all 0.5s ease-in-out',
        opacity: isImageLoaded ? 1 : 0
      }}
      className="hover:scale-105 transition-transform"
    >
      <img 
        src={imagePath}
        alt={`${character.name}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: `${finalSize.width}px`,
          height: `${finalSize.height}px`,
          transformOrigin: 'bottom center',
          transform: `scale(${scale})`,
          transition: 'all 0.5s ease-in-out'
        }}
        className="rounded-lg border border-emerald-500/10 shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/20"
      />
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-zinc-800/70 rounded-xl border border-emerald-500/30 animate-pulse flex items-center justify-center">
          <div className="text-sm text-emerald-300">Chargement...</div>
        </div>
      )}
    </div>
  )
}
