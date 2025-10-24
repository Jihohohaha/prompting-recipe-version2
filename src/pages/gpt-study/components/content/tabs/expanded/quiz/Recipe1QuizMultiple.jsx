// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultiple.jsx
import { useState } from "react";

const Recipe1QuizMultiple = ({ onSubmit }) => {
  // 선택한 답변 상태 (1~4)
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
  });

  // 정답
  const correctAnswers = {
    q1: 1, // 01번
    q2: 2, // 02번 (ROLE PROMPT)
    q3: 1, // 01번
  };

  // 답변 선택 핸들러
  const handleAnswer = (question, answerNumber) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answerNumber,
    }));
  };

  // ✅ 채점 및 제출 (navigate 제거)
  const handleSubmit = () => {
    // 모든 문제에 답했는지 확인
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      alert("모든 문제에 답해주세요!");
      return;
    }

    // 채점
    let score = 0;
    if (answers.q1 === correctAnswers.q1) score++;
    if (answers.q2 === correctAnswers.q2) score++;
    if (answers.q3 === correctAnswers.q3) score++;

    console.log("📊 채점 결과:", { answers, score });

    // ✅ Reference 패턴: 즉시 전환 (콜백 호출)
    onSubmit(score);
  };

  return (
    <div className="min-h-screen bg-[url('/images/gpt-study/quiz/yellowbg.png')] bg-cover bg-center bg-no-repeat mx-auto">
      {/* Section 1: 헤더 */}
      <SectionHeader />

      {/* Section 2: 퀴즈1 */}
      <Question1
        selectedAnswer={answers.q1}
        onAnswer={(answer) => handleAnswer("q1", answer)}
      />

      {/* Section 3: 퀴즈2 */}
      <Question2
        selectedAnswer={answers.q2}
        onAnswer={(answer) => handleAnswer("q2", answer)}
      />

      {/* Section 4: 퀴즈3 */}
      <Question3
        selectedAnswer={answers.q3}
        onAnswer={(answer) => handleAnswer("q3", answer)}
      />

      {/* 결과 버튼 */}
      <ButtonResult onSubmit={handleSubmit} />
    </div>
  );
};

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
        <div className="font-mortend font-bold text-3xl text-black">
          ( ROLE <br /> PROMPTING)
        </div>
        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-black"></span>
        </div>
        <div className="font-koolegant font-bold text-4xl text-black">
          RECIPE 1.
        </div>
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
    <div className="w-full mx-auto flex flex-col items-center justify-center mt-[40px]">
      <div className="w-full py-3 bg-[#FE7525] font-bold font-pretendard text-2xl text-center font-regular mb-[32px]">
        1. 역할 지정 기법의 주된 목적은 무엇인가?
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2 py-2">
        {[
          { num: 1, text: "모델이 특정 관점을 떠올려 답하도록 유도하는 것" },
          { num: 2, text: "모델이 최신 데이터를 항상 검색하도록 하는 것" },
          { num: 3, text: "모델이 할루시네이션을 줄이도록 강제하는 것" },
          { num: 4, text: "답변을 항상 표 형식으로만 내도록 하는 것" },
        ].map((option) => (
          <button
            key={option.num}
            onClick={() => onAnswer(option.num)}
            className={`relative w-full py-5 pl-12 pr-4 border-2 border-black 
              font-pretendard text-2xl text-center font-regular transition-colors duration-300 rounded-lg
              ${
                selectedAnswer === option.num
                  ? "bg-[#FE7525]/40 text-black font-bold"
                  : "bg-white/70 text-black hover:bg-[#FE7525]/40 hover:font-bold"
              }`}
          >
            {/* ✅ 숫자 원 부분 — 3번 문제와 동일하게 */}
            <div
              className="absolute left-60 top-1/2 transform -translate-y-1/2 
                          w-10 h-10 rounded-full bg-[#FE7525]/40 text-black text-2xl font-bold 
                          flex items-center justify-center p-1"
            >
              {String(option.num).padStart(2, "0")}
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
      <div className="w-full h-[80px]" />
      <div className="w-full py-3 text-white font-pretendard text-2xl text-center bg-[#FE7525] font-bold">
        2. 다음과 같은 프롬프트를 쓰는 기법은 무엇인가?
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-3 pb-[80px]">
        <div
          className="rounded-full text-center text-black font-bold p-4 m-4 border-2 border-black
         bg-white font-pretendard text-xl px-80 m-12"
        >
          "너는 심리상담사야. 오늘 당장 할 행동 3개를 알려줘."
        </div>

        <div className="w-full h-[600px] flex flex-row flex-wrap items-stretch justify-between pt-6">
          {[
            { num: 1, img: "FewShot.png", title: "FEW\nSHOT" },
            { num: 2, img: "RolePrompt.png", title: "ROLE\nPROMPT" },
            { num: 3, img: "RAG.png", title: "R.A.G" },
            { num: 4, img: "Reflection.png", title: "REFLEC\nTION" },
          ].map((option) => (
            <button
              key={option.num}
              onClick={() => onAnswer(option.num)}
              className={`flex-1 w-1/4 rounded-xl border-2 border-black
               font-mortend text-xl text-center pb-4 px-4 pt-12 
               font-medium transition-colors duration-300 flex flex-col items-center
               ${
                 selectedAnswer === option.num
                   ? "bg-[#F7DCB6]"
                   : "bg-white hover:bg-[#F7DCB6]"
               }`}
            >
              <img
                src={`/images/gpt-study/quiz/${option.img}`}
                alt={option.title}
                className="w-96 h-96 object-contain"
              />
              <div
                className="text-[#FE7525] font-mortend text-4xl
               font-extrabold leading-tight w-full text-left ml-4 tracking-widest whitespace-pre-line"
              >
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
      <div className="w-full py-3 text-white font-pretendard text-2xl text-center bg-[#FE7525] font-bold">
        3. 역할 지정을 통해 얻을 수 있는 효과로 가장 적절한 것은?
      </div>
      <div className="w-full h-[40px]" />
      <div className="w-full flex flex-col items-center justify-center gap-2 py-2">
        {[
          {
            num: 1,
            text: "모델이 특정 직업의 시각이나 맥락을 반영한다",
          },
          {
            num: 2,
            text: "허구적 답변이 줄어든다",
          },
          {
            num: 3,
            text: "새로운 지식을 학습한다",
          },
          {
            num: 4,
            text: "모델의 실행 속도가 빨라진다",
          },
        ].map((option) => (
          <button
            key={option.num}
            onClick={() => onAnswer(option.num)}
            className={`relative w-full py-5 pl-12 pr-4 border-2 border-black 
              font-pretendard text-center font-regular transition-colors duration-300 text-2xl
              ${
                selectedAnswer === option.num
                  ? "bg-[#FE7525]/40 text-black font-bold"
                  : "bg-white/70 text-black hover:bg-[#FE7525]/40 hover:font-bold"
              }`}
            dangerouslySetInnerHTML={{
              __html: `<div class="absolute left-60 top-1/2 transform -translate-y-1/2 
                            w-10 h-10 rounded-full bg-[#FE7525]/40 text-black text-2xl font-bold 
                            flex items-center justify-center border-1 border-black p-1">
                        ${String(option.num).padStart(2, "0")}
                      </div>
                      ${option.text}`,
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
            width: "40px",
            height: "35px",
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
