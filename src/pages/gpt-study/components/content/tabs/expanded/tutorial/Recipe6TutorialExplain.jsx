// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe6TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe6TutorialExplain = () => {
  return (
    <div className="bg-white">
      {/* Section 1: 헤더 */}
      <FadeSection>
        <SectionHeader />
      </FadeSection>

      {/* Section 2: 긴 선 */}
      <FadeSection>
        <SectionDivider />
      </FadeSection>

      {/* Section 3: Zero-shot 그래픽 */}
      <FadeSection>
        <SectionZeroGraphic />
      </FadeSection>

      {/* Section 4: Zero-shot 설명 */}
      <FadeSection>
        <SectionZeroExplain />
      </FadeSection>

      {/* Section 5: 예시 박스 */}
      <FadeSection>
        <SectionExample />
      </FadeSection>

      {/* Section 6: GPT 답변 */}
      <FadeSection>
        <SectionGPTAnswer />
      </FadeSection>

      {/* Section 7: V 동상 */}
      <FadeSection>
        <SectionVStatue />
      </FadeSection>

      <FadeSection>
        <ShowStatue />
      </FadeSection>

      <FadeSection>
        <SectionMarkdownExplain />
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

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
      {/* (FEW-SHOT) */}
      <div className="font-mortend text-3xl font-black text-black">
        ( REFLECTION )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 6. */}
      <div className="font-koolegant text-4xl font-black text-black">
        RECIPE 6.
      </div>
    </div>
  );
};

// Section 2: 긴 선
const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[24px] pb-[70px]">
      <div className="w-[1408px] h-[2px] bg-black"></div>
    </div>
  );
};

// Section 3: Zero-shot 그래픽
const SectionZeroGraphic = () => {
  return (
    <div className="w-full relative" style={{ height: "1272px" }}>
      {/* 9F5BF8 원 (작은) */}
      <div
        className="absolute bg-[#9F5BF8] rounded-full"
        style={{
          width: "188px",
          height: "188px",
          left: "1150px",
          top: "88px",
        }}
      />

      {/* 9F5BF8 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#9F5BF8]"
        style={{
          width: "620px",
          height: "620px",
          left: "38px",
          top: "152px",
        }}
      />

      {/* zero 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[14rem]"
        style={{
          left: "173px",
          top: "316px",
          width: "520px",
          height: "172px",
        }}
      >
        REF
      </div>
      {/* 9F5BF8 원 (중간) */}
      <div
        className="absolute bg-[#9F5BF8] rounded-full"
        style={{
          width: "422px",
          height: "422px",
          left: "580px",
          top: "730px",
        }}
      />

      <div
        className="absolute bg-[#9F5BF8] rounded-full"
        style={{
          width: "142px",
          height: "142px",
          left: "850px",
          top: "230px",
        }}
      />

      {/* shot 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[14rem]"
        style={{
          left: "230px",
          top: "816px",
          width: "491px",
          height: "172px",
        }}
      >
        LECTION
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/reflection/spoon.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "0px",
          top: "324px",
          width: "983px",
          height: "673px",
        }}
      />
    </div>
  );
};

// Section 4: Zero-shot 설명
const SectionZeroExplain = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[300px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed text-black">
        <p className="mb-10">
          요리할 때 셰프가 완성된 요리를{" "}
          <span className="px-2 py-1 text-5xl font-extrabold">
            그냥 내지 않고
          </span>{" "}
        </p>
        <p className="mb-10">
          스푼으로{" "}
          <span className="px-2 py-1 text-5xl font-extrabold">
            한입 맛보는 순간
          </span>
          {""}이 있잖아요?
        </p>
        <p className="mb-10">
          바로 그게{" "}
          <span className="bg-[#9F5BF8] px-2 py-1 text-5xl font-extrabold text-white">
            Reflection
          </span>
          이에요{" "}
        </p>
        <p className="mb-10">모델도 답을 내자마자 바로 끝내는 게 아니라,</p>
        <p className="mb-7">
          그 답을
          <span className="bg-[#9F5BF8] px-2 py-1 text-5xl font-extrabold text-white">
            스스로 한입 맛보듯 검토
          </span>
          해보는 거예요.
        </p>
      </div>
    </div>
  );
};

// Section 5: 예시
const SectionExample = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-[300px]">
      {/* 예시 박스 */}

      <p className="px-2 py-1 text-5xl font-extrabold text-black">
        맛보기 스푼을 쓰지 않고 그냥 낸다면, 어떻게 될까요?
      </p>
      <div className="border-6 border-[#9F5BF8] w-[70%] px-1 py-4 font-pretendard text-5xl font-medium text-black text-center">
        수학 문제를 풀어줘: 12 x 13 = ?
      </div>
      {/* 설명 텍스트 */}
      <div className="font-pretendard text-4xl font-medium text-black">
        이렇게 질문해볼게요.
      </div>
    </div>
  );
};

