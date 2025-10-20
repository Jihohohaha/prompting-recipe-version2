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

const Highlight = ({ children }) => {
  return (
    <motion.span
      className="relative font-extrabold text-5xl px-2 py-1 inline-block"
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,195,0,0.6) 0%, rgba(255,195,0,1) 50%, rgba(255,195,0,0.7) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "0% 100%",
        filter: "blur(0.6px) brightness(1.1)",
        // 🎨 아래 3줄이 '삐뚤한' 효과 핵심입니다.
        transform: "rotate(-1.5deg) skewX(-3deg)",
        borderRadius: "6px",
        clipPath: "polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)", // 위아래가 약간 비틀림
      }}
    >
      {children}
    </motion.span>
  );
};

const HighlightBox = ({ children, rotate = true }) => {
  // 랜덤하게 살짝 기울이기 (자연스러움)
  const randomTilt = rotate ? (Math.random() * 2 - 1.2).toFixed(1) : 0;

  return (
    <motion.div
      className="relative inline-block group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 형광펜 질감 배경 */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD60A]/80 to-[#FFC300]/90 blur-[3px]"
        style={{
          transform: `rotate(${randomTilt}deg)`,
          clipPath: "polygon(0% 10%, 100% 0%, 100% 90%, 0% 100%)",
        }}
      ></div>

      {/* 실제 카드 */}
      <div
        className="relative px-12 py-8 bg-white rounded-2xl border-[4px] border-[#FFC300]
                   shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-transform duration-300
                   hover:rotate-[1deg] hover:scale-[1.02]"
      >
        <p className="text-black font-pretendard text-5xl font-medium leading-snug text-center">
          {children}
        </p>
      </div>
    </motion.div>
  );
};

const GPTAnswerBox = ({ children, title = "GPT의 답변" }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 py-[120px]">
      {/* 🔹 제목 */}
      <div className="text-black font-pretendard text-4xl font-bold">
        {title}
      </div>

      {/* 💬 답변 박스 */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative px-32 py-10 rounded-3xl text-black text-5xl font-semibold font-pretendard
                   shadow-[0_10px_20px_rgba(0,0,0,0.15)] border border-[#e2b000]
                   bg-gradient-to-r from-[#FFD60A] via-[#FFC300] to-[#FFB000]"
      >
        {/* ✨ 형광펜 질감 */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            mixBlendMode: "overlay",
          }}
        ></div>

        {/* 🧠 GPT 텍스트 */}
        <p className="relative z-10 text-center leading-snug">{children}</p>
      </motion.div>
    </div>
  );
};

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
      {/* (FEW-SHOT) */}
      <div className="text-black font-mortend text-3xl font-black">
        ( FEW-SHOT )
      </div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 2. */}
      <div className="text-black font-koolegant text-4xl">RECIPE 2.</div>
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
    <div className="w-full relative" style={{ height: "1120px" }}>
      {/* FFC300 원 (작은) */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
        }}
      />

      {/* FFC300 링 (큰) */}
      <div
        className="absolute rounded-full ring-20 ring-[#FFC300]"
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
        }}
      />

      {/* zero 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[17rem]"
        style={{
          left: "100px",
          top: "190px",
          width: "350px",
          height: "130px",
        }}
      >
        zero
      </div>
      {/* FFC300 원 (중간) */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
        style={{
          width: "337px",
          height: "337px",
          left: "760px",
          top: "584px",
        }}
      />

      {/* shot 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[17rem]"
        style={{
          left: "580px",
          top: "572px",
          width: "392px",
          height: "137px",
        }}
      >
        shot
      </div>

      {/* ZeroShot 이미지 */}
      <img
        src="/images/gpt-study/few-shot/ZeroShot.png"
        alt="Zero Shot"
        className="absolute"
        style={{
          left: "318px",
          top: "260px",
          width: "550px",
          height: "550px",
        }}
      />
    </div>
  );
};

