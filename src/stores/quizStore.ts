import { create } from 'zustand'

/** 单次答题会话的结果（临时状态，不持久化） */
export interface QuizResult {
  quizId: string
  lessonId: string
  stageId: string
  lessonTitle: string
  totalQuestions: number
  /** 首次尝试即答对的题数 */
  correctFirstTry: number
  starsEarned: number
  /** 是否全部一次答对（触发「完美答题」徽章） */
  isPerfect: boolean
  finishedAt: string
}

interface QuizStore {
  result: QuizResult | null
  setResult: (result: QuizResult) => void
  clear: () => void
}

/**
 * 答题会话 store —— 在 Quiz 页写入，Result 页读取。
 * 不持久化：刷新结算页会回到首页，避免脏数据。
 */
export const useQuizStore = create<QuizStore>()((set) => ({
  result: null,
  setResult: (result) => set({ result }),
  clear: () => set({ result: null }),
}))
