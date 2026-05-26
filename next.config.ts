import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove the X-Powered-By: Next.js header — minor security hardening
  poweredByHeader: false,

  images: {
    // Sanity CDN — ready for when image fields are added to schemas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
