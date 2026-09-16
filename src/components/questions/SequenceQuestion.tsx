import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CommandBlock, SequenceConfig } from '../../types/lesson'
import SpeakButton from '../SpeakButton'
import { useSound } from '../../hooks/useSound'

interface Props {
  config: SequenceConfig
  /** 孩子提交答案后回调，告知是否正确 */
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

/**
 * 指令排序题 —— 点选式交互（MVP 不做拖拽）。
 *
 * 交互流程：
 * 1. 下方是打乱的指令卡片，孩子按正确顺序依次点击
 * 2. 点中的卡片飞入上方「指令槽」，并朗读出来
 * 3. 排满后自动判定；错了可点「重来」无限重试（零挫败）
 */
export default function SequenceQuestion({ config, onAnswer, disabled }: Props) {
  const { click, correct, wrong } = useSound()
  const [picked, setPicked] = useState<string[]>([])
  const [checked, setChecked] = useState(false)

  const remaining = config.blocks.filter((b) => !picked.includes(b.id))
  const pickedBlocks = picked
    .map((id) => config.blocks.find((b) => b.id === id))
    .filter((b): b is CommandBlock => Boolean(b))

  const isFull = picked.length === config.solution.length

  const handlePick = (block: CommandBlock) => {
    if (disabled || checked || isFull) return
    click()
    setPicked((prev) => [...prev, block.id])
  }

  const handleRemove = (id: string) => {
    if (disabled || checked) return
    click()
    setPicked((prev) => prev.filter((p) => p !== id))
  }

  const handleReset = () => {
    click()
    setPicked([])
    setChecked(false)
  }

  // 排满后自动判定
  const handleCheck = () => {
    if (!isFull || checked) return
    const isCorrect = picked.every((id, i) => id === config.solution[i])
    setChecked(true)
    if (isCorrect) {
      correct()
    } else {
      wrong()
    }
    onAnswer(isCorrect)
  }

  return (
    <div className="space-y-6">
      {/* 指令槽 */}
      <div>
        <div className="text-sm font-bold text-gray-400 mb-2">👇 按顺序点一点，把指令排好</div>
        <div className="flex flex-wrap gap-3 min-h-[96px] p-4 bg-purple-50 rounded-3xl border-4 border-dashed border-purple-200">
          <AnimatePresence>
            {pickedBlocks.map((block, idx) => (
              <motion.button
                key={block.id}
                layout
                initial={{ scale: 0.4, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                onClick={() => handleRemove(block.id)}
                disabled={disabled || checked}
                className={`relative flex flex-col items-center justify-center gap-1 w-20 h-20 rounded-2xl shadow-md
                  ${
                    checked
                      ? block.id === config.solution[idx]
                        ? 'bg-green-100 border-4 border-green-400'
                        : 'bg-red-100 border-4 border-red-300'
                      : 'bg-white border-4 border-purple-300 hover:border-purple-500'
                  } transition-colors`}
              >
                <span className="absolute -top-2 -left-2 w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-3xl">{block.icon}</span>
                <span className="text-xs font-bold text-gray-600">{block.label}</span>
              </motion.button>
            ))}
          </AnimatePresence>

          {picked.length === 0 && (
            <div className="w-full flex items-center justify-center text-gray-300 text-lg font-bold">
              点这里放指令 →
            </div>
          )}
        </div>
      </div>

      {/* 待选指令卡片 */}
      <div>
        <div className="text-sm font-bold text-gray-400 mb-2">可选的指令</div>
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {remaining.map((block) => (
              <motion.button
                key={block.id}
                layout
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePick(block)}
                disabled={disabled || checked}
                className="flex flex-col items-center justify-center gap-1 w-20 h-20 bg-white rounded-2xl
                  border-4 border-orange-300 hover:border-orange-500 shadow-md transition-colors
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="text-3xl">{block.icon}</span>
                <span className="text-xs font-bold text-gray-600">{block.label}</span>
              </motion.button>
            ))}
          </AnimatePresence>
          {remaining.length === 0 && (
            <div className="text-gray-300 font-bold">都用完啦！</div>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center gap-3 flex-wrap">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleCheck}
          disabled={!isFull || checked || disabled}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full
            shadow-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ✅ 检查
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleReset}
          disabled={disabled || picked.length === 0}
          className="px-6 py-3 bg-white border-4 border-gray-200 hover:border-gray-300 text-gray-600
            text-lg font-bold rounded-full transition-colors disabled:opacity-40"
        >
          🔄 重来
        </motion.button>

        {pickedBlocks.length > 0 && (
          <SpeakButton
            text={pickedBlocks.map((b) => b.voiceText).join('，然后')}
            size="sm"
          />
        )}
      </div>
    </div>
  )
}
