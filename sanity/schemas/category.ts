/**
 * category.ts
 *
 * The three categories used across the site:
 *   Commentary  — brand blue  #4A90D9
 *   Interviews  — green       #2ECC71
 *   Career Corner — orange    #F39C12
 *
 * Each post references exactly one category.
 * The color field drives the badge in PostCard and CategoryTag.
 */

import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'string',
      description:
        'Hex color for the category badge. Preset values match the brand palette.',
      options: {
        list: [
          { title: 'Commentary — Blue #4A90D9',        value: '#4A90D9' },
          { title: 'Interviews — Green #2ECC71',       value: '#2ECC71' },
          { title: 'Career Corner — Orange #F39C12',   value: '#F39C12' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: 'title', color: 'color' },
    prepare({ title, color }) {
      return { title, subtitle: color ?? 'No color set' }
    },
  },
})
