/**
 * Footer.tsx
 *
 * Site footer — server component.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  [LogoFull]          [Social icons row]                 │
 *   │  tagline                                                │
 *   ├─────────────────────────────────────────────────────────┤
 *   │  Nav links (Home · Commentary · Interviews · …)         │
 *   ├─────────────────────────────────────────────────────────┤
 *   │  © 2025 Prompt AI News · Privacy · [Partner link]       │
 *   └─────────────────────────────────────────────────────────┘
 */

import Link           from 'next/link'
import { LogoFull }   from '@/components/brand/LogoFull'
import { SocialBar }  from './SocialBar'
import type { SiteSettings } from '@/types'

// ─── Nav links (mirrors Header) ───────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/',              label: 'Home'          },
  { href: '/commentary',    label: 'Commentary'    },
  { href: '/interviews',    label: 'Interviews'    },
  { href: '/career-corner', label: 'Career Corner' },
  { href: '/about',         label: 'About'         },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

interface FooterProps {
  siteSettings?: SiteSettings | null
}

export function Footer({ siteSettings }: FooterProps) {
  const year     = new Date().getFullYear()
  const tagline  = siteSettings?.tagline     ?? 'AI News for Everyday People'
  const links    = siteSettings?.socialLinks ?? {}
  const partner  = siteSettings?.partnerName
  const partnerUrl = siteSettings?.partnerUrl

  return (
    <footer
      className="w-full border-t mt-auto"
      style={{
        background:  'var(--pan-surface)',
        borderColor: 'var(--pan-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

        {/* ── Top row: logo + social ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <Link href="/" aria-label="Prompt AI News — home">
              <LogoFull size="sm" showTagline={false} />
            </Link>
            <p
              className="text-xs tracking-wide"
              style={{ color: 'var(--pan-muted)' }}
            >
              {tagline}
            </p>
          </div>

          <SocialBar links={links} className="mt-1" />
        </div>

        {/* ── Nav row ──────────────────────────────────────────────── */}
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2"
          aria-label="Footer navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm transition-colors hover:text-brand-blue"
              style={{ color: 'var(--pan-muted)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
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
