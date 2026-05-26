/**
 * LogoCircle.tsx
 *
 * Circular logo variant — for favicon, mobile header, and social use.
 *
 * Circle is the only container. Text is centered inside:
 *
 *   (  Prompt      )   ← bold, navy/white (theme-aware)
 *   (  AI News |   )   ← "AI News" in #4A90D9, "|" subtle accent
 *
 * Pure SVG so it scales perfectly to any size.
 * Colors read from CSS custom properties — flips with theme automatically.
 *
 * Props:
 *   size       — rendered px size (width & height). Default: 80
 *   className  — extra classes on the <svg> element
 */

interface LogoCircleProps {
  size?: number
  className?: string
  'aria-label'?: string
}

export function LogoCircle({
  size = 80,
  className = '',
  'aria-label': ariaLabel = 'Prompt AI News',
}: LogoCircleProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
      className={className}
    >
      {/* ── Outer circle ─────────────────────────────────────────── */}
      {/*    fill: surface (#fff light / #111827 dark)                */}
      {/*    stroke: border (#B8D4F0 light / #1E3A5F dark)            */}
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="var(--pan-surface)"
        stroke="var(--pan-border)"
        strokeWidth="3"
      />

      {/* ── "Prompt" — top line, bold, theme-aware color ─────────── */}
      {/*    y=95: positions the baseline so the two-line text block   */}
      {/*    is vertically centered inside the circle (cy=100).        */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="31"
        fontWeight="700"
        fill="var(--pan-logo-text)"
      >
        Prompt
      </text>

      {/* ── "AI News|" — bottom line ─────────────────────────────── */}
      {/*    y=126: 31px line-gap below y=95 baseline                 */}
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="400"
      >
        <tspan fill="#4A90D9">AI News</tspan>
        {/* Pipe: ~58% of 24px, weight 300, lifted 2px to optical center */}
        <tspan
          fill="var(--pan-logo-text)"
          fontSize="14"
          fontWeight="300"
          dy="-2"
          opacity="0.72"
        >|</tspan>
      </text>
    </svg>
  )
}
