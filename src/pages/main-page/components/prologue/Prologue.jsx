import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';

import Z0Layer from './Z0Layer'; 
import Z10Layer from './Z10Layer'; 
import Z20Layer from './Z20Layer'; 
import Z30Layer from './Z30Layer'; 
import HandLight from '../../effects/HandLight';
import StartVideo from '../start-video/StartVideo';

const Prologue = ({ onComplete }) => {
  const snapScrollRef = useRef();
  const rafRef = useRef(null); // RAF throttle
  const lastUpdateRef = useRef(0); // 마지막 업데이트 시간
  const [mousePos, setMousePos] = useState(null);
  const [isHover, setIsHover] = useState(false);

  // wheel 이벤트를 SnapScroll로 전달
  const handleWheel = useCallback((e) => {
    if (snapScrollRef.current) {
      snapScrollRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    }
  }, []);

  // throttle 간격 조절 (밀리초 단위)
  const THROTTLE_MS = 150; // 16ms = 60fps, 33ms = 30fps, 50ms = 20fps 값 올리면 렉 주는 대신, Light가 끊기면서 이동

  // 최적화된 마우스 이벤트 - RAF만 사용하고 시간 기반 throttling 제거
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
      rafRef.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
    setMousePos(null); // 마우스가 벗어나면 null로 설정
  }, []);

  const [videoEnded, setVideoEnded] = useState(false);
  const [isScrollCompleted, setIsScrollCompleted] = useState(false);

  const handleScrollComplete = useCallback(() => {
    setIsScrollCompleted(true);
  }, []);

  const handleClick = useCallback(() => {
    if (videoEnded && isScrollCompleted && onComplete) {
      onComplete();
    }
  }, [videoEnded, isScrollCompleted, onComplete]);

  // HandLight 마스크 스타일을 메모이제이션으로 최적화
  const maskStyle = useMemo(() => {
    if (!isHover || !mousePos) return {};
    return HandLight({ mousePos, radius: 230 });
  }, [isHover, mousePos]);
  
  useEffect(() => {
    const t = setTimeout(() => setVideoEnded(true), 9000);
    return () => {
      clearTimeout(t);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ width: '1920px', height: '1080px' }}
    >
      <div className={videoEnded ? 'visible' : 'invisible'}>
        <Z0Layer />
        <Z10Layer snapScrollRef={snapScrollRef} onScrollComplete={handleScrollComplete} />
        <Z20Layer />
        <Z30Layer
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          maskStyle={maskStyle}
          isClickable={isScrollCompleted}
        />
      </div>
      
      {!videoEnded && (
        <div className="absolute inset-0 z-50">
          <StartVideo />
        </div>
      )}
      
      {videoEnded && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-[100] text-center">
          {!isScrollCompleted ? (
            <p className="text-xl font-bold px-6 py-3 bg-black text-white rounded-lg shadow-xl border-2 border-white">
              스크롤하여 모든 문장을 확인하세요
            </p>
          ) : (
            <p className="text-xl font-bold px-6 py-3 bg-blue-600 text-white rounded-full animate-pulse shadow-xl border-2 border-white">
              클릭하세요!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Prologue;