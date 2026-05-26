/**
 * sanity.fetchers.ts
 *
 * React-cached wrappers around the most frequently called Sanity queries.
 *
 * Why this file exists:
 *   generateMetadata() and the page component both need the same document
 *   (e.g. the post for /posts/[slug]). Without cache(), each caller fires a
 *   separate network request to Sanity. React's cache() deduplicates them:
 *   the first caller fetches; every subsequent caller in the same request gets
 *   the memoised result at zero cost.
 *
 * Usage:
 *   import { getPostBySlug } from '@/lib/sanity.fetchers'
 *   const post = await getPostBySlug(slug)
 */

import { cache }   from 'react'
import { client }  from './sanity.client'
import {
  POST_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
}                  from './sanity.queries'
import type { Post, Category } from '@/types'

/**
 * Fetch a full post by slug.
 * Used by generateMetadata, the page component, and opengraph-image
 * in posts/[slug]/ — all share the same memoised result.
 */
export const getPostBySlug = cache(
  (slug: string) =>
    client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }),
)

/**
 * Fetch a category by its slug.current.
 * Used by generateMetadata and the page component in [category]/.
 */
export const getCategoryBySlug = cache(
  (slug: string) =>
    client.fetch<Category | null>(CATEGORY_BY_SLUG_QUERY, { slug }),
)
