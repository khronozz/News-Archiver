/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.toString().replace('https://', ''),
      },
    ],
  },
}

module.exports = nextConfig
