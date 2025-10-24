import { useEffect, useMemo, useRef } from 'react';
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

  // URL → expandedContent 동기화
  useEffect(() => {
    if (!slug) return;
    const recipe = gptStudyData.find(r => r.slug === slug);
    if (!recipe) return;
    if (tab) setExpandedContent({ recipeId: recipe.id, tabId: tab });
    else setExpandedContent(null);
  }, [slug, tab, setExpandedContent]);

  // ScrollTriggers: 최초 1회 생성, store 값은 콜백에서 즉시 조회
  useEffect(() => {
    if (!contentRef.current) return;

    const container = contentRef.current;
    const triggers = [];

    const makeTrigger = (index) => {
      const startAnchor = container.querySelector(`#section-start-${index}`);
      const endAnchor = container.querySelector(`#section-end-${index}`);
      if (!startAnchor || !endAnchor) return;

      const trigger = ScrollTrigger.create({
        scroller: container,
        trigger: startAnchor,
        start: 'top 30%',
        endTrigger: endAnchor,
        end: 'bottom 30%',
        invalidateOnRefresh: true,
        onToggle: (self) => {
          // 최신 store 값을 즉시 조회(재구성이 필요 없음)
          const { isProgrammaticScroll } = useGPTStudyStore.getState();
          if (isProgrammaticScroll) return;
          if (self.isActive) setActiveSection(index);
        },
      });
      triggers.push(trigger);
    };

    gptStudyData.forEach((_, index) => makeTrigger(index));

    return () => {
      triggers.forEach(t => t.kill());
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
            scrollerRef={contentRef}   // ⬅️ 내려줌
          />
        ))}
      </div>

      <style>{`
        main::-webkit-scrollbar { width: 8px; }
        main::-webkit-scrollbar-track { background: #1a1a1a; }
        main::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
        main::-webkit-scrollbar-thumb:hover { background: #666; }
      `}</style>
    </main>
  );
};

export default Content;
