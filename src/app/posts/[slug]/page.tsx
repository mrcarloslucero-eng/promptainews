/**
 * app/posts/[slug]/page.tsx  —  Single post page  (async server component)
 *
 * Data fetched per-request (ISR, revalidate 60s):
 *   1. Full post by slug — title, body, category, author, date, tags
 *   2. Related posts — up to 3 posts in the same category
 *
 * generateStaticParams   — pre-renders all published slugs at build time
 * generateMetadata       — per-post <title> / og:title / description
 *
 * Layout:
 *   [VideoHero]        full-width, only if post.youtubeUrl is set
 *   max-w-3xl column:
 *     [PostHeader]     category, title, author · date · reading time, tags
 *     [divider]
 *     [PostBody]       Portable Text
 *     [divider]
 *     [ShareButtons]   copy / X / LinkedIn
 *   max-w-7xl:
 *     [RelatedPosts]   "More in [Category]" grid
 *   floating bottom-right:
 *     [FloatingVideoPlayer]  only if post.videoFile is set (takes priority)
 *     [PostAutoReader]       otherwise, when ?listen=1
 */

import { notFound }         from 'next/navigation'
import { Suspense }          from 'react'
import type { Metadata }     from 'next'
import { client }            from '@/lib/sanity.client'
import { getPostBySlug }     from '@/lib/sanity.fetchers'
import {
  RELATED_POSTS_QUERY,
  ALL_POST_SLUGS_QUERY,
  COMMENTS_BY_POST_QUERY,
}                            from '@/lib/sanity.queries'
import {
  VideoHero,
  PostHeader,
  PostBody,
  ShareButtons,
  RelatedPosts,
  FloatingVideoPlayer,
}                            from '@/components/post'
import { PostAutoReader }    from '@/components/post/PostAutoReader'
import { CommentForm }       from '@/components/post/CommentForm'
import { CommentList }       from '@/components/post/CommentList'
import { JsonLd }            from '@/components/seo/JsonLd'
import { extractPlainText }  from '@/lib/utils'
import type { PostCard }     from '@/types'
import type { PortableTextBlock } from 'next-sanity'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptainews.com'

// ─── ISR ─────────────────────────────────────────────────────────────────────

export const revalidate = 60

// ─── Static params ───────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(ALL_POST_SLUGS_QUERY)
  return slugs.map(({ slug }) => ({ slug }))
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post     = await getPostBySlug(slug)   // memoised — no duplicate fetch

  if (!post) return { title: 'Post Not Found' }

  const postUrl = `${SITE_URL}/posts/${slug}`

  return {
    title:       post.title,
    description: post.excerpt,
    alternates:  { canonical: postUrl },
    openGraph: {
      title:         post.title,
      description:   post.excerpt,
      url:           postUrl,
      type:          'article',
      publishedTime: post.publishDate,
      tags:          post.tags ?? [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.excerpt,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Memoised — same result as generateMetadata, zero extra Sanity call
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const plainText = post.body?.length
    ? extractPlainText(post.body as unknown as Array<{ _type: string; children?: Array<{ text?: string }> }>)
    : ''

  // Fetch related posts and approved comments in parallel
  const [relatedPosts, comments] = await Promise.all([
    client.fetch<PostCard[]>(RELATED_POSTS_QUERY, {
      categoryId: post.category._id,
      currentId:  post._id,
    }),
    client.fetch<Array<{ _id: string; name: string; message: string; _createdAt: string }>>(
      COMMENTS_BY_POST_QUERY,
      { postId: post._id }
    ),
  ])

  // ── JSON-LD — NewsArticle structured data ─────────────────────────────────
  const articleSchema = {
    '@context':     'https://schema.org',
    '@type':        'NewsArticle',
    headline:       post.title,
    description:    post.excerpt,
    url:            `${SITE_URL}/posts/${slug}`,
    datePublished:  post.publishDate,
    dateModified:   post.publishDate,
    keywords:       (post.tags ?? []).join(', '),
    author: [{
      '@type': 'Organization',
      name:    'Prompt AI News',
      url:     SITE_URL,
    }],
    publisher: {
      '@type': 'Organization',
      name:    'Prompt AI News',
      url:     SITE_URL,
    },
    isPartOf: {
      '@type': 'WebSite',
      name:    'Prompt AI News',
      url:     SITE_URL,
    },
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* ── Video hero (full viewport width) ─────────────────────── */}
      <VideoHero youtubeUrl={post.youtubeUrl} title={post.title} />

      {/* ── Main content column ───────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">

        <PostHeader post={post} />

        <hr style={{ borderColor: 'var(--pan-border)' }} />

        <PostBody body={post.body} />

        <hr style={{ borderColor: 'var(--pan-border)' }} />

        <ShareButtons title={post.title} />

        <hr style={{ borderColor: 'var(--pan-border)' }} />

        {/* ── Comments ──────────────────────────────────────────── */}
        <section aria-labelledby="comments-heading" className="flex flex-col gap-6">
          <h2
            id="comments-heading"
            className="text-xl font-bold"
            style={{ color: 'var(--pan-body)' }}
          >
            {comments.length > 0
              ? `${comments.length} Comment${comments.length === 1 ? '' : 's'}`
              : 'Leave a Comment'}
          </h2>

          {/* Approved comments */}
          <CommentList comments={comments} />

          {/* Submission form */}
          <div
            className="rounded-2xl border p-6"
            style={{
              background:  'var(--pan-surface)',
              borderColor: 'var(--pan-border)',
            }}
          >
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--pan-muted)' }}
            >
              All comments are reviewed before appearing. Keep it respectful.
            </p>
            <CommentForm postId={post._id} postTitle={post.title} />
          </div>
        </section>

      </div>

      {/* ── Floating video commentary (bottom-right, always visible) ─ */}
      {post.videoUrl && (
        <FloatingVideoPlayer videoUrl={post.videoUrl} title={post.title} />
      )}

      {/* ── Auto-reader widget (floats bottom-right when ?listen=1) ─
           Yields the corner to the video widget when one exists. */}
      {plainText && !post.videoUrl && (
        <Suspense fallback={null}>
          <PostAutoReader text={plainText} audioUrl={post.audioUrl ?? null} />
        </Suspense>
      )}

      {/* ── Related posts (wider container) ──────────────────────── */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <RelatedPosts posts={relatedPosts} category={post.category} />
        </div>
      )}
    </>
  )
}
