import React from 'react';

const Z0Layer = () => {
  // 전체 배경 컨테이너 (1920x1080, #F5F5F5)
  // 'fixed'를 사용하여 전체 화면을 덮고, 'bg-gray-100'을 사용하여 #F5F5F5와 비슷한 색상을 지정했습니다.
  // Tailwind.config에 정확한 색상을 추가하거나, 인라인 스타일을 사용할 수 있습니다. 여기서는 인라인 스타일로 정확한 색상을 적용합니다.
  return (
    <div 
      className="w-[1920px] h-[1080px] flex justify-center" // 전체 크기 설정 및 좌우 가운데 정렬을 위한 flex, justify-center
      style={{ 
        backgroundColor: '#F5F5F5', // 정확한 배경색
      }}
    >
      {/* 내부 검정색 div (683x109, #000000) */}
      <div 
        className="w-[683px] h-[109px] bg-black rounded absolute" // 크기, 검정색 배경, 절대 위치 설정
        style={{ 
          // 상단 여백 167px을 위해 'top' 인라인 스타일 사용
          top: '167px',
          // 좌우 가운데 정렬은 부모의 'justify-center'로 처리되었습니다.
          // 더 정확한 레이아웃 제어를 위해 'absolute'와 'left-1/2 transform -translate-x-1/2'를 사용할 수도 있지만,
          // 여기서는 부모 flex 컨테이너를 기준으로 top만 설정했습니다.
        }}
      />
    </div>
  );
};

export default Z0Layer;