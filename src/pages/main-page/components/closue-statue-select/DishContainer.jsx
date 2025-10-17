import React, { useState, useEffect } from 'react';
import DishItem from './DishItem';
import { dishes } from './dishesData';

const TILT_MS = 800; // 기울기/상승 모션(ms)
const FADE_MS = 280; // 등장/퇴장 모션(ms)

// ✅ 공용 페이드 프레즌스: show=true면 마운트 후 opacity/scale로 등장,
//    show=false면 opacity/scale로 퇴장 후 언마운트
function FadePresence({ show, children, style = {}, className = '' }) {
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      if (!render) setRender(true);
      // 다음 프레임에 visible=true로 트리거 → 부드러운 등장
      requestAnimationFrame(() => setVisible(true));
    } else {
      // 퇴장 애니메이션
      setVisible(false);
      const t = setTimeout(() => setRender(false), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [show, render]);

  if (!render) return null;

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const DishContainer = React.memo(
  ({ rotationAngle, orbitTiltDeg = 0, frontDishIndex, dishScales, handleDishClick, selectedDish, hideText = false }) => {
    // ✅ 12시 기준: 기울었거나 선택 모드면 (11시,12시,1시)만 보이기
    const isNarrow = orbitTiltDeg !== 0 || selectedDish !== null;
    let visibleIndexes = null;
    if (isNarrow) {
      visibleIndexes = [
        ((frontDishIndex - 5) + dishes.length) % dishes.length, 
        ((frontDishIndex - 4) + dishes.length) % dishes.length,
        (frontDishIndex + 5) % dishes.length,
      ];
    }

    const orbitAngle = rotationAngle + (selectedDish ? 180 : 0);
    const baseTilt = orbitTiltDeg + (selectedDish ? -60 : 0); // ⬅️ 기존 기울기 로직 유지

    // 🔼 기울어진 상태면 궤도 중심을 위로 600px 올리기
    const liftY = orbitTiltDeg !== 0 ? -600 : 0;

    // 바깥 래퍼: 기울기/상승 모션 (원래 로직 유지)
    const outerTiltTransform = selectedDish
      ? `translateY(${ -600 + liftY }px) rotateX(${baseTilt}deg)`
      : `translateY(${ liftY }px) rotateX(${baseTilt}deg)`;

    // 안쪽 래퍼: 궤도 회전
    const innerOrbitTransform = `rotate(${orbitAngle}deg)`;

    return (
      <div
        className="absolute pointer-events-auto"
        style={{
          zIndex: orbitTiltDeg !== 0 ? 40 : 10, // 기울 때 석상보다 앞
          transform: outerTiltTransform,
          transformOrigin: '0 0',
          transformStyle: 'preserve-3d',
          transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        }}
      >
        {/* ✅ 스냅 모션용 짧은 트랜지션 */}
        <div style={{ transform: innerOrbitTransform, transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
          {dishes.map((dish, index) => {
            const shouldShow = !visibleIndexes || visibleIndexes.includes(index);
            // 완전히 사라질 때까지 pointer-events는 FadePresence 내부에서 관리하지 않고,
            // DishItem의 clickable 로직 그대로 유지

            let tilt = 0;
            let clickable = false;

            // ⬇️ ⬇️ ⬇️  기존 "선택 모드에서만 기울기/클릭 확장" 로직 그대로 유지
            if (selectedDish !== null) {
              if (index === ((frontDishIndex - 1) + dishes.length) % dishes.length) { tilt = -60; clickable = true; }
              else if (index === (frontDishIndex + 1) % dishes.length) { tilt = 60; clickable = true; }
              else if (index === frontDishIndex) { tilt = 0; clickable = true; }
            } else {
              clickable = index === frontDishIndex;
            }
            // ⬆️ ⬆️ ⬆️

            return (
              <FadePresence key={`dish-${index}`} show={shouldShow}>
                <DishItem
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
              </FadePresence>
            );
          })}
        </div>
      </div>
    );
  }
);

export default DishContainer;
