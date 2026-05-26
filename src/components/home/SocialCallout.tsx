/**
 * SocialCallout.tsx
 *
 * "Follow us" section at the bottom of the homepage.
 * Renders nothing if no social links are configured in Sanity.
 *
 * Server component — no client JS.
 */

import { SocialBar }     from '@/components/layout/SocialBar'
import type { SiteSettings } from '@/types'

interface SocialCalloutProps {
  siteSettings?: SiteSettings | null
}

export function SocialCallout({ siteSettings }: SocialCalloutProps) {
  const links = siteSettings?.socialLinks ?? {}
  const hasLinks = Object.values(links).some(Boolean)
  if (!hasLinks) return null

  return (
    <section
      aria-labelledby="social-callout-heading"
      className="w-full rounded-2xl border px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      <div className="flex flex-col gap-1">
        <h2
          id="social-callout-heading"
          className="text-lg font-bold"
          style={{ color: 'var(--pan-body)' }}
        >
          Follow Prompt AI News
        </h2>
        <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
          Stay up to date — we post daily breakdowns and video commentary.
        </p>
      </div>

      <SocialBar links={links} />
    </section>
  )
}
