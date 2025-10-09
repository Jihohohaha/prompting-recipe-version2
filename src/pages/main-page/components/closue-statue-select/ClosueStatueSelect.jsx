import React, { useState, useEffect, useRef } from 'react';

const ClosueStatueSelect = () => {
  const [scrollY, setScrollY] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0); // 현재 회전 각도
  const containerRef = useRef(null);
  const lastScrollY = useRef(0); // 이전 스크롤 위치 추적
  
  // 그릇 데이터 (8개)
  const dishes = [
    {
      id: 1,
      title: "Art & Creativity",
      subtitle: "예술 & 창작",
      description: "복잡한 문제를 체계적으로 분석하고 해결하는 능력",
      visible: true,
      color: "purple"
    },
    {
      id: 2,
      title: "Engineering", 
      subtitle: "공학",
      description: "최신 기술을 활용한 혁신적인 솔루션 개발",
      visible: true,
      color: "blue"
    },
    {
      id: 3,
      title: "Essay",
      subtitle: "논술",
      description: "논리적 사고와 체계적인 접근을 통한 문제 해결",
      visible: true,
      color: "green"
    },
    {
      id: 4,
      title: "Fusion",
      subtitle: "통합",
      description: "창의적 사고로 새로운 가치 창출",
      visible: true,
      color: "orange"
    },
    {
      id: 5,
      title: "Art & Creativity",
      subtitle: "예술 & 창작",
      description: "복잡한 문제를 체계적으로 분석하고 해결하는 능력",
      visible: true,
      color: "purple"
    },
    {
      id: 6,
      title: "Engineering", 
      subtitle: "공학",
      description: "최신 기술을 활용한 혁신적인 솔루션 개발",
      visible: true,
      color: "blue"
    },
    {
      id: 7,
      title: "Essay",
      subtitle: "논술",
      description: "논리적 사고와 체계적인 접근을 통한 문제 해결",
      visible: true,
      color: "green"
    },
    {
      id: 8,
      title: "Fusion",
      subtitle: "통합",
      description: "창의적 사고로 새로운 가치 창출",
      visible: true,
      color: "orange"
    },
  ];

  // 초기 설정
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // 초기 스크롤 위치를 중간으로 설정
    container.scrollTop = container.scrollHeight / 2;
    lastScrollY.current = container.scrollTop;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // 스크롤 델타를 각도로 변환 (무제한 누적, 반대 방향, 매우 작은 각도)
      const angleChange = scrollDelta * (-0.04); // 스크롤 1px당 -0.05도 회전 (매우 작은 각도)
      
      setRotationAngle(prev => prev + angleChange);
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
      
      // 스크롤이 끝에 도달하면 중간으로 리셋 (무한 스크롤)
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (currentScrollY >= maxScroll * 0.9) {
        container.scrollTop = container.scrollHeight / 2;
        lastScrollY.current = container.scrollTop;
      } else if (currentScrollY <= maxScroll * 0.1) {
        container.scrollTop = container.scrollHeight / 2;
        lastScrollY.current = container.scrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 원형 배치를 위한 각도 계산 (간단한 회전 로직)
  const getCirclePosition = (index) => {
    // 각 그릇의 초기 위치 각도 설정 (8개 접시, 45도씩 배치)
    const baseAngle = index * 45; // 0, 45, 90, 135, 180, 225, 270, 315도
    
    // 현재 회전 각도를 더함
    const angle = baseAngle + rotationAngle;
    
    const radius = 500;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 530;

    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    
    return { x, y, angle };
  };

  // 가장 앞쪽(가운데)에 있는 접시 찾기
  const getFrontDish = () => {
    let minDistance = Infinity;
    let frontDishIndex = 0;
    
    dishes.forEach((dish, index) => {
      const position = getCirclePosition(index);
      // 화면 중앙 상단(제목 위치)과의 거리 계산
      const centerX = window.innerWidth / 2;
      const titleY = 100; // 제목의 대략적인 Y 위치
      const distance = Math.sqrt(Math.pow(position.x - centerX, 2) + Math.pow(position.y - titleY, 2));
      
      if (distance < minDistance) {
        minDistance = distance;
        frontDishIndex = index;
      }
    });
    
    return dishes[frontDishIndex];
  };

  const frontDish = getFrontDish();

  return (
    <>
      {/* 부드러운 전환을 위한 CSS 스타일 */}
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
        {/* 스크롤 가능한 컨테이너 */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            pointerEvents: 'auto',
          }}
        >
          {/* 긴 컨텐츠를 만들어서 스크롤 가능하게 - 더 천천히 회전하도록 높이 증가 */}
          <div style={{ height: '1000vh' }}></div>
        </div>

      {/* 제목 - 현재 가장 앞쪽 접시의 title 표시 */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none">
        <h1 className="text-6xl font-bold text-black mb-4 transition-all duration-500 font-koolegant">
          {frontDish.title}
        </h1>
        <p className="text-xl text-black transition-all duration-500">
          {frontDish.description}
        </p>
      </div>

      {/* 중앙 하단 석상 */}
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
        const opacity = dish.visible ? 1 : 0;
        
        return (
          <div
            key={dish.id}
            className="absolute z-30 pointer-events-none"
            style={{
              left: position.x - 200, // 그릇 크기의 절반만큼 오프셋 (400px의 절반)
              top: position.y - 200,
              opacity: opacity,
              width: '400px', // 명시적으로 크기 지정
              height: '400px',
            }}
          >
            {/* 그릇 이미지 */}
            <div 
              className="flex flex-col items-center justify-center relative overflow-hidden"
              style={{ 
                backgroundImage: 'url(/images/main-page/dish.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            >
              {/* 그릇 내용 */}
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
        );
      })}

      {/* 우측 상단 카테고리 텍스트 */}
      {/* <div className="absolute top-20 right-20 text-right z-20 pointer-events-none">
        <div className="text-2xl font-bold text-black mb-2">통합</div>
        <div className="text-2xl font-bold text-black mb-2">예술</div>
        <div className="text-2xl font-bold text-black mb-2">공학</div>
        <div className="text-2xl font-bold text-black">글쓰기</div>
      </div> */}

      {/* 스크롤 안내 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-100 text-center pointer-events-none">
        <p className="text-lg font-bold text-black animate-bounce">
          스크롤하여 그릇을 돌려보세요
        </p>
      </div>
      </div>
    </>
  );
};

export default ClosueStatueSelect;