import React, { useState, useEffect } from 'react';
import DishItem from './DishItem';

const TILT_MS = 800;
const FADE_MS = 280;

// ★ 공통 회전 애니메이션(모든 궤도에서 사용)
export const ORBIT_ROTATE_MS = 1000;
export const ORBIT_EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

function FadePresence({ show, children, style = {}, className = '', instant = false }) {
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      if (!render) setRender(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      if (instant) { setRender(false); setVisible(false); return; }
      setVisible(false);
      const t = setTimeout(() => setRender(false), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [show, render, instant]);

  if (!render) return null;

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transition: instant ? 'none' : `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
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
  handleDishClick,
  selectedDish,     // (호환용)
  hideText = false,
  isTiltMode = false,
  instant = false,
  showTiltLogos = true, // 틸트 시 접시 위 로고 표시 여부
}) {
  const n = items?.length ?? 0;

  // 보일 인덱스: 프리틸트(45/90/135) vs 틸트(-45/-90/-135)
  let visibleIndexes = null;
  if (n) {
    if (!isTiltMode) {
      visibleIndexes = [((frontDishIndex + 1) % n), frontDishIndex, ((frontDishIndex - 1 + n) % n)];
    } else {
      visibleIndexes = [((frontDishIndex + 5) % n), ((frontDishIndex - 4 + n) % n), ((frontDishIndex - 5 + n) % n)];
    }
  }

  const baseTilt = orbitTiltDeg;
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;
  const outerTiltTransform = `translateY(${liftY}px) rotateX(${baseTilt}deg)`;
  const innerOrbitTransform = `rotate(${rotationAngle}deg)`;

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
      <div style={{ transform: innerOrbitTransform, transition: `transform ${ORBIT_ROTATE_MS}ms ${ORBIT_EASE}` }}>
        {items.map((dish, index) => {
          const shouldShow = !visibleIndexes || visibleIndexes.includes(index);
          const clickable = shouldShow;
          const tilt = 0;

          const showLogo  = isTiltMode && showTiltLogos && !!dish.logo;
          const showTitle = isTiltMode && index === ((frontDishIndex - 4 + n) % n); // -90°만 제목

          return (
            <FadePresence key={`dish-${index}`} show={shouldShow} instant={instant}>
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
