'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface PostAutoReaderProps {
  text: string
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  return (
    voices.find(v => v.name === 'Google US English') ||
    voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
    voices.find(v => !v.localService && v.lang.startsWith('en-US')) ||
    voices.find(v => !v.localService && v.lang.startsWith('en')) ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0] ||
    null
  )
}

function getVoice(): Promise<SpeechSynthesisVoice | null> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) { resolve(pickVoice(voices)); return }
    const onChanged = () => {
      window.speechSynthesis.onvoiceschanged = null
      resolve(pickVoice(window.speechSynthesis.getVoices()))
    }
    window.speechSynthesis.onvoiceschanged = onChanged
    setTimeout(() => { window.speechSynthesis.onvoiceschanged = null; resolve(null) }, 3000)
  })
}

const BARS: [number, number][] = [
  [0.8, 0.00],
  [0.5, 0.10],
  [1.0, 0.20],
  [0.6, 0.05],
  [0.9, 0.15],
  [0.7, 0.25],
]

export function PostAutoReader({ text }: PostAutoReaderProps) {
  const params   = useSearchParams()
  const autoplay = params.get('listen') === '1'

  const [speaking, setSpeaking] = useState(false)
  const [visible,  setVisible]  = useState(autoplay)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!autoplay || startedRef.current || !window.speechSynthesis) return
    startedRef.current = true

    getVoice().then((voice) => {
      const utterance      = new SpeechSynthesisUtterance(text)
      utterance.rate       = 0.92
      utterance.pitch      = 1
      utterance.volume     = 1
      if (voice) utterance.voice = voice
      utterance.onstart = () => setSpeaking(true)
      utterance.onend   = () => { setSpeaking(false) }
      utterance.onerror = () => { setSpeaking(false) }
      window.speechSynthesis.speak(utterance)
    })

    return () => { window.speechSynthesis.cancel() }
  }, [autoplay, text])

  function stopReading() {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes pan-bar {
          0%, 100% { transform: scaleY(0.15); opacity: 0.4; }
          50%       { transform: scaleY(1);    opacity: 1;   }
        }
        @keyframes pan-bob {
          0%, 100% { transform: translateY(0px)  scale(1);    }
          25%      { transform: translateY(-3px) scale(1.02); }
          75%      { transform: translateY(1px)  scale(0.99); }
        }
      `}</style>

      {/* Floating widget — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl"
        style={{
          background:  'var(--pan-surface)',
          border:      '1px solid var(--pan-border)',
          boxShadow:   '0 8px 32px rgba(0,0,0,0.18)',
        }}
      >
        {/* Photo + bars */}
        <span className="flex flex-col items-center gap-1.5">
          <span
            className="rounded-full overflow-hidden"
            style={{
              width:      '3.5rem',
              height:     '3.5rem',
              boxShadow:  speaking
                ? '0 0 0 2.5px #4A90D9, 0 0 14px #4A90D940'
                : '0 0 0 2px var(--pan-border)',
              transition: 'box-shadow 0.3s ease',
              display:    'block',
              animation:  speaking ? 'pan-bob 1.6s ease-in-out infinite' : 'none',
            }}
          >
            <Image
              src="/profile-pic.png"
              alt="Carlos Lucero"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </span>

          {/* Equalizer bars */}
          <span
            className="flex items-end gap-px"
            style={{ height: '14px', opacity: speaking ? 1 : 0, transition: 'opacity 0.3s' }}
          >
            {BARS.map(([dur, delay], i) => (
              <span
                key={i}
                style={{
                  display:         'block',
                  width:           '3px',
                  height:          '100%',
                  backgroundColor: '#4A90D9',
                  borderRadius:    '2px',
                  transformOrigin: 'bottom',
                  animation:       speaking
                    ? `pan-bar ${dur}s ease-in-out ${delay}s infinite`
                    : 'none',
                }}
              />
            ))}
          </span>
        </span>

        {/* Label */}
        <span className="flex flex-col items-start leading-snug">
          <span className="text-sm font-semibold" style={{ color: 'var(--pan-body)' }}>
            Carlos Lucero
          </span>
          <span className="text-xs" style={{ color: '#4A90D9' }}>
            {speaking ? 'Reading summary…' : 'Finished'}
          </span>
        </span>

        {/* Stop / close button */}
        <button
          onClick={stopReading}
          aria-label="Stop reading"
          className="ml-1 flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-red-50"
          style={{ color: 'var(--pan-muted)', flexShrink: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>
      </div>
    </>
  )
}
