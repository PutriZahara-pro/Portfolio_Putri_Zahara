// Données SEO optimisées pour le portfolio de Putri Zahara
// Descriptions détaillées et mots-clés pour chaque image et section

export interface SEOImageData {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface SEOPageData {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    image: string;
  };
}

// Mots-clés principaux pour le portfolio
export const mainKeywords = [
  "concept artist",
  "concept art",
  "character design",
  "environment design",
  "game art",
  "digital art",
  "illustration",
  "visual development",
  "narrative art",
  "RPG design",
  "dystopian art",
  "post-apocalyptic design",
  "visual storytelling",
  "game development",
  "3D modeling",
  "fantasy art",
  "science fiction art"
];

// Images SEO optimisées pour The Ethians Redeemed
export const ethiansRedeemedImages: SEOImageData[] = [
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png",
    alt: "The Ethians Redeemed - Logo et titre du jeu RPG narratif dystopique par Putri Zahara concept artist",
    title: "Logo The Ethians Redeemed",
    description: "Conception du logo principal pour le jeu RPG narratif The Ethians Redeemed",
    keywords: ["logo design", "RPG", "game branding", "typography design"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/World_map/Carte_du_monde_finale.jpg",
    alt: "Carte du monde complète de The Ethians Redeemed - Design d'environnement dystopique avec régions détaillées par concept artist",
    title: "Carte du monde - The Ethians Redeemed",
    description: "Vue d'ensemble cartographique du monde dystopique avec les différentes régions : Demetrius, Yirie, Ether et Vulkan",
    keywords: ["world map", "environment design", "dystopian world", "game world", "RPG map"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Environnement/Village_demetrius/village_demetrius_vue_densemble.jpg",
    alt: "Village de Demetrius vue d'ensemble - Concept art d'environnement post-apocalyptique avec architecture détruite et végétation envahissante",
    title: "Village de Demetrius - Vue d'ensemble",
    description: "Concept art montrant le village abandonné de Demetrius avec ses structures en ruines et la nature qui reprend ses droits",
    keywords: ["village design", "post-apocalyptic", "ruins", "environment concept", "abandoned settlement"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Environnement/Camp_du_travail/camp_du_travail_keyframe.jpg",
    alt: "Camp de travail keyframe - Concept art d'environnement industriel dystopique avec structures métalliques et atmosphère oppressante",
    title: "Camp de travail - Image clé",
    description: "Keyframe du camp de travail industriel montrant l'architecture oppressante et l'ambiance dystopique du lieu",
    keywords: ["industrial design", "dystopian architecture", "work camp", "keyframe art", "environmental storytelling"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Environnement/Camp_du_travail/set_design_camp_travail.jpg",
    alt: "Set design camp de travail - Concept détaillé des installations industrielles et zones de travail forcé dans l'univers dystopique",
    title: "Set design - Camp de travail",
    description: "Design détaillé des installations du camp de travail avec focus sur l'architecture fonctionnelle oppressive",
    keywords: ["set design", "industrial facility", "forced labor", "dystopian society", "architectural concept"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Environnement/Yirie/design_dome_yirie.jpg",
    alt: "Dôme de Yirie - Concept art architectural d'une structure futuriste transparente avec éclairage néon dans un environnement urbain dystopique",
    title: "Dôme architectural de Yirie",
    description: "Design architectural du dôme emblématique de la région Yirie, structure futuriste au cœur de l'environnement urbain",
    keywords: ["dome architecture", "futuristic building", "urban design", "sci-fi architecture", "Yirie region"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Environnement/Yirie/design_yirie_banner.jpg",
    alt: "Banner environnement Yirie - Panorama urbain futuriste avec gratte-ciels, éclairage néon et ambiance cyberpunk pour jeu RPG",
    title: "Panorama urbain de Yirie",
    description: "Vue panoramique de l'environnement urbain de Yirie avec son architecture futuriste et son ambiance néon",
    keywords: ["urban environment", "cyberpunk", "futuristic city", "neon lighting", "cityscape concept"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Personnages/Demetrius/planche_perso_dimi_new.jpg",
    alt: "Demetrius character sheet - Concept art détaillé du personnage principal avec design complet, expressions et poses pour RPG narratif",
    title: "Planche personnage - Demetrius",
    description: "Character sheet complet de Demetrius, personnage principal du jeu, avec études d'expressions et variations de design",
    keywords: ["character design", "protagonist", "character sheet", "RPG character", "main character"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/Personnages/Haikal/planche_perso_haikal_new.jpg",
    alt: "Haikal character sheet - Design de personnage secondaire avec costume détaillé et études d'expressions pour jeu vidéo RPG",
    title: "Planche personnage - Haikal",
    description: "Concept art du personnage Haikal avec design vestimentaire détaillé et études de personnalité",
    keywords: ["character design", "supporting character", "costume design", "character development", "RPG companion"]
  }
];

// Images SEO pour P.S. Apocalypse
export const psApocalypseImages: SEOImageData[] = [
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/ps_apocalypse/1.jpg",
    alt: "P.S. Apocalypse concept art - Environnement post-apocalyptique avec ruines urbaines et végétation sauvage par concept artist",
    title: "Environnement post-apocalyptique",
    description: "Concept art d'environnement montrant un monde après l'apocalypse avec la nature qui reprend ses droits",
    keywords: ["post-apocalyptic", "ruins", "overgrown vegetation", "environmental storytelling", "dystopian future"]
  }
];

// Images SEO pour Tower Defense Game
export const towerDefenseImages: SEOImageData[] = [
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Tower_defense_game/WORKSHOP_BATTLE_CHESS_1.jpg",
    alt: "Workshop Battle Chess concept - Design d'atelier médiéval fantastique avec échiquier de bataille pour jeu de tower defense",
    title: "Atelier d'échecs de bataille",
    description: "Concept art d'un atelier médiéval-fantastique intégrant un système d'échecs de bataille pour gameplay stratégique",
    keywords: ["workshop design", "battle chess", "medieval fantasy", "tower defense", "strategy game", "game mechanics"]
  }
];

// Images SEO pour Autres œuvres
export const otherWorksImages: SEOImageData[] = [
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Fallout_fanart/Zahara_Putri_AG4_Fallout_environnement.jpg",
    alt: "Fallout fanart environnement - Concept art post-apocalyptique inspiré de l'univers Fallout avec ruines et désolation",
    title: "Environnement Fallout - Fanart",
    description: "Fanart d'environnement inspiré de l'univers Fallout, montrant un paysage post-nucléaire désolé",
    keywords: ["fallout fanart", "post-nuclear", "wasteland", "environmental concept", "fan creation"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Chaudrons/Chaudron_araignée.jpg",
    alt: "Chaudron araignée concept - Design fantastique d'objet magique en forme d'araignée pour univers fantasy dark",
    title: "Chaudron araignée fantastique",
    description: "Concept design d'un chaudron magique aux allures d'araignée, fusion entre créature et objet mystique",
    keywords: ["fantasy object", "magical cauldron", "spider design", "dark fantasy", "creature design"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Concept_monstes/Ismi.jpg",
    alt: "Ismi monster concept - Design de créature fantastique originale avec anatomie détaillée pour univers dark fantasy",
    title: "Créature Ismi - Concept de monstre",
    description: "Design original de la créature Ismi, monstre fantastique avec anatomie unique et caractéristiques surnaturelles",
    keywords: ["monster design", "creature concept", "original character", "dark fantasy", "beast design"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Gnomes/gnome_3_volume.jpg",
    alt: "Gnome 3D volume - Étude volumétrique de personnage gnome fantasy avec détails anatomiques et textural pour modélisation 3D",
    title: "Étude volumétrique - Gnome",
    description: "Étude de volume et forme d'un personnage gnome, préparation pour modélisation 3D avec attention aux détails",
    keywords: ["gnome character", "3D volume study", "character modeling", "fantasy race", "anatomical study"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Marchant_ambulant/Recherche_chariot_couleur.jpg",
    alt: "Marchand ambulant chariot - Recherche couleur pour véhicule fantasy mobile avec équipement marchand détaillé",
    title: "Chariot de marchand ambulant",
    description: "Recherche colorimétrique pour le chariot d'un marchand ambulant, véhicule fantasy avec équipements commerciaux",
    keywords: ["merchant cart", "traveling trader", "vehicle design", "fantasy commerce", "color research"]
  },
  {
    src: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/Other_works/Washing_machine/Washing_machine.jpg",
    alt: "Machine à laver futuriste - Concept design d'électroménager sci-fi avec interface holographique et design industriel moderne",
    title: "Machine à laver futuriste",
    description: "Redesign futuriste d'une machine à laver avec éléments sci-fi et interface technologique avancée",
    keywords: ["futuristic appliance", "sci-fi design", "industrial design", "technology concept", "household device"]
  }
];

// Données SEO pour les pages principales
export const pagesSEO: Record<string, SEOPageData> = {
  home: {
    title: "Putri Zahara - Concept Artist | Portfolio Digital Art & Game Design",
    description: "Portfolio officiel de Putri Zahara, concept artist spécialisée dans le design de personnages, environnements et développement visuel pour jeux vidéo, films et animation. Découvrez The Ethians Redeemed et autres créations originales.",
    keywords: [...mainKeywords, "portfolio", "game artist", "character artist", "environment artist"],
    openGraph: {
      title: "Putri Zahara - Concept Artist Portfolio",
      description: "Concept artist spécialisée dans la création de mondes immersifs et la narration visuelle pour jeux vidéo et animation.",
      image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png"
    }
  },
  portfolio: {
    title: "Portfolio Concept Art - Putri Zahara | Character & Environment Design",
    description: "Explorez le portfolio complet de Putri Zahara : The Ethians Redeemed, P.S. Apocalypse, Tower Defense Game et créations originales. Concept art professionnel pour jeux vidéo et médias interactifs.",
    keywords: [...mainKeywords, "portfolio gallery", "concept art showcase", "game assets"],
    openGraph: {
      title: "Portfolio Concept Art - Putri Zahara",
      description: "Découvrez les créations de concept art pour jeux vidéo, environnements dystopiques et personnages originaux.",
      image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/Portfolio/The_Ethians_Redeemed/World_map/Carte_du_monde_finale.jpg"
    }
  },
  about: {
    title: "À Propos - Putri Zahara Concept Artist | Parcours & Compétences",
    description: "Découvrez le parcours de Putri Zahara, concept artist junior spécialisée dans les jeux vidéo, films et animation. Compétences en character design, environment art et développement visuel.",
    keywords: [...mainKeywords, "about artist", "junior concept artist", "art skills", "creative process"],
    openGraph: {
      title: "À Propos - Putri Zahara Concept Artist",
      description: "Concept artist passionnée par la création de mondes immersifs et la narration visuelle.",
      image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png"
    }
  },
  ethiansRedeemed: {
    title: "The Ethians Redeemed - Concept Art RPG Dystopique | Putri Zahara",
    description: "Découvrez l'univers complet de The Ethians Redeemed : carte du monde, environnements (Demetrius, Yirie, Ether, Vulkan), personnages (Demetrius, Haikal, Ellis) et interface utilisateur. Concept art pour RPG narratif dystopique.",
    keywords: [...mainKeywords, "The Ethians Redeemed", "RPG art", "dystopian game", "character sheets", "world building"],
    openGraph: {
      title: "The Ethians Redeemed - Concept Art Portfolio",
      description: "Art conceptuel complet pour le RPG narratif dystopique The Ethians Redeemed.",
      image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png"
    }
  },
  game: {
    title: "The Ethians Redeemed - Jeu Interactif | Concept Art Putri Zahara",
    description: "Jouez à The Ethians Redeemed, jeu interactif basé sur l'univers concept art de Putri Zahara. Explorez les environnements dystopiques et rencontrez les personnages du monde Ethians.",
    keywords: [...mainKeywords, "interactive game", "playable demo", "game experience", "RPG gameplay"],
    openGraph: {
      title: "The Ethians Redeemed - Jeu Interactif",
      description: "Expérience de jeu interactive basée sur l'univers concept art de The Ethians Redeemed.",
      image: "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/images/title/titletitre.png"
    }
  }
};

// Fonction utilitaire pour obtenir les données SEO d'une image
export function getImageSEO(imagePath: string): SEOImageData | null {
  const allImages = [
    ...ethiansRedeemedImages,
    ...psApocalypseImages,
    ...towerDefenseImages,
    ...otherWorksImages
  ];
  
  return allImages.find(img => img.src.includes(imagePath.split('/').pop() || '')) || null;
}

// Fonction pour générer un alt text optimisé SEO
export function generateSEOAlt(title: string, description: string, keywords: string[] = []): string {
  const keywordString = keywords.length > 0 ? ` - ${keywords.slice(0, 3).join(', ')}` : '';
  return `${title} - ${description} par Putri Zahara concept artist${keywordString}`;
}
