import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import StartButton from "../../../../../pages/gpt-study/components/StartButton";
import CommunityButton from "../../../../../pages/gpt-study/components/CommunityButton";
import ScrollPage from "../../TutorialScroll/TutorialScroll/ScrollPage";
import { useNavigate } from "react-router-dom";

// ==================== 위치 조정 변수 ====================
const LAYOUT_CONFIG = {
  // 이미지 설정
  imageWidth: "calc(60vw * 1.2)",        // 이미지 가로 크기
  imageMaxWidth: "1000px",                // 이미지 최대 크기
  
  // 전체 컨테이너 위치 조정
  containerVerticalOffset: "0px",         // 전체를 위/아래로 이동 (음수면 위로, 양수면 아래로)
  
  // 글자 위치 설정 (기본 위치)
  textTopPosition: "25%",                // 이미지 기준 세로 위치 (100% = 이미지 바로 아래)
  textLeftPosition: "12%",                // 이미지 기준 가로 위치 (50% = 중앙)
  textMarginTop: "60px",                  // 이미지와 글자 사이 간격
  
  // 글자 위치 미세 조정
  textTranslateX: "-50%",                 // 가로 미세 조정 (-50% = 중앙 정렬 보정)
  textTranslateY: "0px",                  // 세로 미세 조정
  
  // 글자 크기
  titleFontSize: "80px",                  // PROMPTING [RECIPE] 크기
  descFontSize: "22px",                   // 설명 텍스트 크기
};
// =======================================================

