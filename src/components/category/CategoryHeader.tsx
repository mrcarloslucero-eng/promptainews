/**
 * CategoryHeader.tsx
 *
 * Hero section for category archive pages.
 *
 * Layout:
 *   [3px category color strip — full width]
 *   Category Title     ← text-4xl bold
 *   [N] article[s]     ← muted count + thin rule
 *
 * Server component — no client JS.
 */

import type { Category } from '@/types'

interface CategoryHeaderProps {
  category:   Category
  postCount:  number
}

export function CategoryHeader({ category, postCount }: CategoryHeaderProps) {
  const color = category.color ?? '#4A90D9'
  const label = postCount === 1 ? '1 article' : `${postCount} articles`

  return (
    <header className="w-full">

      {/* Category color strip */}
      <div
        className="h-1 w-full rounded-full mb-6"
        style={{ backgroundColor: color }}
        aria-hidden
      />

      {/* Title */}
      <h1
        className="text-4xl sm:text-5xl font-bold leading-tight mb-3"
        style={{ color: 'var(--pan-body)' }}
      >
        {category.title}
      </h1>

      {/* Count + rule */}
      <div className="flex items-center gap-4">
        <span
          className="text-sm font-medium whitespace-nowrap"
          style={{ color }}
        >
          {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: 'var(--pan-border)' }}
          aria-hidden
        />
      </div>

    </header>
  )
}
