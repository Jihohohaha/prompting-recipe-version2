import React, { useRef, useState, useCallback, useMemo } from 'react';

// Z-0 레이어 (가장 아래)
import Z0Layer from './Z0Layer'; 

// Z-10 레이어 (Snap Scroll 기능)
import Z10Layer from './Z10Layer'; 

// Z-20 레이어 (이미지 배경)
import Z20Layer from './Z20Layer'; 

// Z-30 레이어 (이미지 오버레이)
import Z30Layer from './Z30Layer'; 

import HandLight from '../../effects/HandLight';

import StartVideo from '../start-video/StartVideo';

const Prologue = ({ onComplete }) => {
  const snapScrollRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 960, y: 540 });
  const [isHover, setIsHover] = useState(true);

  // wheel 이벤트를 SnapScroll로 전달
  const handleWheel = useCallback((e) => {
    if (snapScrollRef.current) {
      snapScrollRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    }
  }, []);

  // 단순한 마우스 위치 추적 (throttling 제거)
  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isHover) setIsHover(true);
  }, [isHover]);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
    setMousePos({ x: 960, y: 540 });
  }, []);

  // StartVideo → Prologue 전환 (콜백 기반)
  const [showPrologue, setShowPrologue] = useState(false);
  // 스크롤 완료 상태 추가
  const [isScrollCompleted, setIsScrollCompleted] = useState(false);

  // 스크롤 완료 콜백
  const handleScrollComplete = useCallback(() => {
    setIsScrollCompleted(true);
  }, []);

  // 클릭 이벤트 핸들러 - 스크롤 완료 후에만 활성화
  const handleClick = useCallback(() => {
    if (showPrologue && isScrollCompleted && onComplete) {
      onComplete(); // closure로 페이지 전환
    }
  }, [showPrologue, isScrollCompleted, onComplete]);

  // HandLight 마스크 스타일 (조건 간소화)
  const maskStyle = useMemo(() => {
    return mousePos ? HandLight({ mousePos, radius: 230 }) : {};
  }, [mousePos]);
  
  React.useEffect(() => {
    if (!showPrologue) {
      const t = setTimeout(() => setShowPrologue(true), 9000);
      return () => clearTimeout(t);
    }
  }, [showPrologue]);

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ width: '1920px', height: '1080px' }}
    >
      {/* StartVideo가 끝난 후에만 레이어들 렌더링 */}
      {showPrologue && (
        <>
          <Z30Layer
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            maskStyle={maskStyle}
            isClickable={isScrollCompleted}
          />
          <Z0Layer />
          <Z10Layer snapScrollRef={snapScrollRef} onScrollComplete={handleScrollComplete} />
          <Z20Layer />
        </>
      )}
      
      {/* StartVideo는 독립적으로 실행 */}
      {!showPrologue && (
        <div className="absolute inset-0 z-50">
          <StartVideo />
        </div>
      )}
      
      {/* 클릭 안내 메시지 - 스크롤 상태에 따라 다른 메시지 표시 */}
      {showPrologue && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 text-white text-center">
          {!isScrollCompleted ? (
            <p className="text-lg opacity-70">
              스크롤하여 모든 문장을 확인하세요
            </p>
          ) : (
            <p className="text-lg opacity-90 animate-pulse cursor-pointer">
              클릭하세요
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Prologue;