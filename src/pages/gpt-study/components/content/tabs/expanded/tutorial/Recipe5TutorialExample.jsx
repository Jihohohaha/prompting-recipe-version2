// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe5TutorialExample.jsx
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useGPTStudyStore from "../../../../../store";
import { useState, useEffect } from "react";

const Recipe5TutorialExample = ({ recipeId, index }) => {
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

      {/* Section B */}
      <FadeSection>
        <SectionB />
      </FadeSection>

      {/* Section 3 */}
      <FadeSection>
        <Section3 />
      </FadeSection>

      {/* Section 4 */}
      <FadeSection>
        <Section4 />
      </FadeSection>

      {/* Section A*/}
      <FadeSection>
        <SectionA />
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
        <Section12 recipeId={recipeId} index={index} />
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
    <div className="text-white w-full flex items-center justify-center">
      <div className="bg-[#0278ED] rounded-b-full w-[1200px] h-[400px] pt-10">
        <div className="text-center text-3xl font-pretendard leading-loose">
          <p className="font-semibold">
            1. 질문을 검색기에 던져서 실제 최신 기사나 DB 정보를 가져옴
          </p>
          <p className="font-semibold">
            2. 그 내용을 바탕으로 요약하거나 설명 생성{" "}
          </p>
          <p className="mb-10">위의 두가지를 GPT에게 지시하면 됩니다. </p>
          <p>
            <span className="font-bold text-4xl">
              지시를 받은 GPT는
              <br />
              퓨전 요리를 시작하죠.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[50px]">
      <div className="text-center text-4xl font-pretendard leading-loose">
        <p>
          <span className="text-white bg-[#0278ED] px-2 py-1 font-extrabold">
            직접 보여드릴게요!
          </span>
        </p>
      </div>
    </div>
  );
};

// Section B
const SectionB = () => {
  return (
    <div className="text-white w-full flex flex-col items-center justify-center pt-36">
      {/* 상단 텍스트 */}

      {/* 노란색 박스 */}
      <div className="mb-10 w-[100%] bg-[#0278ED] flex flex-col items-center py-10">
        {/* Template (중앙 정렬 유지) */}
        <div className="text-4xl font-semibold w-full text-center font-pretendard mb-10">
          Description1
        </div>

        {/* 나머지 텍스트 (왼쪽 정렬 및 간격 조정) */}
        <div className="text-4xl w-[80%] font-pretendard text-left">
          <p className="mb-6">
            1. 질문을 검색기에 던져서 실제 최신 기사나 DB 정보를 가져와.
          </p>
        </div>
      </div>
      <div className="mb-10 w-[100%] bg-[#0278ED] flex flex-col items-center py-10">
        {/* Template (중앙 정렬 유지) */}
        <div className="text-4xl font-semibold w-full text-center font-pretendard mb-10">
          Description2
        </div>

        {/* 나머지 텍스트 (왼쪽 정렬 및 간격 조정) */}
        <div className="text-4xl w-[80%] font-pretendard text-left">
          <p className="mb-6">
            2. 그 내용을 바탕으로 요약하거나 설명을 생성해줘.
          </p>
        </div>
      </div>
      <p className="text-black text-3xl font-medium">그리고 문제를 냈죠.</p>
    </div>
  );
};

// Section 3
const Section3 = () => {
  return (
    <div className="text-black w-full flex flex-col items-center justify-center pt-[200px]">
      {/* 상단 텍스트 */}
      {/* 노란색 선 */}
      <div className="w-full h-0.5 bg-[#0278ED]"></div>
      {/* Example 1 */}
      <div className="w-full flex flex-col items-center gap-6 py-8">
        <h3 className="text-4xl font-semibold font-pretendard pb-8">
          Question
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-black text-4xl font-pretendard">
            2025년 노벨 화학상 수상자는 누구야?
          </span>
        </div>
      </div>
      {/* 노란색 이중선 */}
      <div className="w-full flex flex-col gap-8">
        <div className="w-full h-0.5 bg-[#0278ED]"></div>
      </div>
      <p className="text-3xl font-medium pt-20">
        이런식으로요! 그러면 GPT는 아래와 같이 답변합니다.
      </p>
    </div>
  );
};

// Section 4
const Section4 = () => {};

const SectionA = () => {
  return (
    <div className="text-white w-full flex flex-col items-center justify-center pt-[300px]">
      <div className="text-black mb-10 text-4xl font-semibold">GPT의 답변</div>
      <div className="mb-10 w-[82%] bg-[#267343] border border-black flex flex-col items-center py-8">
        {/* Template (중앙 정렬 유지) */}
        {/* 나머지 텍스트 (왼쪽 정렬 및 간격 조정) */}
        <div className="text-4xl font-semibold w-[80%] font-pretendard text-center">
          <p>2025년 노벨 화학상은 A와 B에게 수여되었습니다.</p>
        </div>
      </div>
    </div>
  );
};
// Section 5
const Section5 = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  useEffect(() => {
    const animationCycle = () => {
      setShowAnimation(false);

      setTimeout(() => {
        setShowAnimation(true); // 그 다음 true
      }, 100);
      // 6초 후 모든 애니메이션 요소 사라짐

      setTimeout(() => {
        setShowAnimation(false);
      }, 6000);

      // 0.1초 후 다시 시작
      setTimeout(() => {
        setCycleCount((prev) => prev + 1);
        animationCycle();
      }, 6100);
    };

    animationCycle();

    // cleanup
    return () => {};
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[50px]">
      <img
        src="/images/gpt-study/rag/suksangr.png"
        alt="Apple Statue"
        className="relative"
        style={{}}
      />
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="flex flex-col items-center text-center font-pretendard text-black">
      <p className="text-4xl font-medium mb-10">정리하자면,</p>
      <p className="text-4xl font-medium mb-10">
        RAG는 검색, 언어모델 조합으로,
      </p>
      <p className="text-4xl font-medium mb-10">
        <span className="bg-[#0278ED] px-2 py-1 font-extrabold text-white">
          모델 답변의 정확성
        </span>
        을 올려주는 기술이에요.
      </p>
      <br />
      <br />
      <br />
      <p className="text-4xl mb-10 font-medium">
        기억에 의존해서 답변하는 것이 아닌,
      </p>
      <p className="text-4xl font-medium">
        <span className="text-5xl font-bold">실제 문서 기반 </span> 답변을
        제공합니다.
      </p>
      <img
        src="/images/gpt-study/rag/linestarr.png"
        alt="Apple Statue"
        className="relative"
        style={{ top: "-120px" }}
      />
    </div>
  );
};

