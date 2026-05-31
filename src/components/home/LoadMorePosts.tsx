'use client'

/**
 * LoadMorePosts.tsx
 *
 * Client component that renders the Load More button and appends
 * additional post cards to the grid when clicked.
 *
 * Sits below the initial server-rendered PostGrid on the homepage.
 * Fetches from /api/posts with skip/limit pagination.
 */

import { useState, useCallback } from 'react'
import { PostCard }              from './PostCard'
import type { PostCard as PostCardType } from '@/types'

interface LoadMorePostsProps {
  featuredId: string
  initialSkip: number   // how many posts were already rendered server-side
}

export function LoadMorePosts({ featuredId, initialSkip }: LoadMorePostsProps) {
  const [posts,    setPosts]    = useState<PostCardType[]>([])
  const [skip,     setSkip]     = useState(initialSkip)
  const [hasMore,  setHasMore]  = useState(true)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const LIMIT = 6

  const loadMore = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `/api/posts?skip=${skip}&limit=${LIMIT}&featuredId=${encodeURIComponent(featuredId)}`
      )
      if (!res.ok) throw new Error('Failed to load posts')

      const data = await res.json()
      setPosts(prev => [...prev, ...data.posts])
      setSkip(prev => prev + data.posts.length)
      setHasMore(data.hasMore)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [skip, featuredId, loading])

  // Nothing to show and no more to load
  if (posts.length === 0 && !hasMore) return null

  return (
    <>
      {/* Additional post cards appended below the initial grid */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Load More button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:  loading ? 'var(--pan-border)' : '#4A90D9',
              color:       '#ffffff',
            }}
          >
            {loading ? 'Loading…' : 'Load More Articles'}
          </button>
        </div>
      )}

      {/* All caught up message */}
      {!hasMore && posts.length > 0 && (
        <p
          className="text-center text-sm mt-8"
          style={{ color: 'var(--pan-muted)' }}
        >
          You&apos;re all caught up.
        </p>
      )}

      {error && (
        <p className="text-center text-sm mt-4" style={{ color: '#E53E3E' }}>
          {error}
        </p>
      )}
    </>
  )
}
