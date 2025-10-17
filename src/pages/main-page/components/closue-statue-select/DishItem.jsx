import React from 'react';
import { DISH_SIZE, RADIUS } from './dishesData';

const DishItem = React.memo(({ dish, index, frontDishIndex, scale, handleDishClick, orbitAngle, tilt = 0, clickable = false, hideText = false }) => {
  const baseAngle = index * 45;
  const rad = (baseAngle * Math.PI) / 180;
  const x = RADIUS * Math.cos(rad);
  const y = RADIUS * Math.sin(rad);

  return (
    <div
      className={`${clickable ? 'cursor-pointer pointer-events-auto z-10' : 'cursor-default pointer-events-none z-10'} absolute`}
      style={{
        left: `${x - DISH_SIZE / 2}px`,
        top: `${y - DISH_SIZE / 2}px`,
        width: `${DISH_SIZE}px`,
        height: `${DISH_SIZE}px`,
        // 컨테이너 회전 상쇄: 접시 자체는 제자리 방향 유지
        transform: `rotate(${-orbitAngle}deg) scale(${scale}) rotateX(${tilt}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'none',
      }}
      onClick={() => clickable && handleDishClick(dish)}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/main-page/dish.png)' }}
      >
        {!hideText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-2xl font-bold text-black mb-1 font-bromawo">{dish.title}</h3>
            <p className="text-xl text-black font-pretendard font-bold">{dish.subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default DishItem;
