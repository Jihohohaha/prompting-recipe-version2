// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe3TutorialExample.jsx
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useGPTStudyStore from "../../../../../store";
import { useState, useEffect } from "react";

const Recipe3TutorialExample = ({ recipeId, index }) => {
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
    <div className="text-black w-full flex items-center justify-center">
      <div className="bg-[#87CA34] rounded-b-full w-[1200px] h-[400px] pt-10">
        <div className="text-center text-3xl font-pretendard leading-loose">
          <p>사람도 모를 때</p>
          <p>
            <span className="text-4xl font-extrabold">
              "음... 아마 이럴걸?"
            </span>{" "}
            하고
          </p>
          <p>대충 지어내는 경우가 있죠.</p>
          <p>
            모델도 헷갈리면{" "}
            <span className="text-4xl font-extrabold">자신 있게 틀린 말</span>을
            하는데,
          </p>
          <p>
            이걸 <span className="text-4xl font-extrabold">hallucination</span>
            이라고 합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// Section 2
const Section2 = () => {
  return (
    <div className="w-full flex items-center justify-center pt-[300px]">
      <div className="text-center text-4xl font-pretendard leading-loose">
        <p>
          <span className="bg-[#87CA34] px-2 py-1 font-extrabold">
            어떻게 예방할까요?
          </span>
        </p>
        <p className="pt-20 text-black font-semibold">
          아래 프롬프트를 추가하면 hallucination을 예방할 수 있어요!
        </p>
      </div>
    </div>
  );
};

// Section 3
const Section3 = () => {
  return (
    <div className="text-black w-full flex flex-col items-center justify-center pt-32">
      {/* 상단 텍스트 */}
      {/* 노란색 선 */}
      <div className="w-full h-0.5 bg-[#87CA34]"></div>
      {/* Example 1 */}
      <div className="w-full flex flex-col items-center gap-6 py-8">
        <h3 className="text-4xl font-semibold font-pretendard pb-8">
          Instruction 1
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-pretendard">
            아는 범위 내에서만 답변해. 모르면 모른다고 해.
          </span>
        </div>
      </div>
      {/* 버튼 영역 제거: '다른 레시피 더 알아보기' 삭제 per request */}
    </div>
  );
};

// Section 4
const Section4 = () => {
  return (
    <div className="text-black w-full flex flex-col items-center justify-center pt-36">
      {/* 상단 텍스트 */}
      <p className="text-4xl font-pretendard font-bold pb-10">GPT의 답변</p>

      {/* 노란색 박스 */}
      <div className="mb-10 w-[80%] bg-[#87CA34] border-r border-l border-t border-b border-black flex flex-col items-center py-8">
        <div className="text-5xl flex items-center justify-center w-full font-pretendard">
          {/* I love apples */}대한민국의 초대 대통령은 이승만 입니다.
        </div>
      </div>
      {/* 하단 텍스트 */}
      <div className="w-[80%] bg-[#b0dc79] border-r border-l border-t border-b border-black flex flex-col items-center py-8">
        <div className="font-semibold text-4xl flex items-center justify-center w-full font-pretendard pb-7">
          {/* I love apples */}출처
        </div>
        <div className="text-3xl flex items-center justify-center w-full font-pretendard pb-5">
          {/* I love apples */}
          대한민국 국가상징 포털, 「대한민국 역대 대통령」, 행정안전부
        </div>
        <div className="text-3xl flex items-center justify-center w-full font-pretendard">
          국사편찬위원회, 「한국사데이터베이스」, ‘이승만(李承晩)’ 항목
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
        src="/images/gpt-study/hallucination/suksangmsg.png"
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
      <p className="text-4xl font-medium mb-10">정리하자면,</p>
      <p className="text-4xl font-medium mb-10">
        hallucination은 모델이 실제로 존재하지 않거나
      </p>
      <p className="text-5xl font-bold mb-10">
        틀린 정보를 그럴듯하게 말하는 현상이에요.
      </p>
      <p className="text-4xl font-medium mb-10">
        사용자가 그 정보를 믿고 활용하게 되면,
      </p>
      <p className="text-4xl font-medium mb-10">
        잘못된 학습이나 오해가 이어지고
      </p>
      <p className="text-4xl font-medium">
        결과적으로 <span className="text-5xl font-bold">지식의 왜곡</span>이
        발생할 수 있어요.
      </p>
      <img
        src="/images/gpt-study/hallucination/linestar.png"
        alt="Apple Statue"
        className="relative"
        style={{ top: "-80px" }}
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
    <div className="text-black w-full flex flex-col justify-center pt-48 px-6">
      {/* 제목 */}
      <p className="flex items-left px-12 text-3xl mb-4 font-pretendard pb-8">
        정리하자면!
        <span className="font-bold font-pretendard mx-2"> Hallucination</span>은
      </p>

      {/* 탭 + 박스 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div className="h-14 w-60 bg-[#87CA34] rounded-t-2xl border-x border-t border-black"></div>
        {/* 메인 박스 */}
        <div className="flex flex-col items-center justify-center leading-extra-loose bg-[#87CA34] py-20 px-2 rounded-b-2xl border-2 border-black shadow-lg font-pretendard">
          {/* 1. Hallucination은 잘못된 학습 및 이해를 유발하고 */}
          <p className="text-3xl font-medium mb-10">
            Hallucination은{" "}
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              잘못된 학습 및 이해
            </div>
            를 유발하고
          </p>

          {/* 2. 사실 확인을 위해 추가 검증을 해야 하는 번거로움이 발생합니다. */}
          <p className="text-3xl font-medium mb-10">
            사실 확인을 위해
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              추가 검증
            </div>
            을 해야하는 번거로움이 발생합니다.
          </p>

          {/* 3. 이런 현상을 줄이기 위해 "모르면 모른다고 말하기" */}
          <p className="text-3xl font-medium mb-10">
            이런 현상을 줄이기 위해
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              "모르면 모른다고 말하기"
            </div>
          </p>

          {/* 4. "출처를 명시하기" 같은 제한을 두는 게 중요해요. */}
          <p className="text-3xl font-medium">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              "출처를 명시하기"
            </div>
            같은 제한을 두는 게 중요해요.
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
      <div className="flex justify-center mt-16">
        <img
          src="/images/gpt-study/hallucination/spoongroup.png"
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
        src="/images/gpt-study/hallucination/FirstLine2.png"
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
        src="/images/gpt-study/hallucination/SecondLine2.png"
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
        src="/images/gpt-study/hallucination/Star.png"
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
        src="/images/gpt-study/hallucination/Star.png"
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
          어때요? <span className="font-bold text-4xl">Hallucination</span> 에
          대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만{" "}
          <span className="underline underline-offset-8 decoration-[#87CA34] decoration-2">
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
          className="text-black bg-[#87CA34] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard hover:bg-[#609C17] transition-colors"
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
      {/* 버튼 영역 제거: '다른 레시피 더 알아보기' 삭제 per request */}
    </div>
  );
};

export default Recipe3TutorialExample;
