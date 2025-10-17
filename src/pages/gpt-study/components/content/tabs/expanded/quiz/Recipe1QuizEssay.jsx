// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";


const Recipe1QuizEssay = () => {
  return (
    <div className="bg-white">
      {/* Section 1: 헤더 */}
        <SectionHeader />
    </div>
  );
}

// Section 1: 헤더
const SectionHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-[48px] pt-[48px]">
      {/* (ROLE) */}
      <div className="font-mortend text-3xl font-black">( ROLE <br /> PROMPTING)</div>

      {/* 너비가 긴 선 */}
      <div className="flex-1 mx-[20px]">
        <span className="block w-full h-[2px] bg-black"></span>
      </div>

      {/* RECIPE 1. */}
      <div className="font-koolegant text-4xl">RECIPE 1.</div>
    </div>
  );
};
export default Recipe1QuizEssay;