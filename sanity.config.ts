/**
 * sanity.config.ts
 *
 * Sanity Studio configuration — embedded at /studio via next-sanity.
 *
 * Studio structure:
 *   ├── ⭐ Site Settings  (singleton — one fixed document)
 *   ├── ─────────────────
 *   ├── Posts
 *   └── Categories
 */

import { defineConfig }  from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// The fixed Sanity document ID for the Site Settings singleton.
const SITE_SETTINGS_ID = 'siteSettings'

export default defineConfig({
  // Where the embedded studio is mounted in the Next.js app.
  basePath: '/studio',

  projectId,
  dataset,
  title: 'Prompt AI News',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Singleton: Site Settings ──────────────────────────
            S.listItem()
              .title('Site Settings')
              .id(SITE_SETTINGS_ID)
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId(SITE_SETTINGS_ID)
                  .title('Site Settings'),
              ),

            S.divider(),

            // ── Regular document lists ────────────────────────────
            S.documentTypeListItem('post')
              .title('Posts'),

            S.documentTypeListItem('category')
              .title('Categories'),
          ]),
    }),

    // GROQ query playground — available in the studio toolbar (dev only).
    visionTool({
      defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
    }),
  ],
})
