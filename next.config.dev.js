/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing basePath, output:export and other static export configs for dev mode
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
