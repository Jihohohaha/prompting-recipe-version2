// src/pages/gpt-study/components/content/Section.jsx
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import TabInterface from "./TabInterface";
import useGPTStudyStore from "../../store";
import { useRef, useState, useEffect } from 'react';
import { useContentContext } from './ContentContext';
import useSectionTriggers from './useSectionTriggers';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Tutorial 컴포넌트 import
import Recipe1TutorialExplain from "./tabs/expanded/tutorial/Recipe1TutorialExplain";
import Recipe1TutorialExample from "./tabs/expanded/tutorial/Recipe1TutorialExample";
import Recipe2TutorialExplain from "./tabs/expanded/tutorial/Recipe2TutorialExplain";
import Recipe2TutorialExample from "./tabs/expanded/tutorial/Recipe2TutorialExample";
import Recipe3TutorialExplain from "./tabs/expanded/tutorial/Recipe3TutorialExplain";
import Recipe3TutorialExample from "./tabs/expanded/tutorial/Recipe3TutorialExample";
import Recipe4TutorialExplain from "./tabs/expanded/tutorial/Recipe4TutorialExplain";
import Recipe4TutorialExample from "./tabs/expanded/tutorial/Recipe4TutorialExample";
import Recipe6TutorialExplain from "./tabs/expanded/tutorial/Recipe6TutorialExplain";
import Recipe5TutorialExplain from "./tabs/expanded/tutorial/Recipe5TutorialExplain";

// Quiz Container import
import Recipe1QuizContainer from "./tabs/expanded/quiz/Recipe1QuizContainer";

const Section = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const { expandedContent, collapseContent, setActiveSection } = useGPTStudyStore();

  // ref for this section DOM
  const sectionRef = useRef(null);
  
  // ✅ Reference HTML 방식: expanded content의 높이 저장
  const expandedContentRef = useRef(null);
  const [expandedHeight, setExpandedHeight] = useState(0);

  // 현재 Section이 펼쳐져 있는지 확인
  const isExpanded = expandedContent?.recipeId === recipe.id && tab;

  // use ContentContext for hooks
  let contentCtx = null;
  try { contentCtx = useContentContext(); } catch (e) { /* fallback */ }

  // ✅ 콘텐츠 높이 측정 (expanded content 변경 시)
  useEffect(() => {
    if (expandedContentRef.current) {
      // 이미지 로드 대기 후 높이 측정
      const images = expandedContentRef.current.querySelectorAll('img');
      
      if (images.length > 0) {
        Promise.all(
          Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // 에러도 resolve
            });
          })
        ).then(() => {
          const height = expandedContentRef.current.scrollHeight;
          setExpandedHeight(height);
          console.info(`[Section] Measured expanded height for recipe ${recipe.id}: ${height}px`);
        });
      } else {
        // 이미지 없으면 바로 측정
        const height = expandedContentRef.current.scrollHeight;
        setExpandedHeight(height);
        console.info(`[Section] Measured expanded height for recipe ${recipe.id}: ${height}px (no images)`);
      }
    }
  }, [expandedContent, tab, recipe.id]);

  // ✅ 애니메이션 완료 시 처리
  const handleAnimationComplete = () => {
    console.info(`[Section] Animation complete for recipe ${recipe.id}, isExpanded=${isExpanded}`);
    
    // ScrollTrigger refresh
    try {
      ScrollTrigger.refresh();
      console.info('[Section] ScrollTrigger refreshed');
    } catch (e) {
      console.warn('[Section] ScrollTrigger refresh failed', e);
    }

    // Operation token 처리
    try {
      const store = useGPTStudyStore.getState();
      const token = (store.expandedContent?.opToken) || store.operationToken;
      
      if (token) {
        console.info('[Section] Animation complete, signaling operation complete with token=', token);
        store.completeOperation?.(token);
      }
    } catch (e) {
      console.warn('[Section] Operation completion failed', e);
    }
  };

  const handleCollapse = () => {
    console.info("[Section] Collapsing content for recipe", recipe.id);

    // 1. Section 시작점으로 스크롤
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // 2. 약간의 딜레이 후 접기 시작
    setTimeout(() => {
      collapseContent();
      setActiveSection(recipe.id - 1);

      // 3. 애니메이션이 끝난 후 URL 변경 (1.2초 후)
      setTimeout(() => {
        navigate(`/gpt-study/${recipe.slug}`);
      }, 1200);
    }, 300);
  };

  // Apply per-section trigger for all sections when inside the provider
  if (contentCtx) {
    useSectionTriggers(sectionRef, {
      index,
      recipeId: recipe.id,
      contentRef: contentCtx.contentRef,
      isManualScrollRef: contentCtx.isManualScrollRef,
      expandedContent,
      setActiveSection,
      collapseContent
    });
  }

  // 펼쳐진 콘텐츠 렌더링
  const renderExpandedContent = () => {
    // Recipe 1 - Tutorial
    if (recipe.id === 1 && tab === "tutorial") {
      return (
        <>
          <Recipe1TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe1TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 1 - Quiz
    if (recipe.id === 1 && tab === "quiz") {
      return <Recipe1QuizContainer />;
    }

    // Recipe 2 - Tutorial
    if (recipe.id === 2 && tab === "tutorial") {
      return (
        <>
          <Recipe2TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe2TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 3 - Tutorial
    if (recipe.id === 3 && tab === "tutorial") {
      return (
        <>
          <Recipe3TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe3TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 4 - Tutorial
    if (recipe.id === 4 && tab === "tutorial") {
      return (
        <>
          <Recipe4TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe4TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 5 - Tutorial
    if (recipe.id === 5 && tab === "tutorial") {
      return <Recipe5TutorialExplain />;
    }

    // Recipe 6 - Tutorial
    if (recipe.id === 6 && tab === "tutorial") {
      return <Recipe6TutorialExplain />;
    }

    // 기타 (임시 콘텐츠)
    return (
      <>
        <div className="text-white text-center py-20">
          <h2 className="text-4xl font-bold mb-4">
            {recipe.title} - {tab?.toUpperCase()}
          </h2>
          <p className="text-xl text-gray-400">콘텐츠가 여기에 표시됩니다.</p>
          <p className="text-sm text-gray-500 mt-4">
            Phase 5~7에서 실제 Tutorial/Quiz/Chat 컴포넌트로 교체 예정
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleCollapse}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
          >
            접기 ▲
          </button>
        </div>
      </>
    );
  };

  return (
    <section
      id={`section-${index}`}
      ref={sectionRef}
      className="flex flex-col px-12 py-8 snap-start"
    >
      {/* 탭 인터페이스에 id 추가 (스크롤용) */}
      <div id={`tab-interface-${recipe.id}`}>
        <TabInterface recipe={recipe} />
      </div>

      {/* ✅ Reference HTML 방식: AnimatePresence 제거, 항상 DOM에 렌더링 */}
      <motion.div
        id={`expanded-content-${recipe.id}`}
        style={{
          overflow: 'hidden'
        }}
        animate={{
          height: isExpanded ? expandedHeight : 0,
          opacity: isExpanded ? 1 : 0
        }}
        initial={{
          height: 0,
          opacity: 0
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* ✅ 내부 콘텐츠는 항상 렌더링됨 (height: 0일 때도) */}
        <div ref={expandedContentRef} className="bg-black py-8">
          {renderExpandedContent()}
          {/* sentinel for Content to detect end-of-expanded-content */}
          <div id={`expanded-end-${recipe.id}`} style={{ height: 1, width: '100%', opacity: 0 }} />
        </div>
      </motion.div>
    </section>
  );
};

export default Section;