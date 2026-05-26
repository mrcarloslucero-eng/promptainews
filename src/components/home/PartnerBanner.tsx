/**
 * PartnerBanner.tsx
 *
 * A subtle partner callout banner.
 * Renders nothing if partnerName or partnerUrl is not set in Sanity.
 *
 * Server component — no client JS.
 */

import type { SiteSettings } from '@/types'

interface PartnerBannerProps {
  siteSettings?: SiteSettings | null
}

export function PartnerBanner({ siteSettings }: PartnerBannerProps) {
  const { partnerName, partnerUrl } = siteSettings ?? {}
  if (!partnerName || !partnerUrl) return null

  return (
    <aside
      aria-label={`Partner: ${partnerName}`}
      className="w-full rounded-xl border px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
        <span
          className="text-xs font-semibold uppercase tracking-wider mr-2"
          style={{ color: 'var(--pan-muted)', opacity: 0.6 }}
        >
          Partner
        </span>
        <span style={{ color: 'var(--pan-body)' }}>
          {partnerName}
        </span>
      </p>

      <a
        href={partnerUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="text-sm font-semibold transition-colors hover:opacity-80 whitespace-nowrap"
        style={{ color: '#4A90D9' }}
      >
        Visit {partnerName} →
      </a>
    </aside>
  )
}
