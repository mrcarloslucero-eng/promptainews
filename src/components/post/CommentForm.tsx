'use client'

/**
 * CommentForm.tsx
 *
 * The form visitors use to leave a comment on a post.
 *
 * ── WHY THIS IS A CLIENT COMPONENT ───────────────────────────────────
 * Anything interactive in Next.js App Router needs 'use client' at the top.
 * useState, event handlers, form submission — all client-side behavior.
 * The post page itself is a server component; this form is the one piece
 * that runs in the browser.
 *
 * ── OPTIMISTIC UI ─────────────────────────────────────────────────────
 * We show "Comment submitted!" immediately after the API responds, without
 * waiting for the comment to appear on the page (it won't until Carlos
 * approves it). This is called optimistic UI — we assume success and
 * give instant feedback. Honest message: "pending review" so the visitor
 * knows what to expect.
 */

import { useState, FormEvent } from 'react'

interface CommentFormProps {
  postId:    string
  postTitle: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function CommentForm({ postId, postTitle }: CommentFormProps) {
  const [name,    setName]    = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setError(null)

    try {
      // POST to our own API route — never directly to Sanity or TextBelt
      const res = await fetch('/api/comments', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, message, postId, postTitle }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      setName('')
      setMessage('')
    } catch {
      setError('Could not submit comment. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-xl border px-6 py-8 text-center flex flex-col gap-2"
        style={{ background: 'var(--pan-surface)', borderColor: '#4A90D9' }}
      >
        <span style={{ fontSize: '2rem' }}>🙌</span>
        <p className="font-bold text-lg" style={{ color: 'var(--pan-body)' }}>
          Thanks for commenting!
        </p>
        <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
          Your comment is pending review and will appear shortly once approved.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#4A90D9' }}
        >
          Leave another comment
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="comment-name"
          className="text-sm font-semibold"
          style={{ color: 'var(--pan-body)' }}
        >
          Your name
        </label>
        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Johnson"
          maxLength={80}
          required
          disabled={status === 'submitting'}
          className="rounded-lg px-4 py-2.5 text-sm outline-none transition-colors
                     focus:ring-2 focus:ring-[#4A90D9] disabled:opacity-50"
          style={{
            background:   'var(--pan-bg)',
            border:       '1px solid var(--pan-border)',
            color:        'var(--pan-body)',
          }}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="comment-message"
          className="text-sm font-semibold"
          style={{ color: 'var(--pan-body)' }}
        >
          Comment
        </label>
        <textarea
          id="comment-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts…"
          rows={4}
          maxLength={1000}
          required
          disabled={status === 'submitting'}
          className="rounded-lg px-4 py-2.5 text-sm outline-none transition-colors resize-none
                     focus:ring-2 focus:ring-[#4A90D9] disabled:opacity-50"
          style={{
            background: 'var(--pan-bg)',
            border:     '1px solid var(--pan-border)',
            color:      'var(--pan-body)',
          }}
        />
        <span className="text-xs text-right" style={{ color: 'var(--pan-muted)' }}>
          {message.length}/1000
        </span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm rounded-lg px-4 py-2" style={{ color: '#E53E3E', background: '#E53E3E1a' }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting' || !name.trim() || !message.trim()}
        className="self-start px-6 py-2.5 rounded-xl text-sm font-bold
                   transition-all hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: '#4A90D9', color: '#ffffff' }}
      >
        {status === 'submitting' ? 'Submitting…' : 'Post Comment'}
      </button>

    </form>
  )
}
