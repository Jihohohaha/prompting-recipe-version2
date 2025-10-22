// LogoOrbitFlat.jsx
import React from 'react';
import { DISH_SIZE, RADIUS } from './dishesData';

const TILT_MS = 800;
const FADE_MS = 280;

function FadePresence({ show, children, instant = false }) {
  const [render, setRender] = React.useState(show);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
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
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0.92)',
      transition: instant ? 'none' : `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
      willChange: 'opacity, transform',
    }}>
      {children}
    </div>
  );
}

/**
 * 2D 타원 궤도 위에 로고만 렌더 (기울이지 않음 → 찌부 없음)
 * - 중심: 화면 중앙 + 기존 오비트 Y 오프셋
 * - 반지름: X = RADIUS, Y = RADIUS * cos(|tilt|)
 * - 각도: base(index*45) + rotationAngle
 * - 보이는 인덱스: 틸트 규칙과 동일(-45°, -90°, -135°)
 */
const LogoOrbitFlat = React.memo(function LogoOrbitFlat({
  items,
  rotationAngle,
  orbitTiltDeg = 0,
  frontDishIndex,
  isTiltMode = false,
  instant = false,
  centerBoost = 1.08,
  logoScalePct = 0.42,
}) {
  if (!isTiltMode || !items?.length) return null;

  const n = items.length;
  const visible = [
    (frontDishIndex + 5) % n,          // -45°
    (frontDishIndex - 4 + n) % n,      // -90°
    (frontDishIndex - 5 + n) % n,      // -135°
  ];
  const centerIndex = (frontDishIndex - 4 + n) % n;

  const liftY = orbitTiltDeg !== 0 ? -600 : 0;
  // 부모 컨테이너가 이미 (윈도 중앙, +530)에 놓여 있으므로,
  // 이 컴포넌트 내부 좌표계의 중심은 (0, 0) 이다.
  const cx = 0;
  const cy = liftY;

  const tiltRad = Math.abs(orbitTiltDeg) * Math.PI / 180;
  const rx = RADIUS;
  const ry = RADIUS * Math.cos(tiltRad); // ⬅️ 세로 반지름만 압축 → 시각적 퍼스펙티브 근사

  return (
    <div
      className="absolute"
      style={{
        left: 0, top: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        zIndex: 65, // 접시(40)와 오버레이(60) 사이/위치 조절 가능
        transition: `transform ${TILT_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
      }}
    >
      {items.map((dish, index) => {
        if (!visible.includes(index) || !dish?.logo) return null;
        const totalDeg = index * 45 + rotationAngle; // 궤도 회전 반영
        const a = (totalDeg * Math.PI) / 180;
        const x = cx + rx * Math.cos(a);
        const y = cy + ry * Math.sin(a);

        const size = DISH_SIZE * logoScalePct * (index === centerIndex ? centerBoost : 1);

        return (
          <FadePresence key={`logo-flat-${index}`} show={true} instant={instant}>
            <div
              style={{
                position: 'absolute',
                left: x - size / 2,
                top:  y - size / 2,
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
              }}
            >
              <img
                src={dish.logo}
                alt={`${dish.title} logo`}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
              />
            </div>
          </FadePresence>
        );
      })}
    </div>
  );
});

export default LogoOrbitFlat;
