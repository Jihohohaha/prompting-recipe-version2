// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe4TutorialExample.jsx
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useGPTStudyStore from "../../../../../store";
import { useState, useEffect } from "react";

const Recipe4TutorialExample = ({ recipeId, index }) => {
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
      <div className="bg-[#29D069] rounded-b-full w-[1200px] h-[400px] pt-10">
        <div className="text-center text-3xl font-pretendard leading-loose">
          <p>말을 아무렇게나 풀어놓으면 지저분해 보일 때가 많습니다.</p>
          <p>
            그런데{" "}
            <span className="text-4xl font-extrabold">
              "항목을 꼭 리스트로 써"
            </span>{" "}
          </p>
          <p>
            혹은 <span className="text-4xl font-extrabold">"표로 정리해"</span>
            라고 말해주면
          </p>
          <p>훨씬 읽기 편하죠.</p>
          <p>모델도 마찬가지예요.</p>
        </div>
      </div>
    </div>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[100px]">
      <div className="text-center text-4xl font-pretendard leading-loose">
        <p>
          <span className="bg-[#29D069] px-2 py-1 font-extrabold">
            직접 보여드릴게요!
          </span>
        </p>
      </div>
    </div>
  );
};

// Section 3
const Section3 = () => {
  return (
    <div className="text-black w-full flex flex-col items-center justify-center pt-[200px]">
      {/* 상단 텍스트 */}
      {/* 노란색 선 */}
      <div className="w-full h-0.5 bg-[#29D069]"></div>
      {/* Example 1 */}
      <div className="w-full flex flex-col items-center gap-6 py-8">
        <h3 className="text-4xl font-semibold font-pretendard pb-8">
          Question
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-pretendard">
            아래 템플릿 형식으로 맛집 추천을 작성해줘.
          </span>
        </div>
      </div>
      {/* 노란색 이중선 */}
      <div className="w-full flex flex-col gap-8">
        <div className="w-full h-0.5 bg-[#29D069]"></div>
      </div>
      <p className="text-3xl font-medium pt-20">지시 후 템플릿을 입력합니다.</p>
    </div>
  );
};

// Section 4
const Section4 = () => {
  return (
    <div className="text-black w-full flex flex-col items-center justify-center pt-36">
      {/* 상단 텍스트 */}

      {/* 노란색 박스 */}
      <div className="mb-10 w-[80%] bg-[#29D069] border border-black flex flex-col items-center py-8">
        {/* Template (중앙 정렬 유지) */}
        <div className="text-4xl font-semibold w-full text-center font-pretendard mb-10">
          Template
        </div>

        {/* 나머지 텍스트 (왼쪽 정렬 및 간격 조정) */}
        <div className="text-4xl font-semibold w-[80%] font-pretendard text-left">
          <p className="mb-6">추천 맛집</p>
          <p className="mb-6">위치:</p>
          <p className="mb-6">추천 메뉴:</p>
          <p className="mb-6">가격대:</p>
          <p className="mb-6">특징:</p>
          <p className="mb-0">-&gt; 답:</p>
        </div>
      </div>
      <p className="text-3xl font-medium">
        이런식으로요! 그러면 GPT는 아래와 같이 답변합니다.
      </p>
    </div>
  );
};

