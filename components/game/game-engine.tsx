"use client"

import { useState, useEffect } from "react"
import { gameScenes } from "@/components/game/game-data"
import type { GameScene, Choice, Character } from "@/components/game/types"
import BattleSystem from "@/components/game/battle-system"
import DialogueBox from "@/components/game/dialogue-box"
import CharacterSprite from "@/components/game/character-sprite"
import GameOver from "@/components/game/game-over"

export default function GameEngine() {
  const [currentSceneId, setCurrentSceneId] = useState("intro")
  const [currentScene, setCurrentScene] = useState<GameScene | null>(null)
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
  const [inBattle, setInBattle] = useState(false)
  const [opponent, setOpponent] = useState<Character | null>(null)
  const [gameOver, setGameOver] = useState<string | null>(null)

  // Load the current scene when the scene ID changes
  useEffect(() => {
    const scene = gameScenes.find((s) => s.id === currentSceneId)
    if (scene) {
      setCurrentScene(scene)

      // Check if this is a battle scene
      if (scene.type === "battle") {
        setInBattle(true)
        setOpponent(scene.opponent || null)
      } else {
        setInBattle(false)
        setOpponent(null)
      }

      // Check for auto-transitions after a delay
      if (scene.autoTransition) {
        const timer = setTimeout(() => {
          handleChoice(scene.autoTransition!)
        }, scene.autoTransitionDelay || 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [currentSceneId])

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
      setGameOver(choice.gameOver)
      return
    }

    // Transition to the next scene
    setCurrentSceneId(choice.nextScene)
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

  // Handle player damage in battle
  const handlePlayerDamage = (damage: number) => {
    const newHp = Math.max(0, playerStats.hp - damage)
    setPlayerStats({
      ...playerStats,
      hp: newHp,
    })

    if (newHp <= 0) {
      handleBattleEnd("defeat")
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
    setGameOver(null)
  }

  if (gameOver) {
    return <GameOver ending={gameOver} onRestart={resetGame} />
  }

  if (!currentScene) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl">
      <div className="relative aspect-[4/3] bg-black">
        {/* Game scene background */}
        {currentScene.background && (
          <div
            className="absolute inset-0 bg-center bg-cover rounded-t-2xl"
            style={{ backgroundImage: `url(${currentScene.background})` }}
          />
        )}

        {/* Character sprites */}
        {currentScene.characters &&
          currentScene.characters.map((char, index) => (
            <CharacterSprite key={index} character={char} position={char.position || "center"} />
          ))}

        {/* Battle UI */}
        {inBattle && opponent && (
          <BattleSystem
            opponent={opponent}
            playerStats={playerStats}
            onBattleEnd={handleBattleEnd}
            onPlayerDamage={handlePlayerDamage}
          />
        )}
      </div>

      {/* Dialogue and choices */}
      <div className={inBattle ? "mt-16" : ""}>
        <DialogueBox
          text={currentScene.text}
          speaker={currentScene.speaker}
          choices={currentScene.choices}
          onChoice={handleChoice}
        />
      </div>

      {/* Game stats (debug) */}
      <div className="p-2 text-xs text-zinc-500 border-t border-zinc-700 flex justify-between backdrop-blur-sm bg-zinc-800/80 rounded-b-xl shadow-lg relative z-0 mt-0">
        <div>
          HP: {playerStats.hp}/{playerStats.maxHp}
        </div>
        <div>
          Mercy: {gameState.mercy} | Violence: {gameState.violence}
        </div>
      </div>
    </div>
  )
}
