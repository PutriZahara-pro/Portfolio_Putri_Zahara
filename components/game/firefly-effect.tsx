"use client"

import { useEffect, useState } from "react"

interface Firefly {
  id: number
  size: number
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  glowIntensity: number
  glowSpeed: number
  glowDirection: boolean
}

export default function FireflyEffect() {
  const [fireflies, setFireflies] = useState<Firefly[]>([])
  
  // Création des lucioles initiales
  useEffect(() => {
    const initialFireflies = Array.from({ length: 60 }).map((_, i) => createFirefly(i))
    setFireflies(initialFireflies)
    
    const interval = setInterval(() => {
      setFireflies(prevFireflies => {
        // Mettre à jour les lucioles existantes
        return prevFireflies.map(firefly => {
          // Mouvement des lucioles (lent et flottant)
          const newX = firefly.x + firefly.vx
          const newY = firefly.y + firefly.vy
          
          // Effet de pulsation de la luminosité
          let newGlowIntensity = firefly.glowIntensity
          if (firefly.glowDirection) {
            newGlowIntensity += firefly.glowSpeed
            if (newGlowIntensity >= 1) {
              newGlowIntensity = 1
              firefly.glowDirection = false
            }
          } else {
            newGlowIntensity -= firefly.glowSpeed
            if (newGlowIntensity <= 0.3) {
              newGlowIntensity = 0.3
              firefly.glowDirection = true
            }
          }
          
          // Si la luciole sort de l'écran par le haut, la réinitialiser en bas
          if (newY < -50) {
            return createFirefly(firefly.id, true)
          }
          
          // Léger changement aléatoire de direction
          const newVx = firefly.vx + (Math.random() * 0.2 - 0.1)
          const newVy = firefly.vy
          
          return {
            ...firefly,
            x: newX,
            y: newY,
            vx: newVx > 0.5 ? 0.5 : (newVx < -0.5 ? -0.5 : newVx),
            glowIntensity: newGlowIntensity
          }
        })
      })
    }, 50)  // Mise à jour toutes les 50ms
    
    return () => clearInterval(interval)
  }, [])
  
  // Fonction pour créer une nouvelle luciole
  const createFirefly = (id: number, fromBottom = false): Firefly => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    
    return {
      id,
      size: Math.random() * 8 + 4,
      x: Math.random() * screenWidth,
      y: fromBottom ? screenHeight + 20 : screenHeight - Math.random() * 200,
      vx: Math.random() * 0.4 - 0.2,
      vy: -Math.random() * 1 - 0.5, // Toujours monter
      opacity: Math.random() * 0.4 + 0.6,
      glowIntensity: Math.random() * 0.5 + 0.3,
      glowSpeed: Math.random() * 0.01 + 0.005,
      glowDirection: Math.random() > 0.5
    }
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireflies.map(firefly => (
        <div
          key={firefly.id}
          className="absolute rounded-full transition-opacity"
          style={{
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            left: `${firefly.x}px`,
            top: `${firefly.y}px`,
            opacity: firefly.opacity * firefly.glowIntensity,
            background: 'radial-gradient(circle, rgba(255,255,180,1) 0%, rgba(255,253,170,0.8) 40%, rgba(255,250,200,0) 70%)',
            boxShadow: `0 0 ${10 * firefly.glowIntensity}px ${5 * firefly.glowIntensity}px rgba(255,255,200,${0.6 * firefly.glowIntensity})`,
          }}
        />
      ))}
    </div>
  )
}
