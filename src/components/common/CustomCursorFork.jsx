// src/components/common/CustomCursorFork.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * 전역 커스텀 커서
 * - 기본: /images/cursor-fork.png
 * - 클릭 중: /images/cursor-fork-tilt.png (있으면 교체, 없으면 회전 애니메이션만)
 * - 성능: rAF로 좌표 업데이트, pointer-events: none
 */
const DEFAULT_SRC = "/images/cursor-fork.png";
const TILT_SRC = "/images/cursor-fork-tilt.png"; // 존재 안 해도 동작하도록 처리

export default function CustomCursorFork() {
  const cursorRef = useRef(null);
  const imgRef = useRef(null);
  const pressedRef = useRef(false);
  const [hasTiltImg, setHasTiltImg] = useState(true);

  // 커서 좌표를 rAF로 부드럽게 업데이트
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Tilt 이미지 존재 확인 (없으면 회전만 사용)
    const testImg = new Image();
    testImg.onload = () => setHasTiltImg(true);
    testImg.onerror = () => setHasTiltImg(false);
    testImg.src = TILT_SRC;

    // 포인터 좌표 수집
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onDown = () => {
      pressedRef.current = true;
      if (imgRef.current) {
        if (hasTiltImg) imgRef.current.src = TILT_SRC;
        cursorRef.current?.classList.add("pressed");
      }
    };

    const onUp = () => {
      pressedRef.current = false;
      if (imgRef.current) {
        imgRef.current.src = DEFAULT_SRC;
        cursorRef.current?.classList.remove("pressed");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onUp);

    // 위치 보간 애니메이션
    let rafId = 0;
    const LERP = 0.22; // 부드러움 정도
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;

      if (cursorRef.current) {
        // 포크 이미지의 고정 포인트가 손잡이 쪽이라 가정하고 offset 약간 적용
        const OFFSET_X = 12; // 포크 팁이 정확히 포인터 지점을 가리키도록 보정
        const OFFSET_Y = 12;

        cursorRef.current.style.transform =
          `translate3d(${current.current.x - OFFSET_X}px, ${current.current.y - OFFSET_Y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [hasTiltImg]);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        zIndex: 99999,
        pointerEvents: "none",
        transform: "translate3d(-100px,-100px,0)",
        transition: "transform 40ms linear",
      }}
      className="custom-fork-cursor"
    >
      <img
        ref={imgRef}
        src={DEFAULT_SRC}
        alt=""
        draggable={false}
        style={{
          display: "block",
          width: "32px",
          height: "32px",
          userSelect: "none",
          transformOrigin: "50% 50%",
          transition: "transform 120ms ease, opacity 120ms ease",
          opacity: 1,
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
        }}
      />
      <style>{`
        .custom-fork-cursor img {
          will-change: transform, opacity;
        }
        .custom-fork-cursor.pressed img {
          /* tilt 이미지가 없어도 시각적 피드백 주기 */
          transform: rotate(-16deg) scale(0.96);
        }
      `}</style>
    </div>
  );
}
