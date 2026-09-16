import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import Character from '../components/Character'
import SpeakButton from '../components/SpeakButton'
import BigButton from '../components/BigButton'
import { useSpeech } from '../hooks/useSpeech'
import { useSound } from '../hooks/useSound'

/**
 * 教学页 —— 分步播放教学内容。
 *
 * 4 岁儿童设计要点：
 * - 每步只呈现一个概念，配角色对话气泡
 * - 自动朗读（首次需用户手势激活，故提供大按钮）
 * - 大按钮「下一步」，步骤指示器用圆点而非数字
 * - 最后一步进入练习
 */
export default function Lesson() {
  const { stageId, lessonId } = useParams<{ stageId: string; lessonId: string }>()
  const navigate = useNavigate()
  const getLessonById = useLessonStore((s) => s.getLessonById)
  const { speak, stop } = useSpeech()
  const { click } = useSound()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)

  const teach = lesson?.content.teach
  const steps = teach?.steps ?? []
  const current = steps[step]
  const isLast = step === steps.length - 1

  // 切换步骤时自动朗读
  useEffect(() => {
    if (started && current) {
      speak(current.voiceText)
    }
    return () => stop()
  }, [step, started, current, speak, stop])

  if (!lesson || !teach) {
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

  const handleStart = () => {
    click()
    setStarted(true)
    speak(steps[0]?.voiceText ?? '')
  }

  const handleNext = () => {
    click()
    if (isLast) {
      navigate(`/quiz/${lesson.id}`)
    } else {
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    click()
    setStep((s) => Math.max(0, s - 1))
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
          {/* 步骤圆点指示器 */}
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
          /* 开始封面 */
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
            <BigButton onClick={handleStart} size="lg">
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
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* 角色对话 */}
              <Character
                name={teach.character}
                speech={current.content}
                mood={isLast ? 'cheer' : 'happy'}
                animation={current.animation}
              />

              {/* 配图区（emoji 占位，避免依赖缺失的 SVG） */}
              {current.image && (
                <div className="flex justify-center">
                  <div className="w-40 h-40 bg-white rounded-3xl shadow-md flex items-center justify-center text-7xl border-4 border-purple-100">
                    {numberEmoji(current.title)}
                  </div>
                </div>
              )}

              {/* 步骤标题 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-700">{current.title}</h3>
              </div>

              {/* 操作区 */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {step > 0 && (
                  <BigButton onClick={handlePrev} variant="secondary">
                    ← 上一步
                  </BigButton>
                )}

                <SpeakButton text={current.voiceText} size="md" />

                <BigButton onClick={handleNext} variant={isLast ? 'success' : 'primary'}>
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

/** 把「数字N像XX」标题映射为对应 emoji，替代缺失的 SVG 资源 */
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
