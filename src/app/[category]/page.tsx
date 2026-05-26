/**
 * app/[category]/page.tsx  —  Category archive page  (async server component)
 *
 * Handles all three category routes:
 *   /commentary    — Commentary
 *   /interviews    — Interviews
 *   /career-corner — Career Corner
 *
 * Static routes defined elsewhere (e.g. /studio, /about) take precedence
 * over this dynamic segment — Next.js resolves them before reaching here.
 *
 * Data fetched in parallel per request (ISR, revalidate 60s):
 *   1. Category by slug — title, color
 *   2. Posts for that category — ordered newest first
 *
 * 404s if no category with the given slug exists in Sanity.
 *
 * generateStaticParams — pre-renders all known category slugs at build time.
 * generateMetadata     — per-category <title> / og:title.
 */

import { notFound }           from 'next/navigation'
import type { Metadata }       from 'next'
import { client }              from '@/lib/sanity.client'
import { getCategoryBySlug }   from '@/lib/sanity.fetchers'
import {
  POSTS_BY_CATEGORY_QUERY,
  ALL_CATEGORIES_QUERY,
}                              from '@/lib/sanity.queries'
import { CategoryHeader, CategoryFeed } from '@/components/category'
import type { Category, PostCard }      from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'

// ─── ISR ──────────────────────────────────────────────────────────────────────

export const revalidate = 60

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const categories = await client.fetch<Category[]>(ALL_CATEGORIES_QUERY)
  return categories.map(({ slug }) => ({ category: slug.current }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)   // memoised

  if (!category) return { title: 'Category Not Found' }

  const categoryUrl = `${SITE_URL}/${slug}`

  return {
    title:       category.title,
    description: `Browse all ${category.title} articles on Prompt AI News — AI news explained for everyday people.`,
    alternates:  { canonical: categoryUrl },
    openGraph: {
      title:       `${category.title} | Prompt AI News`,
      description: `Browse all ${category.title} articles on Prompt AI News.`,
      url:         categoryUrl,
      type:        'website',
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params

  // Memoised category + posts fetched in parallel
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    client.fetch<PostCard[]>(POSTS_BY_CATEGORY_QUERY, { categorySlug: slug }),
  ])

  // Unknown category slug → clean 404
  if (!category) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
      <CategoryHeader category={category} postCount={posts.length} />
      <CategoryFeed   category={category} posts={posts} />
    </div>
  )
}
