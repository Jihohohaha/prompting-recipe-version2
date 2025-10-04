import React, { useEffect } from 'react';

const OpeningClouse = ({ onFinish }) => {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), 1200);
    return () => clearTimeout(t);
  }, [onFinish]);
  return (
    <div className="absolute inset-0 z-[120] flex items-center justify-center pointer-events-none">
      {/* 여기에 실제 애니메이션 구현 */}
      <div className="w-24 h-24 bg-blue-400 bg-opacity-30 rounded-full animate-bounce" />
    </div>
  );
};
export default OpeningClouse;
