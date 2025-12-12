// Script pour basculer vers la configuration locale
const fs = require('fs');
const path = require('path');

// Configuration locale (pas de basePath ni d'assetPrefix)
const localConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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

// Écrire la configuration locale dans next.config.js
fs.writeFileSync(path.join(__dirname, '..', 'next.config.js'), localConfig);
console.log('🚀 Configuration locale appliquée ! Les chemins d\'images seront relatifs.');
