import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom"; // Added
import StartButton from "../../../../../pages/gpt-study/components/StartButton";
import CommunityButton from "../../../../../pages/gpt-study/components/CommunityButton";
import ScrollPage from "../../TutorialScroll/TutorialScroll/ScrollPage";

const OpenedClosue = ({ onComplete }) => {
  const [searchParams] = useSearchParams(); // Added
  const skipToStep5 = searchParams.get("step") === "5"; // Added

  const [scrollProgress, setScrollProgress] = useState(skipToStep5 ? 1 : 0); // Modified
  const [isScrollCompleted, setIsScrollCompleted] = useState(skipToStep5 ? true : false); // Modified
  const containerRef = useRef(null);

  // 스크롤 텍스트들
  const scrollTexts = [
    ["그것은 곧 프롬프트 엔지니어링,", "언어를 다루는 비밀의 조리법이었다."],
    [
      "그 때, 눈앞에 나타난 의문의 석상!",
      "그 석상은 원래 단순한 돌조각에 불과했지만,",
      "소문에 따르면 레시피를 완성한 석상은",
      "비로소 사람이 될 수 있다고 했다.",
    ],
    [
      "그래서 그는 요리 마스터가 되기로 결심했다.",
      "하지만 단순히 따라 하기만 해서는 부족했다.",
      "재료와 조리법을 창의적으로 조합해 자신만의 요리를 완성해야만",
      "진짜 '사람의 감각'을 얻을 수 있었다.",
    ],
    [
      "그는 믿고 있었다.",
      "만약 누군가 함께해 준다면, 이 주방에서 조금씩 달라질 수 있을 것이라고.",
      "그리고 이제, 당신이 그 길을 함께할 차례이다.",
    ],
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);

      // 스크롤이 거의 끝에 도달했을 때 완료 상태로 설정 (95% 이상)
      if (progress >= 0.95 && !isScrollCompleted) {
        setIsScrollCompleted(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isScrollCompleted]);

  // 클릭 핸들러
  const handleClick = useCallback(() => {
    if (isScrollCompleted && onComplete) {
      onComplete();
    }
  }, [isScrollCompleted, onComplete]);

  const getOpacity = (index) => {
    const totalItems = scrollTexts.length;
    const progressPerItem = 1 / totalItems;
    const currentItemStart = index * progressPerItem;
    const currentItemEnd = (index + 1) * progressPerItem;

    if (
      scrollProgress >= currentItemStart &&
      scrollProgress <= currentItemEnd
    ) {
      const itemProgress =
        (scrollProgress - currentItemStart) / progressPerItem;

      const steps = 16;
      const stepSize = 1 / steps;
      const currentStep = Math.floor(itemProgress / stepSize);
      const stepProgress = (itemProgress % stepSize) / stepSize;

      if (currentStep < 8) {
        const baseOpacity = currentStep * 0.125;
        const stepIncrement = stepProgress * 0.125;
        return Math.min(baseOpacity + stepIncrement, 1);
      } else {
        const fadeOutStep = currentStep - 8;
        const baseOpacity = 1 - fadeOutStep * 0.125;
        const stepDecrement = stepProgress * 0.125;
        return Math.max(baseOpacity - stepDecrement, 0);
      }
    }

    return 0;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F5F5]">
      <div className="relative w-screen h-screen overflow-hidden bg-[#F5F5F5]">
        {/* 열린 클로슈 (하단) */}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-10">
          <div
            className="relative"
            style={{ width: "calc(60vw * 0.8)", maxWidth: "800px" }}
          >
            <img
              src="/images/main-page/closue_plate.png"
              alt="closue-plate"
              className="w-full"
              style={{ display: "block", transform: "translateY(250px)" }}
            />
            <motion.img
              src="/images/main-page/closue_dom.png"
              alt="closue-dom"
              className="absolute bottom-0 left-0 w-full"
              initial={{
                rotate: -20,
                y: -70,
                x: 80,
              }}
              animate={{
                rotate: -20,
                y: -70,
                x: 80,
              }}
              transition={{ duration: 0 }}
              style={{
                transformOrigin: "bottom left",
              }}
            />
          </div>
        </div>

        {/* 오버레이 + 서비스명 (상단) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* 서비스명 - 스크롤 채우기 효과 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute text-[80px] font-bold text-center"
          >
            {/* 기본 텍스트 (흰색) */}
            <div className="relative">
              <div className="font-stretch text-white">PRompting</div>
              <div className="font-desira text-white">[RECIPe]</div>

              {/* 오버레이 텍스트 (그라데이션) - 스크롤 진행도에 따라 위에서부터 그라데이션으로 채워짐 */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{
                  height: `${scrollProgress * 100}%`,
                }}
              >
                <div
                  className="font-stretch"
                  style={{
                    background:
                      "linear-gradient(to bottom, #FF6C43, #FF6C43, #ffffff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  PRompting
                </div>
                <div
                  className="font-desira"
                  style={{
                    background:
                      "linear-gradient(to bottom, #FF6C43, #FF6C43, #ffffff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  [RECIPe]
                </div>
              </div>
            </div>
          </motion.div>

          {/* FadeScroll 컨테이너 */}
          <div className="relative w-full h-full">
            {/* 스크롤 가능한 투명 컨테이너 */}
            <div
              ref={containerRef}
              className="absolute inset-0 overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div style={{ height: `${scrollTexts.length * 100}vh` }} />
            </div>

            {/* 고정 위치에 배치된 텍스트들 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {scrollTexts.map((lines, index) => (
                <div
                  key={index}
                  className="absolute text-white text-[20px] font-bold font-pretendard mt-[360px] text-center px-4 leading-relaxed"
                  style={{
                    opacity: getOpacity(index),
                  }}
                >
                  {lines.map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {isScrollCompleted && (
          <>
            <StartButton />
            <CommunityButton />
            <div className="absolute inset-0 flex z-[9000] pointer-events-none">
              {/* 왼쪽 반 - 커뮤니티 (hover 효과만 트리거) */}
              <div
                className="absolute top-0 left-0 h-full w-[25%] pointer-events-auto"
                onMouseEnter={() => document.body.classList.add("hover-left")}
                onMouseLeave={() =>
                  document.body.classList.remove("hover-left")
                }
                onClick={() => (window.location.href = "/community")} // ✅ 클릭 시 이동
                style={{ cursor: "pointer" }}
              ></div>

              {/* 오른쪽 반 - 요리 시작 (hover 효과만 트리거) */}
              <div
                className="absolute top-0 right-0 h-full w-[25%] pointer-events-auto"
                onMouseEnter={() => document.body.classList.add("hover-right")}
                onMouseLeave={() =>
                  document.body.classList.remove("hover-right")
                }
                onClick={() => (window.location.href = "/tutorial")} // ✅ 클릭 시 이동
                style={{ cursor: "pointer" }}
              ></div>
            </div>
          </>
        )}
        {isScrollCompleted && (
          <div style={{ display: "none" }}>
            <ScrollPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenedClosue;
