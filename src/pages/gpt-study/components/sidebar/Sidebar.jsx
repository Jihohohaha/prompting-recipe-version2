// src/pages/gpt-study/components/sidebar/Sidebar.jsx
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { gptStudyData } from '../../data';
import SidebarItem from './SidebarItem';
import useGPTStudyStore from '../../store';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const { activeSection } = useGPTStudyStore();
  const navigate = useNavigate();
  const location = useLocation();
  // Sync activeSection -> URL (safe): only navigate when pathname differs.
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    const recipe = gptStudyData[activeSection];
    if (!recipe) return;
    const targetPath = `/gpt-study/${recipe.slug}`;
    try {
      // If an expandedContent is open, skip navigating to avoid clobbering
      // the user's open tab (for example recipe1/tutorial).
      const store = useGPTStudyStore.getState();
      if (store && store.expandedContent) {
        console.debug('[Sidebar] skipping URL sync because expandedContent is open', store.expandedContent);
        return;
      }

      // If the current pathname already begins with the target recipe path (for
      // example `/gpt-study/recipe1/tutorial`), don't navigate — that would strip
      // any tab/subpath. Only navigate when the user is on a different recipe.
      if (location && !location.pathname.startsWith(targetPath)) {
        // pass skipContentScroll so Content doesn't perform another programmatic scroll
        navigate(targetPath, { state: { skipContentScroll: true } });
      }
    } catch (e) {
      console.warn('Sidebar URL sync failed', e);
    }
  }, [activeSection, location && location.pathname]);

  // activeSection 변경 시 해당 항목으로 스크롤
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!sidebarRef.current) return;

    // 해당 SidebarItem 찾기
    const targetItem = sidebarRef.current.querySelector(`[data-index="${activeSection}"]`);
    
    if (targetItem) {
      console.log(`📍 Sidebar scrolling to item ${activeSection}`);

      // 부드러운 스크롤 애니메이션
      gsap.to(sidebarRef.current, {
        scrollTo: {
          y: targetItem,
          offsetY: 150 // 상단에서 100px 여유 공간
        },
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [activeSection]);

  return (
    <aside 
      ref={sidebarRef}
      className="w-1/6 h-screen bg-black overflow-y-auto py-10"
    >
      <motion.div 
        className="flex flex-col gap-6 px-4"
        layout
      >
        {gptStudyData.map((recipe, index) => (
          <SidebarItem 
            key={recipe.id} 
            recipe={recipe} 
            index={index}
          />
        ))}
      </motion.div>
      
      <style>{`
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