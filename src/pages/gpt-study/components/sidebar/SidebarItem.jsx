// src/pages/gpt-study/components/sidebar/SidebarItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGPTStudyStore from '../../store';
import ImageSwitcher from '../image-switcher/ImageSwitcher';

const SidebarItem = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { activeSection, setActiveSection } = useGPTStudyStore();
  const isActive = activeSection === index;
  const [isHovered, setIsHovered] = useState(false);

  // Recipe 1~4는 아래로, 5~7은 위로 늘어남
  const expandDirection = index < 4 ? 'bottom' : 'top';

  const handleClick = () => {
    console.log(`🖱️ Clicked: ${recipe.title} (index: ${index})`);
    setActiveSection(index);
    navigate(`/gpt-study/${recipe.slug}`);
  };

  return (
    <div
      data-index={index} // ✅ data-index 속성 추가 (Sidebar에서 찾기 위해)
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