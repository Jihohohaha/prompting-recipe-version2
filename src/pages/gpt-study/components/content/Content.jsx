// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

const Content = () => {
  const contentRef = useRef(null);
  const { activeSection, setActiveSection } = useGPTStudyStore();
  const [isScrolling, setIsScrolling] = useState(false);
  const isManualScroll = useRef(false);

  // ScrollTrigger 설정 (섹션 감지)
  useEffect(() => {
    if (!contentRef.current) return;

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
            console.log(`🔽 Entered section ${index}: ${recipe.title}`);
            if (isManualScroll.current) {
              setActiveSection(index);
            }
          },
          onEnterBack: () => {
            console.log(`🔼 Entered back section ${index}: ${recipe.title}`);
            if (isManualScroll.current) {
              setActiveSection(index);
            }
          },
          // markers: true // ✅ 디버깅 시 활성화
        });
      }
    });

    // ✅ 스크롤 이벤트 핸들러 (스크롤 끝 감지)
    const handleScroll = () => {
      isManualScroll.current = true;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px 여유
      
      // 스크롤이 끝에 도달하면 마지막 섹션 활성화
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
  }, [setActiveSection]);

  // activeSection 변화 감지 → 스크롤 이동 (Sidebar 클릭 시)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!contentRef.current) return;

    const targetSection = contentRef.current.querySelector(`#section-${activeSection}`);
    
    if (targetSection) {
      // 프로그래매틱 스크롤 시작
      isManualScroll.current = false;
      setIsScrolling(true);
      
      console.log(`📍 Scrolling to section ${activeSection}:`, targetSection);

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
  }, [activeSection]);

  return (
    <main 
      ref={contentRef}
      className={`
        w-5/6 h-screen bg-black overflow-y-auto
        ${isScrolling ? '' : 'snap-y snap-mandatory'}
      `}
    >
      <div className="flex flex-col">
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