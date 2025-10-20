import { useState } from 'react';
import Prologue from './components/prologue/Prologue';
import Closue from './components/closue/Closue';
import ClosueStatueSelect from './components/closue-statue-select/ClosueStatueSelect';

const MainPage = () => {
  // URL 파라미터로 시작 페이지 결정
  const urlParams = new URLSearchParams(window.location.search);
  const debugPage = urlParams.get('page') || 'prologue';
  
  const [currentPage, setCurrentPage] = useState(debugPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'prologue':
        return <Prologue onComplete={() => setCurrentPage('closure')} />;
      case 'closure':
        return <Closue onComplete={() => setCurrentPage('select')} />;
      case 'select':
        return <ClosueStatueSelect />;
      default:
        return <Prologue onComplete={() => setCurrentPage('closure')} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* 디버그용 페이지 전환 버튼
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-[100] bg-white/90 p-4 rounded-lg shadow-lg border-2 border-green-500">
          <div className="text-sm font-bold mb-2 text-green-600">Page Navigator</div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setCurrentPage('prologue')}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === 'prologue'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Prologue
            </button>
            <button
              onClick={() => setCurrentPage('closure')}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === 'closure'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Closue
            </button>
            <button
              onClick={() => setCurrentPage('select')}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === 'select'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Select
            </button>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 text-xs text-green-600">
            💡 ?page=closure 로 바로 이동
          </div>
        </div>
      )} */}
      
      {renderPage()}
    </div>
  );
};

export default MainPage;