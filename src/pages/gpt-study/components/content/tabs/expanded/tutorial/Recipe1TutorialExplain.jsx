// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe1TutorialExplain.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./BookFlip.css";
import Chatbot from "./chatbot";
const Highlight = ({ children }) => {
  return (
    <motion.span
      className="relative font-bold font-pretendardtext-2xl px-2 py-1 inline-block"
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255, 145, 0, 0.6) 0%, rgba(255, 145, 0, 1) 50%, rgba(255, 140, 0, 0.7) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "0% 100%",
        filter: "blur(0.6px) brightness(1.1)",
        // 🎨 아래 3줄이 '삐뚤한' 효과 핵심입니다.
        transform: "rotate(-1.5deg) skewX(-3deg)",
        borderRadius: "6px",
        clipPath: "polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)", // 위아래가 약간 비틀림
      }}
    >
      {children}
    </motion.span>
  );
};

const HighlightBox = ({ children, rotate = true }) => {
  // 랜덤하게 살짝 기울이기 (자연스러움)
  const randomTilt = rotate ? (Math.random() * 2 - 1.2).toFixed(1) : 0;

  return (
    <motion.div
      className="relative inline-block group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 형광펜 질감 배경 */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD60A]/80 to-[#FFC300]/90 blur-[3px]"
        style={{
          transform: `rotate(${randomTilt}deg)`,
          clipPath: "polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)",
        }}
      ></div>

      {/* 실제 카드 */}
      <div
        className="relative px-12 py-8 bg-white rounded-2xl border-[4px] border-[#FFC300]
                   shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-transform duration-300
                   hover:rotate-[1deg] hover:scale-[1.02]"
      >
        <p className="text-black font-pretendard text-5xl font-medium leading-snug text-center">
          {children}
        </p>
      </div>
    </motion.div>
  );
};

