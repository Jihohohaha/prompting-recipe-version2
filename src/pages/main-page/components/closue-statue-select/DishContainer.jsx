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
  selectedDish,
  hideText = false, // 상단에서 false로 넘김(세부 제어는 아래에서)
}) {
  const n = items?.length ?? 0;
  const isTiltMode = orbitTiltDeg !== 0 || selectedDish !== null;

  const isNarrow = isTiltMode;
  let visibleIndexes = null;
  if (isNarrow && n) {
    visibleIndexes = [
      ((frontDishIndex - 5) + n) % n,
      ((frontDishIndex - 4) + n) % n,
      (frontDishIndex + 5) % n,
    ];
  }

  const orbitAngle = rotationAngle + (selectedDish ? 180 : 0);
  const baseTilt = orbitTiltDeg + (selectedDish ? -60 : 0);
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;

  const outerTiltTransform = selectedDish
    ? `translateY(${ -600 + liftY }px) rotateX(${baseTilt}deg)`
    : `translateY(${ liftY }px) rotateX(${baseTilt}deg)`;

  const innerOrbitTransform = `rotate(${orbitAngle}deg)`;

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

          let tilt = 0;
          let clickable = false;

          if (!isTiltMode) {
            // 프리-틸트: 전 접시 클릭 가능(정면만 처리됨)
            clickable = true;
          } else {
            // 틸트 중: center/좌/우만 클릭 가능(기존 유지)
            if (selectedDish !== null) {
              if (index === ((frontDishIndex - 1) + n) % n) { tilt = -60; clickable = true; }
              else if (index === (frontDishIndex + 1) % n)   { tilt = 60;  clickable = true; }
              else if (index === frontDishIndex)             { tilt = 0;   clickable = true; }
            } else {
              clickable = index === frontDishIndex;
            }
          }

          // ── 표시 정책
          // 프리-틸트: 텍스트(제목/부제)만 표시
          // 틸트: 모든 접시 로고 표시, 정면 접시만 타이틀도 표시
          const showLogo  = isTiltMode && !!dish.logo;
          const showTitle = isTiltMode && index === frontDishIndex;

          return (
            <FadePresence key={`dish-${index}`} show={shouldShow}>
              <DishItem
                dish={dish}
                index={index}
                frontDishIndex={frontDishIndex}
                scale={dishScales[index] ?? 1}
                orbitAngle={orbitAngle}
                handleDishClick={handleDishClick}
                tilt={tilt}
                clickable={clickable}
                hideText={!isTiltMode ? false : true}  // 틸트에선 텍스트 기본 숨김
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
