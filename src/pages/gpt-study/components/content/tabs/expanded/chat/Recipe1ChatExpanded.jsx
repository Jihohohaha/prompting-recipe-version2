import React, { useState } from "react";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const appendMessage = (role, text) => {
    // 문자열이 아닌 객체가 들어오면 문자열로 변환
    const safeText =
      typeof text === "string" ? text : JSON.stringify(text, null, 2);
    setMessages((prev) => [...prev, { role, text: safeText }]);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    appendMessage("user", text);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat/flour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ type: "user", text }],
        }),
      });

      // FastAPI 응답 수신
      const data = await response.json();
      console.log("✅ API 응답:", data);

      // 1️⃣ 표준 구조 (FastAPI 예제)
      if (data?.success && data?.data?.text) {
        appendMessage("bot", data.data.text);
      }
      // 2️⃣ OpenAI 직접 응답 형태 (choices)
      else if (data?.choices?.[0]?.message?.content) {
        appendMessage("bot", data.choices[0].message.content);
      }
      // 3️⃣ 알 수 없는 형태 — 안전하게 JSON 문자열로 출력
      else {
        console.warn("⚠️ 예상치 못한 응답 형식:", data);
        appendMessage(
          "bot",
          "⚠️ 서버 응답 형식이 예상과 다릅니다.\n" +
            JSON.stringify(data, null, 2)
        );
      }
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error);
      appendMessage("bot", "❌ 서버 연결 오류: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  return (
    <div
      style={{
        fontFamily: "Pretendard, sans-serif",
        backgroundColor: "#f5f7fb",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        🍕 Few-Shot 튜토리얼 챗봇
      </h1>

      {/* 대화창 */}
      <div
        style={{
          width: "500px",
          height: "60vh",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#0278ED" : "#E5E5EA",
              color: msg.role === "user" ? "white" : "#111",
              borderRadius: "12px",
              padding: "10px 14px",
              margin: "6px 0",
              maxWidth: "80%",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div
        style={{
          display: "flex",
          width: "500px",
          marginTop: "15px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            backgroundColor: loading ? "#ccc" : "#0278ED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "보내기"}
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
