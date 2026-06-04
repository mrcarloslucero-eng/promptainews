/**
 * POST /api/create-drafts
 *
 * Protected endpoint called by the Prompt AI News Daily Draft Publisher
 * remote agent. Receives rewritten stories and posts them as unpublished
 * draft posts to Sanity CMS, then pings Bing IndexNow so new slugs are
 * queued for crawling immediately rather than waiting for passive discovery.
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
 * { "success": true, "count": 7, "titles": ["..."], "indexNow": "ok" | "skipped" | "failed" }
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
  // Regex to find markdown links: [text](url)
  const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const markDefs: Array<{ _type: string; _key: string; href: string }> = []
      const children: Array<{ _type: string; _key: string; text: string; marks: string[] }> = []

      let lastIndex = 0
      let match: RegExpExecArray | null

      LINK_RE.lastIndex = 0
      while ((match = LINK_RE.exec(paragraph)) !== null) {
        // Plain text before this link
        if (match.index > lastIndex) {
          children.push({
            _type: 'span',
            _key:  randomKey(),
            text:  paragraph.slice(lastIndex, match.index),
            marks: [],
          })
        }

        // Link mark
        const linkKey = randomKey()
        markDefs.push({ _type: 'link', _key: linkKey, href: match[2] })
        children.push({
          _type: 'span',
          _key:  randomKey(),
          text:  match[1],
          marks: [linkKey],
        })

        lastIndex = match.index + match[0].length
      }

      // Remaining plain text after last link
      if (lastIndex < paragraph.length) {
        children.push({
          _type: 'span',
          _key:  randomKey(),
          text:  paragraph.slice(lastIndex),
          marks: [],
        })
      }

      return {
        _type:    'block',
        _key:     randomKey(),
        style:    'normal',
        markDefs,
        children,
      }
    })
}

// ── IndexNow ping ─────────────────────────────────────────────────────────────
// Bing's IndexNow protocol: submit a list of URLs and Bing queues them for
// crawling within minutes. Drafts aren't public yet, but we send their future
// URLs so Bing is primed the moment Carlos clicks Publish in Sanity Studio.
// Failure is non-fatal — drafts are still saved even if the ping fails.

async function pingIndexNow(slugs: string[]): Promise<{ status: 'ok' | 'skipped' | 'failed'; detail?: string }> {
  const key = process.env.INDEXNOW_KEY
  const host = 'promptainews.com'

  if (!key) return { status: 'skipped', detail: 'INDEXNOW_KEY env var not set' }

  const urls = slugs.map((slug) => `https://${host}/posts/${slug}`)

  try {
    const res = await fetch('https://www.bing.com/indexnow', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList:     urls,
      }),
    })
    const body = await res.text()
    if (!res.ok) {
      console.error(`IndexNow ping failed — HTTP ${res.status}: ${body}`)
      return { status: 'failed', detail: `HTTP ${res.status}: ${body}` }
    }
    return { status: 'ok' }
  } catch (err) {
    console.error('IndexNow ping threw:', err)
    return { status: 'failed', detail: String(err) }
  }
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
  const slugs: string[] = []
  try {
    await client.mutate(mutations as Parameters<typeof client.mutate>[0])
    stories.forEach((s) => slugs.push(slugify(s.title)))
  } catch (err) {
    console.error('Sanity mutation error:', err)
    return NextResponse.json({ error: 'Sanity write failed', detail: String(err) }, { status: 500 })
  }

  // 6. Ping Bing IndexNow (non-blocking — drafts are saved regardless)
  const indexNow = await pingIndexNow(slugs)

  // 7. Return success
  return NextResponse.json({
    success:       true,
    count:         stories.length,
    titles:        stories.map((s) => s.title),
    indexNow:      indexNow.status,
    indexNowDetail: indexNow.detail ?? null,
  })
}
