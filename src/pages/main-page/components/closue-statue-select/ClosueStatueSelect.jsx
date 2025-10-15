import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// 상수 정의
const ROTATION_SPEED = -0.045; // 5도씩 회전하도록 속도 조정
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
  const [selectedDish, setSelectedDish] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // 각 접시의 스케일 상태를 개별적으로 관리
  const [dishScales, setDishScales] = useState(Array(8).fill(1));

  // 앞쪽 접시 인덱스 계산
  const frontDishIndex = useMemo(() => {
    // 위쪽(12시 방향)에 있는 접시가 선택되도록 계산
    const normalizedAngle = ((-rotationAngle % 360) + 360) % 360;
    const rawIndex = Math.round((normalizedAngle - 90) / 45);
    return ((rawIndex % 8) + 8) % 8;
  }, [rotationAngle]);

  // 현재 앞쪽 접시 정보
  const frontDish = useMemo(() => {
    return dishes[frontDishIndex] || dishes[0];
  }, [frontDishIndex]);

  // frontDishIndex가 변경될 때 스케일 상태 업데이트
  useEffect(() => {
    setDishScales(prevScales => 
      prevScales.map((_, index) => index === frontDishIndex ? 1.1 : 1)
    );
  }, [frontDishIndex]);

  // 접시 클릭 핸들러
  const handleDishClick = useCallback((dish) => {
    if (selectedDish || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDish(dish);
      setIsTransitioning(false);
    }, 500);
  }, [selectedDish, isTransitioning]);

  // 뒤로가기 핸들러
  const handleBackClick = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDish(null);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  // 스크롤 핸들러 - 단순 회전
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const currentScrollY = container.scrollTop;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    if (Math.abs(scrollDelta) < 1) return;

    // 단순 회전 로직 (5도씩)
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

  // 키워드 컴포넌트 최적화
  const KeywordText = React.memo(({ children, className, style, isHighlighted }) => {
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(children);
    const fontClass = hasKorean ? 'font-pretendard' : 'font-sacramento';
    const scaleClass = isHighlighted ? 'scale-110' : 'scale-100';
    
    return (
      <div className={`absolute text-white z-30 pointer-events-none transition-all duration-500 ${fontClass} ${scaleClass} ${className}`} style={style}>
        {children}
      </div>
    );
  });

  // 이미지 컴포넌트 최적화
  const FloatingImage = React.memo(({ src, alt, className }) => (
    <img src={src} alt={alt} className={`absolute object-contain z-10 pointer-events-none ${className}`} />
  ));

  // 접시 컨테이너 컴포넌트
  const DishContainer = React.memo(() => {
    return (
      <div 
        className="absolute"
        style={{
          left: window.innerWidth / 2,
          top: window.innerHeight / 2 + 530,
          transformOrigin: '0 0',
          transform: `rotate(${rotationAngle}deg)`,
        }}
      >
        {dishes.map((dish, index) => (
          <DishItem key={`dish-${index}`} dish={dish} index={index} />
        ))}
      </div>
    );
  });

  // 접시 컴포넌트
  const DishItem = React.memo(({ dish, index }) => {
    const isFrontDish = index === frontDishIndex;
    const scale = dishScales[index];
    
    // 기본 위치 계산
    const baseAngle = index * 45;
    const radian = (baseAngle * Math.PI) / 180;
    const x = RADIUS * Math.cos(radian);
    const y = RADIUS * Math.sin(radian);
    
    return (
      <div
        className="absolute"
        style={{
          left: x - DISH_SIZE / 2,
          top: y - DISH_SIZE / 2,
          width: DISH_SIZE,
          height: DISH_SIZE,
          transformOrigin: 'center center',
          transform: `rotate(${-rotationAngle}deg) scale(${scale})`,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          cursor: isFrontDish ? 'pointer' : 'default',
          pointerEvents: isFrontDish ? 'auto' : 'none',
          zIndex: isFrontDish ? 35 : 30,
        }}
        onClick={() => isFrontDish && handleDishClick(dish)}
      >
        <div 
          className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/main-page/dish.png)',
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-2xl font-bold text-black mb-1 font-bromawo">
              {dish.title}
            </h3>
            <p className="text-xl text-black font-pretendard font-bold">
              {dish.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  });

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
      
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
        {/* 스크롤 컨테이너 */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50 scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="h-[1000vh]" />
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
          className="bottom-[392px] left-[160px] w-[300px] h-[300px] z-0" />
        <FloatingImage src="/images/main-page/cup.png" alt="Cup" 
          className="bottom-[375px] left-[360px] w-[200px] h-[200px] z-0" />
        <FloatingImage src="/images/main-page/salt.png" alt="Salt" 
          className="bottom-[400px] right-[360px] w-[200px] h-[200px] z-0" />
        <FloatingImage src="/images/main-page/glass.png" alt="Glass" 
          className="bottom-[392px] right-[160px] w-[300px] h-[300px] z-0" />
        
        {/* 키워드 텍스트들 */}
        <KeywordText 
          className="bottom-[470px] left-[290px] -translate-x-1/2 text-lg"
          isHighlighted={frontDishIndex === 6 || frontDishIndex === 7}
        >
          {frontDish.kw1}
        </KeywordText>
        <KeywordText 
          className="bottom-[450px] left-[290px] -translate-x-1/2 text-sm"
          isHighlighted={frontDishIndex === 6 || frontDishIndex === 7}
        >
          {frontDish.ekw1}
        </KeywordText>
        <KeywordText 
          className="bottom-[480px] left-[470px] -translate-x-1/2 text-lg"
          isHighlighted={frontDishIndex === 0 || frontDishIndex === 1}
        >
          {frontDish.kw2}
        </KeywordText>
        <KeywordText 
          className="bottom-[460px] left-[470px] -translate-x-1/2 text-sm"
          isHighlighted={frontDishIndex === 0 || frontDishIndex === 1}
        >
          {frontDish.ekw2}
        </KeywordText>
        <KeywordText 
          className="bottom-[470px] right-[460px] translate-x-1/2 text-lg"
          isHighlighted={frontDishIndex === 2 || frontDishIndex === 3}
        >
          {frontDish.kw3}
        </KeywordText>
        <KeywordText 
          className="bottom-[450px] right-[460px] translate-x-1/2 text-sm"
          isHighlighted={frontDishIndex === 2 || frontDishIndex === 3}
        >
          {frontDish.ekw3}
        </KeywordText>
        <KeywordText 
          className="bottom-[600px] right-[290px] translate-x-1/2 text-lg"
          isHighlighted={frontDishIndex === 4 || frontDishIndex === 5}
        >
          {frontDish.kw4}
        </KeywordText>
        <KeywordText 
          className="bottom-[580px] right-[290px] translate-x-1/2 text-sm"
          isHighlighted={frontDishIndex === 4 || frontDishIndex === 5}
        >
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
        <DishContainer />
      </div>
    </>
  );
};

export default ClosueStatueSelect;