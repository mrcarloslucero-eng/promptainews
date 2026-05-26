/**
 * not-found.tsx  —  Global 404 page
 *
 * Rendered automatically by Next.js when notFound() is called anywhere,
 * or when no route matches the requested URL.
 *
 * Server component — no client JS needed.
 */

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-32 gap-6">

      {/* Status code */}
      <p
        className="text-8xl font-bold leading-none"
        style={{ color: '#4A90D9' }}
        aria-hidden
      >
        404
      </p>

      {/* Heading */}
      <h1
        className="text-2xl font-bold"
        style={{ color: 'var(--pan-body)' }}
      >
        Page not found
      </h1>

      {/* Message */}
      <p
        className="text-base max-w-sm"
        style={{ color: 'var(--pan-muted)' }}
      >
        The page you're looking for doesn't exist or may have moved.
      </p>

      {/* Home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
        style={{ background: '#4A90D9', color: '#FFFFFF' }}
      >
        ← Back to home
      </Link>

    </div>
  )
}
