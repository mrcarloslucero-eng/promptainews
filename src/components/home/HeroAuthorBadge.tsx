import Image from 'next/image'

export function HeroAuthorBadge() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="rounded-full overflow-hidden"
        style={{
          width:     '3.75rem',
          height:    '3.75rem',
          display:   'block',
          boxShadow: '0 0 0 2px var(--pan-border)',
        }}
      >
        <Image
          src="/profile-pic.png"
          alt="Carlos Lucero"
          width={60}
          height={60}
          className="object-cover w-full h-full"
        />
      </span>

      <span className="flex flex-col items-start leading-tight">
        <span className="text-sm font-semibold" style={{ color: 'var(--pan-body)' }}>
          Carlos Lucero
        </span>
        <span className="text-xs" style={{ color: 'var(--pan-muted)' }}>
          Prompt AI News
        </span>
      </span>
    </div>
  )
}
