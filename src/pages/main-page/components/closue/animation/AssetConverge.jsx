import React, { useEffect } from 'react';

const AssetConverge = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center pb-10 pointer-events-none">
      <div className="relative" style={{ width: 'calc(60vw * 0.8)', maxWidth: '800px' }}>
        {/* Closue Plate (고정) */}
        <img
          src="/images/main-page/closue_plate.png"
          alt="closue-plate"
          className="w-full"
          style={{ display: 'block', transform: 'translateY(250px)' }}
        />
        
        {/* Closue Dom (열린 상태 유지) */}
        <img
          src="/images/main-page/closue_dom.png"
          alt="closue-dom"
          className="absolute bottom-0 left-0 w-full"
          style={{ 
            transform: 'rotate(-60deg) translateY(20px)',
            transformOrigin: 'bottom left',
          }}
        />
      </div>
    </div>
  );
};

export default AssetConverge;