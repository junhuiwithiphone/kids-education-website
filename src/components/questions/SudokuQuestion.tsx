import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { SudokuConfig } from '../../types/lesson'

interface Props {
  config: SudokuConfig
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

function cloneGrid(grid: number[][]): number[][] {
  return grid.map((row) => [...row])
}

/** 行 / 列 / 2×2 宫是否有冲突（不含 0） */
function conflictCells(grid: number[][], size: number): Set<string> {
  const bad = new Set<string>()
  const box = Math.sqrt(size)

  const markDupes = (coords: { r: number; c: number }[]) => {
    const seen = new Map<number, { r: number; c: number }>()
    for (const { r, c } of coords) {
      const v = grid[r][c]
      if (v === 0) continue
      const prev = seen.get(v)
      if (prev) {
        bad.add(`${prev.r}-${prev.c}`)
        bad.add(`${r}-${c}`)
      } else {
        seen.set(v, { r, c })
      }
    }
  }

  for (let r = 0; r < size; r++) {
    markDupes(Array.from({ length: size }, (_, c) => ({ r, c })))
  }
  for (let c = 0; c < size; c++) {
    markDupes(Array.from({ length: size }, (_, r) => ({ r, c })))
  }
  for (let br = 0; br < size; br += box) {
    for (let bc = 0; bc < size; bc += box) {
      const coords: { r: number; c: number }[] = []
      for (let r = br; r < br + box; r++) {
        for (let c = bc; c < bc + box; c++) {
          coords.push({ r, c })
        }
      }
      markDupes(coords)
    }
  }

  return bad
}

/**
 * 4×4 数独 —— 点选空格再点数字填入。
 * 冲突格高亮；全部填满且无冲突且与解一致时判对。无音效。
 */
export default function SudokuQuestion({ config, onAnswer, disabled }: Props) {
  const size = config.size
  const [grid, setGrid] = useState(() => cloneGrid(config.puzzle))
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [solved, setSolved] = useState(false)
  const [shake, setShake] = useState(false)

  const fixed = useMemo(() => {
    const s = new Set<string>()
    config.puzzle.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v !== 0) s.add(`${r}-${c}`)
      })
    )
    return s
  }, [config.puzzle])

  const conflicts = conflictCells(grid, size)
  const icons = config.icons

  const display = (n: number) => {
    if (n === 0) return ''
    if (icons && icons[n - 1]) return icons[n - 1]
    return String(n)
  }

  const isComplete = grid.every((row) => row.every((v) => v !== 0))

  const trySubmit = (next: number[][]) => {
    const full = next.every((row) => row.every((v) => v !== 0))
    if (!full || solved) return

    const nextConflicts = conflictCells(next, size)
    const match = next.every((row, r) =>
      row.every((v, c) => v === config.solution[r][c])
    )
    const success = nextConflicts.size === 0 && match

    if (success) {
      setSolved(true)
      onAnswer(true)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      onAnswer(false)
    }
  }

  const selectCell = (r: number, c: number) => {
    if (disabled || solved || fixed.has(`${r}-${c}`)) return
    setSelected({ r, c })
  }

  const placeNumber = (n: number) => {
    if (disabled || solved || !selected) return
    const { r, c } = selected
    const next = cloneGrid(grid)
    next[r][c] = n
    setGrid(next)
    trySubmit(next)
  }

  const clearSelected = () => {
    if (disabled || solved || !selected) return
    const { r, c } = selected
    if (fixed.has(`${r}-${c}`)) return
    const next = cloneGrid(grid)
    next[r][c] = 0
    setGrid(next)
  }

  return (
    <div className="space-y-5">
      <motion.div
        animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.45 }}
        className="flex justify-center"
      >
        <div
          className="grid gap-1 p-3 bg-indigo-50 rounded-3xl border-4 border-indigo-200"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((val, c) => {
              const key = `${r}-${c}`
              const isFixed = fixed.has(key)
              const isSelected = selected?.r === r && selected?.c === c
              const hasConflict = conflicts.has(key) && val !== 0
              const boxBorder =
                (r === 1 ? 'border-b-4 border-b-indigo-400 ' : '') +
                (c === 1 ? 'border-r-4 border-r-indigo-400 ' : '')

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectCell(r, c)}
                  disabled={disabled || solved || isFixed}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl text-2xl md:text-3xl font-bold
                    flex items-center justify-center transition-colors ${boxBorder}
                    ${
                      solved
                        ? 'bg-green-100 text-green-700'
                        : hasConflict
                          ? 'bg-orange-100 text-orange-600'
                          : isSelected
                            ? 'bg-yellow-100 ring-4 ring-yellow-400'
                            : isFixed
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-white text-gray-700 hover:bg-yellow-50'
                    }
                    disabled:cursor-not-allowed`}
                >
                  {display(val)}
                </button>
              )
            })
          )}
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: size }, (_, i) => i + 1).map((n) => (
          <motion.button
            key={n}
            whileTap={{ scale: 0.9 }}
            onClick={() => placeNumber(n)}
            disabled={disabled || solved || !selected}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 border-indigo-300
              bg-white text-2xl font-bold shadow-md hover:border-indigo-500
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {display(n)}
          </motion.button>
        ))}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={clearSelected}
          disabled={disabled || solved || !selected}
          className="px-5 h-14 md:h-16 rounded-2xl border-4 border-gray-200 bg-white
            text-lg font-bold text-gray-600 disabled:opacity-40"
        >
          擦掉
        </motion.button>
      </div>

      {shake && !solved && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-bold text-orange-500"
        >
          💪 有格子冲突或不对哦，再调整一下！
        </motion.div>
      )}

      {solved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-2xl font-bold text-green-600"
        >
          ⭐ 数独完成！你真厉害！
        </motion.div>
      )}

      {!isComplete && !solved && (
        <p className="text-center text-sm text-gray-400 font-semibold">
          先点空格，再点下面的数字填进去
        </p>
      )}
    </div>
  )
}
