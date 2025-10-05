
import React from 'react';
import { motion } from 'framer-motion';

const OpenedClosue = ({ onComplete }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollCompleted, setIsScrollCompleted] = useState(false);
  const containerRef = useRef(null);

  // 스크롤 텍스트들
  const scrollTexts = [
    ["그것은 곧 프롬프트 엔지니어링,", "언어를 다루는 비밀의 조리법이었다."],
    [
      "그 때, 눈앞에 나타난 의문의 석상!",
      "그 석상은 원래 단순한 돌조각에 불과했지만,",
      "소문에 따르면 레시피를 완성한 석상은",
      "비로소 사람이 될 수 있다고 했다."
    ],
    [
      "그래서 그는 요리 마스터가 되기로 결심했다.",
      "하지만 단순히 따라 하기만 해서는 부족했다.",
      "재료와 조리법을 창의적으로 조합해 자신만의 요리를 완성해야만",
      "진짜 '사람의 감각'을 얻을 수 있었다."
    ],
    [
      "그는 믿고 있었다.",
      "만약 누군가 함께해 준다면, 이 주방에서 조금씩 달라질 수 있을 것이라고.",
      "그리고 이제, 당신이 그 길을 함께할 차례이다."
    ]
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
      
      // 스크롤이 거의 끝에 도달했을 때 완료 상태로 설정 (95% 이상)
      if (progress >= 0.95 && !isScrollCompleted) {
        setIsScrollCompleted(true);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isScrollCompleted]);

  // 클릭 핸들러
  const handleClick = useCallback(() => {
    if (isScrollCompleted && onComplete) {
      onComplete();
    }
  }, [isScrollCompleted, onComplete]);

  const getOpacity = (index) => {
    const totalItems = scrollTexts.length;
    const progressPerItem = 1 / totalItems;
    const currentItemStart = index * progressPerItem;
    const currentItemEnd = (index + 1) * progressPerItem;
    
    if (scrollProgress >= currentItemStart && scrollProgress <= currentItemEnd) {
      const itemProgress = (scrollProgress - currentItemStart) / progressPerItem;
      
      const steps = 16;
      const stepSize = 1 / steps;
      const currentStep = Math.floor(itemProgress / stepSize);
      const stepProgress = (itemProgress % stepSize) / stepSize;
      
      if (currentStep < 8) {
        const baseOpacity = currentStep * 0.125;
        const stepIncrement = stepProgress * 0.125;
        return Math.min(baseOpacity + stepIncrement, 1);
      } else {
        const fadeOutStep = currentStep - 8;
        const baseOpacity = 1 - (fadeOutStep * 0.125);
        const stepDecrement = stepProgress * 0.125;
        return Math.max(baseOpacity - stepDecrement, 0);
      }
    }
    
    return 0;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Z-10: 밝은 배경층 */}
      <div className="absolute inset-0 z-10 bg-[#F5F5F5] flex items-end justify-center pb-10 pointer-events-none">
        <div className="relative" style={{ width: 'calc(60vw * 0.8)', maxWidth: '800px' }}>
          {/* Closue Plate (고정) */}
          <img
            src="/images/main-page/closue_plate.png"
            alt="closue-plate"
            className="w-full"
            style={{ display: 'block', transform: 'translateY(250px)' }}
          />
          {/* Closue Dom (열린 상태) */}
          <motion.img
            src="/images/main-page/closue_dom.png"
            alt="closue-dom"
            className="absolute bottom-0 left-0 w-full"
            initial={{
              rotate: -20,
              y: -70,
              x: 80,
            }}
            animate={{
              rotate: -20,
              y: -70,
              x: 80,
            }}
            transition={{ duration: 0 }}
            style={{
              transformOrigin: 'bottom left',
            }}
          />
        </div>
      </div>

      {/* Z-20: 어두운 흐릿한 오버레이 */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Z-30: PRomptinG 중심이 페이지 정중앙, [RECIPE]와 서브멘트는 아래 */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* PRomptinG: 정확히 중앙 */}
          <span
            className="text-[80px] font-stretch leading-none text-white"
            style={{
              fontFamily: 'StretchPro, sans-serif',
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            PRomptinG
          </span>
        </div>
        {/* [RECIPE]와 서브 멘트: PRomptinG 아래에 절대좌표로 배치 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, 0)',
            marginTop: '90px', // PRomptinG 아래로 충분히 띄움
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <span
            className="text-[60px] font-desira leading-none text-white"
            style={{ fontFamily: 'DesiraDEMO, sans-serif', lineHeight: 1 }}
          >
            [RECIPE]
          </span>
          <div
            className="text-center text-white mt-8"
            style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '20px' }}
          >
            그것은 곧 프롬프트 엔지니어링,<br />언어를 다루는 비밀 조리법이었다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedClosue;