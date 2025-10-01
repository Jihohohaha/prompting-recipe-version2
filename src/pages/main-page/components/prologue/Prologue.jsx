// Prologue.jsx
import React from 'react';

// 이전 요청에서 만든 레이어 컴포넌트들을 임포트합니다.
// 파일 이름을 예시로 작성했으니, 실제 프로젝트 파일명에 맞게 수정해주세요.

// Z-0 레이어 (가장 아래)
import Z0Layer from './Z0Layer'; 

// Z-10 레이어 (Snap Scroll 기능)
import Z10Layer from './Z10Layer'; 

// Z-20 레이어 (이미지 배경)
import Z20Layer from './Z20Layer'; 

// Z-30 레이어 (마스크 및 이미지 오버레이)
import Z30Layer from './Z30Layer'; 

import HandLight from '../../effects/HandLight';

const Prologue = () => {
  return (
    // 1. 최상위 컨테이너: 모든 레이어를 담으며, 상대 위치(relative)를 가집니다.
    //    요청하신 1920x1080 크기로 고정합니다. 실제 환경에 따라 w-screen h-screen으로 변경될 수 있습니다.
    <div 
      className="relative mx-auto overflow-hidden" 
      style={{ width: '1920px', height: '1080px' }}
    >
      
      {/* 2. 레이어 배치 (Z-Index 순)
        
        Tailwind의 Z-Index 시스템에 따라
        Z-0 (LayerComponent) < Z-10 < Z-20 < Z-30 순서로 쌓입니다.
        모든 레이어는 absolute 위치를 가지므로, 코드 순서는 z-index가 낮은 순서대로 배치합니다.
      */}

      {/* Z-0: 검은색 div가 있는 배경 레이어 (가장 아래) */}
      <Z0Layer /> 

      {/* Z-10: Snap Scroll과 투명 테두리가 있는 레이어 */}
      <Z10Layer />

      {/* Z-20: 배경 이미지 레이어 */}
      <Z20Layer />

      {/* Z-30: 마스크 및 이미지 오버레이 레이어 (가장 위) */}
      <Z30Layer />

      <HandLight />
    </div>
  );
};

export default Prologue;