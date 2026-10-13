import { useState } from 'react'
import { motion } from 'framer-motion'
import type { EquationConfig } from '../../types/lesson'

interface Props {
  config: EquationConfig
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

/**
 * 算式填空题 —— 点选数字键盘填入 null 空位。
 *
 * 零挫败：答错抖动 +「再想一想」，可无限重试。无音效。
 */
export default function EquationQuestion({ config, onAnswer, disabled }: Props) {
  const [picked, setPicked] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const [shaking, setShaking] = useState(false)

  const keypad = config.keypad ?? Array.from({ length: 21 }, (_, i) => i)
  const hasBlankInTerms = config.terms.some((t) => t === null)
  /** 空格在算式中间 → 右侧显示已知得数；否则空格在等号右边（填得数） */
  const blankOnRight = !hasBlankInTerms
  const equalsDisplay = blankOnRight
    ? picked !== null
      ? String(picked)
      : '▢'
    : config.equals !== undefined
      ? String(config.equals)
      : '?'

  const handlePick = (n: number) => {
    if (disabled || solved) return
    setPicked(n)

    if (n === config.answer) {
      setSolved(true)
      onAnswer(true)
    } else {
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
        setPicked(null)
      }, 500)
    }
  }

  return (
    <div className="space-y-6">
      {/* 算式展示 */}
      <motion.div
        animate={shaking ? { x: [0, -10, 10, -6, 6, 0] } : {}}
        transition={{ duration: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-6 px-4
          bg-purple-50 rounded-3xl border-4 border-purple-200"
      >
        {config.terms.map((term, i) => {
          if (term === null) {
            return (
              <span
                key={i}
                className={`min-w-[3.5rem] h-16 md:h-20 px-3 rounded-2xl border-4 border-dashed
                  flex items-center justify-center text-3xl md:text-4xl font-bold
                  ${
                    solved
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : shaking
                        ? 'bg-gray-100 border-gray-300 text-gray-400'
                        : 'bg-white border-purple-300 text-purple-500'
                  }`}
              >
                {picked !== null ? picked : '▢'}
              </span>
            )
          }

          const isOp = typeof term === 'string'
          return (
            <span
              key={i}
              className={`text-3xl md:text-5xl font-bold ${
                isOp ? 'text-purple-400' : 'text-gray-700'
              }`}
            >
              {term}
            </span>
          )
        })}

        <span className="text-3xl md:text-5xl font-bold text-purple-400">=</span>
        <span
          className={
            blankOnRight
              ? `min-w-[3.5rem] h-16 md:h-20 px-3 rounded-2xl border-4 border-dashed
                flex items-center justify-center text-3xl md:text-4xl font-bold
                ${
                  solved
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : shaking
                      ? 'bg-gray-100 border-gray-300 text-gray-400'
                      : 'bg-white border-purple-300 text-purple-500'
                }`
              : 'text-3xl md:text-5xl font-bold text-gray-700'
          }
        >
          {equalsDisplay}
        </span>
      </motion.div>

      {/* 数字键盘 */}
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 md:gap-3 justify-items-center max-w-lg mx-auto">
        {keypad.map((n) => {
          const isAnswer = solved && n === config.answer
          return (
            <motion.button
              key={n}
              whileTap={solved || disabled ? {} : { scale: 0.9 }}
              onClick={() => handlePick(n)}
              disabled={disabled || solved}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 text-2xl font-bold
                shadow-md transition-colors
                ${
                  isAnswer
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : 'bg-white border-purple-200 hover:border-purple-400 text-gray-700'
                }
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {n}
            </motion.button>
          )
        })}
      </div>

      {shaking && !solved && (
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
