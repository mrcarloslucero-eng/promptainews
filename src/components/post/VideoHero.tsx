/**
 * VideoHero.tsx
 *
 * Full-width 16:9 YouTube embed shown at the top of video-led posts.
 * Renders nothing if the post has no YouTube URL or the URL can't be parsed.
 *
 * Server component — no client JS.
 */

import { getYouTubeId, youtubeEmbedUrl } from '@/lib/utils'

interface VideoHeroProps {
  youtubeUrl?: string
  title:       string
}

export function VideoHero({ youtubeUrl, title }: VideoHeroProps) {
  const videoId = getYouTubeId(youtubeUrl)
  if (!videoId) return null

  return (
    <div className="w-full bg-black">
      {/* 16:9 aspect ratio using padding-bottom trick */}
      <div
        className="relative max-w-7xl mx-auto"
        style={{ paddingBottom: 'min(56.25%, calc(56.25vw))' }}
      >
        <iframe
          src={youtubeEmbedUrl(videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    </div>
  )
}
