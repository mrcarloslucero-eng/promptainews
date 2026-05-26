/**
 * app/posts/[slug]/opengraph-image.tsx
 *
 * Per-post Open Graph / Twitter card image.
 * Generated at request time (or build time with generateStaticParams).
 * Output: 1200 × 630 PNG.
 *
 * Layout:
 *   Dark navy background
 *   Category color left-border accent (full height)
 *   Category label (coloured, uppercase)
 *   Post title (white, max 3 lines, truncated)
 *   "Prompt AI News" site name in bottom-right
 *   Category-colour bottom accent bar
 */

import { ImageResponse }  from 'next/og'
import { getPostBySlug }  from '@/lib/sanity.fetchers'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post     = await getPostBySlug(slug)

  // Fall back to the default site image shape if post not found
  const title         = post?.title         ?? 'Prompt AI News'
  const categoryTitle = post?.category?.title ?? ''
  const accentColor   = post?.category?.color ?? '#4A90D9'

  // Truncate long titles — satori wraps but very long strings can overflow
  const displayTitle =
    title.length > 90 ? title.slice(0, 87).trimEnd() + '…' : title

  return new ImageResponse(
    (
      <div
        style={{
          background:    '#0A0F1E',
          width:         '100%',
          height:        '100%',
          display:       'flex',
          fontFamily:    'system-ui, -apple-system, sans-serif',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position:        'absolute',
            top:             0,
            left:            0,
            bottom:          0,
            width:           8,
            backgroundColor: accentColor,
          }}
        />

        {/* Radial glow behind text */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: `radial-gradient(ellipse at 30% 50%, ${accentColor}14 0%, transparent 65%)`,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            justifyContent:'center',
            padding:       '60px 80px 80px 96px',
            flex:          1,
            gap:           20,
          }}
        >
          {/* Category label */}
          {categoryTitle && (
            <div
              style={{
                fontSize:      22,
                fontWeight:    600,
                color:         accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {categoryTitle}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize:   58,
              fontWeight: 700,
              color:      '#FFFFFF',
              lineHeight: 1.15,
              maxWidth:   960,
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Site name — bottom right */}
        <div
          style={{
            position:   'absolute',
            bottom:     28,
            right:      52,
            display:    'flex',
            alignItems: 'baseline',
            gap:        8,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF' }}>
            Prompt
          </span>
          <span style={{ fontSize: 22, fontWeight: 400, color: '#4A90D9' }}>
            AI News
          </span>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position:        'absolute',
            bottom:          0,
            left:            0,
            right:           0,
            height:          6,
            backgroundColor: accentColor,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
