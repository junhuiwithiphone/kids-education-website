import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 语音朗读 Hook（基于浏览器 Web Speech API）
 *
 * 4 岁儿童大多不识字，语音是关键交互。
 * 注意：部分浏览器要求首次播放由用户手势触发，
 * 因此组件应在点击后再调用 speak()。
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  const speak = useCallback(
    (text: string, opts?: { rate?: number; pitch?: number }) => {
      if (!supported || !text) return

      // 打断上一句，避免语音堆叠
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      // 语速放慢、音调略高，更适合幼儿
      utterance.rate = opts?.rate ?? 0.85
      utterance.pitch = opts?.pitch ?? 1.15
      utterance.volume = 1

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [supported]
  )

  // 组件卸载时停止朗读
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
  }, [supported])

  return { speak, stop, speaking, supported }
}
