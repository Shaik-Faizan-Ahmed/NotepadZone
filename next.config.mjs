/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // okay to keep if you're not strict on code style
  },
  // ❌ REMOVE this block to catch real TypeScript bugs
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    unoptimized: true, // good for simple hosting like Vercel without Next/Image optimization
  },
  experimental: {
    serverActions: true, // keep this if you're planning to use Server Actions
  },
}

export default nextConfig
