// 用户信息类型
export interface UserProfile {
  id: string
  name: string
  avatar: string
  createdAt: string
}

// 星星奖励
export interface StarReward {
  count: number
  lastUpdated: string
}

// 徽章
export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  unlockedAt: string | null
}

// 学习进度
export interface LessonProgress {
  lessonId: string
  completed: boolean
  starsEarned: number
  lastAccessed: string
  attempts: number
}

// 应用全局状态
export interface AppState {
  user: UserProfile | null
  stars: StarReward
  badges: Badge[]
  lessonProgress: Record<string, LessonProgress>
}
