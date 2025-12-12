import { NextResponse } from 'next/server';

// Pour l'export statique GitHub Pages
export const dynamic = "force-static";

export async function GET() {
  // Pour GitHub Pages, nous utilisons une liste statique d'assets
  // plutôt que de lire le répertoire dynamiquement
  const assets = [
    "/images/characters/Demetrius_concept_art_new.png",
    "/images/characters/haikal_personnage_alone.png", 
    "/images/characters/commandant_milo.png",
    "/images/characters/imperial_guard.png",
    "/images/characters/ellis_queen.png",
    "/images/characters/emepror_hades.png",
    "/images/environement/camp_du_travail_keyframe.jpg",
    "/images/environement/key_frame_base_camp.jpg",
    "/images/environement/gate_capital_yirie.png",
    "/images/title/background.png",
    "/images/title/titletitre.png"
  ];
  
  return NextResponse.json({ assets });
}
