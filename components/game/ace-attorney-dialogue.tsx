"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import type { Choice } from "@/components/game/types"

interface AceAttorneyDialogueProps {
  text: string
  speaker?: string
  choices?: Choice[]
  onChoice: (choice: Choice) => void
}

export default function AceAttorneyDialogue({ text, speaker, choices, onChoice }: AceAttorneyDialogueProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const dialogueBoxRef = useRef<HTMLDivElement>(null)

  const typingSpeed = 30 // ms per character

  // Typing effect
  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)
    setShowChoices(false)

    let currentText = ""
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex]
        setDisplayedText(currentText)
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setShowChoices(true)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [text])

  // Handle click to skip typing animation
  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(text)
      setIsTyping(false)
      setShowChoices(true)
    }
  }

  // Get speaker color based on name
  const getSpeakerColor = () => {
    if (!speaker) return "from-emerald-700 to-emerald-900"

    // Liste des personnages ennemis
    const isEnemy = speaker.toLowerCase().includes("garde") || 
                   speaker.toLowerCase().includes("commandant") || 
                   speaker.toLowerCase().includes("emperor") || 
                   speaker.toLowerCase().includes("empereur") || 
                   speaker.toLowerCase().includes("imperial") || 
                   speaker.toLowerCase().includes("impérial") || 
                   speaker.toLowerCase().includes("milo") ||
                   speaker.toLowerCase().includes("hades");
    
    // Liste des personnages alliés/gentils
    const isAlly = speaker.toLowerCase().includes("demetrius") ||
                  speaker.toLowerCase().includes("haekal") ||
                  speaker.toLowerCase().includes("haikal") ||
                  speaker.toLowerCase().includes("queen") ||
                  speaker.toLowerCase().includes("reine") ||
                  speaker.toLowerCase().includes("ellis") ||
                  speaker.toLowerCase().includes("prisoner") ||
                  speaker.toLowerCase().includes("prisonnier");
                  
    // Utiliser le rouge pour les ennemis, bleu pour les alliés
    if (isEnemy) {
      return "from-red-700 to-red-900"
    } else if (isAlly) {
      return "from-blue-700 to-blue-900"
    } else {
      return "from-emerald-700 to-emerald-900"
    }
  }

  return (
    <div className="relative w-full" onClick={handleClick}>
      {/* Dialogue box - Ace Attorney style */}
      <div
        ref={dialogueBoxRef}
        className="relative w-full bg-gradient-to-r from-zinc-900/95 to-zinc-800/95 border-t-2 border-emerald-500 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
      >
        {/* Speaker name */}
        {speaker && (
          <div
            className={`absolute -top-10 left-5 py-2 px-6 font-bold text-lg text-white shadow-lg bg-gradient-to-r ${getSpeakerColor()}`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)",
              minWidth: "180px",
              boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)",
            }}
          >
            {speaker}
          </div>
        )}

        {/* Dialogue text */}
        <div className="p-5 min-h-[80px] text-xl text-white">
          {displayedText}
          {isTyping && <span className="animate-pulse">▌</span>}
        </div>

        {/* Continue indicator */}
        {!isTyping && !choices?.length && (
          <div className="absolute bottom-4 right-4 animate-bounce">
            <ChevronRight className="h-6 w-6 text-emerald-400" />
          </div>
        )}

        {/* Choices */}
        {showChoices && choices && choices.length > 0 && (
          <div className="p-4 bg-zinc-800/90 border-t border-zinc-700">
            <div className="flex flex-col gap-2">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  className="text-left py-3 px-4 bg-zinc-700/80 hover:bg-emerald-800/60 text-white hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] border border-zinc-600 hover:border-emerald-500 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChoice(choice)
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
