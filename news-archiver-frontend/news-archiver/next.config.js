/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rtcihmjmsivcleqhnffx.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
