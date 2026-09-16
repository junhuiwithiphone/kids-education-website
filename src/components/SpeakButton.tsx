import { motion } from 'framer-motion'
import { useSpeech } from '../hooks/useSpeech'

interface Props {
  text: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * 语音播放按钮 —— 4 岁儿童不识字，这是最关键的交互控件。
 * 尺寸默认偏大，方便小手指点击。
 */
export default function SpeakButton({ text, size = 'md', className = '' }: Props) {
  const { speak, stop, speaking, supported } = useSpeech()

  if (!supported) return null

  const sizes = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
  }

  const handleClick = () => {
    if (speaking) {
      stop()
    } else {
      speak(text)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      aria-label={speaking ? '停止朗读' : '朗读'}
      className={`${sizes[size]} ${
        speaking
          ? 'bg-green-400 animate-pulse'
          : 'bg-yellow-300 hover:bg-yellow-400'
      } rounded-full shadow-md flex items-center justify-center transition-colors ${className}`}
    >
      <span>{speaking ? '🔊' : '🔈'}</span>
    </motion.button>
  )
}
