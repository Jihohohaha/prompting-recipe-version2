// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssayFailed.jsx
import React from "react";
import { motion } from "framer-motion";
import "../../../../../../../styles/App.css";
import { useNavigate } from "react-router-dom";

export default function MissionFailed() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000, #2c2c2c)",
        color: "white",
        textAlign: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Pretendard, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "60px 0",
      }}
    >
      {/* 🎬 오프닝 시네마틱 검정막 */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          transformOrigin: "bottom",
          zIndex: 50,
        }}
      />
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
          delay: 0.6,
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
            “……아직 아무런 온기도 느껴지지 않아.”
          </p>
          <p>
            차가운 대리석 피부는 여전히 생명 없는 돌처럼 굳어 있었다. 석상이는
            ‘역할의 레시피’를 완성하지 못했다.
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
          {/* 말풍선 */}

          {/* 왼쪽 버튼 */}
          <button
            onClick={() => navigate("/gpt-study")}
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
          onClick={() => navigate("/test2")}
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
}
