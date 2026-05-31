/**
 * app/page.tsx  —  Homepage  (async server component)
 *
 * Data fetched in parallel:
 *   1. Featured post (hero)
 *   2. Latest posts grid (excludes featured post, max 6)
 *   3. Latest video post (for LatestEpisode embed)
 *   4. Site settings (partner banner + social callout)
 *
 * Section order:
 *   [HeroPost]
 *   [PostGrid]
 *   [LatestEpisode]   — only if a video post exists
 *   [PartnerBanner]   — only if partner is configured
 *   [SocialCallout]   — only if social links are configured
 */

import { client }               from '@/lib/sanity.client'
import {
  FEATURED_POST_QUERY,
  LATEST_POSTS_QUERY,
  LATEST_VIDEO_QUERY,
  SITE_SETTINGS_QUERY,
}                               from '@/lib/sanity.queries'
import {
  HeroPost,
  PostGrid,
  LatestEpisode,
  PartnerBanner,
  SocialCallout,
}                               from '@/components/home'
import { LoadMorePosts }        from '@/components/home/LoadMorePosts'
import { JsonLd }               from '@/components/seo/JsonLd'
import type { PostCard, SiteSettings } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'

// Revalidate homepage data every 60 seconds (ISR)
export const revalidate = 60

export default async function HomePage() {
  // Fetch all data in parallel — one round-trip to Sanity
  const [featuredPost, latestVideo, siteSettings] = await Promise.all([
    client.fetch<PostCard | null>(FEATURED_POST_QUERY),
    client.fetch<PostCard | null>(LATEST_VIDEO_QUERY),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ])

  // Fetch grid posts after we know the featured ID (to exclude it)
  const latestPosts = await client.fetch<PostCard[]>(
    LATEST_POSTS_QUERY,
    {
      featuredId: featuredPost?._id ?? '',
      limit:      6,
    },
  )

  // ── JSON-LD — WebSite structured data ──────────────────────────────────────
  const websiteSchema = {
    '@context':       'https://schema.org',
    '@type':          'WebSite',
    name:             'Prompt AI News',
    description:      'AI News for Everyday People',
    url:              SITE_URL,
    inLanguage:       'en-US',
    publisher: {
      '@type': 'Organization',
      name:    'Prompt AI News',
      url:     SITE_URL,
    },
  }

  return (
    <>
    <JsonLd data={websiteSchema} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-14">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      {featuredPost && <HeroPost post={featuredPost} />}

      {/* ── Latest Articles grid ─────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <>
          <PostGrid posts={latestPosts} />
          <LoadMorePosts
            featuredId={featuredPost?._id ?? ''}
            initialSkip={latestPosts.length + 1}
          />
        </>
      )}

      {/* ── Empty state — no content yet ─────────────────────────── */}
      {!featuredPost && latestPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            Coming Soon
          </p>
          <p
            className="text-base max-w-sm"
            style={{ color: 'var(--pan-muted)' }}
          >
            Articles are on their way. Check back shortly or follow us on
            social media for updates.
          </p>
        </div>
      )}

      {/* ── Latest Episode ───────────────────────────────────────── */}
      <LatestEpisode post={latestVideo} />

      {/* ── Partner Banner ───────────────────────────────────────── */}
      <PartnerBanner siteSettings={siteSettings} />

      {/* ── Social Callout ───────────────────────────────────────── */}
      <SocialCallout siteSettings={siteSettings} />

    </div>
    </>
  )
}
