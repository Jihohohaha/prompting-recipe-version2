import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { folders, letters, centerImage, vw, vh, fontUrl } from '../../start-video/assetData';
import AppearanceClosue from '../animation/AppearanceClosue';
import FirstOpeningClosue from '../animation/FirstOpeningClosue';
import AssetConverge from '../animation/AssetConverge';
import SecondOpeningClosue from '../animation/SecondOpeningClosue';

const AssetsHandLightClosue = ({ mousePos, onAnimationComplete }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const debugStep = parseInt(urlParams.get('step')) || 0;
  
  const [step, setStep] = useState(debugStep);
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const isDebugMode = urlParams.has('step');

  useEffect(() => {
    if (!isDebugMode && !isPaused) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDebugMode, isPaused]);

  const handleNextStep = useCallback(() => {
    if (!isPaused) {
      setStep(prev => prev + 1);
    }
  }, [isPaused]);

  useEffect(() => {
    if (step === 5 && onAnimationComplete && !isPaused) {
      onAnimationComplete();
    }
  }, [step, onAnimationComplete, isPaused]);

  // HandLight mask 스타일
  const centerX = centerImage.x * (90 / 100) + (centerImage.width * 90 / 100) / 2;
  const centerY = centerImage.y * (110 / 100) + (centerImage.height * 110 / 100) / 2;
  const radius = 300;

  const finalX = mousePos?.x || (typeof window !== 'undefined' ? centerX * window.innerWidth / 100 : centerX);
  const finalY = mousePos?.y || (typeof window !== 'undefined' ? centerY * window.innerHeight / 100 : centerY);

  const showAssets = step < 4;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 디버그용 UI */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-[100] bg-white/90 p-4 rounded-lg shadow-lg border-2 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-blue-600">Debug: Step {step}</div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`ml-2 px-3 py-1 rounded font-semibold ${
                isPaused
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-yellow-500 text-white hover:bg-yellow-600'
              }`}
            >
              {isPaused ? '▶ 재생' : '⏸ 정지'}
            </button>
          </div>
          
          <div className="flex gap-2 flex-wrap max-w-[200px]">
            {[0, 1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`px-3 py-1 rounded font-semibold ${
                  step === s 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          
          {isPaused && (
            <div className="mt-2 px-2 py-1 bg-yellow-100 border border-yellow-400 rounded text-xs text-yellow-800">
              ⏸ 애니메이션 정지됨
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-600 leading-relaxed">
            <div>0: 초기상태</div>
            <div>1: Appearance (클로슈 등장)</div>
            <div>2: FirstOpen (첫 열림)</div>
            <div>3: Converge (자산 수렴)</div>
            <div>4: SecondOpen (재열림)</div>
            <div>5: Complete</div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-300 text-xs text-blue-600">
            💡 URL에 ?step=3 추가해서 바로 이동 가능
          </div>
        </div>
      )}

      {/* Z-10: 밝은 배경층 */}
      <div className="absolute inset-0 z-10 bg-[#F5F5F5]">
        {showAssets && (
          <>
            {/* 중앙 이미지 */}
            <motion.img
              key={`center-${step}`}
              src={centerImage.src}
              alt="center"
              initial={step === 3 ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
              animate={step === 3 && !isPaused ? {
                x: 'calc(30vw - 50%)',
                y: 'calc(80vh - 50%)',
                scale: 0,
                opacity: 0,
              } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                left: vw(centerImage.x),
                top: vh(centerImage.y),
                width: vw(centerImage.width),
                height: vh(centerImage.height),
              }}
              draggable={false}
            />

            {/* 폴더들 */}
            {folders.map((f, i) => (
              <motion.img
                key={`folder-${i}-${step}`}
                src={f.src}
                alt={`folder-${i}`}
                initial={step === 3 ? { x: 0, y: 0, scale: 1, opacity: f.opacity } : {}}
                animate={step === 3 && !isPaused ? {
                  x: `calc(50vw - ${vw(f.x)} - 50%)`,
                  y: `calc(50vh - ${vh(f.y)} - 50%)`,
                  scale: 0,
                  opacity: 0,
                } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.05 }}
                style={{
                  position: 'absolute',
                  left: vw(f.x),
                  top: vh(f.y),
                  width: vw(f.width),
                  height: vh(f.height),
                  opacity: f.opacity,
                  transform: `rotate(${f.rotate}deg)`,
                }}
                draggable={false}
              />
            ))}

            {/* 글씨들 */}
            <style>{`
              @font-face {
                font-family: 'Watermelon';
                src: url('${fontUrl}') format('truetype');
                font-display: swap;
              }
            `}</style>
            {letters.map((l, i) => (
              <motion.span
                key={`letter-${i}-${step}`}
                initial={step === 3 ? { x: 0, y: 0, scale: 1, opacity: 1 } : {}}
                animate={step === 3 && !isPaused ? {
                  x: `calc(50vw - ${vw(l.x)} - 50%)`,
                  y: `calc(50vh - ${vh(l.y)} - 50%)`,
                  scale: 0,
                  opacity: 0,
                } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", delay: i * 0.05 }}
                style={{
                  position: 'absolute',
                  left: vw(l.x),
                  top: vh(l.y),
                  width: vw(l.width),
                  height: vh(l.height),
                  fontFamily: 'Watermelon, sans-serif',
                  fontSize: vh(l.height),
                  transform: `rotate(${l.rotate}deg)`,
                  color: '#222',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}
              >
                {l.text}
              </motion.span>
            ))}
          </>
        )}
      </div>

      {/* Z-20: HandLight 마스킹 효과 */}
      <div 
        className="absolute inset-0 z-20 bg-black pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle ${radius}px at ${finalX}px ${finalY}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${finalX}px ${finalY}px, transparent 0%, black 100%)`,
        }}
      />

      {/* 애니메이션 단계별 오버레이 */}
      <AnimatePresence mode="wait">
        {step === 1 && !isPaused && (
          <AppearanceClosue key="appearance" onFinish={handleNextStep} />
        )}
        {step === 2 && !isPaused && (
          <FirstOpeningClosue key="first-opening" onFinish={handleNextStep} />
        )}
        {step === 3 && !isPaused && (
          <AssetConverge key="converge" onFinish={handleNextStep} />
        )}
        {step === 4 && !isPaused && (
          <SecondOpeningClosue key="second-opening" onFinish={handleNextStep} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssetsHandLightClosue;