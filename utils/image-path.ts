/**
 * Utilitaire pour résoudre correctement les chemins d'images avec le domaine personnalisé
 */

export function getImagePath(path: string): string {
  // Si le chemin est déjà une URL complète, ne pas la modifier
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Préserver les chemins locaux commençant par /images/ (pour les fichiers dans le dossier public)
  if (path.startsWith('/images/')) {
    return path;
  }

  // Si le chemin commence par un slash, supprimer le slash
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // Utiliser l'URL GitHub Pages pour les autres images
  return `https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/${path}`;
}
