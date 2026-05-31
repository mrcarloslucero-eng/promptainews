/**
 * GET /api/posts?skip=6&limit=6&featuredId=xxx
 *
 * Paginated post fetching for the Load More button on the homepage.
 * Returns the next batch of PostCard objects from Sanity.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient }              from 'next-sanity'
import { groq }                      from 'next-sanity'

export const runtime = 'nodejs'

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-25',
  useCdn:     true,
})

const POST_CARD_FIELDS = groq`
  _id,
  title,
  slug,
  publishDate,
  youtubeUrl,
  excerpt,
  featured,
  "category": category->{
    _id,
    title,
    slug,
    color
  }
`

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const skip       = parseInt(searchParams.get('skip')  ?? '6',  10)
  const limit      = parseInt(searchParams.get('limit') ?? '6',  10)
  const featuredId = searchParams.get('featuredId') ?? ''

  // Clamp limit to prevent abuse
  const safeLimit = Math.min(limit, 12)

  try {
    const posts = await client.fetch(
      groq`*[_type == "post" && _id != $featuredId] | order(publishDate desc) [$skip...$end] {
        ${POST_CARD_FIELDS}
      }`,
      { featuredId, skip, end: skip + safeLimit },
    )

    return NextResponse.json({ posts, hasMore: posts.length === safeLimit })
  } catch (err) {
    console.error('Posts API error:', err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
