
import React from 'react';
import { motion } from 'framer-motion';

const OpenedClosue = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Z-10: 밝은 배경층 */}
      <div className="absolute inset-0 z-10 bg-[#F5F5F5] flex items-end justify-center pb-10 pointer-events-none">
        <div className="relative" style={{ width: 'calc(60vw * 0.8)', maxWidth: '800px' }}>
          {/* Closue Plate (고정) */}
          <img
            src="/images/main-page/closue_plate.png"
            alt="closue-plate"
            className="w-full"
            style={{ display: 'block', transform: 'translateY(250px)' }}
          />
          {/* Closue Dom (열린 상태) */}
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

      {/* Z-20: 어두운 흐릿한 오버레이 */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Z-30: PRomptinG 중심이 페이지 정중앙, [RECIPE]와 서브멘트는 아래 */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* PRomptinG: 정확히 중앙 */}
          <span
            className="text-[80px] font-stretch leading-none text-white"
            style={{
              fontFamily: 'StretchPro, sans-serif',
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            PRomptinG
          </span>
        </div>
        {/* [RECIPE]와 서브 멘트: PRomptinG 아래에 절대좌표로 배치 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, 0)',
            marginTop: '90px', // PRomptinG 아래로 충분히 띄움
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <span
            className="text-[60px] font-desira leading-none text-white"
            style={{ fontFamily: 'DesiraDEMO, sans-serif', lineHeight: 1 }}
          >
            [RECIPE]
          </span>
          <div
            className="text-center text-white mt-8"
            style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '20px' }}
          >
            그것은 곧 프롬프트 엔지니어링,<br />언어를 다루는 비밀 조리법이었다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedClosue;