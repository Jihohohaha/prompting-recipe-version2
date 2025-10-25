import React from "react";
import { motion } from "framer-motion";
import "../../../../../../../styles/App.css";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "rolePromptingCompleted";

export default function MissionComplete() {
  const navigate = useNavigate();

  const handleGoOther = () => {
    try {
      // ✅ 영구 저장: 새로고침/재접속해도 유지
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (_) {
      // localStorage 사용 불가한 환경 대비 (무시)
    }
    navigate("/gpt-study");
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
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
      {/* 🎥 동영상 (public/videos/shining.mp4 기준) */}
      <video
        src="/videos/shining.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-12 left-3 w-full h-full object-cover"
      />

      {/* 🎬 오프닝 시네마틱 검정막 */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
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
          color: "rgba(199, 106, 45, 0.12)",
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
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1 className="z-[9999] text-[64px] font-cafe24 text-[#FF702A] font-bold drop-shadow-[0_0_15px_rgba(255,112,42,0.6)] mb-6">
          Mission Complete
        </h1>

        <div
          style={{
            maxWidth: "850px",
            lineHeight: 1.8,
            fontSize: "18px",
            color: "#fff",
            textShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: 500, marginBottom: "16px" }}>
            “나는... 조금 따뜻해진 기분이야.”
          </p>
          <p>차가운 대리석 피부에 미세한 온기가 감돌기 시작했다. 석상이는 이제 ‘역할의 레시피’를 마스터했다.</p>
          <p>그러나 아직 ‘완전한 인간’이 되려면 남은 다섯 가지 레시피를 완성해야 한다...</p>
        </div>
      </motion.div>

      {/* 하단 이미지 + 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
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

        <button
          onClick={handleGoOther}
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
    </div>
  );
}
