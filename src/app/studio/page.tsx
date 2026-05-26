/**
 * app/studio/page.tsx  —  SERVER component
 *
 * Plain Next.js route at /studio — no catch-all brackets, no Windows
 * file-watcher issues.  Sanity's internal router handles navigation
 * within the studio after first load.
 *
 * Deep links (/studio/structure/...) are handled by [[...tool]]/page.tsx
 * in production.  In dev, the studio's client-side router keeps them
 * working without a full-page reload.
 */

import type { Metadata, Viewport } from 'next'
import { StudioWrapper }           from './StudioWrapper'

export const metadata: Metadata = {
  title:    'Studio | Prompt AI News',
  referrer: 'same-origin',
  robots:   'noindex',
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  viewportFit:  'cover',
}

export default function StudioPage() {
  return <StudioWrapper />
}
