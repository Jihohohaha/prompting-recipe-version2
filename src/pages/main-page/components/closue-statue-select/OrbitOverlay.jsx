import React, { useState, useEffect } from 'react';
import { DISH_SIZE, RADIUS } from './dishesData';
import { ORBIT_ROTATE_MS, ORBIT_EASE } from './DishContainer';

const TILT_MS = 800;
const FADE_MS = 280;

function FadePresence({ show, children, style = {}, className = '', instant = false }) {
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) { if (!render) setRender(true); requestAnimationFrame(() => setVisible(true)); }
    else {
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
  selectedDish,       // (호환용)
  onCircleClick,      // (미사용)
  isTiltMode = false,
  instant = false,
  showGuide = false,  // 디버그: 궤도 가이드(점선 원) 표시
}) {
  const n = items?.length ?? 0;

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
  const orbitAngle = rotationAngle;

  return (
    <div
      className="absolute z-[60] perspective-[2000px]"
      style={{
        transform: outerTiltTransform,
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        pointerEvents: 'none',
      }}
    >
      {/* ⬇ 디버그: 접시 궤도 가이드 (rotateX로 자동 타원화됨) */}
      {showGuide && (
        <div
          className="absolute"
          style={{
            left: -RADIUS,
            top:  -RADIUS,
            width:  `${RADIUS * 2}px`,
            height: `${RADIUS * 2}px`,
            border: '',
            borderRadius: '50%',
            zIndex: 59,
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{ transform: `rotate(${orbitAngle}deg)`, transition: `transform ${ORBIT_ROTATE_MS}ms ${ORBIT_EASE}` }}>
        {items.map((dish, index) => {
          const shouldShow = !visibleIndexes || visibleIndexes.includes(index);
          const baseAngle = index * 45;
          const rad = (baseAngle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);

          const scale = dishScales?.[index] ?? 1;
          const size = Math.max(0, DISH_SIZE - 40);

          return (
            <FadePresence key={`overlay-${index}`} show={shouldShow} instant={instant}>
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
