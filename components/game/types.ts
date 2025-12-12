export interface Character {
  id: string
  name: string
  image: string
  stats?: {
    hp: number
    maxHp: number
    attack: number
    defense: number
  }
  size?: "small" | "normal" | "large"
  position?: "left" | "center" | "right"
  animation?: "idle" | "attack" | "hurt" | "victory" | "defeat"
}

export interface Choice {
  text: string
  nextScene: string
  mercyDelta?: number
  violenceDelta?: number
  stateChanges?: Record<string, any>
  gameOver?: string
  condition?: (gameState: any) => boolean
}

export interface GameScene {
  id: string
  type: "dialogue" | "battle" | "cutscene"
  background?: string
  text: string
  speaker?: string
  characters?: Array<Character & { position?: "left" | "center" | "right" }>
  choices?: Choice[]
  opponent?: Character
  battleOutcomes?: {
    victory?: string
    defeat?: string
    mercy?: string
    flee?: string
  }
  autoTransition?: Choice
  autoTransitionDelay?: number
}
