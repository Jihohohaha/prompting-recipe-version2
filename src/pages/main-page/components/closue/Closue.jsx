import React, { useState, useCallback } from 'react';
import AssetHandLightClosue from './transition/AssetHandLightClosue';

// Skeleton 컴포넌트 (애니메이션 단계별)
const AppearanceClosue = ({ onFinish }) => <div className="absolute inset-0 z-50 bg-black text-white flex items-center justify-center">AppearanceClosue 애니메이션 (구현 예정)<button onClick={onFinish}>다음</button></div>;
const AssetConverge = ({ onFinish }) => <div className="absolute inset-0 z-50 bg-black text-white flex items-center justify-center">AssetConverge 애니메이션 (구현 예정)<button onClick={onFinish}>다음</button></div>;
const OpeningClouse = ({ onFinish }) => <div className="absolute inset-0 z-50 bg-black text-white flex items-center justify-center">OpeningClouse 애니메이션 (구현 예정)<button onClick={onFinish}>다음</button></div>;
const OpenedClosue = () => <div className="absolute inset-0 z-50 bg-black text-white flex items-center justify-center">OpenedClosue 페이지 (구현 예정)</div>;

const Closue = () => {
  // 단계: 0=HandLight, 1=Appearance, 2=Converge, 3=Opening, 4=Opened
  const [step, setStep] = useState(0);
  const next = useCallback(() => setStep(s => s + 1), []);

  // step 4(마지막)에서만 OpenedClosue, 그 외에는 AssetHandLightClosue + overlay
  return (
    <div className="relative w-full h-screen bg-black">
      {step < 4 && <AssetHandLightClosue />}
      {step === 1 && <AppearanceClosue onFinish={next} />}
      {step === 2 && <AssetConverge onFinish={next} />}
      {step === 3 && <OpeningClouse onFinish={next} />}
      {step === 4 && <OpenedClosue />}
    </div>
  );
};

export default Closue;