// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';

const Content = () => {
  const contentRef = useRef(null);
  const { activeSection } = useGPTStudyStore();

  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!contentRef.current) return;

    const targetSection = contentRef.current.querySelector(`#section-${activeSection}`);
    
    if (targetSection) {
      gsap.to(contentRef.current, {
        scrollTo: {
          y: targetSection,
          offsetY: 0
        },
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [activeSection]);

  return (
    <main 
      ref={contentRef}
      className="w-5/6 h-screen bg-black overflow-y-auto snap-y snap-mandatory"
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