import React from 'react';
import { getImageSEO } from '../data/seo-content';

interface GithubImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
}

/**
 * Composant qui gère automatiquement les chemins d'images pour GitHub Pages
 * en utilisant l'URL absolue pour assurer la compatibilité avec le domaine personnalisé
 * Optimisé SEO avec données structurées et lazy loading
 */
export default function GithubImage({ 
  src, 
  alt, 
  className, 
  onClick, 
  priority = false, 
  loading = 'lazy',
  style
}: GithubImageProps) {
  // Vérifier si l'URL contient déjà le préfixe GitHub Pages pour éviter la duplication
  const githubPrefix = "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara/";
  
  // Utiliser l'URL telle quelle si elle commence déjà par le préfixe
  // sinon, construire l'URL complète
  let fullImageUrl;
  if (src.startsWith(githubPrefix)) {
    fullImageUrl = src;
  } else if (src.startsWith('/images/') || src.startsWith('/placeholder')) {
    // Préserver les chemins locaux pour le dev (servis depuis public/)
    fullImageUrl = src;
  } else {
    // Supprimer le préfixe '/' si présent pour éviter les doubles slashes
    const cleanSrc = src.startsWith('/') ? src.substring(1) : src;
    fullImageUrl = `${githubPrefix}${cleanSrc}`;
  }
  
  // Récupérer les données SEO pour cette image si disponibles
  const seoData = getImageSEO(src);
  
  // Utiliser l'alt text SEO optimisé si disponible, sinon l'alt fourni
  const optimizedAlt = seoData?.alt || alt;
  const imageTitle = seoData?.title || alt;
  
  return (
    <img
      src={fullImageUrl}
      alt={optimizedAlt}
      title={imageTitle}
      className={className}
      style={style}
      onClick={onClick}
      loading={priority ? 'eager' : loading}
      decoding="async"
      // Optimisations SEO et performance
      fetchPriority={priority ? 'high' : 'auto'}
      // Schema.org structured data attributes
      itemProp="image"
      {...(seoData?.description && { 'data-description': seoData.description })}
      {...(seoData?.keywords && { 'data-keywords': seoData.keywords.join(', ') })}
    />
  );
}
