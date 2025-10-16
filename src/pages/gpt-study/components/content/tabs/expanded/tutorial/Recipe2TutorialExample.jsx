// src/pages/gpt-study/components/content/tabs/expanded/tutorial/Recipe2TutorialExample.jsx
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import useGPTStudyStore from '../../../../../store';
import {useState, useEffect} from 'react';

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
        setCycleCount(prev => prev + 1);
        animationCycle();
      }, 6100);
    };

    animationCycle();
    
    // cleanup
    return () => {};
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-40 pb-56 gap-8">
      {/* 1. GPT의 답변 */}
      <div className="text-4xl font-semibold font-pretendard">
        GPT의 답변
      </div>

      {/* 2. 답변 박스 */}
      <div className="bg-[#FFC300] border-2 border-black px-48 py-6 text-5xl font-semibold font-pretendard">
        나는 사과를 좋아한다
      </div>

      {/* 3. 애니메이션 영역 */}
      <div className="relative w-[2068px] h-[459px] mt-12">
        {/* 애니메이션 요소들 - clip-path wipe */}
        {showAnimation && (
          <>
            {/* FirstLine */}
            <motion.img
              key="firstline"
              src="/images/gpt-study/few-shot/FirstLine.png"
              alt="First Line"
              className="absolute"
              style={{
                left: '450px',
                top: '200px',
                width: '280px',
                height: '269px'
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* SecondLine */}
            <motion.img
              key="secondline"
              src="/images/gpt-study/few-shot/SecondLine.png"
              alt="Second Line"
              className="absolute"
              style={{
                left: '1736px',
                top: '-100px',
                width: '712px',
                height: '617px',
                transform: 'rotate(-188.26deg)',
                transformOrigin: 'left center'
              }}
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            />

            {/* 짧은 선 1 */}
            <motion.div
              key="line1"
              className="absolute bg-[#FFC300] rounded"
              style={{
                left: '1123px',
                top: '95px',
                width: '60px',
                height: '7px',
                transform: 'rotate(35deg)',
                transformOrigin: 'left center'
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
            />

            {/* 짧은 선 2 */}
            <motion.div
              key="line2"
              className="absolute bg-[#FFC300] rounded"
              style={{
                left: '1197px',
                top: '30px',
                width: '60px',
                height: '7px',
                transform: 'rotate(60deg)',
                transformOrigin: 'left center'
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 0.5, delay: 3, ease: "easeOut" }}
            />

            {/* 짧은 선 3 */}
            <motion.div
              key="line3"
              className="absolute bg-[#FFC300] rounded"
              style={{
                left: '1333px',
                top: '23px',
                width: '60px',
                height: '7px',
                transform: 'rotate(120deg)',
                transformOrigin: 'left center'
              }}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 0.5, delay: 3.5, ease: "easeOut" }}
            />
          </>
        )}

        {/* 고정 이미지들 */}
        <img
          src="/images/gpt-study/few-shot/HeartApple.png"
          alt="Heart Apple"
          className="absolute"
          style={{
            left: '497px',
            top: '0px',
            width: '406px',
            height: '406px'
          }}
        />
        
        <img
          src="/images/gpt-study/few-shot/AppleStatue.png"
          alt="Apple Statue"
          className="absolute"
          style={{
            left: '634px',
            top: '123px',
            width: '535px',
            height: '590px'
          }}
        />
        
        <img
          src="/images/gpt-study/few-shot/EatenApple.png"
          alt="Eaten Apple"
          className="absolute"
          style={{
            left: '857px',
            top: '68px',
            width: '910px',
            height: '593px'
          }}
        />
      </div>
    </div>
  );
};

