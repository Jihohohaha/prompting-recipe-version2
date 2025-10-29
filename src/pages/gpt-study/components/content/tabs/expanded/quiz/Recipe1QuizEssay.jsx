// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay.jsx
import React, { useState } from "react";
import "../../../../../../../styles/App.css";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "https://artsw-ai.onrender.com";

const Recipe1QuizEssay = ({ onClose }) => {
  const [result, setResult] = useState(null); // null, 'loading', 'success', 'fail'

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="flex w-full h-full overflow-hidden relative">
      {/* 기본 화면 */}
      {!result && (
        <>
          {/* 왼쪽 영역 */}
          <div className="flex-1 bg-[url('/images/gpt-study/quiz/yellowbg.png')] bg-cover bg-center flex flex-col rounded-l-3xl overflow-hidden">
            <SectionHeader />
            <Section2 />
            <Section3 />
          </div>

          {/* 오른쪽 영역 */}
          <div className="flex-1 bg-black flex flex-col rounded-r-3xl overflow-hidden">
            <Section4 />
            <Section5 setResult={setResult} />
          </div>
        </>
      )}

      {/* 로딩 비디오 */}
      <AnimatePresence>
        {result === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black rounded-3xl"
          >
            <video
              src="/videos/result-loading.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-3xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 성공 화면 */}
      <AnimatePresence>
        {result === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20"
          >
            <MissionComplete onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 실패 화면 */}
      <AnimatePresence>
        {result === 'fail' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20"
          >
            <MissionFailed onClose={onClose} onRetry={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

//
// ---------- Section 1 ----------
const SectionHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-3">
      <img
        src="/images/gpt-study/quiz/orange_book.png"
        alt="Recipe Book Icon"
        className="w-[130x] h-[130px] mb-2"
      />
      <h2 className="text-3xl font-cafe24 text-[#7A4B26]">[Secret Recipe]</h2>
      <div className="text-[#7A4B26] font-koolegant text-3xl tracking-wider mt-6 items-center justify-center">
        INGREDIENTS
      </div>
    </div>
  );
};

//
// ---------- Section 2 ----------
const Section2 = () => {
  return (
    <div className="flex items-center justify-center gap-6 mb-2">
      {["역할 지정", "상황", "목적"].map((item, index) => (
        <div
          key={index}
          className="mb-5 px-8 bg-[#7A4B26]/[0.15] rounded-full py-2 border-2 border-[#7A4B26] text-[#7A4B26] text-xl transition-all"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

//
// ---------- Section 3 ----------
const Section3 = () => {
  return (
    <div className="flex flex-col items-center justify-center text-left text-[#7A4B26] font-semibold font-pretendard px-16 text-lg leading-relaxed">
      <h3 className="text-3xl font-koolegant pb-1">TIPS</h3>
      <p className="text-center">
        먼저, 세 가지 재료의 균형을 떠올리세요.<br />
        '역할'만 강조하면 단순한 지시문이 되고,<br/>
        '상황'과 '목적'이 빠지면 문장의 맥락이 흐려집니다.<br/> <br />
        역할을 정한 뒤, 그 인물이 놓인 상황과 목적을 함께 설정해보세요.
      </p>
      <br />
      <p className="text-center">
         문장을 완성하기 전, 당신이 설정한 인물이 <br/>
         어떤 말투와 태도로 대답할지를 계속 떠올려보세요.<br/>
         그러면 문장 속 재료들이 자연스레 어우러지고,<br/>
         당신만의 맛이 드러날 거예요.
      </p>
    </div>
  );
};

//
// ---------- Section 4 ----------
const Section4 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-black py-[20px]">
      {/* 제목 */}
      <div className="flex items-center justify-center space-x-6 mb-10">
        <img
          src="/images/gpt-study/quiz/Fork.png"
          alt="Fork Left"
          className="w-[80px] h-[80px] rotate-45"
        />
        <h2 className="text-[#FE7525] font-cafe24 text-4xl font-bold">
          [Final Mission]
        </h2>
        <img
          src="/images/gpt-study/quiz/Fork.png"
          alt="Fork Right"
          className="w-[80px] h-[80px] -rotate-45"
        />
      </div>

      {/* 미션 텍스트 */}
      <div
        className="bg-[#000000] text-[FBEAD0]/0.3 text-center font-pretendard text-[18px] leading-relaxed 
                      rounded-2xl px-10 shadow-lg font-semibold w-[80%]"
      >
        직접 자유 주제와 역할을 정해, 나만의 Role Prompting <br />
        프롬프트를 만들어보세요. 전문 직업, 특정 캐릭터, 혹은 일상 속 상황 등을
        자유롭게 설정해 당신만의 Role Prompting을 완성해보세요!
      </div>
    </div>
  );
};

const Section5 = ({ setResult }) => {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!recipe.trim()) {
      alert("레시피 내용을 입력해주세요! 🍳");
      return;
    }

    setResult('loading');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ type: "user", text: recipe }],
        }),
      });

      const data = await response.json();
      const gptText =
        data?.data?.text?.data?.text ||
        data?.data?.text ||
        "⚠️ 서버 응답 형식이 예상과 다릅니다.";
      console.log("GPT 응답:", gptText);

      // 로딩 비디오를 최소 2초는 보여주기
      setTimeout(() => {
        if (gptText.trim() === "True") {
          setResult('success');
        } else {
          setResult('fail');
        }
      }, 2000);
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert("서버 요청에 실패했습니다 😢");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* 🎨 배경 이미지 */}
      <img
        src="/images/gpt-study/quiz/linespoon.png"
        alt="Decoration Line"
        className="absolute left-0 top-[250px] w-[600px] opacity-80 z-0"
      />

      {/* 💬 메인 콘텐츠 */}
      <div
        className="relative z-10 bg-gradient-to-b from-[#FCEED2] to-[#FBE4B7] text-[#4B2E0C]
             rounded-3xl px-20 py-6 text-center shadow-xl w-[90%] h-auto flex flex-col items-center"
      >
        <h3 className="text-3xl font-mortend font-bold mb-6">Your Recipe</h3>

        <textarea
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
          placeholder="이제, 이 곳에 당신만의 레시피를 써 넣어보세요."
          className="w-[500px] h-[200px] p-6 text-[16px] font-pretendard text-[#4B2E0C]
                     bg-[#FFF8EE] rounded-2xl border-2 border-[#C49A6C]
                     placeholder:text-[#A97C50] placeholder:italic
                     focus:outline-none focus:ring-4 focus:ring-[#FE7525]/40 transition-all duration-300 mt-2
                     overflow-y-auto cute-scroll"
          style={{
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.05)",
            caretColor: "#642D05",
          }}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 bg-[#FE7525]/[0.9] hover:bg-[#FF9E4A] text-white text-xl 
                     font-pretendard font-semibold py-4 px-20 rounded-[10px]
                     border-none border-[#642D05] shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-60"
        >
          {loading ? "검사 중..." : "레시피 제출하기"}
        </button>
      </div>
    </div>
  );
};

// ========== 성공 화면 ==========
const MissionComplete = ({ onClose }) => {
  const [showBadgeOverlay, setShowBadgeOverlay] = useState(false);

  const handleNextRecipe = () => {
    // 배지 오버레이 표시
    setShowBadgeOverlay(true);

    // 1.5초 후 자동으로 onClose 실행
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000, #2c2c2c)",
        color: "white",
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Pretendard, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "60px 0",
        borderRadius: "24px",
      }}
    >
      {/* ✨ ROLE PROMPTING 배경 텍스트 */}
      <h1
        className="font-cafe24"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "12vw",
          color: "rgba(255,255,255,0.06)",
          zIndex: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        ROLE PROMPTING
      </h1>

      {/* 상단 텍스트 영역 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1 className="text-[64px] font-cafe24 text-[#FF702A] font-bold drop-shadow-[0_0_15px_rgba(255,112,42,0.6)] mb-6">
          Mission Complete!
        </h1>

        <div
          style={{
            maxWidth: "850px",
            lineHeight: 1.8,
            fontSize: "18px",
            color: "#DDD",
            textShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            "나는... 조금 따뜻해진 기분이야."
          </p>
          <p>
            차가운 대리석 피부에 미세한 온기가 감돌기 시작했다. 석상이는 이제
            '역할의 레시피'를 마스터했다.
          </p>
          <p>
            그러나 아직 '완전한 인간'이 되려면 남은 다섯 가지 레시피를 완성해야
            한다...
          </p>
        </div>
      </motion.div>

      {/* 하단 이미지 + 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* 🗿 석상 이미지 */}
        <img
          src="/images/gpt-study/quiz/statuecomplete.png"
          alt="Role Prompting Statue"
          style={{
            width: "400vw",
            objectFit: "contain",
            filter: "drop-shadow(0 0 25px rgba(255,255,255,0.1))",
            transform: "translateY(-30vh)",
          }}
        />

        {/* 버튼 */}
        <button
          onClick={handleNextRecipe}
          style={{
            position: "absolute",
            bottom: "8%",
            right: "8%",
            backgroundColor: "#FF702A",
            color: "white",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            padding: "16px 38px",
            border: "none",
            borderRadius: "40px",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.3s",
            boxShadow: "0 0 20px rgba(255, 112, 42, 0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#E9631F";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#FF702A";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          다른 레시피 학습하기
        </button>
      </motion.div>

      {/* 배지 오버레이 */}
      <AnimatePresence>
        {showBadgeOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5.5 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              borderRadius: "24px",
            }}
          >
            <motion.img
              src="/images/gpt-study/badge.png"
              alt="Achievement Badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 5.5, ease: "easeOut" }}
              style={{
                maxWidth: "400px",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ========== 실패 화면 ==========
const MissionFailed = ({ onClose, onRetry }) => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000, #2c2c2c)",
        color: "white",
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Pretendard, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "60px 0",
        borderRadius: "24px",
      }}
    >
      {/* ✨ ROLE PROMPTING 배경 텍스트 */}
      <h1
        className="font-cafe24"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "12vw",
          color: "rgba(255,255,255,0.06)",
          zIndex: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        ROLE PROMPTING
      </h1>

      {/* 상단 텍스트 영역 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1 className="text-[64px] font-cafe24 text-[#B8B8B8] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-6">
          Mission Failed
        </h1>

        <div
          style={{
            maxWidth: "850px",
            lineHeight: 1.8,
            fontSize: "18px",
            color: "#DDD",
            textShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            "……아직 아무런 온기도 느껴지지 않아."
          </p>
          <p>
            차가운 대리석 피부는 여전히 생명 없는 돌처럼 굳어 있었다. 석상이는
            '역할의 레시피'를 완성하지 못했다.
          </p>
          <p>완전한 인간이 되기까지, 아직 먼 길이 남아 있다…</p>
        </div>
      </motion.div>

      {/* 하단 이미지 + 버튼 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 8%",
          zIndex: 10,
        }}
      >
        {/* 왼쪽 교사 석상 */}
        <div style={{ position: "" }}>
          {/* 왼쪽 버튼 */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "-13px",
              marginTop: "20px",
              backgroundColor: "#FF702A",
              color: "white",
              fontFamily: "Pretendard, sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              padding: "14px 34px",
              border: "none",
              borderRadius: "40px",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.3s",
              boxShadow: "0 0 20px rgba(255, 112, 42, 0.3)",
              zIndex: 20,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#E9631F";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FF702A";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            다른 레시피 학습하기
          </button>
        </div>

        {/* 가운데 실패한 석상 */}
        <img
          src="/images/gpt-study/quiz/sadstatue.png"
          alt="Sad Statue"
          style={{
            position: "absolute",
            width: "1000px",
            left: "250px",
            top: "-600px",
            transform: "translateY(-40px)",
            filter: "drop-shadow(0 0 25px rgba(255,255,255,0.1))",
          }}
        />

        {/* 오른쪽 버튼 */}
        <button
          onClick={onRetry}
          style={{
            backgroundColor: "#FF702A",
            color: "white",
            fontFamily: "Pretendard, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            padding: "16px 40px",
            border: "none",
            borderRadius: "40px",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.3s",
            boxShadow: "0 0 20px rgba(255, 112, 42, 0.3)",
            alignSelf: "flex-end",
            marginBottom: "30px",
            zIndex: 20,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#E9631F";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#FF702A";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          다시 도전하기
        </button>
      </div>
    </div>
  );
};

export default Recipe1QuizEssay;