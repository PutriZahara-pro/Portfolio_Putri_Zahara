"use client"

import Image from "next/image"
import type { Character } from "@/components/game/types"

interface CharacterSpriteProps {
  character: Character
  position: "left" | "center" | "right"
}

export default function CharacterSprite({ character, position }: CharacterSpriteProps) {
  const positionClasses = {
    left: "left-4 bottom-4",
    center: "left-1/2 -translate-x-1/2 bottom-4",
    right: "right-4 bottom-4",
  }

  return (
    <div className={`absolute ${positionClasses[position]} transition-all duration-300`}>
      {/* Nom au-dessus du personnage */}
      <div className="absolute -top-16 left-0 right-0 mx-auto text-center bg-zinc-800/90 px-4 py-2 rounded-full text-base font-medium text-white z-10 shadow-md">
        {character.name}
      </div>
      
      {/* Image du personnage (buste) */}
      <div className="relative h-96 w-72">
        <Image 
          src={character.image || "/placeholder.svg"} 
          alt={character.name} 
          fill 
          className="object-contain" 
          style={{ 
            objectPosition: '50% 30%',
            transform: 'scale(1.8)',
            transformOrigin: 'center 20%'
          }}
        />
      </div>
    </div>
  )
}
