import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import { useUserStore } from '../stores/userStore'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const navigate = useNavigate()
  const modules = useLessonStore((s) => s.modules)
  const stars = useUserStore((s) => s.stars)
  const user = useUserStore((s) => s.user)
  const lessonProgress = useUserStore((s) => s.lessonProgress)

  const completedIds = Object.values(lessonProgress)
    .filter((p) => p.completed)
    .map((p) => p.lessonId)

  const totalLessons = modules.flatMap((m) => m.stages).flatMap((s) => s.lessons).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl">🦓</span>
            <h1 className="text-xl md:text-2xl font-bold text-purple-600">斑斑启蒙乐园</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-full">
              <span className="text-xl">⭐</span>
              <span className="text-yellow-700 font-bold">{stars.count}</span>
            </div>
            <button
              onClick={() => navigate('/profile')}
              aria-label="我的主页"
              className="w-11 h-11 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <motion.section
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {user?.name ? `你好，${user.name}！` : '欢迎来到启蒙乐园！'} 🎉
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                今天想玩什么呢？点一点下面的卡片开始吧～
              </p>
              <p className="text-sm opacity-75 mt-2">
                已完成 {completedIds.length} / {totalLessons} 节课
              </p>
            </div>
          </div>
        </motion.section>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/story')}
          className="mb-8 w-full text-left bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-4">
            <span className="text-5xl">📖</span>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">绘本朗读</h3>
              <p className="text-base opacity-90 mt-1">拍一页绘本，斑斑读给你听</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </motion.button>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {modules.map((mod) => {
            const modLessons = mod.stages.flatMap((s) => s.lessons)
            const modDone = modLessons.filter((l) => completedIds.includes(l.id)).length

            return (
              <motion.button
                key={mod.id}
                variants={item}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/module/${mod.id}`)}
                className={`bg-gradient-to-br ${mod.color} rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="text-6xl mb-3">{mod.icon}</div>
                <h3 className="text-2xl font-bold mb-1">{mod.name}</h3>
                <p className="text-base opacity-90 mb-4">{mod.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-white/25 px-3 py-1 rounded-full font-semibold">
                    {modDone}/{modLessons.length} 课
                  </span>
                  <span className="text-2xl">→</span>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div key={mod.id} className="bg-white/70 rounded-2xl p-4 text-sm text-gray-600">
              <div className="font-bold text-gray-700 mb-1">
                {mod.icon} {mod.name}
              </div>
              {mod.description}
            </div>
          ))}
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        🦓 斑斑启蒙乐园 · 为 4 岁小朋友设计
      </footer>
    </div>
  )
}
