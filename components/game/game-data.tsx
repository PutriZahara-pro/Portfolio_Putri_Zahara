import type { GameScene } from "@/components/game/types"

// Character definitions
export const characters = {
  demetreus: {
    id: "demetreus",
    name: "Demetreus",
    image: "/images/characters/Demetreus_concept_art_new.png",
    stats: {
      hp: 20,
      maxHp: 20,
      attack: 4,
      defense: 2,
    },
  },
  haikal: {
    id: "haikal",
    name: "Prince Haikal",
    image: "/images/characters/haikal_personnage_alone.png",
    stats: {
      hp: 15,
      maxHp: 15,
      attack: 3,
      defense: 1,
    },
  },
  milo: {
    id: "milo",
    name: "Commandant Milo",
    image: "/images/characters/commandant_milo.png",
    size: "normal",
    stats: {
      hp: 30,
      maxHp: 30,
      attack: 5,
      defense: 3,
    },
  },
  hades: {
    id: "hades",
    name: "Emperor Hades",
    image: "/images/characters/emepror_hades.png",
    stats: {
      hp: 50,
      maxHp: 50,
      attack: 8,
      defense: 5,
    },
  },
  ellis: {
    id: "ellis",
    name: "Queen Ellis",
    image: "/images/characters/ellis_queen.png",
    stats: {
      hp: 40,
      maxHp: 40,
      attack: 6,
      defense: 4,
    },
  },
  guard: {
    id: "guard",
    name: "Imperial Guard",
    image: "/images/characters/imperial_guard.png",
    stats: {
      hp: 15,
      maxHp: 15,
      attack: 3,
      defense: 2,
    },
  },
}

