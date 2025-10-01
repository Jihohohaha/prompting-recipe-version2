// Z30Layer.jsx
import React from 'react';

const Z30_IMAGE_URL = '/images/main-page/Z30Folders.png';

const CONTENT_WIDTH = '683px';
const CONTENT_HEIGHT = '109px';
const CONTENT_TOP = '167px';

const Z30Layer = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-[1920px] h-[1080px] z-30"
      style={{
        // SVG mask를 사용하여 rounded 구멍 생성
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Crect x='${(1920 - 683) / 2}' y='167' width='683' height='109' rx='8' ry='8' fill='black'/%3E%3C/svg%3E")`,
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='white'/%3E%3Crect x='${(1920 - 683) / 2}' y='167' width='683' height='109' rx='8' ry='8' fill='black'/%3E%3C/svg%3E")`,
        maskSize: 'cover',
        WebkitMaskSize: 'cover',
      }}
    >
      {/* 검은색 배경 레이어 */}
      <div className="absolute top-0 left-0 w-full h-full bg-black" />
      
      {/* Z30Folders.png 이미지 오버레이 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={Z30_IMAGE_URL} 
          alt="Z30 Folders Overlay"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Z30Layer;