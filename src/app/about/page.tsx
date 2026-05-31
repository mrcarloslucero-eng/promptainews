/**
 * app/about/page.tsx  —  About page  (server component)
 */

import type { Metadata } from 'next'
import Link              from 'next/link'
import { LogoCircle }    from '@/components/brand/LogoCircle'
import { SocialBar }     from '@/components/layout/SocialBar'
import { client }        from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity.queries'
import type { SiteSettings }   from '@/types'

export const metadata: Metadata = {
  title:       'About',
  description:
    'Prompt AI News delivers clear, jargon-free AI news and commentary for everyday people. Meet Carlos Lucero — the face behind the site.',
  openGraph: {
    title:       'About | Prompt AI News',
    description: 'AI News for Everyday People — meet the person behind Prompt AI News.',
    type:        'website',
  },
}

const CATEGORIES = [
  {
    title:       'Commentary',
    slug:        'commentary',
    color:       '#4A90D9',
    description:
      'My takes on the biggest AI stories, tools, and industry shifts — explained in plain language without the hype or the fear.',
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
      'Certifications, training, job market insights, and skill-building advice for navigating your career in an AI-accelerating world. Brought to you by DotCreds.com.',
  },
] as const

export default async function AboutPage() {
  let siteSettings: SiteSettings | null = null
  try {
    siteSettings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY)
  } catch {
    // Degrade gracefully
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
            The good, the bad, and the ugly of artificial intelligence —
            covered honestly, written plainly, updated every single day.
          </p>
        </div>
      </section>

      {/* ── Meet Carlos ───────────────────────────────────────────────── */}
      <section
        className="rounded-2xl border p-8 sm:p-10 flex flex-col sm:flex-row gap-10 sm:gap-14 items-start"
        style={{
          background:  'var(--pan-surface)',
          borderColor: 'var(--pan-border)',
        }}
        aria-labelledby="about-heading"
      >
        {/* Headshot placeholder */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              width:       '160px',
              height:      '160px',
              background:  'var(--pan-border)',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/profile-pic.png"
              alt="Carlos Lucero"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          <div className="text-center">
            <p
              className="text-base font-bold"
              style={{ color: 'var(--pan-body)' }}
            >
              Carlos Lucero
            </p>
            <p
              className="text-sm"
              style={{ color: 'var(--pan-muted)' }}
            >
              McKinney, TX
            </p>
            <a
              href="mailto:officialpromptainews@gmail.com"
              className="text-xs font-medium transition-opacity hover:opacity-70 mt-1 block"
              style={{ color: '#4A90D9' }}
            >
              officialpromptainews@gmail.com
            </a>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-5">
          <h2
            id="about-heading"
            className="text-2xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            Hey, I&apos;m Carlos.
          </h2>

          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            I&apos;m a 47-year-old UPS driver from McKinney, Texas. Good job,
            solid career — but not my passion. A few years ago I started
            learning about artificial intelligence and I honestly couldn&apos;t
            stop. What started as curiosity turned into an obsession. What
            started as a dream of building an AI-powered consulting firm for
            small businesses turned into this — a full content and automation
            operation dedicated to covering AI the way it should be covered:
            honestly, for real people, without the hype.
          </p>

          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            I&apos;m deep into vibe coding right now — using AI tools to build
            things I never thought someone without a computer science degree
            could build. This entire site is proof of that. Every story,
            every automation, every piece of infrastructure you&apos;re
            benefiting from was built by me, one conversation at a time.
          </p>

          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            Prompt AI News covers the good, the bad, and the ugly of AI. I
            will update stories every day and you&apos;ll see this whole thing
            develop in real time — the commentary, the interviews, the video
            segments, the career and education corner brought to you by my
            first sponsor,{' '}
            <a
              href="https://dotcreds.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#4A90D9' }}
              className="font-semibold hover:opacity-80 transition-opacity"
            >
              DotCreds.com
            </a>
            . This is a work in progress and I wouldn&apos;t have it any
            other way.
          </p>

          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--pan-muted)' }}
          >
            Thank you for visiting and reading. It genuinely means everything.
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
            What I cover
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
              <div
                className="h-1.5 w-full flex-shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              <div className="flex flex-col gap-3 p-5">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color }}
                >
                  {title}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--pan-muted)' }}
                >
                  {description}
                </p>
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

      {/* ── Follow + Contact ──────────────────────────────────────────── */}
      <section
        className="rounded-2xl border px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        style={{
          background:  'var(--pan-surface)',
          borderColor: 'var(--pan-border)',
        }}
        aria-labelledby="follow-heading"
      >
        <div className="flex flex-col gap-2">
          <h2
            id="follow-heading"
            className="text-xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            Stay in the loop
          </h2>
          <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
            Follow along for daily stories, video commentary, and my
            unfiltered take on everything AI.
          </p>
          <a
            href="mailto:officialpromptainews@gmail.com"
            className="text-sm font-medium transition-opacity hover:opacity-70 mt-1"
            style={{ color: '#4A90D9' }}
          >
            officialpromptainews@gmail.com
          </a>
        </div>

        {hasSocial && <SocialBar links={socialLinks} />}
      </section>

    </div>
  )
}
