import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { splitSentences } from '../lib/storyText'

export type ReadStatus = 'idle' | 'playing' | 'paused'

function resetSynth() {
  const synth = window.speechSynthesis
  synth.cancel()
  if (synth.paused) synth.resume()
}

function pickChineseVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((voice) => voice.lang.replace('_', '-').toLowerCase() === 'zh-cn') ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith('zh')) ??
    null
  )
}

function ensureVoices(): Promise<void> {
  if (window.speechSynthesis.getVoices().length > 0) return Promise.resolve()
  return new Promise((resolve) => {
    const done = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', done)
      resolve()
    }
    window.speechSynthesis.addEventListener('voiceschanged', done)
    window.setTimeout(done, 400)
  })
}

export function useReadAloud(text: string) {
  const sentences = useMemo(() => splitSentences(text), [text])
  const sentencesRef = useRef(sentences)
  sentencesRef.current = sentences

  const [index, setIndex] = useState(-1)
  const [status, setStatus] = useState<ReadStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const tokenRef = useRef(0)
  const indexRef = useRef(-1)

  const stop = useCallback(() => {
    tokenRef.current += 1
    if (window.speechSynthesis) resetSynth()
    indexRef.current = -1
    setIndex(-1)
    setStatus('idle')
  }, [])

  useEffect(() => {
    stop()
  }, [text, stop])

  useEffect(() => {
    return () => {
      tokenRef.current += 1
      if (window.speechSynthesis) resetSynth()
    }
  }, [])

  const speakFrom = useCallback((start: number) => {
    if (!window.speechSynthesis) {
      setError('这台设备暂时不能朗读')
      return
    }
    const list = sentencesRef.current
    if (list.length === 0) return

    const token = (tokenRef.current += 1)
    resetSynth()
    setError(null)
    setStatus('playing')

    window.setTimeout(() => {
      void (async () => {
        if (token !== tokenRef.current) return
        await ensureVoices()
        if (token !== tokenRef.current) return

        const voice = pickChineseVoice()
        const run = (cursor: number) => {
          if (token !== tokenRef.current) return
          if (cursor >= list.length) {
            indexRef.current = -1
            setIndex(-1)
            setStatus('idle')
            return
          }

          const utter = new SpeechSynthesisUtterance(list[cursor])
          utter.lang = 'zh-CN'
          utter.rate = 0.85
          if (voice) utter.voice = voice
          utter.onstart = () => {
            if (token !== tokenRef.current) return
            indexRef.current = cursor
            setIndex(cursor)
            setStatus('playing')
          }
          utter.onend = () => run(cursor + 1)
          utter.onerror = (event) => {
            if (event.error === 'interrupted' || event.error === 'canceled') return
            if (token !== tokenRef.current) return
            setStatus('idle')
            setError('朗读中断了，再试一次吧')
          }
          window.speechSynthesis.speak(utter)
        }

        run(Math.max(0, Math.min(start, list.length - 1)))
      })()
    }, 80)
  }, [])

  const play = useCallback(() => {
    const start = status === 'paused' && indexRef.current >= 0 ? indexRef.current : 0
    speakFrom(start)
  }, [speakFrom, status])

  const pause = useCallback(() => {
    tokenRef.current += 1
    if (window.speechSynthesis) resetSynth()
    setStatus('paused')
  }, [])

  return { sentences, index, status, error, play, pause, stop, speakFrom }
}
