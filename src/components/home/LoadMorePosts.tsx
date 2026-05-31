'use client'

/**
 * LoadMorePosts.tsx
 *
 * Infinite scroll — automatically loads the next batch of posts as the
 * user scrolls near the bottom of the page. Uses IntersectionObserver
 * to detect when the sentinel div enters the viewport.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { PostCard }              from './PostCard'
import type { PostCard as PostCardType } from '@/types'

interface LoadMorePostsProps {
  featuredId:  string
  initialSkip: number
}

const LIMIT = 6

export function LoadMorePosts({ featuredId, initialSkip }: LoadMorePostsProps) {
  const [posts,   setPosts]   = useState<PostCardType[]>([])
  const [skip,    setSkip]    = useState(initialSkip)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const sentinelRef           = useRef<HTMLDivElement>(null)
  const loadingRef            = useRef(false)   // ref copy to avoid stale closure in observer

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)

    try {
      const res = await fetch(
        `/api/posts?skip=${skip}&limit=${LIMIT}&featuredId=${encodeURIComponent(featuredId)}`
      )
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()

      setPosts(prev => [...prev, ...data.posts])
      setSkip(prev  => prev + data.posts.length)
      setHasMore(data.hasMore)
    } catch {
      // silently fail — user can scroll again to retry
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [skip, featuredId, hasMore])

  // Attach IntersectionObserver to the sentinel div
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' }   // start loading 200px before the sentinel is visible
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
      {/* Appended post cards */}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Sentinel + loading indicator */}
      <div ref={sentinelRef} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center gap-2" style={{ color: 'var(--pan-muted)' }}>
            <svg
              className="animate-spin"
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span className="text-sm">Loading more articles…</span>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
            You&apos;re all caught up.
          </p>
        )}
      </div>
    </>
  )
}
