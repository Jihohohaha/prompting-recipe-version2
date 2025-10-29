import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const contentRef = useRef(null);
  const { slug, tab } = useParams();
  const { setActiveSection, setExpandedContent } = useGPTStudyStore();
  const [showOverlay, setShowOverlay] = useState(true);

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

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };

  return (
    <main
      ref={contentRef}
      className="w-5/6 h-screen bg-black overflow-y-auto relative"
    >
      <div className="flex flex-col gap-6">
        {gptStudyData.map((recipe, index) => (
          <Section
            key={recipe.id}
            recipe={recipe}
            index={index}
            scrollerRef={contentRef}
          />
        ))}
      </div>

      {/* 초기 진입 오버레이 */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer w-[84vw]"
            style={{ left: '16%' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/images/gpt-study/tutorialStart.png" 
                alt="Tutorial Start"
                className="w-full h-auto object-contain"
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-[32px] left-1/2 transform -translate-x-4 -translate-y-1/2 text-gray-300 text-2xl font-bold"
              >
                클릭하세요!
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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