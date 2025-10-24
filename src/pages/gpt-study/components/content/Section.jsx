// src/pages/gpt-study/components/content/Section.jsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import ChatUI from "./tabs/expanded/chat/Recipe1ChatExpanded";

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

  const isTutorialExpanded =
    expandedContent?.recipeId === recipe.id && tab === "tutorial";
  const isQuizExpanded =
    expandedContent?.recipeId === recipe.id && tab === "quiz";
  const isChatExpanded =
    expandedContent?.recipeId === recipe.id && tab === "chat";

  // ✅ Reference 패턴: GSAP Timeline으로 열림/닫힘 + 스크롤 관리
  useEffect(() => {
    // 기존 timeline 정리
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current.kill();
    }

    // 새 timeline 생성
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.refresh();
        console.log(
          `✅ Section ${index} animation complete, ScrollTrigger refreshed`
        );
      },
    });

    const container = document.querySelector("main");

    // Tutorial 처리
    if (tutorialRef.current && container) {
      if (isTutorialExpanded) {
        console.log(`📖 Opening Tutorial for Recipe ${recipe.id}`);

        // 1. 즉시 열림
        timelineRef.current.to(
          tutorialRef.current,
          {
            height: "auto",
            overflow: "unset",
            ease: "circ.in",
            duration: 0,
          },
          0
        );

        // 2. ✅ 스크롤 전에 플래그 ON
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(true);
            console.log(
              "🚫 Programmatic scroll started - ScrollTrigger disabled"
            );
          },
          null,
          0.1
        );

        // 3. 스크롤 애니메이션
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(
          `#tab-interface-${recipe.id}`
        );

        if (tabInterface) {
          const targetScrollTop =
            tabInterface.offsetTop + tabInterface.offsetHeight;

          console.log(
            `📜 Scrolling to TabInterface bottom (${targetScrollTop}px)`
          );

          timelineRef.current.to(
            container,
            {
              scrollTop: targetScrollTop,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // 4. ✅ 스크롤 완료 후 플래그 OFF
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(false);
            console.log("✅ Programmatic scroll ended - ScrollTrigger enabled");
          },
          null,
          0.9
        ); // 0.1 + 0.8 = 0.9초
      } else if (tutorialRef.current.offsetHeight > 0) {
        const shouldCloseImmediately =
          container.scrollTop > tutorialRef.current.offsetTop;

        if (shouldCloseImmediately) {
          console.log(
            `🔽 Closing Tutorial immediately (scrolled past) for Recipe ${recipe.id}`
          );

          timelineRef.current.set(
            container,
            {
              scrollTop: container.scrollTop - tutorialRef.current.offsetHeight,
            },
            0
          );

          timelineRef.current.set(
            tutorialRef.current,
            {
              height: 0,
              overflow: "hidden",
            },
            0
          );
        } else {
          console.log(
            `🔽 Closing Tutorial with animation for Recipe ${recipe.id}`
          );

          timelineRef.current.to(
            tutorialRef.current,
            {
              height: 0,
              ease: "circ.out",
              duration: 0.5,
              overflow: "hidden",
            },
            0
          );
        }
      }
    }

    // Quiz 처리
    if (quizRef.current && container) {
      if (isQuizExpanded) {
        console.log(`📝 Opening Quiz for Recipe ${recipe.id}`);

        // 1. 열기
        timelineRef.current.to(
          quizRef.current,
          {
            height: "auto",
            overflow: "unset",
            ease: "circ.in",
            duration: 0,
          },
          0
        );

        // 2. ✅ 스크롤 전에 플래그 ON
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(true);
            console.log("🚫 Programmatic scroll started (Quiz)");
          },
          null,
          0.1
        );

        // 3. 스크롤 애니메이션
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(
          `#tab-interface-${recipe.id}`
        );

        if (tabInterface) {
          const targetScrollTop =
            tabInterface.offsetTop + tabInterface.offsetHeight;

          console.log(
            `📜 Scrolling to TabInterface bottom for Quiz (${targetScrollTop}px)`
          );

          timelineRef.current.to(
            container,
            {
              scrollTop: targetScrollTop,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // 4. ✅ 스크롤 완료 후 플래그 OFF
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(false);
            console.log("✅ Programmatic scroll ended (Quiz)");
          },
          null,
          0.9
        );
      } else if (quizRef.current.offsetHeight > 0) {
        const shouldCloseImmediately =
          container.scrollTop > quizRef.current.offsetTop;

        if (shouldCloseImmediately) {
          console.log(`🔽 Closing Quiz immediately for Recipe ${recipe.id}`);

          timelineRef.current.set(
            container,
            {
              scrollTop: container.scrollTop - quizRef.current.offsetHeight,
            },
            0
          );

          timelineRef.current.set(
            quizRef.current,
            {
              height: 0,
              overflow: "hidden",
            },
            0
          );
        } else {
          console.log(`🔽 Closing Quiz with animation for Recipe ${recipe.id}`);

          timelineRef.current.to(
            quizRef.current,
            {
              height: 0,
              ease: "circ.out",
              duration: 0.5,
              overflow: "hidden",
            },
            0
          );
        }
      }
    }

    // Chat 처리
    if (chatRef.current && container) {
      if (isChatExpanded) {
        console.log(`💬 Opening Chat for Recipe ${recipe.id}`);

        // 1. 열기
        timelineRef.current.to(
          chatRef.current,
          {
            height: "auto",
            overflow: "unset",
            ease: "circ.in",
            duration: 0,
          },
          0
        );

        // 2. ✅ 스크롤 전에 플래그 ON
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(true);
            console.log("🚫 Programmatic scroll started (Chat)");
          },
          null,
          0.1
        );

        // 3. 스크롤 애니메이션
        const sectionElement = containerRef.current;
        const tabInterface = sectionElement?.querySelector(
          `#tab-interface-${recipe.id}`
        );

        if (tabInterface) {
          const targetScrollTop =
            tabInterface.offsetTop + tabInterface.offsetHeight;

          console.log(
            `📜 Scrolling to TabInterface bottom for Chat (${targetScrollTop}px)`
          );

          timelineRef.current.to(
            container,
            {
              scrollTop: targetScrollTop,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // 4. ✅ 스크롤 완료 후 플래그 OFF
        timelineRef.current.call(
          () => {
            setProgrammaticScroll(false);
            console.log("✅ Programmatic scroll ended (Chat)");
          },
          null,
          0.9
        );
      } else if (chatRef.current.offsetHeight > 0) {
        const shouldCloseImmediately =
          container.scrollTop > chatRef.current.offsetTop;

        if (shouldCloseImmediately) {
          console.log(`🔽 Closing Chat immediately for Recipe ${recipe.id}`);

          timelineRef.current.set(
            container,
            {
              scrollTop: container.scrollTop - chatRef.current.offsetHeight,
            },
            0
          );

          timelineRef.current.set(
            chatRef.current,
            {
              height: 0,
              overflow: "hidden",
            },
            0
          );
        } else {
          console.log(`🔽 Closing Chat with animation for Recipe ${recipe.id}`);

          timelineRef.current.to(
            chatRef.current,
            {
              height: 0,
              ease: "circ.out",
              duration: 0.5,
              overflow: "hidden",
            },
            0
          );
        }
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [
    isTutorialExpanded,
    isQuizExpanded,
    isChatExpanded,
    recipe.id,
    index,
    setProgrammaticScroll,
  ]);

  return (
    <section
      ref={containerRef}
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
        ref={tutorialRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden",
        }}
      >
        <div className="py-8">{renderTutorialContent(recipe.id, index)}</div>
      </div>

      {/* Quiz 컨텐츠 */}
      <div
        ref={quizRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden",
        }}
      >
        <div className="py-8">
          {recipe.id === 1 && <Recipe1QuizContainer />}
        </div>
      </div>

      {/* Chat 컨텐츠 */}
      {/* Chat 컨텐츠 */}
      <div
        ref={chatRef}
        className="bg-black"
        style={{
          height: 0,
          overflow: "hidden",
        }}
      >
        <div className="py-8">{renderChatContent(recipe.id)}</div>
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

// Chat 컨텐츠 렌더링 헬퍼 함수
const renderChatContent = (recipeId) => {
  switch (recipeId) {
    case 1:
      return (
        <div className="text-white text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Few-Shot 대화 체험</h2>
          <p className="text-xl text-gray-400 mb-8">
            아래 챗봇과 대화를 나누며 Few-Shot Prompt를 실습해보세요.
          </p>
          {/* ✅ 실제 챗 UI 컴포넌트 삽입 */}
          <div className="w-full flex justify-center">
            <ChatUI />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="text-white text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Recipe 2 Chat</h2>
          <p className="text-xl text-gray-400">Chat 기능 준비 중입니다.</p>
        </div>
      );
    default:
      return (
        <div className="text-white text-center py-20">
          <h2 className="text-4xl font-bold mb-4">CHAT</h2>
          <p className="text-xl text-gray-400">채팅 기능 준비 중입니다.</p>
        </div>
      );
  }
};

export default Section;
