/** @type {import('next').NextConfig} */
const isGitHubAction = process.env.GITHUB_ACTIONS === 'true'
const nextConfig = {
  output: 'export',
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
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
