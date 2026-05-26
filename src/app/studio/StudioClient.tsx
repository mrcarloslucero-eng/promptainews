'use client'

/**
 * StudioClient.tsx  —  CLIENT component
 *
 * Imports NextStudio and sanity.config. Loaded only on the client
 * via StudioWrapper's dynamic import (ssr:false), so styled-components
 * never runs on the server.
 */

import { NextStudio } from 'next-sanity/studio'
import config         from '../../../sanity.config'

export default function StudioClient() {
  return <NextStudio config={config} />
}
