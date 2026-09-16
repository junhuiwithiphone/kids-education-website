import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import { useUserStore } from '../stores/userStore'
import SpeakButton from '../components/SpeakButton'

/**
 * 模块页 —— 展示某个模块下的所有阶段（关卡地图入口）。
 */
export default function Module() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const getModuleById = useLessonStore((s) => s.getModuleById)
  const lessonProgress = useUserStore((s) => s.lessonProgress)

  const mod = moduleId ? getModuleById(moduleId) : undefined

  if (!mod) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <span className="text-6xl">🤔</span>
        <p className="text-xl font-bold text-gray-500">找不到这个模块</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full"
        >
          回到首页
        </button>
      </div>
    )
  }

  const completedIds = Object.values(lessonProgress)
    .filter((p) => p.completed)
    .map((p) => p.lessonId)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            aria-label="返回"
            className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
          >
            ←
          </button>
          <span className="text-3xl">{mod.icon}</span>
          <h1 className="text-xl md:text-2xl font-bold text-purple-600 flex-1">{mod.name}</h1>
          <SpeakButton text={`${mod.name}，${mod.description}`} size="sm" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-lg text-gray-600 mb-6">{mod.description}</p>

        <div className="space-y-4">
          {mod.stages.map((stage, idx) => {
            const done = stage.lessons.filter((l) => completedIds.includes(l.id)).length
            const allDone = done === stage.lessons.length

            return (
              <motion.button
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/stage/${stage.id}`)}
                className={`w-full bg-gradient-to-r ${stage.color} rounded-3xl p-5 md:p-6 text-white
                  text-left shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4`}
              >
                <div className="text-5xl md:text-6xl flex-shrink-0">{stage.icon}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl font-bold mb-1">{stage.name}</h2>
                  <p className="opacity-90 text-sm md:text-base mb-2">{stage.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden max-w-[200px]">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{
                          width: `${stage.lessons.length ? (done / stage.lessons.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold">
                      {done}/{stage.lessons.length}
                    </span>
                    {allDone && <span className="text-xl">🏆</span>}
                  </div>
                </div>
                <span className="text-3xl flex-shrink-0">→</span>
              </motion.button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
