'use client'

/**
 * providers.tsx
 *
 * Wraps the app in ThemeProvider from next-themes.
 * Must be a Client Component — ThemeProvider uses React context.
 *
 * defaultTheme: 'dark'   → site launches in dark mode by default
 * attribute: 'class'     → next-themes toggles class="dark" on <html>
 * disableTransitionOnChange: false → we handle transitions in CSS
 */

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}
