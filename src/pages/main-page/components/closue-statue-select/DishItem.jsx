import React from 'react';
import { DISH_SIZE, RADIUS } from './dishesData';

const DishItem = React.memo(function DishItem({
  dish,
  index,
  frontDishIndex,
  scale,
  handleDishClick,
  orbitAngle,
  tilt = 0,
  clickable = false,
  hideText = false,
  showLogo = false,
  showTitle = false,
}) {
  const baseAngle = index * 45;
  const rad = (baseAngle * Math.PI) / 180;
  const x = RADIUS * Math.cos(rad);
  const y = RADIUS * Math.sin(rad);

  return (
    <div
      className={`${clickable ? 'cursor-pointer pointer-events-auto z-10' : 'cursor-default pointer-events-none z-10'} absolute select-none`}
      style={{
        left: `${x - DISH_SIZE / 2}px`,
        top: `${y - DISH_SIZE / 2}px`,
        width: `${DISH_SIZE}px`,
        height: `${DISH_SIZE}px`,
        transform: `rotate(${-orbitAngle}deg) scale(${scale}) rotateX(${tilt}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onClick={() => clickable && handleDishClick(dish, index)}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* 접시 배경 */}
      <div
        className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/main-page/dish.png)' }}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* 틸트 모드: 로고/타이틀 */}
        {showLogo && dish?.logo && (
          <img
            src={dish.logo}
            alt={`${dish.title} logo`}
            className="pointer-events-none select-none"
            draggable={false}
            style={{
              width: '42%',
              height: '42%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              marginBottom: showTitle ? '8px' : 0,
              userSelect: 'none',
            }}
          />
        )}
        {showTitle && (
          <div className="text-black text-3xl font-pretendard font-bold leading-none select-none">
            {dish.title}
          </div>
        )}

        {/* 프리-틸트: 제목/부제 */}
        {!showLogo && !hideText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none">
            <h3 className="text-2xl font-bold text-black mb-1 font-bromawo">{dish.title}</h3>
            <p className="text-xl text-black font-pretendard font-bold">{dish.subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default DishItem;
