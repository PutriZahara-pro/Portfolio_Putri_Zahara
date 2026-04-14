"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getImageSEO } from '../data/seo-content';
import { getImagePath } from '../utils/image-path';

interface GithubImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  variant?: 'thumb' | 'full';
  renderMode?: 'picture' | 'img';
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
  style,
  variant = 'full',
  renderMode = 'img'
}: GithubImageProps) {
  const resolvedSrc = getImagePath(src);

  const getLocalImagesPathFromAnyUrl = (input: string) => {
    const githubBase = "https://putrizahara-pro.github.io/Portfolio_Putri_Zahara";
    const basePathPrefix = "/Portfolio_Putri_Zahara";

    let p = input;
    if (p.startsWith(githubBase)) {
      p = p.substring(githubBase.length);
    }
    if (p.startsWith(basePathPrefix)) {
      p = p.substring(basePathPrefix.length);
    }
    if (!p.startsWith("/")) p = `/${p}`;
    return p;
  };

  const localPath = getLocalImagesPathFromAnyUrl(src);
  const lowerLocal = localPath.toLowerCase();
  const isOptimizable =
    lowerLocal.startsWith("/images/") &&
    (lowerLocal.endsWith(".jpg") || lowerLocal.endsWith(".jpeg") || lowerLocal.endsWith(".png"));

  const pickWidth = (v: 'thumb' | 'full') => {
    if (v === 'thumb') return 640;
    return priority ? 1920 : 1600;
  };

  const width = pickWidth(variant);
  const optimizedSrc = isOptimizable
    ? getImagePath(
        localPath
          .replace(/^\/images\//i, `/images/optimized/`)
          .replace(/\.(png|jpe?g)$/i, `_${width}.webp`)
      )
    : undefined;

  const [activeSrc, setActiveSrc] = useState(optimizedSrc || resolvedSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImgError = () => {
    if (activeSrc !== resolvedSrc) setActiveSrc(resolvedSrc);
  };

  // Fix for hydration race condition: image may 404 before React attaches onError
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && activeSrc !== resolvedSrc) {
      setActiveSrc(resolvedSrc);
    }
  }, []);

  // Récupérer les données SEO pour cette image si disponibles
  const seoData = getImageSEO(src);

  // Utiliser l'alt text SEO optimisé si disponible, sinon l'alt fourni
  const optimizedAlt = seoData?.alt || alt;
  const imageTitle = seoData?.title || alt;

  if (renderMode === 'img') {
    return (
      <img
        ref={imgRef}
        src={activeSrc}
        onError={handleImgError}
        alt={optimizedAlt}
        title={imageTitle}
        className={className}
        style={style}
        onClick={onClick}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        itemProp="image"
        {...(seoData?.description && { 'data-description': seoData.description })}
        {...(seoData?.keywords && { 'data-keywords': seoData.keywords.join(', ') })}
      />
    );
  }

  return (
    <picture>
      {optimizedSrc && <source srcSet={optimizedSrc} type="image/webp" />}
      <img
        src={resolvedSrc}
        alt={optimizedAlt}
        title={imageTitle}
        className={className}
        style={style}
        onClick={onClick}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        itemProp="image"
        {...(seoData?.description && { 'data-description': seoData.description })}
        {...(seoData?.keywords && { 'data-keywords': seoData.keywords.join(', ') })}
      />
    </picture>
  );
}
