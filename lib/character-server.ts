import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import type { CharactersConfig } from './character-manager';

/**
 * API route handler pour sauvegarder la configuration
 */
export async function saveConfigHandler(request: Request) {
  try {
    const config = await request.json();
    
    // Chemin vers le fichier de configuration
    const configPath = path.join(process.cwd(), 'public', 'config', 'scenes-config.json');
    
    // Écriture du fichier avec formatage
    await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
    
    return { success: true, message: "Configuration sauvegardée avec succès" };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    throw error;
  }
}

/**
 * API route handler pour rafraîchir le jeu
 */
export async function refreshGameHandler() {
  try {
    // Récupérer le chemin du fichier de configuration
    const configPath = path.join(process.cwd(), 'public', 'config', 'scenes-config.json');
    
    // Lire la configuration actuelle
    const configContent = await readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent) as CharactersConfig;
    
    // Ajouter un timestamp pour forcer le rechargement
    config.lastRefresh = Date.now();
    
    // Réécrire le fichier
    await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');
    
    return { success: true, message: "Jeu rafraîchi avec succès" };
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du jeu:', error);
    throw error;
  }
}
