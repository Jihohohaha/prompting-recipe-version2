import React, { useRef, useState } from 'react';

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

const Prologue = () => {
  const snapScrollRef = useRef();
  const [mousePos, setMousePos] = useState(null);
  const [isHover, setIsHover] = useState(false);

  // wheel 이벤트를 SnapScroll로 전달
  const handleWheel = (e) => {
    if (snapScrollRef.current) {
      snapScrollRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    }
  };

  // 마우스 위치 추적 및 hover 상태 관리
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  // HandLight로부터 마스크 스타일 생성
  const maskStyle = isHover && mousePos ? HandLight({ mousePos, radius: 230 }) : {};

  // StartVideo → Prologue 전환 (콜백 기반)
  const [showPrologue, setShowPrologue] = useState(false);

  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{ width: '1920px', height: '1080px' }}
    >
      {/* Prologue 본문은 항상 렌더, StartVideo만 위에 덮음 */}
      <Z0Layer />
      <Z10Layer snapScrollRef={snapScrollRef} />
      <Z20Layer />
      <Z30Layer
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        maskStyle={maskStyle}
      />
      {!showPrologue && (
        <div
          className="absolute inset-0 z-50 bg-white transition-opacity duration-700"
          style={{ pointerEvents: 'none' }}
        >
          <StartVideo onFinish={() => setShowPrologue(true)} />
        </div>
      )}
    </div>
  );
};

export default Prologue;