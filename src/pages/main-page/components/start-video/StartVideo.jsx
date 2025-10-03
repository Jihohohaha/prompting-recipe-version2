
import React from 'react';
import { getHandLightMask } from './handlightUtil';
import { centerImage, folders, letters, fontUrl, vw, vh } from './assetData';
import FlyingAsset from './FlyingAsset';
// ===== StartVideo 본체 =====
const StartVideo = ({ onFinish }) => {
  // 중앙 이미지 중심 좌표 (px)
  const centerX = centerImage.x + centerImage.width / 2;
  const centerY = centerImage.y + centerImage.height / 2;

  // 흔들림 애니메이션
  const [shake, setShake] = React.useState(false);
  // 폴더/글씨 등장 트리거
  const [showAssets, setShowAssets] = React.useState(false);
  // 애니메이션 종료 트리거
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    // 3번 흔들림: 1초 후 시작, 2초, 3초, 4초에 각각 토글
    const t1 = setTimeout(() => setShake(true), 500); // 1초 후 흔들림 시작
    const t2 = setTimeout(() => setShake(false), 1000); // 2초 후 흔들림 끝
    const t3 = setTimeout(() => setShake(true), 1500); // 3초 후 두 번째 흔들림 시작
    const t4 = setTimeout(() => setShake(false), 2000); // 4초 후 두 번째 흔들림 끝
    const t5 = setTimeout(() => setShake(true), 2500); // 5초 후 세 번째 흔들림 시작
    const t6 = setTimeout(() => setShake(false), 3000); // 6초 후 세 번째 흔들림 끝
    const t7 = setTimeout(() => setShowAssets(true), 3500); // 6초 후 자산 등장 시작
    // 8.5초 후 애니메이션 종료
    const t8 = setTimeout(() => setFinished(true), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8); };
  }, []);

  // 애니메이션 종료 시 onFinish 콜백 호출
  React.useEffect(() => {
    if (finished && typeof onFinish === 'function') {
      onFinish();
    }
  }, [finished, onFinish]);

  // 폴더/글씨 등장 시간 랜덤
  const assetDelays = React.useMemo(() => Array.from({ length: folders.length + letters.length }, (_, i) => Math.random() * 2000), []);

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-20 bg-transparent"
      style={{ overflow: 'hidden' }}
    >
      {/* 아래 레이어: F5F5F5 배경 + 중앙 이미지 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{ background: '#F5F5F5' }}
      >
        <img
          src={centerImage.src}
          alt="center"
          style={{
            position: 'absolute',
            left: vw(centerImage.x),
            top: vh(centerImage.y),
            width: vw(centerImage.width),
            height: vh(centerImage.height),
            userSelect: 'none',
            transform: shake
              ? 'translateX(-20px) rotate(-3deg)'
              : 'none',
            animation: shake
              ? 'shake-center 1s cubic-bezier(.36,.07,.19,.97) 0s 2 alternate'
              : 'none',
          }}
          draggable={false}
        />
        <style>{`
          @keyframes shake-center {
            0% { transform: translateX(0) rotate(0deg); }
            20% { transform: translateX(-20px) rotate(-3deg); }
            40% { transform: translateX(20px) rotate(3deg); }
            60% { transform: translateX(-10px) rotate(-2deg); }
            80% { transform: translateX(10px) rotate(2deg); }
            100% { transform: translateX(0) rotate(0deg); }
          }
          @font-face {
            font-family: 'Watermelon';
            src: url('${fontUrl}') format('truetype');
            font-display: swap;
          }
        `}</style>
      </div>

      {/* 위 레이어: 검정 배경 + 중앙 HandLight 마스크 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
        style={{
          background: '#000',
          ...getHandLightMask(centerX*(9/10), centerY*(11/10), 230),
        }}
      />

      {/* 폴더/글씨 튀어나오는 애니메이션 (z-30으로 올림) */}
      {showAssets && (
        <div className="absolute top-0 left-0 w-full h-full z-30">
          {folders.map((f, i) => (
            <FlyingAsset
              key={`folder-${i}`}
              asset={f}
              type="img"
              delay={assetDelays[i]}
              duration={1200 + Math.random() * 1200}
              from={{ x: centerX - f.width / 2, y: centerY - f.height / 2 }}
              to={{ x: f.x, y: f.y }}
            />
          ))}
          {letters.map((l, i) => (
            <FlyingAsset
              key={`letter-${i}`}
              asset={l}
              type="text"
              delay={assetDelays[folders.length + i]}
              duration={1200 + Math.random() * 1200}
              from={{ x: centerX - l.width / 2, y: centerY - l.height / 2 }}
              to={{ x: l.x, y: l.y }}
            >
              {l.text}
            </FlyingAsset>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartVideo;