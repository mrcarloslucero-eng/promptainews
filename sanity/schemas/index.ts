/**
 * schemas/index.ts
 * Schema registry — import order determines the sidebar order in Sanity Studio.
 */

import { post }         from './post'
import { category }     from './category'
import { siteSettings } from './siteSettings'
import { comment }      from './comment'

export const schemaTypes = [post, category, siteSettings, comment]
