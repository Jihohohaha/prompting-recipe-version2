// Z20Layer.jsx
import React from 'react';

const Z20_BACKGROUND_URL = '/images/main-page/Z20Background.png'; 

const Z20Layer = () => {
  return (
    // 1. 전체 배경 컨테이너 (1920x1080, z-20)
    <div 
      className="absolute top-0 left-0 w-[1920px] h-[1080px] z-20"
      style={{
        // 2. 인라인 스타일로 배경 이미지와 속성을 지정합니다.
        // public 폴더 경로는 빌드 시 최상위 폴더(루트)로 처리됩니다.
        backgroundImage: `url(${Z20_BACKGROUND_URL})`, 
        backgroundSize: 'cover',        // 이미지가 컨테이너를 꽉 채우도록
        backgroundPosition: 'center',   // 이미지를 중앙에 정렬
        backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
      }}
    >
      {/* 이 레이어는 투명 배경 이미지만 표시하며, 콘텐츠는 포함하지 않습니다. */}
    </div>
  );
};

export default Z20Layer;