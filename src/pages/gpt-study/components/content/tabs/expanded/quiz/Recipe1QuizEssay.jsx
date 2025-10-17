// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay.jsx
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const Recipe1QuizEssay = () => {
  return (
    <div className="bg-black rounded-3xl overflow-hidden">
      {/* Section 1: 헤더 */}
      <SectionHeader />
      
      {/* Section 2 */}
      <Section2 />
      
      {/* Section 3 */}
      <Section3 />
      
      {/* Section 4 */}
      <Section4 />
      
      {/* Section 5 */}
      <Section5 />
    </div>
  );
}

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between px-[48px] pt-[24px]">
        {/* (ROLE) */}
        <div className="font-mortend text-3xl text-white font-bold">
          ( ROLE <br /> PROMPTING )
        </div>

        {/* 너비가 긴 선 */}
        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        {/* RECIPE 1. */}
        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 px-[45px] mt-[20px]">
        <span className="block w-full h-[1.5px] bg-white"></span>
      </div>
    </>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="flex items-center justify-center text-white
     font-medium mt-[60px] py-[40px] bg-[#FE7525] rounded-2xl mx-[48px] 
     text-center text-3xl font-pretendard leading-relaxed tracking-wider">
      이번 요리는 석상이가 ‘진짜 사람’이 되기 위한 테스트예요.<br/>
      당신이 직접 주제와 역할을 정해, 나만의 Role Prompting 프롬프트를 완성해야 합니다.<br/>
      이 레시피가 완성되면, 석상이는 드디어 말하고 생각하는 존재로 깨어날 거예요.
    </div>
  );
};

// Section 3
const Section3 = () => {
  const [showHint, setShowHint] = useState(false);
  const backgroundImagePath = '/images/gpt-study/quiz/EssayMain.png';
  
  return (
    <div className="w-full px-[48px] py-[40px]">
      <div className="relative w-full mx-3">
        <img src={backgroundImagePath} alt="Section 3 Background" className="w-full h-auto" />
        
        {/* 힌트 버튼 - 이미지 위에 배치 */}
        <button
          onClick={() => setShowHint(!showHint)}
          className={`absolute bg-[#FE7525]/50 border-2 border-[#642D05] rounded-full
             px-2 py-1 text-black text-2xl font-medium transition-all ${
            showHint ? 'font-bold' : 'hover:font-bold'
          }`}
          style={{
            bottom: '80px',  // 이미지 하단에서 20px 위
            left: '50%',     // 중앙 정렬
            transform: 'translateX(-50%)'
          }}
        >
          {showHint ? (
            <span className="inline-block w-[1000px] text-center">
              "이 말은 누가, 언제, 왜 하는 걸까?"질문에 답할 수 있다면, 이미 정답에 가까워요.
            </span>
          ) : (
            '세프의 힌트 보기'
          )}
        </button>
      </div>
    </div>
  );
};

// Section 4
const Section4 = () => {
  const backgroundImagePath = '/images/gpt-study/quiz/Dialog.png';
  return (
    <div className="w-full px-[48px] pt-[20px] pb-[40px] relative z-50">
      <div className="relative w-full mx-3">
        <img src={backgroundImagePath} alt="Section 4 Background" className="w-full h-auto" />
        
        <div className="absolute inset-0 flex flex-col items-center">
          {/* Your Recipe 제목 */}
          <div className="text-5xl text-center text-[#642D05] font-pretendard font-bold tracking-widest mt-[50px]">
            Your Recipe
          </div>

          {/* Textarea */}
          <textarea 
            className="w-[80%] h-[300px] mt-[80px] p-4 bg-transparent
             border-none outline-none text-[#642D05] text-3xl text-center tracking-wider
              font-pretendard resize-none placeholder:text-[#642D05] placeholder:text-xl placeholder:font-pretendard" 
            placeholder="이제, 당신만의 레시피를 써 넣어보세요."
            style={{
              caretColor: '#642D05' // 커서 색상
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Section 5
const Section5 = () => {
  return (
    <div className="relative w-full h-[400px] px-[48px] pt-[40px] pb-[10px] z-0">
      {/* 2. Line1.png - 좌측 상단 */}
      <img 
        src="/images/gpt-study/quiz/Line1.png"
        alt="Line 1"
        className="absolute z-0"
        style={{
          left: '0',
          top: '-250px', // 조정 필요
          width: '592px',
          height: '453px'
        }}
      />
      {/* 3. Line2.png - 우측, 57.83° 회전 */}
      <img 
        src="/images/gpt-study/quiz/Line2.png"
        alt="Line 2"
        className="absolute"
        style={{
          right: '0',
          top: '-300px', // 조정 필요
          width: '728px',
          height: '573px',
          transform: 'rotate(-0.83deg)'
        }}
      />
      {/* 1. ResultButton.png - 중앙 (버튼) */}
      <button 
        className="absolute bg-transparent border-none p-0 m-0 cursor-pointer"
        style={{
          left: '58%',
          top: '0%',
          transform: 'translate(-50%, -50%)',
          width: '1314px',
          height: '695px'
        }}
      >
        <img 
          src="/images/gpt-study/quiz/ResultButton.png"
          alt="Result Button"
          className="w-full h-full"
        />
      </button>


      {/* 4. Ladle.png - ResultButton 좌측, -12.6° 회전 */}
      <img 
        src="/images/gpt-study/quiz/Ladle.png"
        alt="Ladle"
        className="absolute"
        style={{
          left: 'calc(50% - 800px)', // 조정 필요
          top: '10%',
          transform: 'translateY(-50%) rotate(-12.6deg)',
          width: '454px',
          height: '454px'
        }}
      />

      {/* 5. Fork.png - ResultButton 우측, -76.59° 회전 */}
      <img 
        src="/images/gpt-study/quiz/Fork.png"
        alt="Fork"
        className="absolute"
        style={{
          right: 'calc(60% - 800px)', // 조정 필요
          top: '70%',
          transform: 'translateY(-50%) rotate(356.59deg)',
          width: '298px',
          height: '298px'
        }}
      />
    </div>
  );
};

export default Recipe1QuizEssay;