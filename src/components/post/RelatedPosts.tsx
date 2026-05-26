/**
 * RelatedPosts.tsx
 *
 * "More in [Category]" section — up to 3 cards from the same category.
 * Uses the shared PostCard component from the home components.
 * Renders nothing if the array is empty.
 *
 * Server component — no client JS.
 */

import Link      from 'next/link'
import { PostCard } from '@/components/home/PostCard'
import type { PostCard as PostCardType, Category } from '@/types'

interface RelatedPostsProps {
  posts:    PostCardType[]
  category: Category
}

export function RelatedPosts({ posts, category }: RelatedPostsProps) {
  if (!posts.length) return null

  const categoryHref = `/${category.slug.current}`

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="border-t pt-12"
      style={{ borderColor: 'var(--pan-border)' }}
    >
      {/* Section heading */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2
          id="related-posts-heading"
          className="text-xl font-bold"
          style={{ color: 'var(--pan-body)' }}
        >
          More in{' '}
          <Link
            href={categoryHref}
            className="hover:opacity-80 transition-opacity"
            style={{ color: category.color ?? '#4A90D9' }}
          >
            {category.title}
          </Link>
        </h2>

        <Link
          href={categoryHref}
          className="text-sm font-semibold transition-colors hover:opacity-80 whitespace-nowrap"
          style={{ color: '#4A90D9' }}
        >
          View all →
        </Link>
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
