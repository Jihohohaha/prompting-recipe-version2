// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultiple.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";


const Recipe1QuizMultiple = () => {
  return (
    <div className="bg-white">
        {/* Section 1: 헤더 */}
        <SectionHeader />
        {/* Section 2: 퀴즈1 */}
        <Question1 />
        {/* Section 3: 퀴즈2 */}
        <Question2 />
        {/*section 4: 퀴즈3 */}
        <Question3 />
        {/* 결과 버튼 */}
        <ButtonResult />
    </div>
  );
}

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <>
        <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
        {/* (ROLE) */}
        <div className="font-mortend text-3xl font-black">( ROLE <br /> PROMPTING)</div>

        {/* 너비가 긴 선 */}
        <div className="flex-1 mx-[20px]">
            <span className="block w-full h-[2px] bg-black"></span>
        </div>

        {/* RECIPE 1. */}
        <div className="font-koolegant text-4xl">RECIPE 1.</div>
        </div>

        {/* 너비가 긴 선 */}
        <div className="flex-1 px-[45px] mt-[20px]">
            <span className="block w-full h-[1.5px] bg-black"></span>
        </div>
    </>
  );
};

// Section 2: Question 1
const Question1 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[40px]">
        {/* Question */}
        <div className="w-full py-3 bg-[#FE7525] font-pretendard text-2xl text-center text-white font-medium mb-[32px]">
            1. 역할 지정 기법의 주된 목적은 무엇인가?
        </div>
        {/* Choices */}
        <div className="w-full flex flex-col items-center justify-center gap-2">
            <button className="relative w-full py-3 pl-12 pr-4 bg-white rounded-full border-2 border-black font-pretendard text-xl text-center text-black font-medium hover:bg-[#FE7525] hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-2 border-black p-1">
                    01
                </div>
                모델이 특정 관점을 떠올려 답하도록 유도하는 것
            </button>
            <button className="relative w-full py-3 pl-12 pr-4 bg-white rounded-full border-2 border-black font-pretendard text-xl text-center text-black font-medium hover:bg-[#FE7525] hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-2 border-black p-1">
                    02
                </div>
                모델이 최신 데이터를 항상 검색하도록 하는 것
            </button>
            <button className="relative w-full py-3 pl-12 pr-4 bg-white rounded-full border-2 border-black font-pretendard text-xl text-center text-black font-medium hover:bg-[#FE7525] hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-2 border-black p-1">
                    03
                </div>
                모델이 할루시네이션을 줄이도록 강제하는 것
            </button>
            <button className="relative w-full py-3 pl-12 pr-4 bg-white rounded-full border-2 border-black font-pretendard text-xl text-center text-black font-medium hover:bg-[#FE7525] hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-2 border-black p-1">
                    04
                </div>
                답변을 항상 표 형식으로만 내도록 하는 것
            </button>
        </div>
    </div>
    );
};
// Section 3: Question 2
const Question2 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[40px]">
        
        <div className="w-full h-[80px] bg-[#FE7525]"/>

        {/* Question */}
        <div className="w-full py-3 bg-white font-pretendard text-2xl text-center text-[#FE7525] font-medium">
          2. 다음과 같은 프롬프트를 쓰는 기법은 무엇인가?
        </div>
        {/* Choices */}
        <div className="w-full flex flex-col items-center justify-center bg-[#FE7525] pt-6 pb-[80px]">
            <div className="rounded-full text-center text-black font-medium p-4 m-4 border-2 border-black
             bg-white font-pretendard text-xl px-80 m-12">
               "너는 심리상담사야. 오늘 당장 할 행동 3개를 알려줘."
            </div>

            {/* 변경: 버튼들이 가로로 꽉 차게 flex-1 적용, 작은 화면에서 줄바꿈되도록 flex-wrap 및 min-w 지정 */}
            <div className="w-full h-[600px] flex flex-row flex-wrap items-stretch justify-between pt-12">
                <button className="flex-1 w-1/4 bg-white rounded-xl border-2 border-black
                 font-mortend text-xl text-center text-[#FE7525] pb-4 px-4 pt-12 
                 font-medium hover:bg-[#F7DCB6] transition-colors duration-300 flex flex-col items-center">
                    <img src="/images/gpt-study/quiz/FewShot.png" alt="FewShot" className="w-96 h-96 object-contain" />
                    <div className="text-[#FE7525] font-mortend text-4xl
                     font-extrabold leading-tight w-full text-left ml-4 tracking-widest">
                        FEW<br/>SHOT
                    </div>
                </button>

                <button className="flex-1 w-1/4 bg-white rounded-xl border-2 border-black
                 font-mortend text-xl text-center text-[#FE7525] pb-4 px-4 pt-12
                 font-medium hover:bg-[#F7DCB6] transition-colors duration-300 flex flex-col items-center">
                    <img src="/images/gpt-study/quiz/RolePrompt.png" alt="RolePrompt" className="w-96 h-96 object-contain" />
                    <div className="text-[#FE7525] font-mortend text-4xl font-extrabold leading-tight w-full text-left ml-4 tracking-widest">
                        ROLE<br/>PROMPT
                    </div>
                </button>

                <button className="flex-1 w-1/4 bg-white rounded-xl border-2 border-black
                 font-mortend text-xl text-center text-[#FE7525] pb-4 px-4 pt-12
                 font-medium hover:bg-[#F7DCB6] transition-colors duration-300 flex flex-col items-center">
                    <img src="/images/gpt-study/quiz/RAG.png" alt="RAG" className="w-96 h-96 object-contain" />
                    <div className="text-[#FE7525] font-mortend text-4xl font-extrabold leading-tight w-full text-left ml-4 tracking-widest">
                        R.A.G
                    </div>
                </button>

                <button className="flex-1 w-1/4 bg-white rounded-xl border-2 border-black
                 font-mortend text-xl text-center text-[#FE7525] pb-4 px-4 pt-12
                 font-medium hover:bg-[#F7DCB6] transition-colors duration-300 flex flex-col items-center">
                    <img src="/images/gpt-study/quiz/Reflection.png" alt="Reflection" className="w-96 h-96 object-contain" />
                    <div className="text-[#FE7525] font-mortend text-4xl font-extrabold leading-tight w-full text-left ml-4 tracking-widest">
                        REFLEC<br/>TION
                    </div>
                </button>
            </div>
        </div>
    </div>
    );
};
// Section 4: Question 3
const Question3 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-[40px]">
        {/* Question */}
        <div className="w-full py-3 bg-white font-pretendard text-2xl text-center text-[#FE7525] font-medium">
            3. 역할 지정을 통해 얻을 수 있는 효과로 가장 적절한 것은?
        </div>
        <div className="w-full h-[40px] bg-[#FE7525]"/>
        {/* Choices */}
        <div className="w-full flex flex-col items-center justify-center gap-2 py-2">
            <button className="relative w-full py-5 pl-12 pr-4 bg-[#FE7525]
             border-2 border-black font-pretendard
             text-xl text-center text-black font-medium
              hover:bg-white hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-1 border-black p-1">
                    01
                </div>
                모델이 <span className="bg-white">특정 직업</span>의 시각이나 맥락을 반영한다
            </button>
            <button className="relative w-full py-5 pl-12 pr-4 bg-[#FE7525]
             border-2 border-black font-pretendard
             text-xl text-center text-black font-medium
              hover:bg-white hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-1 border-black p-1">
                    02
                </div>
                <span className="bg-white">불필요한 허구적 답변</span>이 줄어든다
            </button>
            <button className="relative w-full py-5 pl-12 pr-4 bg-[#FE7525]
             border-2 border-black font-pretendard
             text-xl text-center text-black font-medium
              hover:bg-white hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-1 border-black p-1">
                    03
                </div>
                <span className="bg-white">새로운 지식</span>을 학습한다
            </button>
            <button className="relative w-full py-5 pl-12 pr-4 bg-[#FE7525]
             border-2 border-black font-pretendard
             text-xl text-center text-black font-medium
              hover:bg-white hover:font-bold transition-colors duration-1000">
                <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                                w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                                flex items-center justify-center border-1 border-black p-1">
                    04
                </div>
                모델의 <span className="bg-white">실행 속도</span>가 빨라진다
            </button>
        </div>
    </div>
  );
};
// Section 5: 결과 버튼
const ButtonResult = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pb-6">
      {/* 버튼 영역 */}
      <div className="w-full flex flex-col items-center">
        {/* Triangle 이미지 */}
        <img
          src="/images/gpt-study/quiz/Triangle.png"
          alt="Triangle"
          style={{
            width: '40px',
            height: '35px'
          }}
        />
        
        {/* Tutorial 접기 버튼 */}
        <button
          className="w-full bg-[#FF9E4A] border-2 border-black text-black mt-2 py-4 px-96 text-3xl font-medium font-pretendard"
        >
          퀴즈 결과 확인하기
        </button>
      </div>
    </div>
  );
};


export default Recipe1QuizMultiple;