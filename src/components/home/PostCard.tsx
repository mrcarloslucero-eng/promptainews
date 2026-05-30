/**
 * PostCard.tsx
 *
 * A single article card used in the homepage grid and category feeds.
 *
 * Layout:
 *   ┌──────────────────────────────┐
 *   │  [Category badge]  [▶ Video] │
 *   │  Title                       │
 *   │  Excerpt (3-line clamp)      │
 *   │  Date          Read more →   │
 *   └──────────────────────────────┘
 *
 * Server component — no client JS.
 */

import Link              from 'next/link'
import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { formatDate }    from '@/lib/utils'
import type { PostCard as PostCardType } from '@/types'

interface PostCardProps {
  post: PostCardType
}

export function PostCard({ post }: PostCardProps) {
  const { title, slug, category, excerpt, publishDate, youtubeUrl } = post
  const isCommentary = category?.slug?.current === 'commentary'
  const href = `/posts/${slug.current}${isCommentary ? '?listen=1' : ''}`

  return (
    <article
      className="flex flex-col rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      {/* Thin top accent bar using category color */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ backgroundColor: category?.color ?? '#4A90D9' }}
        aria-hidden
      />

      <div className="flex flex-col flex-1 gap-3 px-5 py-5">

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {category && <CategoryBadge category={category} />}
          {youtubeUrl && (
            <span
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase"
              style={{ color: '#E53E3E', backgroundColor: '#E53E3E1f' }}
            >
              Video
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className="text-lg font-bold leading-snug line-clamp-2"
          style={{ color: 'var(--pan-body)' }}
        >
          <Link
            href={href}
            className="hover:text-brand-blue transition-colors"
          >
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: 'var(--pan-muted)' }}
          >
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 mt-auto">
          {publishDate && (
            <time
              dateTime={publishDate}
              className="text-xs"
              style={{ color: 'var(--pan-muted)' }}
            >
              {formatDate(publishDate)}
            </time>
          )}

          <Link
            href={href}
            className="text-xs font-semibold transition-colors hover:opacity-80 ml-auto"
            style={{ color: '#4A90D9' }}
            aria-label={`Read more: ${title}`}
          >
            Read more →
          </Link>
        </div>

      </div>
    </article>
  )
}
