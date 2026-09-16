import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  /** 角色名，如「小斑马斑斑」 */
  name?: string
  /** 角色说的话，显示在气泡中 */
  speech?: ReactNode
  /** 情绪状态，影响表情 */
  mood?: 'happy' | 'cheer' | 'think' | 'sad'
  /** 动画类型 */
  animation?: string
}

const MOOD_EMOJI: Record<string, string> = {
  happy: '🦓',
  cheer: '🦓',
  think: '🦓',
  sad: '🦓',
}

const MOOD_DECOR: Record<string, string> = {
  happy: '😊',
  cheer: '🎉',
  think: '🤔',
  sad: '💪',
}

/**
 * 角色 IP 组件 —— 小斑马斑斑贯穿全程，
 * 用对话气泡承载教学内容，降低阅读负担。
 */
export default function Character({
  name = '小斑马斑斑',
  speech,
  mood = 'happy',
  animation,
}: Props) {
  const animateProps =
    animation === 'bounce'
      ? { y: [0, -14, 0], transition: { repeat: Infinity, duration: 1.2 } }
      : animation === 'wave'
        ? { rotate: [0, -8, 8, 0], transition: { repeat: Infinity, duration: 1.6 } }
        : { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2.4 } }

  return (
    <div className="flex items-end gap-3">
      {/* 角色形象 */}
      <motion.div animate={animateProps} className="flex-shrink-0 relative">
        <div className="text-7xl md:text-8xl drop-shadow-md">{MOOD_EMOJI[mood]}</div>
        <span className="absolute -top-1 -right-1 text-2xl">{MOOD_DECOR[mood]}</span>
      </motion.div>

      {/* 对话气泡 */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: -12 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative bg-white rounded-3xl rounded-bl-sm px-5 py-4 shadow-lg border-4 border-purple-100 max-w-xl"
        >
          <div className="text-xs font-bold text-purple-400 mb-1">{name}</div>
          <div className="text-lg md:text-xl text-gray-700 leading-relaxed">{speech}</div>
        </motion.div>
      )}
    </div>
  )
}
