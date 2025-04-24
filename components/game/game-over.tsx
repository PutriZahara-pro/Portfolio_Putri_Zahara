"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface GameOverProps {
  ending: string
  onRestart: () => void
}

export default function GameOver({ ending, onRestart }: GameOverProps) {
  const endings = {
    captured: {
      title: "Captured",
      description:
        "Your rebellion was crushed before it could truly begin. The Empire's grip on the land remains unbroken.",
      color: "text-red-500",
    },
    death: {
      title: "Death in Battle",
      description:
        "You died fighting for what you believed in. Though your rebellion failed, stories of your courage live on, inspiring others.",
      color: "text-orange-500",
    },
    milo_victory: {
      title: "Defeated by Milo",
      description:
        "Commandant Milo proved too powerful. Your resistance was scattered, and the Empire's control was strengthened.",
      color: "text-red-500",
    },
    hades_victory: {
      title: "Crushed by the Emperor",
      description:
        "Emperor Hades personally ended your rebellion. Your name becomes a cautionary tale about the futility of resistance.",
      color: "text-red-500",
    },
    betrayer: {
      title: "The Betrayer",
      description:
        "You chose power over principles. As a noble in the Empire, you enjoy luxury and influence, but at night, the faces of those you betrayed haunt your dreams.",
      color: "text-purple-500",
    },
    redeemed: {
      title: "The Redeemed",
      description:
        "After nearly losing yourself to ambition, you found your way back to the path of righteousness. Though not all trust you, your actions speak louder than words.",
      color: "text-blue-500",
    },
    exile: {
      title: "The Exile",
      description:
        "Unable to face the consequences of your choices, you fled into exile. You live out your days in solitude, wondering what might have been.",
      color: "text-gray-500",
    },
    victorious: {
      title: "The Liberator",
      description:
        "With the Empire defeated, you lead your people into a new era of freedom. The road is difficult, but for the first time, the future belongs to the people.",
      color: "text-emerald-500",
    },
    peace: {
      title: "The Peacemaker",
      description:
        "Your mercy toward Emperor Hades changed everything. Together, you forge a new path forward, proving that even the deepest divides can be bridged.",
      color: "text-emerald-500",
    },
    continue_fight: {
      title: "The Resistance Continues",
      description:
        "Though you couldn't defeat Hades, your alliance with Vulkan gives the resistance new strength. The fight continues, with hope on your side.",
      color: "text-yellow-500",
    },
    diplomatic: {
      title: "The Diplomat",
      description:
        "Against all odds, you found a peaceful solution. Your wisdom and vision created an alliance that brings prosperity to all peoples.",
      color: "text-emerald-500",
    },
  }

  const endingInfo = endings[ending as keyof typeof endings] || {
    title: "The End",
    description: "Your journey has come to an end.",
    color: "text-white",
  }

  return (
    <div className="bg-zinc-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="relative aspect-[4/3] bg-black flex items-center justify-center rounded-t-2xl">
        <div className="text-center p-8">
          <h2 className={`text-6xl font-bold mb-6 ${endingInfo.color}`}>{endingInfo.title}</h2>
          <p className="text-xl mb-8 max-w-lg mx-auto">{endingInfo.description}</p>
          <Button onClick={onRestart} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 mx-auto">
            <RefreshCw className="h-4 w-4" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  )
}
