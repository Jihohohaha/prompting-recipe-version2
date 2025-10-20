// src/pages/gpt-study/components/sidebar/SidebarItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGPTStudyStore from '../../store';
import ImageSwitcher from '../image-switcher/ImageSwitcher';

const SidebarItem = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { activeSection, setActiveSection, collapseContent } = useGPTStudyStore();
  const isActive = activeSection === index;
  const [isHovered, setIsHovered] = useState(false);

  const expandDirection = index < 4 ? 'bottom' : 'top';

  const handleClick = () => {
    console.log(`🖱️ Sidebar clicked: ${recipe.title} (index: ${index})`);
    
    // 1. 모든 탭 접기
    collapseContent();
    
    // 2. activeSection 업데이트
    setActiveSection(index);
    
    // 3. URL을 recipe root로 변경
    navigate(`/gpt-study/${recipe.slug}`);
    
    // 4. anchor div로 스크롤
    setTimeout(() => {
      const anchor = document.getElementById(`section-anchor-${index}`);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div
      data-index={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageSwitcher
        defaultImage={recipe.images.default}
        selectedImage={recipe.images.selected}
        isActive={isActive}
        isHovered={isHovered}
        expandDirection={expandDirection}
        onClick={handleClick}
        alt={recipe.title}
      />
    </div>
  );
};

export default SidebarItem;