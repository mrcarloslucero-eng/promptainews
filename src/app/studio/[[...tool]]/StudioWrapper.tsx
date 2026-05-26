'use client'

/**
 * StudioWrapper.tsx  —  CLIENT component
 *
 * Lives between the server page and StudioClient so that next/dynamic
 * with ssr:false is invoked inside a client boundary.  This guarantees
 * that StudioClient (and everything it imports — sanity, @sanity/ui,
 * styled-components) is NEVER evaluated on the server.
 */

import dynamic from 'next/dynamic'

const StudioClient = dynamic(
  () => import('./StudioClient'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          height:         '100vh',
          fontFamily:     'system-ui, sans-serif',
          color:          '#6B7A99',
          fontSize:       '0.875rem',
        }}
      >
        Loading studio…
      </div>
    ),
  },
)

export function StudioWrapper() {
  return <StudioClient />
}