// Section 7
const Section7 = () => {};

// Section 8
const Section8 = () => {};

const Section9 = () => {
  return (
    <div className="text-black w-full flex flex-col justify-center px-6 font-medium pt-[200px]">
      {/* 제목 */}
      <p className="flex items-left px-12 text-4xl mb-4 font-pretendard pb-8">
        정리하자면! <span className="font-bold font-pretendard mx-2"> RAG</span>
        는
      </p>

      {/* 폴더 전체 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div
          className="h-14 w-60 rounded-t-2xl border-x border-t border-[#6DA9E4]"
          style={{
            background: "linear-gradient(135deg, #B8D7F5 0%, #DCEAFB 100%)",
            boxShadow:
              "inset 0 3px 6px rgba(255,255,255,0.6), inset 0 -3px 10px rgba(120,160,200,0.3)",
          }}
        ></div>

        {/* 메인 박스 */}
        <div
          className="text-4xl text-[#1C1C1C] flex flex-col items-center justify-center leading-extra-loose py-20 px-6 rounded-b-3xl border-2 border-[#6DA9E4] shadow-lg font-pretendard relative overflow-hidden"
          style={{
            background: `
              linear-gradient(180deg, #BBD8F7 0%, #D8E9FB 100%)
            `,
            boxShadow: `
              inset 0 4px 10px rgba(255,255,255,0.4),
              inset 0 -5px 12px rgba(80,120,170,0.2),
              0 10px 25px rgba(0,0,0,0.08)
            `,
          }}
        >
          {/* 🎨 불규칙한 질감 (CSS 노이즈 + 블렌드모드) */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
            style={{
              background: `
                repeating-radial-gradient(circle at 20% 40%, rgba(255,255,255,0.5) 0px, transparent 3px, rgba(0,0,0,0.02) 4px, transparent 7px),
                repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(0,0,0,0.05) 2px, transparent 3px, rgba(255,255,255,0.05) 4px)
              `,
              filter: "blur(0.5px) contrast(105%) brightness(102%)",
            }}
          ></div>

          {/* 📝 텍스트 */}
          <p className="font-medium mb-10 text-center relative z-10">
            <span className="text-black bg-white font-bold text-4xl p-1 inline-block mx-1">
              검색을 기반
            </span>{" "}
            으로 레시피를 작성하는 기술이에요.
          </p>

          <p className="font-medium mb-10 text-center relative z-10">
            장점은{" "}
            <span className="text-black bg-white font-bold text-4xl p-1 inline-block mx-1">
              최신성과 신뢰성 확보
            </span>{" "}
            가 가능하지만
          </p>

          <p className="font-medium mb-10 text-center relative z-10">
            단점은{" "}
            <span className="text-black bg-white font-bold text-4xl p-1 inline-block mx-1">
              검색의 품질과 정확도
            </span>{" "}
            에 따라
          </p>

          <p className="font-medium text-center relative z-10">
            <span className="text-black bg-white font-bold text-4xl p-1 inline-block mx-1">
              성능이 좌우
            </span>{" "}
            된다는 점이에요.
          </p>
        </div>
      </div>
    </div>
  );
};

// Section 10
const Section10 = () => {
  return (
    <>
      {/* YellowFewShot 이미지 */}
      <div className="flex justify-center mt-40">
        <img
          src="/images/gpt-study/rag/mang.png"
          alt="Yellow Few Shot"
          style={{}}
        />
      </div>
    </>
  );
};

// Section 11
const Section11 = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleGoToChat = () => {
    navigate(`/gpt-study/${slug}/chat`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-72 relative">
      {/* FirstLine2 */}
      <img
        src="/images/gpt-study/rag/left.png"
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
        src="/images/gpt-study/rag/right.png"
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
        src="/images/gpt-study/rag/star.png"
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
        src="/images/gpt-study/rag/star.png"
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
      <div className="font-semibold text-black text-3xl font-pretendard leading-[2.5] text-center z-10">
        <p className="md-20">
          어때요? <span className="font-bold text-4xl">RAG</span> 에 대해 이제
          감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#0278ED] ">
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
          className="bg-[#0278ED] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard hover:bg-[#66B3FF] transition-colors"
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

// Section 12
const Section12 = ({ recipeId, index }) => {
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
          src="/images/gpt-study/rag/tri.png"
          alt="Triangle"
          style={{
            width: "40px",
            height: "35px",
          }}
        />

        {/* Tutorial 접기 버튼 */}
        <button
          onClick={handleCloseTutorial}
          className="bg-[#0278ED] border-2 border-black text-black mt-2 py-4 px-96 text-3xl font-medium font-pretendard"
        >
          다른 레시피 더 알아보기
        </button>
      </div>
    </div>
  );
};

export default Recipe5TutorialExample;
