import { NextResponse } from 'next/server'
import { cookies }      from 'next/headers'

const PASSWORD = process.env.DASHBOARD_PASSWORD ?? 'changeme'
const COOKIE   = 'dashboard_auth'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge:   60 * 60 * 24, // 24 hours
    path:     '/dashboard',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}
