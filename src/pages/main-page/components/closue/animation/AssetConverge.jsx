import React, { useEffect } from 'react';

const AssetConverge = ({ onFinish }) => {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), 1200);
    return () => clearTimeout(t);
  }, [onFinish]);
  return (
    <div className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none">
      {/* 여기에 실제 애니메이션 구현 */}
      <div className="w-32 h-32 bg-yellow-300 bg-opacity-30 rounded-full animate-pulse" />
    </div>
  );
};
export default AssetConverge;
