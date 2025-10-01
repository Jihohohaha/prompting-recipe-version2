// Z20Layer.jsx
import React from 'react';

const Z20_BACKGROUND_URL = '/images/main-page/Z20Background.png'; 

const Z20Layer = () => {
  return (
    <div 
      className="
      absolute
      top-0 left-0 w-screen h-screen
      z-20"
      style={{
        backgroundImage: `url(${Z20_BACKGROUND_URL})`, 
        backgroundSize: 'auto 100vh',        // 이미지가 컨테이너를 꽉 채우도록
        backgroundPosition: 'center',   // 이미지를 중앙에 정렬
        backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
      }}
    >
    </div>
  );
};

export default Z20Layer;