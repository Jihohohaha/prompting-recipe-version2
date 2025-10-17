// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe1TutorialExample.jsx
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useGPTStudyStore from "../../../../../store";
import { useState, useEffect } from "react";

const Recipe1TutorialExample = ({ recipeId, index }) => {
  return (
    <div className="bg-white rounded-3xl">
      {/* Section 1 */}
      <FadeSection>
        <Section1 />
      </FadeSection>

      {/* Section 2 */}
      <FadeSection>
        <Section2 />
      </FadeSection>

      {/* Section 3 */}
      <FadeSection>
        <Section3 />
      </FadeSection>

      {/* Section 4 */}
      <FadeSection>
        <Section4 />
      </FadeSection>

      {/* Section 5 */}
      <FadeSection>
        <Section5 />
      </FadeSection>

      {/* Section 6 */}
      <FadeSection>
        <Section6 />
      </FadeSection>

      {/* Section 7 */}
      <FadeSection>
        <Section7 />
      </FadeSection>

      {/* Section 8 */}
      <FadeSection>
        <Section8 />
      </FadeSection>

      {/* Section 9 */}
      <FadeSection>
        <Section9 />
      </FadeSection>

      {/* Section 10 */}
      <FadeSection>
        <Section10 />
      </FadeSection>

      {/* Section 11 */}
      <FadeSection>
        <Section11 />
      </FadeSection>

      {/* Section 12 - 버튼 포함 */}
      <FadeSection>
        <Section12 />
      </FadeSection>

      {/* Section 13 */}
      <FadeSection>
        <Section13 recipeId={recipeId} index={index} />
      </FadeSection>
    </div>
  );
};

// Fade Section Wrapper
const FadeSection = ({ children }) => {
  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
};

// Section 1
const Section1 = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-[#FE7525] rounded-b-full w-[1200px] h-[400px] pt-16">
        <div className="text-center text-5xl font-pretendard leading-loose font-semibold">
          <p>삼각형 넓이 공식은 밑변 x 높이 ÷ 2야.</p>
          <p>그래서 6 x 4 ÷ 2 = 12. </p>
          <p>따라서 정답은 12란다.</p>
        </div>
      </div>
    </div>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="pt-[100px] w-full flex items-center justify-center">
      <img
        src="/images/gpt-study/role/teacher.png"
        alt="선생석상"
        style={{
          left: "0px",
          top: "0px",
          width: "1077px",
          height: "935px",
        }}
      />
    </div>
  );
};

// Section 3
const Section3 = () => {
  return (
    <div className="pb-[250px] font-semibold text-black w-full flex items-center justify-center pt-30">
      <div className="text-center text-4xl font-pretendard leading-loose">
        <p className="text-4xl font-bold pb-[80px]">GPT의 답변</p>
        <p>어떤 차이가 느껴지나요?</p>
        <p>
          같은 문제지만, 이번에는{" "}
          <span className="text-5xl bg-[#FE7525] px-2 py-1 font-extrabold text-white">
            교사의 말투
          </span>
          와{" "}
          <span className="text-5xl bg-[#FE7525] px-2 py-1 font-extrabold text-white">
            관점
          </span>
          으로 바뀌었죠.
        </p>

        <p>이게 바로 Role Prompting의 힘이에요.</p>
      </div>
    </div>
  );
};

// Section 4
const Section4 = () => {
  return (
    <div className="text-black w-full h-[700px] flex items-center justify-center bg-[#FE7525]">
      <div className="rounded-full w-[600px] h-[600px] bg-white flex items-center justify-center font-pretendard text-3xl">
        <div className="text-center p-8 leading-loose">
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            {" "}
            Role Prompting{" "}
          </span>
          이 좋은 이유는 <br />
          모델이 단순히 문맥에 맞게 대답하는 데서
          <br />
          그치지 않고{" "}
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            정확하면서도
          </span>
          <span className="underline underline-offset-8 decoration-[#FE7525] decoration-4">
            <br />
          </span>
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            맥락에 맞는 사고
          </span>
          와
          <br />
          <span className="font-extrabold underline underline-offset-8 decoration-[#FE7525] decoration-4 text-4xl">
            표현을 유도
          </span>
          하기 때문이에요.
        </div>
      </div>
    </div>
  );
};

