// Script pour basculer vers la configuration GitHub Pages
const fs = require('fs');
const path = require('path');

// Configuration GitHub Pages (avec basePath et assetPrefix)
const githubConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Portfolio_Putri_Zahara',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: 'out',
  assetPrefix: '/Portfolio_Putri_Zahara',
}

module.exports = nextConfig
`;

// Écrire la configuration GitHub Pages dans next.config.js
fs.writeFileSync(path.join(__dirname, '..', 'next.config.js'), githubConfig);
console.log('🚀 Configuration GitHub Pages appliquée ! Les chemins incluent le préfixe /Portfolio_Putri_Zahara.');
