// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

// ✅ Debounce 유틸리티
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Content = () => {
  const contentRef = useRef(null);
  const { slug, tab } = useParams(); // ✅ tab 파라미터 추가
  const { activeSection, setActiveSection, expandedContent } = useGPTStudyStore();
  const [isScrolling, setIsScrolling] = useState(false);
  const isManualScroll = useRef(true); // ✅ 기본값 true로 변경
  const [isReady, setIsReady] = useState(false);

  // GSAP 플러그인 등록
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }, []);

  // DOM 준비 확인
  useEffect(() => {
    if (contentRef.current) {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    }
  }, []);

  // ✅ URL 변경 시 스크롤 위치 조정
  useEffect(() => {
    if (!contentRef.current || !isReady || !slug) return;

    const recipe = gptStudyData.find(r => r.slug === slug);
    if (!recipe) return;

    const sectionIndex = recipe.id - 1;
    const sectionElement = contentRef.current.querySelector(`#section-${sectionIndex}`);
    
    if (!sectionElement) return;

    // 스크롤 타겟 결정
    let scrollTarget;
    let offsetY = 0;

    if (tab) {
      // 하위 URL (/recipe1/tutorial, /recipe1/quiz 등)
      // → 탭 인터페이스 바로 아래로 스크롤
      const tabInterface = sectionElement.querySelector(`#tab-interface-${recipe.id}`);
      
      if (tabInterface) {
        const tabBottom = tabInterface.getBoundingClientRect().bottom;
        const sectionTop = sectionElement.getBoundingClientRect().top;
        offsetY = tabBottom - sectionTop;
        scrollTarget = sectionElement;
      } else {
        scrollTarget = sectionElement;
      }
    } else {
      // 기본 URL (/recipe1)
      // → 섹션 상단으로 스크롤
      scrollTarget = sectionElement;
      offsetY = 0;
    }

    // 스크롤 실행 (애니메이션 시작 전에 먼저)
    console.log(`📜 URL changed to ${slug}${tab ? `/${tab}` : ''}, scrolling...`);
    
    isManualScroll.current = false;
    setIsScrolling(true);

    // 최대 스크롤 가능 위치 계산
    const maxScrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
    const targetScrollTop = sectionElement.offsetTop + offsetY;
    const finalScrollTop = Math.min(targetScrollTop, maxScrollTop);

    gsap.to(contentRef.current, {
      scrollTop: finalScrollTop,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setIsScrolling(false);
        isManualScroll.current = true;
        console.log(`✅ Scroll completed to ${slug}${tab ? `/${tab}` : ''}`);
      }
    });

  }, [slug, tab, isReady]); // ✅ slug, tab 변경 시 실행

  // ScrollTrigger 설정 (섹션 감지)
  useEffect(() => {
    if (!contentRef.current || !isReady) return;

    // 기존 ScrollTrigger 정리
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const container = contentRef.current;

    // 각 섹션에 대한 ScrollTrigger 생성
    gptStudyData.forEach((recipe, index) => {
      const sectionEl = container.querySelector(`#section-${index}`);
      
      if (sectionEl) {
        ScrollTrigger.create({
          trigger: sectionEl,
          scroller: container,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            if (isManualScroll.current && !isScrolling) {
              console.log(`🔽 Entered section ${index}: ${recipe.title}`);
              setActiveSection(index);
            }
          },
          onEnterBack: () => {
            if (isManualScroll.current && !isScrolling) {
              console.log(`🔼 Entered back section ${index}: ${recipe.title}`);
              setActiveSection(index);
            }
          },
          onUpdate: (self) => {
          console.log(`
            📊 Section ${index} Debug:
            - Progress: ${(self.progress * 100).toFixed(1)}%
            - Trigger Top: ${sectionEl.offsetTop}px
            - Trigger Bottom: ${sectionEl.offsetTop + sectionEl.offsetHeight}px
            - Scroll Position: ${container.scrollTop}px
            - isManualScroll: ${isManualScroll.current}
          `);
          }
        });
      }
    });

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (!isManualScroll.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      if (isAtBottom) {
        console.log('📍 Reached bottom, activating last section');
        setActiveSection(gptStudyData.length - 1);
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      container.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveSection, isReady, isScrolling]);

  // ✅ expandedContent 변경 시 ScrollTrigger refresh (debounced)
  useEffect(() => {
    if (!isReady) return;

    const debouncedRefresh = debounce(() => {
      console.log('🔄 Refreshing ScrollTrigger due to content change');
      ScrollTrigger.refresh();
    }, 100);

    debouncedRefresh();
  }, [expandedContent, isReady]);

  // activeSection 변화 감지 → 스크롤 이동 (Sidebar 클릭 시)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!contentRef.current || !isReady) return;

    const targetSection = contentRef.current.querySelector(`#section-${activeSection}`);
    
    if (targetSection) {
      isManualScroll.current = false;
      setIsScrolling(true);
      
      console.log(`📍 Sidebar clicked, scrolling to section ${activeSection}`);

      gsap.to(contentRef.current, {
        scrollTo: {
          y: targetSection,
          offsetY: 0,
          autoKill: true
        },
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsScrolling(false);
          isManualScroll.current = true;
          console.log(`✅ Scroll completed to section ${activeSection}`);
        }
      });
    }
  }, [activeSection, isReady]);

  return (
    <main 
      ref={contentRef}
      className={`
        w-5/6 h-screen bg-black overflow-y-auto
        ${isScrolling ? '' : 'snap-y snap-mandatory'}
      `}
    >
      <div className="flex flex-col gap-6">
        {gptStudyData.map((recipe, index) => (
          <Section 
            key={recipe.id} 
            recipe={recipe} 
            index={index}
          />
        ))}
      </div>
      
      <style jsx>{`
        main::-webkit-scrollbar {
          width: 8px;
        }
        main::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        main::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        main::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </main>
  );
};

export default Content;