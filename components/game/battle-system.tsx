"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Character } from "@/components/game/types"
import HealthBar from "./health-bar"

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

  const handleAttack = () => {
    if (!playerTurn || battleState !== "active") return

    const damage = Math.max(1, playerStats.attack - opponentStats.defense)
    const newHp = Math.max(0, opponentStats.hp - damage)

    setBattleText(`You attack ${opponent.name} for ${damage} damage!`)
    setOpponentStats({ ...opponentStats, hp: newHp })
    setPlayerTurn(false)
  }

  const handleMercy = () => {
    if (!playerTurn || battleState !== "active") return

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
    if (!playerTurn || battleState !== "active") return

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
      {/* Opponent */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative h-[28rem] w-96 mb-4">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-800/90 px-4 py-2 rounded-full text-base font-medium text-white z-10 shadow-md">
            {opponent.name}
          </div>
          <Image 
            src={opponent.image || "/placeholder.svg"} 
            alt={opponent.name} 
            fill 
            className="object-contain" 
            style={{
              objectPosition: opponent.id === 'milo' ? '50% 40%' : opponent.id === 'hades' ? '50% 40%' : '50% 20%',
              transform: opponent.id === 'milo' ? 'scale(1.5)' : opponent.id === 'hades' ? 'scale(1.5)' : 'scale(2.5)',
              transformOrigin: 'center 20%'
            }}
          />
        </div>
      </div>

      {/* Battle UI */}
      <div className="bg-zinc-900/95 p-6 border-t-2 border-emerald-500 rounded-t-xl shadow-lg relative z-30 mb-0">
        {/* Health bars */}
        <div className="flex justify-between mb-6 gap-8">
          <div className="w-1/2">
            <div className="text-base mb-2 font-medium text-emerald-400">Demetrius</div>
            <HealthBar currentHP={playerStats.hp} maxHP={playerStats.maxHp} />
          </div>

          <div className="w-1/2">
            <div className="text-base mb-2 font-medium text-red-400 text-right">{opponent.name}</div>
            <HealthBar currentHP={opponentStats.hp} maxHP={opponentStats.maxHp} />
          </div>
        </div>

        {/* Battle text */}
        <div className="min-h-[50px] mb-5 text-center p-3 bg-zinc-800/80 rounded-lg border border-zinc-700 text-white">
          {battleText}
        </div>

        {/* Battle actions */}
        {playerTurn && battleState === "active" && (
          <div className="grid grid-cols-3 gap-4">
            <Button 
              onClick={handleAttack} 
              className="bg-red-600 hover:bg-red-700 border-2 border-red-400 text-white py-3 rounded-xl shadow-md"
            >
              Attack
            </Button>
            <Button 
              onClick={handleMercy} 
              className="bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-400 text-white py-3 rounded-xl shadow-md"
            >
              Mercy
            </Button>
            <Button 
              onClick={handleFlee} 
              className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-400 text-white py-3 rounded-xl shadow-md"
            >
              Flee
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
