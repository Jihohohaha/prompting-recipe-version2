import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function GlobalBgm() {
  const audioRef = useRef(null);
  const location = useLocation();
  const shouldPlay = !location.pathname.includes("closure");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.4;

    if (shouldPlay) {
      // 재생 유지 (이전 위치에서 이어짐)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("자동 재생 차단됨:", err));
      }
    } else {
      // /closure 들어가면 일시 정지 (currentTime 유지)
      audio.pause();
    }

    return () => {
      // 언마운트 시에는 음악 정지하지 않음 (재생 이어지게)
    };
  }, [shouldPlay]);

  return (
    <audio ref={audioRef} src="/sounds/default-theme.mp3" preload="auto" />
  );
}
