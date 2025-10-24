// src/pages/gpt-study/components/content/TabInterface.jsx
import { useNavigate, useParams } from 'react-router-dom';
import useGPTStudyStore from '../../store';

const TabInterface = ({ recipe }) => {
  const navigate = useNavigate();
  const { tab: currentTab } = useParams();
  const { expandedContent, collapseContent } = useGPTStudyStore();
  
  const activeTab = currentTab || null;
  const isExpanded = expandedContent?.recipeId === recipe.id;

  const tabs = [
    { id: 'tutorial', title: 'TUTORIAL' },
    { id: 'chat', title: 'CHAT' },
    { id: 'quiz', title: 'QUIZ' }
  ];

  const handleTabClick = (tabId) => {
    // 현재 펼쳐진 탭을 다시 클릭 → 접기
    if (isExpanded && activeTab === tabId) {
      collapseContent();
      navigate(`/gpt-study/${recipe.slug}`);
      return;
    }

    // 다른 탭 클릭 → 펼치기
    navigate(`/gpt-study/${recipe.slug}/${tabId}`);
  };

  const primaryColor = recipe.color;
  
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div id={`tab-interface-${recipe.id}`} className="w-full">
      {/* 탭 헤더 */}
      <div className="flex gap-0">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex-1 h-14 font-bold text-lg font-pretendard
                rounded-t-lg transition-all duration-300
                ${!isActive && 'hover:opacity-95'}
              `}
              style={{
                backgroundColor: isActive ? primaryColor : hexToRgba(primaryColor, 0.88),
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                borderRight: index !== tabs.length - 1 ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'
              }}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* 탭 내용 영역 */}
      <div 
        className="px-8 py-12 flex flex-col gap-4 mb-2"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex justify-center">
          <div 
            className="h-[2px] bg-white"
            style={{ width: 'calc(100% - 4rem)' }}
          />
        </div>

        <div className="text-white font-bold mt-48 text-8xl font-pretendard whitespace-pre-line text-left mt-16">
          {recipe.displayTitle}
        </div>

        <div className="flex justify-center">
          <div 
            className="h-[2px] bg-white"
            style={{ width: 'calc(100% - 4rem)' }}
          />
        </div>
      </div>

      <div className='w-full rounded-full h-8 flex items-center text-mortend justify-left px-6 mb-3'
        style={{ backgroundColor: hexToRgba(primaryColor, 0.88) }}>
        <div className="text-white font-bold text-sm">
          {`section ${recipe.id}. ${recipe.displayTitle}`}
        </div>
      </div>
    </div>
  );
};

export default TabInterface;