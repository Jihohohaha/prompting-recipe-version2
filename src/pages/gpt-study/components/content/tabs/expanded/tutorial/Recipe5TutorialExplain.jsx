// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe5TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe5TutorialExplain = () => {
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
        ( R.A.G )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 5. */}
      <div className="font-koolegant text-4xl font-black text-black">
        RECIPE 5.
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
      {/* 0278ED 원 (작은) */}
      <div
        className="absolute bg-[#0278ED] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
        }}
      />

      {/* 0278ED 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#0278ED]"
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
        }}
      />

      {/* zero 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[19rem]"
        style={{
          left: "100px",
          top: "190px",
          width: "350px",
          height: "130px",
        }}
      >
        RAG
      </div>
      {/* 0278ED 원 (중간) */}
      <div
        className="absolute bg-[#0278ED] rounded-full"
        style={{
          width: "337px",
          height: "337px",
          left: "760px",
          top: "584px",
        }}
      />

      {/* shot 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[5rem] whitespace-nowrap"
        style={{
          left: "70px",
          top: "776px",
          width: "491px",
          height: "172px",
        }}
      >
        Retrieval Augmented Generation
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/rag/mang.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "270px",
          top: "394px",
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
    <div className="w-full flex items-center justify-center py-[0px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed text-black">
        <p className="mb-4">
          모델은 요리책에 있는 레시피,{" "}
          <span className="bg-[#0278ED] px-2 py-1 text-5xl font-extrabold text-white">
            기존지식
          </span>{" "}
          만으로는
        </p>
        <p className="mb-4">
          <span className="bg-[#0278ED] px-2 py-1 text-5xl font-extrabold text-white">
            새로운 요리
          </span>
          {""}를 만들기 어려워요.
        </p>
        <p className="mb-4">
          모델은{" "}
          <span className="bg-[#0278ED] px-2 py-1 text-5xl font-extrabold text-white">
            학습된 지식
          </span>{" "}
          까지만 알기 때문에
        </p>
        <p className="mb-4">모델도 답을 내자마자 바로 끝내는 게 아니라,</p>
        <p className="mb-4">
          <span className="bg-[#0278ED] px-2 py-1 text-5xl font-extrabold text-white">
            최신 정보(예: 오늘의 날씨)
          </span>{" "}
          나 생소한 분야는 잘 모를 수도 있어요.
        </p>
      </div>
    </div>
  );
};

// Section 5: 예시
const SectionExample = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[108px]">
      {/* 예시 박스 */}

      <p className="px-2 py-1 text-5xl font-extrabold text-black">
        예를 들어볼까요?
      </p>
      <div className="border-6 border-[#0278ED] w-[70%] px-1 py-4 font-pretendard text-5xl font-medium text-black text-center">
        2025년 노벨 화학상 수상자는 누구야?
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
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[0px]">
      {/* GPT의 답변 제목 */}
      <div className="font-pretendard text-4xl font-bold text-black">
        GPT의 답변
      </div>

      {/* 답변 박스 */}
      <div className="text-center whitespace-nowrap bg-[#0278ED] border border-black w-[70%] py-6 font-pretendard text-4xl font-semibold">
        잘 모르겠어요, 아마 OOO 일걸요?
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
    <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 py-[108px]">
      {/* 1️⃣ 석상 이미지 */}
      <img
        src="/images/gpt-study/rag/sucksang_rag.png"
        alt="V Statue"
        className="w-[535px] h-[590px] object-contain"
      />

      {/* 2️⃣ 텍스트 영역 */}
      <div className="text-center mt-8">
        <p className="text-5xl font-medium text-black mb-2">
          그래서 우리가 필요한 정보를{" "}
        </p>
        <br />
        <p className="text-5xl font-medium text-black mb-2">
          모델이{" "}
          <span className="bg-[#0278ED] px-2 py-1 text-5xl font-extrabold text-white">
            학습된 지식
          </span>{" "}
          으로
        </p>
        <br />
        <p className="text-5xl font-medium text-black mb-2">
          찾아와서 답변을 만들게 해야해요.
        </p>{" "}
      </div>

      {/* 3️⃣ 밑줄 + 별 이미지 */}
      <div className="relative mt-6 w-full flex justify-center">
        <img
          src="/images/gpt-study/rag/blue_line.png"
          alt="Underline"
          className="absolute w-[803px] h-[107px] top-[-140px] left-[100px]"
        />
        <img
          src="/images/gpt-study/rag/blue_star.png"
          alt="Star"
          className="absolute right-[120px] top-[-200px] w-[132px] h-[112px]"
        />
      </div>
    </div>
  );
};

// Section 8: Reflection 설명
const SectionReflectionExplain = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}
      <p className="text-5xl font-semibold leading-snug">
        그 방법을 RAG 라고 불러요.
      </p>

      <img
        src="/images/gpt-study/rag/dbpia.png"
        alt="Zero Shot"
        style={{
          left: "270px",
          top: "0px",
          width: "600px",
          height: "463px",
          objectFit: "contain",
        }}
      />

      <p className="text-5xl font-semibold leading-snug">
        RAG의 원리를 요리에 빗대어 자세히 알려드릴게요.
      </p>
      <br />
      <br />
    </div>
  );
};

export default Recipe5TutorialExplain;
