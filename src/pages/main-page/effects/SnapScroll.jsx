// SnapScroll.jsx
import React from 'react';

const SnapScroll = ({ snaps }) => {
  return (
    <div 
      className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth" // 세로 스크롤 스냅 설정
    >
      {snaps.map((text, index) => (
        <div 
          key={index} 
          className="h-full flex items-center justify-center text-center snap-center" // 각 스냅 지점
        >
          <p className="text-[#F5F5F5] text-xl font-bold px-4 leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SnapScroll;