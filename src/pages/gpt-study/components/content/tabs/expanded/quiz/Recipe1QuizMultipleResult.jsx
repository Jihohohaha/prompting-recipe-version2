import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Recipe1QuizMultipleResult = ({ score, onRetry, onNext }) => {
  const [searchParams] = useSearchParams();
  const urlScore = searchParams.get('score');
  const finalScore = score ?? parseInt(urlScore) ?? 0;
  
  const isSuccess = finalScore === 3;
  
  console.log('finalScore:', finalScore);
  console.log('isSuccess:', isSuccess);
  
  return (
    <div className="overflow-hidden">
      {isSuccess ? (
        <SuccessResult onNext={onNext} />
      ) : (
        <FailResult onRetry={onRetry} />
      )}
    </div>
  );
}

const SuccessResult = ({ onNext }) => {
  const [showEssayIntro, setShowEssayIntro] = useState(false);

  const handleNext = () => {
    setShowEssayIntro(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!showEssayIntro ? (
        <motion.div
          key="success"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessScreen onNext={handleNext} />
        </motion.div>
      ) : (
        <motion.div
          key="essay-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <EssayIntroScreen onNext={onNext} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SuccessScreen = ({ onNext }) => {
  const backgroundImagePath = '/images/gpt-study/quiz/Background.png'; 

  return (
    <div 
      className="relative w-full h-[1000px] bg-cover bg-center" 
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
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: 'auto'
        }}
      />

      <img 
        src="/images/gpt-study/quiz/WaiterStatue.png"
        alt="Waiter Statue"
        className="absolute bottom-0 left-0"
        style={{
          width: '420px',
          height: 'auto'
        }}
      />

      <div 
        className="absolute font-pretendard text-xl text-white text-center tracking-widest"
        style={{
          left: '35%',
          bottom: '70px'
        }}
      >
        요리 마스터가 되기 위한 비밀 레시피북을 손에 넣었습니다!<br/>
        이제 이 책을 펼쳐, 본격적으로 요리를 시작해볼까요?
      </div>

      <button
        onClick={onNext}
        className="absolute bottom-16 right-16 bg-[#FE7525] text-white text-2xl font-pretendard px-12 py-3 rounded-full hover:bg-[#FF8C42] transition-colors"
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
      className="relative w-full h-[1000px] bg-cover bg-center" 
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
       text-white mt-64 mb-48 text-gradient-custom">[Final Test]</div>

      <p className="flex items-center justify-center text-center
       text-2xl text-white mb-8 tracking-wider leading-loose">
          이번 요리는 석상이가 ‘진짜 사람’이 되기 위한 테스트예요.<br/>
          당신이 직접 주제와 역할을 정해, 나만의 Role Prompting 프롬프트를 완성해야 합니다.<br/>
          이 레시피가 완성되면, 석상이는 드디어 말하고 생각하는 존재로 깨어날 거예요.
        </p>
    </div>
  );
};

const FailResult = ({ onRetry }) => {
  const backgroundImagePath = '/images/gpt-study/quiz/Background.png'; 

  return (
    <div 
      className="relative w-full h-[1000px] bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImagePath})` }}
    >
      <div className="w-full flex items-center justify-between px-[48px] pt-[28px]">
        <div className="font-mortend text-3xl font-bold text-white">
          ( FEW <br /> SHOT )
        </div>

        <div className="flex-1 mx-[20px]">
          <span className="block w-full h-[2px] bg-white"></span>
        </div>

        <div className="font-koolegant text-4xl text-white">RECIPE 1.</div>
      </div>

      {/* 여기에 실패 화면 컨텐츠 추가 */}
    </div>
  );
}

export default Recipe1QuizMultipleResult;