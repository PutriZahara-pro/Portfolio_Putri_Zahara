// Translations for the game content
export type Language = "fr" | "en";

// Type definition for our translations
interface GameTranslations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

// Scenes that need to be translated
export const sceneTranslations: GameTranslations = {
  // Intro
  "intro.text": {
    fr: "Dans l'ancien royaume d'Ether, un jeune homme comme les autres vivait paisiblement avec sa famille dans un village prospère...",
    en: "In the ancient kingdom of Ether, an ordinary young man lived peacefully with his family in a prosperous village..."
  },
  "intro.choices.start": {
    fr: "Commencer",
    en: "Start"
  },

  // Tutorial scenes
  "tutorial.text": {
    fr: "Bienvenue dans The Ethians Redeemed. Dans ce jeu, tu incarnes Demetrius, un jeune homme dont la vie est bouleversée par l'invasion impériale. Tes choix détermineront son destin et celui du royaume d'Ether.",
    en: "Welcome to The Ethians Redeemed. In this game, you play as Demetrius, a young man whose life is upended by the imperial invasion. Your choices will determine his fate and that of the kingdom of Ether."
  },
  "tutorial.choices.continue": {
    fr: "Continuer",
    en: "Continue"
  },
  "tutorial_combat.text": {
    fr: "Les combats sont au tour par tour. Tu peux attaquer, te défendre, ou tenter de faire preuve de clémence. Tes choix en combat influenceront ton histoire.",
    en: "Combat is turn-based. You can attack, defend, or try to show mercy. Your choices in battle will influence your story."
  },
  "tutorial_combat.choices.continue": {
    fr: "Compris",
    en: "Understood"
  },
  
  // Chapter 1
  "village_attack.text": {
    fr: "Un matin comme les autres, alors que tu aides ta famille à la ferme, le ciel s'assombrit. Des cavaliers impériaux apparaissent à l'horizon, brandissant des torches et des armes.",
    en: "On an ordinary morning, as you help your family on the farm, the sky darkens. Imperial riders appear on the horizon, brandishing torches and weapons."
  },
  "village_attack.choices.fight": {
    fr: "Saisir une arme et combattre",
    en: "Grab a weapon and fight"
  },
  "village_attack.choices.hide": {
    fr: "Se cacher et survivre",
    en: "Hide and survive"
  },

  // Endings
  "ending_revolution.text": {
    fr: "Avec la mort de Hadès, ton armée marche sur la capitale impériale. L'Empereur est renversé et exécuté. Tu diriges maintenant la révolution qui balaye le continent, libérant tous les peuples opprimés par l'Empire.",
    en: "With the death of Hades, your army marches on the imperial capital. The Emperor is overthrown and executed. You now lead the revolution sweeping the continent, liberating all peoples oppressed by the Empire."
  },
  "ending_diplomatic.text": {
    fr: "Avec Hadès comme monnaie d'échange, tu négocies la paix avec l'Empire. Ether retrouve son indépendance, et un traité de non-agression est signé. La liberté est reconquise sans plus de sang versé.",
    en: "With Hades as a bargaining chip, you negotiate peace with the Empire. Ether regains its independence, and a non-aggression treaty is signed. Freedom is reconquered without further bloodshed."
  },
  "ending_alliance.text": {
    fr: "Grâce à ta clémence, une alliance improbable se forme. Hadès te rejoint pour réformer l'Empire de l'intérieur. Ensemble, vous créez une nouvelle ère de paix et de coopération entre tous les peuples.",
    en: "Thanks to your mercy, an unlikely alliance forms. Hades joins you to reform the Empire from within. Together, you create a new era of peace and cooperation among all peoples."
  },

  // Game over and restart
  "restart.text": {
    fr: "The Ethians Redeemed - Merci d'avoir joué ! Voulez-vous recommencer pour découvrir d'autres fins possibles ?",
    en: "The Ethians Redeemed - Thanks for playing! Would you like to start over to discover other possible endings?"
  },
  "restart.choices.restart": {
    fr: "Recommencer",
    en: "Restart"
  },
  "restart.choices.quit": {
    fr: "Quitter",
    en: "Quit"
  },
  "exit_game.text": {
    fr: "Merci d'avoir joué à The Ethians Redeemed!",
    en: "Thank you for playing The Ethians Redeemed!"
  },
};

// Names and titles
export const characterTranslations: GameTranslations = {
  "character.dimitreus": {
    fr: "Demetrius",
    en: "Demetrius"
  },
  "character.haikal": {
    fr: "Prince Haekal",
    en: "Prince Haekal"
  },
  "character.milo": {
    fr: "Commandant Milo",
    en: "Commander Milo"
  },
  "character.hades": {
    fr: "Hadès",
    en: "Hades"
  },
  "character.guard": {
    fr: "Garde Impérial",
    en: "Imperial Guard"
  },
  "character.rebel1": {
    fr: "Rebelle",
    en: "Rebel"
  },
  "character.rebel2": {
    fr: "Messager Rebelle",
    en: "Rebel Messenger"
  },
};

// UI elements
export const uiTranslations: GameTranslations = {
  "ui.attack": {
    fr: "Attaquer",
    en: "Attack"
  },
  "ui.defend": {
    fr: "Défendre",
    en: "Defend"
  },
  "ui.mercy": {
    fr: "Clémence",
    en: "Mercy"
  },
  "ui.flee": {
    fr: "Fuir",
    en: "Flee"
  },
  "ui.continue": {
    fr: "Continuer",
    en: "Continue"
  },
  "ui.hp": {
    fr: "PV",
    en: "HP"
  },
  "ui.victory": {
    fr: "Victoire !",
    en: "Victory!"
  },
  "ui.defeat": {
    fr: "Défaite...",
    en: "Defeat..."
  },
  "ui.language": {
    fr: "EN",
    en: "FR"
  },
  "ui.what_will_you_do": {
    fr: "Que voulez-vous faire ?",
    en: "What will you do?"
  },
  "ui.violence": {
    fr: "Violence",
    en: "Violence"
  },
  "ui.you": {
    fr: "Vous",
    en: "You"
  }
};

// Helper function to get translation
export function getTranslation(key: string, language: Language): string {
  // First check in scene translations
  if (sceneTranslations[key]) {
    return sceneTranslations[key][language];
  }
  
  // Then check in character translations
  if (characterTranslations[key]) {
    return characterTranslations[key][language];
  }
  
  // Finally check in UI translations
  if (uiTranslations[key]) {
    return uiTranslations[key][language];
  }
  
  // Return the key itself if no translation is found
  console.warn(`Missing translation for key: ${key}`);
  return key;
}

// Export all translations grouped for convenience
export const allTranslations = {
  scene: sceneTranslations,
  character: characterTranslations,
  ui: uiTranslations
};
