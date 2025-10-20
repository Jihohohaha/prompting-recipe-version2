import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DISH_SIZE, RADIUS } from './dishesData';

const TILT_MS = 800; // 기울기/상승 모션(ms)
const FADE_MS = 280; // 등장/퇴장 모션(ms)

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
  items, // ← 데이터 배열(렌더 포지션 동일)
  rotationAngle,
  orbitTiltDeg = 0,
  frontDishIndex,
  dishScales,
  selectedDish,
  onCircleClick,
}) {
  const navigate = useNavigate();

  const handleDishClick = (dish, index) => {
    if (!dish) return;
    if (orbitTiltDeg !== 0) {
      if (dish.address) {
        navigate(dish.address);
      }
      return;
    }

    onCircleClick();
  };

  const n = items?.length ?? 0;

  // 기울었거나 선택 모드면 (11시,12시,1시)만 보이기
  const isNarrow = orbitTiltDeg !== 0 || selectedDish !== null;
  let visibleIndexes = null;
  if (isNarrow && n) {
    visibleIndexes = [
      ((frontDishIndex - 5) + n) % n, // 11시
      ((frontDishIndex - 4) + n) % n, // 12시(센터)
      (frontDishIndex + 5) % n,       // 1시
    ];
  }

  const orbitAngle = rotationAngle + (selectedDish ? 180 : 0);
  const baseTilt = orbitTiltDeg + (selectedDish ? -60 : 0);

  // 기울어진 상태면 궤도 중심을 위로 600px 올리기
  const liftY = orbitTiltDeg !== 0 ? -600 : 0;

  // 바깥 래퍼: 기울기/상승 모션
  const outerTiltTransform = selectedDish
    ? `translateY(${ -600 + liftY }px) rotateX(${baseTilt}deg)`
    : `translateY(${ liftY }px) rotateX(${baseTilt}deg)`;

  // 안쪽 래퍼: 궤도 회전
  const innerOrbitTransform = `rotate(${orbitAngle}deg)`;

  // 프리-틸트에서는 오버레이를 클릭 불가로 → DishItem이 클릭 받음
  const overlayPointerEvents = orbitTiltDeg === 0 ? 'none' : 'auto';

  return (
    <div
      className="absolute z-[60] perspective-[2000px]"
      style={{
        transform: outerTiltTransform,
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
        pointerEvents: overlayPointerEvents,
      }}
    >
      <div style={{ transform: innerOrbitTransform, transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        {items.map((dish, index) => {
          const shouldShow = !visibleIndexes || visibleIndexes.includes(index);
          const baseAngle = index * 45;
          const rad = (baseAngle * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);

          let tilt = 0;
          if (selectedDish !== null) {
            const leftIdx  = ((frontDishIndex - 1) + n) % n;
            const rightIdx = (frontDishIndex + 1) % n;
            if (index === leftIdx) tilt = -60;
            else if (index === rightIdx) tilt = 60;
            else if (index === frontDishIndex) tilt = 0;
          }

          const scale = dishScales?.[index] ?? 1;
          const size = Math.max(0, DISH_SIZE - 40); // 디자인 유지

          return (
            <FadePresence key={`overlay-${index}`} show={shouldShow}>
              <div
                className="absolute cursor-pointer pointer-events-auto"
                onClick={() => handleDishClick(dish, index)}
                style={{
                  left: `${x - size / 2}px`,
                  top: `${y - size / 2}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `rotate(${-orbitAngle}deg) scale(${scale}) rotateX(${tilt}deg)`,
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
