// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe4TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe4TutorialExplain = () => {
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

      {/* Section 9: Markdown 설명 */}
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
        ( MARKDOWN )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 4. */}
      <div className="font-koolegant text-4xl font-black text-black">
        RECIPE 4.
      </div>
    </div>
  );
};

// Section 2: 긴 선
const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[24px] pb-[40px]">
      <div className="w-[1408px] h-[2px] bg-black"></div>
    </div>
  );
};

// Section 3: Zero-shot 그래픽
const SectionZeroGraphic = () => {
  return (
    <div className="w-full relative" style={{ height: "1272px" }}>
      {/* 29D069 원 (작은) */}
      <div
        className="absolute bg-[#29D069] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "270px",
        }}
      />

      {/* 29D069 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#29D069]"
        style={{
          width: "544px",
          height: "544px",
          left: "-60px",
          top: "129px",
        }}
      />

      {/* mark 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[15rem]"
        style={{
          left: "100px",
          top: "240px",
          width: "350px",
          height: "130px",
        }}
      >
        MARK
      </div>
      {/* 29D069 원 (중간) */}
      <div
        className="absolute bg-[#29D069] bg-opacity-55 ring-[#29D069] ring-20 rounded-full"
        style={{
          width: "624px",
          height: "624px",
          left: "560px",
          top: "584px",
        }}
      />

      {/* down 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[15rem] whitespace-nowrap"
        style={{
          left: "320px",
          top: "1100px",
          width: "491px",
          height: "172px",
          zIndex: 9999,
        }}
      >
        DOWN
      </div>

      {/* 29D069 원 (작은) */}
      <div
        className="absolute bg-[#29D069] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "120px",
          top: "1000px",
        }}
      />

      <div
        className="absolute bg-[#FFFFFF] ring-[#29D069] ring-20 rounded-full"
        style={{
          width: "324px",
          height: "324px",
          left: "700px",
          top: "1084px",
        }}
      />

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/markdown/shape.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "250px",
          top: "544px",
          width: "600px",
          height: "463px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// Section 4: Zero-shot 설명
const SectionZeroExplain = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[308px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed text-black">
        <p className="mb-4">모델에게 아무 말이나 풀어놓게 하면</p>
        <p className="mb-4">
          쿠키 반죽을 그냥 손으로 뜯은 것처럼{" "}
          <span className="bg-[#29D069] px-2 py-1 text-5xl font-extrabold text-white">
            모양이 제멋대로예요. <br />
          </span>
        </p>
        <p className="mb-4">
          그런데{" "}
          <span className="bg-[#29D069] px-2 py-1 text-5xl font-extrabold text-white">
            "이 틀에 맞춰 써봐"
          </span>{" "}
          라고 말하면,
          <br />
        </p>
        <p className="mb-4">
          마치 쿠키틀로{" "}
          <span className="text-5xl font-bold">예쁘게 찍어내는 것</span> 처럼
          <br />
        </p>

        <p className="mb-4">
          <span className="bg-[#29D069] px-2 py-1 text-5xl font-extrabold text-white">
            답변이 일정한 형태로 정리돼요.
            <br />
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

// Section 5: 예시
const SectionExample = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 pt-[308px] pb-[108px]">
      {/* 예시 박스 */}

      <p className="px-2 py-1 text-5xl font-extrabold text-black">
        쿠키 틀 없이 질문 한다면 어떻게 될까요?
      </p>
      <div className="border-6 border-[#29D069] w-[80%] px-1 py-4 font-pretendard text-4xl font-medium text-black text-center">
        홍대 맛집 추천해줘. 추천 메뉴랑 가격대, 특징도 알려줘.
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
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[0px] pt-[308px]">
      {/* GPT의 답변 제목 */}
      <div className="font-pretendard text-4xl font-bold text-black">
        GPT의 답변
      </div>

      {/* 답변 박스 */}
      <div className="text-center whitespace-nowrap bg-[#29D069] border border-black w-[80%] py-6 font-pretendard text-4xl font-semibold">
        홍대에 맛있는 카페가 있고, 강남에 고깃집도 괜찮아.
        <p>부산 회센터도 추천!</p>
      </div>
      <div className="font-pretendard text-4xl font-medium text-black">
        질문의 의도를 파악하지 못한 답변이 나오죠.
      </div>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 pt-[308px]">
      {/* 2️⃣ 텍스트 영역 */}
      <div className="text-center mt-8">
        <p className="text-4xl font-medium text-black mb-2">
          내용은 같아도, 틀에 맞춰 찍어내면{" "}
        </p>
        <br />
        <br />
        <p className="text-5xl font-medium text-black mb-2">
          보기 좋고, 한 눈에 정돈된 답이 만들어져요.
        </p>{" "}
      </div>

      {/* 3️⃣ 밑줄 + 별 이미지 */}
      <div className="relative mt-6 w-full flex justify-center">
        <img
          src="/images/gpt-study/markdown/green_line.png"
          alt="Underline"
          className="absolute w-[1003px] h-[57px] top-[-90px] left-[20px]"
        />
        <img
          src="/images/gpt-study/markdown/green_star.png"
          alt="Star"
          className="absolute right-[30px] top-[-230px] w-[132px] h-[112px]"
        />
      </div>
    </div>
  );
};

// Section 8: Reflection 설명
const SectionReflectionExplain = () => {
  return (
    <div className="pt-[308px] w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}

      <img
        src="/images/gpt-study/markdown/cookie.png"
        alt="Zero Shot"
        style={{
          left: "270px",
          top: "0px",
          width: "900px",
          height: "713px",
        }}
      />

      <p className="text-5xl font-semibold leading-snug">
        Markdown Template은 모델의 '쿠키틀'이에요.
      </p>
      <br />
      <br />
    </div>
  );
};

const SectionMarkdownExplain = () => {
  return (
    <div className="pt-[200px] w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}

      {/* 보라색 배경 */}
      <div className="w-full flex items-center justify-center bg-[#29D069] py-[200px]">
        {/* 흰색 원 */}
        <div className="relative bg-white rounded-full w-[850px] h-[850px] flex flex-col items-center justify-center text-center leading-relaxed space-y-[48px]">
          {/* 1️⃣ 첫 문장 */}
          <p className="text-4xl font-medium">
            미리{" "}
            <span className="px-1 py-1 text-5xl font-extrabold text-black">
              특정 템플릿
            </span>
            을 주고
          </p>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              <span className="text-5xl font-extrabold">
                "이 형식으로 답을 채워줘"{" "}
              </span>
              라고 하면,
            </p>

            <div className="w-[640px] h-[6px] bg-[#29D069] mx-auto rounded-full"></div>
          </div>

          {/* 2️⃣ ‘답변 후 자기 검토’ */}
          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              모델은{" "}
              <span className="text-5xl font-extrabold">그 구조를 그대로</span>
            </p>

            <div className="w-[440px] h-[6px] bg-[#29D069] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">따라 답을 만듭니다. </p>

            <div className="w-[300px] h-[6px] bg-[#29D069] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-[16px]">
            <p className="text-4xl font-medium">
              <span className="text-5xl font-extrabold">템플릿에 따라</span>{" "}
              완성도가 달라집니다.{" "}
            </p>

            <div className="w-[600px] h-[6px] bg-[#29D069] mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe4TutorialExplain;
