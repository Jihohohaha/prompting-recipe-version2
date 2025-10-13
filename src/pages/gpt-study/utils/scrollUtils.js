// src/pages/gpt-study/utils/scrollUtils.js
import gsap from 'gsap';

/**
 * 특정 Section의 최상단으로 스크롤 이동
 * @param {number} sectionIndex - Section 인덱스 (0~6)
 * @param {HTMLElement} container - 스크롤 컨테이너 (Content의 ref)
 */
export const scrollToSection = (sectionIndex, container) => {
  if (!container) return;

  const targetSection = container.querySelector(`#section-${sectionIndex}`);
  
  if (targetSection) {
    console.log(`📍 Scrolling to section ${sectionIndex}`);
    
    gsap.to(container, {
      scrollTo: {
        y: targetSection,
        offsetY: 0,
        autoKill: true
      },
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        console.log(`✅ Scroll completed to section ${sectionIndex}`);
      }
    });
  }
};

/**
 * 펼쳐진 콘텐츠로 스크롤 이동 (필요시)
 * @param {number} recipeId - Recipe ID
 * @param {HTMLElement} container - 스크롤 컨테이너
 */
export const scrollToExpandedContent = (recipeId, container) => {
  if (!container) return;

  const sectionIndex = recipeId - 1;
  const targetSection = container.querySelector(`#section-${sectionIndex}`);
  
  if (targetSection) {
    console.log(`📖 Scrolling to expanded content in section ${sectionIndex}`);
    
    // Section의 최상단으로 스크롤
    gsap.to(container, {
      scrollTo: {
        y: targetSection,
        offsetY: 0,
        autoKill: true
      },
      duration: 0.6,
      ease: "power2.out"
    });
  }
};