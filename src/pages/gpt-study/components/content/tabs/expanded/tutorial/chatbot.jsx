// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  // 채팅
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false); // 봇 타이핑 상태

  // 위치/크기
  const [position, setPosition] = useState({ x: null, y: null }); // null이면 bottom/right 고정
  const [size, setSize] = useState({ width: 500, height: 240 });

  // 상태
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(null); // "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 드래그 시 모달 내 마우스 위치

  const modalRef = useRef(null);
  const startRef = useRef({ mouseX: 0, mouseY: 0, startLeft: 0, startTop: 0, startW: 0, startH: 0 });

  const MIN_W = 320;
  const MIN_H = 160;

  const lockSelect = (on) => {
    document.body.style.userSelect = on ? "none" : "";
    document.body.style.cursor = on ? "grabbing" : "";
  };

  const ensureLeftTopMode = () => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    if (position.x === null || position.y === null) {
      setPosition({ x: rect.left, y: rect.top });
    }
  };

  // 드래그 시작 (상단 바)
  const handleDragStart = (e) => {
    if (!modalRef.current) return;
    ensureLeftTopMode();
    const rect = modalRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.nativeEvent.clientX;
    const clientY = e.clientY ?? e.nativeEvent.clientY;
    setDragging(true);
    setOffset({ x: clientX - rect.left, y: clientY - rect.top });
    lockSelect(true);
  };

  // 리사이즈 시작 (8방향)
  const handleResizeStart = (dir) => (e) => {
    if (!modalRef.current) return;
    ensureLeftTopMode();
    const rect = modalRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.nativeEvent.clientX;
    const clientY = e.clientY ?? e.nativeEvent.clientY;
    startRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startLeft: rect.left,
      startTop: rect.top,
      startW: rect.width,
      startH: rect.height,
    };
    setResizing(dir);
    lockSelect(true);
  };

  // 이동 처리 (드래그/리사이즈 공통)
  const onPointerMove = (e) => {
    if (!dragging && !resizing) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    // 뷰포트 크기
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (dragging) {
      const nextX = clientX - offset.x;
      const nextY = clientY - offset.y;
      const clampedX = Math.min(Math.max(0, nextX), vw - size.width);
      const clampedY = Math.min(Math.max(0, nextY), vh - size.height);
      setPosition({ x: clampedX, y: clampedY });
      return;
    }

    if (resizing) {
      const { mouseX, mouseY, startLeft, startTop, startW, startH } = startRef.current;
      let dx = clientX - mouseX;
      let dy = clientY - mouseY;

      let newW = startW;
      let newH = startH;
      let newLeft = startLeft;
      let newTop = startTop;

      if (resizing.includes("e")) newW = startW + dx;
      if (resizing.includes("w")) {
        newW = startW - dx;
        newLeft = startLeft + dx;
      }
      if (resizing.includes("s")) newH = startH + dy;
      if (resizing.includes("n")) {
        newH = startH - dy;
        newTop = startTop + dy;
      }

      // 크기 클램핑
      newW = Math.max(MIN_W, Math.min(newW, Math.floor(vw * 0.95)));
      newH = Math.max(MIN_H, Math.min(newH, Math.floor(vh * 0.9)));

      // 위치 클램핑
      newLeft = Math.max(0, Math.min(newLeft, vw - newW));
      newTop = Math.max(0, Math.min(newTop, vh - newH));

      setSize({ width: Math.round(newW), height: Math.round(newH) });
      setPosition({ x: Math.round(newLeft), y: Math.round(newTop) });
    }
  };

  const onPointerUp = () => {
    if (dragging) setDragging(false);
    if (resizing) setResizing(null);
    lockSelect(false);
  };

  useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, resizing, offset, size]);

  // 데모용 봇 응답 함수 (실서비스에선 교체)
  const requestBot = async (userText) => {
    // 여기를 실제 API 호출로 바꿔 사용하세요.
    // 예: const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ text:userText }) })
    //     const data = await res.json(); return data.reply;
    return new Promise((resolve) => {
      setTimeout(() => resolve(`"${userText}" 에 대한 응답이에요! 😄`), 1200);
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const text = input.trim();
    setMessages((prev) => [...prev, { text, from: "user" }]);
    setInput("");

    // 타이핑 버블 표시
    setTyping(true);
    try {
      const reply = await requestBot(text);
      setMessages((prev) => [...prev, { text: reply, from: "bot" }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { text: "오류가 발생했어요. 잠시 후 다시 시도해 주세요.", from: "bot" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const resizeCursor =
    resizing === "n" || resizing === "s" ? "ns-resize"
    : resizing === "e" || resizing === "w" ? "ew-resize"
    : resizing === "ne" || resizing === "sw" ? "nesw-resize"
    : resizing === "nw" || resizing === "se" ? "nwse-resize"
    : undefined;

  return (
    <>
      {/* 애니메이션 키프레임 (점 출렁) */}
      <style>{`
        @keyframes bobDot {
          0%, 60%, 100% { transform: translateY(0); opacity: .6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .animate-bobDot { animation: bobDot 900ms ease-in-out infinite; }
      `}</style>

      {/* FAB */}
      <button
        className="absolute bottom-[100px] right-8 z-[9999] w-12 h-12 rounded-full bg-[#FE7525] shadow-lg flex items-center justify-center text-white text-[16px] hover:bg-[#FF8C42] transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Chatbot"
      >
        Q/A
      </button>

      {/* 모달 */}
      {open && (
        <div
          ref={modalRef}
          className="fixed bg-white rounded-xl shadow-2xl flex flex-col z-[9999] border border-[#FE7525]"
          style={{
            left: position.x !== null ? position.x : undefined,
            top: position.y !== null ? position.y : undefined,
            bottom: position.y === null ? "112px" : undefined,
            right: position.x === null ? "32px" : undefined,
            width: `${size.width}px`,
            height: `${size.height}px`,
            cursor: dragging ? "grabbing" : resizeCursor || "default",
          }}
        >
          {/* 드래그 핸들(상단 바) */}
          <div
            className="px-4 py-3 border-b bg-[#FE7525] text-white font-bold rounded-t-xl cursor-move select-none"
            onPointerDown={handleDragStart}
          >
            채팅 로보트
          </div>

          {/* 메시지 */}
          <div className="flex-1 px-4 py-2 overflow-y-auto">
            {messages.length === 0 && !typing ? (
              <div className="text-gray-400 text-sm text-center mt-8">메시지를 입력해보세요!</div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`my-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <span className={`inline-block px-3 py-2 rounded-lg ${msg.from === "user" ? "bg-[#FE7525] text-white" : "bg-gray-200 text-gray-800"}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}

                {/* 타이핑 버블: 점 3개가 순차적으로 출렁 */}
                {typing && (
                  <div className="my-2 flex justify-start" aria-live="polite" aria-label="봇이 입력 중">
                    <div className="inline-flex items-center gap-1 h-5 px-3 py-2 rounded-lg bg-gray-200 text-gray-800">
                      <span className="sr-only">입력 중...</span>
                      <span className="w-2 h-2 rounded-full bg-gray-600 animate-bobDot" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-600 animate-bobDot" style={{ animationDelay: "120ms" }} />
                      <span className="w-2 h-2 rounded-full bg-gray-600 animate-bobDot" style={{ animationDelay: "240ms" }} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 입력 */}
          <div className="flex border-t p-2 bg-white rounded-b-xl">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border bg-black/80 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FE7525]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="무엇이든 물어보세요!"
              disabled={typing && !input} // 타이핑 중에도 새 입력은 허용하려면 이 줄 제거
            />
            <button
              className="ml-2 p-2 h-10 w-10 rounded-full bg-[#FE7525] text-white font-semibold hover:bg-[#FF8C42] transition-colors disabled:opacity-60"
              onClick={handleSend}
              disabled={typing && !input}
              title="전송"
            >
              {"->"}
            </button>
          </div>

          {/* ── 리사이즈 핸들 8개 (투명, 넓은 히트영역) ── */}
          {/* 모서리 */}
          <div onPointerDown={handleResizeStart("nw")} className="absolute -top-1 -left-1 w-3 h-3" style={{ cursor: "nwse-resize" }} />
          <div onPointerDown={handleResizeStart("ne")} className="absolute -top-1 -right-1 w-3 h-3" style={{ cursor: "nesw-resize" }} />
          <div onPointerDown={handleResizeStart("sw")} className="absolute -bottom-1 -left-1 w-3 h-3" style={{ cursor: "nesw-resize" }} />
          <div onPointerDown={handleResizeStart("se")} className="absolute -bottom-1 -right-1 w-3 h-3" style={{ cursor: "nwse-resize" }} />

          {/* 변 */}
          <div onPointerDown={handleResizeStart("n")} className="absolute -top-1 left-2 right-2 h-2" style={{ cursor: "ns-resize" }} />
          <div onPointerDown={handleResizeStart("s")} className="absolute -bottom-1 left-2 right-2 h-2" style={{ cursor: "ns-resize" }} />
          <div onPointerDown={handleResizeStart("w")} className="absolute top-2 bottom-2 -left-1 w-2" style={{ cursor: "ew-resize" }} />
          <div onPointerDown={handleResizeStart("e")} className="absolute top-2 bottom-2 -right-1 w-2" style={{ cursor: "ew-resize" }} />
        </div>
      )}
    </>
  );
};

export default Chatbot;
