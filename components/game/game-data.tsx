import type { GameScene } from "@/components/game/types"

// Character definitions
export const characters = {
  demetrius: {
    id: "demetrius",
    name: "Demetrius",
    image: "/images/characters/Demetrius_concept_art_new.png",
    stats: {
      hp: 20,
      maxHp: 20,
      attack: 4,
      defense: 2,
    },
  },
  haikal: {
    id: "haikal",
    name: "Prince Haekal",
    image: "/images/characters/haikal_personnage_alone.png",
    stats: {
      hp: 15,
      maxHp: 15,
      attack: 3,
      defense: 2,
    },
  },
  milo: {
    id: "milo",
    name: "Commandant Milo",
    image: "/images/characters/commandant_milo.png",
    size: "normal" as const,
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
  rebel1: {
    id: "rebel1",
    name: "Rebel 1",
    image: "/images/characters/imperial_guard.png",
    stats: {
      hp: 10,
      maxHp: 10,
      attack: 2,
      defense: 1,
    },
  },
  rebel2: {
    id: "rebel2",
    name: "Rebel 2",
    image: "/images/characters/imperial_guard.png",
    stats: {
      hp: 10,
      maxHp: 10,
      attack: 2,
      defense: 1,
    },
  },
}

// Game scenes
// Corrige toutes les scènes de bataille pour utiliser une image existante
export const gameScenes: GameScene[] = [
  // Chapitre 1: Introduction et enlèvement de Demetrius
  {
    id: "intro",
    type: "dialogue",
    background: "/images/title/titletitre.png",
    text: "Dans un monde médiéval aux touches du début du XXe siècle, l'Empire Yirie règne d'une main de fer. Vous êtes Demetrius, un fermier qui mène une vie paisible avec sa communauté et sa famille dans un village inspiré des paysages méditerranéens.",
    choices: [{ text: "Continue", nextScene: "intro_2" }],
  },
  {
    id: "intro_2",
    type: "dialogue",
    background: "/images/title/background.png",
    text: "Cette tranquillité est brutalement détruite lorsque les troupes de l'Empire Yirie attaquent votre village, brûlent les champs et massacrent votre famille sous vos yeux.",
    choices: [{ text: "Continue", nextScene: "tutorial" }],
  },
  {
    id: "tutorial",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "Vous tentez désespérément de sauver les habitants de votre village, mais la puissance militaire de l'Empire est écrasante. Malgré vos efforts courageux, vous êtes finalement capturé.",
    characters: [{ ...characters.demetrius, position: "center" }],
    choices: [{ text: "Lutter jusqu'au bout", nextScene: "capture" }],
  },
  {
    id: "capture",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "Après une lutte acharnée, vous êtes finalement maîtrisé par les soldats impériaux. Tout devient noir...",
    characters: [{ ...characters.demetrius, position: "center" }],
    choices: [{ text: "...", nextScene: "labor_camp" }],
  },
  // Chapitre 2: Vie au camp de travail et rencontre avec Haekal
  {
    id: "labor_camp",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "Des années ont passé. Le camp de travail situé au nord des terres de l'Empire, dans une région froide et hostile, est brutal. Chaque jour apporte son lot de travail épuisant, de rations insuffisantes et de menaces constantes de punition.",
    characters: [{ ...characters.demetrius, position: "center" }],
    choices: [{ text: "Continue", nextScene: "labor_camp_2" }],
  },
  {
    id: "labor_camp_2",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Guard",
    text: "Prisonnier 120 ! Retourne au travail ! Le commandant Milo inspecte aujourd'hui, et il ne tolère pas les fainéants.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.guard, position: "right" },
    ],
    choices: [
      { text: "Obéir en silence", nextScene: "meet_haikal" },
      { text: "Défier du regard", nextScene: "meet_haikal" },
    ],
  },
  // Meet Haikal
  {
    id: "meet_haikal",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "As you work, you notice another prisoner watching you. He has blonde hair and carries himself with unusual dignity despite his ragged appearance.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "Ignore him", nextScene: "haikal_approaches" },
      { text: "Nod in acknowledgment", nextScene: "haikal_approaches" },
    ],
  },
  // Chapitre 3: La rébellion et l'évasion
  {
    id: "haikal_approaches",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Prisonnier Mystérieux",
    text: "Tu es différent des autres. Je t'observe depuis un moment. Tu n'as pas encore perdu espoir, n'est-ce pas ?",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: '"Qui es-tu ?"', nextScene: "haikal_reveals" },
      { text: '"Que veux-tu ?"', nextScene: "haikal_reveals" },
    ],
  },
  {
    id: "haikal_reveals",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haekal",
    text: "Je m'appelle Haekal. Avant l'invasion, j'étais le prince d'Ether. Maintenant je ne suis qu'un prisonnier, comme toi. Mais je n'ai pas abandonné. J'ai un plan pour nous évader.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Je t\'écoute.\"", nextScene: "escape_plan" },
      { text: "\"L\'évasion est impossible.\"", nextScene: "haikal_convinces" },
    ],
  },
  {
    id: "haikal_convinces",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haekal",
    text: "Rien n'est impossible. Je suis ici depuis plus longtemps que toi, j'ai étudié les gardes, leurs routines. Il y a un moyen de sortir, mais j'ai besoin de ton aide. Es-tu avec moi ?",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Je suis avec toi.\"", nextScene: "escape_plan" },
      { text: "\"C\'est trop risqué.\"", nextScene: "haikal_final_plea" },
    ],
  },
  {
    id: "haikal_final_plea",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haekal",
    text: "Préfères-tu mourir ici, lentement, jour après jour ? Ou tenter ta chance pour la liberté ? Pour venger ce qu'ils ont fait à ta famille ?",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Pour ma famille.\"", nextScene: "escape_plan" },
      { text: "\"Pour la liberté.\"", nextScene: "escape_plan" },
    ],
  },
  {
    id: "escape_plan",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    speaker: "Haekal",
    text: "Ce soir, pendant le changement de garde, il y aura un court moment où la porte est est moins surveillée. Nous devons créer une diversion.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Je vais déclencher un incendie.\"", nextScene: "escape_fire" },
      { text: "\"Je peux simuler une maladie.\"", nextScene: "escape_illness" },
    ],
  },
  {
    id: "escape_fire",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Tu rassembles des matériaux inflammables pendant la journée. Quand la nuit tombe, tu mets le feu à l'entrepôt. Les gardes se précipitent pour contenir l'incendie, laissant la porte est vulnérable.",
    choices: [{ text: "Continuer", nextScene: "guard_encounter" }],
  },
  {
    id: "escape_illness",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Tu simules une grave maladie, attirant les gardes vers les baraquements. Dans la confusion, Haekal crée une diversion secondaire, vous permettant tous les deux de vous glisser vers la porte est.",
    choices: [{ text: "Continuer", nextScene: "guard_encounter" }],
  },
  {
    id: "guard_encounter",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Alors que vous approchez de la porte, un garde solitaire vous repère. Il s'empare de son arme.",
    characters: [{ ...characters.guard, position: "center" }],
    choices: [
      { text: "Attaquer le garde", nextScene: "guard_battle" },
      { text: "Essayer de le raisonner", nextScene: "guard_reason" },
    ],
  },
  {
    id: "guard_battle",
    type: "battle",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Tu dois vaincre le garde pour poursuivre ton évasion !",
    opponent: characters.guard,
    battleOutcomes: {
      victory: "escape_success",
      defeat: "game_over_captured",
      mercy: "guard_spared",
      flee: "escape_failure",
    },
  },
  {
    id: "guard_reason",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    speaker: "Demetrius",
    text: "S'il vous plaît, nous ne voulons faire de mal à personne. Nous voulons juste notre liberté. Vous savez que les conditions ici ne sont pas justes.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.guard, position: "right" },
    ],
    choices: [
      { text: "Proposer de l'emmener avec vous", nextScene: "guard_convinced" },
      { text: "Le menacer discrètement", nextScene: "guard_threatened" },
    ],
  },
  {
    id: "guard_convinced",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: 'Le garde hésite, puis baisse son arme. "J\'ai de la famille à Ether. Je n\'ai jamais voulu cette affectation. Partez, vite, avant que d\'autres n\'arrivent."',
    choices: [{ text: "Le remercier et partir", nextScene: "escape_success" }],
  },
  {
    id: "guard_threatened",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: '"Faites un bruit et ce sera votre dernier," chuchotes-tu. Le garde, voyant la détermination dans tes yeux, s\'écarte silencieusement.',
    choices: [{ text: "Continuer", nextScene: "escape_success" }],
  },
  {
    id: "guard_spared",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Tu maîtrises le garde mais choisis de ne pas le tuer. Tu le ligotes et le bâillonnes à la place.",
    choices: [{ text: "Continuer", nextScene: "escape_success" }],
  },
  {
    id: "escape_success",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Toi et Haekal vous glissez à travers la porte et disparaissez dans l'obscurité. Le goût de la liberté est doux, mais vous savez que l'Empire ne vous laissera pas partir facilement.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "Continuer", nextScene: "forest_hideout" }],
  },
  {
    id: "escape_failure",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Votre tentative de fuite alerte d'autres gardes. Bientôt, vous êtes encerclés par les soldats impériaux.",
    choices: [
      { text: "Se rendre", nextScene: "game_over_captured" },
      { text: "Combattre jusqu'à la mort", nextScene: "game_over_death" },
    ],
  },

  // Chapitre 4: Formation de la résistance
  {
    id: "forest_hideout",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Après plusieurs jours de marche à travers les montagnes, vous trouvez un abri dans une forêt dense. Haekal révèle qu'il connaît d'autres Ethians cachés dans cette région.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "Continuer", nextScene: "resistance_meeting" }],
  },
  {
    id: "resistance_meeting",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Haekal",
    text: "Ces gens ont perdu leurs maisons, leurs familles. Ils se cachent, mais ils n'ont pas perdu espoir. Avec un leader, ils pourraient former une résistance efficace contre l'Empire.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
      { ...characters.rebel1, position: "center" },
      { ...characters.rebel2, position: "center" },
    ],
    choices: [
      { text: "\"Je ne suis pas un leader.\"", nextScene: "haikal_encourages" },
      { text: "\"Je suis prêt à les guider.\"", nextScene: "form_resistance" },
    ],
  },
  {
    id: "haikal_encourages",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Haekal",
    text: "Tu as survécu au camp. Tu as montré du courage et de la détermination. Ces gens ont besoin de quelqu'un comme toi, Demetrius. Je peux t'aider, mais c'est ta destinée de les mener.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Pour la liberté d'Ether.\"", nextScene: "form_resistance" },
      { text: "\"Je ferai de mon mieux.\"", nextScene: "form_resistance" },
    ],
  },
  {
    id: "form_resistance",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Au cours des semaines suivantes, vous organisez les réfugiés en une force structurée. Vous établissez un camp de base caché, entraînez les volontaires, et commencez à mener des raids contre les convois impériaux.",
    choices: [{ text: "Continuer", nextScene: "resistance_grows" }],
  },
  {
    id: "resistance_grows",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Votre réputation grandit. \"Les Ethians Libres\", comme vous vous appelez maintenant, inspirent l'espoir. De plus en plus de personnes rejoignent votre cause. L'Empire commence à prendre votre groupe au sérieux.",
    choices: [{ text: "Continuer", nextScene: "imperial_response" }],
  },
  {
    id: "imperial_response",
    type: "dialogue",
    background: "/images/environement/ville_detheria_plaza.jpg",
    speaker: "Messager rebelle",
    text: "Demetrius ! L'Empire a envoyé un commandant spécial pour nous écraser. Il a déjà attaqué trois de nos avant-postes. Son nom est Milo, et il est impitoyable.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.rebel1, position: "right" },
    ],
    choices: [
      { text: "\"Nous devons frapper avant lui.\"", nextScene: "plan_ambush" },
      { text: "\"Renforçons nos défenses.\"", nextScene: "strengthen_defenses" },
    ],
  },
  {
    id: "plan_ambush",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Si nous attendons, il détruira tous nos avant-postes un par un. Nous allons tendre une embuscade à sa prochaine cible et le surprendre avec toutes nos forces.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
      { ...characters.rebel1, position: "left" },
    ],
    choices: [{ text: "Préparer l'embuscade", nextScene: "milo_encounter" }],
  },
  {
    id: "strengthen_defenses",
    type: "dialogue",
    background: "/images/environement/ville_detheria_plaza.jpg",
    speaker: "Demetrius",
    text: "Nous ne pouvons pas risquer toutes nos forces. Consolidons notre camp principal et envoyons des renforts à nos avant-postes. Laissons Milo venir à nous.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
      { ...characters.rebel2, position: "left" },
    ],
    choices: [{ text: "Renforcer les défenses", nextScene: "milo_attacks" }],
  },

  // Chapitre 5: Duel contre Milo
  {
    id: "milo_encounter",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Votre embuscade est en place. Vous observez l'arrivée des forces impériales, et parmi elles, un homme au masque rouge et à l'armure noire. Milo.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "idle" },
      { ...characters.milo, position: "right", animation: "idle" },
    ],
    choices: [{ text: "Donner le signal d'attaque", nextScene: "milo_battle_begins" }],
  },
  {
    id: "milo_attacks",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Trois jours plus tard, vos sentinelles signalent l'approche de Milo. Vos défenses sont prêtes, mais il attaque avec une force plus importante que prévue. Le combat est inévitable.",
    choices: [{ text: "Mener la défense", nextScene: "milo_battle_begins" }],
  },
  {
    id: "milo_battle_begins",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Milo",
    text: "Alors c'est toi, Demetrius, le soi-disant 'Chef des Ethians'. J'ai entendu parler de toi. Un esclave qui pense pouvoir défier l'Empire. Amusant.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "idle" },
      { ...characters.milo, position: "right", animation: "idle" },
    ],
    choices: [
      { text: "\"Je ne suis pas esclave, et Ether sera libre.\"", nextScene: "milo_taunts" },
      { text: "Attaquer sans discuter", nextScene: "milo_battle" },
    ],
  },
  {
    id: "milo_taunts",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Milo",
    text: "De belles paroles. Mais ce sont les actions qui comptent. Voyons ce que tu vaux vraiment, rebelle. Je vais t'offrir un honneur que peu ont reçu : mourir de ma main.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "idle" },
      { ...characters.milo, position: "right", animation: "idle" },
    ],
    choices: [{ text: "Se préparer au combat", nextScene: "milo_battle" }],
  },
  {
    id: "milo_battle",
    type: "battle",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Milo est un adversaire redoutable. Son expertise au combat est légendaire. Le sort des Ethians Libres dépend de l'issue de ce duel !",
    opponent: characters.milo,
    battleOutcomes: {
      victory: "milo_defeated",
      defeat: "game_over_milo",
      mercy: "milo_spared",
      flee: "milo_escape",
    },
  },
  {
    id: "milo_defeated",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Dans un effort surhumain, tu parviens à vaincre Milo. Il s'effondre à genoux, son masque rouge brisé révélant son visage.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "victory" },
      { ...characters.milo, position: "right", animation: "defeat" },
    ],
    choices: [
      { text: "L'achever", nextScene: "milo_killed" },
      { text: "L'épargner", nextScene: "milo_spared" },
    ],
  },
  {
    id: "milo_killed",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Tu plonges ton arme dans le cœur de Milo. \"Pour Ether,\" murmures-tu. Autour de vous, les soldats impériaux battent en retraite, choqués par la défaite de leur commandant.",
    choices: [{ text: "Continuer", nextScene: "after_milo_victory" }],
  },
  {
    id: "milo_spared",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Je ne suis pas comme toi. Je ne tue pas un homme désarmé. Ta défaite sera connue dans tout l'Empire, et elle inspirera d'autres à nous rejoindre.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.milo, position: "right", animation: "hurt" },
    ],
    choices: [
      { text: "Le capturer", nextScene: "milo_prisoner" },
      { text: "Le laisser partir avec un message", nextScene: "milo_message" },
    ],
  },
  {
    id: "milo_prisoner",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Milo devient votre prisonnier. Sa capture est un coup dur pour l'Empire et renforce la réputation des Ethians Libres. Mais vous savez que l'Empire ne vous laissera pas partir facilement.",
    choices: [{ text: "Continuer", nextScene: "after_milo_victory" }],
  },
  {
    id: "milo_message",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Retourne vers ton maître. Dis-lui que les Ethians ne seront pas asservis. Dis-lui que son règne de terreur prendra fin. Et la prochaine fois qu'il enverra quelqu'un, qu'il choisisse mieux.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.milo, position: "right", animation: "hurt" },
    ],
    choices: [{ text: "Le laisser partir", nextScene: "after_milo_victory" }],
  },
  {
    id: "milo_escape",
    type: "dialogue",
    background: "/images/environement/key_frame_forest_escape.png",
    text: "Tu réalises que Milo est trop fort. Dans un moment de lucidité, tu ordonnes à tes forces de battre en retraite. Vous disparaissez dans la forêt, poursuivis par les soldats impériaux.",
    choices: [{ text: "Continuer", nextScene: "regroup_after_milo" }],
  },
  {
    id: "regroup_after_milo",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Les pertes sont lourdes, mais la plupart de tes forces ont survécu. De retour au camp, vous planifiez votre prochaine action. Milo sera plus vigilant maintenant.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "Continuer", nextScene: "imperial_escalation" }],
  },
  {
    id: "after_milo_victory",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "La victoire contre Milo change tout. De nouveaux alliés rejoignent votre cause, et les villages proches commencent à vous soutenir ouvertement. Mais l'Empire ne restera pas les bras croisés.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
      { ...characters.rebel1, position: "left" },
    ],
    choices: [{ text: "Continuer", nextScene: "imperial_escalation" }],
  },

  // Chapitre 6: L'arrivée de Hadès
  {
    id: "imperial_escalation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Un mois après votre victoire sur Milo, un messager arrive en courant au camp, l'air terrifié.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.rebel2, position: "right" },
    ],
    choices: [{ text: "Entendre son message", nextScene: "hades_arrival_warning" }],
  },
  {
    id: "hades_arrival_warning",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Messager",
    text: "Demetrius ! L'Empereur a envoyé son bras droit... Hadès en personne vient pour vous. Ses troupes marchent sur nous, brûlant tout sur leur passage. Les villages qui nous soutenaient... ils sont... ils sont tous...",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.rebel2, position: "right" },
    ],
    choices: [
      { text: "\"Combien de temps avons-nous ?\"", nextScene: "prepare_for_hades" },
      { text: "\"Nous devons évacuer.\"", nextScene: "prepare_for_hades" },
    ],
  },
  {
    id: "prepare_for_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Haekal",
    text: "Hadès est le plus redoutable guerrier de l'Empire. On dit qu'il a détruit des villes entières à lui seul. Si nous fuyons, il nous pourchassera sans relâche. Si nous restons, il nous écrasera.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "\"Je l'affronterai seul.\"", nextScene: "plan_confront_hades" },
      { text: "\"Nous devons élaborer un piège.\"", nextScene: "plan_trap_hades" },
    ],
  },
  {
    id: "plan_confront_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Je ne risquerai pas d'autres vies. C'est moi qu'il veut. J'irai à sa rencontre avant qu'il n'atteigne notre camp. Si je le vaincs, l'Empire sera ébranlé. Si j'échoue... vous aurez le temps de fuir.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [
      { text: "Se préparer pour le duel", nextScene: "hades_confrontation" },
    ],
  },
  {
    id: "plan_trap_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Même Hadès a des faiblesses. Nous allons préparer un terrain à notre avantage. Des pièges, des positions élevées pour nos archers, tout ce qui pourra réduire sa puissance.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
      { ...characters.rebel1, position: "left" },
    ],
    choices: [
      { text: "Préparer le terrain", nextScene: "hades_trap_encounter" },
    ],
  },
  {
    id: "hades_confrontation",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Tu chevauches à la rencontre de l'armée impériale. Au loin, tu aperçois une silhouette imposante qui s'avance seule. Hadès, dans son armure noire ornée de symboles impériaux, son visage dissimulé par un masque qui ne révèle que ses yeux glacials.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "idle" },
      { ...characters.hades, position: "right", animation: "idle" },
    ],
    choices: [{ text: "Faire face à Hadès", nextScene: "hades_dialogue" }],
  },
  {
    id: "hades_trap_encounter",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Vos pièges sont en place. Les archers sont positionnés. Tout est prêt. Soudain, des explosions retentissent. Hadès apparaît, marchant calmement à travers les flammes, imperturbable malgré les flèches qui rebondissent sur son armure.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "idle" },
      { ...characters.hades, position: "right", animation: "idle" },
    ],
    choices: [{ text: "Donner l'ordre d'attaquer", nextScene: "hades_counters_trap" }],
  },
  {
    id: "hades_counters_trap",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "D'un geste de la main, Hadès déclenche une onde de choc qui renverse vos combattants. Vos pièges se retournent contre vous. Il continue d'avancer, implacable.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right", animation: "attack" },
    ],
    choices: [{ text: "L'affronter directement", nextScene: "hades_dialogue" }],
  },
  {
    id: "hades_dialogue",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Hadès",
    text: "Demetrius. L'esclave qui a osé devenir roi. Je dois admettre que tu m'as impressionné. Peu d'hommes ont défié l'Empire et vécu aussi longtemps.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [
      { text: "\"Je me bats pour la liberté, pas pour un titre.\"", nextScene: "hades_offers_deal" },
      { text: "\"Aujourd'hui, l'Empire connaîtra sa première défaite.\"", nextScene: "hades_laughs" },
    ],
  },
  {
    id: "hades_offers_deal",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Hadès",
    text: "La liberté ? Un concept surévalué. L'ordre est ce dont le monde a besoin. L'Empereur m'a autorisé à t'offrir un choix : rejoins-nous, deviens un gouverneur pour ton peuple sous notre autorité, et vos vies seront épargnées.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [
      { text: "\"Jamais je ne servirai votre tyran.\"", nextScene: "hades_battle" },
      { text: "Faire semblant d'accepter", nextScene: "false_surrender" },
    ],
  },
  {
    id: "hades_laughs",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Hadès",
    text: "Ta confiance est admirable, mais mal placée. J'ai détruit des armées entières, rasé des cités. Qu'es-tu face à cela ? Un insecte qui a eu de la chance jusqu'à présent.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [{ text: "Attaquer", nextScene: "hades_battle" }],
  },
  {
    id: "false_surrender",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Si je me rends... vous garantissez la sécurité de tous les Ethians qui m'ont suivi ?",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [
      { text: "\"Je dois réfléchir à votre offre...\"", nextScene: "surprise_attack" },
      { text: "Révéler le piège maintenant", nextScene: "surprise_attack" },
    ],
  },
  {
    id: "surprise_attack",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Profitant d'un moment où Hadès baisse sa garde, tu lances une attaque surprise, espérant prendre l'avantage. Il réagit avec une vitesse inhumaine, mais tu parviens à l'égratigner.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "attack" },
      { ...characters.hades, position: "right", animation: "hurt" },
    ],
    choices: [{ text: "Continuer le combat", nextScene: "hades_battle" }],
  },
  {
    id: "hades_battle",
    type: "battle",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Le combat final contre Hadès commence. La destinée d'Ether se joue maintenant. Toutes tes expériences, tes choix, t'ont préparé à ce moment.",
    opponent: characters.hades,
    battleOutcomes: {
      victory: "hades_defeated",
      defeat: "game_over_hades",
      mercy: "hades_spared",
      flee: "game_over_hades",
    },
  },

  // Chapitre 7-8: Fins multiples
  {
    id: "hades_defeated",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Dans un ultime effort, tu terrasses Hadès. Son masque se brise, révélant un visage marqué par d'anciennes cicatrices. L'armée impériale, voyant leur champion tomber, commence à se replier dans le désordre.",
    characters: [
      { ...characters.demetrius, position: "left", animation: "victory" },
      { ...characters.hades, position: "right", animation: "defeat" },
    ],
    choices: [
      { text: "Achever Hadès", nextScene: "hades_execution" },
      { text: "Épargner Hadès", nextScene: "hades_mercy" },
    ],
  },
  {
    id: "hades_execution",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Pour tous les Ethians que tu as massacrés. Pour les villages que tu as brûlés. Que la mort t'accueille, Hadès, serviteur de la tyrannie.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right", animation: "defeat" },
    ],
    choices: [{ text: "Continuer", nextScene: "ending_revolution" }],
  },
  {
    id: "hades_mercy",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Je ne deviendrai pas comme vous. La vengeance ne ramènera pas les morts. Tu seras jugé pour tes crimes, mais pas par moi.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right", animation: "defeat" },
    ],
    choices: [
      { text: "Le faire prisonnier", nextScene: "hades_prisoner" },
      { text: "Lui offrir une chance de rédemption", nextScene: "hades_redemption" },
    ],
  },
  {
    id: "hades_prisoner",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Hadès est enchaîné et ramené au camp comme prisonnier. Sa capture symbolise la chute imminente de l'Empire. De nombreux soldats impériaux désertent, rejoignant votre cause.",
    choices: [{ text: "Continuer", nextScene: "ending_diplomatic" }],
  },
  {
    id: "hades_redemption",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    speaker: "Demetrius",
    text: "Tu as le choix maintenant. Utilise tes talents pour réparer ce que tu as détruit. Aide-nous à bâtir un monde meilleur, pas à le détruire.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
    ],
    choices: [{ text: "Tendre la main à Hadès", nextScene: "hades_joins" }],
  },
  {
    id: "hades_joins",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Contre toute attente, Hadès saisit ta main. \"Pendant des années, j'ai servi sans questionner. Peut-être est-il temps de changer.\" Ce jour marque un tournant improbable dans la révolution.",
    choices: [{ text: "Continuer", nextScene: "ending_alliance" }],
  },
  {
    id: "game_over_hades",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Hadès est trop puissant. D'un coup dévastateur, il te terrasse. Alors que ta vision s'obscurcit, tu entends Hadès proclamer la fin de la rebellion d'Ether. Ton combat s'achève ici.",
    choices: [{ text: "FIN - Défaite", nextScene: "restart" }],
  },
  {
    id: "game_over_captured",
    type: "dialogue",
    background: "/images/environement/camp_du_travail_keyframe.jpg",
    text: "Tu es capturé et ramené au camp. Après un procès sommaire, tu es condamné à mort pour rébellion contre l'Empire. Ton nom sera oublié, ton combat perdu dans les sables du temps.",
    choices: [{ text: "FIN - Capturé", nextScene: "restart" }],
  },
  {
    id: "game_over_death",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Tu luttes jusqu'à ton dernier souffle, mais tu es submergé par le nombre. Alors que tu tombes, tu espères que d'autres reprendront le flambeau de la liberté pour Ether.",
    choices: [{ text: "FIN - Mort héroïque", nextScene: "restart" }],
  },
  {
    id: "game_over_milo",
    type: "dialogue",
    background: "/images/environement/key_frame_base_camp.jpg",
    text: "Milo te domine au combat. D'un coup précis, il met fin à tes jours. \"Un autre rebelle qui tombe,\" murmure-t-il. La résistance des Ethians s'éteint avec toi.",
    choices: [{ text: "FIN - Vaincu", nextScene: "restart" }],
  },
  
  // Fins différentes
  {
    id: "ending_revolution",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Avec la mort de Hadès, ton armée marche sur la capitale impériale. L'Empereur est renversé et exécuté. Tu diriges maintenant la révolution qui balaye le continent, libérant tous les peuples opprimés par l'Empire.",
    characters: [
      { ...characters.demetrius, position: "center", animation: "victory" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "FIN - Révolution Triomphante", nextScene: "restart" }],
  },
  {
    id: "ending_diplomatic",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Avec Hadès comme monnaie d'échange, tu négocies la paix avec l'Empire. Ether retrouve son indépendance, et un traité de non-agression est signé. La liberté est reconquise sans plus de sang versé.",
    characters: [
      { ...characters.demetrius, position: "center" },
      { ...characters.haikal, position: "right" },
    ],
    choices: [{ text: "FIN - Liberté Négociée", nextScene: "restart" }],
  },
  {
    id: "ending_alliance",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Grâce à ta clémence, une alliance improbable se forme. Hadès te rejoint pour réformer l'Empire de l'intérieur. Ensemble, vous créez une nouvelle ère de paix et de coopération entre tous les peuples.",
    characters: [
      { ...characters.demetrius, position: "left" },
      { ...characters.hades, position: "right" },
      { ...characters.haikal, position: "center" },
    ],
    choices: [{ text: "FIN - Alliance Inattendue", nextScene: "restart" }],
  },
  {
    id: "restart",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "The Ethians Redeemed - Merci d'avoir joué ! Voulez-vous recommencer pour découvrir d'autres fins possibles ?",
    choices: [
      { text: "Recommencer", nextScene: "intro" },
      { text: "Quitter", nextScene: "exit_game" },
    ],
  },
  {
    id: "exit_game",
    type: "dialogue",
    background: "/images/environement/gate_capital_yirie.png",
    text: "Merci d'avoir joué à The Ethians Redeemed!",
    choices: [],
  },
]
