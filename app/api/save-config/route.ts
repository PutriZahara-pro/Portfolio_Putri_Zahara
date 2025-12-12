import { NextResponse } from 'next/server';

// Pour l'export statique GitHub Pages
export const dynamic = "force-static";

export async function POST(request: Request) {
  // Version statique qui retourne toujours un succès
  // Sur GitHub Pages, la sauvegarde de configuration ne fonctionnera pas réellement
  return NextResponse.json({
    success: true,
    message: "Mode statique pour GitHub Pages - Pas de sauvegarde réelle possible",
    data: { timestamp: new Date().toISOString() }
  });
}
