/** @type {import('next').NextConfig} */
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
  // Assurez-vous que tous les fichiers publics sont copiés
  distDir: 'out',
  assetPrefix: '/Portfolio_Putri_Zahara',
}

module.exports = nextConfig
