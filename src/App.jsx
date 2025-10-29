// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './AppRouter'
import HeaderWrapper from './components/common/HeaderWrapper'; // New import
import './styles/App.css'
import CustomCursorFork from './components/common/CustomCursorFork';
import GlobalBgm from "./components/GlobalBgm";

/* // AuthProvider 내부에서 useAuth를 사용하는 컴포넌트
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth()

  // 로딩 중일 때 로딩 스피너 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return <AppRouter isAuthenticated={isAuthenticated} />
} */

function App() {
  return (
    <Router>
      <CustomCursorFork />
      {/* 🎵 전역 배경음 - 페이지 이동해도 끊기지 않음 */}
      <GlobalBgm />
      <HeaderWrapper />
      <AppRouter />
    </Router>
  );
}

export default App;
