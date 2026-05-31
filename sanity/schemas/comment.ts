/**
 * comment.ts
 *
 * A comment left by a visitor on a post.
 *
 * KEY DESIGN DECISIONS:
 *
 * 1. approved: false by default — every comment starts invisible.
 *    Carlos reviews in Sanity Studio and publishes what he wants live.
 *    This is called "pre-moderation" and prevents spam/abuse entirely.
 *
 * 2. post reference — each comment is linked to the post it was left on.
 *    Sanity's reference type creates a real relationship between documents,
 *    not just a stored string. This means if you query a post, you can
 *    also pull its comments in the same GROQ query.
 *
 * 3. No authentication required — visitors just enter a name and message.
 *    Keeping friction low = more engagement. Spam is handled by moderation,
 *    not by making people sign up for an account.
 */

import { defineField, defineType } from 'sanity'

export const comment = defineType({
  name:  'comment',
  title: 'Comment',
  type:  'document',

  fields: [
    defineField({
      name:  'name',
      title: 'Name',
      type:  'string',
      validation: (Rule) => Rule.required().min(1).max(80),
    }),

    defineField({
      name:  'message',
      title: 'Message',
      type:  'text',
      rows:  4,
      validation: (Rule) => Rule.required().min(2).max(1000),
    }),

    // Reference to the post this comment belongs to.
    // Sanity stores this as { _type: 'reference', _ref: 'post-document-id' }
    defineField({
      name:  'post',
      title: 'Post',
      type:  'reference',
      to:    [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),

    // The moderation gate — false until Carlos approves in Sanity Studio.
    // Only approved comments are queried and displayed on the site.
    defineField({
      name:         'approved',
      title:        'Approved',
      type:         'boolean',
      description:  'Tick this to make the comment visible on the site.',
      initialValue: false,
    }),
  ],

  // Show newest comments first in Studio, with approval status visible
  orderings: [
    {
      title: 'Newest first',
      name:  'createdAtDesc',
      by:    [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      name:     'name',
      message:  'message',
      post:     'post.title',
      approved: 'approved',
    },
    prepare({ name, message, post, approved }) {
      return {
        title:    `${approved ? '✅' : '⏳'} ${name}`,
        subtitle: `${post ?? 'Unknown post'} — ${message?.substring(0, 60)}…`,
      }
    },
  },
})
