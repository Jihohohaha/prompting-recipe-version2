// src/pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult.jsx
import { useState } from 'react';

const Recipe1QuizMultipleResult = ({ score, onRetry, onNext }) => {
  const isSuccess = score === 3;
  
  console.log('Result rendered:', { score, isSuccess });
  
  return (
    <div className="w-full">
      {isSuccess ? (
        <SuccessResult onNext={onNext} />
      ) : (
        <FailResult onRetry={onRetry} />
      )}
    </div>
  );
}

// ✅ Reference 패턴: GSAP Timeline으로 제어
const SuccessResult = ({ onNext }) => {
  const [showEssayIntro, setShowEssayIntro] = useState(false);

  const handleShowIntro = () => {
    setShowEssayIntro(true);
  };

  return (
    <div className="relative w-full">
      {!showEssayIntro ? (
        <SuccessScreen onNext={handleShowIntro} />
      ) : (
        <EssayIntroScreen onNext={onNext} />
      )}
    </div>
  );
};

const SuccessScreen = ({ onNext }) => {
  const backgroundImagePath = '/images/gpt-study/quiz/Background.png'; 

  return (
    <div 
      className="relative w-full h-[98vh] bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( ROLE <br /> PROMPTING )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      <img 
        src="/images/gpt-study/quiz/SuccessMain.png"
        alt="Success Main"
        className="absolute left-1/2 bottom-[60px] -translate-x-1/2 w-[960px] h-auto"
      />

      <img 
        src="/images/gpt-study/quiz/WaiterStatue.png"
        alt="Waiter Statue"
        className="absolute bottom-0 left-0"
        style={{
          width: '320px',
          height: 'auto'
        }}
      />

      <div 
        className="absolute font-pretendard text-[16px] text-white text-center tracking-widest left-1/2 -translate-x-1/2 bottom-6">
        요리 마스터가 되기 위한 비밀 레시피북을 손에 넣었습니다!<br/>
        이제 이 책을 펼쳐, 본격적으로 요리를 시작해볼까요?
      </div> 

      <button
        onClick={onNext}
        className="absolute bottom-[20px] right-12 bg-[#FE7525] text-white text-xl font-pretendard px-8 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
      >
        주관식 퀴즈 풀러가기
      </button>
    </div>
  );
};

const EssayIntroScreen = ({ onNext }) => {
  const backgroundImagePath = '/images/gpt-study/quiz/Background.png'; 

  return (
    <div 
      className="relative w-full h-[700px] bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( ROLE <br /> PROMPTING )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      <div className="flex items-center justify-center text-8xl font-bold
       text-white mt-32 mb-20 text-gradient-custom">[Final Test]</div>

      <p className="flex items-center justify-center text-center
       text-2xl text-white mb-8 tracking-wider leading-loose">
          이번 요리는 석상이가 '진짜 사람'이 되기 위한 테스트예요.<br/>
          당신이 직접 주제와 역할을 정해, 나만의 Role Prompting 프롬프트를 완성해야 합니다.<br/>
          이 레시피가 완성되면, 석상이는 드디어 말하고 생각하는 존재로 깨어날 거예요.
        </p>

      <button
        onClick={onNext}
        className="absolute bottom-[20px] right-12 bg-[#FE7525] text-white text-xl font-pretendard px-8 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
      >
        주관식 퀴즈 시작하기
      </button>
    </div>
  );
};

const FailResult = ({ onRetry }) => {
  const backgroundImagePath = '/images/gpt-study/quiz/Background.png'; 

  return (
    <div 
      className="relative w-full h-[700px] bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( ROLE <br /> PROMPTING )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      <img 
        src="/images/gpt-study/quiz/FailMain.png"
        alt="Fail Main"
        className="absolute"
        style={{
          left: '48%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: 'auto'
        }}
      />

      <img 
        src="/images/gpt-study/quiz/WaiterStatue.png"
        alt="Waiter Statue"
        className="absolute bottom-0 left-0"
        style={{
          width: '290px',
          height: 'auto'
        }}
      />

      <div 
        className="absolute font-pretendard text-xl text-white text-center tracking-widest leading-relaxed"
        style={{
          left: '27%',
          bottom: '30px'
        }}
      >
        앗, 비밀 레시피북 대신 석상이가 튀어나왔어요!<br/>
        괜찮아요, 다시 도전하면 이번엔 진짜 레시피북이 나올지도 몰라요!
      </div>

      <button
        onClick={onRetry}
        className="absolute bottom-[30px] right-8 bg-[#FE7525] text-white text-xl font-pretendard px-12 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
      >
        다시 풀러가기
      </button>
    </div>
  );
}

export default Recipe1QuizMultipleResult;