"use client"

import { useState, useEffect, useCallback } from 'react'

interface ConfigLoaderResult<T> {
  config: T | null
  isLoading: boolean
  error: Error | null
  reloadConfig: () => void
}

/**
 * Hook pour charger des fichiers de configuration JSON avec rafraîchissement automatique en mode développement.
 * @param configPath Chemin vers le fichier de configuration JSON (depuis /public)
 * @param refreshInterval Intervalle de rafraîchissement en ms (0 = désactivé)
 */
export function useConfigLoader<T>(configPath: string, refreshInterval = 2000): ConfigLoaderResult<T> {
  const [config, setConfig] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  // Clef de forçage pour reload manuel
  const [reloadKey, setReloadKey] = useState(0)

  const loadConfig = useCallback(async () => {
    try {
      setIsLoading(true)
      // Ajouter un paramètre d'anti-cache unique à chaque requête
      const timestamp = Date.now()
      const res = await fetch(`${configPath}?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        // Utiliser un court timeout pour éviter les blocages
        signal: AbortSignal.timeout(5000)
      }).catch(err => {
        console.error("Erreur réseau lors du chargement de la config:", err);
        throw new Error(`Erreur réseau: ${err.message}`);
      });
      
      if (!res || !res.ok) {
        throw new Error(`Échec du chargement de la configuration: ${res?.status || 'erreur réseau'}`);
      }
      
      // Vérifier que la réponse peut être parsée en JSON
      const data = await res.json().catch(err => {
        console.error("Erreur de parsing JSON:", err);
        throw new Error(`Format JSON invalide: ${err.message}`);
      });
      
      if (!data) {
        throw new Error("Données de configuration vides ou invalides");
      }
      
      setConfig(data)
      setError(null)
      console.log(`[Config] ${configPath} chargé avec succès (${timestamp})`);
    } catch (err) {
      // Ne pas afficher l'erreur si c'est une erreur d'abandon volontaire
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.warn('Chargement de configuration abandonné (timeout)');
      } else {
        console.error('Erreur de chargement de configuration:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setIsLoading(false)
    }
  }, [configPath])

  // Manual reload
  const reloadConfig = useCallback(() => {
    setReloadKey(k => k + 1)
  }, [])

  // Initial + manual reload
  useEffect(() => {
    // Fonction wrapper pour capturer les erreurs non gérées
    const safeLoad = async () => {
      try {
        await loadConfig();
      } catch (err) {
        console.error("Erreur non gérée dans useConfigLoader:", err);
        // Ne pas propager l'erreur
      }
    };
    
    safeLoad();
    
    return () => {
      // Nettoyer les éventuelles promesses en cours
    };
  }, [loadConfig, reloadKey])

  // Auto refresh (dev only)
  useEffect(() => {
    if (typeof window === 'undefined' || refreshInterval <= 0) return;
    
    const id = setInterval(() => {
      // Fonction wrapper pour capturer les erreurs non gérées
      const safeLoad = async () => {
        try {
          await loadConfig();
        } catch (err) {
          console.error("Erreur dans l'intervalle de rafraîchissement:", err);
          // Ne pas propager l'erreur
        }
      };
      
      safeLoad();
    }, refreshInterval);
    
    return () => clearInterval(id);
  }, [loadConfig, refreshInterval])

  return { config, isLoading, error, reloadConfig }
}
