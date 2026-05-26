'use client'

/**
 * StudioClient.tsx  —  client component
 *
 * Imports NextStudio + sanity.config here (not in page.tsx) so that
 * next/dynamic with ssr:false can tree-shake this entire module out of
 * the server bundle.  styled-components never runs on the server.
 */

import { NextStudio } from 'next-sanity/studio'
import config         from '../../../../sanity.config'

export default function StudioClient() {
  return <NextStudio config={config} />
}
