/**
 * schemas/index.ts
 * Schema registry — import order determines the sidebar order in Sanity Studio.
 */

import { post }         from './post'
import { category }     from './category'
import { siteSettings } from './siteSettings'

export const schemaTypes = [post, category, siteSettings]
