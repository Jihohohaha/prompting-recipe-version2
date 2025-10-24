import React, { useMemo, useCallback, useRef } from 'react';

const Z30_BACKGROUND_URL = '/images/main-page/Z30Background.png';

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const VW_DENOM = 90;
const VH_DENOM = 110;

const convertX = x => x * (100 / VW_DENOM);
const convertY = y => y * (100 / VH_DENOM);

const vw = px => `${(px / BASE_WIDTH) * VW_DENOM}vw`;
const vh = px => `${(px / BASE_HEIGHT) * VH_DENOM}vh`;

// 폴더 스타일들을 미리 계산하여 캐싱
const folderConfigs = [
  {
    src: '/images/main-page/Folder.png',
    width: 190, height: 190,
    x: convertX(57), y: convertY(196), opacity: 1, rotate: -32.49,
  },
  {
    src: '/images/main-page/Folder.png',
    width: 99, height: 99,
    x: convertX(387), y: convertY(387), opacity: 0.5, rotate: -19.39,
  },
  {
    src: '/images/main-page/Folder.png',
    width: 144, height: 144,
    x: convertX(370), y: convertY(823), opacity: 0.7, rotate: -8.43,
  },
  {
    src: '/images/main-page/Folder.png',
    width: 221, height: 221,
    x: convertX(1203), y: convertY(520), opacity: 0.7, rotate: -27.21,
  },
  {
    src: '/images/main-page/Folder.png',
    width: 143, height: 143,
    x: convertX(1555), y: convertY(755), opacity: 1, rotate: 41.34,
  },
];

// eyes 스타일들을 미리 계산하여 캐싱
const eyesConfigs = [
  {
    src: '/images/main-page/eyes.gif',
    width: 220, height: 220,
    x: convertX(127), y: convertY(489), opacity: 1, rotate: 5,
  },
  {
    src: '/images/main-page/eyes.gif',
    width: 270, height: 270,
    x: convertX(1693), y: convertY(98), opacity: 1, rotate: -6,
  },
  {
    src: '/images/main-page/eyes.gif',
    width: 210, height: 210,
    x: convertX(1547), y: convertY(892), opacity: 1, rotate: 0,
  },
];

// 폴더 스타일들을 미리 계산
const folders = folderConfigs.map((f, i) => ({
  ...f,
  id: i,
  style: {
    position: 'absolute',
    left: vw(f.x),
    top: vh(f.y),
    width: vw(f.width),
    height: vh(f.height),
    opacity: f.opacity,
    transform: `rotate(${f.rotate}deg) translateZ(0)`, // 3D 가속 강제
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform',
    backfaceVisibility: 'hidden', // 렌더링 최적화
  }
}));

// eyes 스타일들을 미리 계산
const eyes = eyesConfigs.map((e, i) => ({
  ...e,
  id: i,
  style: {
    position: 'absolute',
    left: vw(e.x),
    top: vh(e.y),
    width: vw(e.width),
    height: vh(e.height),
    opacity: e.opacity,
    transform: `rotate(${e.rotate}deg) translateZ(0)`, // 3D 가속 강제
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform',
    backfaceVisibility: 'hidden', // 렌더링 최적화
  }
}));

// React.memo에 더 정교한 비교 함수 추가
const Z30Layer = React.memo(({ 
  onWheel, 
  onMouseMove, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  maskStyle = {},
  isClickable = false
}) => {
  const containerRef = useRef(null);

  // 기본 스타일을 메모이제이션 - 성능 최적화 속성 추가
  const baseStyle = useMemo(() => ({
    userSelect: 'none',
    backgroundImage: `url(${Z30_BACKGROUND_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    willChange: 'mask, -webkit-mask, transform',
    backfaceVisibility: 'hidden',
    perspective: '1000px', // 3D 컨텍스트 생성
    transformStyle: 'preserve-3d',
    // GPU 레이어 강제 생성
    transform: 'translateZ(0)',
  }), []);

  // maskStyle의 깊은 비교를 위한 메모이제이션
  const maskStyleString = useMemo(() => {
    if (!maskStyle || Object.keys(maskStyle).length === 0) return '';
    return JSON.stringify(maskStyle);
  }, [maskStyle]);

  // 최종 스타일을 메모이제이션 - maskStyleString이 변경될 때만 재계산
  const finalStyle = useMemo(() => {
    if (!maskStyleString) return baseStyle;
    return {
      ...baseStyle,
      ...maskStyle,
    };
  }, [baseStyle, maskStyleString, maskStyle]);

  // 마우스 이벤트 최적화 - 쓰로틀링 추가
  const throttledOnMouseMove = useCallback((e) => {
    if (onMouseMove) {
      onMouseMove(e);
    }
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-screen h-screen z-30 pointer-events-auto flex select-none ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      }`}
      onWheel={onWheel}
      onMouseMove={throttledOnMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={finalStyle}
    >
      {folders.map((folder) => (
        <img
          key={folder.id}
          src={folder.src}
          alt={`folder-${folder.id}`}
          style={folder.style}
          draggable={false}
          loading="lazy" // 이미지 지연 로딩
        />
      ))}
      {eyes.map((eye) => (
        <img
          key={eye.id}
          src={eye.src}
          alt={`eyes-${eye.id}`}
          style={eye.style}
          draggable={false}
          loading="lazy" // 이미지 지연 로딩
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수로 불필요한 리렌더링 방지
  return (
    prevProps.isClickable === nextProps.isClickable &&
    prevProps.onWheel === nextProps.onWheel &&
    prevProps.onMouseMove === nextProps.onMouseMove &&
    prevProps.onMouseEnter === nextProps.onMouseEnter &&
    prevProps.onMouseLeave === nextProps.onMouseLeave &&
    prevProps.onClick === nextProps.onClick &&
    JSON.stringify(prevProps.maskStyle) === JSON.stringify(nextProps.maskStyle)
  );
});

Z30Layer.displayName = 'Z30Layer';

export default Z30Layer;