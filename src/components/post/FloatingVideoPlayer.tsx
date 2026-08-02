'use client'

/**
 * FloatingVideoPlayer.tsx
 *
 * Floating video widget for Carlos's on-camera story commentary.
 * Fixed bottom-right so the viewer can watch while reading the article.
 *
 * Behavior:
 *   - Always visible when the post has a videoFile (no query param needed)
 *   - Native controls — viewer presses play; no autoplay
 *   - Minimize collapses it to a small pill; close removes it entirely
 *   - Sized generously (~400px wide on desktop, full-width minus margins on phones)
 */

import Image from 'next/image'
import { useState } from 'react'

interface FloatingVideoPlayerProps {
  videoUrl: string
  title:    string
}

export function FloatingVideoPlayer({ videoUrl, title }: FloatingVideoPlayerProps) {
  const [visible,   setVisible]   = useState(true)
  const [minimized, setMinimized] = useState(false)

  if (!visible) return null

  // ── Minimized pill ──────────────────────────────────────────────
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        aria-label="Reopen video commentary"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full shadow-xl transition-transform hover:scale-105"
        style={{
          background: 'var(--pan-surface)',
          border:     '1px solid var(--pan-border)',
          boxShadow:  '0 8px 32px rgba(0,0,0,0.18)',
        }}
      >
        <span
          className="rounded-full overflow-hidden"
          style={{ width: '2.25rem', height: '2.25rem', display: 'block' }}
        >
          <Image
            src="/profile-pic.png"
            alt="Carlos Lucero"
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--pan-body)' }}>
          Watch commentary
        </span>
      </button>
    )
  }

  // ── Full widget ─────────────────────────────────────────────────
  return (
    <div
      className="fixed bottom-6 right-6 z-50 rounded-2xl overflow-hidden shadow-xl"
      style={{
        width:      'min(400px, calc(100vw - 3rem))',
        background: 'var(--pan-surface)',
        border:     '1px solid var(--pan-border)',
        boxShadow:  '0 8px 32px rgba(0,0,0,0.18)',
      }}
    >
      {/* Header — photo, label, minimize + close */}
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span
          className="rounded-full overflow-hidden flex-shrink-0"
          style={{
            width:     '2.5rem',
            height:    '2.5rem',
            boxShadow: '0 0 0 2px var(--pan-border)',
            display:   'block',
          }}
        >
          <Image
            src="/profile-pic.png"
            alt="Carlos Lucero"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </span>

        <span className="flex flex-col items-start leading-snug min-w-0">
          <span className="text-sm font-semibold" style={{ color: 'var(--pan-body)' }}>
            Carlos Lucero
          </span>
          <span className="text-xs" style={{ color: '#4A90D9' }}>
            Video commentary
          </span>
        </span>

        <span className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setMinimized(true)}
            aria-label="Minimize video"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-black/10"
            style={{ color: 'var(--pan-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="4" y="11" width="16" height="2.5" rx="1.25" />
            </svg>
          </button>
          <button
            onClick={() => setVisible(false)}
            aria-label="Close video"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-red-50"
            style={{ color: 'var(--pan-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </span>
      </div>

      {/* Video — natural aspect ratio, capped height for portrait clips */}
      <video
        src={videoUrl}
        title={title}
        controls
        playsInline
        preload="metadata"
        className="block w-full"
        style={{ maxHeight: '55vh', background: '#000' }}
      />
    </div>
  )
}
