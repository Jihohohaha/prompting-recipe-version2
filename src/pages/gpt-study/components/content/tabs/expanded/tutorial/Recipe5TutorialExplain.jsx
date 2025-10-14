import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Recipe5TutorialExplain = () => {
  return (
    <div className="bg-white">
      {/* Section 1: 헤더 */}
      <FadeSection>
        <SectionHeader />
      </FadeSection>

      {/* Section 2: 상단 얇은 구분선 */}
      <FadeSection>
        <SectionDivider />
      </FadeSection>
    </div>
  );
};

// Fade Section Wrapper (공통)
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

// Section 1: 헤더 (R.A.G 버전)
const SectionHeader = () => {
  return (
    <div className="w-full bg-white">
      {/* 상단 라인 구조 */}
      <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
        {/* 왼쪽 텍스트 */}
        <div className="font-mortend text-3xl font-black tracking-[0.25em]">
          ( R.A.G )
        </div>

        {/* 가운데 얇은 선 */}
        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[1px] bg-black/50"></span>
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="font-koolegant text-3xl tracking-wide">RECIPE 5.</div>
      </div>

      {/* 하단 전체 가로선 */}
      <div className="border-b border-black mt-[12px]"></div>
    </div>
  );
};

// Section 2: 구분선 (선택)
const SectionDivider = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[24px] pb-[70px]">
      <div className="w-[1408px] h-[2px] bg-black"></div>
    </div>
  );
};

export default Recipe5TutorialExplain;
