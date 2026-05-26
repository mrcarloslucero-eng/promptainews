'use client'

/**
 * Header.tsx
 *
 * Sticky site header:
 *   [Logo]  ·····  [Home | Commentary | Interviews | Career Corner | About]  [☀/🌙]
 *
 * Mobile: logo left · theme toggle + burger right · slide-down drawer.
 *
 * Client component because it needs:
 *   - usePathname() for active-link highlighting
 *   - useState() for the mobile drawer
 */

import Link      from 'next/link'
import { usePathname } from 'next/navigation'
import { useState }    from 'react'
import { LogoFull }    from '@/components/brand/LogoFull'
import { ThemeToggle } from './ThemeToggle'

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/',              label: 'Home'          },
  { href: '/commentary',    label: 'Commentary'    },
  { href: '/interviews',    label: 'Interviews'    },
  { href: '/career-corner', label: 'Career Corner' },
  { href: '/about',         label: 'About'         },
] as const

// ─── Icons ────────────────────────────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Header() {
  const pathname   = usePathname()
  const [open, setOpen] = useState(false)

  // Mark a link active: exact match for '/', prefix match for everything else
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-sm"
      style={{
        background:   'color-mix(in srgb, var(--pan-bg) 85%, transparent)',
        borderColor:  'var(--pan-border)',
      }}
    >
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} aria-label="Prompt AI News — home">
          <LogoFull size="sm" showTagline={false} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href)
                  ? 'text-brand-blue'
                  : 'hover:text-brand-blue',
              ].join(' ')}
              style={{
                color: isActive(href) ? '#4A90D9' : 'var(--pan-muted)',
              }}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-surface"
            style={{ color: 'var(--pan-muted)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t px-4 py-5 flex flex-col gap-1"
          style={{
            background:  'var(--pan-surface)',
            borderColor: 'var(--pan-border)',
          }}
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href) ? 'text-brand-blue bg-surface' : 'hover:text-brand-blue',
              ].join(' ')}
              style={{ color: isActive(href) ? '#4A90D9' : 'var(--pan-body)' }}
              aria-current={isActive(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
