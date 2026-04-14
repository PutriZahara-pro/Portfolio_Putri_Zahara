/**
 * Utilitaire pour résoudre correctement les chemins d'images avec le domaine personnalisé
 */

export function getImagePath(path: string): string {
  const githubBase = "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara"
  const runtimeBasePath =
    typeof window !== "undefined" && window.location.pathname.startsWith("/Portfolio_Putri_Zahara")
      ? "/Portfolio_Putri_Zahara"
      : ""
  const ghBasePath = "/Portfolio_Putri_Zahara"

  // Si le chemin est déjà une URL complète, ne pas la modifier
  if (path.startsWith('http://') || path.startsWith('https://')) {
    if (path.startsWith(githubBase)) {
      const relativePath = path.substring(githubBase.length)
      if (relativePath.startsWith("/")) {
        return `${runtimeBasePath}${relativePath}`
      }
      return `${runtimeBasePath}/${relativePath}`
    }

    return path;
  }
  
  // Préserver les chemins locaux commençant par /images/ (pour les fichiers dans le dossier public)
  if (path.startsWith('/images/')) {
    return `${runtimeBasePath}${path}`
  }

  // Si on reçoit déjà un chemin préfixé GitHub Pages, éviter les doubles préfixes.
  // - Sur GitHub Pages (runtimeBasePath = /Portfolio_Putri_Zahara): conserver tel quel.
  // - Sur domaine custom (runtimeBasePath = ''): retirer le préfixe pour rester same-origin.
  if (path.startsWith(`${ghBasePath}/images/`)) {
    return runtimeBasePath
      ? path
      : path.substring(ghBasePath.length)
  }

  if (path.startsWith('images/')) {
    return `${runtimeBasePath}/${path}`
  }

  // Si le chemin commence par un slash, supprimer le slash
  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  // Utiliser l'URL GitHub Pages pour les autres images
  return `https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/${path}`;
}
