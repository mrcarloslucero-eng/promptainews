'use client'

/**
 * StudioWrapper.tsx  —  CLIENT component
 *
 * Holds the next/dynamic + ssr:false boundary so that StudioClient
 * (and everything it imports: sanity, @sanity/ui, styled-components)
 * is never evaluated on the server.
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
