// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

const Content = () => {
  const contentRef = useRef(null);
  const { activeSection, setActiveSection } = useGPTStudyStore();
  const [isScrolling, setIsScrolling] = useState(false);
  const isManualScroll = useRef(false);
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

  // ScrollTrigger 설정 (섹션 감지)
  useEffect(() => {
    if (!contentRef.current || !isReady) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const container = contentRef.current;

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
        });
      }
    });

    const handleScroll = () => {
      isManualScroll.current = true;
      
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
  }, [setActiveSection, isReady]);

  // activeSection 변화 감지 → 스크롤 이동
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!contentRef.current || !isReady) return;

    const targetSection = contentRef.current.querySelector(`#section-${activeSection}`);
    
    if (targetSection) {
      isManualScroll.current = false;
      setIsScrolling(true);
      
      console.log(`📍 Scrolling to section ${activeSection}`);

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
      {/* 방법론 간 간격 제거 */}
      <div className="flex flex-col gap-0">
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