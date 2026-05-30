import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/login')) {
    const auth = req.cookies.get('dashboard_auth')
    if (!auth) {
      return NextResponse.redirect(new URL('/dashboard/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
