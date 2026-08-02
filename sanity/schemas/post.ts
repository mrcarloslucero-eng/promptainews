/**
 * post.ts
 *
 * The central content type for Prompt AI News.
 *
 * Key fields:
 *   youtubeUrl  — optional. When present the video IS the hero and the
 *                 body becomes a collapsible transcript.
 *   featured    — pins one post to the homepage hero slot.
 *   body        — Portable Text (rich text). Used as article body for
 *                 text-only posts and as transcript for video posts.
 *
 * Field order matches the editorial workflow:
 *   1. Write the title → slug auto-generates
 *   2. Pick a category
 *   3. Paste the YouTube URL if it's a video post
 *   4. Write/paste the body / transcript
 *   5. Write a short excerpt for cards + SEO
 *   6. Set the publish date and author
 *   7. Optionally mark as Featured or add tags
 */

import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    // ── Identity ──────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        // Auto-generate; editor can override if needed.
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Classification ────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm' },
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Prompt AI News',
    }),

    // ── Audio ─────────────────────────────────────────────────────
    defineField({
      name: 'audioFile',
      title: 'Audio Recording (Carlos\'s Voice)',
      type: 'file',
      description:
        'Upload an MP3 recording of Carlos reading this summary. ' +
        'When present, "Tap to listen" plays this instead of the AI voice.',
      options: { accept: 'audio/*' },
    }),

    defineField({
      name: 'videoFile',
      title: 'Video Commentary (Carlos on Camera)',
      type: 'file',
      description:
        'Upload a short MP4 (H.264) of Carlos talking about this story — keep it under 2 minutes. ' +
        'Shows as a floating video player on the post. WMV will not play in browsers; ' +
        'convert to MP4 first (Clipchamp). Separate from the YouTube URL below.',
      options: { accept: 'video/mp4,video/*' },
    }),

    // ── Video ─────────────────────────────────────────────────────
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description:
        'Optional. Paste the full YouTube watch URL (e.g. https://www.youtube.com/watch?v=…). ' +
        'When present this video becomes the post hero and the body becomes a collapsible transcript.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((url) => {
          if (!url) return true // optional field
          const isYouTube =
            url.includes('youtube.com/watch') ||
            url.includes('youtu.be/')
          return isYouTube || 'Must be a YouTube URL (youtube.com/watch or youtu.be/)'
        }),
    }),

    // ── Content ───────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body / Transcript',
      type: 'array',
      description:
        'Full article text. For video posts this is shown as a collapsible transcript below the video.',
      of: [
        {
          type: 'block',
          // Heading levels available in the editor
          styles: [
            { title: 'Normal',     value: 'normal'     },
            { title: 'Heading 2',  value: 'h2'         },
            { title: 'Heading 3',  value: 'h3'         },
            { title: 'Heading 4',  value: 'h4'         },
            { title: 'Quote',      value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet',   value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',          value: 'strong' },
              { title: 'Italic',        value: 'em'     },
              { title: 'Inline Code',   value: 'code'   },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Short summary shown in post cards and used as the SEO meta description. Keep it under 160 characters.',
      validation: (Rule) => Rule.required().max(160),
    }),

    // ── Homepage controls ─────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Featured (Homepage Hero)',
      type: 'boolean',
      description:
        'Pin this post to the hero slot at the top of the homepage. ' +
        'Only one post should be featured at a time.',
      initialValue: false,
    }),

    // ── Discovery ─────────────────────────────────────────────────
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],

  // Default sort in the studio: newest first
  orderings: [
    {
      title: 'Publish Date, Newest',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title:    'title',
      category: 'category.title',
      date:     'publishDate',
      featured: 'featured',
    },
    prepare({ title, category, date, featured }) {
      const dateStr = date
        ? new Date(date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })
        : 'No date'
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${category ?? 'Uncategorized'} · ${dateStr}`,
      }
    },
  },
})
