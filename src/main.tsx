import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* prefers-reduced-motion を framer-motion 全体へ適用する。
        index.css のメディアクエリは CSS アニメーションにしか効かず、
        JS で style を書き換える framer-motion は素通りしてしまうため */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
