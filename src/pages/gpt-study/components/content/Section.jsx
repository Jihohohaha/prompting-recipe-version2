// src/pages/gpt-study/components/content/Section.jsx
import { useParams } from "react-router-dom";
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
import Recipe4TutorialExample from "./tabs/expanded/tutorial/Recipe4TutorialExample";
import Recipe5TutorialExplain from "./tabs/expanded/tutorial/Recipe5TutorialExplain";
import Recipe5TutorialExample from "./tabs/expanded/tutorial/Recipe5TutorialExample";
import Recipe6TutorialExplain from "./tabs/expanded/tutorial/Recipe6TutorialExplain";
import Recipe6TutorialExample from "./tabs/expanded/tutorial/Recipe6TutorialExample";

// Quiz Container import
import Recipe1QuizContainer from "./tabs/expanded/quiz/Recipe1QuizContainer";

const Section = ({ recipe, index }) => {
  const { tab } = useParams();
  const { expandedContent } = useGPTStudyStore();

  const isTutorialExpanded = expandedContent?.recipeId === recipe.id && tab === "tutorial";
  const isQuizExpanded = expandedContent?.recipeId === recipe.id && tab === "quiz";
  const isChatExpanded = expandedContent?.recipeId === recipe.id && tab === "chat";

  return (
    <section
      id={`section-${index}`}
      className="flex flex-col px-12 py-8"
    >
      {/* Start Anchor */}
      <div 
        id={`section-start-${index}`} 
        data-section-index={index}
        className="h-0" 
      />

      {/* 탭 인터페이스 */}
      <TabInterface recipe={recipe} />

      {/* Tutorial 컨텐츠 */}
      <div
        className="overflow-hidden transition-all duration-1200 ease-in-out"
        style={{
          maxHeight: isTutorialExpanded ? '90000px' : '0',
          opacity: isTutorialExpanded ? 1 : 0,
        }}
      >
        <div className="bg-black py-8">
          {renderTutorialContent(recipe.id, index)}
          {/* ✅ Expanded Content 끝 감지용 Sentinel */}
          <div 
            id={`expanded-end-${index}`}
            data-section-index={index}
            data-expanded-type="tutorial"
            className="h-0"
          />
        </div>
      </div>

      {/* Quiz 컨텐츠 */}
      <div
        className="overflow-hidden transition-all duration-1200 ease-in-out"
        style={{
          maxHeight: isQuizExpanded ? '10000px' : '0',
          opacity: isQuizExpanded ? 1 : 0,
        }}
      >
        <div className="bg-black py-8">
          {recipe.id === 1 && <Recipe1QuizContainer />}
          {/* ✅ Expanded Content 끝 감지용 Sentinel */}
          <div 
            id={`expanded-end-${index}`}
            data-section-index={index}
            data-expanded-type="quiz"
            className="h-0"
          />
        </div>
      </div>

      {/* Chat 컨텐츠 */}
      <div
        className="overflow-hidden transition-all duration-1200 ease-in-out"
        style={{
          maxHeight: isChatExpanded ? '10000px' : '0',
          opacity: isChatExpanded ? 1 : 0,
        }}
      >
        <div className="bg-black py-8">
          <div className="text-white text-center py-20">
            <h2 className="text-4xl font-bold mb-4">CHAT</h2>
            <p className="text-xl text-gray-400">채팅 기능 준비 중입니다.</p>
          </div>
          {/* ✅ Expanded Content 끝 감지용 Sentinel */}
          <div 
            id={`expanded-end-${index}`}
            data-section-index={index}
            data-expanded-type="chat"
            className="h-0"
          />
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


// Tutorial 컨텐츠 렌더링 헬퍼 함수
const renderTutorialContent = (recipeId, index) => {
  switch (recipeId) {
    case 1:
      return (
        <>
          <Recipe1TutorialExplain />
          <div className="w-full h-12"></div>
          <Recipe1TutorialExample recipeId={recipeId} index={index} />
        </>
      );
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
          <p className="text-xl">Tutorial 컨텐츠 준비 중입니다.</p>
        </div>
      );
  }
};

export default Section;