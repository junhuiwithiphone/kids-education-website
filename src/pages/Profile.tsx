import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUserStore } from '../stores/userStore'
import { useLessonStore } from '../stores/lessonStore'
import BigButton from '../components/BigButton'

const AVATARS = ['🦓', '🐰', '🐻', '🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐸', '🐵', '🦄']

/**
 * 个人中心 —— 昵称/头像、星星总数、徽章墙、各模块进度。
 *
 * 家长可在此重设孩子昵称；「重新开始」需二次确认，避免误触清空进度。
 */
export default function Profile() {
  const navigate = useNavigate()
  const user = useUserStore((s) => s.user)
  const stars = useUserStore((s) => s.stars)
  const badges = useUserStore((s) => s.badges)
  const lessonProgress = useUserStore((s) => s.lessonProgress)
  const setUser = useUserStore((s) => s.setUser)
  const resetProgress = useUserStore((s) => s.resetProgress)
  const modules = useLessonStore((s) => s.modules)

  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(user?.name ?? '')
  const [confirmReset, setConfirmReset] = useState(false)

  const completedIds = Object.values(lessonProgress)
    .filter((p) => p.completed)
    .map((p) => p.lessonId)

  const unlockedCount = badges.filter((b) => b.unlockedAt).length

  const handleSave = () => {
    const name = nameInput.trim()
    if (!name) return
    setUser({
      id: user?.id ?? 'user-1',
      name,
      avatar: user?.avatar ?? '🦓',
      createdAt: user?.createdAt ?? new Date().toISOString(),
    })
    setEditing(false)
  }

  const handleAvatar = (emoji: string) => {
    setUser({
      id: user?.id ?? 'user-1',
      name: user?.name ?? '小朋友',
      avatar: emoji,
      createdAt: user?.createdAt ?? new Date().toISOString(),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            aria-label="返回首页"
            className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-purple-600 flex-1">我的主页</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 用户卡片 */}
        <motion.section
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/25 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
              {user?.avatar ?? '🦓'}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="flex gap-2">
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    placeholder="输入名字"
                    maxLength={12}
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-xl text-gray-700 font-bold min-w-0"
                  />
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-white text-purple-600 font-bold rounded-xl"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold truncate">
                    {user?.name ?? '小朋友'}
                  </h2>
                  <button
                    onClick={() => {
                      setNameInput(user?.name ?? '')
                      setEditing(true)
                    }}
                    aria-label="修改名字"
                    className="text-xl opacity-80 hover:opacity-100"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <p className="opacity-90 text-sm mt-1">
                {user?.createdAt
                  ? `加入于 ${new Date(user.createdAt).toLocaleDateString('zh-CN')}`
                  : '设置名字开始学习吧'}
              </p>
            </div>
          </div>

          {/* 头像选择 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => handleAvatar(a)}
                className={`w-11 h-11 rounded-full text-2xl flex items-center justify-center transition-all
                  ${user?.avatar === a ? 'bg-white scale-110 shadow-md' : 'bg-white/20 hover:bg-white/40'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </motion.section>

        {/* 统计 */}
        <section className="grid grid-cols-3 gap-3">
          <Stat icon="⭐" label="星星" value={stars.count} />
          <Stat icon="🎖️" label="徽章" value={`${unlockedCount}/${badges.length}`} />
          <Stat icon="📚" label="完成课程" value={completedIds.length} />
        </section>

        {/* 模块进度 */}
        <section className="bg-white rounded-3xl p-5 shadow-md space-y-4">
          <h3 className="font-bold text-gray-700 text-lg">学习进度</h3>
          {modules.map((mod) => {
            const all = mod.stages.flatMap((s) => s.lessons)
            const done = all.filter((l) => completedIds.includes(l.id)).length
            const pct = all.length ? (done / all.length) * 100 : 0
            return (
              <div key={mod.id}>
                <div className="flex items-center justify-between text-sm font-bold text-gray-600 mb-1">
                  <span>
                    {mod.icon} {mod.name}
                  </span>
                  <span>
                    {done}/{all.length}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${mod.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            )
          })}
        </section>

        {/* 徽章墙 */}
        <section className="bg-white rounded-3xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-700 text-lg">我的徽章</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {badges.map((b) => {
              const unlocked = Boolean(b.unlockedAt)
              return (
                <motion.div
                  key={b.id}
                  whileHover={{ scale: 1.06 }}
                  title={b.description}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-center
                    ${unlocked ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50 border-2 border-gray-100'}`}
                >
                  <span className={`text-3xl ${unlocked ? '' : 'grayscale opacity-40'}`}>
                    {unlocked ? b.icon : '🔒'}
                  </span>
                  <span
                    className={`text-xs font-bold leading-tight ${
                      unlocked ? 'text-yellow-700' : 'text-gray-400'
                    }`}
                  >
                    {b.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* 重置 */}
        <section className="pb-8">
          {confirmReset ? (
            <div className="bg-red-50 rounded-3xl p-5 text-center space-y-3 border-2 border-red-200">
              <p className="font-bold text-red-600">确定要清空所有进度吗？</p>
              <div className="flex justify-center gap-3">
                <BigButton
                  variant="ghost"
                  onClick={() => setConfirmReset(false)}
                >
                  取消
                </BigButton>
                <BigButton
                  onClick={() => {
                    resetProgress()
                    setConfirmReset(false)
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white shadow-red-200"
                >
                  确定清空
                </BigButton>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setConfirmReset(true)}
                className="text-sm text-gray-400 hover:text-red-400 underline"
              >
                重新开始（清空进度）
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-md text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400 font-semibold">{label}</div>
    </div>
  )
}
