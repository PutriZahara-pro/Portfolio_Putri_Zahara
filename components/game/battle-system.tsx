"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Sword, Heart, ArrowRight } from "lucide-react"
import type { Character } from "@/components/game/types"
import CharacterSprite from "./character-sprite"
import { motion } from "framer-motion"

interface BattleSystemProps {
  opponent: Character
  playerStats: {
    hp: number
    maxHp: number
    attack: number
    defense: number
  }
  onBattleEnd: (outcome: "victory" | "defeat" | "mercy" | "flee") => void
  onPlayerDamage: (damage: number) => void
}

export default function BattleSystem({ opponent, playerStats, onBattleEnd, onPlayerDamage }: BattleSystemProps) {
  const [opponentStats, setOpponentStats] = useState({
    hp: opponent.stats?.hp || 20,
    maxHp: opponent.stats?.maxHp || 20,
    attack: opponent.stats?.attack || 3,
    defense: opponent.stats?.defense || 1,
  })
  const [battleText, setBattleText] = useState(`You are facing ${opponent.name}!`)
  const [playerTurn, setPlayerTurn] = useState(true)
  const [mercyAttempts, setMercyAttempts] = useState(0)
  const [mercyThreshold, setMercyThreshold] = useState(3)
  const [battleState, setBattleState] = useState<"active" | "victory" | "defeat" | "mercy" | "flee">("active")
  const [currentAction, setCurrentAction] = useState<"none" | "attack" | "defend" | "mercy" | "flee">("none")

  // Handle opponent's turn
  useEffect(() => {
    if (!playerTurn && battleState === "active") {
      const timer = setTimeout(() => {
        const damage = Math.max(1, opponentStats.attack - playerStats.defense)
        setBattleText(`${opponent.name} attacks! You take ${damage} damage.`)
        onPlayerDamage(damage)

        setTimeout(() => {
          setPlayerTurn(true)
          setBattleText("What will you do?")
          setCurrentAction("none")
        }, 1500)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [playerTurn, battleState, opponent.name, opponentStats.attack, playerStats.defense, onPlayerDamage])

  // Check for battle end conditions
  useEffect(() => {
    if (opponentStats.hp <= 0 && battleState === "active") {
      setBattleState("victory")
      setBattleText(`You have defeated ${opponent.name}!`)

      setTimeout(() => {
        onBattleEnd("victory")
      }, 2000)
    }
  }, [opponentStats.hp, battleState, opponent.name, onBattleEnd])

  const handleAction = (action: "attack" | "defend" | "mercy" | "flee") => {
    if (!playerTurn || battleState !== "active") return
    
    setCurrentAction(action)
    
    switch(action) {
      case "attack":
        handleAttack()
        break
      case "defend":
        // Special defense logic
        setBattleText(`You brace yourself for the enemy's attack.`)
        setPlayerTurn(false)
        break
      case "mercy":
        handleMercy()
        break
      case "flee":
        handleFlee()
        break
    }
  }

  const handleAttack = () => {
    const damage = Math.max(1, playerStats.attack - opponentStats.defense)
    const newHp = Math.max(0, opponentStats.hp - damage)

    setBattleText(`You attack ${opponent.name} for ${damage} damage!`)
    setOpponentStats({ ...opponentStats, hp: newHp })
    setPlayerTurn(false)
  }

  const handleMercy = () => {
    const newMercyAttempts = mercyAttempts + 1
    setMercyAttempts(newMercyAttempts)

    if (newMercyAttempts >= mercyThreshold) {
      setBattleState("mercy")
      setBattleText(`${opponent.name} has accepted your mercy.`)

      setTimeout(() => {
        onBattleEnd("mercy")
      }, 2000)
    } else {
      setBattleText(`You try to show mercy to ${opponent.name}. (${newMercyAttempts}/${mercyThreshold})`)
      setPlayerTurn(false)
    }
  }

  const handleFlee = () => {
    const fleeChance = Math.random()

    if (fleeChance > 0.5) {
      setBattleState("flee")
      setBattleText("You managed to escape!")

      setTimeout(() => {
        onBattleEnd("flee")
      }, 2000)
    } else {
      setBattleText("You couldn't escape!")
      setPlayerTurn(false)
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-visible">
      {/* Afficher le personnage adverse centré (style maj) */}
      <div className="flex-1 relative">
        <CharacterSprite
          character={opponent}
          position="center"
          isBattle={true}
          animation={battleState === "victory" ? "defeat" : battleState === "defeat" ? "victory" : "idle"}
        />
      </div>

      {/* Interface de combat */}
      <div className="absolute bottom-[180px] left-0 right-0 z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/90 border-2 border-emerald-500 rounded-lg p-4 shadow-lg"
        >
          {/* Battle message */}
          <div className="text-white text-center mb-4 min-h-[24px] font-medium">{battleText}</div>

          {/* Health bars */}
          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-blue-400">You</span>
                <span className="text-blue-300">
                  {playerStats.hp}/{playerStats.maxHp} HP
                </span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-3 p-0.5 border border-blue-700/50 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(playerStats.hp / playerStats.maxHp) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full shadow-inner shadow-white/10"
                />
              </div>
            </div>

            <div className="w-[48%]">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-red-400">{opponent.name}</span>
                <span className="text-red-300">
                  {opponentStats.hp}/{opponentStats.maxHp} HP
                </span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-3 p-0.5 border border-red-700/50 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(opponentStats.hp / opponentStats.maxHp) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full shadow-inner shadow-white/10"
                />
              </div>
            </div>
          </div>

          {/* Battle actions */}
          {currentAction === "none" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button
                onClick={() => handleAction("attack")}
                className="bg-gradient-to-b from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 flex items-center justify-center gap-2 text-sm sm:text-base border border-red-400/30 shadow-md"
              >
                <Sword size={16} className="animate-pulse" />
                <span className="hidden sm:inline">Attack</span>
              </Button>
              <Button
                onClick={() => handleAction("defend")}
                className="bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 flex items-center justify-center gap-2 text-sm sm:text-base border border-blue-400/30 shadow-md"
              >
                <Shield size={16} />
                <span className="hidden sm:inline">Defend</span>
              </Button>
              <Button
                onClick={() => handleAction("mercy")}
                className="bg-gradient-to-b from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 flex items-center justify-center gap-2 text-sm sm:text-base border border-emerald-400/30 shadow-md"
              >
                <Heart size={16} />
                <span className="hidden sm:inline">Mercy</span>
              </Button>
              <Button
                onClick={() => handleAction("flee")}
                className="bg-gradient-to-b from-zinc-600 to-zinc-800 hover:from-zinc-500 hover:to-zinc-700 flex items-center justify-center gap-2 text-sm sm:text-base border border-zinc-400/30 shadow-md"
              >
                <ArrowRight size={16} />
                <span className="hidden sm:inline">Flee</span>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
