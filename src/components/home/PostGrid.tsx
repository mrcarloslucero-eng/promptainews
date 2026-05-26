/**
 * PostGrid.tsx
 *
 * "Latest Articles" section — a responsive 3-column card grid.
 *
 * Renders nothing if the posts array is empty.
 * Server component — no client JS.
 */

import { PostCard }    from './PostCard'
import type { PostCard as PostCardType } from '@/types'

interface PostGridProps {
  posts: PostCardType[]
}

export function PostGrid({ posts }: PostGridProps) {
  if (!posts.length) return null

  return (
    <section aria-labelledby="latest-articles-heading">

      {/* Section heading */}
      <div className="flex items-center gap-4 mb-6">
        <h2
          id="latest-articles-heading"
          className="text-2xl font-bold"
          style={{ color: 'var(--pan-body)' }}
        >
          Latest Articles
        </h2>
        {/* Decorative rule */}
        <div
          className="flex-1 h-px"
          style={{ background: 'var(--pan-border)' }}
          aria-hidden
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

    </section>
  )
}
