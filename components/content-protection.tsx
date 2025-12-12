'use client';

import { useEffect } from 'react';

interface ContentProtectionProps {
  messages?: {
    rightClick?: string;
    copy?: string;
    cut?: string;
    selectAll?: string;
    saveImage?: string;
  };
}

export default function ContentProtection({ 
  messages = {
    rightClick: "Le clic droit est désactivé pour protéger le contenu de l'artiste.",
    copy: "La copie n'est pas autorisée sur ce portfolio.",
    cut: "Le contenu de ce portfolio est protégé.",
    selectAll: "La sélection complète est désactivée.",
    saveImage: "Les images de ce portfolio sont protégées."
  } 
}: ContentProtectionProps) {
  
  useEffect(() => {
    // S'assurer que ce code s'exécute uniquement côté client
    if (typeof window === 'undefined') return;
    const showMessage = (message: string | undefined) => {
      if (!message) return; // Ne pas afficher si le message est undefined
      
      // Créer l'élément de notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-zinc-800/95 border border-emerald-500 text-white px-5 py-3 rounded-full shadow-lg z-[9999] flex items-center';
      
      // Ajouter une icône d'avertissement
      const icon = document.createElement('span');
      icon.innerHTML = '⚠️';
      icon.className = 'mr-2';
      notification.appendChild(icon);
      
      // Ajouter le message
      const text = document.createElement('span');
      text.textContent = message;
      text.className = 'font-medium';
      notification.appendChild(text);
      
      // Ajouter au DOM
      document.body.appendChild(notification);
      
      // Supprimer après 3 secondes
      setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    };

    // Désactiver le menu contextuel (clic droit)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showMessage(messages.rightClick);
      return false;
    };

    // Désactiver le raccourci Ctrl+C
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Permettre la copie dans les champs de formulaire
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      e.preventDefault();
      showMessage(messages.copy);
      return false;
    };

    // Désactiver le raccourci Ctrl+X
    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Permettre la coupure dans les champs de formulaire
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      e.preventDefault();
      showMessage(messages.cut);
      return false;
    };

    // Désactiver le raccourci Ctrl+A
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Permettre la sélection dans les champs de formulaire
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      
      // Ctrl+A (Sélectionner tout)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        showMessage(messages.selectAll);
        return false;
      }
      
      // Ctrl+S (Sauvegarder)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showMessage(messages.saveImage);
        return false;
      }
      
      return true;
    };

    // Désactiver le glisser-déposer des images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        showMessage(messages.saveImage);
        return false;
      }
      return true;
    };

    // Au lieu d'ajouter des attributs aux images individuelles, nous utiliserons des événements délégués
    // Cette approche n'interfère pas avec l'hydratation React
    const handleGlobalImageProtection = () => {
      if (typeof window === 'undefined') return;
      
      // Ajouter une feuille de style pour désactiver la sélection sur toutes les images
      const style = document.createElement('style');
      style.innerHTML = `
        img { 
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);

      // Gérer le glisser-déposer d'images au niveau du document
      document.body.addEventListener('dragstart', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
          e.preventDefault();
        }
      }, true);
    };

    // Ajouter des écouteurs d'événements
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    
    // Activer la protection globale des images
    handleGlobalImageProtection();

    // Nettoyer les écouteurs d'événements lors du démontage
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      // Les autres événements et styles ajoutés restent actifs
    };
  }, [messages]);

  // Ce composant ne rend rien à l'écran
  return null;
}
