// src/pages/gpt-study/components/sidebar/Sidebar.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
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