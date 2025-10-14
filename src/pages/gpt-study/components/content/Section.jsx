// src/pages/gpt-study/components/content/Section.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import TabInterface from "./TabInterface";
import useGPTStudyStore from "../../store";

// Tutorial 컴포넌트 import
import Recipe2TutorialExplain from "./tabs/expanded/tutorial/Recipe2TutorialExplain";
import Recipe6TutorialExplain from "./tabs/expanded/tutorial/Recipe6TutorialExplain";
import Recipe5TutorialExplain from "./tabs/expanded/tutorial/Recipe5TutorialExplain";

const Section = ({ recipe, index }) => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const { expandedContent, collapseContent, setActiveSection } =
    useGPTStudyStore();

  // 현재 Section이 펼쳐져 있는지 확인
  const isExpanded = expandedContent?.recipeId === recipe.id && tab;

  const handleCollapse = () => {
    console.log("🔼 Collapsing content");
    // store 상태 업데이트
    collapseContent();
    // activeSection 업데이트 (Section 최상단으로 스크롤)
    setActiveSection(recipe.id - 1);
    // URL 변경
    navigate(`/gpt-study/${recipe.slug}`);
  };

  // 펼쳐진 콘텐츠 렌더링
  const renderExpandedContent = () => {
    // Recipe 2 - Tutorial
    if (recipe.id === 2 && tab === "tutorial") {
      return (
        <>
          <Recipe2TutorialExplain />
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
      {/* 탭 인터페이스 */}
      <TabInterface recipe={recipe} />

      {/* 펼쳐진 콘텐츠 영역 (애니메이션) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`expanded-content-${recipe.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-black py-8">
              {/* 실제 콘텐츠 렌더링 */}
              {renderExpandedContent()}

              {/* 접기 버튼 */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleCollapse}
                  className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
                >
                  접기 ▲
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section;
