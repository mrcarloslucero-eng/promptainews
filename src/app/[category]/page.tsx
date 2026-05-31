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

      {/* ── DotCreds sponsor banner — Career Corner only ─────────── */}
      {slug === 'career-corner' && (
        <a
          href="https://dotcreds.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-between gap-6
                     rounded-2xl border px-8 py-7 transition-opacity hover:opacity-90"
          style={{
            background:   'linear-gradient(135deg, #0d1f40 0%, #1a3a6b 100%)',
            borderColor:  '#4A90D9',
          }}
        >
          {/* Left — text */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#4A90D9' }}
            >
              Official Sponsor
            </span>
            <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
              Advance your career with AI certifications
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Earn credentials that prove your AI skills — powered by DotCreds.com
            </p>
          </div>

          {/* Right — CTA button */}
          <div
            className="flex-shrink-0 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
            style={{
              background: '#4A90D9',
              color:      '#ffffff',
            }}
          >
            Visit DotCreds.com →
          </div>
        </a>
      )}

      <CategoryFeed category={category} posts={posts} />
    </div>
  )
}
