"use client";

import { useState, useEffect, useRef } from 'react';

// Types pour la configuration des personnages
export interface CharacterPosition {
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
  center?: boolean;
}

export interface CharacterSize {
  width: number;
  height: number;
}

export interface SceneConfig {
  position: CharacterPosition;
  size: CharacterSize;
  scale?: number;
  zIndex?: number;
  animation?: string;
  lastUpdate?: number;
}

export interface CharacterConfig {
  id: string;
  name: string;
  scale?: number;
  flip?: boolean;
  size: CharacterSize;
  scenes: Record<string, SceneConfig>;
  default?: SceneConfig;
}

export interface CharactersConfig {
  version: number;
  lastRefresh?: number;
  characters: Record<string, CharacterConfig>;
}

/**
 * Gestionnaire centralisé pour les personnages du jeu
 * Gère le chargement, la sauvegarde et l'affichage des configurations
 */
export class CharacterManager {
  private static instance: CharacterManager;
  private config: CharactersConfig | null = null;
  private loading: boolean = true;
  private error: Error | null = null;
  private listeners: Set<() => void> = new Set();
  private configPath: string = "/config/scenes-config.json";

  /**
   * Constructeur privé (pattern Singleton)
   */
  private constructor() {}

  /**
   * Obtenir l'instance unique du gestionnaire
   */
  public static getInstance(): CharacterManager {
    if (!CharacterManager.instance) {
      CharacterManager.instance = new CharacterManager();
    }
    return CharacterManager.instance;
  }

  /**
   * Charger la configuration depuis le serveur
   * @param force Forcer le rechargement même si déjà chargé
   */
  public async loadConfig(force: boolean = false): Promise<CharactersConfig | null> {
    if (this.config && !force) {
      return this.config;
    }

    try {
      this.loading = true;
      this.notifyListeners();

      // Ajouter un timestamp pour éviter la mise en cache
      const timestamp = Date.now();
      const response = await fetch(`${this.configPath}?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error(`Échec du chargement de la configuration: ${response.status}`);
      }

      this.config = await response.json();
      this.error = null;
      console.log("[CharacterManager] Configuration chargée avec succès");
      
      return this.config;
    } catch (err) {
      console.error("[CharacterManager] Erreur de chargement:", err);
      this.error = err instanceof Error ? err : new Error(String(err));
      return null;
    } finally {
      this.loading = false;
      this.notifyListeners();
    }
  }

  /**
   * Sauvegarder la configuration sur le serveur
   */
  public async saveConfig(updatedConfig: CharactersConfig): Promise<boolean> {
    try {
      // Ajouter un numéro de version pour forcer le rechargement
      updatedConfig.version = Date.now();
      
      const response = await fetch('/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(updatedConfig)
      });

      if (!response.ok) {
        throw new Error(`Échec de la sauvegarde: ${response.status}`);
      }

      // Mettre à jour la configuration locale
      this.config = updatedConfig;
      this.notifyListeners();
      
      return true;
    } catch (err) {
      console.error("[CharacterManager] Erreur de sauvegarde:", err);
      this.error = err instanceof Error ? err : new Error(String(err));
      return false;
    }
  }

  /**
   * Forcer le rafraîchissement du jeu
   */
  public async refreshGame(): Promise<boolean> {
    try {
      const response = await fetch('/api/refresh-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Échec du rafraîchissement: ${response.status}`);
      }

      return true;
    } catch (err) {
      console.error("[CharacterManager] Erreur de rafraîchissement:", err);
      return false;
    }
  }

  /**
   * Obtenir la configuration d'un personnage dans une scène
   */
  public getCharacterSceneConfig(characterId: string, sceneId: string): SceneConfig | null {
    if (!this.config) return null;
    
    const charConfig = this.config.characters[characterId];
    if (!charConfig) return null;
    
    // Utiliser la configuration de scène si disponible, sinon la configuration par défaut
    return charConfig.scenes[sceneId] || charConfig.default || null;
  }

  /**
   * Mettre à jour la position d'un personnage dans une scène
   */
  public updateCharacterPosition(
    characterId: string, 
    sceneId: string, 
    position: CharacterPosition, 
    size?: CharacterSize
  ): boolean {
    if (!this.config) return false;
    
    const charConfig = this.config.characters[characterId];
    if (!charConfig) return false;
    
    // Créer la configuration de scène si elle n'existe pas
    if (!charConfig.scenes[sceneId]) {
      charConfig.scenes[sceneId] = {
        position: {},
        size: charConfig.size || { width: 300, height: 500 },
        scale: 1
      };
    }
    
    // Mettre à jour la position
    charConfig.scenes[sceneId].position = { ...position };
    
    // Mettre à jour la taille si fournie
    if (size) {
      charConfig.scenes[sceneId].size = { ...size };
    }
    
    // Ajouter un timestamp pour forcer le rechargement
    charConfig.scenes[sceneId].lastUpdate = Date.now();
    
    this.notifyListeners();
    return true;
  }

  /**
   * S'abonner aux changements de configuration
   */
  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notifier tous les abonnés d'un changement
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback());
  }

  /**
   * Obtenir la configuration actuelle
   */
  public getConfig(): CharactersConfig | null {
    return this.config;
  }

  /**
   * Vérifier si la configuration est en cours de chargement
   */
  public isLoading(): boolean {
    return this.loading;
  }

  /**
   * Obtenir l'erreur actuelle, le cas échéant
   */
  public getError(): Error | null {
    return this.error;
  }
}

/**
 * Hook React pour utiliser le gestionnaire de personnages
 */
export function useCharacterManager() {
  const [, forceUpdate] = useState({});
  const manager = useRef<CharacterManager>(CharacterManager.getInstance());
  
  useEffect(() => {
    // Charger la configuration au montage du composant
    manager.current.loadConfig();
    
    // S'abonner aux mises à jour
    const unsubscribe = manager.current.subscribe(() => {
      forceUpdate({});
    });
    
    return unsubscribe;
  }, []);
  
  return {
    config: manager.current.getConfig(),
    isLoading: manager.current.isLoading(),
    error: manager.current.getError(),
    loadConfig: () => manager.current.loadConfig(true),
    saveConfig: (config: CharactersConfig) => manager.current.saveConfig(config),
    refreshGame: () => manager.current.refreshGame(),
    getCharacterSceneConfig: (characterId: string, sceneId: string) => 
      manager.current.getCharacterSceneConfig(characterId, sceneId),
    updateCharacterPosition: (
      characterId: string, 
      sceneId: string, 
      position: CharacterPosition, 
      size?: CharacterSize
    ) => manager.current.updateCharacterPosition(characterId, sceneId, position, size)
  };
}
