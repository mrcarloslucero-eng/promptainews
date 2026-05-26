/**
 * app/sitemap.ts
 *
 * Dynamically generates /sitemap.xml.
 *
 * Includes:
 *   priority 1.0  — Homepage
 *   priority 0.8  — Individual post pages (most valuable for search)
 *   priority 0.7  — Category archive pages
 *   priority 0.5  — About page
 *
 * Next.js caches this route by default; it revalidates on the next build
 * or when ISR triggers (same cadence as the pages it describes).
 */

import type { MetadataRoute } from 'next'
import { client }             from '@/lib/sanity.client'
import {
  ALL_POST_SLUGS_QUERY,
  ALL_CATEGORIES_QUERY,
}                             from '@/lib/sanity.queries'
import type { Category }      from '@/types'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([
    client.fetch<Array<{ slug: string }>>(ALL_POST_SLUGS_QUERY),
    client.fetch<Category[]>(ALL_CATEGORIES_QUERY),
  ])

  const now = new Date()

  const postEntries: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url:             `${BASE}/posts/${slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map(({ slug }) => ({
    url:             `${BASE}/${slug.current}`,
    lastModified:    now,
    changeFrequency: 'daily',
    priority:        0.7,
  }))

  return [
    {
      url:             BASE,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        1.0,
    },
    ...categoryEntries,
    ...postEntries,
    {
      url:             `${BASE}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.5,
    },
  ]
}