const SectionA = () => {
  return (
    <div className="text-white w-full flex flex-col items-center justify-center pt-36">
      <div className="mb-10 w-[80%] bg-[#267343] border border-black flex flex-col items-center py-8">
        {/* Template (중앙 정렬 유지) */}

        {/* 나머지 텍스트 (왼쪽 정렬 및 간격 조정) */}
        <div className="text-4xl font-semibold w-[80%] font-pretendard text-left">
          <p className="mb-12">추천 맛집을 알려드릴게요!</p>
          <p className="mb-6">위치: 홍대</p>
          <p className="mb-6">추천 메뉴: 수제버거</p>
          <p className="mb-6">가격대: 1만~2만원</p>
          <p className="mb-6">특징: 분위기 좋은 감성 카페</p>
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
    <div className="w-full flex flex-col items-center justify-center pb-56 gap-8">
      <img
        src="/images/gpt-study/markdown/statuecookie.png"
        alt="Apple Statue"
        className="relative"
        style={{
          top: "123px",
        }}
      />
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="flex flex-col items-center text-center font-pretendard text-black">
      <p className="text-4xl font-medium mb-10">
        Markdown Template은 모델 답변을 포맷팅하고
      </p>
      <p className="text-4xl font-medium mb-10">
        일관되게 정리하는 데{" "}
        <span className="bg-[#29D069] px-2 py-1 font-extrabold text-white">
          최고의 도구
        </span>
        예요.
      </p>
      <p className="text-4xl font-medium mb-10">
        MARKDOWN 이라는 틀을 사용하면
      </p>
      <p className="text-4xl font-medium">
        반죽이 깔끔하게 정리되어{" "}
        <span className="text-5xl font-bold">보기 좋고 일관성 있게</span>{" "}
        나와요.
      </p>
      <img
        src="/images/gpt-study/markdown/linestarm.png"
        alt="Apple Statue"
        className="relative"
        style={{ top: "-140px" }}
      />
    </div>
  );
};

// Section 7
const Section7 = () => {};

// Section 8
const Section8 = () => {};

// Section 9
const Section9 = () => {
  return (
    <div className="text-black w-full flex flex-col justify-center px-6">
      {/* 제목 */}
      <p className="flex items-left px-12 text-3xl mb-4 font-pretendard pb-8">
        정리하자면!
        <span className="font-bold font-pretendard mx-2">
          {" "}
          Markdown Template
        </span>
        은
      </p>

      {/* 탭 + 박스 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div className="h-14 w-60 bg-[#29D069] rounded-t-2xl border-x border-t border-black"></div>
        {/* 메인 박스 */}
        <div className="flex flex-col items-center justify-center leading-extra-loose bg-[#29D069] py-20 px-2 rounded-b-2xl border-2 border-black shadow-lg font-pretendard">
          {/* 1. Hallucination은 잘못된 학습 및 이해를 유발하고 */}
          <p className="text-3xl font-medium mb-10">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              틀을 미리 만들어두고{" "}
            </div>
            그 안에 내용을 채워 넣는 과정이에요.
          </p>

          {/* 2. 사실 확인을 위해 추가 검증을 해야 하는 번거로움이 발생합니다. */}
          <p className="text-3xl font-medium mb-10">
            장점은
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              깔끔하고 보기 좋게{" "}
            </div>
            답변을 출력할 수 있습니다.
          </p>

          {/* 3. 이런 현상을 줄이기 위해 "모르면 모른다고 말하기" */}
          <p className="text-3xl font-medium mb-10">
            대신, 템플릿을 너무 억지로 유도하면{" "}
          </p>

          {/* 4. "출처를 명시하기" 같은 제한을 두는 게 중요해요. */}
          <p className="text-3xl font-medium">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              자연스러운 표현
            </div>
            이 줄어들 수도 있어요.
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
          src="/images/gpt-study/markdown/set.png"
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
        src="/images/gpt-study/markdown/left.png"
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
        src="/images/gpt-study/markdown/right.png"
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
        src="/images/gpt-study/markdown/mstar.png"
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
        src="/images/gpt-study/markdown/mstar.png"
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
          어때요? <span className="font-bold text-4xl">Markdown Template</span>{" "}
          에 대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#29D069] ">
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
          className="text-black bg-[#29D069] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard hover:bg-[#29A95A] transition-colors"
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
          src="/images/gpt-study/markdown/mtriangle.png"
          alt="Triangle"
          style={{
            width: "40px",
            height: "35px",
          }}
        />

        {/* Tutorial 접기 버튼 */}
        <button
          onClick={handleCloseTutorial}
          className="bg-[#29D069] border-2 border-black text-black mt-2 py-4 px-96 text-3xl font-medium font-pretendard"
        >
          다른 레시피 더 알아보기
        </button>
      </div>
    </div>
  );
};

export default Recipe4TutorialExample;
