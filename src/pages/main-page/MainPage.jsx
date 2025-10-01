// src/pages/main-page/MainPage.jsx
import { useState } from 'react';
import Prologue from './components/prologue/Prologue';
import Closue from './components/closue/Closue';
import ClosueStatueSelect from './components/closue-statue-select/ClosueStatueSelect';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('prologue'); // 'prologue', 'closure', 'select'

  const renderPage = () => {
    switch (currentPage) {
      case 'prologue':
        return <Prologue />;
      case 'closure':
        return <Closue />;
      case 'select':
        return <ClosueStatueSelect />;
      default:
        return <Prologue />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {renderPage()}
      
      {/* 디버그용 페이지 전환 버튼 */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentPage('prologue')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Prologue
        </button>
        <button
          onClick={() => setCurrentPage('closue')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Closue
        </button>
        <button
          onClick={() => setCurrentPage('select')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default MainPage;