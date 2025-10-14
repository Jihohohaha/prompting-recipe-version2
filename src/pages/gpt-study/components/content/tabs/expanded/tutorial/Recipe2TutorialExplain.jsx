// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe2TutorialExplain.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe2TutorialExplain = () => {
  return (
    <div className="bg-white rounded-3xl">
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

      {/* Section 8: Few-shot 그래픽 */}
      <FadeSection>
        <SectionFewGraphic />
      </FadeSection>

      {/* Section 9: Few-shot 설명 */}
      <FadeSection>
        <SectionFewExplain />
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
      <div className="font-mortend text-3xl font-black">( FEW-SHOT )</div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 1. */}
      <div className="font-koolegant text-4xl">RECIPE 1.</div>
    </div>
  );
};

// Section 2: 긴 선
const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[24px] pb-[70px]">
      <div className="w-[1126px] h-[2px] bg-black"></div>
    </div>
  );
};

// Section 3: Zero-shot 그래픽
const SectionZeroGraphic = () => {
  return (
<<<<<<< HEAD
    <div className="w-full relative" style={{ height: "1120px" }}>
=======
    <div className="w-full relative" style={{ height: '1120px' }}>
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
      {/* FFC300 원 (작은) */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
<<<<<<< HEAD
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
=======
        style={{ 
          width: '150px', 
          height: '150px',
          left: '920px', 
          top: '70px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* FFC300 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#FFC300]"
<<<<<<< HEAD
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
=======
        style={{ 
          width: '544px', 
          height: '544px',
          left: '70px', 
          top: '129px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* zero 텍스트 */}
<<<<<<< HEAD
      <div
        className="absolute font-koolegant text-black text-[17rem]"
        style={{
          left: "100px",
          top: "190px",
          width: "350px",
          height: "130px",
=======
      <div 
        className="absolute font-koolegant text-black text-[17rem]"
        style={{ 
          left: '100px', 
          top: '190px', 
          width: '350px', 
          height: '130px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      >
        zero
      </div>
      {/* FFC300 원 (중간) */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
<<<<<<< HEAD
        style={{
          width: "337px",
          height: "337px",
          left: "760px",
          top: "584px",
=======
        style={{ 
          width: '337px', 
          height: '337px',
          left: '760px', 
          top: '584px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* shot 텍스트 */}
<<<<<<< HEAD
      <div
        className="absolute font-koolegant text-black text-[17rem]"
        style={{
          left: "580px",
          top: "572px",
          width: "392px",
          height: "137px",
=======
      <div 
        className="absolute font-koolegant text-black text-[17rem]"
        style={{ 
          left: '580px', 
          top: '572px', 
          width: '392px', 
          height: '137px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      >
        shot
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/few-shot/ZeroShot.png"
        alt="Zero Shot"
        className="absolute"
<<<<<<< HEAD
        style={{
          left: "318px",
          top: "260px",
          width: "550px",
          height: "550px",
=======
        style={{ 
          left: '318px', 
          top: '260px', 
          width: '550px', 
          height: '550px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />
    </div>
  );
};

// Section 4: Zero-shot 설명
const SectionZeroExplain = () => {
  return (
    <div className="w-full flex items-center justify-center py-[0px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed">
        <p className="mb-4">
          자 먼저 이건{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            zero-shot
          </span>{" "}
          이에요.
        </p>
        <p className="mb-4">
          보이는 것처럼{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            비어있는 샷
          </span>{" "}
          이죠.
        </p>
        <p className="mb-4">
          이{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            zero-shot
          </span>{" "}
          은 다음과 같이{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            예시를 제시하지 않고
          </span>
        </p>
        <p>
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            명령어를 입력
          </span>{" "}
          하는 방식이에요.
        </p>
      </div>
    </div>
  );
};

// Section 5: 예시
const SectionExample = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[158px]">
      {/* 예시 박스 */}
      <div className="border-6 border-[#FFC300] px-1 py-4 font-pretendard text-5xl font-medium">
        I love apples 라는 영어 문장을 한국어로 번역해줘
      </div>

      {/* 설명 텍스트 */}
      <div className="font-pretendard text-4xl font-medium">
        이런식으로요! 그러면 GPT는 아래와 같이 답변합니다.
      </div>
    </div>
  );
};

// Section 6: GPT 답변
const SectionGPTAnswer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[0px]">
      {/* GPT의 답변 제목 */}
      <div className="font-pretendard text-4xl font-bold">GPT의 답변</div>

      {/* 답변 박스 */}
      <div className="bg-[#FFC300] border border-black px-64 py-6 font-pretendard text-5xl font-semibold">
        나는 사과를 좋아한다
      </div>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
<<<<<<< HEAD
    <div className="w-full relative" style={{ height: "858px" }}>
=======
    <div className="w-full relative" style={{ height: '858px' }}>
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
      {/* V 동상 이미지 */}
      <img
        src="/images/gpt-study/few-shot/VStatue.png"
        alt="V Statue"
        className="absolute"
<<<<<<< HEAD
        style={{
          left: "320px",
          top: "86px",
          width: "535px",
          height: "590px",
=======
        style={{ 
          left: '320px', 
          top: '86px', 
          width: '535px', 
          height: '590px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* 별 이미지 */}
      <img
        src="/images/gpt-study/few-shot/Star.png"
        alt="Star"
        className="absolute"
<<<<<<< HEAD
        style={{
          left: "810px",
          top: "564px",
          width: "105px",
          height: "89px",
=======
        style={{ 
          left: '810px', 
          top: '564px', 
          width: '105px', 
          height: '89px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* 텍스트 */}
<<<<<<< HEAD
      <div
        className="absolute text-center font-pretendard text-4xl font-bold"
        style={{ top: "640px", left: "50%", transform: "translateX(-50%)" }}
=======
      <div 
        className="absolute text-center font-pretendard text-4xl font-bold" 
        style={{ top: '640px', left: '50%', transform: 'translateX(-50%)' }}
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
      >
        <p>겉보기엔 괜찮아보이죠?</p>
        <p>근데 더 좋은 방법이 있다는 사실!</p>
      </div>

      {/* 밑줄 이미지 */}
      <img
        src="/images/gpt-study/few-shot/Underline.png"
        alt="Underline"
        className="absolute"
<<<<<<< HEAD
        style={{
          left: "228px",
          top: "655px",
          width: "742px",
          height: "85px",
=======
        style={{ 
          left: '228px', 
          top: '655px', 
          width: '742px', 
          height: '85px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />
    </div>
  );
};

// Section 8: Few-shot 그래픽 (흔들리는 애니메이션 포함)
const SectionFewGraphic = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
<<<<<<< HEAD
    <div ref={ref} className="w-full relative" style={{ height: "1112px" }}>
=======
    <div ref={ref} className="w-full relative" style={{ height: '1112px' }}>
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
      {/* FFC300 원들 */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
<<<<<<< HEAD
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
=======
        style={{ 
          width: '150px', 
          height: '150px',
          left: '920px', 
          top: '70px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />
      <div
        className="absolute rounded-full ring-20 ring-[#FFC300]"
<<<<<<< HEAD
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
=======
        style={{ 
          width: '544px', 
          height: '544px',
          left: '70px', 
          top: '129px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />
      <div
        className="absolute bg-[#FFC300] rounded-full"
<<<<<<< HEAD
        style={{
          width: "377px",
          height: "377px",
          left: "760px",
          top: "584px",
=======
        style={{ 
          width: '377px', 
          height: '377px',
          left: '760px', 
          top: '584px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      />

      {/* few 텍스트 */}
<<<<<<< HEAD
      <div
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{
          left: "100px",
          top: "190px",
          width: "350px",
          height: "130px",
=======
      <div 
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{ 
          left: '100px', 
          top: '190px', 
          width: '350px', 
          height: '130px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      >
        few
      </div>

      {/* shot 텍스트 */}
<<<<<<< HEAD
      <div
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{
          left: "580px",
          top: "572px",
          width: "392px",
          height: "137px",
=======
      <div 
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{ 
          left: '580px', 
          top: '572px', 
          width: '392px', 
          height: '137px' 
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
      >
        shot
      </div>

      {/* FewShot 이미지 (흔들림 애니메이션) */}
      <motion.img
        src="/images/gpt-study/few-shot/FewShot.png"
        alt="Few Shot"
        className="absolute z-20"
<<<<<<< HEAD
        style={{
          left: "318px",
          top: "260px",
          width: "550px",
          height: "550px",
          transformOrigin: "top right",
=======
        style={{ 
          left: '318px', 
          top: '260px', 
          width: '550px', 
          height: '550px',
          transformOrigin: 'top right'
>>>>>>> cd12b37276474999e73fe022277687a4f84cb9f7
        }}
        animate={
          isInView
            ? {
                rotate: [0, 2, -2, 2, -2, 0],
                y: [0, -2, 2, -2, 2, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          delay: 0.3,
        }}
      />
    </div>
  );
};

// Section 9: Few-shot 설명
const SectionFewExplain = () => {
  return (
    <div className="w-full flex items-center justify-center py-[0px] pb-[50px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed">
        <p className="mb-4">
          자, 이번엔{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            few-shot
          </span>{" "}
          이에요.
        </p>
        <p className="mb-4">
          이번엔 비어 있지 않은,{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            조금 찬 샷
          </span>{" "}
          이라고 생각해볼게요.
        </p>
        <p className="mb-4">
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            few-shot
          </span>{" "}
          은 다음과 같이{" "}
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            예시를 먼저 제시한 뒤
          </span>
        </p>
        <p>
          <span className="bg-[#FFC300] px-2 py-1 text-5xl font-extrabold">
            그 패턴을 따라
          </span>{" "}
          새로운 결과를 만들어내는 방식이에요.
        </p>
      </div>
    </div>
  );
};

export default Recipe2TutorialExplain;
