// Script pour configurer Next.js avec un domaine personnalisé et des chemins absolus
const fs = require('fs');
const path = require('path');

// Configuration pour domaine personnalisé avec chemins absolus
const customDomainConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '', 
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: 'out',
  // Environnement pour générer des URL absolues
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
}

module.exports = nextConfig
`;

// Écrire la configuration pour domaine personnalisé dans next.config.js
fs.writeFileSync(path.join(__dirname, '..', 'next.config.js'), customDomainConfig);
console.log('🚀 Configuration pour domaine personnalisé avec chemins absolus appliquée!');
