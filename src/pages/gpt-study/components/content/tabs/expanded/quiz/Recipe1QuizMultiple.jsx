import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipe1QuizMultiple = () => {
  const navigate = useNavigate();
  
  // 선택한 답변 상태 (1~4)
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null
  });

  // 정답
  const correctAnswers = {
    q1: 1, // 01번
    q2: 2, // 02번 (ROLE PROMPT)
    q3: 1  // 01번
  };

  // 답변 선택 핸들러
  const handleAnswer = (question, answerNumber) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answerNumber
    }));
  };

  // 채점 및 제출
  const handleSubmit = () => {
    // 모든 문제에 답했는지 확인
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      alert('모든 문제에 답해주세요!');
      return;
    }

    // 채점
    let score = 0;
    if (answers.q1 === correctAnswers.q1) score++;
    if (answers.q2 === correctAnswers.q2) score++;
    if (answers.q3 === correctAnswers.q3) score++;

    console.log('📊 채점 결과:', { answers, score });

    // 1. 스크롤 먼저 (탭 인터페이스 아래로)
    scrollToTabInterface();

    // 2. 스크롤 완료 후 페이지 전환 (1.5초 후)
    setTimeout(() => {
      navigate(`/gpt-study/recipe1/quiz?step=result&score=${score}`);
    }, 1500);
  };

  // 탭 인터페이스 아래로 스크롤
  const scrollToTabInterface = () => {
    // Recipe1의 탭 인터페이스를 찾기 (Section.jsx에서 id 부여 필요)
    const tabElement = document.querySelector('[id^="tab-interface"]');
    
    if (tabElement) {
      // 1. 목표: 탭 인터페이스 바로 아래
      const targetTop = tabElement.offsetTop + tabElement.offsetHeight;
      
      // 2. 최대 스크롤 가능 위치
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      
      // 3. 비교 후 결정
      const finalScrollTop = Math.min(targetTop, maxScrollTop);
      
      // 4. 스크롤 실행
      window.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white">
      {/* Section 1: 헤더 */}
      <SectionHeader />
      
      {/* Section 2: 퀴즈1 */}
      <Question1 
        selectedAnswer={answers.q1}
        onAnswer={(answer) => handleAnswer('q1', answer)}
      />
      
      {/* Section 3: 퀴즈2 */}
      <Question2 
        selectedAnswer={answers.q2}
        onAnswer={(answer) => handleAnswer('q2', answer)}
      />
      
      {/* Section 4: 퀴즈3 */}
      <Question3 
        selectedAnswer={answers.q3}
        onAnswer={(answer) => handleAnswer('q3', answer)}
      />
      
      {/* 결과 버튼 */}
      <ButtonResult onSubmit={handleSubmit} />
    </div>
  );
}

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
        <div className="font-mortend text-3xl font-black">( ROLE <br /> PROMPTING)</div>
        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-black"></span>
        </div>
        <div className="font-koolegant text-4xl">RECIPE 1.</div>
      </div>
      <div className="flex-1 px-[45px] mt-[20px]">
        <span className="block w-full h-[1.5px] bg-black"></span>
      </div>
    </>
  );
};

