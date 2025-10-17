import React from 'react';
import DishItem from './DishItem';
import { dishes } from './dishesData';

const TILT_MS = 800; // 기울기/상승 모션(ms)

const DishContainer = React.memo(
  ({ rotationAngle, orbitTiltDeg = 0, frontDishIndex, dishScales, handleDishClick, selectedDish, hideText = false }) => {
    let visibleIndexes = null;
    if(selectedDish !== null || orbitTiltDeg !== 0) {
      visibleIndexes = [
        (frontDishIndex + 4) % dishes.length, // 6시 방향 접시
        (frontDishIndex + 3) % dishes.length, // 왼쪽 접시
        (frontDishIndex + 5) % dishes.length, // 오른쪽 접시
      ];
    }

    const orbitAngle = rotationAngle + (selectedDish ? 180 : 0);
    const baseTilt = orbitTiltDeg + (selectedDish ? -60 : 0);

    // 🔼 기울어진 상태면 궤도 중심을 위로 400px 올리기
    const liftY = orbitTiltDeg !== 0 ? -600 : 0;

    // 바깥 래퍼: translateY(선택시 -600 + 기울기상승) + rotateX(기울기)  ← 여기에만 트랜지션
    const outerTiltTransform = selectedDish
      ? `translateY(${ -600 + liftY }px) rotateX(${baseTilt}deg)`
      : `translateY(${ liftY }px) rotateX(${baseTilt}deg)`;

    // 안쪽 래퍼: 궤도 회전(즉시)
    const innerOrbitTransform = `rotate(${orbitAngle}deg)`;

    return (
      <div
        className="absolute z-10 pointer-events-auto perspective-[2000px]"
        style={{
          transform: outerTiltTransform,
          transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`, // ✔ 기울기/상승만 부드럽게
        }}
      >
        <div style={{ transform: innerOrbitTransform, transition: 'none' }}>
          {dishes.map((dish, index) => {
            if (visibleIndexes && !visibleIndexes.includes(index)) return null;
            let tilt = 0;
            let clickable = false;
            if (selectedDish !== null) {
              if (index === ((frontDishIndex - 1) + dishes.length) % dishes.length) { tilt = -60; clickable = true; }
              else if (index === (frontDishIndex + 1) % dishes.length) { tilt = 60; clickable = true; }
              else if (index === frontDishIndex) { tilt = 0; clickable = true; }
            } else {
              clickable = index === frontDishIndex;
            }

            return (
              <DishItem
                key={`dish-${index}`}
                dish={dish}
                index={index}
                frontDishIndex={frontDishIndex}
                scale={dishScales[index]}
                orbitAngle={orbitAngle}
                handleDishClick={handleDishClick}
                tilt={tilt}
                clickable={clickable}
                hideText={hideText}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

export default DishContainer;
