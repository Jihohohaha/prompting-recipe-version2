// src/pages/gpt-study/components/content/Section.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import TabInterface from "./TabInterface";
import useGPTStudyStore from "../../store";

// Tutorial 컴포넌트 import
import Recipe1TutorialExplain from "./tabs/expanded/tutorial/Recipe1TutorialExplain";
import Recipe1TutorialExample from "./tabs/expanded/tutorial/Recipe1TutorialExample";
import Recipe2TutorialExplain from "./tabs/expanded/tutorial/Recipe2TutorialExplain";
import Recipe2TutorialExample from "./tabs/expanded/tutorial/Recipe2TutorialExample";
import Recipe3TutorialExplain from "./tabs/expanded/tutorial/Recipe3TutorialExplain";
import Recipe3TutorialExample from "./tabs/expanded/tutorial/Recipe3TutorialExample";
import Recipe4TutorialExplain from "./tabs/expanded/tutorial/Recipe4TutorialExplain";
import Recipe6TutorialExplain from "./tabs/expanded/tutorial/Recipe6TutorialExplain";
import Recipe5TutorialExplain from "./tabs/expanded/tutorial/Recipe5TutorialExplain";

// Quiz Container import (✅ 추가)
import Recipe1QuizContainer from "./tabs/expanded/quiz/Recipe1QuizContainer";

const Section = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const { expandedContent, collapseContent, setActiveSection } =
    useGPTStudyStore();

  // 현재 Section이 펼쳐져 있는지 확인
  const isExpanded = expandedContent?.recipeId === recipe.id && tab;

  const handleCollapse = () => {
    console.log("🔼 Collapsing content");

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

  // 펼쳐진 콘텐츠 렌더링
  const renderExpandedContent = () => {
    // Recipe 1 - Tutorial
    if (recipe.id === 1 && tab === "tutorial") {
      return (
        <>
          {/* Explain 컴포넌트 */}
          <Recipe1TutorialExplain />

          {/* Gap - 검은색 배경이 보이는 구간 */}
          <div className="w-full h-12"></div>

          {/* Example 컴포넌트 (버튼 포함) */}
          <Recipe1TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 1 - Quiz (✅ Container로 변경)
    if (recipe.id === 1 && tab === "quiz") {
      return <Recipe1QuizContainer />;
    }

    // Recipe 2 - Tutorial
    if (recipe.id === 2 && tab === "tutorial") {
      return (
        <>
          {/* Explain 컴포넌트 */}
          <Recipe2TutorialExplain />

          {/* Gap - 검은색 배경이 보이는 구간 */}
          <div className="w-full h-12"></div>

          {/* Example 컴포넌트 (버튼 포함) */}
          <Recipe2TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 3 - Tutorial
    if (recipe.id === 3 && tab === "tutorial") {
      return (
        <>
          {/* Explain 컴포넌트 */}
          <Recipe3TutorialExplain />

          {/* Gap - 검은색 배경이 보이는 구간 */}
          <div className="w-full h-12"></div>

          {/* Example 컴포넌트 (버튼 포함) */}
          <Recipe3TutorialExample recipeId={recipe.id} index={index} />
        </>
      );
    }

    // Recipe 4 - Tutorial
    if (recipe.id === 4 && tab === "tutorial") {
      return (
        <>
          <Recipe4TutorialExplain />
        </>
      );
    }

    // Recipe 5 - Tutorial
    if (recipe.id === 5 && tab === "tutorial") {
      return (
        <>
          <Recipe5TutorialExplain />
        </>
      );
    }

    // Recipe 6 - Tutorial
    if (recipe.id === 6 && tab === "tutorial") {
      return (
        <>
          <Recipe6TutorialExplain />
        </>
      );
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

        {/* 접기 버튼 (검정 배경 위에) */}
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
      className="flex flex-col px-12 py-8 snap-start"
    >
      {/* 탭 인터페이스에 id 추가 (✅ 스크롤용) */}
      <div id={`tab-interface-${recipe.id}`}>
        <TabInterface recipe={recipe} />
      </div>

      {/* 펼쳐진 콘텐츠 영역 (애니메이션) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`expanded-content-${recipe.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-black py-8">
              {/* 실제 콘텐츠 렌더링 */}
              {renderExpandedContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section;
