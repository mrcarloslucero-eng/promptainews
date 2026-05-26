/**
 * HeroPost.tsx
 *
 * Full-width featured post section at the top of the homepage.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────────────────────────────────────────┐
 *   │  [Category badge]                                                    │
 *   │  Title — large, bold, 2 lines max                                    │
 *   │  Excerpt — 3 lines max                                               │
 *   │  [Date]  ·  Read the full article →                                 │
 *   └──────────────────────────────────────────────────────────────────────┘
 *
 * A subtle left border in the category color anchors the hero visually.
 * Server component — no client JS.
 */

import Link              from 'next/link'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { formatDate }    from '@/lib/utils'
import type { PostCard } from '@/types'

interface HeroPostProps {
  post: PostCard
}

export function HeroPost({ post }: HeroPostProps) {
  const { title, slug, category, excerpt, publishDate, youtubeUrl } = post
  const href = `/posts/${slug.current}`

  return (
    <section
      aria-labelledby="hero-post-heading"
      className="w-full rounded-2xl overflow-hidden border"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      {/* ── Category color bar ──────────────────────────────────────── */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: category?.color ?? '#4A90D9' }}
        aria-hidden
      />

      <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-4">

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
          style={{ color: 'var(--pan-body)' }}
        >
          <Link
            href={href}
            className="hover:text-brand-blue transition-colors"
          >
            {title}
          </Link>
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-base sm:text-lg leading-relaxed line-clamp-3 max-w-3xl"
            style={{ color: 'var(--pan-muted)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center gap-6 flex-wrap pt-1">
          {publishDate && (
            <time
              dateTime={publishDate}
              className="text-sm"
              style={{ color: 'var(--pan-muted)' }}
            >
              {formatDate(publishDate)}
            </time>
          )}

          <Link
            href={href}
            className="text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: '#4A90D9' }}
          >
            Read the full article →
          </Link>
        </div>

      </div>
    </section>
  )
}