// Section 6
const Section6 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-32 pb-32 gap-6">
      {/* 1. 아까랑 뭐가 다르냐고요? */}
      <div className="text-3xl font-pretendard">
        아까랑 뭐가 다르냐고요?
      </div>

      {/* 2. 여기서는 예시 2개를 주니, */}
      <div className="text-3xl font-pretendard">
        여기서는 예시 2개를 주니,
      </div>

      {/* 3. 모델이 패턴을 학습해서... */}
      <div className="text-3xl font-pretendard">
        <span className="bg-[#FFC300] px-0 py-1 text-4xl font-bold">
          모델이 패턴을 학습해서 비슷하게 번역
        </span>{' '}
        한 거예요.
      </div>
    </div>
  );
};

// Section 7
const Section7 = () => {
  return (
    <div className="w-full h-[700px] flex items-center justify-center bg-[#FFC300]">
      <div className="rounded-full w-[600px] h-[600px] bg-white flex items-center justify-center font-pretendard text-3xl">
        <div className="text-center p-8 leading-loose">
          <span className="font-extrabold underline underline-offset-8 decoration-[#FFC300] decoration-4 text-4xl"> few-shot </span>이 더 좋은 이유는 <br />
          모델이 단순히 문맥만 추론하는 게 아니라<br />
          예시를 통해 “이런 식으로 대답하면 된다”는<br />
          <span className="font-extrabold underline underline-offset-8 decoration-[#FFC300] decoration-4 text-4xl">규칙과 형식</span>
          <span className="underline underline-offset-8 decoration-[#FFC300] decoration-4">을 </span>
          <span className="font-extrabold underline underline-offset-8 decoration-[#FFC300] decoration-4 text-4xl">학습</span>
          하기 때문이에요.
        </div>
      </div>
    </div>
  );
};

