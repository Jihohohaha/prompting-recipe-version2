import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FirstOpeningClosue = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
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
        
        {/* Closue Dom (좌측 하단 힌지로 열림 + 위로 올라감) */}
        <motion.img
          src="/images/main-page/closue_dom.png"
          alt="closue-dom"
          className="absolute bottom-0 left-0 w-full"
          initial={{
            rotate: 0,
            y: 100,
          }}
          animate={isOpen ? {
            rotate: -60,
            y: 20,
          } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            transformOrigin: 'bottom left',
          }}
        />
      </div>
    </div>
  );
};

export default FirstOpeningClosue;