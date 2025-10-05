import React from 'react';
import { motion } from 'framer-motion';

const OpenedClosue = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F5F5F5]">
      {/* 열린 클로슈 (하단) */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-10">
        <div className="relative" style={{ width: 'calc(60vw * 0.8)', maxWidth: '800px' }}>
          <img
            src="/images/main-page/closue_plate.png"
            alt="closue-plate"
            className="w-full"
            style={{ display: 'block', transform: 'translateY(250px)' }}
          />
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

      {/* 오버레이 + 서비스명 (상단) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white text-6xl font-bold"
        >
          Prompting Recipe
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default OpenedClosue;