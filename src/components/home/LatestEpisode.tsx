/**
 * LatestEpisode.tsx
 *
 * "Latest Episode" section — shows the most recent post that has a YouTube URL.
 * Renders nothing if no video post exists.
 *
 * Layout:
 *   Section heading
 *   ┌──────────────────────────────────────────────────────┐
 *   │  [16:9 YouTube embed]                                │
 *   │  [Category badge]                                    │
 *   │  Title                                               │
 *   │  Excerpt                Date · Watch the episode →  │
 *   └──────────────────────────────────────────────────────┘
 *
 * Server component — no client JS.
 */

import Link              from 'next/link'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { formatDate, getYouTubeId, youtubeEmbedUrl } from '@/lib/utils'
import type { PostCard } from '@/types'

interface LatestEpisodeProps {
  post: PostCard | null
}

export function LatestEpisode({ post }: LatestEpisodeProps) {
  if (!post?.youtubeUrl) return null

  const videoId = getYouTubeId(post.youtubeUrl)
  if (!videoId) return null

  const href   = `/posts/${post.slug.current}`
  const embedUrl = youtubeEmbedUrl(videoId)

  return (
    <section aria-labelledby="latest-episode-heading">

      {/* Section heading */}
      <div className="flex items-center gap-4 mb-6">
        <h2
          id="latest-episode-heading"
          className="text-2xl font-bold"
          style={{ color: 'var(--pan-body)' }}
        >
          Latest Episode
        </h2>
        <div
          className="flex-1 h-px"
          style={{ background: 'var(--pan-border)' }}
          aria-hidden
        />
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          background:  'var(--pan-surface)',
          borderColor: 'var(--pan-border)',
        }}
      >
        {/* 16:9 responsive embed */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        </div>

        {/* Post info */}
        <div className="px-6 py-6 flex flex-col gap-3">
          {post.category && <CategoryBadge category={post.category} />}

          <h3
            className="text-xl font-bold leading-snug"
            style={{ color: 'var(--pan-body)' }}
          >
            <Link
              href={href}
              className="hover:text-brand-blue transition-colors"
            >
              {post.title}
            </Link>
          </h3>

          {post.excerpt && (
            <p
              className="text-sm leading-relaxed line-clamp-2"
              style={{ color: 'var(--pan-muted)' }}
            >
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            {post.publishDate && (
              <time
                dateTime={post.publishDate}
                className="text-xs"
                style={{ color: 'var(--pan-muted)' }}
              >
                {formatDate(post.publishDate)}
              </time>
            )}

            <Link
              href={href}
              className="text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: '#4A90D9' }}
            >
              Watch the episode →
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}