// Section 5
const Section5 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-[300px] pb-[300px] relative">
      {/* Vector 1 - 상단 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Vector 1"
        className="relative mt-[0px] ml-[-1050px]"
        style={{
          left: "280px",
          top: "-30px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 1. 텍스트 */}
      <div className="text-black text-3xl font-pretendard text-center">
        그래서{" "}
        <span className="text-4xl font-extrabold">
          정답률이 높고, 결과의 일관성
        </span>{" "}
        이 유지돼요.
      </div>

      {/* 2. Underline */}
      <img
        src="/images/gpt-study/role/orange_line.png"
        alt="Underline"
        className="w-full mt-[-50px]"
        style={{ height: "86.76px", width: "1473.5px", top: "140px" }}
      />

      {/* Vector 2 - 하단 */}
      <motion.img
        src="/images/gpt-study/role/star.png"
        alt="Vector 2"
        className="relative mt-[-200px] ml-[1050px]"
        style={{
          right: "320px",
          top: "230px",
          width: "45px",
          height: "65px",
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="relative text-black w-full flex flex-col justify-center pt-[200px] px-6">
      {/* 제목 */}
      <p className="flex items-left px-12 text-3xl mb-4 font-pretendard pb-4">
        정리하자면!
        <span className="font-bold font-pretendard mx-2">
          {" "}
          Role Prompting{" "}
        </span>{" "}
        은
      </p>

      {/* 탭 + 박스 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div className="h-14 w-60 bg-[#FE7525] rounded-t-2xl border-x border-t border-black"></div>
        {/* 메인 박스 */}
        <div className="flex flex-col items-center justify-center leading-extra-loose bg-[#FE7525] py-20 px-2 rounded-b-2xl border-2 border-black shadow-lg font-pretendard">
          {/* 1. 예시 몇 개를 보여주고 문제를 풀게 하는 방법 부분 */}
          <p className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              모델이 특정 인격이나 역할을 맡아 답변하도록
            </div>
          </p>
          {/* 2. 장점은 / 규칙을 따르게 만들기 쉽고 부분 */}
          <p className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              지시하는 방법
            </div>
            이에요. 이 방식을 사용하면 답변의
          </p>

          <p className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              스타일과 관점을 원하는 방향으로 조정
            </div>
            할 수 있지만,
          </p>

          {/* 3. 대신, / 예시를 잘못 주면 부분 */}
          <p className="text-3xl font-semibold mb-6">
            반대로{" "}
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              역할을 너무 과하게 지정하면
            </div>
          </p>

          {/* 4. 패턴을 그대로 따라가서 오답 부분 */}
          <p className="text-3xl font-semibold">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              어색한 말투로 굳어질 수도{" "}
            </div>
            있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// Section 7
const Section7 = () => {
  return (
    <div className="font-semibold text-black w-full flex flex-col items-center justify-center pt-32 pb-32 gap-6">
      {/* 1. 아까랑 뭐가 다르냐고요? */}
      <div className="text-4xl font-pretendard">
        또한{" "}
        <span className="font-bold text-[#FE7525]">
          '30년 경력의 베테랑 디자이너'
        </span>
        처럼 구체적인 역할을 지정하면
      </div>

      {/* 2. 여기서는 예시 2개를 주니, */}
      <div className="text-4xl font-pretendard">
        더{" "}
        <span className="font-bold text-[#FE7525]">
          깊이 있고 퀄리티 높은 답변
        </span>
        을 얻을 수 있습니다.
      </div>
      <br />

      <div className="text-4xl font-pretendard">
        어때요, 이제 Role Prompting이 어떤 개념인지 감이 오나요?
      </div>

      <img
        src="/images/gpt-study/role/movie.png"
        alt="Underline"
        className="w-full pt-[50px]"
        style={{ width: "901px", height: "601px" }}
      />
    </div>
  );
};

// Section 8
const Section8 = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleGoToChat = () => {
    navigate(`/gpt-study/${slug}/chat`);
  };

  return (
    <div className="text-black font-pretendard w-full flex flex-col items-center justify-center pt-72 relative font-semibold">
      {/* FirstLine2 */}
      <img
        src="/images/gpt-study/role/FirstLine2.png"
        alt="First Line 2"
        className="absolute"
        style={{
          left: "0px",
          top: "120px",
          width: "310px",
          height: "250px",
        }}
      />

      {/* SecondLine2 */}
      <img
        src="/images/gpt-study/role/SecondLine2.png"
        alt="Second Line 2"
        className="absolute"
        style={{
          right: "0px",
          top: "200px",
          width: "350px",
          height: "250px",
        }}
      />

      {/* Star 1 - '그럼' 좌측 하단 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 1"
        className="absolute"
        style={{
          left: "250px",
          top: "480px",
          width: "105px",
          height: "89px",
        }}
      />

      {/* Star 2 - '감이' 위 */}
      <img
        src="/images/gpt-study/role/Star2.png"
        alt="Star 2"
        className="absolute"
        style={{
          left: "700px",
          top: "145px",
          width: "105px",
          height: "89px",
        }}
      />

      {/* 텍스트 */}
      <div className="text-3xl font-pretendard leading-[2.5] text-center z-10">
        <p className="md-20">
          어때요? <span className="font-bold text-4xl">Role Prompting</span> 에
          대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#FE7525] decoration-4">
            진짜 셰프가 되려면 조금 더 학습
          </span>
          이 필요하답니다.
        </p>
        <p>그럼 이제 다음 단계로 넘어가 볼까요?</p>
      </div>

      {/* 버튼 + SpoonAndChopsticks */}
      <div className="w-full flex items-center justify-center gap-4 mt-12 z-10">
        <button
          onClick={handleGoToChat}
          className="bg-[#FE7525] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard text-white hover:bg-[#D46100] transition-colors"
        >
          레시피 연습하러 가기
        </button>
      </div>
      {/* SpoonAndChopsticks */}
      <img
        src="/images/gpt-study/few-shot/SpoonAndChopsticks.png"
        alt="Spoon and Chopsticks"
        style={{
          right: "0px",
          top: "350px",
          position: "absolute",
          width: "400px",
          height: "500px",
        }}
      />
    </div>
  );
};

//S.9
const Section9 = () => {};

// Section 10
const Section10 = () => {};

// Section 11
const Section11 = () => {};

// Section 12
const Section12 = () => {};

// Section 13
const Section13 = ({ recipeId, index }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { collapseContent, setActiveSection } = useGPTStudyStore();

  const handleCloseTutorial = () => {
    console.log("🔼 Closing Tutorial with smooth collapse");

    // 1. Section 시작점으로 스크롤
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // 2. 약간의 딜레이 후 접기
    setTimeout(() => {
      collapseContent();
      setActiveSection(recipeId - 1);

      // 3. 애니메이션이 끝난 후 URL 변경 (1.2초 후)
      setTimeout(() => {
        navigate(`/gpt-study/${slug}`);
      }, 1200);
    }, 300);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-72 pb-12">
      {/* 버튼 영역 */}
      <div className="flex flex-col items-center">
        {/* Triangle 이미지 */}
        <img
          src="/images/gpt-study/role/Triangle.png"
          alt="Triangle"
          style={{
            width: "40px",
            height: "35px",
          }}
        />

        {/* Tutorial 접기 버튼 */}
        <button
          onClick={handleCloseTutorial}
          className="bg-[#FE7525] border-2 border-black text-white mt-2 py-4 px-96 text-3xl font-medium font-pretendard"
        >
          다른 레시피 더 알아보기
        </button>
      </div>
    </div>
  );
};

export default Recipe1TutorialExample;
