'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/dashboard-auth', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--pan-bg)' }}>
      <div className="w-full max-w-sm rounded-2xl border p-8 flex flex-col gap-6"
        style={{ background: 'var(--pan-surface)', borderColor: 'var(--pan-border)' }}>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold" style={{ color: 'var(--pan-body)' }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: 'var(--pan-muted)' }}>
            Enter your password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
            style={{
              background:  'var(--pan-bg)',
              borderColor: 'var(--pan-border)',
              color:       'var(--pan-body)',
            }}
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: '#4A90D9' }}
          >
            {loading ? 'Checking…' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
