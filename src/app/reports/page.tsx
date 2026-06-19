import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reports & Analysis',
  description:
    'In-depth research reports and multi-perspective analysis on the issues shaping artificial intelligence.',
}

const REPORTS = [
  {
    href:        '/reports/ai-data-center-boom',
    date:        'June 2026',
    label:       'Research Report',
    title:       'The AI Data Center Boom: A Multi-Perspective Analysis',
    description:
      'Examining the societal and environmental impacts of the unprecedented AI data center build-out — energy consumption, water use, air quality, economic benefits, and the regulatory responses emerging worldwide.',
  },
]

export default function ReportsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--pan-body)' }}>
        Reports &amp; Analysis
      </h1>
      <p className="text-base mb-10" style={{ color: 'var(--pan-muted)' }}>
        In-depth research and multi-perspective analysis on the issues shaping AI.
      </p>

      <div className="flex flex-col gap-6">
        {REPORTS.map(({ href, date, label, title, description }) => (
          <div
            key={href}
            className="rounded-xl shadow-sm overflow-hidden"
            style={{
              background:  'var(--pan-surface)',
              border:      '1px solid var(--pan-border)',
              borderTop:   '4px solid #4A90D9',
            }}
          >
            <div className="p-6 sm:p-8">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#4A90D9' }}
              >
                {date} · {label}
              </p>
              <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--pan-body)' }}>
                {title}
              </h2>
              <p className="text-sm leading-6 mb-6" style={{ color: 'var(--pan-muted)' }}>
                {description}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#4A90D9' }}
              >
                Read Report →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
