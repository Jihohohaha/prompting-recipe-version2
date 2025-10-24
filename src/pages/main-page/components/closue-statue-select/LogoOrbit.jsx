// LogoOrbit.jsx — 로고와 동일 모션/타이밍, 6시(180°) 윈도우에서만 제목 페이드
import React, { useEffect, useState, useMemo } from 'react';
import { RADIUS } from './dishesData';
import { ORBIT_ROTATE_MS, ORBIT_EASE } from './DishContainer';

const LOGO_SIZE = 80;
const LIFT_Y = -650;
const ENTRY_MS = 800;

// 로고 투명 페더(하단 구간)
const FEATHER_DEG = 16;
// 제목 노출 범위(6시 주변 ±WINDOW_DEG)
const WINDOW_DEG = 18; // 필요시 16~24 사이로 조정 권장

const mod = (x, m) => ((x % m) + m) % m;

// 9시(90°) ~ 3시(270°) 구간 투명 + 경계 페더
function opacityForArc_9to3(thetaDeg) {
  const a = mod(thetaDeg, 360);
  if (a > 90 && a < 270) return 0; // 내부는 완전 투명
  const d = Math.min(Math.abs(a - 90), Math.abs(a - 270));
  if (d < FEATHER_DEG) {
    const t = d / FEATHER_DEG;
    return t * t * (3 - 2 * t); // smoothstep
  }
  return 1;
}

// 원형 최단 각도차
const angDiff = (a, b) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

// 6시 윈도우(±WINDOW_DEG)에서만 부드럽게 보이게 하는 opacity
function sixWindowOpacity(thetaDeg) {
  const d = angDiff(mod(thetaDeg, 360), 0); // 6시 = 180°
  if (d >= WINDOW_DEG) return 0;
  // 0에서 1로 스무스 인/아웃
  const t = 1 - d / WINDOW_DEG; // [0..1]
  return t * t * (3 - 2 * t);   // smoothstep
}

const LogoOrbit = React.memo(function LogoOrbit({
  items,
  rotationAngle,          // deg
  orbitTiltDeg = 0,       // 타원 세로 반지름 계산용
  instant = false,
  showGuide = false,
}) {
  const n = items?.length ?? 0;
  if (!n) return null;

  const a = RADIUS;
  const k = Math.cos(Math.abs(orbitTiltDeg) * Math.PI / 180);
  const b = a * k;

  // 최초 진입 슬라이드 인
  const [entryOffsetY, setEntryOffsetY] = useState(-LIFT_Y);
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntryOffsetY(0));
    return () => cancelAnimationFrame(id);
  }, []);

  // 각 로고의 현재 각도/좌표/투명도 계산 (접시와 동일 규칙 유지)
  const logos = useMemo(() => {
    return items.map((dish, i) => {
      // 현재 프로젝트 좌표계: 12시=0°, 반시계+, theta = -i*45 - rotationAngle + 90
      const thetaDeg = -i * 45 - rotationAngle + 90;
      const rad = (thetaDeg * Math.PI) / 180;
      const x = a * Math.sin(rad);
      const y = b * Math.cos(rad);
      const logoOpacity = opacityForArc_9to3(thetaDeg);   // 로고용(하단 구간 투명)
      const titleOpacity = sixWindowOpacity(thetaDeg);     // 제목용(6시 윈도우)
      return { i, dish, thetaDeg: mod(thetaDeg, 360), x, y, logoOpacity, titleOpacity };
    });
  }, [items, rotationAngle, a, b]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 80 }}>
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, calc(-50% + ${LIFT_Y + entryOffsetY}px))`,
          transition: instant ? 'none' : `transform ${ENTRY_MS}ms ${ORBIT_EASE}`,
          width: 0,
          height: 0,
        }}
      >
        {/* (옵션) 가이드 타원 */}
        {showGuide && (
          <svg
            width={a * 2}
            height={b * 2}
            viewBox={`${-a} ${-b} ${2 * a} ${2 * b}`}
            style={{ position: 'absolute', left: -a, top: -b, pointerEvents: 'none' }}
          >
            <ellipse cx="0" cy="0" rx={a} ry={b} fill="none" stroke="red" strokeDasharray="6 6" />
            <line x1="0" y1={b} x2="0" y2={-b} stroke="red" strokeDasharray="4 4" />
          </svg>
        )}

        {/* 로고 + 6시 윈도우 제목(같은 트랜스폼/타이밍) */}
        {logos.map(({ i, dish, x, y, logoOpacity, titleOpacity }) => {
          const src = dish?.logo;
          if (!src) return null;

          return (
            <div
              key={`logo-${i}`}
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                transform: `translate(${x}px, ${y}px)`,
                transition: instant
                  ? 'none'
                  : `transform ${ORBIT_ROTATE_MS}ms ${ORBIT_EASE}`,
                willChange: 'transform',
              }}
            >
              {/* 로고 레이어(하단 투명) */}
              <div
                className="flex flex-col justify-start items-center"
                style={{
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
                  opacity: logoOpacity,
                  transition: instant ? 'none' : `opacity ${ORBIT_ROTATE_MS-700}ms ${ORBIT_EASE}`,
                  willChange: 'opacity',
                }}
              >
                <img
                  src={src}
                  alt={`${dish?.title ?? 'logo'} logo`}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
                />
              </div>

              {/* 제목 레이어 — 로고와 동일 방향/속도로 이동, 6시 윈도우에서만 페이드 인/아웃 */}
              <div
                className="absolute text-black text-center font-pretendard font-bold whitespace-nowrap"
                style={{
                  transform: 'translate(-50%, calc(-80%))', // 예전 위치(로고 바로 아래)
                  fontSize: 32,
                  textShadow: '0 2px 6px rgba(255,255,255,0.8)',
                  opacity: titleOpacity,
                  transition: 'none',
                  willChange: 'opacity',
                }}
              >
                {dish?.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LogoOrbit;
