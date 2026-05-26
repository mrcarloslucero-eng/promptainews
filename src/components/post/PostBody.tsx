/**
 * PostBody.tsx
 *
 * Renders Sanity Portable Text content using @portabletext/react
 * (re-exported from next-sanity).
 *
 * Custom components provide consistent styling for all block types
 * defined in the Sanity post schema:
 *   blocks — h2, h3, h4, blockquote, normal (paragraph)
 *   marks  — strong, em, code, link
 *   lists  — bullet, number  +  their listItems
 *
 * The outer <div> uses the .prose-pan class (globals.css) which sets
 * base font size, line-height, and a few element defaults. The custom
 * components fine-tune spacing and interactive states.
 *
 * Server component — no client JS.
 */

import { PortableText }                from 'next-sanity'
import type { PortableTextComponents } from 'next-sanity'
import type { PortableTextBlock }      from 'next-sanity'

// ─── Custom component map ────────────────────────────────────────────────────

const components: PortableTextComponents = {
  // ── Block types ────────────────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p>{children}</p>
    ),
    h2: ({ children }) => (
      <h2>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
  },

  // ── Inline marks ───────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,

    code: ({ children }) => (
      <code>{children}</code>
    ),

    link: ({ value, children }) => {
      const href   = (value as { href?: string })?.href ?? '#'
      const isExt  = href.startsWith('http://') || href.startsWith('https://')
      return (
        <a
          href={href}
          target={isExt ? '_blank' : undefined}
          rel={isExt ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },

  // ── List containers ────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul>{children}</ul>
    ),
    number: ({ children }) => (
      <ol>{children}</ol>
    ),
  },

  // ── List items ─────────────────────────────────────────────────────────────
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PostBodyProps {
  body: PortableTextBlock[]
}

export function PostBody({ body }: PostBodyProps) {
  if (!body?.length) return null

  return (
    <div className="prose-pan">
      <PortableText value={body} components={components} />
    </div>
  )
}
