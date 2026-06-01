/**
 * umami.ts — Server-side helper for the Umami Analytics API.
 * All functions are server-only (called from Server Components / Route Handlers).
 */

const UMAMI_URL        = process.env.UMAMI_URL        ?? ''
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID ?? ''
const UMAMI_USERNAME   = process.env.UMAMI_USERNAME   ?? ''
const UMAMI_PASSWORD   = process.env.UMAMI_PASSWORD   ?? ''

// ─── Auth ─────────────────────────────────────────────────────────────────────

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
    cache:   'no-store',
  })

  if (!res.ok) throw new Error('Umami auth failed')
  const { token } = await res.json()
  cachedToken = token
  tokenExpiry = Date.now() + 20 * 60 * 1000 // 20 min
  return token
}

async function umamiGet(path: string, params: Record<string, string> = {}) {
  const token = await getToken()
  const url   = new URL(`${UMAMI_URL}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next:    { revalidate: 60 },
  })

  if (!res.ok) throw new Error(`Umami API error: ${path}`)
  return res.json()
}

// ─── Time helpers ─────────────────────────────────────────────────────────────

function range(days: number) {
  const end   = Date.now()
  const start = end - days * 24 * 60 * 60 * 1000
  return { startAt: String(start), endAt: String(end) }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface UmamiStats {
  pageviews:  { value: number; prev: number }
  visitors:   { value: number; prev: number }
  visits:     { value: number; prev: number }
  bounces:    { value: number; prev: number }
  totaltime:  { value: number; prev: number }
}

export interface UmamiPageview {
  x: string   // date label
  y: number   // count
}

export interface UmamiMetric {
  x: string   // label
  y: number   // count
}

export async function getStats(days = 30): Promise<UmamiStats> {
  const data = await umamiGet(`/api/websites/${UMAMI_WEBSITE_ID}/stats`, range(days))
  // Umami v2 returns flat numbers + a comparison object instead of { value, prev } per field
  const c = data.comparison ?? {}
  return {
    pageviews: { value: data.pageviews ?? 0, prev: c.pageviews ?? 0 },
    visitors:  { value: data.visitors  ?? 0, prev: c.visitors  ?? 0 },
    visits:    { value: data.visits    ?? 0, prev: c.visits    ?? 0 },
    bounces:   { value: data.bounces   ?? 0, prev: c.bounces   ?? 0 },
    totaltime: { value: data.totaltime ?? 0, prev: c.totaltime ?? 0 },
  }
}

export async function getPageviews(days = 30): Promise<{ pageviews: UmamiPageview[]; sessions: UmamiPageview[] }> {
  return umamiGet(`/api/websites/${UMAMI_WEBSITE_ID}/pageviews`, {
    ...range(days),
    unit:     'day',
    timezone: 'America/Chicago',
  })
}

export async function getMetrics(type: 'url' | 'referrer' | 'browser' | 'os' | 'device' | 'country', days = 30): Promise<UmamiMetric[]> {
  return umamiGet(`/api/websites/${UMAMI_WEBSITE_ID}/metrics`, {
    ...range(days),
    type,
  })
}
