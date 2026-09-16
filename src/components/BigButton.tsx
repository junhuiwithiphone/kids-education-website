import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'ghost'
  size?: 'md' | 'lg'
  disabled?: boolean
  className?: string
}

const variants = {
  primary: 'bg-purple-500 hover:bg-purple-600 text-white shadow-purple-300',
  secondary: 'bg-white hover:bg-gray-50 text-purple-600 border-4 border-purple-200',
  success: 'bg-green-500 hover:bg-green-600 text-white shadow-green-300',
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
}

const sizes = {
  md: 'px-6 py-3 text-lg min-h-[56px]',
  lg: 'px-8 py-4 text-2xl min-h-[72px]',
}

/**
 * 大号触控按钮 —— 适配 4 岁儿童的小手指，最小触控区 56px。
 */
export default function BigButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: Props) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.94 }}
      whileHover={disabled ? {} : { scale: 1.03 }}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} rounded-full font-bold shadow-lg
        transition-colors disabled:opacity-40 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </motion.button>
  )
}
