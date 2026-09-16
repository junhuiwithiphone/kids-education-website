import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLessonStore } from '../stores/lessonStore'
import { useUserStore } from '../stores/userStore'
import { useQuizStore } from '../stores/quizStore'
import QuestionRenderer from '../components/questions/QuestionRenderer'
import ProgressBar from '../components/ProgressBar'
import SpeakButton from '../components/SpeakButton'
import BigButton from '../components/BigButton'
import StarDisplay from '../components/StarDisplay'
import { useSpeech } from '../hooks/useSpeech'
import { useSound } from '../hooks/useSound'

/**
 * 答题页 —— 逐题作答，即时反馈，累积星星。
 *
 * 零挫败设计：答错可无限重试，不扣分。
 * 记录「首次即答对」的题数，用于结算页评价与「完美答题」徽章。
 */
export default function Quiz() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const getLessonById = useLessonStore((s) => s.getLessonById)
  const getStageByLessonId = useLessonStore((s) => s.getStageByLessonId)
  const addStars = useUserStore((s) => s.addStars)
  const updateLessonProgress = useUserStore((s) => s.updateLessonProgress)
  const unlockBadge = useUserStore((s) => s.unlockBadge)
  const stars = useUserStore((s) => s.stars)
  const setResult = useQuizStore((s) => s.setResult)

  const { speak } = useSpeech()
  const { star: starSound, complete } = useSound()

  const lesson = lessonId ? getLessonById(lessonId) : undefined
  const stage = lessonId ? getStageByLessonId(lessonId) : undefined

  const questions = lesson?.content.quiz ?? []
  const [index, setIndex] = useState(0)
  const [earned, setEarned] = useState(0)
  const [correctFirstTry, setCorrectFirstTry] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showExplain, setShowExplain] = useState(false)

  const question = questions[index]
  const isLast = index === questions.length - 1

  if (!lesson || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <span className="text-6xl">🤔</span>
        <p className="text-xl font-bold text-gray-500">找不到练习题</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full"
        >
          回到首页
        </button>
      </div>
    )
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect) {
      setAttempts((a) => a + 1)
      return
    }

    // 答对：本题首次尝试即对（attempts 未增加过）才计入 perfect
    const firstTry = attempts === 0
    if (firstTry) setCorrectFirstTry((c) => c + 1)

    const reward = question.starReward ?? 1
    setEarned((e) => e + reward)
    addStars(reward)
    starSound()
    speak(question.explanation)
    setShowExplain(true)

    // 首颗星触发徽章
    if (stars.count === 0) unlockBadge('first_star')
  }

  const handleNext = () => {
    setShowExplain(false)
    setAttempts(0)

    if (isLast) {
      finish()
    } else {
      setIndex((i) => i + 1)
    }
  }

  const finish = () => {
    complete()
    const totalStars = earned
    const isPerfect = correctFirstTry === questions.length

    // 更新课程进度
    updateLessonProgress(lesson.id, {
      completed: true,
      starsEarned: totalStars,
    })

    // 徽章判定
    unlockBadge('first_complete')
    if (isPerfect) unlockBadge('perfect_quiz')
    const newTotal = stars.count
    if (newTotal >= 5) unlockBadge('five_stars')
    if (newTotal >= 10) unlockBadge('ten_stars')

    setResult({
      quizId: `${lesson.id}-${Date.now()}`,
      lessonId: lesson.id,
      stageId: stage?.id ?? lesson.stageId,
      lessonTitle: lesson.title,
      totalQuestions: questions.length,
      correctFirstTry,
      starsEarned: totalStars,
      isPerfect,
      finishedAt: new Date().toISOString(),
    })

    navigate(`/result/${lesson.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(`/stage/${lesson.stageId}`)}
              aria-label="退出练习"
              className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
            >
              ✕
            </button>
            <div className="flex-1">
              <ProgressBar current={index} total={questions.length} />
            </div>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-full">
              <span className="text-xl">⭐</span>
              <span className="text-yellow-700 font-bold">{earned}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* 题干 */}
            <div className="bg-white rounded-3xl p-6 shadow-md border-4 border-purple-100">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed">
                  {question.question}
                </h2>
                <SpeakButton text={`${question.question}。提示：${question.hint}`} size="sm" />
              </div>
              <p className="text-base text-purple-400 mt-3 font-semibold">
                💡 {question.hint}
              </p>
            </div>

            {/* 题目交互区 */}
            <div className="bg-white/60 rounded-3xl p-4 md:p-6">
              <QuestionRenderer
                question={question}
                onAnswer={handleAnswer}
                disabled={showExplain}
                accent={stage?.moduleId === 'coding' ? 'orange' : stage?.moduleId === 'science' ? 'teal' : 'purple'}
              />
            </div>

            {/* 答对后的解释 + 下一题 */}
            <AnimatePresence>
              {showExplain && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-50 rounded-3xl p-6 border-4 border-green-200 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <StarDisplay count={question.starReward} size="md" animate />
                    <p className="text-lg font-bold text-green-700 flex-1">
                      {question.explanation}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <BigButton onClick={handleNext} variant="success" size="lg">
                      {isLast ? '🎉 完成啦！' : '下一题 →'}
                    </BigButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
