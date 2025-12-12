import { NextResponse } from 'next/server';

// Pour l'export statique GitHub Pages
export const dynamic = "force-static";

/**
 * API pour forcer le jeu à recharger la configuration des personnages
 * Version statique pour GitHub Pages
 */
export async function POST() {
  // Version statique qui retourne toujours un succès
  // Note: Sur GitHub Pages, les mises à jour en temps réel ne fonctionneront pas
  // mais cela permet au moins de compiler le site
  return NextResponse.json({
    success: true,
    message: "Mode statique pour GitHub Pages - Pas de rafraîchissement réel possible"
  });
}
