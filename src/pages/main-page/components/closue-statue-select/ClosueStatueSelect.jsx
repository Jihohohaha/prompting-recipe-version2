import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// 상수 정의
const ROTATION_SPEED = -0.04;
const RADIUS = 500;
const DISH_SIZE = 400;
const SCROLL_RESET_THRESHOLD = { TOP: 0.1, BOTTOM: 0.9 };

// 그릇 데이터 - 컴포넌트 외부로 이동
const DISHES_DATA = [
  {
    id: 1,
    title: "Art & Creativity",
    subtitle: "예술 & 창작",
    description: "복잡한 문제를 체계적으로 분석하고 해결하는 능력",
    kw1: "영감", kw2: "감각", kw3: "자유", kw4: "표현",
    ekw1: "Inspiration", ekw2: "Aesthetic", ekw3: "Freedom", ekw4: "Expression"
  },
  {
    id: 2,
    title: "Engineering",
    subtitle: "공학", 
    description: "최신 기술을 활용한 혁신적인 솔루션 개발",
    kw1: "논리", kw2: "기술", kw3: "혁신", kw4: "문제해결",
    ekw1: "Logic", ekw2: "Technology", ekw3: "Innovation", ekw4: "Problem-solving"
  },
  {
    id: 3,
    title: "Essay",
    subtitle: "논술",
    description: "논리적 사고와 체계적인 접근을 통한 문제 해결",
    kw1: "사유", kw2: "설득", kw3: "서사", kw4: "표현력", 
    ekw1: "Thinking", ekw2: "Persuasion", ekw3: "Narrative", ekw4: "Expression"
  },
  {
    id: 4,
    title: "Integration",
    subtitle: "통합",
    description: "창의적 사고로 새로운 가치 창출",
    kw1: "융합", kw2: "협력", kw3: "적응", kw4: "혁신",
    ekw1: "Integration", ekw2: "Collaboration", ekw3: "Adaptation", ekw4: "Innovation"
  }
];

// 8개 접시 데이터 생성 (4개를 2번 반복)
const dishes = [...DISHES_DATA, ...DISHES_DATA.map(dish => ({ ...dish, id: dish.id + 4 }))];

