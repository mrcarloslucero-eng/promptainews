/**
 * POST /api/comments
 *
 * Receives a new comment from a visitor, writes it to Sanity as
 * unapproved, and sends Carlos a text via TextBelt.
 *
 * ── HOW THE API CALL CHAIN WORKS ──────────────────────────────────────
 *
 * Browser (visitor hits Submit)
 *   → POST /api/comments          (this file — runs on Vercel's servers)
 *     → Sanity Mutations API      (creates the comment document)
 *     → TextBelt API              (sends Carlos a text)
 *   ← Returns { success: true }   (browser shows confirmation)
 *
 * Notice: the browser never talks to Sanity or TextBelt directly.
 * It only talks to OUR endpoint. This is important because:
 *   1. It keeps the Sanity write token secret (never exposed to the browser)
 *   2. It keeps the TextBelt key secret (same reason)
 *   3. We control validation — bad data never reaches Sanity
 *
 * This pattern is called a "Backend For Frontend" (BFF) or API proxy.
 * You built one earlier for the draft publisher — same idea here.
 *
 * ── MODERATION FLOW ───────────────────────────────────────────────────
 *
 * Comment submitted → saved to Sanity with approved: false
 *   → invisible on site until Carlos opens Studio and ticks "Approved"
 *   → Carlos gets a text the moment it lands
 *
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient }              from 'next-sanity'

export const runtime = 'nodejs'

// ── Sanity write client ───────────────────────────────────────────────────────
// Same pattern as create-drafts — uses the write token from env vars.
// NEVER put this token in client-side code. It only lives here on the server.

function getSanityClient() {
  return createClient({
    projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-25',
    useCdn:     false,
    token:      process.env.SANITY_API_TOKEN,
  })
}

// ── TextBelt SMS ──────────────────────────────────────────────────────────────

async function notifyCarlos(name: string, message: string, postTitle: string) {
  const sms = `Prompt AI News\nNew comment on "${postTitle}"\n${name}: ${message.substring(0, 80)}${message.length > 80 ? '…' : ''}\nReview: https://a7wr10qt.sanity.studio/structure/comment`

  try {
    const resp = await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        phone:   '2147330242',
        message: sms,
        key:     '8f63188b9a70bed2381e38cedd0d0924718afd5fWauq6oUY9hqAJovnjDb5Azl0k',
      }),
    })
    const result = await resp.json()
    if (!result.success) {
      console.error('TextBelt error:', result.error)
    }
  } catch (err) {
    // SMS failure should never block comment submission
    console.error('TextBelt request failed:', err)
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {

  // 1. Parse and validate input
  // ── COOL THING: We validate here on the server, not just in the browser.
  //    Browser validation (the HTML required attribute, etc.) is just UX.
  //    Anyone can bypass it with curl or Postman. Server validation is the
  //    real guard.

  let name: string
  let message: string
  let postId: string
  let postTitle: string

  try {
    const body = await req.json()
    name      = (body.name      ?? '').toString().trim()
    message   = (body.message   ?? '').toString().trim()
    postId    = (body.postId    ?? '').toString().trim()
    postTitle = (body.postTitle ?? '').toString().trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!name    || name.length    < 1 || name.length    > 80)  return NextResponse.json({ error: 'Name is required (max 80 chars)'    }, { status: 400 })
  if (!message || message.length < 2 || message.length > 1000) return NextResponse.json({ error: 'Message is required (max 1000 chars)'}, { status: 400 })
  if (!postId)                                                  return NextResponse.json({ error: 'Post ID is required'                 }, { status: 400 })

  // 2. Write comment to Sanity
  // ── COOL THING: approved is false by default. The comment is created
  //    as a real published Sanity document (not a draft) but the approved
  //    field acts as our own moderation gate. We query only approved: true
  //    comments when displaying them on the site, so this is invisible until
  //    Carlos flips the switch in Studio.

  const client = getSanityClient()

  try {
    await client.create({
      _type:    'comment',
      name,
      message,
      approved: false,
      post: {
        _type: 'reference',
        _ref:  postId,
      },
    })
  } catch (err) {
    console.error('Sanity comment error:', err)
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 })
  }

  // 3. Text Carlos — fire and forget (don't await, don't block the response)
  // ── COOL THING: notifyCarlos() is called without await. This means the
  //    API responds to the visitor immediately without waiting for the SMS
  //    to go through. If TextBelt is slow, the visitor never knows.
  //    This is called a "fire and forget" pattern.

  void notifyCarlos(name, message, postTitle)

  // 4. Return success
  return NextResponse.json({ success: true })
}
