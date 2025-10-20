// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const contentRef = useRef(null);
  const { slug, tab } = useParams();
  const { setActiveSection, setExpandedContent } = useGPTStudyStore();
  const triggersRef = useRef([]);
  const isUpdatingRef = useRef(false);

  // URL 변경 시 expandedContent 업데이트
  useEffect(() => {
    if (!slug) return;
    
    const recipe = gptStudyData.find(r => r.slug === slug);
    if (!recipe) return;

    if (tab) {
      setExpandedContent({ recipeId: recipe.id, tabId: tab });
    } else {
      setExpandedContent(null);
    }
  }, [slug, tab, setExpandedContent]);

  // ScrollTrigger로 anchor 감지
  useEffect(() => {
    if (!contentRef.current) return;

    const container = contentRef.current;

    // 기존 트리거 정리
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const updateSection = (index, direction, shouldCloseTabs = false) => {
      if (isUpdatingRef.current) return;
      
      isUpdatingRef.current = true;
      console.log(`📍 Section ${index} activated (${direction}${shouldCloseTabs ? ' - closing tabs' : ''})`);
      
      // ✅ 탭 접기 요청이 있으면 먼저 접기
      if (shouldCloseTabs) {
        setExpandedContent(null);
      }
      
      setActiveSection(index);
      
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    };

    gptStudyData.forEach((recipe, index) => {
      const startAnchor = container.querySelector(`#section-start-${index}`);
      const endAnchor = container.querySelector(`#section-end-${index}`);
      const expandedEndAnchor = container.querySelector(`#expanded-end-${index}`);

      // ✅ Start Anchor (펼쳐지지 않았을 때만)
      if (startAnchor) {
        const startTrigger = ScrollTrigger.create({
          trigger: startAnchor,
          scroller: container,
          start: 'top 30%',
          end: 'top 30%',
          onEnter: () => {
            const store = useGPTStudyStore.getState();
            // 아무것도 안 펼쳐져 있을 때만 동작
            if (!store.expandedContent) {
              updateSection(index, 'scrolling down');
            }
          },
        });
        triggersRef.current.push(startTrigger);
      }

      // ✅ Expanded End Anchor (펼쳐졌을 때 컨텐츠 끝 감지)
      if (expandedEndAnchor) {
        const expandedEndTrigger = ScrollTrigger.create({
          trigger: expandedEndAnchor,
          scroller: container,
          start: 'top 30%',
          end: 'top 30%',
          onEnter: () => {
            const store = useGPTStudyStore.getState();
            // 현재 section이 펼쳐져 있을 때만 동작
            if (store.expandedContent?.recipeId === recipe.id) {
              // ✅ 다음 section으로 이동하면서 탭 접기
              const nextIndex = Math.min(index + 1, gptStudyData.length - 1);
              if (nextIndex !== index) {
                updateSection(nextIndex, 'scrolling down', true); // ← 탭 접기!
              }
            }
          },
          onEnterBack: () => {
            const store = useGPTStudyStore.getState();
            // 펼쳐진 상태에서 위로 스크롤 → 현재 section 유지하면서 탭 접기
            if (store.expandedContent) {
              updateSection(index, 'scrolling up', true); // ← 탭 접기!
            }
          },
        });
        triggersRef.current.push(expandedEndTrigger);
      }

      // ✅ End Anchor (펼쳐지지 않았을 때만)
      if (endAnchor) {
        const endTrigger = ScrollTrigger.create({
          trigger: endAnchor,
          scroller: container,
          start: 'top 30%',
          end: 'top 30%',
          onEnterBack: () => {
            const store = useGPTStudyStore.getState();
            // 아무것도 안 펼쳐져 있을 때만 동작
            if (!store.expandedContent) {
              updateSection(index, 'scrolling up');
            }
          },
        });
        triggersRef.current.push(endTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [setActiveSection, setExpandedContent]);

  return (
    <main 
      ref={contentRef}
      className="w-5/6 h-screen bg-black overflow-y-auto"
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
      
      <style>{`
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