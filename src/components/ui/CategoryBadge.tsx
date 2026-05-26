/**
 * CategoryBadge.tsx
 *
 * Colored pill that shows a post's category.
 * Used on post cards, hero sections, and post pages.
 *
 * The badge uses the category's hex color for text and a ~12 % opacity
 * tint of the same color for the background — works in both light and
 * dark mode without any extra theme logic.
 *
 * Server component — no client JS needed.
 */

import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  /** If true the badge links to the category page. Default: true */
  linked?: boolean
  className?: string
}

export function CategoryBadge({
  category,
  linked = true,
  className = '',
}: CategoryBadgeProps) {
  const color = category.color ?? '#4A90D9'

  // Hex alpha suffix for ~12 % opacity background tint
  const bgColor = `${color}1f`

  const pill = (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${className}`}
      style={{ color, backgroundColor: bgColor }}
    >
      {category.title}
    </span>
  )

  if (!linked) return pill

  return (
    <Link
      href={`/${category.slug.current}`}
      className="hover:opacity-80 transition-opacity"
      aria-label={`View all ${category.title} articles`}
    >
      {pill}
    </Link>
  )
}
