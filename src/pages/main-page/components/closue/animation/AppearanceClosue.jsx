import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const AppearanceClosue = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center pb-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
        style={{ width: 'calc(60vw * 0.8)', maxWidth: '800px' }}
      >
        {/* Closue Plate (하단) */}
        <img
          src="/images/main-page/closue_plate.png"
          alt="closue-plate"
          className="w-full"
          style={{ display: 'block', transform: 'translateY(250px)' }}
        />
        
        {/* Closue Dom (plate 위에 덮음) */}
        <img
          src="/images/main-page/closue_dom.png"
          alt="closue-dom"
          className="absolute bottom-0 left-0 w-full"
          style={{ transform: 'translateY(100px)' }}
        />
      </motion.div>
    </div>
  );
};

export default AppearanceClosue;