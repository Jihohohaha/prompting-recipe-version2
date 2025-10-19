// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe1TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe1TutorialExplain = () => {
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

      <FadeSection>
        <SectionRoleExplain />
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
        ( ROLE-PROMPTING )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 5. */}
      <div className="font-koolegant text-4xl font-black text-black">
        RECIPE 1.
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
      {/* FE7525 원 (작은) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
        }}
      />

      {/* FE7525 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#FE7525]"
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
          left: "155px",
          top: "250px",
          width: "350px",
          height: "130px",
        }}
      >
        Role
      </div>
      {/* FE7525 원 (중간) */}
      <div
        className="absolute bg-[#FE7525] rounded-full"
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
          left: "100px",
          top: "776px",
          width: "491px",
          height: "172px",
        }}
      >
        Prompting
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/role/movie.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "170px",
          top: "370px",
          width: "800px",
          height: "500px",
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
          영화 배우는{" "}
          <span className="bg-[#FE7525] px-2 py-1 text-5xl font-extrabold text-white">
            맡은 역할에 따라 완전히 다른 사람
          </span>
          이 됩니다.
        </p>
        <p className="mb-10">같은 배우라도 어떤 작품에서는 냉철한 형사로, </p>
        <p className="mb-10">다른 작품에서는 따뜻한 아버지로 보이죠.</p>
        <p className="mb-10">
          이처럼 역할이 달라지면 말투와 행동, 표현 방식도 함께 달라집니다.
        </p>
      </div>
    </div>
  );
};

const SectionRoleExplain = () => {
  return (
    <div className="pt-[300px] w-full flex items-center justify-center">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed text-black">
        <p className="text-5xl font-semibold text-[#FE7525] mb-10">
          AI 모델도 마찬가지예요.
        </p>
        <p className="pt-[30px] mb-10">
          프롬프트에서{" "}
          <span className="bg-[#FE7525] px-2 py-1 text-5xl font-extrabold text-white">
            "너는 지금 ~ 역할이야."라고 지정
          </span>
          해주는 걸
        </p>
        <p className="mb-10">
          <span className="bg-[#FE7525] px-2 py-1 text-5xl font-extrabold text-white">
            Role Prompting, 역할 지정 기법{" "}
          </span>
          이라고 합니다.{" "}
        </p>
        <p className="mb-10">
          이렇게 하면 모델은 그{" "}
          <span className="bg-[#FE7525] px-2 py-1 text-5xl font-extrabold text-white">
            역할에 맞춰 답변{" "}
          </span>
          하려고 하죠.
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
      <div className="font-pretendard text-4xl font-medium text-black">
        먼저 아무 역할도 주지 않고 이렇게 시켜볼게요.
      </div>
      <div className="border-6 border-[#FE7525] w-[80%] px-1 py-4 font-pretendard text-5xl font-medium text-black text-center">
        밑변 6, 높이 4인 삼각형의 넓이를 구해줘
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
      <div className="text-white text-center whitespace-nowrap bg-[#FE7525] border border-black w-[70%] py-6 font-pretendard text-5xl font-semibold">
        답: 12
      </div>
      <div className="font-pretendard text-4xl font-medium text-black">
        단순히 계산만 해줬네요.
      </div>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-8 pt-[158px]">
      {/* 1️⃣ 석상 이미지 */}
      <img
        src="/images/gpt-study/role/suksang.png"
        alt="V Statue"
        className="w-[535px] h-[590px] object-contain"
      />

      {/* 2️⃣ 텍스트 영역 */}
      <div className="text-center mt-8">
        <p className="text-5xl font-medium text-black mb-4">
          이번에는 Role Prompting을{" "}
        </p>
        <br />
        <p className="text-5xl font-medium text-black mb-4">적용해볼게요!</p>
      </div>

      {/* 3️⃣ 밑줄 + 별 이미지 */}
      <div className="relative mt-6 w-full flex justify-center">
        <img
          src="/images/gpt-study/role/orange_line.png"
          alt="Underline"
          className="absolute w-[700px] h-[60px] top-[-100px] left-[170px]"
        />
        <img
          src="/images/gpt-study/role/orange_star.png"
          alt="Star"
          className="absolute right-[200px] top-[-310px] w-[132px] h-[112px]"
        />
      </div>
    </div>
  );
};

// Section 8: Reflection 설명
const SectionReflectionExplain = () => {
  return (
    <div className="relative pt-[150px] w-full flex flex-col items-center justify-center font-pretendard text-black">
      {/* 상단 문장 */}
      <p className="text-4xl font-semibold leading-snug">
        다음과 같이 '선생님'이라는 역할을 부여해봤어요!
      </p>
      <br />
      <br />
      <br />

      <div className="border-6 border-[#FE7525] w-[80%] px-1 py-4 font-pretendard text-5xl font-medium text-black text-center">
        너는 초등학교 수학 선생님이야.
        <br />
        <br />
        학생의 질문에는 반드시 초등학생이
        <br />
        <br />
        이해할 수 있는 수준으로 풀이 과정을 설명해.
        <br />
      </div>
      <br />
      <br />
      <p className="text-4xl font-semibold leading-snug">
        그럼 모델은 이렇게 답합니다.
      </p>

      <br />
    </div>
  );
};

export default Recipe1TutorialExplain;