// Game scenes
export const gameScenes: GameScene[] = [
  // Introduction
  {
    id: "intro",
    type: "dialogue",
    background: "/images/title/titletitre.png",
    text: "In a world where the Empire Yirie rules with an iron fist, you are Demetreus, a farmer whose life was shattered when imperial forces invaded your homeland.",
    choices: [{ text: "Continue", nextScene: "intro_2" }],
  },
  {
    id: "intro_2",
    type: "dialogue",
    background: "/images/title/background.png",
    text: "Your family was killed, your home burned to the ground, and you were taken as a slave to work in one of the Empire's labor camps.",
    choices: [{ text: "Continue", nextScene: "labor_camp" }],
  },

  // Labor Camp
  {
    id: "labor_camp",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "Years have passed. The labor camp is brutal. Every day is filled with backbreaking work, meager rations, and the constant threat of punishment.",
    characters: [{ ...characters.demetreus, position: "center" }],
    choices: [{ text: "Continue", nextScene: "labor_camp_2" }],
  },
  {
    id: "labor_camp_2",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Guard",
    text: "Prisoner 120! Get back to work! The commandant is inspecting today, and he doesn't tolerate slackers.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.guard, position: "right" },
    ],
    choices: [
      { text: "Obey silently", nextScene: "meet_haikal", mercyDelta: 1 },
      { text: "Glare defiantly", nextScene: "meet_haikal", violenceDelta: 1 },
    ],
  },

  // Meet Haikal
  {
    id: "meet_haikal",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "As you work, you notice another prisoner watching you. He has blonde hair and carries himself with unusual dignity despite his ragged appearance.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "Ignore him", nextScene: "haikal_approaches" },
      { text: "Nod in acknowledgment", nextScene: "haikal_approaches", mercyDelta: 1 },
    ],
  },
  {
    id: "haikal_approaches",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Mysterious Prisoner",
    text: "You're different from the others. I've been watching you. You haven't given up hope yet, have you?",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"Who are you?"', nextScene: "haikal_reveals", stateChanges: { hasMetHaikal: true } },
      { text: '"What do you want?"', nextScene: "haikal_reveals", stateChanges: { hasMetHaikal: true } },
    ],
  },
  {
    id: "haikal_reveals",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haikal",
    text: "My name is Haikal. Before the invasion, I was the prince of Ether. Now I'm just another prisoner, like you. But I haven't given up. I have a plan to escape.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"I\'m listening."', nextScene: "escape_plan" },
      { text: '"Escape is impossible."', nextScene: "haikal_convinces" },
    ],
  },
  {
    id: "haikal_convinces",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haikal",
    text: "Nothing is impossible. I've been here longer than you, studying the guards, the routines. There's a way out, but I need your help. Are you with me?",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"I\'m with you."', nextScene: "escape_plan" },
      { text: '"It\'s too risky."', nextScene: "haikal_final_plea" },
    ],
  },
  {
    id: "haikal_final_plea",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haikal",
    text: "Would you rather die here, slowly, day by day? Or take a chance at freedom? At revenge for what they did to your family?",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"For my family."', nextScene: "escape_plan", violenceDelta: 1 },
      { text: '"For freedom."', nextScene: "escape_plan", mercyDelta: 1 },
    ],
  },

  // Escape Plan
  {
    id: "escape_plan",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haikal",
    text: "Tonight, during the shift change, there will be a brief window when the eastern gate is less guarded. We'll need to create a distraction.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"I\'ll start a fire."', nextScene: "escape_fire", violenceDelta: 2 },
      { text: '"I can fake an illness."', nextScene: "escape_illness", mercyDelta: 2 },
    ],
  },

  // Escape Routes
  {
    id: "escape_fire",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "You gather flammable materials throughout the day. When night falls, you set fire to the storage shed. Guards rush to contain the blaze, leaving the eastern gate vulnerable.",
    choices: [{ text: "Continue", nextScene: "guard_encounter" }],
  },
  {
    id: "escape_illness",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "You fake a severe illness, drawing guards to the barracks. In the confusion, Haikal creates a secondary distraction, allowing you both to slip away toward the eastern gate.",
    choices: [{ text: "Continue", nextScene: "guard_encounter" }],
  },

  // Guard Encounter
  {
    id: "guard_encounter",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "As you approach the gate, a lone guard spots you. He reaches for his weapon.",
    characters: [{ ...characters.guard, position: "center" }],
    choices: [
      { text: "Attack the guard", nextScene: "guard_battle", violenceDelta: 1 },
      { text: "Try to reason with him", nextScene: "guard_reason", mercyDelta: 1 },
    ],
  },

  // Guard Battle
  {
    id: "guard_battle",
    type: "battle",
    background: "/images/environement/gate_capital_yirie.png",
    text: "You must defeat the guard to continue your escape!",
    opponent: characters.guard,
    battleOutcomes: {
      victory: "escape_success",
      defeat: "game_over_captured",
      mercy: "guard_spared",
      flee: "escape_failure",
    },
  },

  // Guard Reasoning
  {
    id: "guard_reason",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    speaker: "Demetreus",
    text: "Please, we mean no harm. We just want our freedom. You know the conditions here aren't right.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.guard, position: "right" },
    ],
    choices: [
      { text: "Offer to take him with you", nextScene: "guard_convinced", mercyDelta: 2 },
      { text: "Threaten him quietly", nextScene: "guard_threatened", violenceDelta: 2 },
    ],
  },

  // Guard Outcomes
  {
    id: "guard_convinced",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: 'The guard hesitates, then lowers his weapon. "I have family in Ether. I never wanted this assignment. Go, quickly, before others come."',
    choices: [{ text: "Thank him and leave", nextScene: "escape_success", mercyDelta: 2 }],
  },
  {
    id: "guard_threatened",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: '"Make a sound and it will be your last," you whisper. The guard, seeing the determination in your eyes, steps aside silently.',
    choices: [{ text: "Continue", nextScene: "escape_success" }],
  },
  {
    id: "guard_spared",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "You overpower the guard but choose not to kill him. You tie him up and gag him instead.",
    choices: [{ text: "Continue", nextScene: "escape_success", mercyDelta: 3 }],
  },

  // Escape Outcomes
  {
    id: "escape_success",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You and Haikal slip through the gate and into the darkness beyond. The taste of freedom is sweet, but you know the Empire won't let you go easily.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "Continue", nextScene: "forest_hideout" }],
  },
  {
    id: "escape_failure",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Your attempt to flee from the guard alerts others. Soon you're surrounded by imperial soldiers.",
    choices: [
      { text: "Surrender", nextScene: "game_over_captured" },
      { text: "Fight to the death", nextScene: "game_over_death", violenceDelta: 3 },
    ],
  },

  // Forest Hideout
  {
    id: "forest_hideout",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Haikal",
    text: "We need to establish a base in the forest. From there, we can start building a resistance against the Empire.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"I want revenge for my family."', nextScene: "revenge_path", violenceDelta: 2 },
      { text: '"I want to free other slaves."', nextScene: "freedom_path", mercyDelta: 2 },
    ],
  },

  // Path Choices
  {
    id: "revenge_path",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetreus",
    text: "The Empire took everything from me. I won't rest until Commandant Milo and Emperor Hades pay for what they've done.",
    characters: [{ ...characters.demetreus, position: "center" }],
    choices: [{ text: "Continue", nextScene: "time_passes_revenge" }],
  },
  {
    id: "freedom_path",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetreus",
    text: "There are thousands still suffering in those camps. We need to build a movement that can free them all.",
    characters: [{ ...characters.demetreus, position: "center" }],
    choices: [{ text: "Continue", nextScene: "time_passes_freedom" }],
  },

  // Time Passes
  {
    id: "time_passes_revenge",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Months pass. Your resistance grows stronger. You raid imperial outposts, gathering weapons and supplies. Your name becomes feared among imperial forces.",
    choices: [{ text: "Continue", nextScene: "milo_confrontation" }],
  },
  {
    id: "time_passes_freedom",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Months pass. Your resistance grows. You focus on freeing slaves and building a community in the forest. Word of your deeds spreads, giving hope to the oppressed.",
    choices: [{ text: "Continue", nextScene: "milo_confrontation" }],
  },

  // Milo Confrontation
  {
    id: "milo_confrontation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Your actions have drawn the attention of Commandant Milo. He leads a force to crush your resistance once and for all.",
    characters: [{ ...characters.milo, position: "center" }],
    choices: [
      { text: "Ambush his forces", nextScene: "milo_battle", violenceDelta: 2 },
      { text: "Evacuate the camp", nextScene: "camp_evacuation", mercyDelta: 2 },
    ],
  },

  // Milo Battle
  {
    id: "milo_battle",
    type: "battle",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You face Commandant Milo in battle. This is your chance for revenge!",
    opponent: characters.milo,
    battleOutcomes: {
      victory: "milo_defeated",
      defeat: "game_over_milo",
      mercy: "milo_spared",
      flee: "milo_retreat",
    },
  },

  // Camp Evacuation
  {
    id: "camp_evacuation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You prioritize the safety of your people, evacuating the camp before Milo's forces arrive. You leave traps and false trails to slow them down.",
    choices: [{ text: "Continue", nextScene: "vulkan_kingdom" }],
  },

  // Milo Outcomes
  {
    id: "milo_defeated",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Commandant Milo falls before you. The man who oversaw so much suffering is finally defeated. His forces retreat in disarray.",
    characters: [{ ...characters.demetreus, position: "center" }],
    choices: [
      { text: '"This is just the beginning."', nextScene: "hades_offer", stateChanges: { defeatedMilo: true } },
    ],
  },
  {
    id: "milo_spared",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: 'You defeat Milo but spare his life. "Tell your emperor that we want peace, but we will fight for our freedom if we must."',
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.milo, position: "right" },
    ],
    choices: [{ text: "Continue", nextScene: "hades_offer", stateChanges: { defeatedMilo: true } }],
  },
  {
    id: "milo_retreat",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You're forced to retreat from Milo's superior forces. Your resistance scatters but survives to fight another day.",
    choices: [{ text: "Continue", nextScene: "vulkan_kingdom" }],
  },

  // Hades Offer
  {
    id: "hades_offer",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Imperial Messenger",
    text: "Emperor Hades has taken notice of your... abilities. He offers you a position of nobility within the Empire if you end your resistance.",
    characters: [{ ...characters.guard, position: "center" }],
    choices: [
      { text: "Accept the offer", nextScene: "accept_hades", violenceDelta: -2, mercyDelta: -2 },
      { text: "Refuse the offer", nextScene: "refuse_hades", mercyDelta: 1 },
    ],
  },

  // Hades Offer Outcomes
  {
    id: "accept_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You accept Hades' offer, thinking you can change the system from within. Haikal and your followers feel betrayed.",
    choices: [{ text: "Continue", nextScene: "betrayal_confrontation" }],
  },
  {
    id: "refuse_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetreus",
    text: "Tell your emperor that freedom cannot be bought. We will continue our fight until all slaves are freed and the Empire's tyranny ends.",
    choices: [{ text: "Continue", nextScene: "vulkan_kingdom" }],
  },

  // Betrayal Confrontation
  {
    id: "betrayal_confrontation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Haikal",
    text: "How could you? After everything we've been through, everything we've fought for... you've betrayed us all for a title?",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"I can do more good from inside."', nextScene: "haikal_battle" },
      { text: '"Power was always my goal."', nextScene: "haikal_battle", violenceDelta: 3 },
    ],
  },

  // Haikal Battle
  {
    id: "haikal_battle",
    type: "battle",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Haikal draws his weapon. Your former friend now stands against you.",
    opponent: characters.haikal,
    battleOutcomes: {
      victory: "ending_betrayer",
      defeat: "ending_redeemed",
      mercy: "ending_redeemed",
      flee: "ending_exile",
    },
  },

  // Vulkan Kingdom
  {
    id: "vulkan_kingdom",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "With your resistance growing, you seek an alliance with the Kingdom of Vulkan, one of the few nations still independent from the Empire.",
    choices: [{ text: "Continue", nextScene: "meet_ellis" }],
  },

  // Meet Queen Ellis
  {
    id: "meet_ellis",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Queen Ellis",
    text: "So you are the rebel leader I've heard so much about. Why should Vulkan risk war with the Empire for your cause?",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.ellis, position: "right" },
    ],
    choices: [
      { text: '"The Empire will target you next."', nextScene: "ellis_test", violenceDelta: 1 },
      { text: '"For justice and freedom."', nextScene: "ellis_test", mercyDelta: 1 },
    ],
  },

  // Ellis Test
  {
    id: "ellis_test",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Queen Ellis",
    text: "Words are easy. Before I commit my kingdom to your cause, you must prove your worth. There is a sacred artifact stolen by imperial forces. Retrieve it.",
    characters: [{ ...characters.ellis, position: "center" }],
    choices: [{ text: "Accept the mission", nextScene: "final_mission" }],
  },

  // Final Mission
  {
    id: "final_mission",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You infiltrate an imperial fortress where the artifact is kept. As you reach the inner chamber, you find Emperor Hades himself examining the artifact.",
    characters: [{ ...characters.hades, position: "center" }],
    choices: [
      { text: "Attack Hades", nextScene: "hades_battle", violenceDelta: 2 },
      { text: "Try to negotiate", nextScene: "hades_negotiation", mercyDelta: 2 },
    ],
  },

  // Hades Confrontation
  {
    id: "hades_battle",
    type: "battle",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You face Emperor Hades in battle. This is the moment you've been waiting for.",
    opponent: characters.hades,
    battleOutcomes: {
      victory: "ending_victorious",
      defeat: "game_over_hades",
      mercy: "ending_peace",
      flee: "ending_continue_fight",
    },
  },
  {
    id: "hades_negotiation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetreus",
    text: "Emperor Hades, this conflict has caused enough suffering. There can be peace between our peoples, but only if you end the slavery and oppression.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [{ text: "Continue", nextScene: "hades_response" }],
  },
  {
    id: "hades_response",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Emperor Hades",
    text: "Peace? The Empire needs resources, labor. Your idealism is admirable but naive. The strong rule, the weak serve. That is the natural order.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [
      { text: '"Then we have nothing more to discuss."', nextScene: "hades_battle" },
      { text: '"There is another way."', nextScene: "hades_alternative", mercyDelta: 3 },
    ],
  },
  {
    id: "hades_alternative",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetreus",
    text: "The Kingdom of Vulkan has agricultural techniques that could triple your food production. An alliance would benefit both our peoples more than war ever could.",
    characters: [
      { ...characters.demetreus, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [{ text: "Continue", nextScene: "ending_diplomatic" }],
  },

  // Endings
  {
    id: "ending_betrayer",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You defeat Haikal and fully embrace your position in the Empire. Over time, you rise through the ranks, eventually becoming Hades' right hand. You implement some reforms, but the system remains largely unchanged. You have power, but at what cost?",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "betrayer" }],
  },
  {
    id: "ending_redeemed",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "In the battle with Haikal, you realize the error of your ways. You fake your own death and return to the resistance, though many still distrust you. You spend the rest of your days working to redeem yourself by helping former slaves build new lives.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "redeemed" }],
  },
  {
    id: "ending_exile",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Unable to defeat Haikal or face the consequences of your betrayal, you flee. You live out your days in exile, haunted by your choices and the movement you abandoned.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "exile" }],
  },
  {
    id: "ending_victorious",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "With Emperor Hades defeated, the Empire falls into chaos. With the support of Queen Ellis and the Kingdom of Vulkan, your resistance establishes a new republic. The road ahead is difficult, but for the first time in generations, the people are free.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "victorious" }],
  },
  {
    id: "ending_peace",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You defeat Hades but spare his life, showing that your way is different from the Empire's cruelty. This act of mercy, combined with your strength, earns his respect. A peace treaty is negotiated, ending slavery and establishing new borders.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "peace" }],
  },
  {
    id: "ending_continue_fight",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Though you fail to defeat Hades, you escape with the artifact. Queen Ellis honors her promise, and with Vulkan's support, the resistance grows stronger. The war continues, but now the Empire faces a true challenge to its power.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "continue_fight" }],
  },
  {
    id: "ending_diplomatic",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Against all odds, your diplomatic solution works. Emperor Hades, pragmatic above all, sees the value in your proposal. A historic alliance is formed between the Empire, Vulkan, and the former slaves. It's an uneasy peace, but one that brings prosperity to all.",
    choices: [{ text: "The End", nextScene: "intro", gameOver: "diplomatic" }],
  },

  // Game Over Screens
  {
    id: "game_over_captured",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You are captured and returned to the labor camp. The punishment is severe, and your spirit finally breaks. You spend the rest of your days in chains, your dreams of freedom forgotten.",
    choices: [{ text: "Game Over", nextScene: "intro", gameOver: "captured" }],
  },
  {
    id: "game_over_death",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "You fight bravely but are overwhelmed by the imperial guards. Your rebellion ends before it truly began, your body left as a warning to others who might defy the Empire.",
    choices: [{ text: "Game Over", nextScene: "intro", gameOver: "death" }],
  },
  {
    id: "game_over_milo",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Commandant Milo proves too strong. As you fall, he laughs at your futile resistance. Your followers are hunted down and executed or returned to slavery.",
    choices: [{ text: "Game Over", nextScene: "intro", gameOver: "milo_victory" }],
  },
  {
    id: "game_over_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: 'Emperor Hades defeats you easily. "Did you really think you could challenge me?" he mocks as darkness closes in. Your rebellion becomes just another footnote in the Empire\'s long history.',
    choices: [{ text: "Game Over", nextScene: "intro", gameOver: "hades_victory" }],
  },
]
