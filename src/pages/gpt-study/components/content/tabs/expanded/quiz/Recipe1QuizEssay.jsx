// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay.jsx
import React, { useState } from "react";
import "../../../../../../../styles/App.css";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "https://artsw-ai.onrender.com";

const Recipe1QuizEssay = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="flex-1 bg-[url('/images/gpt-study/quiz/yellowbg.png')]  bg-cover bg-center flex flex-col rounded-l-3xl overflow-hidden">
        <SectionHeader />
        <Section2 />
        <Section3 />
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex-1 bg-black flex flex-col rounded-r-3xl overflow-hidden">
        <Section4 />
        <Section5 />
      </div>
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
    <div className="flex items-center justify-center gap-6 mb-12">
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
    <div className="flex flex-col items-center justify-center text-left text-[#7A4B26] font-semibold font-pretendard px-16 text-xl leading-relaxed">
      <h3 className="text-3xl font-koolegant pb-6">TIPS</h3>
      <p>
        1. 먼저, 세 가지 재료의 균형을 떠올리세요. ‘역할’만 강조하면 단순한
        지시문이 되고, ‘상황’과 ‘목적’이 빠지면 문장의 맥락이 흐려집니다. 역할을
        정한 뒤, 그 인물이 놓인 상황과 목적을 함께 설정해보세요.
      </p>
      <br />
      <p>
        2. 문장을 완성하기 전, 당신이 설정한 인물이 어떤 말투와 태도로
        대답할지를 계속 떠올려보세요. 그러면 문장 속 재료들이 자연스레
        어우러지고, 당신만의 맛이 드러날 거예요.
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

const Section5 = () => {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!recipe.trim()) {
      alert("레시피 내용을 입력해주세요! 🍳");
      return;
    }

    // 🎬 검정 화면 닫힘 시작
    setShowOverlay(true);
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

      if (gptText.trim() === "True") {
        // ✅ 검정화면 유지 중 navigate
        setTimeout(() => navigate("/complete"), 800);
      } else {
        // ❌ 실패 시
        setTimeout(() => navigate("/fail"), 800);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert("서버 요청에 실패했습니다 😢");
      setShowOverlay(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
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
          {loading ? "서버로 전송 중..." : "레시피 제출하기"}
        </button>
      </div>

      {/* 🕶️ 전체화면 시네마틱 오버레이 */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 left-0 w-screen h-screen bg-black origin-bottom z-50 flex items-center justify-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white text-2xl font-pretendard"
            >
              🎥 당신의 레시피를 평가 중입니다...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recipe1QuizEssay;
