import React, { useState, useEffect } from 'react';
import { DISH_SIZE, RADIUS } from './dishesData';

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
        transformOrigin: '50% 0%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const OrbitOverlay = React.memo(function OrbitOverlay({
  items,
  rotationAngle,
  orbitTiltDeg = 0,
  frontDishIndex,
  dishScales,
  selectedDish,
  onCircleClick, // 호환용(미사용)
  isTiltMode = false,
}) {
  const n = items?.length ?? 0;

  // 표시 인덱스 규칙(DishContainer와 동일)
  let visibleIndexes = null;
  if (n) {
    if (!isTiltMode) {
      visibleIndexes = [
        ((frontDishIndex + 1) % n),
        frontDishIndex,
        ((frontDishIndex - 1 + n) % n),
      ];
    } else {
      visibleIndexes = [
        ((frontDishIndex + 5) % n),
        ((frontDishIndex - 4 + n) % n),
        ((frontDishIndex - 5 + n) % n),
      ];
    }
  }

  const baseTilt = orbitTiltDeg;
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;
  const outerTiltTransform = `translateY(${liftY}px) rotateX(${baseTilt}deg)`;

  // 180° 스핀 제거
  const orbitAngle = rotationAngle;

  // 항상 포인터 비활성(클릭은 DishItem이 담당)
  const overlayPointerEvents = 'none';

  return (
    <div
      className="absolute z-[60] perspective-[2000px]"
      style={{
        transform: outerTiltTransform,
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        pointerEvents: overlayPointerEvents,
      }}
    >
      <div style={{ transform: `rotate(${orbitAngle}deg)`, transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        {items.map((dish, index) => {
          const shouldShow = !visibleIndexes || visibleIndexes.includes(index);
          const baseAngle = index * 45;
          const rad = (baseAngle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);

          const scale = dishScales?.[index] ?? 1;
          const size = Math.max(0, DISH_SIZE - 40); // 디자인 유지

          return (
            <FadePresence key={`overlay-${index}`} show={shouldShow}>
              <div
                className="absolute"
                style={{
                  left: `${x - size / 2}px`,
                  top: `${y - size / 2}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `rotate(${-orbitAngle}deg) scale(${scale})`,
                  transformStyle: 'preserve-3d',
                  transition: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  border: '1px solid rgba(0, 0, 0, 0)',
                  boxSizing: 'border-box',
                  borderRadius: '50%',
                }}
              />
            </FadePresence>
          );
        })}
      </div>
    </div>
  );
});

export default OrbitOverlay;
