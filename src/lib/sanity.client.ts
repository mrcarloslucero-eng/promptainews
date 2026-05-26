/**
 * sanity.client.ts
 *
 * The configured Sanity client used everywhere in the app.
 *
 * useCdn:
 *   true  in production  → cached, fast, stale up to ~60 s
 *   false in development → always fresh (no CDN cache)
 *
 * To use the write token (mutations / draft preview), call
 * client.withConfig({ token: process.env.SANITY_API_TOKEN })
 * at the call site — never bake the token into the shared client.
 */

import { createClient } from 'next-sanity'

export const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn:     process.env.NODE_ENV === 'production',
})
