import React, { useState, useEffect } from 'react';
import DishItem from './DishItem';

const TILT_MS = 800;
const FADE_MS = 280;

function FadePresence({ show, children, style = {}, className = '' }) {
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      if (!render) setRender(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
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

const DishContainer = React.memo(function DishContainer({
  items,
  rotationAngle,
  orbitTiltDeg = 0,
  frontDishIndex,
  dishScales,
  handleDishClick, // (dish, index)
  selectedDish,    // 디자인 호환용
  hideText = false,
  isTiltMode = false,
}) {
  const n = items?.length ?? 0;

  // 표시할 인덱스 3개 계산
  let visibleIndexes = null;
  if (n) {
    if (!isTiltMode) {
      // 프리-틸트: 45°, 90°, 135°
      visibleIndexes = [
        ((frontDishIndex + 1) % n),          // 45°
        frontDishIndex,                      // 90°
        ((frontDishIndex - 1 + n) % n),      // 135°
      ];
    } else {
      // 틸트: -45°, -90°, -135°
      visibleIndexes = [
        ((frontDishIndex + 5) % n),          // -45°
        ((frontDishIndex - 4 + n) % n),      // -90°
        ((frontDishIndex - 5 + n) % n),      // -135°
      ];
    }
  }

  const baseTilt = orbitTiltDeg;
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;
  const outerTiltTransform =
    `translateY(${liftY}px) rotateX(${baseTilt}deg)`;

  // 180° 스핀 제거: rotationAngle만 사용
  const innerOrbitTransform =
    `rotate(${rotationAngle}deg)`;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        zIndex: orbitTiltDeg !== 0 ? 40 : 10,
        transform: outerTiltTransform,
        transformOrigin: '0 0',
        transformStyle: 'preserve-3d',
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
      }}
    >
      <div style={{ transform: innerOrbitTransform, transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        {items.map((dish, index) => {
          const shouldShow = !visibleIndexes || visibleIndexes.includes(index);

          // 클릭 가능: 현재 보여주는 3개만
          const clickable = shouldShow;
          const tilt = 0;

          // 프리-틸트: 텍스트 보임 / 틸트: 로고표시 및 -90° 타이틀
          const showLogo  = isTiltMode && !!dish.logo;
          const showTitle = isTiltMode && index === ((frontDishIndex - 4 + n) % n); // -90°만 제목

          return (
            <FadePresence key={`dish-${index}`} show={shouldShow}>
              <DishItem
                dish={dish}
                index={index}
                frontDishIndex={frontDishIndex}
                scale={dishScales[index] ?? 1}
                orbitAngle={rotationAngle}
                handleDishClick={handleDishClick}
                tilt={tilt}
                clickable={clickable}
                hideText={!isTiltMode ? false : true}
                showLogo={showLogo}
                showTitle={showTitle}
              />
            </FadePresence>
          );
        })}
      </div>
    </div>
  );
});

export default DishContainer;
