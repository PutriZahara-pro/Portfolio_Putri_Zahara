"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language } from '@/components/game/translations';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const pathname = usePathname() || '/';
  const router = useRouter();

  // Initialisation uniquement côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    const isFrenchPath = pathname.startsWith('/fr');
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') as Language : null;
    
    if (isFrenchPath) {
      setLanguageState('fr');
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', 'fr');
      }
    } else if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, [pathname]);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
    
    // Gestion des chemins pour la traduction
    const currentPath = pathname.replace(/^\/fr/, ''); // Enlève le préfixe /fr s'il existe
    
    // Assurons-nous que le chemin commence par un slash s'il n'y en a pas
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    
    // Construction du nouveau chemin selon la langue
    const targetPath = newLanguage === 'fr' ? `/fr${normalizedPath}` : normalizedPath;
    
    // Ne redirige que si le chemin est différent
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  }, [pathname, router]);

  const toggleLanguage = useCallback(() => {
    // Log pour déboguer
    console.log("toggleLanguage appelé, langue actuelle:", language);
    
    // Basculer entre fr et en
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    console.log("Nouvelle langue:", newLanguage);
    
    // Mettre à jour le state et rediriger
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  return React.createElement(LanguageContext.Provider, 
    { value: { language, setLanguage, toggleLanguage } },
    children
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
