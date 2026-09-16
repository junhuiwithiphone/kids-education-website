import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Option } from '../../types/lesson'
import SpeakButton from '../SpeakButton'
import { useSound } from '../../hooks/useSound'

interface Props {
  options: Option[]
  correctAnswer: string | number
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
  /** 主题色，编程模块用橙色、科学用青色等 */
  accent?: 'purple' | 'orange' | 'teal'
}

const ACCENT = {
  purple: 'border-purple-300 hover:border-purple-500',
  orange: 'border-orange-300 hover:border-orange-500',
  teal: 'border-teal-300 hover:border-teal-500',
}

/**
 * 点选题 —— choice / loop / debug 三种题型共用。
 *
 * 零挫败设计：
 * - 答错不显示红叉，只温和抖动 + 提示「再想想」
 * - 可无限重试，直到答对
 * - 答对后锁定，播放欢呼音效
 */
export default function ChoiceQuestion({
  options,
  correctAnswer,
  onAnswer,
  disabled,
  accent = 'purple',
}: Props) {
  const { click, correct, wrong } = useSound()
  const [solved, setSolved] = useState(false)
  const [shakeId, setShakeId] = useState<string | null>(null)

  const handlePick = (option: Option) => {
    if (disabled || solved) return
    click()

    const isCorrect = option.id === correctAnswer
    if (isCorrect) {
      setSolved(true)
      correct()
      onAnswer(true)
    } else {
      // 温和的错误反馈：抖动 + 短暂标灰，不显示红叉
      wrong()
      setShakeId(option.id)
      setTimeout(() => setShakeId(null), 500)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => {
          const isShaking = shakeId === option.id
          const isAnswer = solved && option.id === correctAnswer

          // 用 div[role=button] 而非 <button>，避免与内部朗读按钮形成非法嵌套
          return (
            <motion.div
              key={option.id}
              role="button"
              tabIndex={disabled || solved ? -1 : 0}
              aria-disabled={disabled || solved}
              whileTap={solved || disabled ? {} : { scale: 0.95 }}
              animate={
                isShaking
                  ? { x: [0, -10, 10, -6, 6, 0] }
                  : isAnswer
                    ? { scale: [1, 1.08, 1] }
                    : {}
              }
              transition={{ duration: isShaking ? 0.45 : 0.35 }}
              onClick={() => handlePick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handlePick(option)
                }
              }}
              className={`relative min-h-[88px] px-5 py-4 rounded-3xl border-4 shadow-md
                flex items-center justify-center gap-3 text-xl font-bold transition-colors cursor-pointer
                outline-none focus-visible:ring-4 focus-visible:ring-purple-300
                ${
                  isAnswer
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : isShaking
                      ? 'bg-gray-100 border-gray-300 text-gray-400'
                      : `bg-white ${ACCENT[accent]} text-gray-700`
                }
                ${disabled || solved ? 'cursor-not-allowed' : ''}`}
            >
              <span className="text-2xl">{option.text}</span>

              {isAnswer && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 text-3xl"
                >
                  🎉
                </motion.span>
              )}

              {!solved && !disabled && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 scale-75"
                >
                  <SpeakButton text={option.text} size="sm" />
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* 答错时的鼓励提示 */}
      {shakeId && !solved && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-bold text-orange-500"
        >
          💪 再想一想，你可以的！
        </motion.div>
      )}

      {solved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-2xl font-bold text-green-600"
        >
          ⭐ 答对啦！真棒！
        </motion.div>
      )}
    </div>
  )
}
