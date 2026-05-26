/**
 * LogoFull.tsx
 *
 * Full horizontal logo lockup:
 *   [  Prompt  AI News  |  ]
 *      AI News for Everyday People
 *
 * Uses CSS custom properties from globals.css so it flips automatically
 * between light and dark themes without any client-side JS check.
 *
 * Props:
 *   showTagline  — show the tagline below (default: true)
 *   size         — scale factor: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 *   className    — additional classes on the wrapper
 */

import type { HTMLAttributes } from 'react'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

interface LogoFullProps extends HTMLAttributes<HTMLDivElement> {
  showTagline?: boolean
  size?: LogoSize
}

const sizeMap: Record<LogoSize, {
  fontSize: string
  px: string
  py: string
  radius: string
  tagSize: string
  gap: string
}> = {
  sm: { fontSize: '1rem',      px: 'px-3.5', py: 'py-2',    radius: 'rounded-xl',  tagSize: 'text-[0.6rem]',   gap: 'gap-2'   },
  md: { fontSize: '1.375rem',  px: 'px-5',   py: 'py-[11px]', radius: 'rounded-2xl', tagSize: 'text-[0.6875rem]', gap: 'gap-2.5' },
  lg: { fontSize: '1.75rem',   px: 'px-6',   py: 'py-3.5',  radius: 'rounded-2xl', tagSize: 'text-[0.8rem]',   gap: 'gap-3'   },
  xl: { fontSize: '2.25rem',   px: 'px-8',   py: 'py-5',    radius: 'rounded-3xl', tagSize: 'text-[0.9rem]',   gap: 'gap-3.5' },
}

export function LogoFull({
  showTagline = true,
  size = 'md',
  className = '',
  ...props
}: LogoFullProps) {
  const s = sizeMap[size]

  return (
    <div
      className={`inline-flex flex-col items-center ${s.gap} ${className}`}
      {...props}
    >
      {/* ── Rounded-rect border container ─────────────────────────── */}
      {/*    fontSize set HERE so child em units are relative to it.   */}
      <div
        className={`flex items-center ${s.px} ${s.py} ${s.radius}`}
        style={{
          fontSize: s.fontSize,
          lineHeight: 1,
          border: '1.5px solid var(--pan-logo-border)',
          background: 'var(--pan-logo-bg)',
        }}
      >
        {/* "Prompt" — bold, switches navy ↔ white with theme */}
        <span
          className="font-bold tracking-tight"
          style={{ color: 'var(--pan-logo-text)' }}
        >
          Prompt
        </span>

        {/* "AI News" — regular weight, always brand blue */}
        <span
          className="font-normal"
          style={{ color: '#4A90D9', marginLeft: '0.3em' }}
        >
          AI News
        </span>

        {/* "|" pipe — cursor accent, not a divider                      */}
        {/*   0.58em        → ~60% of text height at every size         */}
        {/*   fontWeight 300 → thinner, more delicate stroke            */}
        {/*   alignSelf center → starts at the flex midpoint            */}
        {/*   translateY 0.15em → nudges down to the visual text center */}
        {/*   (mixed-case text's optical center sits below the          */}
        {/*    mathematical midpoint of the line box due to descenders)  */}
        <span
          style={{
            fontSize: '0.58em',
            fontWeight: 300,
            lineHeight: 1,
            color: 'var(--pan-logo-text)',
            marginLeft: '0.3em',
            alignSelf: 'center',
            transform: 'translateY(0.15em)',
            opacity: 0.72,
          }}
        >
          |
        </span>
      </div>

      {/* ── Tagline ────────────────────────────────────────────────── */}
      {showTagline && (
        <p
          className={`${s.tagSize} font-normal tracking-[0.15em] uppercase`}
          style={{ color: 'var(--pan-muted)' }}
        >
          AI News for Everyday People
        </p>
      )}
    </div>
  )
}
