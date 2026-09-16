import { motion } from 'framer-motion'

interface Props {
  count: number
  size?: 'sm' | 'md' | 'lg'
  /** 是否播放飞入动画 */
  animate?: boolean
}

const sizes = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-5xl',
}

/**
 * 星星展示 —— 即时正反馈的核心视觉元素。
 * animate 模式下星星依次弹入，用于答题正确和结算页。
 */
export default function StarDisplay({ count, size = 'md', animate = false }: Props) {
  const stars = Array.from({ length: Math.max(0, count) })

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      {stars.map((_, i) =>
        animate ? (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              delay: i * 0.18,
              type: 'spring',
              stiffness: 320,
              damping: 12,
            }}
            className={sizes[size]}
          >
            ⭐
          </motion.span>
        ) : (
          <span key={i} className={sizes[size]}>
            ⭐
          </span>
        )
      )}
      {count === 0 && <span className="text-gray-300 text-2xl">☆☆☆</span>}
    </div>
  )
}
