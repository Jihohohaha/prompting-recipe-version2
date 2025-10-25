// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Recipe1QuizEssay from "./Recipe1QuizEssay";

const Recipe1QuizMultipleResult = ({ score, onRetry, onNext }) => {
  const isSuccess = score === 3;

  console.log("Result rendered:", { score, isSuccess });

  return (
    <div className="w-full">
      {isSuccess ? (
        <SuccessResult onNext={onNext} />
      ) : (
        <FailResult onRetry={onRetry} />
      )}
    </div>
  );
};

// ✅ Reference 패턴: GSAP Timeline으로 제어
const SuccessResult = ({ onNext }) => {
  const [showEssayIntro, setShowEssayIntro] = useState(false);

  const handleShowIntro = () => {
    setShowEssayIntro(true);
  };

  return (
    <div className="relative w-full">
      {!showEssayIntro ? (
        <SuccessScreen onNext={handleShowIntro} />
      ) : (
        <EssayIntroScreen onNext={onNext} />
      )}
    </div>
  );
};

const SuccessScreen = ({ onNext }) => {
  const backgroundImagePath = "/images/gpt-study/quiz/Background.png";

  return (
    <div
      className="relative w-full h-[700px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( ROLE <br /> PROMPTING )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      <video
        src="/videos/SuccessMain.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="absolute left-1/2 bottom-[120px] -translate-x-1/2 w-[600px] h-auto"
      />

      <img
        src="/images/gpt-study/quiz/WaiterStatue.png"
        alt="Waiter Statue"
        className="absolute bottom-0 left-0"
        style={{
          width: "320px",
          height: "auto",
        }}
      />

      <div className="absolute font-pretendard text-[16px] text-white text-center tracking-widest left-1/2 -translate-x-1/2 bottom-6">
        요리 마스터가 되기 위한 비밀 레시피북을 손에 넣었습니다!
        <br />
        이제 이 책을 펼쳐, 본격적으로 요리를 시작해볼까요?
      </div>

      <button
        onClick={onNext}
        className="absolute bottom-[20px] right-12 bg-[#FE7525] text-white text-xl font-pretendard px-8 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
      >
        주관식 퀴즈 풀러가기
      </button>
    </div>
  );
};

const EssayIntroScreen = ({ onNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const backgroundImagePath = "/images/gpt-study/quiz/Background.png";

  const handleOpenModal = () => {
    // 버튼의 위치 계산
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <div
        className="relative w-full h-[700px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImagePath})` }}
      >
        <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
          <div className="font-mortend text-3xl font-bold text-white">
            ( ROLE <br /> PROMPTING )
          </div>

          <div className="flex-1 mx-[20px]">
            <span className="block w-full h-[2px] bg-white"></span>
          </div>

          <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
        </div>

        <div
          className="flex items-center justify-center text-8xl font-bold
         text-white mt-32 mb-20 text-gradient-custom"
        >
          [Final Test]
        </div>

        <p
          className="flex items-center justify-center text-center
         text-2xl text-white mb-8 tracking-wider leading-loose"
        >
          이번 요리는 석상이가 '진짜 사람'이 되기 위한 테스트예요.
          <br />
          당신이 직접 주제와 역할을 정해, 나만의 Role Prompting 프롬프트를
          완성해야 합니다.
          <br />이 레시피가 완성되면, 석상이는 드디어 말하고 생각하는 존재로
          깨어날 거예요.
        </p>

        <button
          ref={buttonRef}
          onClick={handleOpenModal}
          className="absolute bottom-[20px] right-12 bg-[#FE7525] text-white text-xl font-pretendard px-8 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
        >
          주관식 퀴즈 시작하기
        </button>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 z-[100]"
              onClick={handleCloseModal}
            />
            {/* 모달 콘텐츠 */}
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.5,
              }}
              style={{
                position: "fixed",
                top: "5%",
                left: "5%",
                transform: "translate(-70%, -50%)",
              }}
              className="w-[90vw] h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              {/* X 닫기 버튼 */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-[102] w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FE7525"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Recipe1QuizEssay 컴포넌트 */}
              <div className="w-full h-full">
                <Recipe1QuizEssay onClose={handleCloseModal} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const FailResult = ({ onRetry }) => {
  const backgroundImagePath = "/images/gpt-study/quiz/Background.png";

  return (
    <div
      className="relative w-full h-[700px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( ROLE <br /> PROMPTING )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      <video
        src="/videos/FailMain.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="absolute left-1/2 bottom-[120px] -translate-x-1/2 w-[600px] h-auto"
      />

      <img
        src="/images/gpt-study/quiz/WaiterStatue.png"
        alt="Waiter Statue"
        className="absolute bottom-0 left-0"
        style={{
          width: "290px",
          height: "auto",
        }}
      />

      <div
        className="absolute ml-[-30px] font-pretendard font-bold text-xl text-white text-center tracking-widest leading-relaxed"
        style={{
          left: "27%",
          bottom: "30px",
        }}
      >
        앗, 비밀 레시피북 대신 석상이가 튀어나왔어요!
        <br />
        괜찮아요, 다시 도전하면 이번엔 진짜 레시피북이 나올지도 몰라요!
      </div>

      <button
        onClick={onRetry}
        className="absolute bottom-[30px] right-8 bg-[#FE7525] text-white text-xl font-pretendard px-12 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
      >
        다시 풀러가기
      </button>
    </div>
  );
};

export default Recipe1QuizMultipleResult;
