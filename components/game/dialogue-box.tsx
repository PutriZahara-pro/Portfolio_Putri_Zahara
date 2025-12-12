"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { Choice } from "@/components/game/types"

interface DialogueBoxProps {
  text: string
  speaker?: string
  speakerImage?: string
  choices?: Choice[]
  onChoice: (choice: Choice) => void
  emotion?: "neutral" | "happy" | "angry" | "sad" | "surprised"
  position?: "left" | "right"
}

export default function DialogueBox({
  text,
  speaker,
  speakerImage,
  choices,
  onChoice,
  emotion = "neutral",
  position = "left",
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const [isPortraitAnimating, setIsPortraitAnimating] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState(emotion)
  const dialogueBoxRef = useRef<HTMLDivElement>(null)

  const typingSpeed = 30 // ms per character

  // Optimisation de l'effet de typing
  useEffect(() => {
    let isTypingAnimation = true
    let currentText = ""
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (!isTypingAnimation) return

        if (currentIndex < text.length) {
          const char = text[currentIndex]
          currentText += char
          setDisplayedText(currentText)
          currentIndex++

          // Ajuster la vitesse en fonction du caractère
          const nextDelay = char === '.' || char === '!' || char === '?' ? typingSpeed * 4 : typingSpeed
          clearInterval(typingInterval)
          typingInterval = setInterval(startTyping, nextDelay)
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
          setShowChoices(true)
        }
      }, typingSpeed)
    }

    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)
    startTyping()

    return () => {
      isTypingAnimation = false
      clearInterval(typingInterval)
    }
  }, [text, typingSpeed])

  // Optimisation de l'animation du portrait
  useEffect(() => {
    let animationInterval: NodeJS.Timeout

    if (isTyping) {
      const startAnimation = () => {
        setIsPortraitAnimating(true)
        animationInterval = setInterval(() => {
          setIsPortraitAnimating(prev => !prev)
        }, 150)
      }

      startAnimation()
    } else {
      setIsPortraitAnimating(false)
    }

    return () => {
      clearInterval(animationInterval)
      setIsPortraitAnimating(false)
    }
  }, [isTyping])

  // Animation d'émotion
  useEffect(() => {
    setCurrentEmotion(emotion)
  }, [emotion])

  // Optimisation des classes d'animation
  const getPortraitAnimation = useCallback(() => {
    if (!isPortraitAnimating) return ""

    switch (currentEmotion) {
      case "angry":
        return "animate-shake"
      case "surprised":
        return "animate-bounce-once"
      case "happy":
        return "animate-pulse"
      default:
        return "animate-subtle-bounce"
    }
  }, [isPortraitAnimating, currentEmotion])

  // Optimisation de la position du portrait
  const getPortraitPosition = useCallback(() => {
    return position === "left" ? "left-0" : "right-0"
  }, [position])

  // Optimisation du clic
  const handleClick = useCallback(() => {
    if (isTyping) {
      setDisplayedText(text)
      setIsTyping(false)
      setShowChoices(true)
    }
  }, [isTyping, text])

  return (
    <div className="relative">
      {/* Portrait du personnage qui parle */}
      {speaker && speakerImage && (
        <div
          className={`absolute -top-32 ${getPortraitPosition()} z-20 ${getPortraitAnimation()}`}
          style={{ transition: "transform 0.2s ease" }}
        >
          <div className="relative w-32 h-32 rounded-full border-4 border-emerald-500 overflow-hidden bg-zinc-800 shadow-lg">
            <Image src={speakerImage || "/placeholder.svg"} alt={speaker} fill className="object-cover object-top" />
          </div>
        </div>
      )}

      {/* Boîte de dialogue style Crimson Gem Saga */}
      <div
        ref={dialogueBoxRef}
        className="p-5 bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-emerald-500 rounded-xl shadow-lg cursor-pointer relative z-10 mt-8"
        onClick={handleClick}
      >
        {/* Nom du personnage */}
        {speaker && (
          <div className="absolute -top-5 left-10 bg-emerald-600 px-4 py-1 rounded-full font-bold text-white shadow-md">
            {speaker}
          </div>
        )}

        {/* Texte du dialogue */}
        <div className="min-h-[80px] mb-4 text-white pt-2">
          {displayedText}
          {isTyping && <span className="animate-pulse">▌</span>}
        </div>

        {/* Indicateur de continuation */}
        {!isTyping && !choices?.length && (
          <div className="absolute bottom-2 right-2 animate-bounce">
            <ChevronDown className="h-5 w-5 text-emerald-400" />
          </div>
        )}

        {/* Choix */}
        {showChoices && choices && choices.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {choices.map((choice, index) => (
              <Button
                key={index}
                className="justify-start border border-emerald-600 hover:border-emerald-400 hover:bg-emerald-900/30 bg-zinc-800/80 text-white py-2 px-4 rounded-lg transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  onChoice(choice)
                }}
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
