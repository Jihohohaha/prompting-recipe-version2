import React from 'react';
import { dishes } from './dishesData';
import { DISH_SIZE, RADIUS } from './dishesData';

const TILT_MS = 800; // 기울기/상승 모션(ms)

const OrbitOverlay = React.memo(function OrbitOverlay({
  rotationAngle,
  orbitTiltDeg = 0,
  frontDishIndex,
  dishScales,
  selectedDish,
  onCircleClick,
}) {
  // ✅ 선택됐거나(선택 모드) OR 기울어진 상태면 3개만 보이기
  const isTilted = orbitTiltDeg !== 0 || selectedDish !== null;
  let visibleIndexes = null;
  if (isTilted) {
    visibleIndexes = [
      (frontDishIndex + 4) % dishes.length, // 6시(센터)
      (frontDishIndex + 3) % dishes.length, // 왼쪽
      (frontDishIndex + 5) % dishes.length, // 오른쪽
    ];
  }

  const orbitAngle = rotationAngle + (selectedDish ? 180 : 0);
  const baseTilt = orbitTiltDeg + (selectedDish ? -60 : 0);

  // 🔼 기울어진 상태면 궤도 중심을 위로 600px 올리기
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;

  // 바깥 래퍼: translateY(선택시 -600 + 기울기상승) + rotateX(기울기)  ← 여기에만 트랜지션
  const outerTiltTransform = selectedDish
    ? `translateY(${ -600 + liftY }px) rotateX(${baseTilt}deg)`
    : `translateY(${ liftY }px) rotateX(${baseTilt}deg)`;

  // 안쪽 래퍼: 궤도 회전(즉시)
  const innerOrbitTransform = `rotate(${orbitAngle}deg)`;

  return (
    <div
      className="absolute z-[60] perspective-[2000px]"
      style={{
        transform: outerTiltTransform,
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`, // ✔ 기울기/상승만 부드럽게
      }}
    >
      <div style={{ transform: innerOrbitTransform, transition: 'none' }}>
        {dishes.map((dish, index) => {
          // ✅ 3개만 보이게 필터
          if (visibleIndexes && !visibleIndexes.includes(index)) return null;

          const baseAngle = index * 45;
          const rad = (baseAngle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);

          let tilt = 0;
          if (selectedDish !== null) {
            const leftIdx  = ((frontDishIndex - 1) + dishes.length) % dishes.length;
            const rightIdx = (frontDishIndex + 1) % dishes.length;
            if (index === leftIdx) tilt = -60;
            else if (index === rightIdx) tilt = 60;
            else if (index === frontDishIndex) tilt = 0;
          }

          const scale = dishScales?.[index] ?? 1;
          const size = Math.max(0, DISH_SIZE - 40); // 반지름 20px 감소

          return (
            <div
              key={`overlay-${index}`}
              className="absolute cursor-pointer pointer-events-auto"
              onClick={onCircleClick}
              style={{
                left: `${x - size / 2}px`,
                top: `${y - size / 2}px`,
                width: `${size}px`,
                height: `${size}px`,
                // 접시와 동일하게 제자리 방향 유지
                transform: `rotate(${-orbitAngle}deg) scale(${scale}) rotateX(${tilt}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                border: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
                borderRadius: '50%',
              }}
            />
          );
        })}
      </div>
    </div>
  );
});

export default OrbitOverlay;
