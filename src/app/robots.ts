/**
 * app/robots.ts
 *
 * Generates /robots.txt.
 *
 * Rules:
 *   - All crawlers: allow everything except /studio
 *   - Sitemap pointer: /sitemap.xml
 */

import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    '/',
        disallow: ['/studio', '/studio/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
