// src/pages/gpt-study/components/content/TabInterface.jsx
import { useState } from 'react';
import TutorialTab from './tabs/TutorialTab';
import ChatTab from './tabs/ChatTab';
import QuizTab from './tabs/QuizTab';

const TabInterface = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState('tutorial');

  const tabs = [
    { id: 'tutorial', title: 'TUTORIAL' },
    { id: 'chat', title: 'CHAT' },
    { id: 'quiz', title: 'QUIZ' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tutorial':
        return <TutorialTab pages={recipe.tabs[0].pages} />;
      case 'chat':
        return <ChatTab />;
      case 'quiz':
        return <QuizTab />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* 탭 헤더 */}
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 h-14 font-bold text-lg font-pretendard
                rounded-t-lg transition-all duration-300
                ${isActive 
                  ? 'bg-[#FE7525] text-white' 
                  : 'bg-[#FE7525]/88 text-white/80'
                }
                ${!isActive && 'hover:bg-[#FE7525]/95'}
              `}
              style={{
                borderRight: tab.id !== 'quiz' ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'
              }}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* 탭 내용 */}
      <div className="bg-[#FE7525] p-8 min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabInterface;