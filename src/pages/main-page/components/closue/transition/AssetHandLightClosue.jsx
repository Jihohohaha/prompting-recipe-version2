
import React, { useEffect, useState, useCallback } from 'react';
import { folders, letters, centerImage, vw, vh, fontUrl } from '../../start-video/assetData';
import { getHandLightMask } from '../../start-video/handlightUtil';
import AppearanceClosue from '../animation/AppearanceClosue';
import AssetConverge from '../animation/AssetConverge';
import OpeningClouse from '../animation/OpeningClouse';
import OpenedClosue from '../transition/OpenedClosue';

// AssetHandLightClosue: 베이스 + 애니메이션 overlay 관리
const AssetHandLightClosue = ({ onFinish, maskCenter, maskRadius = 300 }) => {
  // handlight mask 위치: 중앙 이미지 중심
  const centerX = centerImage.x + centerImage.width / 2;
  const centerY = centerImage.y + centerImage.height / 2;
  const mask = getHandLightMask(
    maskCenter?.x ?? centerX,
    maskCenter?.y ?? centerY,
    maskRadius
  );
  // 단계: 0=Appear, 1=Converge, 2=Opening, 3=Opened
  const [step, setStep] = useState(0);
  const next = useCallback(() => setStep(s => s + 1), []);

  // Opened 단계에서 onFinish 콜백 호출
  useEffect(() => {
    if (step === 3 && typeof onFinish === 'function') {
      onFinish();
    }
  }, [step, onFinish]);

  // 베이스(폴더/글씨/중앙이미지+handlight)
  return (
    <div
      className="absolute inset-0 z-50 w-full h-full"
      style={{
        background: '#000',
        transition: 'opacity 0.7s',
        opacity: 1,
        ...mask,
      }}
    >
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <img
          src={centerImage.src}
          alt="center"
          style={{
            position: 'absolute',
            left: vw(centerImage.x),
            top: vh(centerImage.y),
            width: vw(centerImage.width),
            height: vh(centerImage.height),
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
          }}
          draggable={false}
        />
        {folders.map((f, i) => (
          <img
            key={`folder-${i}`}
            src={f.src}
            alt="folder"
            style={{
              position: 'absolute',
              left: vw(f.x),
              top: vh(f.y),
              width: vw(f.width),
              height: vh(f.height),
              opacity: f.opacity,
              transform: `rotate(${f.rotate || 0}deg)`,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 1,
            }}
            draggable={false}
          />
        ))}
        {letters.map((l, i) => (
          <span
            key={`letter-${i}`}
            style={{
              position: 'absolute',
              left: vw(l.x),
              top: vh(l.y),
              width: vw(l.width),
              height: vh(l.height),
              fontFamily: 'Watermelon, sans-serif',
              fontSize: vh(l.height),
              lineHeight: 1,
              transform: `rotate(${l.rotate || 0}deg)`,
              color: '#222',
              pointerEvents: 'none',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              letterSpacing: 0,
              zIndex: 3,
            }}
          >
            {l.text}
          </span>
        ))}
        <style>{`
          @font-face {
            font-family: 'Watermelon';
            src: url('${fontUrl}') format('truetype');
            font-display: swap;
          }
        `}</style>
      </div>
      {/* 애니메이션 overlay 단계별 */}
      {step === 0 && <AppearanceClosue onFinish={next} />}
      {step === 1 && <AssetConverge onFinish={next} />}
      {step === 2 && <OpeningClouse onFinish={next} />}
      {step === 3 && <OpenedClosue />}
    </div>
  );
};

export default AssetHandLightClosue;
