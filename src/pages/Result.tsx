import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuizStore } from '../stores/quizStore'
import { useUserStore } from '../stores/userStore'
import StarDisplay from '../components/StarDisplay'
import BigButton from '../components/BigButton'
import { useSpeech } from '../hooks/useSpeech'

/**
 * 结算页 —— 星星飞入动画 + 评价 + 徽章解锁 + 下一步引导。
 *
 * 从 quizStore 读取本次答题结果；若无（如直接刷新），回到首页。
 */
export default function Result() {
  const navigate = useNavigate()
  const result = useQuizStore((s) => s.result)
  const user = useUserStore((s) => s.user)
  const totalStars = useUserStore((s) => s.stars)
  const badges = useUserStore((s) => s.badges)
  const { speak } = useSpeech()

  useEffect(() => {
    if (!result) {
      navigate('/')
      return
    }
    const praise = result.isPerfect
      ? '太厉害了！全部一次答对，你是最棒的小指挥官！'
      : `做得好！你获得了${result.starsEarned}颗星星，继续加油！`
    speak(praise)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!result) return null

  const ratio = result.correctFirstTry / result.totalQuestions
  const comment = result.isPerfect
    ? '完美通关！🏆'
    : ratio >= 0.6
      ? '非常棒！🎉'
      : '继续加油！💪'

  // 本次新解锁的徽章（unlockedAt 在最近 1 分钟内）
  const justUnlocked = badges.filter((b) => {
    if (!b.unlockedAt) return false
    return Date.now() - new Date(b.unlockedAt).getTime() < 60_000
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 text-center space-y-6"
      >
        {/* 角色欢呼 */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, -6, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-8xl"
        >
          🦓
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold text-orange-500 mb-1">{comment}</h1>
          <p className="text-gray-500">
            {user?.name ? `${user.name}，` : ''}你完成了「{result.lessonTitle}」
          </p>
        </div>

        {/* 星星飞入 */}
        <div className="py-4">
          <p className="text-sm font-bold text-gray-400 mb-2">本次获得</p>
          <StarDisplay count={result.starsEarned} size="lg" animate />
          <p className="text-sm text-gray-400 mt-3">
            累计 ⭐ {totalStars.count} 颗
          </p>
        </div>

        {/* 答题情况 */}
        <div className="bg-orange-50 rounded-2xl p-4 text-sm text-gray-600">
          一次答对 <span className="font-bold text-orange-500">{result.correctFirstTry}</span> /{' '}
          {result.totalQuestions} 题
        </div>

        {/* 新解锁徽章 */}
        {justUnlocked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-sm font-bold text-purple-400">🎖️ 解锁新徽章！</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {justUnlocked.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.8 }}
                  className="flex flex-col items-center gap-1 bg-purple-50 rounded-2xl px-4 py-3"
                >
                  <span className="text-4xl">{b.icon}</span>
                  <span className="text-xs font-bold text-purple-600">{b.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3 pt-2">
          <BigButton onClick={() => navigate(`/stage/${result.stageId}`)} size="lg">
            🗺️ 继续闯关
          </BigButton>
          <BigButton onClick={() => navigate('/')} variant="secondary">
            🏠 回到首页
          </BigButton>
        </div>
      </motion.div>
    </div>
  )
}
