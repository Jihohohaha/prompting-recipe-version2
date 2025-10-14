// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe2TutorialExample.jsx
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import useGPTStudyStore from '../../../../../store';

const Recipe2TutorialExample = ({ recipeId, index }) => {
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

      {/* Section 12 */}
      <FadeSection>
        <Section12 />
      </FadeSection>

      {/* Section 13 - 버튼 포함 */}
      <FadeSection>
        <Section13 recipeId={recipeId} index={index} />
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
    <div className="w-full flex items-center justify-center">
        <div className="bg-[#FFC300] rounded-b-full w-[1200px] h-[400px] pt-16">
            <div className="text-center text-3xl font-pretendard leading-loose">
                <p>사람에게 "문제를 풀어봐"라고 할 때, 문제만 던지면 헷갈리잖아요.</p>
                <p>그런데 <span className="text-4xl font-extrabold">비슷한 문제 몇 개와 그 답</span> 을 같이 보여주면?</p>
                <p>"아 이런 식으로 풀면 되는구나" 하고 감을 잡을 수 있죠.</p>
                <p><span className="text-4xl font-extrabold">모델도 똑같습니다.</span></p>
            </div>
        </div>
    </div>
    );
};

// Section 2
const Section2 = () => {
  return (
    <div className="w-full flex items-center justify-center pt-24">
        <div className="text-center text-3xl font-pretendard leading-loose">
        <p>모델이 그 패턴을 따라 새로운 답을 생성합니다.</p>
        <p>프롬프트에 <span className="bg-[#FFC300] px-2 py-1 font-extrabold">작은 예시</span>를 넣어주면?</p>
        <p>모델이 그 패턴을 따라 새로운 답을 생성합니다.</p>
        <p className="bg-[#FFC300] inline-block px-2 font-extrabold">직접 보여드릴게요!</p>
        </div>
    </div>
    );
};

// Section 3
const Section3 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-32">
        {/* 상단 텍스트 */}
        <p className="text-3xl font-pretendard font-medium pb-24">
        먼저, GPT에게 이렇게 두 가지의 예시를 줘봤어요.
        </p>

        {/* 노란색 선 */}
        <div className="w-full h-0.5 bg-[#FFC300]"></div>

        {/* Example 1 */}
        <div className="w-full flex flex-col items-center gap-6 py-8">
            <h3 className="text-4xl font-semibold font-pretendard">Example 1</h3>
            <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold font-pretendard">I like cats</span>
                <span className="text-4xl font-semibold">→</span>
                <span className="text-4xl font-semibold font-pretendard">나는 고양이를 좋아해</span>
            </div>
        </div>

        {/* 노란색 이중선 */}
        <div className="w-full flex flex-col gap-8">
            <div className="w-full h-0.5 bg-[#FFC300]"></div>
            <div className="w-full h-0.5 bg-[#FFC300]"></div>
        </div>

        {/* Example 2 */}
        <div className="w-full flex flex-col items-center gap-6 py-8">
        <h3 className="text-4xl font-semibold font-pretendard">Example 2</h3>
        <div className="flex items-center gap-4">
            <span className="text-4xl font-semibold font-pretendard">I go to school</span>
            <span className="text-4xl font-semibold">→</span>
            <span className="text-4xl font-semibold font-pretendard">나는 학교에 간다.</span>
        </div>
        </div>

        {/* 하단 노란색 선 */}
        <div className="w-full h-0.5 bg-[#FFC300]"></div>
    </div>
    );
};

// Section 4
const Section4 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-36">
        {/* 상단 텍스트 */}
        <p className="text-3xl font-pretendard font-medium pb-24">
        그리고 문제를 냈죠.
        </p>

        {/* 노란색 박스 */}
        <div className="w-full bg-[#FFC300] border-t border-b border-black flex flex-col items-center py-12">
            
            <div className="flex justify-center w-full mb-8">
                <h3 className="text-5xl font-semibold font-pretendard">Question</h3>
            </div>

            <div className="flex items-center justify-start pl-52 w-full gap-12">
                
                {/* I love apples */}
                <span className="text-5xl font-semibold font-pretendard">I love apples</span>
                
                {/* 화살표 이미지 */}
                <img 
                    src="/images/gpt-study/few-shot/Arrow.png" 
                    alt="화살표" 
                    className="w-32 h-auto"
                />
                
                {/* 물음표 박스 */}
                <div className="w-[400px] h-[110px] bg-white border-2 border-black flex items-center justify-center">
                    <span className="text-5xl font-bold">?</span>
                </div>
                
            </div>
        </div>
        {/* 하단 텍스트 */}
        <p className="text-3xl font-medium font-pretendard pt-16">
        이런식으로요! 그러면 GPT는 아래와 같이 답변합니다.
        </p>
    </div>
    );
};

// Section 5
const Section5 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 5 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 6 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 7
const Section7 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 7 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 8
const Section8 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 8 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 9
const Section9 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 9 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 10
const Section10 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 10 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 11
const Section11 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 11 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 12
const Section12 = () => {
  return (
    <div className="w-full flex items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl">
        Section 12 - 여기에 내용이 들어갑니다
      </div>
    </div>
  );
};

// Section 13 - 버튼 포함
const Section13 = ({ recipeId, index }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { collapseContent, setActiveSection } = useGPTStudyStore();

  const handleChatTabOpen = () => {
    console.log("💬 Opening Chat tab with smooth collapse");
    
    // 1. Section 시작점으로 스크롤
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // 2. 약간의 딜레이 후 접기 & Chat 탭 열기
    setTimeout(() => {
      collapseContent();
      setActiveSection(recipeId - 1);
      
      // 3. 애니메이션이 끝난 후 Chat 탭으로 URL 변경 (1.2초 후)
      setTimeout(() => {
        navigate(`/gpt-study/${slug}/chat`);
      }, 1200);
    }, 300);
  };

  const handleCloseTutorial = () => {
    console.log("🔼 Closing Tutorial with smooth collapse");
    
    // 1. Section 시작점으로 스크롤
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="w-full flex flex-col items-center justify-center py-24">
      <div className="text-center font-pretendard text-xl mb-12">
        Section 13 - 여기에 내용이 들어갑니다
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center justify-center gap-6">
        {/* Chat 탭 열기 버튼 */}
        <button
          onClick={handleChatTabOpen}
          className="px-8 py-4 bg-[#FE7525] text-white font-bold text-lg font-pretendard rounded-lg hover:bg-[#FF9E4A] transition-all duration-300"
        >
          CHAT 탭 열기
        </button>

        {/* Tutorial 접기 버튼 */}
        <button
          onClick={handleCloseTutorial}
          className="px-8 py-4 bg-gray-700 text-white font-bold text-lg font-pretendard rounded-lg hover:bg-gray-600 transition-all duration-300"
        >
          TUTORIAL 접기
        </button>
      </div>
    </div>
  );
};

export default Recipe2TutorialExample;