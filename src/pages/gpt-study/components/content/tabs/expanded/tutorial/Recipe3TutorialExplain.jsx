// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe3TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe3TutorialExplain = () => {
  return (
    <div className="flex flex-col bg-white rounded-3xl">
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

      {/* Section 8: Reflection 설명 */}
      <FadeSection>
        <SectionReflectionExplain />
      </FadeSection>

      {/*secion 9: ~~ */}
      <FadeSection>
        <SectionHalluExplain />
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
        ( HALLUCINATION )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 5. */}
      <div className="font-koolegant text-4xl font-black text-black">
        RECIPE 3.
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
      {/* 87CA34 원 (작은) */}
      <div
        className="absolute bg-[#87CA34] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
        }}
      />

      {/* 87CA34 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#87CA34]"
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
        }}
      />

      {/* zero 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[14rem]"
        style={{
          left: "125px",
          top: "250px",
          width: "350px",
          height: "130px",
        }}
      >
        Hallu
      </div>
      {/* 87CA34 원 (중간) */}
      <div
        className="absolute bg-[#87CA34] rounded-full"
        style={{
          width: "337px",
          height: "337px",
          left: "720px",
          top: "584px",
        }}
      />

      {/* shot 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[14rem] whitespace-nowrap"
        style={{
          left: "370px",
          top: "676px",
          width: "491px",
          height: "172px",
        }}
      >
        cination
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/hallucination/msg.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "370px",
          top: "154px",
          width: "639px",
          height: "663px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// Section 4: Zero-shot 설명
const SectionZeroExplain = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed text-black">
        <p className="mb-10">
          모델이 모르면 솔직히{" "}
          <span className="bg-[#87CA34] px-2 py-1 text-5xl font-extrabold text-black">
            '모른다'
          </span>
          고 해야 하는데,
        </p>
        <p className="mb-10">
          괜히{" "}
          <span className="bg-[#87CA34] px-2 py-1 text-5xl font-extrabold text-black">
            빈칸을 메우겠다고
          </span>
        </p>
        <p className="mb-10">
          <span className="bg-[#87CA34] px-2 py-1 text-5xl font-extrabold text-black">
            그럴듯한 소리
          </span>
          를 만들어내는 상황이 있습니다.
        </p>
        <p className="mb-10">
          그게 바로 모델의 MSG,{" "}
          <span className="bg-[#87CA34] px-2 py-1 text-5xl font-extrabold text-black">
            Hallucination
          </span>{" "}
          입니다.
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
        예를 들어볼까요?
      </p>
      <div className="border-6 border-[#87CA34] w-[70%] px-1 py-4 font-pretendard text-5xl font-medium text-black text-center">
        대한민국의 초대 대통령은 누구야?
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
      <div className="text-black text-center whitespace-nowrap bg-[#87CA34] border border-black w-[70%] py-6 font-pretendard text-4xl font-semibold">
        대한민국의 초대 대통령은 김구 입니다.
      </div>
      <div className="font-pretendard text-4xl font-medium text-black">
        김구 선생님은 독립운동가지만 대통령을 한 적이 없죠.
      </div>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 pt-[158px]">
      {/* 1️⃣ 석상 이미지 */}
      <img
        src="/images/gpt-study/hallucination/suksangv.png"
        alt="V Statue"
        className="w-[535px] h-[590px] object-contain"
      />

      {/* 2️⃣ 텍스트 영역 */}
      <div className="text-center mt-8">
        <p className="text-5xl font-medium text-black mb-4">
          겉보기엔 완벽해 보이지만,{" "}
        </p>
        <br />
        <p className="text-5xl font-medium text-black mb-4">
          진짜 정보는 하나도 없고
        </p>
        <br />
        <p className="text-5xl font-medium text-black mb-4">
          그럴듯한 감질맛만 남는 요리
        </p>{" "}
      </div>

      {/* 3️⃣ 밑줄 + 별 이미지 */}
      <div className="relative mt-6 w-full flex justify-center">
        <img
          src="/images/gpt-study/hallucination/lgreen_line.png"
          alt="Underline"
          className="absolute w-[700px] h-[60px] top-[-100px] left-[170px]"
        />
        <img
          src="/images/gpt-study/hallucination/lgreen_star.png"
          alt="Star"
          className="absolute right-[140px] top-[-200px] w-[132px] h-[112px]"
        />
      </div>
    </div>
  );
};

// Section 8: Reflection 설명
const SectionReflectionExplain = () => {
  return (
    <div className="pt-[300px] w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}
      <p className="text-5xl font-semibold leading-snug">
        그런 상황이 Hallucination 입니다.
      </p>

      <img
        src="/images/gpt-study/hallucination/msg_spoon.png"
        alt="Zero Shot"
        style={{
          left: "270px",
          top: "0px",
          width: "700px",
          height: "700px",
          objectFit: "contain",
        }}
      />

      <p className="text-5xl font-semibold leading-snug">
        MSG형 답변, Hallucination 의 특징이 뭘까요?
      </p>
      <br />
      <br />
    </div>
  );
};

const SectionHalluExplain = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}

      {/* 보라색 배경 */}
      <div className="w-full flex items-center justify-center bg-[#87CA34] py-[200px]">
        {/* 흰색 원 */}
        <div className="relative bg-white rounded-full w-[850px] h-[850px] flex flex-col items-center justify-center text-center leading-relaxed space-y-[48px]">
          {/* 1️⃣ 첫 문장 */}
          <p className="text-4xl font-medium">
            확신은 없는데 괜히{" "}
            <span className="text-5xl font-bold">아는 척</span>
          </p>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              <span className="text-5xl font-extrabold">'그럴듯한 소리'</span>{" "}
              만 해보려고 하는 거죠.
            </p>

            <div className="w-[630px] h-[6px] bg-[#87CA34] mx-auto rounded-full"></div>
          </div>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              겉으로 보기엔 말투도 자신감 넘치고
            </p>

            <div className="w-[510px] h-[6px] bg-[#87CA34] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              <span className="text-5xl font-extrabold">
                "오! 맞는 말 같네?"
              </span>{" "}
              싶지만,
            </p>
            <div className="w-[440px] h-[6px] bg-[#87CA34] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[25px]">
            <p className="text-4xl font-medium">
              막상 확인해보면,{" "}
              <span className="text-5xl font-extrabold">헛배부른 느낌</span>
              이에요.
            </p>
            <div className="w-[600px] h-[6px] bg-[#87CA34] mx-auto rounded-full"></div>

            <div className="space-y-[16px]">
              <p className="text-4xl font-medium">
                <span className="text-5xl font-extrabold">근거는 없고,</span>
                내용은 텅 비어 있거든요.
              </p>
              <div className="w-[580px] h-[6px] bg-[#87CA34] mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe3TutorialExplain;
