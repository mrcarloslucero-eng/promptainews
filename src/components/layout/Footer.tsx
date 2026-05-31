/**
 * Footer.tsx
 *
 * Clean site footer — logo, email, social icons, copyright.
 * Nav links removed (already in the header — no need to repeat).
 * Social icons appear here only — SocialCallout removed from homepage.
 */

import Link          from 'next/link'
import { LogoFull }  from '@/components/brand/LogoFull'
import { SocialBar } from './SocialBar'
import type { SiteSettings } from '@/types'

interface FooterProps {
  siteSettings?: SiteSettings | null
}

export function Footer({ siteSettings }: FooterProps) {
  const year       = new Date().getFullYear()
  const tagline    = siteSettings?.tagline     ?? 'AI News for Everyday People'
  const links      = siteSettings?.socialLinks ?? {}
  const partner    = siteSettings?.partnerName
  const partnerUrl = siteSettings?.partnerUrl

  return (
    <footer
      className="w-full border-t mt-auto"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">

        {/* ── Logo + tagline + email + social ──────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          {/* Left — logo, tagline, email */}
          <div className="flex flex-col gap-1.5">
            <Link href="/" aria-label="Prompt AI News — home">
              <LogoFull size="sm" showTagline={false} />
            </Link>
            <p className="text-xs tracking-wide" style={{ color: 'var(--pan-muted)' }}>
              {tagline}
            </p>
            <a
              href="mailto:officialpromptainews@gmail.com"
              className="text-xs font-medium transition-opacity hover:opacity-70 mt-0.5"
              style={{ color: '#4A90D9' }}
            >
              officialpromptainews@gmail.com
            </a>
          </div>

          {/* Right — social icons */}
          <SocialBar links={links} />
        </div>

        {/* ── Bottom bar: copyright + partner ──────────────────────── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t text-xs"
          style={{
            borderColor: 'var(--pan-border)',
            color:       'var(--pan-muted)',
          }}
        >
          <span>© {year} Prompt AI News. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-blue"
              style={{ color: 'var(--pan-muted)' }}
            >
              Privacy
            </Link>

            {partner && partnerUrl && (
              <a
                href={partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-blue"
                style={{ color: 'var(--pan-muted)' }}
              >
                Partner: {partner}
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  )
}
