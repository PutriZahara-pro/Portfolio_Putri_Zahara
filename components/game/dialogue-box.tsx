"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { Choice } from "@/components/game/types"

interface DialogueBoxProps {
  text: string
  speaker?: string
  choices?: Choice[]
  onChoice: (choice: Choice) => void
}

export default function DialogueBox({ text, speaker, choices, onChoice }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const typingSpeed = 30 // ms per character

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

  const handleClick = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(text)
      setIsTyping(false)
      setShowChoices(true)
    }
  }

  return (
    <div className="p-6 bg-zinc-800/90 border-t border-zinc-700 cursor-pointer relative z-10 backdrop-blur-sm mt-0 rounded-t-xl shadow-lg" onClick={handleClick}>
      {speaker && <div className="font-bold text-emerald-400 mb-2">{speaker}</div>}

      <div className="min-h-[80px] mb-4">
        {displayedText}
        {isTyping && <span className="animate-pulse">▌</span>}
      </div>

      {showChoices && choices && choices.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {choices.map((choice, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start border-zinc-600 hover:border-emerald-400 hover:bg-zinc-700 px-3"
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
  )
}
