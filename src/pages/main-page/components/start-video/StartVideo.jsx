import React, { useEffect, useState } from 'react';

// Z20Layer와 완전히 동일한 위치/크기 변환 함수 및 값
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const VW_DENOM = 90;
const VH_DENOM = 110;
const convertX = x => x * (100 / VW_DENOM);
const convertY = y => y * (100 / VH_DENOM);
const vw = px => `${(px / BASE_WIDTH) * VW_DENOM}vw`;
const vh = px => `${(px / BASE_HEIGHT) * VH_DENOM}vh`;
const centerImage = {
  src: '/images/main-page/CreateYourOwnIdea.png',
  width: 689, // 원본 px값
  height: 577,
  x: convertX(615), // 위치만 변환
  y: convertY(279),
};

// HandLight 디자인 코드 (중앙 고정)
const getHandLightMask = (centerX, centerY, radius = 300) => {
  const mask = `radial-gradient(circle ${radius}px at ${centerX}px ${centerY}px, transparent 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 90%, black 100%)`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transition: 'mask-position 0.1s, -webkit-mask-position 0.1s',
  };
};


// 폴더/글씨 정보 (Z20Layer와 동일)
const folders = [
  { src: '/images/main-page/Folder.png', width: 190, height: 190, x: convertX(57), y: convertY(196), opacity: 1, rotate: -32.49 },
  { src: '/images/main-page/Folder.png', width: 99, height: 99, x: convertX(387), y: convertY(387), opacity: 0.5, rotate: -19.39 },
  { src: '/images/main-page/Folder.png', width: 144, height: 144, x: convertX(370), y: convertY(823), opacity: 0.7, rotate: -8.43 },
  { src: '/images/main-page/Folder.png', width: 221, height: 221, x: convertX(1203), y: convertY(520), opacity: 0.7, rotate: -27.21 },
  { src: '/images/main-page/Folder.png', width: 143, height: 143, x: convertX(1555), y: convertY(755), opacity: 1, rotate: 41.34 },
];
const letters = [
  { text: 'E', width: 58, height: 89, x: convertX(282), y: convertY(306), rotate: 37.38 },
  { text: 'R', width: 67, height: 89, x: convertX(501), y: convertY(545), rotate: 17.52 },
  { text: 'E', width: 58, height: 89, x: convertX(768), y: convertY(890), rotate: -36.48 },
  { text: 'P', width: 59, height: 89, x: convertX(1239), y: convertY(820), rotate: -3.76 },
  { text: 'C', width: 60, height: 89, x: convertX(1458), y: convertY(349), rotate: 31.67 },
  { text: 'I', width: 19, height: 89, x: convertX(1655), y: convertY(514), rotate: -3.76 },
];
const fontUrl = '/fonts/116watermelon.ttf';

// 곡선 애니메이션용 베지어 함수
function bezier(t, p0, p1, p2, p3) {
  return (
    Math.pow(1 - t, 3) * p0 +
    3 * Math.pow(1 - t, 2) * t * p1 +
    3 * (1 - t) * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  );
}

// 폴더/글씨 튀어나오는 애니메이션용 컴포넌트
const FlyingAsset = ({ asset, type, delay, duration, from, to, style, children }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    function animate(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      if (elapsed < delay) {
        setProgress(0);
        raf = requestAnimationFrame(animate);
        return;
      }
      const t = Math.min((elapsed - delay) / duration, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [delay, duration]);

  // 곡선 경로: 시작점~중간제어점~최종위치 (랜덤 곡선)
  const curveSeed = (asset.x || asset.text.charCodeAt(0)) * 0.1;
  const x = bezier(progress, from.x, from.x + (to.x - from.x) * 0.2 + 100 * Math.sin(curveSeed), to.x - 100 * Math.cos(curveSeed), to.x);
  const y = bezier(progress, from.y, from.y - 200 * Math.abs(Math.sin(curveSeed)), to.y + 100 * Math.cos(curveSeed), to.y);
  const opacity = progress;

  return type === 'img' ? (
    <img
      src={asset.src}
      alt="flying-asset"
      style={{
        position: 'absolute',
        left: vw(x),
        top: vh(y),
        width: vw(asset.width),
        height: vh(asset.height),
        opacity,
        transform: `rotate(${asset.rotate || 0}deg)` + (style?.transform ? ' ' + style.transform : ''),
        userSelect: 'none',
        transition: 'opacity 0.2s',
        ...style,
      }}
      draggable={false}
    />
  ) : (
    <span
      style={{
        position: 'absolute',
        left: vw(x),
        top: vh(y),
        width: vw(asset.width),
        height: vh(asset.height),
        fontFamily: 'Watermelon, sans-serif',
        fontSize: vh(asset.height),
        lineHeight: 1,
        transform: `rotate(${asset.rotate || 0}deg)` + (style?.transform ? ' ' + style.transform : ''),
        color: '#222',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        letterSpacing: 0,
        opacity,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const StartVideo = () => {
  // 중앙 이미지 중심 좌표 (px)
  const centerX = centerImage.x + centerImage.width / 2;
  const centerY = centerImage.y + centerImage.height / 2;

  // 흔들림 애니메이션
  const [shake, setShake] = useState(false);
  // 폴더/글씨 등장 트리거
  const [showAssets, setShowAssets] = useState(false);

  useEffect(() => {
    // 3번 흔들림: 1초 후 시작, 2초, 3초, 4초에 각각 토글
    const t1 = setTimeout(() => setShake(true), 1000); // 1초 후 흔들림 시작
    const t2 = setTimeout(() => setShake(false), 2000); // 2초 후 흔들림 끝
    const t3 = setTimeout(() => setShake(true), 3000); // 3초 후 두 번째 흔들림 시작
    const t4 = setTimeout(() => setShake(false), 4000); // 4초 후 두 번째 흔들림 끝
    const t5 = setTimeout(() => setShake(true), 5000); // 5초 후 세 번째 흔들림 시작
    const t6 = setTimeout(() => setShake(false), 6000); // 6초 후 세 번째 흔들림 끝
    const t7 = setTimeout(() => setShowAssets(true), 6000); // 6초 후 자산 등장 시작
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); };
  }, []);

  // 폴더/글씨 등장 시간 랜덤
  const assetDelays = Array.from({ length: folders.length + letters.length }, (_, i) => Math.random() * 2000);

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
          ...getHandLightMask(centerX, centerY, 300),
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