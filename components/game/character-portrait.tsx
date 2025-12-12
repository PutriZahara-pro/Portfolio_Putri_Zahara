"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Character } from "@/components/game/types"

interface CharacterPortraitProps {
  character: Character
  emotion?: "neutral" | "happy" | "angry" | "sad" | "surprised"
  isTalking?: boolean
  size?: "small" | "medium" | "large"
  position?: "left" | "right" | "center"
}

export default function CharacterPortrait({
  character,
  emotion = "neutral",
  isTalking = false,
  size = "medium",
  position = "center",
}: CharacterPortraitProps) {
  const [currentFrame, setCurrentFrame] = useState(0)

  // Animation de dialogue
  useEffect(() => {
    if (!isTalking) return

    const frameInterval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 4) // 4 frames d'animation
    }, 150)

    return () => clearInterval(frameInterval)
  }, [isTalking])

  // Déterminer la taille du portrait
  const getSize = () => {
    switch (size) {
      case "small":
        return "w-24 h-24"
      case "large":
        return "w-48 h-48"
      case "medium":
      default:
        return "w-32 h-32"
    }
  }

  // Déterminer la position
  const getPosition = () => {
    switch (position) {
      case "left":
        return "justify-start"
      case "right":
        return "justify-end"
      case "center":
      default:
        return "justify-center"
    }
  }

  // Obtenir l'animation en fonction de l'émotion
  const getEmotionAnimation = () => {
    if (!isTalking) return ""

    switch (emotion) {
      case "happy":
        return "animate-pulse"
      case "angry":
        return "animate-shake"
      case "surprised":
        return "animate-bounce-once"
      case "sad":
        return "animate-slow-pulse"
      default:
        return "animate-subtle-bounce"
    }
  }

  // Obtenir le décalage vertical pour simuler l'animation de parole
  const getTalkingOffset = () => {
    if (!isTalking) return "translate-y-0"

    // Petits mouvements verticaux basés sur le frame actuel
    const offsets = ["translate-y-0", "translate-y-[2px]", "translate-y-0", "translate-y-[-2px]"]
    return offsets[currentFrame]
  }

  return (
    <div className={`flex ${getPosition()} w-full`}>
      <div
        className={`relative ${getSize()} rounded-full border-4 border-emerald-500 overflow-hidden bg-zinc-800 shadow-lg ${getEmotionAnimation()}`}
      >
        <div className={`absolute inset-0 transition-transform ${getTalkingOffset()}`}>
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Indicateur d'émotion */}
        {emotion !== "neutral" && (
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-zinc-800 border-2 border-emerald-500 flex items-center justify-center">
            {emotion === "happy" && "😊"}
            {emotion === "angry" && "😠"}
            {emotion === "sad" && "😢"}
            {emotion === "surprised" && "😲"}
          </div>
        )}
      </div>
    </div>
  )
}
