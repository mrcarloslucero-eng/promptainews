'use client'

/**
 * CommentList.tsx
 *
 * Displays approved comments for a post with collapsible behavior.
 * First 3 comments visible, rest hidden behind "Show all" toggle.
 *
 * ── WHY CLIENT COMPONENT ──────────────────────────────────────────────
 * The expand/collapse toggle needs useState — so this is a client component
 * even though it receives its data as a prop (server-fetched in the post page).
 * This is the correct Next.js App Router pattern:
 *   - Server component fetches the data
 *   - Passes it as a prop to a client component for interactivity
 * The data fetch is free (server-side, cached). Only the toggle logic
 * runs in the browser.
 */

import { useState }  from 'react'
import { formatDate } from '@/lib/utils'

interface Comment {
  _id:        string
  name:       string
  message:    string
  _createdAt: string
}

interface CommentListProps {
  comments: Comment[]
}

const PREVIEW_COUNT = 3

export function CommentList({ comments }: CommentListProps) {
  const [expanded, setExpanded] = useState(false)

  if (comments.length === 0) return null

  const visible  = expanded ? comments : comments.slice(0, PREVIEW_COUNT)
  const overflow = comments.length - PREVIEW_COUNT

  return (
    <div className="flex flex-col gap-4">

      {visible.map((comment) => (
        <div
          key={comment._id}
          className="rounded-xl border px-5 py-4 flex flex-col gap-2"
          style={{
            background:  'var(--pan-surface)',
            borderColor: 'var(--pan-border)',
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold" style={{ color: 'var(--pan-body)' }}>
              {comment.name}
            </span>
            <time
              className="text-xs"
              style={{ color: 'var(--pan-muted)' }}
              dateTime={comment._createdAt}
            >
              {formatDate(comment._createdAt)}
            </time>
          </div>

          {/* Message */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            {comment.message}
          </p>
        </div>
      ))}

      {/* Expand / collapse toggle */}
      {overflow > 0 && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="self-start text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#4A90D9' }}
        >
          {expanded
            ? 'Show fewer comments ↑'
            : `Show all ${comments.length} comments ↓`}
        </button>
      )}

    </div>
  )
}
