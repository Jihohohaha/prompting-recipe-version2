// src/pages/gpt-study/components/content/TabInterface.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGPTStudyStore from '../../store';

const TabInterface = ({ recipe }) => {
  const navigate = useNavigate();
  const { slug, tab: currentTab } = useParams();
  const { expandedContent, setExpandedContent, setActiveSection } = useGPTStudyStore();
  
  // 활성 탭 결정 (URL 파라미터 기준)
  const activeTab = currentTab || null;
  
  // 현재 recipe가 펼쳐져 있는지 확인
  const isExpanded = expandedContent?.recipeId === recipe.id;

  const tabs = [
    { id: 'tutorial', title: 'TUTORIAL' },
    { id: 'chat', title: 'CHAT' },
    { id: 'quiz', title: 'QUIZ' }
  ];

  const handleTabClick = (tabId) => {
    // 현재 Section의 현재 탭을 클릭한 경우 → 접기
    if (expandedContent?.recipeId === recipe.id && activeTab === tabId) {
      setExpandedContent(null);
      navigate(`/gpt-study/${recipe.slug}`);
    } 
    // 그 외 모든 경우 → 펼치기
    else {
      // activeSection 업데이트 (해당 Section으로 스크롤)
      setActiveSection(recipe.id - 1);
      
      // expandedContent 업데이트
      setExpandedContent({ recipeId: recipe.id, tabId });
      
      // URL 변경
      navigate(`/gpt-study/${recipe.slug}/${tabId}`);
    }
  };

  // 방법론별 색상 가져오기
  const primaryColor = recipe.color;
  
  // 색상 유틸리티 함수
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="w-full">
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

      {/* 탭 내용 영역 - 고정 표시 */}
      <div 
        className="px-8 py-10 flex flex-col gap-4"
        style={{ backgroundColor: primaryColor }}
      >
        {/* 상단 흰색 밑줄 */}
        <div className="flex justify-center">
          <div 
            className="h-[2px] bg-white"
            style={{ width: 'calc(100% - 4rem)' }}
          />
        </div>

        {/* 방법론 제목 텍스트 (좌측 정렬, 상단 여백 추가) */}
        <div className="text-white font-bold mt-72 text-8xl font-pretendard whitespace-pre-line text-left mt-16">
          {recipe.displayTitle}
        </div>

        {/* 하단 흰색 밑줄 */}
        <div className="flex justify-center">
          <div 
            className="h-[2px] bg-white"
            style={{ width: 'calc(100% - 4rem)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TabInterface;