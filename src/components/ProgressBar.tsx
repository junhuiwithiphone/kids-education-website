import { motion } from 'framer-motion'

interface Props {
  current: number
  total: number
  color?: string
}

/**
 * 进度条 —— 让孩子知道「还剩几题」，减少焦虑。
 */
export default function ProgressBar({ current, total, color = 'bg-yellow-400' }: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-bold text-gray-500 mb-1">
        <span>
          第 {Math.min(current + 1, total)} / {total} 题
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
