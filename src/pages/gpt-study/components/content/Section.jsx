// src/pages/gpt-study/components/content/Section.jsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TabInterface from "./TabInterface";
import useGPTStudyStore from "../../store";

// Tutorial ì»´í¬ë„ŒíŠ¸ import
import Recipe1TutorialExplain from "./tabs/expanded/tutorial/Recipe1TutorialExplain";
import Recipe1TutorialExample from "./tabs/expanded/tutorial/Recipe1TutorialExample";
import Recipe2TutorialExplain from "./tabs/expanded/tutorial/Recipe2TutorialExplain";
import Recipe2TutorialExample from "./tabs/expanded/tutorial/Recipe2TutorialExample";
import Recipe3TutorialExplain from "./tabs/expanded/tutorial/Recipe3TutorialExplain";
import Recipe3TutorialExample from "./tabs/expanded/tutorial/Recipe3TutorialExample";
import Recipe4TutorialExplain from "./tabs/expanded/tutorial/Recipe4TutorialExplain";
import Recipe4TutorialExample from "./tabs/expanded/tutorial/Recipe4TutorialExample";
import Recipe5TutorialExplain from "./tabs/expanded/tutorial/Recipe5TutorialExplain";
import Recipe5TutorialExample from "./tabs/expanded/tutorial/Recipe5TutorialExample";
import Recipe6TutorialExplain from "./tabs/expanded/tutorial/Recipe6TutorialExplain";
import Recipe6TutorialExample from "./tabs/expanded/tutorial/Recipe6TutorialExample";

