import React, { useEffect } from 'react';

const AppearanceClosue = ({ onFinish }) => {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), 1200);
    return () => clearTimeout(t);
  }, [onFinish]);
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* 여기에 실제 애니메이션 구현 */}
      <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full animate-ping" />
    </div>
  );
};
export default AppearanceClosue;