const Recipe1TutorialExplain = () => {
  const [leftPageIndex, setLeftPageIndex] = useState(0); // 왼쪽 페이지 인덱스
  const [rightPageIndex, setRightPageIndex] = useState(1); // 오른쪽 페이지 인덱스
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next"); // 'next' or 'prev'
  const [isPage3Completed, setIsPage3Completed] = useState(false); // Page3 완료 상태
  const navigate = useNavigate();
  const { slug } = useParams();

  // Page3 완료 핸들러
  const handlePage3Complete = () => {
    setIsPage3Completed(true);
  };

  // 페이지 인덱스가 변경될 때 Page3 완료 상태 초기화 (다른 페이지로 이동하면 리셋)
  useEffect(() => {
    if (leftPageIndex !== 2 && rightPageIndex !== 2) {
      setIsPage3Completed(false);
    }
  }, [leftPageIndex, rightPageIndex]);

  // 전체 페이지 배열 (단일 배열)
  const pages = [
    <CoverPage />, // 0
    <Page2 />, // 1
    <Page3 onComplete={handlePage3Complete} />, // 2
    <Page4 isPage3Completed={isPage3Completed} />, // 3
    <Page5 />, // 4
    <Page6 />, // 5
    <Page7 />, // 6
    <Page8 />, // 7
    <Page9 />, // 8
    <FinalPage navigate={navigate} slug={slug} />, // 9
  ];

  const handleNextPage = () => {
    // 더 이상 넘길 페이지가 없으면 리턴
    if (isFlipping || rightPageIndex >= pages.length - 1) return;

    setFlipDirection("next");
    setIsFlipping(true);

    // ✅ 회전 완료 후 state 업데이트
    setTimeout(() => {
      setLeftPageIndex((prev) => prev + 2);
      setRightPageIndex((prev) => prev + 2);
    }, 800);

    // ✅ 새 페이지 렌더링 후 클래스 제거 (약간 지연)
    setTimeout(() => {
      setIsFlipping(false);
    }, 850);
  };

  const handlePrevPage = () => {
    // 더 이상 이전 페이지가 없으면 리턴
    if (isFlipping || leftPageIndex <= 0) return;

    setFlipDirection("prev");
    setIsFlipping(true);

    // ✅ 회전 완료 후 state 업데이트
    setTimeout(() => {
      setLeftPageIndex((prev) => prev - 2);
      setRightPageIndex((prev) => prev - 2);
    }, 800);

    // ✅ 새 페이지 렌더링 후 클래스 제거 (약간 지연)
    setTimeout(() => {
      setIsFlipping(false);
    }, 850);
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-black relative">
      {/* Book.png 배경 이미지 */}
      <div className="relative" style={{ width: "1136px", height: "688px" }}>
        <img
          src="/images/gpt-study/Book.png"
          alt="Book Background"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* 책 컨테이너 - 이미지 정가운데에 배치 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Chatbot />
          <div
            className="book-wrapper"
            style={{ width: "1100px", height: "450px" }}
          >
            <div className="book-container">
              {/* 왼쪽 페이지 컨테이너 */}
              <div className="page-left-container relative">
                {/* 왼쪽 페이지 - 앞면 */}
                <div
                  className={`page-left-front ${
                    isFlipping && flipDirection === "prev"
                      ? "flipping-left"
                      : ""
                  }`}
                >
                  <div
                    className={`page-wrapper ${
                      isFlipping && flipDirection === "prev" ? "fading-out" : ""
                    }`}
                  >
                    <div className="page-content">{pages[leftPageIndex]}</div>
                  </div>
                </div>

                {/* 왼쪽 클릭 영역 - 왼쪽 20%만 */}
                <div
                  onClick={handlePrevPage}
                  className="absolute left-0 top-1/3 bottom-0 w-[20%] h-[40%] cursor-pointer z-10"
                  style={{
                    pointerEvents: leftPageIndex <= 0 ? "none" : "auto",
                  }}
                />
              </div>

              {/* 가운데 구분선 */}
              <div className="book-spine"></div>

              {/* 오른쪽 페이지 컨테이너 */}
              <div className="page-right-container relative">
                {/* 오른쪽 페이지 - 앞면 */}
                <div
                  className={`page-right-front ${
                    isFlipping && flipDirection === "next"
                      ? "flipping-right"
                      : ""
                  }`}
                >
                  <div
                    className={`page-wrapper ${
                      isFlipping && flipDirection === "next" ? "fading-out" : ""
                    }`}
                  >
                    <div className="page-content">{pages[rightPageIndex]}</div>
                  </div>
                </div>

                {/* 오른쪽 클릭 영역 - 오른쪽 20%만 */}
                <div
                  onClick={handleNextPage}
                  className="absolute right-0 top-1/3 bottom-0 w-[20%] h-[40%] cursor-pointer z-10"
                  style={{
                    pointerEvents:
                      rightPageIndex >= pages.length - 1 ? "none" : "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoverPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent relative">
      {/* FE7525 원 (작은) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
        style={{
          width: "55px",
          height: "55px",
          right: "50px",
          top: "10px",
        }}
      />

      {/* FE7525 링 (큰) */}
      <div
        className="absolute rounded-full ring-8 ring-[#FE7525]"
        style={{
          width: "212px",
          height: "212px",
          left: "20px",
          top: "30px",
        }}
      />

      {/* Role 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[6rem]"
        style={{
          left: "40px",
          top: "60px",
        }}
      >
        Role
      </div>

      {/* FE7525 원 (중간) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
        style={{
          width: "119px",
          height: "119px",
          right: "50px",
          bottom: "30px",
        }}
      />

      {/* Prompting 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[6rem] whitespace-nowrap"
        style={{
          left: "30px",
          bottom: "-70px",
        }}
      >
        Prompting
      </div>

      {/* movie.png 이미지 */}
      <img
        src="/images/gpt-study/role/movie.png"
        alt="Role Prompting"
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "250px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// Page 2
const Page2 = () => {
  return (
    <motion.div
      className="w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center font-pretendard text-lg pt-24 font-medium leading-none text-black">
        <p className="mb-10">
          영화 배우는{" "}
          <span className="bg-[#FE7525] px-2 py-1 text-xl font-extrabold text-white">
            맡은 역할에 따라 완전히 다른 사람
          </span>
          이 됩니다.
        </p>
        <p className="mb-10">같은 배우라도 어떤 작품에서는 냉철한 형사로, </p>
        <p className="mb-10">다른 작품에서는 따뜻한 아버지로 보이죠.</p>
        <p className="mb-10">이처럼 역할에 따라 말투와 행동, 표현 방식도</p>
        <p>함께 달라집니다.</p>
      </div>
    </motion.div>
  );
};

// Page 3
const Page3 = ({ onComplete }) => {
  const [chatState, setChatState] = useState("initial"); // 'initial', 'loading', 'answered'
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (chatState === "answered") {
      const timer = setTimeout(() => setShowHint(true), 1300);
      const hideTimer = setTimeout(() => setShowHint(false), 6000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    } else {
      setShowHint(false); // 다른 상태일 때는 숨김
    }
  }, [chatState]);

  const handleSendMessage = () => {
    // 1. 로딩 상태로 전환
    setChatState("loading");

    // 2. 1.5초 후 답변 표시
    setTimeout(() => {
      setChatState("answered");
      // 3. Page3 완료 알림
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent relative">
      {/* 초기 상태 */}
      {chatState === "initial" && (
        <div className="flex flex-col items-center justify-center">
          {/* ThinkingStatue 이미지 */}
          <motion.img
            src="/images/gpt-study/ThinkingStatue.png"
            alt="Thinking Statue"
            className="w-[260px] h-[260px] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* 설명 텍스트 */}
          <div className="text-black text-lg font-pretendard font-semibold text-center leading-tight mt-4">
            직접 예시를 함께 봐볼까요?
            <br />
            먼저 아무 역할도 주지 않고 이렇게 시켜보세요.
          </div>
        </div>
      )}

      {/* 답변 후 평가 텍스트 - absolute 고정 */}
      <AnimatePresence>
        {chatState === "answered" && showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className="absolute w-full text-black font-semibold text-lg font-pretendard text-center leading-tight"
            style={{
              top: "50px",
              left: "0px",
              transform: "translateX(-50%)",
            }}
          >
            흠… 계산은 잘 되어 있지만,
            <br />
            삼각형 공식을 처음 배우는 초등학생에게는
            <br />
            설명이 조금 부족해 보이네요.
          </motion.div>
        )}
      </AnimatePresence>

      {/* 채팅 말풍선 영역 - absolute 고정 */}
      {(chatState === "loading" || chatState === "answered") && (
        <div
          className="absolute w-full space-y-3"
          style={{
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "500px",
          }}
        >
          {/* 사용자 메시지 - 우측 흰색 말풍선 */}
          <div className="flex justify-end">
            <div className="bg-white text-black rounded-3xl px-12 py-4 max-w-[70%] shadow-md font-semibold">
              <p className="font-pretendard text-sm">
                밑변 6, 높이 4인 삼각형의 넓이를 구해줘.
              </p>
            </div>
          </div>

          {/* GPT 응답 - 좌측 주황색 말풍선 */}
          <div className="flex justify-start">
            {chatState === "loading" ? (
              // 로딩 애니메이션
              <div className="bg-[#FF9E4A] text-black rounded-3xl px-12 py-4 shadow-md">
                <div className="flex gap-1">
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  >
                    .
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  >
                    .
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  >
                    .
                  </span>
                </div>
              </div>
            ) : (
              // 답변
              <div className="bg-[#FF9E4A] text-black rounded-3xl px-12 py-4 max-w-[70%] font-semibold shadow-md">
                <p className="font-pretendard text-sm">답: 답은 12입니다.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 챗봇 Input 스타일 박스 - absolute로 하단 고정 */}
      <div
        className="absolute w-[500px] bg-white rounded-full border-1 border-black py-1 flex items-center justify-center shadow-md"
        style={{
          bottom: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {/* 텍스트 - 전체 중앙 */}
        <span className="text-gray-600 text-center font-pretendard text-lg w-full px-12">
          밑변 6, 높이 4인 삼각형의 넓이를 구해줘.
        </span>

        {/* 전송 버튼 - 우측 고정 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 페이지 넘김 방지
            handleSendMessage();
          }}
          className="absolute right-2 flex-shrink-0 hover:bg-[#DDDDDD] transition-opacity bg-transparent border-none p-0 cursor-pointer"
        >
          <img
            src="/images/gpt-study/Arrow2.png"
            alt="Send"
            className="z-[9999] w-8 h-8 object-contain"
          />
        </button>
      </div>
    </div>
  );
};

// Page 4
const Page4 = ({ isPage3Completed }) => {
  const [step, setStep] = useState(0);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showClickPrompt, setShowClickPrompt] = useState(false);
  const [showAnswer, setShowAnswer] = useState(true); // 답변 말풍선 표시
  const [showDifference, setShowDifference] = useState(false);

  useEffect(() => {
    if (isPage3Completed) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPage3Completed]);

  const handleSendMessage = () => {
    setShowUserMessage(true); // 사용자 말풍선 등장

    // 🕐 1.5초 동안 화면에 유지
    setTimeout(() => {
      setShowUserMessage(false); // 사용자 말풍선 사라짐
      setShowResponse(true); // GPT 응답 표시
      setIsLoading(true);

      // 1.5초 후 로딩 끝 + click!! 등장
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowClickPrompt(true);
        }, 1000);
      }, 1500);
    }, 2000); // ✅ 여기 2000ms 대기 (사용자 말풍선 유지 시간)
  };

  const handleClickPrompt = () => {
    // 답변 말풍선만 사라지고 차이 텍스트 표시
    setShowAnswer(false);
    setShowClickPrompt(false);
    setShowDifference(true);
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* ===== Step 1: 초기 화면 ===== */}
      {step === 1 &&
        !showDifference && ( // ← ✅ showDifference가 true면 사라짐
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="absolute"
              style={{
                top: "35px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
              }}
            >
              <div className="relative inline-block">
                <div className="text-black text-xl font-semibold font-pretendard text-center leading-tight mt-2 mb-2">
                  그렇다면 Role Prompting은 어떻게 다를까요?
                </div>
                <div className="relative w-full flex justify-center mt-2">
                  <div
                    className="h-[3px] bg-[#FE7525]"
                    style={{ width: "400px" }}
                  />
                  <img
                    src="/images/gpt-study/role/Star2.png"
                    alt="Star"
                    className="absolute"
                    style={{
                      left: "-10px",
                      top: "-90px",
                      width: "45px",
                      height: "40px",
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* “이번에는 다음과 같이…” 문장 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
              className="absolute font-semibold text-black text-lg font-pretendard text-center leading-tight whitespace-nowrap"
              style={{
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
              }}
            >
              이번에는 다음과 같이 '선생님'이라는 역할을 부여해보세요!
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
              className="absolute w-[450px] bg-white rounded-full py-1 flex items-center justify-center shadow-md"
              style={{
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div className="-translate-x-[30px]">
                <span className="text-gray-600 text-center font-pretendard text-base w-full pr-10 leading-snug">
                  너는 초등학교 수학 선생님이야.
                  <br />
                  학생의 질문에는 반드시 초등학생이
                  <br />
                  이해할 수 있는 수준으로 풀이 과정을 설명해.
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendMessage();
                }}
                className="z-[9999] absolute right-[70px] flex-shrink-0 hover:bg-[#DDDDDD] transition-opacity bg-transparent border-none p-0 cursor-pointer "
              >
                <img
                  src="/images/gpt-study/Arrow2.png"
                  alt="Send"
                  className="w-8 h-8 object-contain z-[9999]"
                />
              </button>
            </motion.div>
          </>
        )}

      {/* ===== 사용자 메시지 말풍선 (버튼 클릭 후) ===== */}
      {showUserMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
          style={{
            top: "150px",
            right: "30px",
          }}
        >
          <div className="bg-white text-black rounded-3xl px-6 py-3 max-w-[300px] shadow-md">
            <p className="font-pretendard text-sm leading-tight">
              너는 초등학교 수학 선생님이야.
              <br />
              학생의 질문에는 반드시 초등학생이
              <br />
              이해할 수 있는 수준으로 풀이 과정을 설명해.
            </p>
          </div>
        </motion.div>
      )}

      {/* ===== Step 2: 응답 화면 ===== */}
      {showResponse && (
        <>
          {/* 이미지 - 항상 표시 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute"
            style={{
              bottom: "-74%",
              left: "-8%",
              width: "550px",
              height: "500px",
            }}
          >
            <img
              src="/images/gpt-study/role/TeacherStatue.png"
              alt="Teacher Statue"
              className="w-full object-contain"
            />
          </motion.div>

          {/* GPT 응답 말풍선 - showAnswer가 true일 때만 */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute"
              style={{
                top: "-5px",
                left: "50px",
              }}
            >
              <div className="bg-[#FF9E4A] text-black rounded-2xl px-6 py-2 w-[400px] shadow-md">
                {isLoading ? (
                  <div className="flex gap-1">
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    >
                      .
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    >
                      .
                    </span>
                    <span
                      className="animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    >
                      .
                    </span>
                  </div>
                ) : (
                  <p className="font-pretendard text-center text-lg font-medium leading-relaxed">
                    삼각형 넓이 공식은 밑변 × 높이 ÷ 2야.
                    <br />
                    그래서 6 × 4 ÷ 2 = 12.
                    <br />
                    따라서 정답은 12란다.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* 차이 텍스트 - showDifference가 true일 때만 */}
          {showDifference && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute"
              style={{
                top: "20px",
                left: "22px",
              }}
            >
              <div className="bg-transparent text-black w-[500px] font-semibold">
                <p className="font-pretendard text-center text-base leading-8 text-lg">
                  어떤 차이가 느껴지나요?
                  <br />
                  같은 문제지만, 이번에는{" "}
                  <span className="bg-[#FE7525] px-2 py-1 font-extrabold text-xl text-white">
                    교사의 말투
                  </span>{" "}
                  와{" "}
                  <span className="bg-[#FE7525] px-2 py-1 font-extrabold text-xl text-white">
                    관점
                  </span>{" "}
                  으로 바뀌었죠.
                  <br />
                  이게 바로 Role Prompting의 힘이에요.
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ===== "click!!" 프롬프트 ===== */}
      {showClickPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute"
          style={{
            top: "70px",
            right: "50px",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClickPrompt();
            }}
            className="absolute bg-[#FE7525] text-white font-pretendard font-bold text-base
             rounded-full shadow-[0_4px_0_#C85400] border border-[#D46100]
             hover:bg-[#FF8C42] active:translate-y-[3px] active:shadow-[0_1px_0_#C85400]
             transition-all duration-200 ease-in-out ml-[-70px] mt-[-30px]"
          >
            click!
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Page 5
const Page5 = () => {
  return (
    <motion.div
      className="bg-transparent text-black w-[500px] text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0 }}
      style={{
        transform: "translateX(-20px)",
      }}
    >
      <p className="font-pretendard text-center leading-11 pt-24 gap-12 font-semibold">
        <span className="bg-[#FE7525] px-2 py-0 font-extrabold text-3xl text-white">
          Role Prompting
        </span>{" "}
        이 좋은 이유는
        <br />
        모델이 단순히 문맥에 맞게 대답하는 데서
        <br />
        그치지 않고 <Highlight>정확하면서도</Highlight>
        <br />
        <Highlight>맥락에 맞는 사고</Highlight> 와
        <br />
        <Highlight>표현을 유도</Highlight> 하기 때문이에요.
      </p>
    </motion.div>
  );
};

// Page 6
const Page6 = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12 bg-transparent relative">
      {/* Vector 1 - 상단 별 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Star 1"
        className="absolute"
        style={{
          left: "50px",
          top: "30px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 텍스트 영역 */}
      <motion.div
        className="flex flex-col items-center justify-center gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* 첫 번째 줄 - relative container */}
        <div className="relative flex items-center justify-center">
          <div className="text-black text-3xl font-pretendard text-center relative z-10 font-bold">
            그래서{" "}
            <span className="text-4xl font-extrabold">정답률이 높고,</span>
          </div>
          {/* 첫 번째 밑줄 - absolute로 텍스트와 겹침 */}
        </div>

        {/* 두 번째 줄 - relative container */}
        <div className="relative flex items-center justify-center">
          <div className="text-black text-3xl font-pretendard text-center relative z-10 font-bold">
            <span className="text-4xl font-extrabold">결과의 일관성</span>이
            유지돼요.
          </div>
          {/* 두 번째 밑줄 - absolute로 텍스트와 겹침 */}
        </div>
      </motion.div>

      {/* Vector 2 - 하단 별 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Star 2"
        className="absolute"
        style={{
          right: "50px",
          bottom: "30px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Page 7
const Page7 = () => {
  return (
    <div className="w-[700px] h-full flex flex-col items-center justify-center bg-transparent">
      <div
        className="flex flex-col items-center text-center font-pretendard
       text-xl leading-10 text-black font-semibold"
        style={{
          width: "700px",
          height: "auto",
          left: "10px",
          transform: "translateX(-120px)",
        }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          정리하자면!{" "}
          <span className="font-semibold text-2xl">Role Prompting</span> 은
        </motion.div>
        <motion.div
          className="leading-11"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <span className="bg-[#FE7525] px-2 py-1 font-semibold text-white text-2xl">
            모델이 특정 인격이나 역할을 맡아 답변하도록
          </span>
          <br />
          <span className="bg-[#FE7525] px-2 py-1 font-semibold text-white text-2xl">
            지시하는 방법
          </span>{" "}
          이에요. 이 방식을 사용하면 답변의
          <br />
          <span className="bg-[#FE7525] px-2 py-1 font-semibold text-white text-2xl">
            스타일과 관점을 원하는 방향으로 조정
          </span>{" "}
          할 수 있지만,
          <br />
          반대로{" "}
          <span className="bg-[#FE7525] px-2 py-1 font-semibold text-white text-2xl">
            역할을 너무 과하게 지정하면
          </span>
          <br />
          <span className="bg-[#FE7525] px-2 py-1 font-semibold text-white text-2xl">
            어색한 말투로 굳어질 수도
          </span>{" "}
          있습니다.
        </motion.div>
      </div>
    </div>
  );
};

// Page 8
const Page8 = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div
          className="w-[700px] text-base font-pretendard font-semibold text-lg text-black mb-6 text-center leading-8"
          style={{
            transform: "translateX(-140px) translateY(100px)",
          }}
        >
          또한{" "}
          <span className="px-2 py-1 text-[#FE7525] font-semibold text-xl">
            30년 경력의 베테랑 디자이너
          </span>
          처럼 구체적인 역할을 지정하면
          <br /> 더{" "}
          <span className="px-2 py-1 text-[#FE7525] font-semibold text-xl">
            깊이 있고 퀄리티 높은 답변
          </span>{" "}
          을 얻을 수 있어요.
        </div>
      </motion.div>

      {/* 이미지 div: 독립적으로 배치하고 크기 조절 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-[550px] flex justify-center items-center mt-12"
          style={{
            transform: "translateX(-20px) translateY(26px)",
          }}
        >
          <img
            src="/images/gpt-study/role/Page8Picture.png"
            alt="구체적인 역할 지정 예시 이미지"
            className="w-[550px] h-[300px] object-contain rounded-xl"
            style={{
              width: "900px",
              height: "350px",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Page 9
const Page9 = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleGoToQuiz = () => {
    navigate(`/gpt-study/${slug}/quiz`);
  };

  return (
    <motion.div
      className="text-black font-pretendard w-full flex flex-col items-center justify-center pt-32 relative font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* SecondLine2 */}
      <img
        src="/images/gpt-study/role/SecondLine2.png"
        alt="Second Line 2"
        className="absolute"
        style={{
          right: "0px",
          top: "200px",
          width: "150px",
          height: "100px",
          transform: "rotate(7deg) translateX(35px) translateY(-100px)",
        }}
      />

      {/* Star 1 - '그럼' 좌측 하단 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 1"
        className="absolute"
        style={{
          left: "300px",
          top: "70px",
          width: "45px",
          height: "39px",
        }}
      />

      {/* Star 2 - '감이' 위 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 2"
        className="absolute"
        style={{
          left: "70px",
          top: "250px",
          width: "45px",
          height: "39px",
        }}
      />

      {/* 텍스트 */}
      <div className="w-full text-lg font-pretendard font-semibold leading-[2.5] text-center z-10">
        <p className="md-20">
          어때요? <span className="font-bold text-2xl">Role Prompting</span> 에
          대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#FE7525] decoration-4">
            진짜 셰프가 되려면 조금 더 학습
          </span>
          이 필요하답니다.
        </p>
        <p>그럼 이제 다음 단계로 넘어가 볼까요?</p>
      </div>

      {/* 버튼 */}
      <div className="w-full flex items-center justify-center gap-4 mt-12 z-10">
        <button
          onClick={handleGoToQuiz}
          className="relative bg-[#FE7525] text-white text-xl font-medium font-pretendard px-10 py-3 rounded-full
               shadow-[0_6px_0_#D46100] active:shadow-[0_2px_0_#D46100]
               active:translate-y-[4px] transition-all duration-200"
        >
          퀴즈 풀러 가기
        </button>
      </div>
    </motion.div>
  );
};

// Final Page
const FinalPage = () => {
  const navigate = useNavigate();

  const handleGoToRecipe1 = () => {
    navigate("/gpt-study/recipe1");
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent pt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* 그림들 영역 */}
      <div className="w-full h-full flex items-center justify-center relative">
        {/* FE7525 원 (작은) */}
        <div
          className="absolute bg-[#FE7525] rounded-full"
          style={{
            width: "55px",
            height: "55px",
            right: "50px",
            top: "10px",
          }}
        />

        {/* FE7525 링 (큰) */}
        <div
          className="absolute rounded-full ring-8 ring-[#FE7525]"
          style={{
            width: "212px",
            height: "212px",
            left: "20px",
            top: "30px",
          }}
        />

        {/* FE7525 원 (중간) */}
        <div
          className="absolute bg-[#FE7525] rounded-full"
          style={{
            width: "119px",
            height: "119px",
            right: "50px",
            bottom: "-50px",
          }}
        />

        {/* movie.png 이미지 */}
        <img
          src="/images/gpt-study/role/movie.png"
          alt="Role Prompting"
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -30%)",
            width: "400px",
            height: "250px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* 버튼 영역 */}
      <div
        className="w-full flex items-center justify-center pt-12 pb-8"
        style={{
          transform: "translateY(35px)",
        }}
      >
        <div className="w-full flex items-center justify-center gap-4 mt-12 z-10">
          <button
            onClick={handleGoToRecipe1}
            className="relative bg-[#FE7525] text-white text-xl font-medium font-pretendard px-10 py-3 rounded-full
               shadow-[0_6px_0_#D46100] active:shadow-[0_2px_0_#D46100]
               active:translate-y-[4px] transition-all duration-200"
          >
            다른 레시피 더 알아보기
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Recipe1TutorialExplain;
