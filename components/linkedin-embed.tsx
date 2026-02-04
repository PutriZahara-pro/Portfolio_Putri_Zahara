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
  const [hasError, setHasError] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    let runningInIframe = false;
    try {
      runningInIframe = window.self !== window.top;
    } catch {
      runningInIframe = true;
    }

    setIsInIframe(runningInIframe);

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
    setIsLoading(!runningInIframe);
    setHasError(false);
    setIframeKey(Date.now());
    
    return () => {
      // Nettoyage propre lors du démontage du composant
    };
  }, [postUrl]);

  useEffect(() => {
    if (!isLoading) return;

    const timeout = window.setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, 8000);

    return () => window.clearTimeout(timeout);
  }, [isLoading, postUrl]);

  // Gestionnaire d'événement onLoad de l'iframe
  const handleIframeLoad = () => {
    setHasError(false);
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="linkedin-post-container rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
      <div 
        className="w-full flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm transition-opacity duration-300 relative"
        style={{ minHeight: `${Math.min(height, 800)}px`, opacity: isLoading ? 0.7 : 1 }}
      >
        {!isInIframe && (
          <iframe
            key={iframeKey}
            src={`https://www.linkedin.com/embed/feed/update/${postUrl}`}
            width="100%"
            height={`${height}px`}
            style={{ maxWidth: `${width}px`, opacity: isLoading ? 0 : 1, transition: 'opacity 300ms', display: 'block' }}
            frameBorder="0"
            allowFullScreen
            title="LinkedIn Post Embed"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
        
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center text-zinc-400 gap-2">
            <svg className="animate-spin h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement du post LinkedIn...
          </div>
        )}

        {(isInIframe || hasError) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center text-zinc-400">
            <a
              href={`https://www.linkedin.com/feed/update/${postUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 hover:text-emerald-300 transition-colors hover:underline"
            >
              Ouvrir sur LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