// Section 4: Zero-shot 설명
const SectionZeroExplain = () => {
  return (
    <div className="w-full flex items-center justify-center py-[0px]">
      <div className="text-black text-center font-pretendard text-4xl font-medium leading-relaxed">
        <p className="mb-4">
          자 먼저 이건 <Highlight>zero-shot</Highlight> 이에요.
        </p>
        <p className="mb-4">
          보이는 것처럼 <Highlight>비어있는 샷</Highlight>
          이죠.
        </p>
        <p className="mb-4">
          이 <Highlight>zero-shot</Highlight> 은 다음과 같이{" "}
          <Highlight>예시를 제시하지 않고</Highlight>
        </p>
        <p>
          <Highlight>명령어를 입력</Highlight> 하는 방식이에요.
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
      <HighlightBox>
        I love apples 라는 영어 문장을 한국어로 번역해줘
      </HighlightBox>

      {/* 설명 텍스트 */}
      <div className="text-black font-pretendard text-4xl font-medium">
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

      {/* 답변 박스 */}
      <GPTAnswerBox>나는 사과를 좋아한다</GPTAnswerBox>
    </div>
  );
};

// Section 7: V 동상
const SectionVStatue = () => {
  return (
    <div className="w-full relative" style={{ height: "858px" }}>
      {/* V 동상 이미지 */}
      <img
        src="/images/gpt-study/few-shot/VStatue.png"
        alt="V Statue"
        className="absolute"
        style={{
          left: "320px",
          top: "86px",
          width: "535px",
          height: "590px",
        }}
      />

      {/* 별 이미지 */}
      <img
        src="/images/gpt-study/few-shot/Star.png"
        alt="Star"
        className="absolute"
        style={{
          left: "810px",
          top: "564px",
          width: "105px",
          height: "89px",
        }}
      />

      {/* 텍스트 */}
      <div
        className="text-black absolute text-center font-pretendard text-4xl font-bold"
        style={{ top: "640px", left: "50%", transform: "translateX(-50%)" }}
      >
        <p className="mb-10">겉보기엔 괜찮아보이죠?</p>
        <p>근데 더 좋은 방법이 있다는 사실!</p>
      </div>

      {/* 밑줄 이미지 */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: "0px",
          top: "705px",
          width: "1182px",
          height: "107px",
          borderRadius: "4px",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/gpt-study/few-shot/Underline.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            transformOrigin: "left center",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

// Section 8: Few-shot 그래픽 (흔들리는 애니메이션 포함)
const SectionFewGraphic = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div ref={ref} className="w-full relative" style={{ height: "1112px" }}>
      {/* FFC300 원들 */}
      <div
        className="absolute bg-[#FFC300] rounded-full"
        style={{
          width: "150px",
          height: "150px",
          left: "920px",
          top: "70px",
        }}
      />
      <div
        className="absolute rounded-full ring-20 ring-[#FFC300]"
        style={{
          width: "544px",
          height: "544px",
          left: "70px",
          top: "129px",
        }}
      />
      <div
        className="absolute bg-[#FFC300] rounded-full"
        style={{
          width: "377px",
          height: "377px",
          left: "760px",
          top: "584px",
        }}
      />

      {/* few 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{
          left: "100px",
          top: "190px",
          width: "350px",
          height: "130px",
        }}
      >
        few
      </div>

      {/* shot 텍스트 */}
      <div
        className="absolute font-koolegant text-black text-[17rem] z-10"
        style={{
          left: "580px",
          top: "572px",
          width: "392px",
          height: "137px",
        }}
      >
        shot
      </div>

      {/* FewShot 이미지 (흔들림 애니메이션) */}
      <motion.img
        src="/images/gpt-study/few-shot/FewShot.png"
        alt="Few Shot"
        className="absolute z-20"
        style={{
          left: "318px",
          top: "260px",
          width: "550px",
          height: "550px",
          transformOrigin: "top right",
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
    <div className="text-black w-full flex items-center justify-center py-[0px] pb-[50px]">
      <div className="text-center font-pretendard text-4xl font-medium leading-relaxed">
        <p className="mb-4">
          자, 이번엔 <Highlight>few-shot</Highlight>
          이에요.
        </p>
        <p className="mb-4">
          이번엔 비어 있지 않은, <Highlight>조금 찬 샷</Highlight> 이라고
          생각해볼게요.
        </p>
        <p className="mb-4">
          <Highlight>few-shot</Highlight> 은 다음과 같이{" "}
          <Highlight>예시를 먼저 제시한 뒤</Highlight>
        </p>
        <p>
          <Highlight>그 패턴을 따라</Highlight> 새로운 결과를 만들어내는
          방식이에요.
        </p>
      </div>
    </div>
  );
};

export default Recipe2TutorialExplain;
