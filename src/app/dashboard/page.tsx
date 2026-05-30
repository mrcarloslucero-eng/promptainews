import { cookies }        from 'next/headers'
import { redirect }       from 'next/navigation'
import { getStats, getPageviews, getMetrics } from '@/lib/umami'
import { PageviewsChart, MetricsBar }         from './DashboardCharts'

function StatCard({ label, value, prev }: { label: string; value: number; prev: number }) {
  const change  = prev > 0 ? Math.round(((value - prev) / prev) * 100) : 0
  const up      = change >= 0
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl border p-5"
      style={{ background: 'var(--pan-surface)', borderColor: 'var(--pan-border)' }}
    >
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--pan-muted)' }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: 'var(--pan-body)' }}>
        {value.toLocaleString()}
      </p>
      {prev > 0 && (
        <p className="text-xs font-medium" style={{ color: up ? '#22c55e' : '#ef4444' }}>
          {up ? '▲' : '▼'} {Math.abs(change)}% vs prev period
        </p>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-4"
      style={{ background: 'var(--pan-surface)', borderColor: 'var(--pan-border)' }}
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--pan-muted)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const auth        = cookieStore.get('dashboard_auth')
  if (!auth) redirect('/dashboard/login')

  // Fetch all data in parallel — gracefully handle Umami being unreachable
  const [stats, pageviews, topPages, referrers, browsers, devices] = await Promise.allSettled([
    getStats(30),
    getPageviews(30),
    getMetrics('url', 30),
    getMetrics('referrer', 30),
    getMetrics('browser', 30),
    getMetrics('device', 30),
  ])

  const s  = stats.status      === 'fulfilled' ? stats.value      : null
  const pv = pageviews.status  === 'fulfilled' ? pageviews.value  : null
  const tp = topPages.status   === 'fulfilled' ? topPages.value   : []
  const rf = referrers.status  === 'fulfilled' ? referrers.value  : []
  const br = browsers.status   === 'fulfilled' ? browsers.value   : []
  const dv = devices.status    === 'fulfilled' ? devices.value    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--pan-body)' }}>
            Analytics Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--pan-muted)' }}>
            Last 30 days · Prompt AI News
          </p>
        </div>
        <form action="/api/dashboard-auth" method="POST">
          <button
            formMethod="delete"
            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
            style={{ color: 'var(--pan-muted)', borderColor: 'var(--pan-border)' }}
            formAction="/api/dashboard-auth"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      {s ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Visitors"   value={s.visitors.value}  prev={s.visitors.prev}  />
          <StatCard label="Page Views" value={s.pageviews.value} prev={s.pageviews.prev} />
          <StatCard label="Visits"     value={s.visits.value}    prev={s.visits.prev}    />
          <StatCard label="Bounce Rate"
            value={s.visits.value > 0 ? Math.round((s.bounces.value / s.visits.value) * 100) : 0}
            prev={0}
          />
        </div>
      ) : (
        <div className="rounded-2xl border p-6 text-center text-sm" style={{ color: 'var(--pan-muted)', borderColor: 'var(--pan-border)' }}>
          Could not load stats — check your Umami connection.
        </div>
      )}

      {/* ── Page views chart ────────────────────────────────────── */}
      {pv?.pageviews?.length ? (
        <Section title="Page Views — Last 30 Days">
          <PageviewsChart data={pv.pageviews} />
        </Section>
      ) : null}

      {/* ── Two-column: top pages + referrers ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tp.length > 0 && (
          <Section title="Top Pages">
            <MetricsBar data={tp} />
          </Section>
        )}
        {rf.length > 0 && (
          <Section title="Top Referrers">
            <MetricsBar data={rf} />
          </Section>
        )}
      </div>

      {/* ── Browsers + Devices ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {br.length > 0 && (
          <Section title="Browsers">
            <MetricsBar data={br} limit={6} />
          </Section>
        )}
        {dv.length > 0 && (
          <Section title="Devices">
            <MetricsBar data={dv} limit={6} />
          </Section>
        )}
      </div>

      {(!tp.length && !rf.length && !br.length && !dv.length) && (
        <div
          className="rounded-2xl border p-10 text-center"
          style={{ borderColor: 'var(--pan-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
            No visitor data yet — make sure the Umami tracking script is active and your site has received traffic.
          </p>
        </div>
      )}

    </div>
  )
}
