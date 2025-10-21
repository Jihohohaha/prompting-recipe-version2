// src/pages/gpt-study/components/sidebar/SidebarItem.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
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
    
    // 4. ✅ Reference 방식: double setTimeout + gsap.set
    setTimeout(() => {
      setTimeout(() => {
        const container = document.querySelector('main');
        const targetSection = document.querySelector(`#section-${index}`);
        
        if (container && targetSection) {
          // ✅ gsap.set: 즉시 스크롤 (애니메이션 없음)
          gsap.set(container, {
            scrollTop: targetSection.offsetTop
          });
          console.log(`✅ Instant scroll to section ${index} (Reference pattern)`);
        }
      }, 500); // ✅ Reference: 500ms 지연
    }, 0); // ✅ Reference: 다음 이벤트 루프로
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