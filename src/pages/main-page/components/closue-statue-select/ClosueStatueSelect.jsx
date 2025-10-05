import React, { useState, useEffect, useRef } from 'react';

const ClosueStatueSelect = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(2); // 중간 위치(0도)로 시작
  const containerRef = useRef(null);
  
  // 스냅 포인트들 (60도씩 회전 - 반시계 방향)
  const snapAngles = [120, 60, 0, -60, -120];
  const totalSnaps = snapAngles.length;
  
  // 그릇 데이터 (4개)
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
    }
  ];

  // 초기 스크롤 위치 설정 (중간 위치로)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // 페이지 로드 후 중간 위치(2번 인덱스)로 스크롤
    setTimeout(() => {
      container.scrollTop = container.clientHeight * 2; // 2번째 섹션으로 이동
    }, 100);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;
    
    const handleScroll = () => {
      // 스크롤이 끝날 때까지 기다린 후 위치 업데이트
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const sectionHeight = container.clientHeight;
        const currentSection = Math.round(scrollTop / sectionHeight);
        const clampedSection = Math.max(0, Math.min(totalSnaps - 1, currentSection));
        
        setCurrentSnapIndex(clampedSection);
      }, 100); // 100ms 지연으로 스크롤 완료 감지
      
      setScrollY(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [totalSnaps]);

  // 원형 배치를 위한 각도 계산 (스냅 기반)
  const getCirclePosition = (index) => {
    // 각 그릇의 초기 위치 각도 설정 (시계방향으로 배치)
    const baseAngles = [30, 330, 270, 210]; // 오른쪽 위, 오른쪽 아래, 왼쪽 아래, 왼쪽 위
    const baseAngle = baseAngles[index];
    
    // 현재 스냅 인덱스에 따른 회전각도 (기본값 0)
    const snapRotation = snapAngles[currentSnapIndex] || 0;
    const angle = baseAngle + snapRotation;
    const radius = 400;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 350;

    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    
    return { x, y, angle };
  };

  return (
    <>
      {/* 부드러운 전환을 위한 CSS 스타일 */}
      <style jsx>{`
        .smooth-scroll-container {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .dish-transition {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }
      `}</style>
      
      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
        {/* 스크롤 가능한 컨테이너 - Snap Scroll */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50 snap-y snap-mandatory smooth-scroll-container"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            pointerEvents: 'auto',
            scrollBehavior: 'smooth'
          }}
        >
        {/* 각 스냅 포인트를 위한 섹션들 */}
        {snapAngles.map((angle, index) => (
          <div 
            key={index}
            className="h-screen w-full snap-start snap-always flex items-center justify-center"
          >
            <div className="text-white text-center opacity-20">
              <div className="text-sm font-light">회전: {angle}°</div>
            </div>
          </div>
        ))}
      </div>

      {/* 제목 */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none">
        <h1 className="text-6xl font-bold text-black mb-4" style={{ fontFamily: 'serif' }}>
          Choose Your Dish
        </h1>
        <p className="text-xl text-black">
          오늘의 메뉴를 선택하세요.
        </p>
      </div>

      {/* 중앙 하단 석상 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div 
          className="w-96 h-[400px] flex items-center justify-center"
          style={{ 
            backgroundImage: 'url(/images/main-page/statue.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        </div>
      </div>

      {/* 회전하는 그릇들 */}
      {dishes.map((dish, index) => {
        const position = getCirclePosition(index);
        const opacity = dish.visible ? 1 : 0;
        
        return (
          <div
            key={dish.id}
            className="absolute z-30 pointer-events-none dish-transition"
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
                <h3 className="text-lg font-bold text-black mb-1 font-bromawo">
                  {dish.title}
                </h3>
                <p className="text-sm text-gray-600">
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
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-center pointer-events-none">
        <p className="text-lg font-bold text-black animate-bounce">
          스크롤하여 그릇을 돌려보세요
        </p>
      </div>
      </div>
    </>
  );
};

export default ClosueStatueSelect;