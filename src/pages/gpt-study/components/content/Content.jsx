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

  // ✅ Reference 방식: ScrollTrigger 생성
  useEffect(() => {
    if (!contentRef.current) return;

    const container = contentRef.current;

    // 기존 트리거 정리
    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    console.log('🎯 Creating ScrollTriggers (Reference pattern)');

    gptStudyData.forEach((recipe, index) => {
      const startAnchor = container.querySelector(`#section-start-${index}`);
      const endAnchor = container.querySelector(`#section-end-${index}`);

      if (startAnchor && endAnchor) {
        // ✅ Reference: start와 end 모두 사용
        const trigger = ScrollTrigger.create({
          scroller: container,
          trigger: startAnchor,
          start: 'top 30%',
          endTrigger: endAnchor,
          end: 'bottom 30%',
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) {
              console.log(`📍 Section ${index} activated (Reference pattern)`);
              setActiveSection(index);
            }
          },
        });
        
        triggersRef.current.push(trigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, [setActiveSection]);

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