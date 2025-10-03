import React from "react";
import FadeScroll from "../../effects/FadeScroll";

const Z10_BACKGROUND_URL = "/images/main-page/Z10Background.png";

const Z10Layer = ({ snapScrollRef, onScrollComplete }) => {
  const snapTexts = [
    `어느 날, 단어를 재료 삼아\n현실을 만들어내는 "레시피"가 세상에 흩어졌다.`,
    `그것은 곧 프롬프팅 엔지니어링,\n언어를 다루는 비밀의 조리법이었다.`,
    `이제, 당신은 그 레시피를 배우고 익히기 위해 \n프롬프팅 레시피 아카이브에 들어왔다.`
  ];

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 z-10"
      style={{
        backgroundImage: `url(${Z10_BACKGROUND_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div 
        className="
          absolute
          w-[500px] h-[80px] top-[100px]
          left-1/2 -translate-x-1/2
          rounded-lg z-30
        "
      >
        <FadeScroll 
          ref={snapScrollRef} 
          snaps={snapTexts} 
          onScrollComplete={onScrollComplete}
        />
      </div>
    </div>
  );
};

export default Z10Layer;
