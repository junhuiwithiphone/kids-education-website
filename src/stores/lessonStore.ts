import { create } from 'zustand'
import type { Lesson, Module, Stage } from '../types/lesson'
import { modules, allStages } from '../data/modules'

interface LessonStore {
  modules: Module[]
  currentModule: Module | null
  currentStage: Stage | null
  currentLesson: Lesson | null

  setModule: (moduleId: string) => void
  setStage: (stageId: string) => void
  setLesson: (lesson: Lesson) => void

  getModuleById: (moduleId: string) => Module | undefined
  getStageById: (stageId: string) => Stage | undefined
  getLessonById: (lessonId: string) => Lesson | undefined
  getStageByLessonId: (lessonId: string) => Stage | undefined
  getModuleByStageId: (stageId: string) => Module | undefined
  /** 获取某阶段中下一节未完成的课（用于「继续学习」） */
  getNextLesson: (stageId: string, completedIds: string[]) => Lesson | undefined
}

export const useLessonStore = create<LessonStore>()((set, get) => ({
  modules,
  currentModule: null,
  currentStage: null,
  currentLesson: null,

  setModule: (moduleId) => {
    const mod = modules.find((m) => m.id === moduleId)
    if (mod) set({ currentModule: mod })
  },

  setStage: (stageId) => {
    const stage = allStages.find((s) => s.id === stageId)
    if (stage) set({ currentStage: stage })
  },

  setLesson: (lesson) => {
    set({ currentLesson: lesson })
  },

  getModuleById: (moduleId) => {
    return get().modules.find((m) => m.id === moduleId)
  },

  getStageById: (stageId) => {
    return allStages.find((s) => s.id === stageId)
  },

  getLessonById: (lessonId) => {
    return allStages.flatMap((s) => s.lessons).find((l) => l.id === lessonId)
  },

  getStageByLessonId: (lessonId) => {
    return allStages.find((s) => s.lessons.some((l) => l.id === lessonId))
  },

  getModuleByStageId: (stageId) => {
    return get().modules.find((m) => m.stages.some((s) => s.id === stageId))
  },

  getNextLesson: (stageId, completedIds) => {
    const stage = allStages.find((s) => s.id === stageId)
    if (!stage) return undefined
    const sorted = [...stage.lessons].sort((a, b) => a.order - b.order)
    return sorted.find((l) => !completedIds.includes(l.id))
  },
}))
