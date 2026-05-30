/**
 * utils.ts
 *
 * Shared utility functions used across the app.
 */

// ─── Plain-text extraction ────────────────────────────────────────────────────

/**
 * Extract plain text from a Portable Text body array for TTS or search use.
 */
export function extractPlainText(
  body: Array<{ _type: string; children?: Array<{ text?: string }> }>,
): string {
  return body
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children?.map((c) => c.text ?? '') ?? [])
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── Reading time ─────────────────────────────────────────────────────────────

/**
 * Estimate reading time in minutes from a Portable Text body array.
 * Counts words in all text nodes at ~200 wpm. Minimum 1 min.
 */
export function readingTime(
  body: Array<{ _type: string; children?: Array<{ text?: string }> }>,
): number {
  const words = body
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children?.map((c) => c.text ?? '') ?? [])
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

// ─── Date formatting ─────────────────────────────────────────────────────────

/**
 * Format an ISO date string into a readable label.
 * e.g. "2024-11-15T00:00:00Z" → "November 15, 2024"
 */
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

// ─── YouTube ─────────────────────────────────────────────────────────────────

/**
 * Extract the 11-character video ID from a YouTube URL.
 * Handles:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 *
 * Returns null if no ID can be found.
 */
export function getYouTubeId(url: string | undefined | null): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )
  return match ? match[1] : null
}

/**
 * Build a YouTube embed URL from a video ID.
 * Adds modest defaults: autoplay off, rel=0 to suppress unrelated suggestions.
 */
export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0`
}
