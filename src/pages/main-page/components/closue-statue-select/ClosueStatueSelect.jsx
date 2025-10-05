import React, { useState, useEffect, useRef } from 'react';

const ClosueStatueSelect = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  
  // 그릇 데이터 (4개)
  const dishes = [
    {
      id: 1,
      title: "Problem Solving",
      subtitle: "문제해결",
      description: "복잡한 문제를 체계적으로 분석하고 해결하는 능력",
      visible: true,
      color: "purple"
    },
    {
      id: 2,
      title: "Technology", 
      subtitle: "기술",
      description: "최신 기술을 활용한 혁신적인 솔루션 개발",
      visible: true,
      color: "blue"
    },
    {
      id: 3,
      title: "Logic",
      subtitle: "논리",
      description: "논리적 사고와 체계적인 접근을 통한 문제 해결",
      visible: true,
      color: "green"
    },
    {
      id: 4,
      title: "Innovation",
      subtitle: "혁신",
      description: "창의적 사고로 새로운 가치 창출",
      visible: true,
      color: "orange"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollY(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // 원형 배치를 위한 각도 계산 (스크롤에 따라 회전)
  const getCirclePosition = (index, totalItems = 4) => {
    // 각 그릇의 초기 위치 각도 설정 (화면에 잘 보이도록)
    const baseAngles = [330, 270, 210, 150]; // 오른쪽, 아래, 왼쪽, 위
    const baseAngle = baseAngles[index];
    // 스크롤할 때마다 큰 원을 따라 조금씩 회전하도록 설정 (시계 방향)
    const scrollRotation = -(scrollY / 50) % 360; // 시계 방향으로 회전
    const angle = baseAngle + scrollRotation;
    const radius = 400; // 반지름을 줄여서 화면에 모든 그릇이 보이도록
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2 + 300; // 중심을 화면 중앙으로

    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

    return { x, y, angle };
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
      {/* 스크롤 가능한 컨테이너 */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-scroll z-50"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ height: '500vh' }} /> {/* 스크롤 가능한 높이를 늘림 */}
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
                <h3 className="text-lg font-bold text-black mb-1">
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
      <div className="absolute top-20 right-20 text-right z-20 pointer-events-none">
        <div className="text-2xl font-bold text-black mb-2">통합</div>
        <div className="text-2xl font-bold text-black mb-2">예술</div>
        <div className="text-2xl font-bold text-black mb-2">공학</div>
        <div className="text-2xl font-bold text-black">글쓰기</div>
      </div>

      {/* 스크롤 안내 */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-center pointer-events-none">
        <p className="text-lg font-bold text-black animate-bounce">
          스크롤하여 그릇을 돌려보세요
        </p>
      </div>
    </div>
  );
};

export default ClosueStatueSelect;