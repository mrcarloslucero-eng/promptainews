import type { Metadata } from 'next'
import { Inter }         from 'next/font/google'
import Script            from 'next/script'
import { Providers }                 from './providers'
import { Header, Footer }            from '@/components/layout'
import { client }                    from '@/lib/sanity.client'
import { SITE_SETTINGS_QUERY }       from '@/lib/sanity.queries'
import type { SiteSettings }         from '@/types'
import './globals.css'

/**
 * Inter — variable font loaded via next/font/google (self-hosted, no
 * external network request). The CSS variable --font-inter is referenced
 * in globals.css @theme so Tailwind utility classes pick it up.
 */
const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

export const metadata: Metadata = {
  title: {
    default:  'Prompt AI News',
    template: '%s | Prompt AI News',
  },
  description: 'AI News for Everyday People',
  metadataBase: new URL('https://promptainews.com'),
  openGraph: {
    siteName: 'Prompt AI News',
    locale:   'en_US',
    type:     'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PromptAINews',
  },
  verification: {
    google: ['NuBzujiExq6ccuD5lE-HLgxiJfwi9k9SzScG3vQ2gHo', 'ljR6Voo4H6kiJ24wAtDG-EKGFt9k_XFm2Cq9f9oV2oM'],
    other: {
      'msvalidate.01': '2E261F0504081F6F0FB68174491F8E92',
    },
  },
}

/**
 * Root layout — async server component.
 *
 * Fetches Sanity site settings once per request so the Header logo and
 * Footer tagline / social links / partner info are always up to date.
 *
 * suppressHydrationWarning on <html> is required by next-themes: the
 * server renders without the theme class; next-themes adds it client-side.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch site settings — gracefully falls back to null if Sanity is
  // unreachable (env vars not set in dev, etc.)
  let siteSettings: SiteSettings | null = null
  try {
    siteSettings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY)
  } catch {
    // silently degrade — components have sensible defaults
  }

  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer siteSettings={siteSettings} />
        </Providers>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
