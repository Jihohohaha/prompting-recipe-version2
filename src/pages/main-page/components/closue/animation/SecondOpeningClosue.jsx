import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SecondOpeningClosue = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 100);

    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1600);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(closeTimer);
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
        
        {/* Closue Dom (닫혔다가 1초 후 열림) */}
        <motion.img
          src="/images/main-page/closue_dom.png"
          alt="closue-dom"
          className="absolute bottom-0 left-0 w-full"
          initial={{
            rotate: -60,
            y: 20,
          }}
          animate={isOpen ? {
            rotate: -60,
            y: 20,
          } : {
            rotate: 0,
            y: 100,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            transformOrigin: 'bottom left',
          }}
        />
      </div>
    </div>
  );
};

export default SecondOpeningClosue;