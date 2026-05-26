/**
 * CategoryFeed.tsx
 *
 * Article grid for a category archive page.
 * Identical grid layout to the homepage PostGrid but without a heading
 * (the CategoryHeader owns that responsibility on these pages).
 *
 * Empty state: shows a prompt to check back soon.
 * Server component — no client JS.
 */

import { PostCard } from '@/components/home/PostCard'
import type { PostCard as PostCardType, Category } from '@/types'

interface CategoryFeedProps {
  posts:    PostCardType[]
  category: Category
}

export function CategoryFeed({ posts, category }: CategoryFeedProps) {
  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <p
          className="text-lg font-semibold"
          style={{ color: 'var(--pan-body)' }}
        >
          No articles yet in {category.title}
        </p>
        <p
          className="text-sm max-w-xs"
          style={{ color: 'var(--pan-muted)' }}
        >
          Check back soon — new content is on the way.
        </p>
      </div>
    )
  }

  return (
    <section aria-label={`${category.title} articles`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
