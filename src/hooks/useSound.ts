import { useCallback, useRef } from 'react'

/**
 * 音效 Hook（基于 Web Audio API 合成，无需音频文件）
 *
 * 4 岁儿童需要即时的听觉反馈：
 * - correct: 上行三音，欢快
 * - wrong:   低音短促，温和不吓人
 * - star:    清脆叮声
 * - complete: 胜利小旋律
 */
export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      if (!AudioCtx) return null
      ctxRef.current = new AudioCtx()
    }
    // 浏览器自动播放策略：需在用户手势后 resume
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback(
    (freq: number, startAt: number, duration: number, type: OscillatorType = 'sine', gain = 0.18) => {
      const ctx = getCtx()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const vol = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startAt)

      // 简单的 ADSR 包络，避免爆音
      vol.gain.setValueAtTime(0, ctx.currentTime + startAt)
      vol.gain.linearRampToValueAtTime(gain, ctx.currentTime + startAt + 0.02)
      vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startAt + duration)

      osc.connect(vol)
      vol.connect(ctx.destination)

      osc.start(ctx.currentTime + startAt)
      osc.stop(ctx.currentTime + startAt + duration + 0.05)
    },
    [getCtx]
  )

  const correct = useCallback(() => {
    // C5 - E5 - G5 上行大三和弦
    playTone(523.25, 0, 0.15, 'triangle')
    playTone(659.25, 0.1, 0.15, 'triangle')
    playTone(783.99, 0.2, 0.3, 'triangle')
  }, [playTone])

  const wrong = useCallback(() => {
    // 温和的低音，不刺耳不吓人
    playTone(220, 0, 0.18, 'sine', 0.12)
    playTone(196, 0.14, 0.25, 'sine', 0.1)
  }, [playTone])

  const star = useCallback(() => {
    // 清脆的叮声
    playTone(1318.51, 0, 0.12, 'sine', 0.14)
    playTone(1760, 0.07, 0.22, 'sine', 0.1)
  }, [playTone])

  const complete = useCallback(() => {
    // 胜利小旋律 C-E-G-C
    playTone(523.25, 0, 0.16, 'triangle')
    playTone(659.25, 0.14, 0.16, 'triangle')
    playTone(783.99, 0.28, 0.16, 'triangle')
    playTone(1046.5, 0.42, 0.45, 'triangle')
  }, [playTone])

  const click = useCallback(() => {
    playTone(880, 0, 0.06, 'square', 0.06)
  }, [playTone])

  return { correct, wrong, star, complete, click }
}
