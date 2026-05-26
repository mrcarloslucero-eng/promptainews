/**
 * PostHeader.tsx
 *
 * Displays post metadata above the article body:
 *   [Category badge]  [▶ Video badge if applicable]
 *   H1 Title
 *   By [Author]  ·  [Date]  ·  [N min read]
 *   [tag] [tag] [tag] …
 *
 * Server component — no client JS.
 */

import { CategoryBadge } from '@/components/ui/CategoryBadge'
import { formatDate, readingTime } from '@/lib/utils'
import type { Post } from '@/types'
import type { PortableTextBlock } from 'next-sanity'

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  const { title, category, author, publishDate, youtubeUrl, body, tags } = post

  // Body could be empty on a draft; default to 0 words
  const mins = body?.length
    ? readingTime(
        body as unknown as Array<{
          _type: string
          children?: Array<{ text?: string }>
        }>,
      )
    : 1

  return (
    <header className="flex flex-col gap-4">

      {/* ── Badge row ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
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

      {/* ── Title ──────────────────────────────────────────────────── */}
      <h1
        className="text-3xl sm:text-4xl font-bold leading-tight"
        style={{ color: 'var(--pan-body)' }}
      >
        {title}
      </h1>

      {/* ── Meta row ───────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 text-sm flex-wrap"
        style={{ color: 'var(--pan-muted)' }}
      >
        {author && <span>By {author}</span>}
        {author && publishDate && (
          <span aria-hidden className="select-none">·</span>
        )}
        {publishDate && (
          <time dateTime={publishDate}>{formatDate(publishDate)}</time>
        )}
        <span aria-hidden className="select-none">·</span>
        <span>{mins} min read</span>
      </div>

      {/* ── Tags ───────────────────────────────────────────────────── */}
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-0.5 rounded-full text-xs"
              style={{
                color:           'var(--pan-muted)',
                backgroundColor: 'var(--pan-surface)',
                border:          '1px solid var(--pan-border)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

    </header>
  )
}
