import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import { useUserStore } from '../stores/userStore'
import SpeakButton from '../components/SpeakButton'

/**
 * 关卡地图页 —— 展示某阶段的所有课程，蛇形路径 + 锁机制。
 *
 * 解锁规则：第一节课默认解锁，其余需完成前一节。
 * 已完成显示 ⭐ 数，当前可玩显示「玩这个」，未解锁显示 🔒。
 */
export default function StageMap() {
  const { stageId } = useParams<{ stageId: string }>()
  const navigate = useNavigate()
  const getStageById = useLessonStore((s) => s.getStageById)
  const getModuleByStageId = useLessonStore((s) => s.getModuleByStageId)
  const lessonProgress = useUserStore((s) => s.lessonProgress)

  const stage = stageId ? getStageById(stageId) : undefined
  const mod = stageId ? getModuleByStageId(stageId) : undefined

  if (!stage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <span className="text-6xl">🤔</span>
        <p className="text-xl font-bold text-gray-500">找不到这个关卡</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full"
        >
          回到首页
        </button>
      </div>
    )
  }

  const lessons = [...stage.lessons].sort((a, b) => a.order - b.order)

  const isCompleted = (id: string) => lessonProgress[id]?.completed ?? false
  // 解锁规则：第一节课默认解锁；已完成的可重玩；其余需前一节完成
  const isUnlocked = (index: number) =>
    index === 0 || isCompleted(lessons[index].id) || isCompleted(lessons[index - 1].id)

  const starsOf = (id: string) => lessonProgress[id]?.starsEarned ?? 0

  return (
    <div className={`min-h-screen bg-gradient-to-b ${stage.color} bg-opacity-10`}>
      <div className="min-h-screen bg-white/70 backdrop-blur-sm">
        <header className="bg-white/90 shadow-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => navigate(mod ? `/module/${mod.id}` : '/')}
              aria-label="返回"
              className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
            >
              ←
            </button>
            <span className="text-3xl">{stage.icon}</span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-700 flex-1">
              {stage.name}
            </h1>
            <SpeakButton text={`${stage.name}，${stage.description}`} size="sm" />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          <p className="text-center text-lg text-gray-600 mb-8">{stage.description}</p>

          {/* 蛇形关卡路径 */}
          <div className="flex flex-col items-center gap-2">
            {lessons.map((lesson, idx) => {
              const unlocked = isUnlocked(idx)
              const done = isCompleted(lesson.id)
              // 左右交错排列，形成蜿蜒小路
              const offset = idx % 2 === 0 ? '-translate-x-16' : 'translate-x-16'

              return (
                <div key={lesson.id} className="flex flex-col items-center w-full">
                  {/* 连接线 */}
                  {idx > 0 && (
                    <div className="w-2 h-8 bg-white/60 rounded-full border-2 border-dashed border-white" />
                  )}

                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, type: 'spring', stiffness: 260 }}
                    whileHover={unlocked ? { scale: 1.06 } : {}}
                    whileTap={unlocked ? { scale: 0.95 } : {}}
                    onClick={() =>
                      unlocked && navigate(`/lesson/${stage.id}/${lesson.id}`)
                    }
                    disabled={!unlocked}
                    className={`${offset} relative w-40 h-40 rounded-full shadow-xl
                      flex flex-col items-center justify-center gap-1 transition-all
                      ${
                        done
                          ? 'bg-gradient-to-br from-yellow-300 to-amber-400'
                          : unlocked
                            ? 'bg-gradient-to-br from-white to-gray-50 border-4 border-purple-300'
                            : 'bg-gray-200 border-4 border-gray-300 cursor-not-allowed'
                      }`}
                  >
                    <span className="text-4xl">
                      {done ? '🏆' : unlocked ? lesson.type === 'review' ? '🎯' : '▶️' : '🔒'}
                    </span>
                    <span
                      className={`text-sm font-bold px-2 text-center leading-tight ${
                        unlocked ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {lesson.title}
                    </span>

                    {done && (
                      <span className="text-xs font-bold text-amber-700">
                        {'⭐'.repeat(Math.min(starsOf(lesson.id), 3))}
                      </span>
                    )}

                    {done && (
                      <span className="absolute -bottom-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        🔄 重玩
                      </span>
                    )}

                    {unlocked && !done && (
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                        className="absolute -bottom-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                      >
                        玩这个
                      </motion.span>
                    )}
                  </motion.button>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
