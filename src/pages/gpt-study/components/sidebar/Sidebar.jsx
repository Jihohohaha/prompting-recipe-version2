// src/pages/gpt-study/components/sidebar/Sidebar.jsx
import { useEffect, useRef } from 'react';
import { gptStudyData } from '../../data';
import SidebarItem from './SidebarItem';
import useGPTStudyStore from '../../store';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const { activeSection } = useGPTStudyStore();

  // activeSection 변경 시 해당 항목으로 스크롤
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!sidebarRef.current) return;

    const targetItem = sidebarRef.current.querySelector(
      `[data-index="${activeSection}"]`
    );
    if (targetItem) {
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSection]);

  return (
    <aside
      ref={sidebarRef}
      className="translate-y-[12.4vh] w-1/6 h-[87.6vh] bg-black overflow-y-auto"
    >
      <div className="flex flex-col gap-6 px-4">
        {gptStudyData.map((recipe, index) => (
          <SidebarItem key={recipe.id} recipe={recipe} index={index} />
        ))}
      </div>

      <style>{`
        aside::-webkit-scrollbar { width: 6px; }
        aside::-webkit-scrollbar-track { background: #1a1a1a; }
        aside::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
        aside::-webkit-scrollbar-thumb:hover { background: #666; }
      `}</style>
    </aside>
  );
};

export default Sidebar;
