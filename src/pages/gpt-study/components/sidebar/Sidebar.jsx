// src/pages/gpt-study/components/sidebar/Sidebar.jsx
import { gptStudyData } from '../../data';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="w-1/6 h-screen bg-black overflow-y-auto py-10">
      <div className="flex flex-col gap-6 px-4">
        {gptStudyData.map((recipe, index) => (
          <SidebarItem 
            key={recipe.id} 
            recipe={recipe} 
            index={index}
          />
        ))}
      </div>
      
      {/* 스크롤바 스타일링 */}
      <style jsx>{`
        aside::-webkit-scrollbar {
          width: 6px;
        }
        aside::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        aside::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 3px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;