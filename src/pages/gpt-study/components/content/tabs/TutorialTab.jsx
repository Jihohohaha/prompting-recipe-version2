// src/pages/gpt-study/components/content/tabs/TutorialTab.jsx
import { useState } from 'react';

const TutorialTab = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="text-white">
      {/* 내용 영역 */}
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-xl leading-relaxed text-center px-8">
          {pages[currentPage]?.content}
        </p>
      </div>

      {/* 페이지 네비게이션 */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`
            px-6 py-2 rounded-lg font-semibold transition-all
            ${currentPage === 0
              ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-200'
            }
          `}
        >
          ← PREV
        </button>

        <span className="text-white font-semibold">
          {currentPage + 1} / {pages.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
          className={`
            px-6 py-2 rounded-lg font-semibold transition-all
            ${currentPage === pages.length - 1
              ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-200'
            }
          `}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
};

export default TutorialTab;