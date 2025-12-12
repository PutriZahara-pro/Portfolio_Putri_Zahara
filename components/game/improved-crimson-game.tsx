"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSceneConfig } from './scene-config-loader'
import ImprovedCharacterSprite from './improved-character-sprite'
import { useLanguage } from '@/hooks/use-language'
import { GAME_SCENES, ENEMIES } from './game-data'
import { getTranslation } from './translations'
import AceAttorneyDialogue from './dialogue-box'
import BattleInterface from './battle-interface'
import Image from 'next/image'

// Types
interface GameState {
  mercy: number
  violence: number
  visitedScenes: string[]
  inventory: string[]
  flags: Record<string, boolean>
}

interface PlayerStats {
  hp: number
  maxHp: number
  attack: number
  defense: number
}

interface Opponent {
  id: string
  name: string
  image: string
  hp: number
  maxHp: number
  attack: number
  defense: number
  defeatScene?: string
  mercyScene?: string
  fleeScene?: string
}

interface Choice {
  text: string
  nextScene: string
  effects?: {
    mercy?: number
    violence?: number
    flag?: string
    item?: string
  }
}

export default function ImprovedCrimsonGame() {
  // Configuration des scènes
  const [config, isConfigLoaded] = useSceneConfig()
  
  // État du jeu
  const [currentSceneId, setCurrentSceneId] = useState('intro')
  const [gameState, setGameState] = useState<GameState>({
    mercy: 0,
    violence: 0,
    visitedScenes: [],
    inventory: [],
    flags: {}
  })
  
  // Stats du joueur
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    hp: 20,
    maxHp: 20,
    attack: 4,
    defense: 2
  })
  
  // Combat
  const [inBattle, setInBattle] = useState(false)
  const [opponent, setOpponent] = useState<Opponent | null>(null)
  const [battleAction, setBattleAction] = useState<'idle' | 'attack' | 'hurt' | 'victory' | 'defeat'>('idle')
  const [battleMessage, setBattleMessage] = useState<string | undefined>(undefined)
  
  // Audio
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const battleSoundRef = useRef<HTMLAudioElement | null>(null)
  
  // Language
  const { language } = useLanguage()
  
  // Chargement et ressources
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const [showDevWarning, setShowDevWarning] = useState(true)
  
  // Résolution du chemins des assets
  const getAssetPath = (path: string) => {
    const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io')
      ? '/Portfolio_Putri_Zahara'
      : ''
    return `${basePath}${path}`
  }
  
  // Préchargement des ressources
  useEffect(() => {
    const preloadResources = async () => {
      try {
        // Précharger les images de fond des scènes
        if (isConfigLoaded) {
          const sceneBackgrounds = Object.values(config.scenes)
            .filter(scene => scene.background)
            .map(scene => scene.background)
          
          // Supprimer les doublons
          const uniqueBackgrounds = [...new Set(sceneBackgrounds)]
          
          // Précharger les images
          await Promise.all(uniqueBackgrounds.map(src => {
            return new Promise((resolve) => {
              const img = new Image()
              img.src = getAssetPath(src)
              img.onload = resolve
              img.onerror = resolve // Continuer même en cas d'erreur
            })
          }))
        }
        
        setResourcesLoaded(true)
      } catch (err) {
        console.error("Erreur lors du préchargement des ressources:", err)
        setResourcesLoaded(true) // Continuer malgré l'erreur
      }
    }
    
    if (isConfigLoaded) {
      preloadResources()
    }
  }, [isConfigLoaded, config])
  
  // Effet pour charger la scène courante
  useEffect(() => {
    if (currentSceneId && GAME_SCENES[currentSceneId] && isConfigLoaded) {
      const scene = GAME_SCENES[currentSceneId]
      
      // Marquer la scène comme visitée
      if (!gameState.visitedScenes.includes(currentSceneId)) {
        setGameState(prev => ({
          ...prev,
          visitedScenes: [...prev.visitedScenes, currentSceneId]
        }))
      }
      
      // Vérifier si la scène contient un combat
      if (scene.battle) {
        const enemy = ENEMIES[scene.battle.enemyId]
        if (enemy) {
          startBattle(enemy, scene.battle.isBoss)
        }
      } else {
        setInBattle(false)
        setOpponent(null)
      }
      
      // Jouer le son de changement de scène
      if (clickSoundRef.current) {
        clickSoundRef.current.play().catch(e => console.error("Erreur de lecture audio:", e))
      }
    }
  }, [currentSceneId, isConfigLoaded])
  
  // Démarrer un combat
  const startBattle = (enemy: any, isBoss: boolean = false) => {
    const enemyStats = { ...enemy }
    
    // Augmenter les stats pour un boss
    if (isBoss) {
      enemyStats.hp *= 1.5
      enemyStats.maxHp = enemyStats.hp
      enemyStats.attack *= 1.3
      enemyStats.defense *= 1.2
    }
    
    setOpponent(enemyStats)
    setInBattle(true)
    
    // Jouer la musique de combat
    if (battleSoundRef.current) {
      battleSoundRef.current.src = getAssetPath(isBoss ? '/audio/boss_battle.mp3' : '/audio/battle.mp3')
      battleSoundRef.current.loop = true
      battleSoundRef.current.play().catch(e => console.error("Erreur de lecture audio:", e))
    }
  }
  
  // Gérer un choix de dialogue
  const handleChoice = (choice: Choice) => {
    // Mettre à jour les stats selon le choix
    const newGameState = { ...gameState }
    
    if (choice.effects) {
      if (choice.effects.mercy) newGameState.mercy += choice.effects.mercy
      if (choice.effects.violence) newGameState.violence += choice.effects.violence
      
      if (choice.effects.flag) {
        newGameState.flags[choice.effects.flag] = true
      }
      
      if (choice.effects.item) {
        newGameState.inventory.push(choice.effects.item)
      }
    }
    
    setGameState(newGameState)
    
    // Naviguer vers la scène suivante
    if (choice.nextScene) {
      setCurrentSceneId(choice.nextScene)
    } else if (GAME_SCENES[currentSceneId]?.nextScene) {
      setCurrentSceneId(GAME_SCENES[currentSceneId].nextScene!)
    }
  }
  
  // Gérer une action de combat
  const handleBattleAction = (action: string) => {
    if (!opponent) return
    
    let message = ''
    const newPlayerStats = { ...playerStats }
    const newOpponent = { ...opponent }
    
    switch (action) {
      case 'attack':
        setBattleAction('attack')
        const damage = Math.max(1, playerStats.attack - Math.floor(opponent.defense / 2))
        newOpponent.hp = Math.max(0, opponent.hp - damage)
        message = `${getTranslation('battle.player_attacks', language)} ${damage} ${getTranslation('battle.damage', language)}!`
        
        // Incrémenter violence
        setGameState(prev => ({
          ...prev,
          violence: prev.violence + 1
        }))
        break
        
      case 'defend':
        // Augmenter temporairement la défense
        newPlayerStats.defense += 1
        message = getTranslation('battle.increased_defense', language)
        break
        
      case 'mercy':
        // Tentative de miséricorde
        if (Math.random() < 0.3 + (gameState.mercy * 0.05)) {
          message = getTranslation('battle.mercy_success', language)
          setGameState(prev => ({
            ...prev,
            mercy: prev.mercy + 2
          }))
          
          // Terminer par miséricorde
          setTimeout(() => {
            handleBattleEnd('mercy')
          }, 1500)
          
          setOpponent(newOpponent)
          setPlayerStats(newPlayerStats)
          setBattleMessage(message)
          return
        } else {
          message = getTranslation('battle.mercy_fail', language)
          setGameState(prev => ({
            ...prev,
            mercy: prev.mercy + 1
          }))
        }
        break
        
      case 'flee':
        // Tentative de fuite
        if (Math.random() < 0.4) {
          message = getTranslation('battle.flee_success', language)
          
          setTimeout(() => {
            handleBattleEnd('flee')
          }, 1500)
          
          setOpponent(newOpponent)
          setPlayerStats(newPlayerStats)
          setBattleMessage(message)
          return
        } else {
          message = getTranslation('battle.flee_fail', language)
        }
        break
    }
    
    setOpponent(newOpponent)
    setPlayerStats(newPlayerStats)
    setBattleMessage(message)
    
    // Vérifier victoire
    if (newOpponent.hp <= 0) {
      setTimeout(() => {
        handleBattleEnd('victory')
      }, 1500)
      return
    }
    
    // Tour de l'ennemi
    setTimeout(() => {
      if (!opponent) return
      
      const enemyDamage = Math.max(1, opponent.attack - Math.floor(newPlayerStats.defense / 2))
      const updatedPlayerStats = { ...newPlayerStats }
      updatedPlayerStats.hp = Math.max(0, updatedPlayerStats.hp - enemyDamage)
      
      setBattleAction('hurt')
      setPlayerStats(updatedPlayerStats)
      setBattleMessage(`${opponent.name} ${getTranslation('battle.enemy_attacks', language)} ${enemyDamage} ${getTranslation('battle.damage', language)}!`)
      
      // Reset de la défense temporaire
      setTimeout(() => {
        updatedPlayerStats.defense = playerStats.defense
        setPlayerStats(updatedPlayerStats)
        setBattleAction('idle')
        
        // Vérifier défaite
        if (updatedPlayerStats.hp <= 0) {
          setTimeout(() => {
            handleBattleEnd('defeat')
          }, 1000)
        }
      }, 1000)
    }, 1000)
  }
  
  // Gestion fin de combat
  const handleBattleEnd = (outcome: 'victory' | 'defeat' | 'mercy' | 'flee') => {
    // Arrêter la musique
    if (battleSoundRef.current) {
      battleSoundRef.current.pause()
      battleSoundRef.current.currentTime = 0
    }
    
    setInBattle(false)
    setBattleMessage(undefined)
    
    // Déterminer la scène suivante
    const currentScene = GAME_SCENES[currentSceneId]
    if (currentScene?.battle) {
      const enemyId = currentScene.battle.enemyId
      
      switch (outcome) {
        case 'victory':
          if (ENEMIES[enemyId].defeatScene) {
            setCurrentSceneId(ENEMIES[enemyId].defeatScene!)
          } else if (currentScene.nextScene) {
            setCurrentSceneId(currentScene.nextScene)
          }
          break
          
        case 'defeat':
          setCurrentSceneId('game_over')
          break
          
        case 'mercy':
          if (ENEMIES[enemyId].mercyScene) {
            setCurrentSceneId(ENEMIES[enemyId].mercyScene!)
          } else if (currentScene.nextScene) {
            setCurrentSceneId(currentScene.nextScene)
          }
          break
          
        case 'flee':
          if (ENEMIES[enemyId].fleeScene) {
            setCurrentSceneId(ENEMIES[enemyId].fleeScene!)
          } else {
            setCurrentSceneId('camp')
          }
          break
      }
    }
    
    // Restaurer HP
    setPlayerStats(prev => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + 5)
    }))
  }
  
  // Affichage de chargement
  if (!resourcesLoaded || !isConfigLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="text-2xl mb-4">{getTranslation('ui.loading', language)}</div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-600" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>
    )
  }
  
  const currentScene = GAME_SCENES[currentSceneId]
  if (!currentScene) {
    return <div className="text-center p-4 text-white">Erreur: Scène non trouvée</div>
  }
  
  // Récupérer la configuration de la scène
  const sceneConfig = config.scenes[currentSceneId] || null
  
  // Background de la scène
  const backgroundImage = sceneConfig?.background || currentScene.background
  
  // Préparer les choix traduits
  const translatedChoices = currentScene.choices?.map((choice, index) => ({
    ...choice,
    text: getTranslation(`scenes.${currentSceneId}.choices.${index}`, language) || choice.text
  })) || []
  
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Arrière-plan */}
      {backgroundImage && (
        <Image
          src={getAssetPath(backgroundImage)}
          alt="Scene Background"
          fill
          className="object-cover opacity-80"
          priority
        />
      )}
      
      {/* Personnages de la scène actuelle */}
      <AnimatePresence>
        {/* Utiliser la configuration pour déterminer quels personnages afficher */}
        {sceneConfig?.characters && Object.entries(sceneConfig.characters).map(([characterId, characterConfig]) => (
          <ImprovedCharacterSprite
            key={characterId}
            characterId={characterId}
            sceneId={currentSceneId}
            action={characterId === 'demetrius' ? battleAction : 'idle'}
            isBattle={inBattle}
          />
        ))}
        
        {/* Afficher l'adversaire en combat s'il n'est pas déjà dans la scène */}
        {inBattle && opponent && !sceneConfig?.characters?.[opponent.id] && (
          <ImprovedCharacterSprite
            key={opponent.id}
            characterId={opponent.id}
            sceneId="battle"
            action={battleAction === 'attack' ? 'hurt' : 'idle'}
            isBattle={true}
            customPosition={{ right: '15%', bottom: '5%' }}
          />
        )}
      </AnimatePresence>
      
      {/* Audio */}
      <audio ref={clickSoundRef} src={getAssetPath('/audio/click.mp3')} preload="auto" />
      <audio ref={battleSoundRef} preload="auto" />
      
      {/* Interface de combat ou dialogue */}
      {inBattle && opponent ? (
        <BattleInterface
          playerStats={playerStats}
          opponent={opponent}
          onAction={handleBattleAction}
          battleMessage={battleMessage}
          language={language}
        />
      ) : (
        <AceAttorneyDialogue
          text={getTranslation(`scenes.${currentSceneId}.text`, language) || currentScene.text}
          speaker={currentScene.speaker ? getTranslation(`characters.${currentScene.speaker}`, language) : undefined}
          choices={translatedChoices}
          onChoice={handleChoice}
          language={language}
        />
      )}
      
      {/* Stats du jeu */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-xs text-zinc-300 border-t border-zinc-700 flex justify-between backdrop-blur-sm bg-zinc-800/90 shadow-md z-40 transform transition-all duration-300">
        <div>
          {getTranslation('ui.hp', language)}: {playerStats.hp}/{playerStats.maxHp}
        </div>
        <div>
          {getTranslation('ui.mercy', language)}: {gameState.mercy} | {getTranslation('ui.violence', language)}: {gameState.violence}
        </div>
      </div>
      
      {/* Avertissement de développement */}
      {showDevWarning && (
        <div className="absolute top-4 right-4 z-50 p-4 bg-black/80 border-2 border-emerald-500 rounded-xl shadow-[0_0_10px_rgba(16,185,129,0.5)] backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-emerald-500 font-semibold border-b border-emerald-500/30 pb-2 mb-1">
              ⚠️ {language === 'fr' ? 'Jeu en cours de développement' : 'Game under development'}
            </p>
            <button 
              onClick={() => setShowDevWarning(false)} 
              className="text-xs text-gray-300 hover:text-white hover:shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all rounded-full px-3 py-1 border border-gray-500 hover:border-white"
            >
              {language === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
