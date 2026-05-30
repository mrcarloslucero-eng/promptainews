import Image from 'next/image'
import Link  from 'next/link'

interface HeroAuthorBadgeProps {
  slug: string
}

export function HeroAuthorBadge({ slug }: HeroAuthorBadgeProps) {
  return (
    <Link
      href={`/posts/${slug}?listen=1`}
      className="flex items-center gap-2.5 group"
      aria-label="Tap to hear Carlos read the summary"
    >
      <span
        className="rounded-full overflow-hidden ring-2 transition-all group-hover:ring-[#4A90D9]"
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
        <span
          className="text-xs transition-colors group-hover:opacity-80"
          style={{ color: '#4A90D9' }}
        >
          Tap to listen ▶
        </span>
      </span>
    </Link>
  )
}
