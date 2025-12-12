// Fonction utilitaire pour les chemins d'images
// Supprime automatiquement le préfixe GitHub Pages en local

export function imagePath(path) {
  // Si le chemin commence déjà par /Portfolio_Putri_Zahara/ et que nous sommes en mode local
  if (path.startsWith('/Portfolio_Putri_Zahara/') && typeof window !== 'undefined') {
    // En mode local (basePath vide), supprime le préfixe
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return path.replace('/Portfolio_Putri_Zahara', '');
    }
  }
  
  // En production ou si le chemin ne contient pas le préfixe, le retourner tel quel
  return path;
}
