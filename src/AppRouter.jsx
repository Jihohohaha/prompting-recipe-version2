// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
// 페이지 import
import MainPage from './pages/main-page/MainPage'
import GPTStudy from './pages/gpt-study/GPTStudy'


const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="/" element={<MainPage />} />
      <Route path="/gpt-study" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug" element={<GPTStudy />} />
      
    </Routes>
  )
}

export default AppRouter