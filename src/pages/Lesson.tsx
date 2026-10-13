import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import Character from '../components/Character'
import BigButton from '../components/BigButton'

const STEP_TRANSITION_MS = 300

/** 教学页 —— 纯视觉翻页，无音频 */
export default function Lesson() {
  const { stageId, lessonId } = useParams<{ stageId: string; lessonId: string }>()
  const navigate = useNavigate()
  const getLessonById = useLessonStore((s) => s.getLessonById)

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)

  const teach = lesson?.content.teach
  const steps = teach?.steps ?? []
  const current = steps[step]
  const isLast = step === steps.length - 1

  if (!lesson || !teach || !current) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <span className="text-6xl">🤔</span>
        <p className="text-xl font-bold text-gray-500">找不到这节课</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full"
        >
          回到首页
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(`/stage/${stageId}`)}
            aria-label="返回关卡"
            className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
          >
            ←
          </button>
          <h1 className="text-lg md:text-xl font-bold text-purple-600 flex-1 truncate">
            {lesson.title}
          </h1>
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === step ? 'bg-purple-500' : i < step ? 'bg-purple-300' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {!started ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-6 py-16 text-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl"
            >
              🦓
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-600">{lesson.title}</h2>
            <p className="text-lg text-gray-500">和斑斑一起学习吧！</p>
            <BigButton onClick={() => setStarted(true)} size="lg">
              ▶️ 开始学习
            </BigButton>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: STEP_TRANSITION_MS / 1000 }}
              className="space-y-6"
            >
              <Character
                name={teach.character}
                speech={current.content}
                mood={isLast ? 'cheer' : 'happy'}
                animation={current.animation}
              />

              {current.image && (
                <div className="flex justify-center">
                  <div className="w-40 h-40 bg-white rounded-3xl shadow-md flex items-center justify-center text-7xl border-4 border-purple-100">
                    {numberEmoji(current.title)}
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-700">{current.title}</h3>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                {step > 0 && (
                  <BigButton onClick={() => setStep((s) => s - 1)} variant="secondary">
                    ← 上一步
                  </BigButton>
                )}

                <BigButton
                  onClick={() => {
                    if (isLast) {
                      navigate(`/quiz/${lesson.id}`)
                    } else {
                      setStep((s) => s + 1)
                    }
                  }}
                  variant={isLast ? 'success' : 'primary'}
                >
                  {isLast ? '🎮 去练习' : '下一步 →'}
                </BigButton>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  )
}

function numberEmoji(title: string): string {
  const map: Record<string, string> = {
    '1': '1️⃣',
    '2': '2️⃣',
    '3': '3️⃣',
    '4': '4️⃣',
    '5': '5️⃣',
    '6': '6️⃣',
    '7': '7️⃣',
    '8': '8️⃣',
    '9': '9️⃣',
    '10': '🔟',
  }
  for (const key of Object.keys(map)) {
    if (title.includes(`数字${key}`)) return map[key]
  }
  return '🎨'
}