// Section 8
const Section8 = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-32 relative">
      {/* Vector 1 - 상단 */}
      <motion.img
        src="/images/gpt-study/few-shot/Vector.png"
        alt="Vector 1"
        className="absolute"
        style={{
          left: '300px',
          top: '50px',
          width: '45px',
          height: '65px'
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 1. 텍스트 */}
      <div className="text-3xl font-pretendard text-center">
        그래서 <span className="text-4xl font-extrabold">정답률이 높고, 결과의 일관성</span> 이 유지돼요.
      </div>

      {/* 2. Underline */}
      <img
        src="/images/gpt-study/few-shot/Underline.png"
        alt="Underline"
        className="w-full mt-[-30px]"
        style={{ height: '50px' }}
      />

      {/* Vector 2 - 하단 */}
      <motion.img
        src="/images/gpt-study/few-shot/Vector.png"
        alt="Vector 2"
        className="absolute"
        style={{
          right: '350px',
          bottom: '-80px',
          width: '45px',
          height: '65px'
        }}
        animate={{ rotateY: [0, -360] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Section 9
const Section9 = () => {
  return (
    <div className="w-full flex flex-col justify-center pt-48 px-6">
      {/* 제목 */}
      <p className="flex items-left px-12 text-3xl mb-4 font-pretendard pb-8">
        정리하자면!<span className='font-bold font-pretendard mx-2'> few-shot </span>   은
      </p>

      {/* 탭 + 박스 */}
      <div className="relative w-full px-12">
        {/* 상단 탭 */}
        <div className="h-14 w-60 bg-[#FFC300] rounded-t-2xl border-x border-t border-black"></div>
        {/* 메인 박스 */}
        <div className="flex flex-col items-center justify-center leading-extra-loose bg-[#FFC300] py-20 px-2 rounded-b-2xl border-2 border-black shadow-lg font-pretendard">
          {/* 1. 예시 몇 개를 보여주고 문제를 풀게 하는 방법 부분 */}
          <p className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              예시 몇 개를 보여주고 문제를 풀게 하는 방법
            </div>
            이에요.
          </p>
          {/* 2. 장점은 / 규칙을 따르게 만들기 쉽고 부분 */}
          <p className="text-3xl font-semibold mb-6">
            장점은 
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              규칙을 따르게 만들기 쉽고
            </div>
          </p>
          
          <p className="text-3xl font-semibold mb-6">
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              원하는 형식을 잘 지키는 거
            </div>
            예요.
          </p>
          
          {/* 3. 대신, / 예시를 잘못 주면 부분 */}
          <p className="text-3xl font-semibold mb-6">
            대신, 
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              예시를 잘못 주면
            </div>
            모델이
          </p>

          {/* 4. 패턴을 그대로 따라가서 오답 부분 */}
          <p className="text-3xl font-semibold">
            그 
            <div className="bg-white font-bold text-4xl p-1 inline-block mx-1">
              패턴을 그대로 따라가서 오답
            </div>
            이 나올 수도 있죠.
          </p>
        </div>
      </div>
    </div>
  );
};

// Section 10
const Section10 = () => {
  return (
    <>{/* YellowFewShot 이미지 */}
      <div className="flex justify-center mt-16">
        <img
          src="/images/gpt-study/few-shot/YellowFewShot.png"
          alt="Yellow Few Shot"
          style={{
            width: '550px',
            height: '550px'
          }}
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
        src="/images/gpt-study/few-shot/FirstLine2.png"
        alt="First Line 2"
        className="absolute"
        style={{
          left: '0px',
          top: '120px',
          width: '310px',
          height: '250px'
        }}
      />

      {/* SecondLine2 */}
      <img
        src="/images/gpt-study/few-shot/SecondLine2.png"
        alt="Second Line 2"
        className="absolute"
        style={{
          right: '0px',
          top: '200px',
          width: '350px',
          height: '250px'
        }}
      />

      {/* Star 1 - '그럼' 좌측 하단 */}
      <img
        src="/images/gpt-study/few-shot/Star.png"
        alt="Star 1"
        className="absolute"
        style={{
          left: '250px',
          top: '480px',
          width: '105px',
          height: '89px'
        }}
      />

      {/* Star 2 - '감이' 위 */}
      <img
        src="/images/gpt-study/few-shot/Star.png"
        alt="Star 2"
        className="absolute"
        style={{
          left: '700px',
          top: '145px',
          width: '105px',
          height: '89px'
        }}
      />

      {/* 텍스트 */}
      <div className="text-3xl font-pretendard leading-[2.5] text-center z-10">
        <p className='md-20'>
          어때요? <span className="font-bold text-4xl">Few-shot</span> 에 대해 이제 감이 오죠?
        </p>
        <p>
          좋아요! 하지만 <span className="underline underline-offset-8 decoration-[#FFC300] decoration-2">진짜 셰프가 되려면 조금 더 학습</span>이 필요하답니다.
        </p>
        <p>
          그럼 이제 다음 단계로 넘어가 볼까요?
        </p>
      </div>

      {/* 버튼 + SpoonAndChopsticks */}
      <div className="w-full flex items-center justify-center gap-4 mt-12 z-10">
        <button
          onClick={handleGoToChat}
          className="bg-[#FFC300] border-2 border-black rounded-full px-12 py-4 text-3xl font-medium font-pretendard hover:bg-[#FFD54F] transition-colors"
        >
          레시피 연습하러 가기
        </button>
      </div>
      {/* SpoonAndChopsticks */}
      <img
        src="/images/gpt-study/few-shot/SpoonAndChopsticks.png"
        alt="Spoon and Chopsticks"
        style={{
          right: '0px',
          top: '350px',
          position: 'absolute',
          width: '400px',
          height: '500px'
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
    <div className="w-full flex flex-col items-center justify-center pt-72 pb-12">
      {/* 버튼 영역 */}
      <div className="flex flex-col items-center">
        {/* Triangle 이미지 */}
        <img
          src="/images/gpt-study/few-shot/Triangle.png"
          alt="Triangle"
          style={{
            width: '40px',
            height: '35px'
          }}
        />
        
        {/* Tutorial 접기 버튼 */}
        <button
          onClick={handleCloseTutorial}
          className="bg-[#FFC300] border-2 border-black text-black mt-2 py-4 px-96 text-3xl font-medium font-pretendard"
        >
          다른 레시피 더 알아보기
        </button>
      </div>
    </div>
  );
};

export default Recipe2TutorialExample;