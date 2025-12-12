"use client"

import { useState, useEffect, useCallback } from "react"
import { gameScenes as GAME_SCENES } from "@/components/game/game-data"
import type { GameScene, Choice, Character } from "@/components/game/types"
import AceAttorneyDialogue from "@/components/game/ace-attorney-dialogue"
import CharacterSprite from "@/components/game/character-sprite"
import ImprovedCharacterSprite from "@/components/game/improved-character-sprite"
import { useSceneConfig } from "@/components/game/scene-config-loader"
import BattleInterface from "@/components/game/battle-interface"
import { motion } from "framer-motion"
import { getTranslation } from "@/components/game/translations"
import type { Language } from "@/components/game/translations"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image";

export default function CrimsonGameEngine() {
  const [currentSceneId, setCurrentSceneId] = useState("intro")
  const [currentScene, setCurrentScene] = useState<GameScene | null>(null)
  const { language } = useLanguage()
  const [gameState, setGameState] = useState({
    mercy: 0,
    violence: 0,
    hasMetHaikal: false,
    defeatedMilo: false,
    allianceWithVulkan: false,
  })
  const [playerStats, setPlayerStats] = useState({
    hp: 20,
    maxHp: 20,
    attack: 4,
    defense: 2,
  })
  const [opponentStats, setOpponentStats] = useState<{
    hp: number
    maxHp: number
    attack: number
    defense: number
  } | null>(null)
  const [inBattle, setInBattle] = useState(false)
  const [opponent, setOpponent] = useState<Character | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [isBossFight, setIsBossFight] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null)
  const [battleAction, setBattleAction] = useState<"none" | "attack" | "defend" | "mercy" | "flee">("none")
  const [battleMessage, setBattleMessage] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showBattleFlash, setShowBattleFlash] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<"loading" | "ready" | "error">("loading")
  const [showDevWarning, setShowDevWarning] = useState(true)
  
  // Charger la configuration des scènes
  const [sceneConfig, isConfigLoaded] = useSceneConfig()
  
  // Sons du jeu avec typage correct
  type SoundType = {
    click: HTMLAudioElement | null;
    battle: HTMLAudioElement | null;
  }
  
  const [sounds, setSounds] = useState<SoundType>({
    click: null,
    battle: null,
  })

  // Fonction utilitaire pour déterminer le chemin des images
  const getImagePath = (path: string) => {
    // Supprimer le slash initial s'il existe pour éviter les doubles slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    const basePath = typeof window !== 'undefined' && window.location.hostname.includes('github.io') 
      ? '/Portfolio_Putri_Zahara/' 
      : '/';
    
    return `${basePath}${cleanPath}`;
  }

  // Préchargement des images et de la configuration
  useEffect(() => {
    // Précharger la configuration des scènes
    if (isConfigLoaded) {
      console.log("Configuration des scènes chargée:", sceneConfig);
      
      // Vérifier si la scène actuelle existe dans la configuration
      if (currentSceneId && sceneConfig.scenes[currentSceneId]) {
        console.log(`La scène ${currentSceneId} a été trouvée dans la configuration`);
      } else {
        console.warn(`La scène ${currentSceneId} n'existe pas dans la configuration`);
      }
    }
    
    preloadResources().then(() => {
      setLoadingStatus("ready");
    }).catch(error => {
      console.error("Erreur lors du préchargement des ressources:", error);
      setLoadingStatus("error");
    });
  }, [isConfigLoaded, currentSceneId, sceneConfig]);

  // Préchargement des images
  const preloadResources = useCallback(async () => {
    try {
      // N'utiliser que les images qui existent réellement avec les noms exacts
      const imagesToPreload = [
        getImagePath("/images/title/background.png"),
        getImagePath("/images/title/titletitre.png"),
        getImagePath("/images/environement/camp_du_travail_keyframe.jpg"),
        getImagePath("/images/environement/key_frame_base_camp.jpg"),
        getImagePath("/images/environement/gate_capital_yirie.png"),
        getImagePath("/images/characters/Demetrius_concept_art_new.png"),
        getImagePath("/images/characters/haikal_personnage_alone.png"), // Nom correct
        getImagePath("/images/characters/commandant_milo.png"),
        getImagePath("/images/characters/imperial_guard.png"),
        getImagePath("/images/characters/ellis_queen.png"),
        getImagePath("/images/characters/emepror_hades.png")
      ];

      if (typeof window !== 'undefined') {
        const loadedImages = await Promise.allSettled(
          imagesToPreload.map(url => {
            return new Promise((resolve) => {
              const img = document.createElement('img');
              img.src = url;
              img.onload = () => {
                console.log(`Image préchargée avec succès: ${url}`);
                resolve(url);
              };
              img.onerror = () => {
                console.error(`Échec du préchargement de l'image: ${url}`);
                // Résoudre quand même pour ne pas bloquer les autres images
                resolve(url);
              };
            });
          })
        );
        
        // Vérifier combien d'images ont été chargées avec succès
        const successCount = loadedImages.filter(result => result.status === 'fulfilled').length;
        console.log(`${successCount}/${imagesToPreload.length} images préchargées avec succès`);
      }

      setLoadingStatus("ready");
    } catch (error) {
      console.error("Erreur dans le préchargement:", error);
      setLoadingStatus("ready"); // Continuer malgré l'erreur
    }
  }, []);

  // Optimisation de la gestion des états de combat
  useEffect(() => {
    if (inBattle && opponent) {
      const battleLoop = setInterval(() => {
        if (battleAction !== "none") {
          setBattleAction("none")
          setShowBattleFlash(false)
        }
      }, 1000)

      return () => clearInterval(battleLoop)
    }
  }, [inBattle, opponent, battleAction])

  // Load the current scene when the scene ID changes
  useEffect(() => {
    // Charger directement la scène sans transition
    const scene = GAME_SCENES.find((s) => s.id === currentSceneId)
    if (scene) {
      setCurrentScene(scene)
      // Réinitialiser d'autres états si nécessaire
      setActiveSpeaker(scene.speaker || null)
      setBattleMessage(null)
      
      // Vérifier si c'est une scène de combat
      const isBattle = scene.type === "battle"
      const opponent = scene.opponent
      
      setInBattle(isBattle)
      if (isBattle && opponent) {
        setOpponent(opponent)
        setOpponentStats({
          hp: opponent.stats?.hp || 10,
          maxHp: opponent.stats?.maxHp || 10,
          attack: opponent.stats?.attack || 3,
          defense: opponent.stats?.defense || 1,
        })
        // Vérifier si c'est un boss en fonction de l'id de l'adversaire
        setIsBossFight(opponent.id === "milo" || opponent.id === "hades")
      } else {
        setOpponent(null)
        setOpponentStats(null)
      }
    }
  }, [currentSceneId])

  useEffect(() => {
    // Charger la scène initiale
    const loadInitialScene = async () => {
      try {
        setLoadingStatus("loading")
        // Charger les données de la scène courante depuis la liste de scènes
        const sceneData = GAME_SCENES.find(s => s.id === currentSceneId)
        if (sceneData) {
          setCurrentScene(sceneData)
          setLoadingStatus("ready")
        } else {
          console.error(`Scène non trouvée: ${currentSceneId}`);
          setLoadingStatus("error")
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la scène:", error)
        setLoadingStatus("error")
      }
    }
    
    // Exécuter de manière sécurisée
    loadInitialScene().catch(err => {
      console.error("Erreur non gérée dans loadInitialScene:", err);
      setLoadingStatus("error");
    });
  }, [currentSceneId]);

  // Préchargement des sons pour éviter les délais
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Création des objets audio seulement côté client
      const clickSound = new Audio("/sounds/click.mp3");
      const battleSound = new Audio("/sounds/battle.mp3");
      
      setSounds({
        click: clickSound,
        battle: battleSound,
      });
    }
  }, []);

  // Jouer un son
  const playSound = (soundName: keyof SoundType) => {
    if (sounds[soundName]) {
      try {
        // Création d'une nouvelle instance pour permettre la lecture simultanée
        if (typeof window !== 'undefined') {
          const sound = new Audio((sounds[soundName] as HTMLAudioElement).src);
          sound.play().catch(e => console.error("Erreur de lecture audio:", e));
        }
      } catch (error) {
        console.error("Erreur lors de la lecture du son:", error);
      }
    }
  };

  // Déterminer la classe de néon en fonction de l'état du jeu
  const getNeonClass = () => {
    if (gameOver) {
      return "neon-border-game-over";
    }
    if (isBossFight) {
      return "neon-border-boss";
    }
    return "neon-border";
  };

  // Log pour debugging
  console.log("Boss fight?", isBossFight, "Current scene:", currentScene?.id);

  // Handle player choices
  const handleChoice = (choice: Choice) => {
    // Update game state based on choice
    const newGameState = { ...gameState }

    if (choice.mercyDelta) {
      newGameState.mercy += choice.mercyDelta
    }

    if (choice.violenceDelta) {
      newGameState.violence += choice.violenceDelta
    }

    if (choice.stateChanges) {
      Object.assign(newGameState, choice.stateChanges)
    }

    setGameState(newGameState)

    // Check for game over conditions
    if (choice.gameOver) {
      setGameOver(true)
      return
    }

    // Transition to the next scene
    setCurrentSceneId(choice.nextScene)
  }

  // Handle battle actions
  const handleBattleAction = (action: "attack" | "defend" | "mercy" | "flee") => {
    if (!opponent || !opponentStats) return

    setBattleAction(action)

    // Process battle action
    switch (action) {
      case "attack":
        // Show attack flash effect
        setShowBattleFlash(true)
        setTimeout(() => setShowBattleFlash(false), 300)

        // Calculate damage based on player attack and opponent defense
        const damage = Math.max(1, playerStats.attack - opponentStats.defense + Math.floor(Math.random() * 3))
        const newOpponentHp = Math.max(0, opponentStats.hp - damage)

        setBattleMessage(`You attack ${opponent.name} for ${damage} damage!`)
        setOpponentStats({
          ...opponentStats,
          hp: newOpponentHp,
        })

        // Check if opponent is defeated
        if (newOpponentHp <= 0) {
          setTimeout(() => {
            setBattleMessage(`${opponent.name} is defeated!`)
            setTimeout(() => handleBattleEnd("victory"), 1500)
          }, 1500)
        } else {
          // Opponent counterattack
          setTimeout(() => {
            // Show counterattack flash
            setShowBattleFlash(true)
            setTimeout(() => setShowBattleFlash(false), 300)

            const counterDamage = Math.max(
              1,
              opponentStats.attack - playerStats.defense + Math.floor(Math.random() * 2),
            )
            const newPlayerHp = Math.max(0, playerStats.hp - counterDamage)

            setBattleMessage(`${opponent.name} counterattacks for ${counterDamage} damage!`)
            setPlayerStats({
              ...playerStats,
              hp: newPlayerHp,
            })

            // Check if player is defeated
            if (newPlayerHp <= 0) {
              setTimeout(() => {
                setBattleMessage("You have been defeated!")
                setTimeout(() => handleBattleEnd("defeat"), 1500)
              }, 1500)
            } else {
              // Reset for next turn
              setTimeout(() => {
                setBattleAction("none")
                setBattleMessage("What will you do?")
              }, 1500)
            }
          }, 1500)
        }
        break

      case "defend":
        setBattleMessage("You take a defensive stance, reducing incoming damage.")
        // Temporarily increase defense
        setPlayerStats({
          ...playerStats,
          defense: playerStats.defense + 2,
        })

        // Opponent still attacks
        setTimeout(() => {
          // Show attack flash
          setShowBattleFlash(true)
          setTimeout(() => setShowBattleFlash(false), 300)

          const reducedDamage = Math.max(
            1,
            opponentStats.attack - (playerStats.defense + 2) + Math.floor(Math.random() * 2),
          )
          const newPlayerHp = Math.max(0, playerStats.hp - reducedDamage)

          setBattleMessage(`${opponent.name} attacks, but you block some damage! You take ${reducedDamage} damage.`)
          setPlayerStats({
            ...playerStats,
            defense: playerStats.defense, // Reset defense bonus
          })

          if (newPlayerHp <= 0) {
            setTimeout(() => {
              setBattleMessage("Despite your defense, you have been defeated!")
              setTimeout(() => handleBattleEnd("defeat"), 1500)
            }, 1500)
          } else {
            setTimeout(() => {
              setBattleAction("none")
              setBattleMessage("What will you do?")
            }, 1500)
          }
        }, 1500)
        break

      case "mercy":
        setBattleMessage(`You show mercy to ${opponent.name}...`)

        setTimeout(() => {
          // 70% chance of success based on mercy stat
          const mercyChance = 0.4 + gameState.mercy * 0.05
          if (Math.random() < mercyChance) {
            setBattleMessage(`${opponent.name} accepts your mercy.`)
            setTimeout(() => handleBattleEnd("mercy"), 1500)
          } else {
            setBattleMessage(`${opponent.name} rejects your mercy and attacks!`)

            setTimeout(() => {
              // Show attack flash
              setShowBattleFlash(true)
              setTimeout(() => setShowBattleFlash(false), 300)

              const damage = Math.max(1, opponentStats.attack - playerStats.defense + Math.floor(Math.random() * 3))
              const newPlayerHp = Math.max(0, playerStats.hp - damage)

              setBattleMessage(`You take ${damage} damage!`)
              setPlayerStats({
                ...playerStats,
                hp: newPlayerHp,
              })

              if (newPlayerHp <= 0) {
                setTimeout(() => {
                  setBattleMessage("You have been defeated!")
                  setTimeout(() => handleBattleEnd("defeat"), 1500)
                }, 1500)
              } else {
                setTimeout(() => {
                  setBattleAction("none")
                  setBattleMessage("What will you do?")
                }, 1500)
              }
            }, 1500)
          }
        }, 1500)
        break

      case "flee":
        setBattleMessage("You attempt to flee...")

        setTimeout(() => {
          // 50% chance of successful escape
          if (Math.random() < 0.5) {
            setBattleMessage("You successfully escaped!")
            setTimeout(() => handleBattleEnd("flee"), 1500)
          } else {
            setBattleMessage("Failed to escape!")

            setTimeout(() => {
              // Show attack flash
              setShowBattleFlash(true)
              setTimeout(() => setShowBattleFlash(false), 300)

              const damage = Math.max(1, opponentStats.attack - playerStats.defense + Math.floor(Math.random() * 3))
              const newPlayerHp = Math.max(0, playerStats.hp - damage)

              setBattleMessage(`${opponent.name} attacks as you try to flee! You take ${damage} damage!`)
              setPlayerStats({
                ...playerStats,
                hp: newPlayerHp,
              })

              if (newPlayerHp <= 0) {
                setTimeout(() => {
                  setBattleMessage("You have been defeated!")
                  setTimeout(() => handleBattleEnd("defeat"), 1500)
                }, 1500)
              } else {
                setTimeout(() => {
                  setBattleAction("none")
                  setBattleMessage("What will you do?")
                }, 1500)
              }
            }, 1500)
          }
        }, 1500)
        break
    }
  }

  // Handle battle outcomes
  const handleBattleEnd = (outcome: "victory" | "defeat" | "mercy" | "flee") => {
    if (!currentScene || !currentScene.battleOutcomes) return

    const nextSceneId = currentScene.battleOutcomes[outcome]

    if (outcome === "victory") {
      setGameState({
        ...gameState,
        violence: gameState.violence + 5,
      })
    } else if (outcome === "mercy") {
      setGameState({
        ...gameState,
        mercy: gameState.mercy + 5,
      })
    }

    if (nextSceneId) {
      setCurrentSceneId(nextSceneId)
    }
  }

  // Reset the game
  const resetGame = () => {
    setCurrentSceneId("intro")
    setGameState({
      mercy: 0,
      violence: 0,
      hasMetHaikal: false,
      defeatedMilo: false,
      allianceWithVulkan: false,
    })
    setPlayerStats({
      hp: 20,
      maxHp: 20,
      attack: 4,
      defense: 2,
    })
    setGameOver(false)
    setBattleAction("none")
    setBattleMessage(null)
  }

  // Helper function to translate scene text based on current language
  const translateSceneText = (text: string, sceneId: string) => {
    const translationKey = `${sceneId}.text`;
    return getTranslation(translationKey, language) !== translationKey 
      ? getTranslation(translationKey, language) 
      : text;
  }
  
  // Helper function to translate choice text
  const translateChoice = (text: string, sceneId: string, index: number) => {
    const translationKey = `${sceneId}.choices.${text.toLowerCase().replace(/\s+/g, '_')}`;
    return getTranslation(translationKey, language) !== translationKey
      ? getTranslation(translationKey, language)
      : text;
  }
  
  // Helper function to translate character names
  const getCharacterName = (name: string, language: Language) => {
    const translationKey = `character.${name.toLowerCase()}`;
    return getTranslation(translationKey, language) !== translationKey
      ? getTranslation(translationKey, language)
      : name;
  }

  // Helper function to translate battle messages
  const translateBattleMessage = (message: string) => {
    if (message.includes("You face")) {
      const opponentName = opponent?.name 
        ? getCharacterName(opponent.name.toLowerCase(), language) 
        : getTranslation("ui.opponent", language);
      return language === "fr" 
        ? `Vous affrontez ${opponentName}. Préparez-vous au combat !` 
        : `You face ${opponentName}. Prepare for battle!`;
    }
    
    const translationKey = `ui.${message.toLowerCase().replace(/\s+/g, '_')}`;
    return getTranslation(translationKey, language) !== translationKey
      ? getTranslation(translationKey, language)
      : message;
  }

  if (gameOver) {
    return (
      <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
        <h2 className="text-4xl text-red-500 font-bold mb-8">Game Over</h2>
        <button
          onClick={() => {
            setGameOver(false);
            const introScene = GAME_SCENES.find(scene => scene.id === "intro");
            if (introScene) {
              setCurrentScene(introScene);
            }
            setGameState({
              mercy: 0,
              violence: 0,
              hasMetHaikal: false,
              defeatedMilo: false,
              allianceWithVulkan: false,
            });
            setPlayerStats({
              hp: 20,
              maxHp: 20,
              attack: 4,
              defense: 2,
            });
            setCurrentSceneId("intro");
          }}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-500 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Start Again
        </button>
      </div>
    )
  }

  if (loadingStatus === "loading") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-zinc-900/80 rounded-xl overflow-hidden backdrop-blur-sm border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <div className="p-8 text-center">
          <h2 className="text-emerald-400 text-2xl font-bold mb-4">Chargement du jeu...</h2>
          <div className="relative w-64 h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-zinc-400 text-sm max-w-md mb-4">Nous préparons votre aventure dans le monde des Ethians...</p>
          <div className="w-12 h-12 border-t-2 border-r-2 border-emerald-500 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (loadingStatus === "error") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-zinc-900/80 rounded-xl overflow-hidden backdrop-blur-sm border border-red-500/20">
        <div className="p-8 text-center">
          <h2 className="text-red-400 text-2xl font-bold mb-4">Erreur de chargement</h2>
          <p className="text-zinc-300 mb-6">Une erreur est survenue lors du chargement des ressources du jeu.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!currentScene) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-zinc-900/80 rounded-xl overflow-hidden backdrop-blur-sm border border-yellow-500/20">
        <div className="p-8 text-center">
          <h2 className="text-yellow-400 text-2xl font-bold mb-4">Scène non trouvée</h2>
          <p className="text-zinc-300 mb-6">La scène demandée n'a pas pu être chargée. ID: {currentSceneId}</p>
        </div>
      </div>
    );
  }

  // Generate translated choices if available
  const translatedChoices = currentScene.choices?.map((choice, index) => ({
    ...choice,
    text: translateChoice(choice.text, currentScene.id, index)
  }));

  return (
    <div
      className={`w-full mx-auto max-w-4xl overflow-hidden mb-12 shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:shadow-emerald-500/20 border border-emerald-500/30`}
    >
      {/* Background and game container */}
      <div className={`relative aspect-[16/9] bg-zinc-900`}>
        {/* Background image */}
        {currentScene && currentScene.background && (
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{
              scale: inBattle ? 1.05 : 1,
              x: inBattle ? -5 : 0,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-center bg-cover z-0"
            style={{ backgroundImage: `url(${getImagePath(currentScene.background)})` }}
          />
        )}

        {/* Battle flash effect */}
        {showBattleFlash && <div className="absolute inset-0 bg-white/50 z-15 battle-flash" />}

        {/* Overlay gradient for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none z-5"></div>

        {/* Character container - plus grand espace en bas quand l'interface de bataille est visible */}
        <div className={`absolute inset-0 z-10 transition-all duration-300 ${inBattle ? 'pb-[350px]' : 'pb-[220px]'}`}>
          {isConfigLoaded && currentScene && (
            <>
              {/* Afficher les personnages selon la configuration */}
              {sceneConfig.scenes[currentScene.id]?.characters && Object.entries(sceneConfig.scenes[currentScene.id].characters).map(([charId, config]) => {
                console.log(`Affichage du personnage ${charId} dans la scène ${currentScene.id}`, config);
                return (
                  <ImprovedCharacterSprite
                    key={charId}
                    characterId={charId}
                    sceneId={currentScene.id}
                    action={charId === 'demetrius' && inBattle && battleAction !== 'none' 
                      ? (battleAction === 'attack' ? 'attack' : 
                         battleAction === 'defend' ? 'idle' : 
                         battleAction === 'mercy' ? 'idle' : 
                         battleAction === 'flee' ? 'idle' : 'idle')
                      : 'idle'}
                    isBattle={inBattle}
                  />
                );
              })}
              
              {/* Afficher les anciens personnages si la configuration n'est pas présente pour cette scène */}
              {!sceneConfig.scenes[currentScene.id] && currentScene.characters?.map((character) => (
                <CharacterSprite
                  key={character.id}
                  character={{
                    id: character.id,
                    name: getCharacterName(character.id, language),
                    image: getImagePath(character.image)
                  }}
                  currentScene={currentScene.id}
                  isActive={activeSpeaker === character.id}
                  isBattle={inBattle}
                />
              ))}
            </>
          )}
          
          {/* Afficher les personnages avec le système d'origine (fallback) */}
          {!isConfigLoaded && currentScene.characters?.map((character) => (
            <CharacterSprite
              key={character.id}
              character={{
                id: character.id,
                name: getCharacterName(character.id, language),
                image: getImagePath(character.image)
              }}
              currentScene={currentScene.id}
              isActive={activeSpeaker === character.id}
              isBattle={inBattle}
            />
          ))}

          {/* Afficher l'ennemi uniquement en combat */}
          {inBattle && opponent && opponentStats && !currentScene.characters?.some(c => c.id === opponent?.id) && (
            isConfigLoaded ? (
              <ImprovedCharacterSprite
                key={opponent.id}
                characterId={opponent.id}
                sceneId="battle"
                action={battleAction === 'attack' ? 'hurt' : 'idle'}
                isBattle={true}
                customPosition={{ right: '15%', bottom: '5%' }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  x: battleAction === "attack" ? [0, -10, 10, -5, 5, 0] : 0
                }}
                transition={{ 
                  duration: 0.5, 
                  x: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                }}
                className="absolute right-[20%] bottom-[20%] z-20"
              >
                <CharacterSprite
                  character={opponent}
                  position="right"
                  isActive={false}
                  scale={1.2}
                  animation={battleAction === "attack" ? "hurt" : "idle"}
                  isBattle={true}
                  currentScene={currentScene.id}
                />
              </motion.div>
            )
          )}
        </div>

        {/* Battle interface */}
        {inBattle && opponent && opponentStats && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <BattleInterface
              key={language}
              player={playerStats}
              opponent={{
                ...opponent,
                name: getCharacterName(opponent.name.toLowerCase(), language),
                stats: opponentStats,
              }}
              onAction={handleBattleAction}
              message={battleMessage ? translateBattleMessage(battleMessage) : getTranslation("ui.what_will_you_do", language)}
              currentAction={battleAction}
            />
          </div>
        )}

        {/* Dialogue box - avec décalage vers le bas lors des combats */}
        <div className={`absolute bottom-0 left-0 right-0 z-30 transform transition-transform duration-300 ${inBattle ? 'translate-y-60' : ''}`}>
          <div className="relative w-full mt-auto">
            <AceAttorneyDialogue
              key={`${currentScene.id}-${language}`}
              text={translateSceneText(currentScene.text, currentScene.id)}
              speaker={currentScene.speaker ? getCharacterName(currentScene.speaker, language) : undefined}
              choices={translatedChoices}
              onChoice={handleChoice}
            />
          </div>
        </div>
      </div>

      {/* Game stats - avec décalage vers le bas lors des combats */}
      <div className={`p-2 sm:p-3 text-xs text-zinc-400 border-t border-zinc-700 flex justify-between backdrop-blur-sm bg-zinc-800/90 shadow-md relative z-40 transform transition-transform duration-300 ${inBattle ? 'translate-y-60' : ''}`}>
        <div>
          {getTranslation("ui.hp", language)}: {playerStats.hp}/{playerStats.maxHp}
        </div>
        <div>
          {getTranslation("ui.mercy", language)}: {gameState.mercy} | {getTranslation("ui.violence", language)}: {gameState.violence}
        </div>
      </div>

      {/* Avertissement de développement */}
      {showDevWarning && (
        <div className="absolute top-4 right-4 z-50 p-4 bg-black/80 border-2 border-yellow-500 rounded-xl shadow-[0_0_10px_rgba(234,179,8,0.5)] backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base text-yellow-500 font-semibold border-b border-yellow-500/30 pb-2 mb-1">
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
