// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
// 페이지 import
import MainPage from './pages/main-page/MainPage'


const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="/" element={<MainPage />} />
      
    </Routes>
  )
}

export default AppRouter