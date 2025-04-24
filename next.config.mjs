/** @type {import('next').NextConfig} */
const isGitHubAction = process.env.GITHUB_ACTIONS === 'true'
const nextConfig = {
  output: 'export',
  basePath: isGitHubAction ? '/Portfolio_Putri_Zahara' : '',
  assetPrefix: isGitHubAction ? '/Portfolio_Putri_Zahara/' : '',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