// Section 6: GPT 답변
const SectionGPTAnswer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-[300px]">
      {/* GPT의 답변 제목 */}
      <div className="font-pretendard text-4xl font-bold text-black">
        GPT의 답변
      </div>

      {/* 답변 박스 */}
      <div className="bg-[#9F5BF8] border border-black w-[70%] px-64 py-6 font-pretendard text-center text-5xl font-semibold">
        144입니다.
      </div>
      <div className="font-pretendard text-4xl font-medium text-black">
        틀린 답을 내놓습니다.
      </div>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-[308px] pb-[100px]">
      {/* 예시 박스 */}
      {/* 별 이미지 */}
      <img
        src="/images/gpt-study/reflection/purple_star.png"
        alt="Star"
        className="absolute"
        style={{
          left: "953px",
          top: "420px",
          width: "132px",
          height: "112px",
        }}
      />

      <p className="px-2 py-1 text-6xl font-extrabold text-black">하지만,</p>
      <br />
      <div className="font-pretendard text-4xl font-medium text-black">
        요리할 때의 맛보기 스푼처럼,
      </div>
      {/* 설명 텍스트 */}
      <div className="font-pretendard text-5xl font-medium text-black">
        GPT도 자기 검토를 통해 더 나은 답을 생성합니다.
      </div>
      {/* 밑줄 이미지 */}
      <img
        src="/images/gpt-study/reflection/purple_line.png"
        alt="Underline"
        className="absolute"
        style={{
          left: "-30px",
          top: "545px",
          width: "1053px",
          height: "67px",
        }}
      />
    </div>
  );
};

const ShowStatue = () => {
  return (
    <div className="pb-[150px] w-full flex flex-col items-center justify-center font-pretendard text-black">
      <img
        src="/images/gpt-study/reflection/suksang.png"
        alt="Zero Shot"
        style={{
          left: "0px",
          top: "324px",
          width: "669px",
          height: "739px",
        }}
      />
      <p className="text-4xl font-semibold">
        그 방법을 'REFLECTION' 이라고 불러요.
      </p>
    </div>
  );
};

const SectionMarkdownExplain = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}

      {/* 보라색 배경 */}
      <div className="w-full flex items-center justify-center bg-[#9F5BF8] py-[200px]">
        {/* 흰색 원 */}
        <div className="relative bg-white rounded-full w-[850px] h-[850px] flex flex-col items-center justify-center text-center leading-relaxed space-y-[48px]">
          {/* 1️⃣ 첫 문장 */}
          <p className="text-4xl font-medium">사용자가 질문을 입력해요.</p>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              질문 내에{" "}
              <span className="text-5xl font-extrabold">
                '답변 후 자기 검토'
              </span>
            </p>

            <div className="w-[520px] h-[6px] bg-[#9F5BF8] mx-auto rounded-full"></div>
          </div>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-5xl font-semibold">단계를 넣어주면</p>

            <div className="w-[340px] h-[6px] bg-[#9F5BF8] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              GPT가{" "}
              <span className="text-5xl font-extrabold">한번 더 확인</span>{" "}
              하면서
            </p>
            <div className="w-[440px] h-[6px] bg-[#9F5BF8] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[16px]">
            <p className="text-5xl font-semibold">
              더 나은 답을 <span className="font-extrabold">생성합니다.</span>
            </p>
            <div className="w-[440px] h-[6px] bg-[#9F5BF8] mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe6TutorialExplain;