// Section 2: Question 1
const Question1 = ({ selectedAnswer, onAnswer }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[40px]">
      <div className="w-full py-3 bg-[#FE7525] font-pretendard text-2xl text-center text-white font-medium mb-[32px]">
        1. 역할 지정 기법의 주된 목적은 무엇인가?
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {[
          { num: 1, text: "모델이 특정 관점을 떠올려 답하도록 유도하는 것" },
          { num: 2, text: "모델이 최신 데이터를 항상 검색하도록 하는 것" },
          { num: 3, text: "모델이 할루시네이션을 줄이도록 강제하는 것" },
          { num: 4, text: "답변을 항상 표 형식으로만 내도록 하는 것" }
        ].map((option) => (
          <button
            key={option.num}
            onClick={() => onAnswer(option.num)}
            className={`relative w-full py-3 pl-12 pr-4 rounded-full border-2 border-black 
              font-pretendard text-xl text-center font-medium transition-colors duration-300
              ${selectedAnswer === option.num 
                ? 'bg-[#FE7525] text-white font-bold' 
                : 'bg-white text-black hover:bg-[#FE7525] hover:text-white'
              }`}
          >
            <div className="absolute left-80 top-1/2 transform -translate-y-1/2 
                          w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                          flex items-center justify-center border-2 border-black p-1">
              {String(option.num).padStart(2, '0')}
            </div>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// Section 3: Question 2
const Question2 = ({ selectedAnswer, onAnswer }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-[40px]">
      <div className="w-full h-[80px] bg-[#FE7525]"/>
      <div className="w-full py-3 bg-white font-pretendard text-2xl text-center text-[#FE7525] font-medium">
        2. 다음과 같은 프롬프트를 쓰는 기법은 무엇인가?
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-[#FE7525] pt-6 pb-[80px]">
        <div className="rounded-full text-center text-black font-medium p-4 m-4 border-2 border-black
         bg-white font-pretendard text-xl px-80 m-12">
          "너는 심리상담사야. 오늘 당장 할 행동 3개를 알려줘."
        </div>

        <div className="w-full h-[600px] flex flex-row flex-wrap items-stretch justify-between pt-12">
          {[
            { num: 1, img: "FewShot.png", title: "FEW\nSHOT" },
            { num: 2, img: "RolePrompt.png", title: "ROLE\nPROMPT" },
            { num: 3, img: "RAG.png", title: "R.A.G" },
            { num: 4, img: "Reflection.png", title: "REFLEC\nTION" }
          ].map((option) => (
            <button
              key={option.num}
              onClick={() => onAnswer(option.num)}
              className={`flex-1 w-1/4 rounded-xl border-2 border-black
               font-mortend text-xl text-center pb-4 px-4 pt-12 
               font-medium transition-colors duration-300 flex flex-col items-center
               ${selectedAnswer === option.num
                 ? 'bg-[#F7DCB6]'
                 : 'bg-white hover:bg-[#F7DCB6]'
               }`}
            >
              <img 
                src={`/images/gpt-study/quiz/${option.img}`} 
                alt={option.title} 
                className="w-96 h-96 object-contain" 
              />
              <div className="text-[#FE7525] font-mortend text-4xl
               font-extrabold leading-tight w-full text-left ml-4 tracking-widest whitespace-pre-line">
                {option.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 4: Question 3
const Question3 = ({ selectedAnswer, onAnswer }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mb-[40px]">
      <div className="w-full py-3 bg-white font-pretendard text-2xl text-center text-[#FE7525] font-medium">
        3. 역할 지정을 통해 얻을 수 있는 효과로 가장 적절한 것은?
      </div>
      <div className="w-full h-[40px] bg-[#FE7525]"/>
      <div className="w-full flex flex-col items-center justify-center gap-2 py-2">
        {[
          { num: 1, text: "모델이 <span class='bg-white'>특정 직업</span>의 시각이나 맥락을 반영한다" },
          { num: 2, text: "<span class='bg-white'>불필요한 허구적 답변</span>이 줄어든다" },
          { num: 3, text: "<span class='bg-white'>새로운 지식</span>을 학습한다" },
          { num: 4, text: "모델의 <span class='bg-white'>실행 속도</span>가 빨라진다" }
        ].map((option) => (
          <button
            key={option.num}
            onClick={() => onAnswer(option.num)}
            className={`relative w-full py-5 pl-12 pr-4 border-2 border-black 
              font-pretendard text-xl text-center font-medium transition-colors duration-300
              ${selectedAnswer === option.num
                ? 'bg-white text-black font-bold'
                : 'bg-[#FE7525] text-black hover:bg-white hover:font-bold'
              }`}
            dangerouslySetInnerHTML={{ 
              __html: `<div class="absolute left-80 top-1/2 transform -translate-y-1/2 
                            w-10 h-10 rounded-full bg-white text-black text-xl font-bold 
                            flex items-center justify-center border-1 border-black p-1">
                        ${String(option.num).padStart(2, '0')}
                      </div>
                      ${option.text}` 
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Section 5: 결과 버튼
const ButtonResult = ({ onSubmit }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pb-6">
      <div className="w-full flex flex-col items-center">
        <img
          src="/images/gpt-study/quiz/Triangle.png"
          alt="Triangle"
          style={{
            width: '40px',
            height: '35px'
          }}
        />
        
        <button
          onClick={onSubmit}
          className="w-full bg-[#FF9E4A] border-2 border-black text-black mt-2 py-4 px-96 text-3xl font-medium font-pretendard hover:bg-[#FE7525] transition-colors"
        >
          퀴즈 결과 확인하기
        </button>
      </div>
    </div>
  );
};

export default Recipe1QuizMultiple;