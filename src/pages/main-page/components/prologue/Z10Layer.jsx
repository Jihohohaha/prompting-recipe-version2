import React from 'react';
import FadeScroll from '../../effects/FadeScroll';

const Z10Layer = ({ snapScrollRef }) => {
  const snapTexts = [
    `어느 날, 단어를 재료 삼아\n현실을 만들어내는 ‘레시피’가 세상에 흩어졌다.`,
    `그것은 곧 프롬프팅 엔지니어링,\n언어를 다루는 비밀의 조리법이었다.`,
    `이제, 당신은 그 레시피를 배우고 익히기 위해 \n프롬프팅 레시피 아카이브에 들어왔다.`
  ];

  // 마스킹은 배경 div에만 적용
  const maskStyle = {
    WebkitMaskImage: `
      linear-gradient(to bottom, black 0 100px, transparent 100px 180px, black 180px 100%),
      linear-gradient(to right, black 0 calc(50% - 250px), transparent calc(50% - 250px) calc(50% + 250px), black calc(50% + 250px) 100%)
    `,
    maskImage: `
      linear-gradient(to bottom, black 0 100px, transparent 100px 180px, black 180px 100%),
      linear-gradient(to right, black 0 calc(50% - 250px), transparent calc(50% - 250px) calc(50% + 250px), black calc(50% + 250px) 100%)
    `,
    WebkitMaskComposite: 'intersect',
    maskComposite: 'intersect'
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-10">
      {/* 마스킹된 배경만 따로 */}
      <div
        className="absolute w-full h-full bg-[#f5f5f5]"
        style={maskStyle}
      />
      {/* 투명 마스킹 위치에 빨간 테두리 */}
      <div
        className="
          absolute
          w-[500px] h-[80px]
          top-[100px] left-1/2 -translate-x-1/2
          rounded-lg
          pointer-events-none
          z-20
        "
      />
      {/* FadeScroll은 마스킹 영향 밖에서 렌더링 */}
      <div 
        className="
          absolute
          w-[500px] h-[80px] top-[100px]
          left-1/2 -translate-x-1/2
          rounded-lg z-30
        "
      >
        <FadeScroll ref={snapScrollRef} snaps={snapTexts} />
      </div>
    </div>
  );
};

export default Z10Layer;