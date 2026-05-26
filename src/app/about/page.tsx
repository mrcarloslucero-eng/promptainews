/**
 * app/about/page.tsx  —  About page  (server component)
 *
 * Static editorial page — no dynamic params.
 * Fetches site settings once for the social links section.
 *
 * Sections:
 *   [Hero]          — Logo mark, mission headline, one-liner
 *   [Mission]       — Why this site exists (2-column on desktop)
 *   [What We Cover] — Three category cards with color accents
 *   [Follow Us]     — Social icons from site settings
 */

import type { Metadata } from 'next'
import Link              from 'next/link'
import { LogoCircle }    from '@/components/brand/LogoCircle'
import { SocialBar }     from '@/components/layout/SocialBar'
import { client }        from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import type { SiteSettings }   from '@/types'

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       'About',
  description:
    'Prompt AI News delivers clear, jargon-free AI news and commentary for everyday people. Learn about our mission, what we cover, and the team behind the site.',
  openGraph: {
    title:       'About | Prompt AI News',
    description: 'AI News for Everyday People — our mission, coverage, and team.',
    type:        'website',
  },
}

// ─── Static content ───────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title:       'Commentary',
    slug:        'commentary',
    color:       '#4A90D9',
    description:
      'Our takes on the biggest AI stories, tools, and industry shifts — explained in plain language without the hype or the fear.',
  },
  {
    title:       'Interviews',
    slug:        'interviews',
    color:       '#2ECC71',
    description:
      'Conversations with founders, researchers, and practitioners who are building the future of AI — and what it actually means for you.',
  },
  {
    title:       'Career Corner',
    slug:        'career-corner',
    color:       '#F39C12',
    description:
      'Practical guides, job market insights, and skill-building advice for navigating your career in an AI-accelerating world.',
  },
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  let siteSettings: SiteSettings | null = null
  try {
    siteSettings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY)
  } catch {
    // Degrade gracefully — social section just won't render
  }

  const socialLinks = siteSettings?.socialLinks ?? {}
  const hasSocial   = Object.values(socialLinks).some(Boolean)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-20">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center gap-6">

        <LogoCircle size={96} />

        <div className="flex flex-col gap-3 max-w-2xl">
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: 'var(--pan-body)' }}
          >
            AI News for{' '}
            <span style={{ color: '#4A90D9' }}>Everyday People</span>
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            Prompt AI News cuts through the noise to bring you clear,
            jargon-free coverage of artificial intelligence — what it is,
            what it means, and what you should actually care about.
          </p>
        </div>

      </section>

      {/* ── Mission ───────────────────────────────────────────────────── */}
      <section
        className="rounded-2xl border p-8 sm:p-10 grid sm:grid-cols-2 gap-8 sm:gap-12"
        style={{
          background:  'var(--pan-surface)',
          borderColor: 'var(--pan-border)',
        }}
        aria-labelledby="mission-heading"
      >
        <div className="flex flex-col gap-4">
          <h2
            id="mission-heading"
            className="text-2xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            Why we exist
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            AI is moving fast. Every week brings new models, new products, and
            new debates — but most coverage is written for insiders. Technical
            jargon, acronym soup, and either breathless hype or doomsday
            headlines.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            We started Prompt AI News because we believed there was a better
            way: honest, plain-English reporting that respects your time and
            your intelligence — whether you work in tech or not.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            Who it&apos;s for
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            Curious people. Non-engineers who want to understand what AI
            actually does. Professionals wondering how AI will change their
            field. Students navigating what to learn next.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            If you&apos;ve ever closed an AI article because it felt like it
            was written for someone else — this site is for you.
          </p>
        </div>
      </section>

      {/* ── What We Cover ─────────────────────────────────────────────── */}
      <section aria-labelledby="coverage-heading">

        <div className="flex items-center gap-4 mb-8">
          <h2
            id="coverage-heading"
            className="text-2xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            What we cover
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: 'var(--pan-border)' }}
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CATEGORIES.map(({ title, slug, color, description }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="group flex flex-col rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background:  'var(--pan-surface)',
                borderColor: 'var(--pan-border)',
              }}
            >
              {/* Color accent bar */}
              <div
                className="h-1.5 w-full flex-shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden
              />

              <div className="flex flex-col gap-3 p-5">
                {/* Category label */}
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color }}
                >
                  {title}
                </span>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--pan-muted)' }}
                >
                  {description}
                </p>

                {/* CTA */}
                <span
                  className="text-xs font-semibold mt-auto pt-1 transition-opacity group-hover:opacity-70"
                  style={{ color }}
                >
                  Browse {title} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Follow Us ─────────────────────────────────────────────────── */}
      {hasSocial && (
        <section
          className="rounded-2xl border px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{
            background:  'var(--pan-surface)',
            borderColor: 'var(--pan-border)',
          }}
          aria-labelledby="follow-heading"
        >
          <div className="flex flex-col gap-1">
            <h2
              id="follow-heading"
              className="text-xl font-bold"
              style={{ color: 'var(--pan-body)' }}
            >
              Stay in the loop
            </h2>
            <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
              Follow us for daily breakdowns, video commentary, and quick takes
              on the latest in AI.
            </p>
          </div>

          <SocialBar links={socialLinks} />
        </section>
      )}

    </div>
  )
}
