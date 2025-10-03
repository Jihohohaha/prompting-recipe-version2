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

// // Z20Layer.jsx
// import React from 'react';

// const Z20_BACKGROUND_URL = '/images/main-page/Z20Background.png'; 


// const Z20Layer = () => {
//   return (
//     <div 
//       className="
//       absolute
//       top-0 left-0 w-screen h-screen
//       z-20"
//       style={{
//         backgroundImage: `url(${Z20_BACKGROUND_URL})`, 
//         backgroundSize: 'auto 100vh',        // 이미지가 컨테이너를 꽉 채우도록
//         backgroundPosition: 'center',   // 이미지를 중앙에 정렬
//         backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
//       }}
//     >
//     </div>
//   );
// };

// export default Z20Layer;
// 




// import React from 'react';

// // 기준 해상도
// const BASE_WIDTH = 1920;
// const BASE_HEIGHT = 1080;

// // 상대 위치/크기 계산 함수
// const vw = px => `${(px / BASE_WIDTH) * 90}vw`;
// const vh = px => `${(px / BASE_HEIGHT) * 110}vh`;

// const folders = [
//   {
//     src: '/images/main-page/Folder.png',
//     width: 190, height: 190, x: 57, y: 196, opacity: 1, rotate: -32.49,
//   },
//   {
//     src: '/images/main-page/Folder.png',
//     width: 99, height: 99, x: 387, y: 387, opacity: 0.5, rotate: -19.39,
//   },
//   {
//     src: '/images/main-page/Folder.png',
//     width: 144, height: 144, x: 370, y: 823, opacity: 0.7, rotate: -8.43,
//   },
//   {
//     src: '/images/main-page/Folder.png', // 폴더2 이미지가 다르면 파일명 확인
//     width: 221, height: 221, x: 1203, y: 520, opacity: 0.7, rotate: -27.21,
//   },
//   {
//     src: '/images/main-page/Folder.png',
//     width: 143, height: 143, x: 1555, y: 755, opacity: 1, rotate: 41.34,
//   },
// ];

// const letters = [
//   {
//     text: 'E', width: 58, height: 89, x: 282, y: 306, rotate: 37.38,
//   },
//   {
//     text: 'R', width: 67, height: 89, x: 501, y: 545, rotate: 17.52,
//   },
//   {
//     text: 'E', width: 58, height: 89, x: 768, y: 890, rotate: -36.48,
//   },
//   {
//     text: 'P', width: 59, height: 89, x: 1239, y: 820, rotate: -3.76,
//   },
//   {
//     text: 'C', width: 60, height: 89, x: 1458, y: 349, rotate: 31.67,
//   },
//   {
//     text: 'I', width: 19, height: 89, x: 1655, y: 514, rotate: -3.76,
//   },
// ];

// const centerImage = {
//   src: '/images/main-page/CreateYourOwnIdea.png',
//   width: 689, height: 577, x: 615, y: 279, opacity: 1,
// };

// const fontUrl = '/fonts/116watermelon.ttf'; // 실제 경로에 맞게 수정

// const Z20Layer = () => {
//   return (
//     <div
//       className="absolute top-0 left-0 w-screen h-screen z-20 bg-transparent"
//     >
//       {/* 폴더 이미지들 */}
//       {folders.map((f, i) => (
//         <img
//           key={i}
//           src={f.src}
//           alt={`folder-${i}`}
//           style={{
//             position: 'absolute',
//             left: vw(f.x),
//             top: vh(f.y),
//             width: vw(f.width),
//             height: vh(f.height),
//             opacity: f.opacity,
//             transform: `rotate(${f.rotate}deg)`,
//             pointerEvents: 'none',
//             userSelect: 'none',
//           }}
//           draggable={false}
//         />
//       ))}

//       {/* 가운데 이미지 */}
//       <img
//         src={centerImage.src}
//         alt="center"
//         style={{
//           position: 'absolute',
//           left: vw(centerImage.x),
//           top: vh(centerImage.y),
//           width: vw(centerImage.width),
//           height: vh(centerImage.height),
//           opacity: centerImage.opacity,
//           pointerEvents: 'none',
//           userSelect: 'none',
//         }}
//         draggable={false}
//       />

//       {/* 글자 */}
//       <style>
//         {`
//         @font-face {
//           font-family: 'Watermelon';
//           src: url('${fontUrl}') format('truetype');
//           font-display: swap;
//         }
//         `}
//       </style>
//       {letters.map((l, i) => (
//         <span
//           key={i}
//           style={{
//             position: 'absolute',
//             left: vw(l.x),
//             top: vh(l.y),
//             width: vw(l.width),
//             height: vh(l.height),
//             fontFamily: 'Watermelon, sans-serif',
//             fontSize: vh(l.height),
//             lineHeight: 1,
//             transform: `rotate(${l.rotate}deg)`,
//             color: '#222',
//             pointerEvents: 'none',
//             userSelect: 'none',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontWeight: 'bold',
//             letterSpacing: 0,
//           }}
//         >
//           {l.text}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default Z20Layer;