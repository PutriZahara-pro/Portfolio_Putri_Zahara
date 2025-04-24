"use client"

interface HealthBarProps {
  currentHP: number
  maxHP: number
  showText?: boolean
}

export default function HealthBar({ currentHP, maxHP, showText = true }: HealthBarProps) {
  const healthPercent = Math.max(0, Math.min(100, (currentHP / maxHP) * 100))
  
  // Déterminer la couleur de la barre de santé en fonction du pourcentage
  const getHealthBarColor = () => {
    if (healthPercent <= 15) {
      return "bg-gradient-to-r from-red-700 to-red-500" // critique
    } else if (healthPercent <= 50) {
      return "bg-gradient-to-r from-yellow-600 to-yellow-400" // bas
    } else {
      return "bg-gradient-to-r from-green-600 to-lime-400" // normal
    }
  }

  return (
    <div className="hp-container w-full max-w-[200px] mx-auto">
      {showText && (
        <div className="text-center text-zinc-300 text-sm mb-1">
          {currentHP} / {maxHP} HP
        </div>
      )}
      <div className="hp-bar relative h-3 rounded-full bg-zinc-800 border-2 border-emerald-500 overflow-hidden shadow-inner">
        <div 
          className={`health-indicator h-full ${getHealthBarColor()} transition-all duration-300 ease-out`}
          style={{ width: `${healthPercent}%` }}
        />
      </div>
    </div>
  )
}
