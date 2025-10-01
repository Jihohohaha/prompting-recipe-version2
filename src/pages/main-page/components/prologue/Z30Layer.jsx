import React from 'react';

const Z30_IMAGE_URL = '/images/main-page/Z30Folders.png';

const Z30Layer = ({ onWheel }) => {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-30 pointer-events-auto flex select-none"
      onWheel={onWheel}
      style={{ userSelect: 'none' }}
    >
      {/* 왼쪽 검정 영역 */}
      <div className="flex-1 bg-black h-full" />
      {/* 가운데 이미지 */}
      <div className="relative h-full" style={{ aspectRatio: '16/9', maxWidth: '1920px', minWidth: '0' }}>
        <img
          src={Z30_IMAGE_URL}
          alt="Z30 Folders Overlay"
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>
      {/* 오른쪽 검정 영역 */}
      <div className="flex-1 bg-black h-full" />
    </div>
  );
};

export default Z30Layer;