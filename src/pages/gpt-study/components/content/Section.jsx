import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TabInterface from "./TabInterface";
import useGPTStudyStore from "../../store";

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
import Recipe1QuizContainer from "./tabs/expanded/quiz/Recipe1QuizContainer";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ recipe, index, scrollerRef }) => {
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

  // 탭 컨텐츠 열림/닫힘 높이를 미리 계산 (auto → 정수값)
  const measureAutoHeight = (el) => {
    if (!el) return 0;
    // 숨겨진 상태에서 scrollHeight를 바로 쓰면 안전
    return el.scrollHeight || 0;
  };

  const openSection = (paneRef) => {
    const pane = paneRef.current;
    const scroller = scrollerRef?.current;
    if (!pane || !scroller) return;

    const targetHeight = measureAutoHeight(pane);
    const tabInterface = containerRef.current?.querySelector(`#tab-interface-${recipe.id}`);
    const targetScrollTop = tabInterface ? (tabInterface.offsetTop + tabInterface.offsetHeight) : scroller.scrollTop;

    // 1) 열고
    gsap.set(pane, { height: targetHeight, overflow: "unset" });

    // 2) 프로그램 스크롤 보호
    setProgrammaticScroll(true);
    gsap.to(scroller, {
      scrollTop: targetScrollTop,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setProgrammaticScroll(false),
    });
  };

  const closeSection = (paneRef) => {
    const pane = paneRef.current;
    const scroller = scrollerRef?.current;
    if (!pane || !scroller) return;

    const shouldCloseImmediately = scroller.scrollTop > pane.offsetTop;
    if (shouldCloseImmediately) {
      // 스크롤 위치 보정 후 즉시 닫기
      gsap.set(scroller, { scrollTop: Math.max(0, scroller.scrollTop - pane.offsetHeight) });
      gsap.set(pane, { height: 0, overflow: "hidden" });
    } else {
      gsap.to(pane, {
        height: 0,
        overflow: "hidden",
        duration: 0.45,
        ease: "circ.out",
      });
    }
  };

  useEffect(() => {
    // gsap.context로 이 섹션 내 애니메이션만 스코프화
    const ctx = gsap.context(() => {
      // 이전 타임라인 정리
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Tutorial
      if (tutorialRef.current) {
        if (isTutorialExpanded) openSection(tutorialRef);
        else if (tutorialRef.current.offsetHeight > 0) closeSection(tutorialRef);
      }
      // Quiz
      if (quizRef.current) {
        if (isQuizExpanded) openSection(quizRef);
        else if (quizRef.current.offsetHeight > 0) closeSection(quizRef);
      }
      // Chat
      if (chatRef.current) {
        if (isChatExpanded) openSection(chatRef);
        else if (chatRef.current.offsetHeight > 0) closeSection(chatRef);
      }

      // 컨텐츠 높이 변화 후 트리거 갱신
      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, [isTutorialExpanded, isQuizExpanded, isChatExpanded, recipe.id, scrollerRef, setProgrammaticScroll]);

  return (
    <section
      ref={containerRef}
      id={`section-${index}`}
      className="flex flex-col px-12"
    >
      <div id={`section-start-${index}`} data-section-index={index} className="h-0" />
      <TabInterface recipe={recipe} />

      {/* Tutorial */}
      <div ref={tutorialRef} className="bg-black" style={{ height: 0, overflow: "hidden" }}>
        <div className="py-4">{renderTutorialContent(recipe.id, index)}</div>
      </div>

      {/* Quiz */}
      <div ref={quizRef} className="bg-black" style={{ height: 0, overflow: "hidden" }}>
        <div className="py-8">{recipe.id === 1 && <Recipe1QuizContainer scrollerRef={scrollerRef} recipeId={recipe.id} />}</div>
      </div>

      {/* Chat */}
      <div ref={chatRef} className="bg-black" style={{ height: 0, overflow: "hidden" }}>
        <div className="py-8">
          <div className="text-white text-center py-20">
            <h2 className="text-4xl font-bold mb-4">CHAT</h2>
            <p className="text-xl text-gray-400">채팅 기능 준비 중입니다.</p>
          </div>
        </div>
      </div>

      <div id={`section-end-${index}`} data-section-index={index} className="h-0" />
    </section>
  );
};

const renderTutorialContent = (recipeId, index) => {
  switch (recipeId) {
    case 1:
      return <Recipe1TutorialExplain recipeId={recipeId} index={index} />;
    case 2:
      return (<><Recipe2TutorialExplain /><div className="w-full h-12" /><Recipe2TutorialExample recipeId={recipeId} index={index} /></>);
    case 3:
      return (<><Recipe3TutorialExplain /><div className="w-full h-12" /><Recipe3TutorialExample recipeId={recipeId} index={index} /></>);
    case 4:
      return (<><Recipe4TutorialExplain /><div className="w-full h-12" /><Recipe4TutorialExample recipeId={recipeId} index={index} /></>);
    case 5:
      return (<><Recipe5TutorialExplain /><div className="w-full h-12" /><Recipe5TutorialExample recipeId={recipeId} index={index} /></>);
    case 6:
      return (<><Recipe6TutorialExplain /><div className="w-full h-12" /><Recipe6TutorialExample recipeId={recipeId} index={index} /></>);
    default:
      return (
        <div className="text-white text-center py-20">
          <p className="text-xl">Tutorial 컨텐츠 준비 중입니다.</p>
        </div>
      );
  }
};

export default Section;