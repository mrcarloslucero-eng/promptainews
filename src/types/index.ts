/**
 * types/index.ts
 *
 * TypeScript types that mirror the Sanity schemas.
 * These are used throughout the app so component props are type-safe.
 *
 * PortableTextBlock is the runtime type for Sanity's rich-text content.
 */

import type { PortableTextBlock } from 'next-sanity'

// ─── Category ──────────────────────────────────────────────────────────────

export interface Category {
  _id:   string
  title: string
  slug:  { current: string }
  /** Hex color string e.g. '#4A90D9' */
  color: string
}

// ─── Post ───────────────────────────────────────────────────────────────────

export interface Post {
  _id:         string
  _createdAt:  string
  title:       string
  slug:        { current: string }
  category:    Category
  publishDate: string          // ISO datetime
  author:      string
  /** Full YouTube watch URL — present means the post is video-led */
  youtubeUrl?: string
  /** Carlos's recorded audio URL — when present plays instead of AI voice */
  audioUrl?: string | null
  /** Carlos's on-camera commentary URL — shows as a floating video player */
  videoUrl?: string | null
  body:        PortableTextBlock[]
  excerpt:     string
  featured:    boolean
  tags:        string[]
}

/**
 * Lightweight version used in post cards and feeds.
 * Fetched without the full body to keep list queries fast.
 */
export interface PostCard {
  _id:         string
  title:       string
  slug:        { current: string }
  category:    Category
  publishDate: string
  youtubeUrl?: string
  excerpt:     string
  featured:    boolean
}

// ─── Site Settings ──────────────────────────────────────────────────────────

export interface SocialLinks {
  twitter?:   string
  youtube?:   string
  instagram?: string
  tiktok?:    string
}

export interface SiteSettings {
  _id:         string
  siteTitle:   string
  tagline:     string
  socialLinks: SocialLinks
  partnerName: string
  partnerUrl:  string
}
