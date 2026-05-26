/**
 * siteSettings.ts
 *
 * Singleton document — there is exactly ONE of these in the dataset.
 * The studio structure (sanity.config.ts) pins it to a fixed document ID
 * "siteSettings" so it never duplicates.
 *
 * Contains: site title, tagline, all social links, partner info.
 */

import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  // Singleton enforcement is handled in sanity.config.ts via the
  // structure tool: S.document().documentId('siteSettings').
  // That pins the studio to one fixed document without needing
  // __experimental_actions (removed in Sanity v5).
  fields: [
    // ── Identity ──────────────────────────────────────────────────
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Prompt AI News',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'AI News for Everyday People',
    }),

    // ── Social Links ──────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'X (Twitter) URL',
          type: 'url',
          description: 'e.g. https://x.com/PromptAINews',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          description: 'e.g. https://youtube.com/@PromptAINews',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }),
      ],
    }),

    // ── Partner ───────────────────────────────────────────────────
    defineField({
      name: 'partnerName',
      title: 'Partner Name',
      type: 'string',
      initialValue: 'dotcreds.com',
    }),

    defineField({
      name: 'partnerUrl',
      title: 'Partner URL',
      type: 'url',
      initialValue: 'https://dotcreds.com',
    }),
  ],

  preview: {
    select: { title: 'siteTitle', subtitle: 'tagline' },
  },
})
