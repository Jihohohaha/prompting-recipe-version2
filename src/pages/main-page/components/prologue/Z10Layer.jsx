// Z10Layer.jsx
import React from 'react';
import SnapScroll from '../../effects/SnapScroll'; // SnapScroll 컴포넌트 임포트

const Z10Layer = () => {
  const snapTexts = [
    `어느 날, 단어를 재료 삼아\n현실을 만들어내는 ‘레시피’가 세상에 흩어졌다.`,
    `그것은 곧 프롬프팅 엔지니어링,\n언어를 다루는 비밀의 조리법이었다.`,
    `이제, 당신은 그 레시피를 배우고 익히기 위해 \n프롬프팅 레시피 아카이브에 들어왔다.`
  ];

  return (
    <div 
      className="absolute top-0 left-0 w-[1920px] h-[1080px] flex justify-center items-start" // z-0과 동일한 전체 배경 크기, Flexbox 사용하여 내부 div 정렬
      style={{ backgroundColor: '#F5F5F5', zIndex: 10 }} // 전체 배경색, z-index 설정
    >
      {/* z-10 div: 위치와 크기는 z-0과 동일, 테두리만, 배경 투명 */}
      <div 
        className="absolute w-[683px] h-[109px] rounded-lg border-2 border-[#F5F5F5] flex items-center justify-center" // 테두리, 배경 투명, 둥근 모서리
        style={{ 
          top: '167px', // 상단 위치
          backgroundColor: 'transparent', // 배경 투명
        }}
      >
        <SnapScroll snaps={snapTexts} />
      </div>
    </div>
  );
};

export default Z10Layer;