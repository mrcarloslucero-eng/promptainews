'use client'

/**
 * ShareButtons.tsx
 *
 * Client component — three share actions for a post:
 *   [Copy link]  [Share on X]  [Share on LinkedIn]
 *
 * Uses usePathname() to build the full URL without hard-coding the domain.
 * NEXT_PUBLIC_SITE_URL from .env.local is the base; falls back to
 * https://promptainews.com if not set.
 */

import { useState }    from 'react'
import { usePathname } from 'next/navigation'

// ─── Icons ────────────────────────────────────────────────────────────────────

function LinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ShareButtonsProps {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'
  const fullUrl = `${siteUrl}${pathname}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available — silently fail
    }
  }

  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`

  const btnBase = [
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold',
    'border transition-colors',
  ].join(' ')

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="text-xs font-semibold uppercase tracking-wider mr-1"
        style={{ color: 'var(--pan-muted)' }}
      >
        Share
      </span>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className={btnBase}
        style={{
          color:           copied ? '#2ECC71' : 'var(--pan-muted)',
          borderColor:     'var(--pan-border)',
          backgroundColor: 'var(--pan-surface)',
        }}
        aria-label="Copy article link to clipboard"
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>

      {/* X / Twitter */}
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        style={{
          color:           'var(--pan-muted)',
          borderColor:     'var(--pan-border)',
          backgroundColor: 'var(--pan-surface)',
        }}
        aria-label="Share on X (Twitter)"
      >
        <XIcon />
        Share on X
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        style={{
          color:           'var(--pan-muted)',
          borderColor:     'var(--pan-border)',
          backgroundColor: 'var(--pan-surface)',
        }}
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon />
        LinkedIn
      </a>
    </div>
  )
}
