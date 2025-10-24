import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import useGPTStudyStore from '../../store';
import DivSwitcher from '../image-switcher/DivSwitcher';

export default function SidebarItem({ recipe, index }) {
  const navigate = useNavigate();
  const { activeSection, setActiveSection, collapseContent } = useGPTStudyStore();
  const isActive = activeSection === index;
  const [isHovered, setIsHovered] = useState(false);

  const expandDirection = index < 4 ? 'bottom' : 'top';

  const handleClick = useCallback(() => {
    collapseContent();
    setActiveSection(index);
    navigate(`/gpt-study/${encodeURIComponent(recipe.slug)}`);

    requestAnimationFrame(() => {
      const container = document.querySelector('main');
      const targetSection = document.querySelector(`#section-${index}`);
      if (container && targetSection) {
        const GUTTER = 10;
        gsap.set(container, { scrollTop: Math.max(0, targetSection.offsetTop - GUTTER) });
      }
    });
  }, [collapseContent, setActiveSection, index, navigate, recipe.slug]);

  return (
    <div
      data-index={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DivSwitcher
        isActive={isActive}
        isHovered={isHovered}
        expandDirection={expandDirection}
        onClick={handleClick}
        baseHeight={200}
        expandedHeight={320}              // ⬅️ 필요에 맞게 조절 (예: 280~340)
        activeSrc={recipe?.images?.selected}
        recipe={recipe}
        index={index}
      />
    </div>
  );
}
