'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import type { UmamiPageview, UmamiMetric } from '@/lib/umami'

// ─── Page views line chart ─────────────────────────────────────────────────

export function PageviewsChart({ data }: { data: UmamiPageview[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="x"
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => {
            const d = new Date(v)
            return `${d.getMonth() + 1}/${d.getDate()}`
          }}
        />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 10, fontSize: 12 }}
          labelStyle={{ color: '#94a3b8' }}
          itemStyle={{ color: '#4A90D9' }}
          labelFormatter={v => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#4A90D9"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#4A90D9' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// ─── Horizontal bar chart for top pages / referrers ────────────────────────

export function MetricsBar({ data, limit = 8 }: { data: UmamiMetric[]; limit?: number }) {
  const top = data.slice(0, limit)
  return (
    <ResponsiveContainer width="100%" height={top.length * 36 + 20}>
      <BarChart data={top} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="x"
          width={160}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => (v?.length > 22 ? v.slice(0, 22) + '…' : v)}
        />
        <Tooltip
          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 10, fontSize: 12 }}
          cursor={{ fill: 'rgba(74,144,217,0.08)' }}
          itemStyle={{ color: '#4A90D9' }}
        />
        <Bar dataKey="y" radius={[0, 6, 6, 0]} maxBarSize={18}>
          {top.map((_, i) => (
            <Cell key={i} fill={i === 0 ? '#4A90D9' : `rgba(74,144,217,${0.75 - i * 0.07})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
