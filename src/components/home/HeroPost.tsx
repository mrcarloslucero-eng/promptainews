/**
 * HeroPost.tsx
 *
 * Full-width featured post section at the top of the homepage.
 *
 * Layout (desktop):
 *   ┌───────────��──────────────────────────────────────────────────────���───┐
 *   │  [Category badge]                                                    │
 *   │  Title — large, bold, 2 lines max                                    │
 *   │  Excerpt — 3 lines max                                               │
 *   │  [Date]  ·  Read the summary →                                      │
 *   ���────────────────��─────────────────────────────���───────────────────────┘
 *
 * A subtle left border in the category color anchors the hero visually.
 * Server component — no client JS.
 */

import Link                from 'next/link'
import { CategoryBadge }   from '@/components/ui/CategoryBadge'
import { HeroAuthorBadge } from './HeroAuthorBadge'
import { formatDate }      from '@/lib/utils'
import type { PostCard }   from '@/types'

interface HeroPostProps {
  post: PostCard
}

export function HeroPost({ post }: HeroPostProps) {
  const { title, slug, category, excerpt, publishDate, youtubeUrl } = post
  const href = `/posts/${slug.current}`

  return (
    <section
      aria-labelledby="hero-post-heading"
      className="w-full rounded-2xl overflow-hidden border relative"
      style={{ borderColor: 'var(--pan-border)' }}
    >
      {/* ── Background image ────────���───────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:    'url(/hero-bg.avif)',
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          zIndex:             0,
        }}
      />

      {/* ── Overlay — darken slightly so text stays readable ────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10,20,50,0.55) 0%, rgba(20,50,110,0.45) 60%, rgba(74,144,217,0.20) 100%)',
          zIndex: 1,
        }}
        aria-hidden
      />

      {/* ── Category color bar ───────────────────────────────────��──── */}
      <div
        className="h-1.5 w-full relative"
        style={{ backgroundColor: category?.color ?? '#4A90D9', zIndex: 2 }}
        aria-hidden
      />

      <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-4 relative" style={{ zIndex: 2 }}>

        {/* Badge row */}
        <div className="flex items-center gap-3">
          {category && <CategoryBadge category={category} />}
          {youtubeUrl && (
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase"
              style={{ color: '#E53E3E', backgroundColor: '#E53E3E1f' }}
            >
              Video
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          id="hero-post-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ color: '#ffffff' }}
        >
          <Link
            href={href}
            className="transition-colors hover:opacity-85"
          >
            {title}
          </Link>
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-base sm:text-lg leading-relaxed line-clamp-3 max-w-3xl"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
          <div className="flex items-center gap-6 flex-wrap">
            {publishDate && (
              <time
                dateTime={publishDate}
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {formatDate(publishDate)}
              </time>
            )}

            <Link
              href={href}
              className="text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#4A90D9' }}
            >
              Read the summary →
            </Link>
          </div>

          <HeroAuthorBadge slug={slug.current} />
        </div>

      </div>
    </section>
  )
}
