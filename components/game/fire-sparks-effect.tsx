"use client"

import { useEffect, useState } from "react"

interface Spark {
  id: number
  size: number
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  duration: number
}

export default function FireSparksEffect() {
  const [sparks, setSparks] = useState<Spark[]>([])
  
  // Création des étincelles initiales
  useEffect(() => {
    const initialSparks = Array.from({ length: 100 }).map((_, i) => createSpark(i))
    setSparks(initialSparks)
    
    const interval = setInterval(() => {
      setSparks(prevSparks => {
        // Mettre à jour les étincelles existantes
        const updatedSparks = prevSparks.map(spark => {
          // Mouvement et physique des étincelles
          const newX = spark.x + spark.vx
          const newY = spark.y + spark.vy
          const newOpacity = spark.opacity - (1 / spark.duration)
          
          // Si l'étincelle disparaît, la remplacer
          if (newOpacity <= 0) {
            return createSpark(spark.id)
          }
          
          return {
            ...spark,
            x: newX,
            y: newY,
            opacity: newOpacity
          }
        })
        
        return updatedSparks
      })
    }, 50)  // Mise à jour toutes les 50ms
    
    return () => clearInterval(interval)
  }, [])
  
  // Fonction pour créer une nouvelle étincelle
  const createSpark = (id: number): Spark => {
    // Position centrale de départ
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    // Angle aléatoire pour la trajectoire
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 5 + 2
    
    return {
      id,
      size: Math.random() * 6 + 2,
      x: centerX + (Math.random() * 20 - 10),
      y: centerY + (Math.random() * 20 - 10),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      opacity: 1,
      duration: Math.random() * 50 + 20
    }
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            opacity: spark.opacity,
            background: `radial-gradient(circle, rgba(255,165,0,1) ${spark.size * 0.3}px, rgba(255,0,0,0.8) ${spark.size}px)`,
            boxShadow: '0 0 8px 2px rgba(255,100,0,0.7)',
            transform: `scale(${1 + Math.random() * 0.5})`,
          }}
        />
      ))}
    </div>
  )
}
