
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { folders, letters, centerImage, vw, vh, fontUrl } from '../../start-video/assetData';
import { centerImageRaw } from '../../start-video/assetData.js';
import AppearanceClosue from '../animation/AppearanceClosue';
import FirstOpeningClosue from '../animation/FirstOpeningClosue';
import AssetConverge from '../animation/AssetConverge';
import SecondOpeningClosue from '../animation/SecondOpeningClosue';
import HandLight from '../../../effects/HandLight';

const AssetsHandLightClosue = ({ mousePos, onAnimationComplete }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const debugStep = parseInt(urlParams.get('step')) || 0;
  const [step, setStep] = useState(debugStep);
  const [isPaused, setIsPaused] = useState(false);
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

  // 중앙 좌표 계산
  const centerX = centerImageRaw.x + centerImageRaw.width / 2;
  const centerY = centerImageRaw.y + centerImageRaw.height / 2;
  const radius = 500;
  const finalX = centerX;
  const finalY = centerY;

  // step4에서 handlight/배경 fade와 텍스트 타이밍을 분리 관리
  // handlight/배경: step4 진입 후 0.1초 뒤 사라짐 (돔 닫힘 타이밍)
  // 텍스트: step4 진입 후 1.6초 뒤 등장 (돔 열림 타이밍)
  const [handlightStep4Opacity, setHandlightStep4Opacity] = useState(1);
  const [handlightStep4BgOpacity, setHandlightStep4BgOpacity] = useState(0);
  const [showTextOnDomOpen, setShowTextOnDomOpen] = useState(false);

  useEffect(() => {
    let handlightTimer, bgTimer, textTimer;
    if (step === 4 && !isPaused) {
      // handlight/배경 fade out (돔 닫힘 타이밍: 0.1초)
      setHandlightStep4Opacity(1);
      setHandlightStep4BgOpacity(0);
      setShowTextOnDomOpen(false);
      handlightTimer = setTimeout(() => {
        setHandlightStep4Opacity(0);
        setHandlightStep4BgOpacity(1);
      }, 100); // 돔 닫힘 타이밍
      // 텍스트 등장 (돔 열림 타이밍: 1.6초)
      textTimer = setTimeout(() => {
        setShowTextOnDomOpen(true);
      }, 1600);
    } else {
      setHandlightStep4Opacity(1);
      setHandlightStep4BgOpacity(0);
      setShowTextOnDomOpen(false);
    }
    return () => {
      clearTimeout(handlightTimer);
      clearTimeout(bgTimer);
      clearTimeout(textTimer);
    };
  }, [step, isPaused]);
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
          <div className="mt-2 pt-2 border-t border-green-600 text-xs text-green-600 font-bold">
            🔒 HandLight 고정 위치: ({Math.round(finalX)}, {Math.round(finalY)})
            <br />
            📏 Radius: {radius}px
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
                x: `calc(50vw - ${vw(centerImage.x)} - ${vw(centerImage.width / 2)})`,
                y: `calc(70vh - ${vh(centerImage.y)} - ${vh(centerImage.height / 2)})`,
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
                  y: `calc(70vh - ${vh(f.y)} - 50%)`,
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
                  y: `calc(70vh - ${vh(l.y)} - 50%)`,
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

      {/* Z-20: HandLight 마스킹 효과 + 항상 검은 배경 (step4에서만 opacity 애니메이션) */}
      <div
        className="absolute inset-0 z-20 bg-black pointer-events-none"
        style={{
          maskImage: `radial-gradient(circle ${radius}px at ${finalX}px ${finalY}px, transparent 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 85%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${finalX}px ${finalY}px, transparent 0%, transparent 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 85%, black 100%)`,
          opacity: step === 4 ? handlightStep4Opacity : 1,
          transition: 'opacity 0.2s',
        }}
      />


      {/* step4에서 closue-dom이 열릴 때(SecondOpeningClosue open 타이밍)에만 텍스트 등장 */}
      {step === 4 && (
        <>
          <div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: 'black',
              opacity: handlightStep4BgOpacity,
              transition: 'opacity 0.2s',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 z-60 flex flex-col items-center justify-center w-full transition-opacity duration-800"
            style={{
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: showTextOnDomOpen ? 1 : 0,
              transition: 'opacity 0.8s',
            }}
          >
            {/* 메인 타이틀 (HeroTitle.jsx 참고, 폰트/크기/구조) */}
            <div className="flex flex-col items-center mb-10">
              <span className="text-[80px] font-stretch leading-none text-white" style={{ fontFamily: 'StretchPro, sans-serif' }}>PRomptinG</span>
              <span className="text-[80px] font-desira leading-none text-white" style={{ fontFamily: 'DesiraDEMO, sans-serif' }}>[RECIPE]</span>
            </div>
            {/* 서브 멘트 */}
            <div className="text-center text-white" style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '20px' }}>
              그것은 곧 프롬프트 엔지니어링,<br />언어를 다루는 비밀 조리법이었다.
            </div>
          </div>
        </>
      )}

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