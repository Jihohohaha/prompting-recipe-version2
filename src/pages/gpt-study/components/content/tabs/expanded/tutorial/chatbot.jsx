import React, { useState, useRef, useEffect } from "react";
// FAB(Chatbot) 컴포넌트
const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  // 드래그 관련 상태
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  // 드래그 시작
  const handleMouseDown = (e) => {
    setDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    document.body.style.userSelect = "none";
  };

  // 드래그 중
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: "user" }]);
    setInput("");
  };

  return (
    <>
      {/* FAB 버튼 (고정) */}
      <button
        className="absolute bottom-[100px] right-8 z-[9999] w-12 h-12 rounded-full bg-[#FE7525] shadow-lg flex items-center justify-center text-white text-[16px] hover:bg-[#FF8C42] transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Chatbot"
      >
        Q/A
      </button>

      {/* 챗봇 모달 (드래그 가능) */}
      {open && (
        <div
          ref={modalRef}
          className="fixed w-80 bg-white rounded-xl shadow-2xl border border-[#FE7525] flex flex-col z-[9999]"
          style={{
            left: position.x !== null ? position.x : undefined,
            top: position.y !== null ? position.y : undefined,
            bottom: position.y === null ? '112px' : undefined,
            right: position.x === null ? '32px' : undefined,
            cursor: dragging ? 'grabbing' : 'default',
          }}
        >
          {/* 드래그 핸들러 영역 (상단 바) */}
          <div
            className="px-4 py-3 border-b bg-[#FE7525] text-white font-bold rounded-t-xl cursor-move select-none"
            onMouseDown={handleMouseDown}
          >
            Chatbot
          </div>
          <div className="flex-1 px-4 py-2 overflow-y-auto max-h-64">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-sm text-center mt-8">메시지를 입력해보세요!</div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`my-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === "user" ? "bg-[#FE7525] text-white" : "bg-gray-200 text-gray-800"}`}>{msg.text}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex border-t p-2 bg-gray-50 rounded-b-xl">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FE7525]"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="메시지 입력..."
            />
            <button
              className="ml-2 px-4 py-2 rounded-lg bg-[#FE7525] text-white font-semibold hover:bg-[#FF8C42] transition-colors"
              onClick={handleSend}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
