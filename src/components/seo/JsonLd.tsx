/**
 * JsonLd.tsx
 *
 * Renders a <script type="application/ld+json"> tag for structured data.
 * Pass any valid Schema.org object as `data`.
 *
 * Server component — no client JS, no hydration cost.
 *
 * Usage:
 *   import { JsonLd } from '@/components/seo/JsonLd'
 *   <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', ... }} />
 */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