// Quiz Container import
import Recipe1QuizContainer from "./tabs/expanded/quiz/Recipe1QuizContainer";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ recipe, index }) => {
  const { tab } = useParams();
  const { expandedContent, setProgrammaticScroll } = useGPTStudyStore();
  
  const timelineRef = useRef(null);
  const tutorialRef = useRef(null);
  const quizRef = useRef(null);
  const chatRef = useRef(null);
  const containerRef = useRef(null);

  const isTutorialExpanded = expandedContent?.recipeId === recipe.id && tab === "tutorial";
  const isQuizExpanded = expandedContent?.recipeId === recipe.id && tab === "quiz";
  const isChatExpanded = expandedContent?.recipeId === recipe.id && tab === "chat";

  // âœ… Reference íŒ¨í„´: GSAP Timelineìœ¼ë¡œ ì—´ë¦¼/ë‹«íž˜ + ìŠ¤í¬ë¡¤ ê´€ë¦¬
  useEffect(() => {
    // ê¸°ì¡´ timeline ì •ë¦¬
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current.kill();
    }

    // ìƒˆ timeline ìƒì„±
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
        console.log(`âœ… Section ${index} animation complete, ScrollTrigger refreshed`);
      }
    });

    const container = document.querySelector('main');

    // Tutorial ì²˜ë¦¬
    if (tutorialRef.current && container) {
      if (isTutorialExpanded) {
        console.log(`ðŸ“– Opening Tutorial for Recipe ${recipe.id}`);
        
        // 1. ì¦‰ì‹œ ì—´ë¦¼
        timelineRef.current.to(tutorialRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);

        // 2. âœ… ìŠ¤í¬ë¡¤ ì „ì— í”Œëž˜ê·¸ ON
        timelineRef.current.call(() => {
          setProgrammaticScroll(true);
          console.log('ðŸš« Programmatic scroll started - ScrollTrigger disabled');
        }, null, 0.1);

        // 3. ìŠ¤í¬ë¡¤ ì• ë‹ˆë©”ì´ì…˜
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(`#tab-interface-${recipe.id}`);
        
        if (tabInterface) {
          const targetScrollTop = tabInterface.offsetTop + tabInterface.offsetHeight;
          
          console.log(`ðŸ“œ Scrolling to TabInterface bottom (${targetScrollTop}px)`);
          
          timelineRef.current.to(container, {
            scrollTop: targetScrollTop,
            duration: 0.8,
            ease: "power2.inOut"
          }, 0.1);
        }
        
        // 4. âœ… ìŠ¤í¬ë¡¤ ì™„ë£Œ í›„ í”Œëž˜ê·¸ OFF
        timelineRef.current.call(() => {
          setProgrammaticScroll(false);
          console.log('âœ… Programmatic scroll ended - ScrollTrigger enabled');
        }, null, 0.9); // 0.1 + 0.8 = 0.9ì´ˆ
        
      } else if (tutorialRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > tutorialRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`ðŸ”½ Closing Tutorial immediately (scrolled past) for Recipe ${recipe.id}`);
          
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - tutorialRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(tutorialRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`ðŸ”½ Closing Tutorial with animation for Recipe ${recipe.id}`);
          
          timelineRef.current.to(tutorialRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    // Quiz ì²˜ë¦¬
    if (quizRef.current && container) {
      if (isQuizExpanded) {
        console.log(`ðŸ“ Opening Quiz for Recipe ${recipe.id}`);
        
        // 1. ì—´ê¸°
        timelineRef.current.to(quizRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);
        
        // 2. âœ… ìŠ¤í¬ë¡¤ ì „ì— í”Œëž˜ê·¸ ON
        timelineRef.current.call(() => {
          setProgrammaticScroll(true);
          console.log('ðŸš« Programmatic scroll started (Quiz)');
        }, null, 0.1);
        
        // 3. ìŠ¤í¬ë¡¤ ì• ë‹ˆë©”ì´ì…˜
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(`#tab-interface-${recipe.id}`);
        
        if (tabInterface) {
          const targetScrollTop = tabInterface.offsetTop + tabInterface.offsetHeight;
          
          console.log(`ðŸ“œ Scrolling to TabInterface bottom for Quiz (${targetScrollTop}px)`);
          
          timelineRef.current.to(container, {
            scrollTop: targetScrollTop,
            duration: 0.8,
            ease: "power2.inOut"
          }, 0.1);
        }
        
        // 4. âœ… ìŠ¤í¬ë¡¤ ì™„ë£Œ í›„ í”Œëž˜ê·¸ OFF
        timelineRef.current.call(() => {
          setProgrammaticScroll(false);
          console.log('âœ… Programmatic scroll ended (Quiz)');
        }, null, 0.9);
        
      } else if (quizRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > quizRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`ðŸ”½ Closing Quiz immediately for Recipe ${recipe.id}`);
          
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - quizRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(quizRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`ðŸ”½ Closing Quiz with animation for Recipe ${recipe.id}`);
          
          timelineRef.current.to(quizRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    // Chat ì²˜ë¦¬
    if (chatRef.current && container) {
      if (isChatExpanded) {
        console.log(`ðŸ’¬ Opening Chat for Recipe ${recipe.id}`);
        
        // 1. ì—´ê¸°
        timelineRef.current.to(chatRef.current, {
          height: "auto",
          overflow: "unset",
          ease: "circ.in",
          duration: 0
        }, 0);
        
        // 2. âœ… ìŠ¤í¬ë¡¤ ì „ì— í”Œëž˜ê·¸ ON
        timelineRef.current.call(() => {
          setProgrammaticScroll(true);
          console.log('ðŸš« Programmatic scroll started (Chat)');
        }, null, 0.1);
        
        // 3. ìŠ¤í¬ë¡¤ ì• ë‹ˆë©”ì´ì…˜
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(`#tab-interface-${recipe.id}`);
        
        if (tabInterface) {
          const targetScrollTop = tabInterface.offsetTop + tabInterface.offsetHeight;
          
          console.log(`ðŸ“œ Scrolling to TabInterface bottom for Chat (${targetScrollTop}px)`);
          
          timelineRef.current.to(container, {
            scrollTop: targetScrollTop,
            duration: 0.8,
            ease: "power2.inOut"
          }, 0.1);
        }
        
        // 4. âœ… ìŠ¤í¬ë¡¤ ì™„ë£Œ í›„ í”Œëž˜ê·¸ OFF
        timelineRef.current.call(() => {
          setProgrammaticScroll(false);
          console.log('âœ… Programmatic scroll ended (Chat)');
        }, null, 0.9);
        
      } else if (chatRef.current.offsetHeight > 0) {
        const shouldCloseImmediately = container.scrollTop > chatRef.current.offsetTop;
        
        if (shouldCloseImmediately) {
          console.log(`ðŸ”½ Closing Chat immediately for Recipe ${recipe.id}`);
          
          timelineRef.current.set(container, {
            scrollTop: container.scrollTop - chatRef.current.offsetHeight
          }, 0);
          
          timelineRef.current.set(chatRef.current, {
            height: 0,
            overflow: "hidden"
          }, 0);
          
        } else {
          console.log(`ðŸ”½ Closing Chat with animation for Recipe ${recipe.id}`);
          
          timelineRef.current.to(chatRef.current, {
            height: 0,
            ease: "circ.out",
            duration: 0.5,
            overflow: "hidden"
          }, 0);
        }
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isTutorialExpanded, isQuizExpanded, isChatExpanded, recipe.id, index, setProgrammaticScroll]);

  return (
    <section
      ref={containerRef}
      id={`section-${index}`}
      className="flex flex-col px-12"
    >
      {/* Start Anchor */}
      <div 
        id={`section-start-${index}`} 
        data-section-index={index}
        className="h-0" 
      />

      {/* íƒ­ ì¸í„°íŽ˜ì´ìŠ¤ */}
      <TabInterface recipe={recipe} />

      {/* Tutorial ì»¨í…ì¸  */}
      <div
        ref={tutorialRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <div className="py-4">
          {renderTutorialContent(recipe.id, index)}
        </div>
      </div>

      {/* Quiz ì»¨í…ì¸  */}
      <div
        ref={quizRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <div className="py-8">
          {recipe.id === 1 && <Recipe1QuizContainer />}
        </div>
      </div>

      {/* Chat ì»¨í…ì¸  */}
      <div
        ref={chatRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden"
        }}
      >
        <div className="py-8">
          <div className="text-white text-center py-20">
            <h2 className="text-4xl font-bold mb-4">CHAT</h2>
            <p className="text-xl text-gray-400">ì±„íŒ… ê¸°ëŠ¥ ì¤€ë¹„ ì¤‘ìž…ë‹ˆë‹¤.</p>
          </div>
        </div>
      </div>

      {/* Section End Anchor */}
      <div 
        id={`section-end-${index}`}
        data-section-index={index}
        className="h-0" 
      />
    </section>
  );
};

// Tutorial ì»¨í…ì¸  ë Œë”ë§ í—¬í¼ í•¨ìˆ˜
const renderTutorialContent = (recipeId, index) => {
  switch (recipeId) {
    case 1:
      return <Recipe1TutorialExplain recipeId={recipeId} index={index} />;
    case 2:
      return (
        <>
          <Recipe2TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe2TutorialExample recipeId={recipeId} index={index} />
        </>
      );
    case 3:
      return (
        <>
          <Recipe3TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe3TutorialExample recipeId={recipeId} index={index} />
        </>
      );
    case 4:
      return (
        <>
          <Recipe4TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe4TutorialExample recipeId={recipeId} index={index} />
        </>
      );
    case 5:
      return (
        <>
          <Recipe5TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe5TutorialExample recipeId={recipeId} index={index} />
        </>
      );
    case 6:
      return (
        <>
          <Recipe6TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe6TutorialExample recipeId={recipeId} index={index} />
        </>
      );
    default:
      return (
        <div className="text-white text-center py-20">
          <p className="text-xl">Tutorial ì»¨í…ì¸  ì¤€ë¹„ ì¤‘ìž…ë‹ˆë‹¤.</p>
        </div>
      );
  }
};

export default Section;