const OpenedClosue = ({ onComplete }) => {
  const [searchParams] = useSearchParams();
  const skipIntro = searchParams.get("skipIntro") === "true";
  
  const [firstSectionComplete, setFirstSectionComplete] = useState(skipIntro);
  const [scrollProgress, setScrollProgress] = useState(skipIntro ? 1 : 0);
  const [isScrollCompleted, setIsScrollCompleted] = useState(skipIntro);
  
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const firstContainerRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const scrollTexts = [
    [
      "그 때, 눈앞에 나타난 의문의 석상!",
      "그 석상은 원래 단순한 돌조각에 불과했지만, 소문에 따르면 레시피를",
      "완성한 석상은 비로소 사람이 될 수 있다고 했다.",
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

  // 첫 번째 섹션 스크롤 감지
  useEffect(() => {
    if (firstSectionComplete) return;
    
    const container = firstContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      
      if (scrollTop > 50) {
        setFirstSectionComplete(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [firstSectionComplete]);

  // 비디오 시간 동기화
  useEffect(() => {
    if (!firstSectionComplete) return;
    
    const video = videoRef.current;
    if (!video) return;

    const videoDuration = 4;
    const targetTime = scrollProgress * videoDuration;

    if (Math.abs(video.currentTime - targetTime) > 0.1) {
      video.currentTime = targetTime;
    }
  }, [scrollProgress, firstSectionComplete]);

  // 두 번째 섹션 스크롤 감지
  useEffect(() => {
    if (!firstSectionComplete) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);

      if (progress >= 0.95 && !isScrollCompleted) {
        setIsScrollCompleted(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isScrollCompleted, firstSectionComplete]);

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

    if (index === 0 && scrollProgress < progressPerItem) {
      const itemProgress = scrollProgress / progressPerItem;
      const steps = 16;
      const stepSize = 1 / steps;
      const currentStep = Math.floor(itemProgress / stepSize);
      const stepProgress = (itemProgress % stepSize) / stepSize;

      if (currentStep < 8) {
        return 1;
      } else {
        const fadeOutStep = currentStep - 8;
        const baseOpacity = 1 - fadeOutStep * 0.125;
        const stepDecrement = stepProgress * 0.125;
        return Math.max(baseOpacity - stepDecrement, 0);
      }
    }

    if (index === totalItems - 1 && scrollProgress >= currentItemStart) {
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
        return 1;
      }
    }

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
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* 첫 번째 섹션 - 이미지 + 글자 */}
      <AnimatePresence>
        {!firstSectionComplete && (
          <motion.div
            exit={{ y: "-100%", transition: { duration: 0.5, ease: "easeOut" } }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* 스크롤 감지용 투명 레이어 */}
            <div
              ref={firstContainerRef}
              className="absolute inset-0 z-10 overflow-y-scroll"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div style={{ height: "200vh" }} />
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>

            {/* 고정된 컨텐츠 */}
            <div 
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              style={{ transform: `translateY(${LAYOUT_CONFIG.containerVerticalOffset})` }}
            >
              <div className="relative">
                {/* 이미지 */}
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  src="/images/main-page/Closue_opened.png"
                  alt="Closue Opened"
                  className="w-auto"
                  style={{ 
                    width: LAYOUT_CONFIG.imageWidth, 
                    maxWidth: LAYOUT_CONFIG.imageMaxWidth 
                  }}
                />
                
                {/* 글자 - 이미지 아래에서 올라오는 애니메이션 */}
                <motion.div
                  initial={{ scale: 0, y: 200 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  className="absolute text-center"
                  style={{ 
                    top: LAYOUT_CONFIG.textTopPosition,
                    left: LAYOUT_CONFIG.textLeftPosition,
                    marginTop: LAYOUT_CONFIG.textMarginTop,
                    transform: `translateX(${LAYOUT_CONFIG.textTranslateX}) translateY(${LAYOUT_CONFIG.textTranslateY})`
                  }}
                >
                  {/* PROMPTING [RECIPE] */}
                  <div 
                    className="font-bold leading-snug mb-4"
                    style={{ fontSize: LAYOUT_CONFIG.titleFontSize }}
                  >
                    <div className="font-stretch text-white">PROMPTING</div>
                    <div className="font-desira text-white">[RECIPE]</div>
                  </div>
                  
                  {/* 설명 텍스트 */}
                  <div 
                    className="text-white font-pretendard leading-relaxed"
                    style={{ fontSize: LAYOUT_CONFIG.descFontSize }}
                  >
                    그것은 곧 프롬프트 엔지니어링,<br />
                    언어를 다루는 비밀의 조리법이었다.
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 두 번째 섹션 - 비디오 + scrollTexts */}
      {firstSectionComplete && (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
          {/* 비디오 (하단) */}
          <div className="absolute inset-0 z-10 flex items-end justify-center pb-10">
            <div
              className="relative"
              style={{ width: "calc(60vw * 1.2)", maxWidth: "1000px" }}
            >
              <video
                ref={videoRef}
                src="/videos/bg-new.mp4"
                muted
                playsInline
                preload="auto"
                className="w-full"
                style={{ display: "block", transform: "translateY(20px)" }}
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
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(0px)",
            }}
          >
            {/* 서비스명 - 스크롤 크로스 페이드 효과 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute text-[80px] font-bold text-center"
            >
              <div className="relative">
                <div 
                  className="grid gap-0 leading-snug transition-opacity duration-300"
                  style={{ opacity: 1 - scrollProgress }}
                >
                  <div className="font-stretch text-white">PRompting</div>
                  <div className="font-desira text-white">[RECIPe]</div>
                </div>
                <div
                  className="grid gap-0 leading-snug absolute top-0 left-0 transition-opacity duration-300"
                  style={{ opacity: scrollProgress }}
                >
                  <div
                    className="font-stretch"
                    style={{
                      background:
                        "linear-gradient(to bottom, #FF6C43, #FF6C43, #FF6C43, #FF6C43, #ffffff)",
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
                        "linear-gradient(to bottom, #FF6C43, #FF6C43, #FF6C43, #FF6C43, #ffffff)",
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

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {scrollTexts.map((lines, index) => (
                  <div
                    key={index}
                    className="absolute text-white text-[22px] font-medium font-pretendard mt-[360px] text-center px-4 leading-relaxed"
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
                <div
                  className="absolute top-0 left-0 h-full w-[25%] pointer-events-auto"
                  onMouseEnter={() => document.body.classList.add("hover-left")}
                  onMouseLeave={() =>
                    document.body.classList.remove("hover-left")
                  }
                  onClick={() => (window.location.href = "/community")}
                  style={{ cursor: "pointer" }}
                ></div>

                <div
                  className="absolute top-0 right-0 h-full w-[25%] pointer-events-auto"
                  onMouseEnter={() => document.body.classList.add("hover-right")}
                  onMouseLeave={() =>
                    document.body.classList.remove("hover-right")
                  }
                  onClick={() => {
                    setClosing(true);
                    setTimeout(() => navigate("/tutorial"), 1800);
                  }}
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
      )}
      
      {closing && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black z-[9999]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
        />
      )}
    </div>
  );
};

export default OpenedClosue;
