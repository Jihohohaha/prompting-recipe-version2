import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <motion.img
          src="/images/main-page/closue_dom.png"
          alt="closue-dom"
          className="absolute bottom-0 left-0 w-full"
          initial={{
            rotate: -20,
            y: -70,
            x: 80,
          }}
          animate={{
            rotate: -20,
            y: -70,
            x: 80,
          }}
          transition={{ duration: 0 }}
          style={{
            transformOrigin: 'bottom left',
          }}
        />
      </div>
    </div>
  );
};

export default AssetConverge;