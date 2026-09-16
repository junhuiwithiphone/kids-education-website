import { HashRouter } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  // HashRouter：部署到 GitHub Pages 等静态托管时路由可直接可用
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}

export default App
