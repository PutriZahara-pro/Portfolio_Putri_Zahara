"use client"

import { useEffect, useState } from 'react'

interface LinkedInEmbedProps {
  postUrl: string;
  width?: number;
  height?: number;
}

export default function LinkedInEmbed({ postUrl, width = 504, height = 800 }: LinkedInEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(Date.now()); // Clé unique pour forcer le rendu

  useEffect(() => {
    // Charger le script LinkedIn Embed une seule fois
    if (!document.getElementById('linkedin-embed-script')) {
      const script = document.createElement('script');
      script.id = 'linkedin-embed-script';
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    
    // Réinitialiser l'état de chargement et la clé lorsque l'URL change
    setIsLoading(true);
    setIframeKey(Date.now());
    
    return () => {
      // Nettoyage propre lors du démontage du composant
    };
  }, [postUrl]);

  // Gestionnaire d'événement onLoad de l'iframe
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="linkedin-post-container rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
      <div 
        className="w-full flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm transition-opacity duration-300 relative"
        style={{ minHeight: `${Math.min(height, 800)}px`, opacity: isLoading ? 0.7 : 1 }}
      >
        {/* Utiliser la syntaxe JSX standard pour l'iframe */}
        <iframe
          key={iframeKey}
          src={`https://www.linkedin.com/embed/feed/update/${postUrl}`}
          width="100%"
          height={`${height}px`}
          style={{ maxWidth: `${width}px`, display: isLoading ? 'none' : 'block' }}
          frameBorder="0"
          allowFullScreen
          title="LinkedIn Post Embed"
          onLoad={handleIframeLoad}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 gap-2">
            <svg className="animate-spin h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement du post LinkedIn...
          </div>
        )}
      </div>
    </div>
  );
}