const ClosueStatueSelect = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  // 원형 배치 계산 최적화
  const getCirclePosition = useCallback((index) => {
    const baseAngle = index * 45;
    const angle = baseAngle + rotationAngle;
    const radian = (angle * Math.PI) / 180;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 530;

    return {
      x: centerX + RADIUS * Math.cos(radian),
      y: centerY + RADIUS * Math.sin(radian),
      angle
    };
  }, [rotationAngle]);

  // 가장 앞쪽 접시 찾기 최적화
  const frontDish = useMemo(() => {
    // 간단한 수학적 계산으로 최적화
    const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
    const frontIndex = Math.round((normalizedAngle / 45) % 8);
    return dishes[frontIndex] || dishes[0];
  }, [rotationAngle]);

  // 스크롤 핸들러 최적화
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentScrollY = container.scrollTop;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    if (Math.abs(scrollDelta) < 1) return; // 미세한 움직임 무시

    const angleChange = scrollDelta * ROTATION_SPEED;
    setRotationAngle(prev => prev + angleChange);
    lastScrollY.current = currentScrollY;
    
    // 무한 스크롤 리셋
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (currentScrollY >= maxScroll * SCROLL_RESET_THRESHOLD.BOTTOM || 
        currentScrollY <= maxScroll * SCROLL_RESET_THRESHOLD.TOP) {
      container.scrollTop = container.scrollHeight / 2;
      lastScrollY.current = container.scrollTop;
    }
  }, []);

  // 초기 설정
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.scrollTop = container.scrollHeight / 2;
    lastScrollY.current = container.scrollTop;
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 키워드 컴포넌트 최적화 - 한글/영어 폰트 자동 선택
  const KeywordText = React.memo(({ children, className, style }) => {
    // 한글 포함 여부 검사
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(children);
    const fontClass = hasKorean ? 'font-pretendard' : 'font-sacramento';
    
    return (
      <div className={`absolute text-white z-30 pointer-events-none transition-all duration-500 ${fontClass} ${className}`} style={style}>
        {children}
      </div>
    );
  });

  // 이미지 컴포넌트 최적화
  const FloatingImage = React.memo(({ src, alt, className }) => (
    <img src={src} alt={alt} className={`absolute object-contain z-10 pointer-events-none ${className}`} />
  ));

  // 접시 컴포넌트 최적화
  const DishItem = React.memo(({ dish, position }) => (
    <div
      className="absolute z-30 pointer-events-none"
      style={{
        left: position.x - DISH_SIZE / 2,
        top: position.y - DISH_SIZE / 2,
        width: DISH_SIZE,
        height: DISH_SIZE,
        transform: 'translate3d(0, 0, 0)', // 하드웨어 가속
      }}
    >
      <div 
        className="flex flex-col items-center justify-center relative overflow-hidden w-full h-full dish-transition"
        style={{ 
          backgroundImage: 'url(/images/main-page/dish.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h3 className="text-[24px] font-bold text-black mb-1 font-bromawo">
            {dish.title}
          </h3>
          <p className="text-[20px] text-black font-pretendard font-bold">
            {dish.subtitle}
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* 초기 마스킹 오버레이 */}
      {showMask && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-85 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500"
          onClick={() => setShowMask(false)}
        >
          <h1 className="text-6xl font-bold text-white mb-8 font-koolegant">
            Choose Your Dish
          </h1>
          <p className="text-xl text-white mb-12">
            오늘의 메뉴를 선택하세요.
          </p>
          <div className="text-white text-lg">Click</div>
        </div>
      )}

      {/* CSS 스타일 */}
      <style jsx>{`
        .smooth-scroll-container {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .dish-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }
      `}</style>
      
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
        {/* 스크롤 컨테이너 */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{ height: '1000vh' }} />
        </div>

        {/* 제목 */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none">
          <h1 className="text-6xl font-bold text-black mb-4 transition-all duration-500 font-koolegant">
            {frontDish.title}
          </h1>
          <p className="text-xl text-black transition-all duration-500">
            {frontDish.description}
          </p>
        </div>

        {/* 플로팅 이미지들 */}
        <FloatingImage src="/images/main-page/flower.png" alt="Flower" 
          className="bottom-[392px] left-[160px] w-[300px] h-[300px]" />
        <FloatingImage src="/images/main-page/cup.png" alt="Cup" 
          className="bottom-[375px] left-[360px] w-[200px] h-[200px]" />
        <FloatingImage src="/images/main-page/salt.png" alt="Salt" 
          className="bottom-[400px] right-[360px] w-[200px] h-[200px]" />
        <FloatingImage src="/images/main-page/glass.png" alt="Glass" 
          className="bottom-[392px] right-[160px] w-[300px] h-[300px]" />
        
        {/* 키워드 텍스트들 */}
        <KeywordText className="bottom-[470px] left-[290px] -translate-x-1/2 text-lg">
          {frontDish.kw1}
        </KeywordText>
        <KeywordText className="bottom-[450px] left-[290px] -translate-x-1/2 text-sm">
          {frontDish.ekw1}
        </KeywordText>
        <KeywordText className="bottom-[480px] left-[470px] -translate-x-1/2 text-lg">
          {frontDish.kw2}
        </KeywordText>
        <KeywordText className="bottom-[460px] left-[470px] -translate-x-1/2 text-sm">
          {frontDish.ekw2}
        </KeywordText>
        <KeywordText className="bottom-[470px] right-[460px] translate-x-1/2 text-lg">
          {frontDish.kw3}
        </KeywordText>
        <KeywordText className="bottom-[450px] right-[460px] translate-x-1/2 text-sm">
          {frontDish.ekw3}
        </KeywordText>
        <KeywordText className="bottom-[600px] right-[290px] translate-x-1/2 text-lg">
          {frontDish.kw4}
        </KeywordText>
        <KeywordText className="bottom-[580px] right-[290px] translate-x-1/2 text-sm">
          {frontDish.ekw4}
        </KeywordText>

        {/* 접시 위 도구들 */}
        <img src="/images/main-page/spoon.png" alt="Spoon" className="absolute bottom-[280px] right-[450px] w-[300px] h-[300px] object-contain z-40 pointer-events-none" />
        <img src="/images/main-page/knife.png" alt="Knife" className="absolute bottom-[150px] left-[400px] w-[300px] h-[300px] object-contain z-40 pointer-events-none" />
        <img src="/images/main-page/fork1.png" alt="Fork1" className="absolute bottom-[280px] right-[500px] w-[150px] h-[150px] object-contain z-40 pointer-events-none" />
        <img src="/images/main-page/fork2.png" alt="Fork2" className="absolute bottom-[280px] left-[450px] w-[300px] h-[300px] object-contain z-40 pointer-events-none" />

        {/* 중앙 석상 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <img 
            src="/images/main-page/statue.png"
            alt="석상"
            className="w-96 h-[250px] object-contain"
          />
        </div>

        {/* 회전하는 그릇들 */}
        {dishes.map((dish, index) => {
          const position = getCirclePosition(index);
          return <DishItem key={dish.id} dish={dish} position={position} />;
        })}
      </div>
    </>
  );
};

export default ClosueStatueSelect;