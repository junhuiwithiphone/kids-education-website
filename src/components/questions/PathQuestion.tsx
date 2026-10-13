import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CommandBlock, PathConfig } from '../../types/lesson'

interface Props {
  config: PathConfig
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

interface Pos {
  row: number
  col: number
}

const DELTA: Record<string, Pos> = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
}

/**
 * 走迷宫题 —— 点选方向指令，带斑斑走到终点。
 * 无音效；语音仅通过喇叭按钮播放。
 */
export default function PathQuestion({ config, onAnswer, disabled }: Props) {
  const [program, setProgram] = useState<string[]>([])
  const [pos, setPos] = useState<Pos>(config.start)
  const [running, setRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1)
  const [result, setResult] = useState<'idle' | 'success' | 'fail'>('idle')
  const [failReason, setFailReason] = useState('')
  const [collected, setCollected] = useState<Set<string>>(new Set())

  const needCollect = config.collectCount ?? 0
  const shortestLen = config.solution.length

  const addCommand = (block: CommandBlock) => {
    if (disabled || running || result === 'success') return
    setProgram((prev) => [...prev, block.id])
    setResult('idle')
  }

  const removeLast = () => {
    if (disabled || running) return
    setProgram((prev) => prev.slice(0, -1))
    setResult('idle')
  }

  const reset = () => {
    if (disabled || running) return
    setProgram([])
    setPos(config.start)
    setStepIndex(-1)
    setResult('idle')
    setFailReason('')
    setCollected(new Set())
  }

  // 逐步执行指令
  const run = useCallback(async () => {
    if (program.length === 0 || running || disabled) return
    setRunning(true)
    setResult('idle')
    setPos(config.start)
    setCollected(new Set())

    let cur = { ...config.start }
    const got = new Set<string>()

    const failRun = (reason: string) => {
      setFailReason(reason)
      setResult('fail')
      setRunning(false)
      onAnswer(false)
    }

    for (let i = 0; i < program.length; i++) {
      await new Promise((r) => setTimeout(r, 420))
      setStepIndex(i)

      const cmd = program[i]
      const delta = DELTA[cmd]
      if (!delta) continue

      const next = { row: cur.row + delta.row, col: cur.col + delta.col }

      if (
        next.row < 0 ||
        next.row >= config.rows ||
        next.col < 0 ||
        next.col >= config.cols
      ) {
        failRun('哎呀，斑斑走出格子外面啦！')
        return
      }

      const cell = config.cells[next.row][next.col]
      if (cell.type === 'wall') {
        failRun('咚！斑斑撞到石头啦，绕开它试试～')
        return
      }

      cur = next
      setPos(cur)

      if (cell.type === 'collect') {
        const key = `${cur.row}-${cur.col}`
        got.add(key)
        setCollected(new Set(got))
      }

      if (cell.type === 'goal') {
        await new Promise((r) => setTimeout(r, 300))

        if (needCollect > 0 && got.size < needCollect) {
          failRun(`还要先收集 ${needCollect} 个宝贝，现在只拿到 ${got.size} 个哦～`)
          return
        }

        if (config.requireShortest && program.length > shortestLen) {
          failRun(`到了！不过还有更短的路，试试用 ${shortestLen} 步走到吧～`)
          return
        }

        setResult('success')
        setRunning(false)
        onAnswer(true)
        return
      }
    }

    await new Promise((r) => setTimeout(r, 300))
    failRun('指令用完啦，但斑斑还没到终点，再加几步试试～')
  }, [
    program,
    running,
    disabled,
    config,
    onAnswer,
    needCollect,
    shortestLen,
  ])

  // 组件卸载时清理
  useEffect(() => () => setRunning(false), [])

  const cellSize = 'w-16 h-16 md:w-20 md:h-20'

  return (
    <div className="space-y-6">
      {/* 迷宫网格 */}
      <div className="flex justify-center">
        <div
          className="grid gap-1 p-3 bg-green-50 rounded-3xl border-4 border-green-200"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
        >
          {config.cells.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const isHere = pos.row === r && pos.col === c
              return (
                <div
                  key={`${r}-${c}`}
                  className={`${cellSize} rounded-xl flex items-center justify-center text-3xl md:text-4xl relative
                    ${cell.type === 'wall' ? 'bg-stone-300' : 'bg-white'}
                    ${cell.type === 'goal' ? 'bg-yellow-100' : ''}`}
                >
                  {cell.type === 'wall' && <span>{cell.icon}</span>}
                  {cell.type === 'goal' && !isHere && <span>{cell.icon}</span>}
                  {cell.type === 'collect' &&
                    !isHere &&
                    !collected.has(`${r}-${c}`) && <span>{cell.icon}</span>}

                  <AnimatePresence>
                    {isHere && (
                      <motion.span
                        layout
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                        className="absolute"
                      >
                        🦓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 结果提示 */}
      <AnimatePresence>
        {result === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-2xl font-bold text-green-600"
          >
            🎉 太棒了！斑斑到达终点啦！
          </motion.div>
        )}
        {result === 'fail' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-xl font-bold text-orange-500"
          >
            💪 {failReason}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 程序栏 */}
      <div>
        <div className="text-sm font-bold text-gray-400 mb-2">
          斑斑的指令（按顺序执行）
        </div>
        <div className="flex flex-wrap items-center gap-2 min-h-[72px] p-3 bg-blue-50 rounded-3xl border-4 border-dashed border-blue-200">
          <span className="text-2xl">🦓</span>
          <AnimatePresence>
            {program.map((id, i) => {
              const block = config.palette.find((b) => b.id === id)
              if (!block) return null
              return (
                <motion.span
                  key={`${id}-${i}`}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{
                    scale: stepIndex === i ? 1.25 : 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl shadow-sm
                    ${
                      stepIndex === i
                        ? 'bg-yellow-300 ring-4 ring-yellow-400'
                        : 'bg-white border-2 border-blue-200'
                    }`}
                >
                  {block.icon}
                </motion.span>
              )
            })}
          </AnimatePresence>
          {program.length === 0 && (
            <span className="text-gray-300 font-bold">点下面的箭头，帮斑斑排指令</span>
          )}
        </div>
      </div>

      {/* 方向指令面板 */}
      <div className="flex flex-wrap gap-3 justify-center">
        {config.palette.map((block) => (
          <motion.button
            key={block.id}
            whileTap={{ scale: 0.88 }}
            onClick={() => addCommand(block)}
            disabled={disabled || running || result === 'success'}
            className="w-20 h-20 bg-white rounded-2xl border-4 border-orange-300 hover:border-orange-500
              shadow-md flex flex-col items-center justify-center gap-1 transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-3xl">{block.icon}</span>
            <span className="text-xs font-bold text-gray-500">{block.label}</span>
          </motion.button>
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={run}
          disabled={program.length === 0 || running || disabled || result === 'success'}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full
            shadow-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          🚀 出发！
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={removeLast}
          disabled={program.length === 0 || running || disabled}
          className="px-6 py-3 bg-white border-4 border-gray-200 hover:border-gray-300 text-gray-600
            text-lg font-bold rounded-full transition-colors disabled:opacity-40"
        >
          ↩️ 删一个
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={reset}
          disabled={running || disabled}
          className="px-6 py-3 bg-white border-4 border-gray-200 hover:border-gray-300 text-gray-600
            text-lg font-bold rounded-full transition-colors disabled:opacity-40"
        >
          🔄 重来
        </motion.button>
      </div>
    </div>
  )
}
