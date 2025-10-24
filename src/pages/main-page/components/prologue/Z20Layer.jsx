import React from 'react';

// 기준 해상도
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

// vw/vh 분모
const VW_DENOM = 90;
const VH_DENOM = 110;

// 위치 변환 함수
const convertX = x => x * (100 / VW_DENOM);
const convertY = y => y * (100 / VH_DENOM);

// 상대 위치/크기 계산 함수
const vw = px => `${(px / BASE_WIDTH) * VW_DENOM}vw`;
const vh = px => `${(px / BASE_HEIGHT) * VH_DENOM}vh`;

const folders = [
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

const statues = [
  {
    src: '/images/main-page/PlateStatue.png',
    width: 271, height: 321,
    x: convertX(127), y: convertY(489), opacity: 1, rotate: 0,
  },
  {
    src: '/images/main-page/VStatue.png',
    width: 271, height: 301,
    x: convertX(1683), y: convertY(198), opacity: 1, rotate: 0,
  },
  {
    src: '/images/main-page/SpoonStatue.png',
    width: 271, height: 301,
    x: convertX(1547), y: convertY(842), opacity: 1, rotate: 0,
  },
];

const letters = [
  {
    text: 'E', width: 58, height: 89,
    x: convertX(282), y: convertY(306), rotate: 37.38,
  },
  {
    text: 'R', width: 67, height: 89,
    x: convertX(501), y: convertY(545), rotate: 17.52,
  },
  {
    text: 'E', width: 58, height: 89,
    x: convertX(768), y: convertY(890), rotate: -36.48,
  },
  {
    text: 'P', width: 59, height: 89,
    x: convertX(1239), y: convertY(820), rotate: -3.76,
  },
  {
    text: 'C', width: 60, height: 89,
    x: convertX(1458), y: convertY(349), rotate: 31.67,
  },
  {
    text: 'I', width: 19, height: 89,
    x: convertX(1655), y: convertY(514), rotate: -3.76,
  },
];

const centerImage = {
  src: '/images/main-page/CreateYourOwnIdea.png',
  width: 689, height: 577,
  x: convertX(645), y: convertY(279), opacity: 1,
};

const fontUrl = '/fonts/116watermelon.ttf';

const Z20Layer = () => {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-20 pointer-events-none bg-transparent"
    >
      {/* 폴더 이미지들 */}
      {folders.map((f, i) => (
        <img
          key={i}
          src={f.src}
          alt={`folder-${i}`}
          style={{
            position: 'absolute',
            left: vw(f.x),
            top: vh(f.y),
            width: vw(f.width),
            height: vh(f.height),
            opacity: f.opacity,
            transform: `rotate(${f.rotate}deg)`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
      ))}

      {/* 동상 이미지들 */}
      {statues.map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt={`statue-${i}`}
          style={{
            position: 'absolute',
            left: vw(s.x),
            top: vh(s.y),
            width: vw(s.width),
            height: vh(s.height),
            opacity: s.opacity,
            transform: `rotate(${s.rotate}deg)`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />
      ))}

      {/* 가운데 이미지 */}
      <img
        src={centerImage.src}
        alt="center"
        style={{
          position: 'absolute',
          left: vw(centerImage.x),
          top: vh(centerImage.y),
          width: vw(centerImage.width),
          height: vh(centerImage.height),
          opacity: centerImage.opacity,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        draggable={false}
      />

      {/* 글자 */}
      <style>
        {`
        @font-face {
          font-family: 'Watermelon';
          src: url('${fontUrl}') format('truetype');
          font-display: swap;
        }
        `}
      </style>
      {letters.map((l, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: vw(l.x),
            top: vh(l.y),
            width: vw(l.width),
            height: vh(l.height),
            fontFamily: 'Watermelon, sans-serif',
            fontSize: vh(l.height),
            lineHeight: 1,
            transform: `rotate(${l.rotate}deg)`,
            color: '#222',
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            letterSpacing: 0,
          }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
};

export default Z20Layer;