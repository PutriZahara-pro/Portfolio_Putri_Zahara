"use client"
import { Button } from "@/components/ui/button"
import { Shield, Sword, Heart, ArrowRight } from "lucide-react"
import type { Character } from "@/components/game/types"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/components/game/translations"

interface BattleInterfaceProps {
  player: {
    hp: number
    maxHp: number
    attack: number
    defense: number
  }
  opponent: Character & {
    stats: {
      hp: number
      maxHp: number
      attack: number
      defense: number
    }
  }
  onAction: (action: "attack" | "defend" | "mercy" | "flee") => void
  message: string
  currentAction: "none" | "attack" | "defend" | "mercy" | "flee"
}

export default function BattleInterface({ player, opponent, onAction, message, currentAction }: BattleInterfaceProps) {
  const { language } = useLanguage();
  
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-900/90 border-t border-zinc-700 p-4 rounded-xl"
        style={{ boxShadow: "0 -5px 20px rgba(0,0,0,0.2)" }}
      >
        {/* Battle message */}
        <div className="text-white text-center mb-4 min-h-[24px] font-medium">{message || getTranslation('ui.what_will_you_do', language)}</div>

        {/* Health bars */}
        <div className="flex justify-between mb-4">
          {/* Player health */}
          <div className="w-[48%]">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-blue-400">{getTranslation('ui.you', language)}</span>
              <span className="text-blue-300">{player.hp}/{player.maxHp} {getTranslation('ui.hp', language)}</span>
            </div>
            <div className="w-full bg-zinc-700 border border-blue-700/50 overflow-hidden rounded-full">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                transition={{ type: "spring", damping: 15 }}
                className={`h-3 shadow-inner shadow-white/10 ${player.hp / player.maxHp < 0.2 ? 'bg-gradient-to-r from-red-600 to-red-400' : player.hp / player.maxHp < 0.5 ? 'bg-gradient-to-r from-yellow-500 to-yellow-300' : 'bg-gradient-to-r from-green-500 to-lime-300'} rounded-full`}
              />
            </div>
          </div>
          
          {/* Enemy health */}
          <div className="w-[48%]">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-red-400">{opponent.name}</span>
              <span className="text-red-300">{opponent.stats.hp}/{opponent.stats.maxHp} {getTranslation('ui.hp', language)}</span>
            </div>
            <div className="w-full bg-zinc-700 border border-red-700/50 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: `${(opponent.stats.hp / opponent.stats.maxHp) * 100}%` }}
                transition={{ type: "spring", damping: 15 }}
                className={`h-3 shadow-inner shadow-white/10 ${opponent.stats.hp / opponent.stats.maxHp < 0.2 ? 'bg-gradient-to-r from-red-600 to-red-400' : opponent.stats.hp / opponent.stats.maxHp < 0.5 ? 'bg-gradient-to-r from-yellow-500 to-yellow-300' : 'bg-gradient-to-r from-green-500 to-lime-300'} rounded-full`}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 border-t border-zinc-700 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button
              onClick={() => onAction("attack")}
              className="relative bg-white border-2 border-yellow-400 text-zinc-800 font-medium rounded-xl hover:bg-yellow-100 flex items-center justify-center gap-2 text-sm sm:text-base shadow-md transition-all duration-300 after:content-[''] after:absolute after:left-[-5px] after:right-[-5px] after:top-[-5px] after:bottom-[-5px] after:bg-white after:rounded-xl after:z-[-1] after:shadow-lg hover:after:bg-yellow-100 hover:after:shadow-yellow-300/50 hover:shadow-[0_0_10px_rgba(250,204,21,0.7)]"
            >
              <Sword size={16} className="animate-pulse text-red-500" />
              <span className="hidden sm:inline">{getTranslation('ui.attack', language)}</span>
            </Button>
            <Button
              onClick={() => onAction("defend")}
              className="relative bg-white border-2 border-blue-400 text-zinc-800 font-medium rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2 text-sm sm:text-base shadow-md transition-all duration-300 after:content-[''] after:absolute after:left-[-5px] after:right-[-5px] after:top-[-5px] after:bottom-[-5px] after:bg-white after:rounded-xl after:z-[-1] after:shadow-lg hover:after:bg-blue-100 hover:after:shadow-blue-300/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]"
            >
              <Shield size={16} className="text-blue-600" />
              <span className="hidden sm:inline">{getTranslation('ui.defend', language)}</span>
            </Button>
            <Button
              onClick={() => onAction("mercy")}
              className="relative bg-white border-2 border-green-400 text-zinc-800 font-medium rounded-xl hover:bg-green-100 flex items-center justify-center gap-2 text-sm sm:text-base shadow-md transition-all duration-300 after:content-[''] after:absolute after:left-[-5px] after:right-[-5px] after:top-[-5px] after:bottom-[-5px] after:bg-white after:rounded-xl after:z-[-1] after:shadow-lg hover:after:bg-green-100 hover:after:shadow-green-300/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.7)]"
            >
              <Heart size={16} className="text-red-500" />
              <span className="hidden sm:inline">{getTranslation('ui.mercy', language)}</span>
            </Button>
            <Button
              onClick={() => onAction("flee")}
              className="relative bg-white border-2 border-zinc-400 text-zinc-800 font-medium rounded-xl hover:bg-zinc-200 flex items-center justify-center gap-2 text-sm sm:text-base shadow-md transition-all duration-300 after:content-[''] after:absolute after:left-[-5px] after:right-[-5px] after:top-[-5px] after:bottom-[-5px] after:bg-white after:rounded-xl after:z-[-1] after:shadow-lg hover:after:bg-zinc-100 hover:after:shadow-zinc-300/50 hover:shadow-[0_0_10px_rgba(161,161,170,0.7)]"
            >
              <ArrowRight size={16} className="text-zinc-600" />
              <span className="hidden sm:inline">{getTranslation('ui.flee', language)}</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
