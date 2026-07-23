/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/home/methebilalashiq/Music/career-hub-pro',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
