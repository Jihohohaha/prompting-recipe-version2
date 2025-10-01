import React, { useRef } from 'react';

// Z-0 레이어 (가장 아래)
import Z0Layer from './Z0Layer'; 

// Z-10 레이어 (Snap Scroll 기능)
import Z10Layer from './Z10Layer'; 

// Z-20 레이어 (이미지 배경)
import Z20Layer from './Z20Layer'; 

// Z-30 레이어 (이미지 오버레이)
import Z30Layer from './Z30Layer'; 

import HandLight from '../../effects/HandLight';

const Prologue = () => {
  // SnapScroll에 연결할 ref 생성
  const snapScrollRef = useRef();

  // wheel 이벤트를 SnapScroll로 전달
  const handleWheel = (e) => {
    if (snapScrollRef.current) {
      snapScrollRef.current.scrollBy({
        top: e.deltaY,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="relative mx-auto overflow-hidden" 
      style={{ width: '1920px', height: '1080px' }}
    >
      <Z0Layer />
      {/* SnapScroll의 ref를 Z10Layer로 전달 */}
      <Z10Layer snapScrollRef={snapScrollRef} />
      <Z20Layer />
      {/* wheel 이벤트 핸들러를 Z30Layer로 전달 */}
      <Z30Layer onWheel={handleWheel} />
      {/* <HandLight /> */}
    </div>
  );
};

export default Prologue;