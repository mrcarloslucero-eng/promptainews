/**
 * POST /api/create-drafts
 *
 * Protected endpoint called by the Prompt AI News Daily Draft Publisher
 * remote agent. Receives rewritten stories and posts them as unpublished
 * draft posts to Sanity CMS.
 *
 * Runs on Vercel's servers — bypasses the IP restriction that blocks
 * the remote agent from calling Sanity's mutation API directly.
 *
 * Auth: x-publisher-secret header must match DRAFT_PUBLISHER_SECRET env var.
 *
 * Request body:
 * {
 *   "stories": [
 *     {
 *       "title":   "string",
 *       "excerpt": "string (max 25 words)",
 *       "body":    "string (paragraphs separated by \n\n)",
 *       "tags":    ["string"],
 *       "source":  "string"
 *     }
 *   ]
 * }
 *
 * Response:
 * { "success": true, "count": 7, "titles": ["..."] }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// ── Runtime: Node.js (not Edge) so we can use full Sanity client ──────────────
export const runtime = 'nodejs'

// ── Sanity client with write token ────────────────────────────────────────────
function getSanityClient() {
  return createClient({
    projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-25',
    useCdn:     false,
    token:      process.env.SANITY_API_TOKEN,
  })
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 96)
}

function randomKey(): string {
  return Math.random().toString(36).substring(2, 12)
}

function toPortableText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type:    'block',
      _key:     randomKey(),
      style:    'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key:  randomKey(),
          text:  paragraph,
          marks: [],
        },
      ],
    }))
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Authenticate
  const secret = req.headers.get('x-publisher-secret')
  if (!secret || secret !== process.env.DRAFT_PUBLISHER_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Parse body
  let stories: Array<{
    title: string
    excerpt: string
    body: string
    tags?: string[]
    source?: string
  }>

  try {
    const body = await req.json()
    stories = body.stories
    if (!Array.isArray(stories) || stories.length === 0) {
      return NextResponse.json({ error: 'stories must be a non-empty array' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // 3. Get Commentary category ID from Sanity
  const client = getSanityClient()
  const categoryId: string | null = await client.fetch(
    `*[_type == "category" && slug.current == "commentary"][0]._id`
  )

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Commentary category not found in Sanity — make sure it exists with slug "commentary"' },
      { status: 500 }
    )
  }

  // 4. Build mutations
  const now = new Date().toISOString()
  const mutations = stories.map((story) => ({
    createOrReplace: {
      _id:         `drafts.${randomKey()}${randomKey()}`,
      _type:       'post',
      title:       story.title,
      slug:        { _type: 'slug', current: slugify(story.title) },
      category:    { _type: 'reference', _ref: categoryId },
      publishDate: now,
      author:      'Prompt AI News',
      excerpt:     story.excerpt,
      featured:    false,
      tags:        Array.isArray(story.tags) ? story.tags : [],
      body:        toPortableText(story.body),
    },
  }))

  // 5. Post to Sanity
  try {
    await client.mutate(mutations as Parameters<typeof client.mutate>[0])
  } catch (err) {
    console.error('Sanity mutation error:', err)
    return NextResponse.json({ error: 'Sanity write failed', detail: String(err) }, { status: 500 })
  }

  // 6. Return success
  return NextResponse.json({
    success: true,
    count:   stories.length,
    titles:  stories.map((s) => s.title),
  })
}
