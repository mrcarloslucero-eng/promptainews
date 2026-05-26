/**
 * app/opengraph-image.tsx
 *
 * Default Open Graph / Twitter card image for the site.
 * Used on the homepage, About page, and any page without its own OG image.
 * Output: 1200 × 630 PNG.
 *
 * Layout:
 *   Dark navy background
 *   "Prompt AI News" wordmark (white + blue)
 *   Tagline below
 *   Brand-blue bottom accent bar
 */

import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:     '#0A0F1E',
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          fontFamily:     'system-ui, -apple-system, sans-serif',
          position:       'relative',
        }}
      >
        {/* Subtle grid overlay — top-left quadrant dots for texture */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(circle at 20% 30%, rgba(74,144,217,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display:     'flex',
            alignItems:  'baseline',
            gap:         12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize:   72,
              fontWeight: 700,
              color:      '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            Prompt
          </span>
          <span
            style={{
              fontSize:   72,
              fontWeight: 400,
              color:      '#4A90D9',
              letterSpacing: '-1px',
            }}
          >
            AI News
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize:      28,
            fontWeight:    400,
            color:         '#6B7A99',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          AI News for Everyday People
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position:        'absolute',
            bottom:          0,
            left:            0,
            right:           0,
            height:          6,
            backgroundColor: '#4A90D9',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
