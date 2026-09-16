import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Module from './pages/Module'
import StageMap from './pages/StageMap'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Profile from './pages/Profile'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module/:moduleId" element={<Module />} />
      <Route path="/stage/:stageId" element={<StageMap />} />
      <Route path="/lesson/:stageId/:lessonId" element={<Lesson />} />
      <Route path="/quiz/:lessonId" element={<Quiz />} />
      <Route path="/result/:lessonId" element={<Result />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default AppRoutes
