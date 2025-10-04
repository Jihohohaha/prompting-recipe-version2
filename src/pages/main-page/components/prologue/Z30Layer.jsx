import React from 'react';

const Z30_BACKGROUND_URL = '/images/main-page/Z30Background.png';

const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;
const VW_DENOM = 90;
const VH_DENOM = 110;

const convertX = x => x * (100 / VW_DENOM);
const convertY = y => y * (100 / VH_DENOM);

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

const Z30Layer = ({ 
  onWheel, 
  onMouseMove, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  maskStyle = {},
  isClickable = false 
}) => {
  return (
    <div
      className={`absolute top-0 left-0 w-screen h-screen z-30 pointer-events-auto flex select-none ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      }`}
      onWheel={onWheel}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        userSelect: 'none',
        backgroundImage: `url(${Z30_BACKGROUND_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...maskStyle,
      }}
    >
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
    </div>
  );
};

export default Z30Layer;