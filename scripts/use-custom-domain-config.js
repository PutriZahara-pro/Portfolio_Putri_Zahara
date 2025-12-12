// Script pour configurer Next.js avec un domaine personnalisé
const fs = require('fs');
const path = require('path');

// Configuration optimisée pour domaine personnalisé (sans basePath ni assetPrefix)
const customDomainConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: 'out',
}

module.exports = nextConfig
`;

// Écrire la configuration pour domaine personnalisé dans next.config.js
fs.writeFileSync(path.join(__dirname, '..', 'next.config.js'), customDomainConfig);
console.log('🚀 Configuration pour domaine personnalisé appliquée ! Les chemins sont relatifs à la racine du domaine.');
