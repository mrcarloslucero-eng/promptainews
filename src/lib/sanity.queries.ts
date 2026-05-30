/**
 * sanity.queries.ts
 *
 * All GROQ queries for the app in one place.
 * Import the client from sanity.client.ts and call these at the page level.
 *
 * Convention:
 *   - POST_CARD_FIELDS  — reusable fragment (no body, keeps list queries lean)
 *   - FULL_POST_FIELDS  — complete fields including body, for single post pages
 */

import { groq } from 'next-sanity'

// ─── Field fragments ────────────────────────────────────────────────────────

/**
 * Lightweight fields for list views / post cards.
 * Deliberately excludes 'body' to keep payloads small.
 */
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

// ─── Homepage ───────────────────────────────────────────────────────────────

/**
 * The single featured post for the homepage hero.
 * Falls back to the most recent post if nothing is marked featured.
 */
export const FEATURED_POST_QUERY = groq`
  *[_type == "post" && featured == true] | order(publishDate desc) [0] {
    ${POST_CARD_FIELDS}
  }
`

/**
 * Latest posts for the homepage grid — excludes the featured post.
 * $featuredId — pass the _id of the featured post to exclude it.
 */
export const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && _id != $featuredId] | order(publishDate desc) [0...$limit] {
    ${POST_CARD_FIELDS}
  }
`

/**
 * Most recent post that has a YouTube URL — for the "Latest Episode" section.
 */
export const LATEST_VIDEO_QUERY = groq`
  *[_type == "post" && defined(youtubeUrl)] | order(publishDate desc) [0] {
    ${POST_CARD_FIELDS}
  }
`

// ─── Single post page ────────────────────────────────────────────────────────

/**
 * Full post by slug — includes body for rendering and related posts.
 */
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug] [0] {
    _id,
    _createdAt,
    title,
    slug,
    publishDate,
    author,
    youtubeUrl,
    "audioUrl": audioFile.asset->url,
    excerpt,
    featured,
    tags,
    body,
    "category": category->{
      _id,
      title,
      slug,
      color
    }
  }
`

/**
 * Related posts — same category, excluding current post.
 * Used in the "Related Posts" section at the bottom of a post page.
 */
export const RELATED_POSTS_QUERY = groq`
  *[
    _type == "post"
    && category._ref == $categoryId
    && _id != $currentId
  ] | order(publishDate desc) [0...3] {
    ${POST_CARD_FIELDS}
  }
`

/**
 * All post slugs — used by generateStaticParams to pre-render post pages.
 */
export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─── Category pages ──────────────────────────────────────────────────────────

/**
 * All categories — used in the nav and for generateStaticParams.
 */
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    color
  }
`

/**
 * Single category by slug — used on the category landing page.
 * $slug — the slug.current of the category (e.g. "commentary").
 */
export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug] [0] {
    _id,
    title,
    slug,
    color
  }
`

/**
 * Posts filtered by category slug.
 * $categorySlug — the slug.current of the category.
 */
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[
    _type == "post"
    && category->slug.current == $categorySlug
  ] | order(publishDate desc) {
    ${POST_CARD_FIELDS}
  }
`

// ─── Site Settings ───────────────────────────────────────────────────────────

/**
 * The singleton Site Settings document.
 * Always fetch this on any page that needs social links or partner info.
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"] [0] {
    _id,
    siteTitle,
    tagline,
    socialLinks,
    partnerName,
    partnerUrl
  }
`
