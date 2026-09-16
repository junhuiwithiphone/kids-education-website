import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, UserProfile, Badge, LessonProgress } from '../types/user'

const DEFAULT_BADGES: Badge[] = [
  { id: 'first_star', name: '第一颗星', icon: '⭐', description: '获得第一颗星星', unlockedAt: null },
  { id: 'five_stars', name: '五星学员', icon: '🌟', description: '累计获得5颗星', unlockedAt: null },
  { id: 'ten_stars', name: '十星学员', icon: '✨', description: '累计获得10颗星', unlockedAt: null },
  { id: 'first_complete', name: '课程完成者', icon: '🎉', description: '完成第一节课程', unlockedAt: null },
  { id: 'perfect_quiz', name: '完美答题', icon: '💯', description: '一次答对所有题目', unlockedAt: null },
]

interface UserStore extends AppState {
  // Actions
  setUser: (user: UserProfile) => void
  addStars: (count: number) => void
  unlockBadge: (badgeId: string) => void
  updateLessonProgress: (lessonId: string, progress: Partial<LessonProgress>) => void
  resetProgress: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      stars: { count: 0, lastUpdated: new Date().toISOString() },
      badges: DEFAULT_BADGES,
      lessonProgress: {},

      setUser: (user) => set({ user }),

      addStars: (count) =>
        set((state) => ({
          stars: {
            count: state.stars.count + count,
            lastUpdated: new Date().toISOString(),
          },
        })),

      unlockBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.map((badge) =>
            badge.id === badgeId && !badge.unlockedAt
              ? { ...badge, unlockedAt: new Date().toISOString() }
              : badge
          ),
        })),

      updateLessonProgress: (lessonId, progress) =>
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              lessonId,
              completed: progress.completed || false,
              starsEarned: progress.starsEarned || 0,
              lastAccessed: new Date().toISOString(),
              attempts: (state.lessonProgress[lessonId]?.attempts || 0) + 1,
              ...progress,
            },
          },
        })),

      resetProgress: () =>
        set({
          stars: { count: 0, lastUpdated: new Date().toISOString() },
          badges: DEFAULT_BADGES,
          lessonProgress: {},
        }),
    }),
    {
      name: 'kids-math-user-storage',
    }
  )
)
