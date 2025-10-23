// LogoOrbit.jsx — 궤도(타원)는 고정, "각도(θ) 기준"으로 로고만 회전
import React, { useMemo, useRef } from 'react';
import { RADIUS } from './dishesData';
import { ORBIT_ROTATE_MS, ORBIT_EASE } from './DishContainer';

const LOGO_SIZE = 120;
const LIFT_Y = -650;
const FORCE_GUIDE = false;

const mod = (x, m) => ((x % m) + m) % m;

// 간격 패턴(퍼센트 합 100으로 정규화 후 '각도'로 변환)
function computeAngleAnchorsDeg(n, gapAnchorDeg = 0) {
  const pattern = [1,1,1,1,1,1,1,1];
  if (n !== 8) console.warn('computeAngleAnchorsDeg: n=8 전용 패턴입니다.');
  const sum = pattern.reduce((a, b) => a + b, 0);
  const pct = pattern.map(v => (v / sum) * 100);
  const gapDeg = pct.map(p => (p / 100) * 360);
  const A = new Array(n).fill(0);
  for (let i = 1; i < n; i++) A[i] = A[i - 1] + gapDeg[i - 1];
  for (let i = 0; i < n; i++) A[i] = mod(A[i] + gapAnchorDeg, 360);
  return A;
}

// 0..360 값 배열을 정렬하여 (순서, 언랩 각도) 반환
function sortAndUnwrapDeg(posByIndex) {
  const pairs = Object.keys(posByIndex).map(i => [Number(i), mod(posByIndex[i], 360)]);
  pairs.sort((a, b) => a[1] - b[1]);
  const order = pairs.map(p => p[0]);
  const base  = pairs.map(p => p[1]);
  const unwrapped = [...base];
  for (let i = 1; i < unwrapped.length; i++) {
    if (unwrapped[i] < unwrapped[i - 1]) unwrapped[i] += 360;
  }
  return { order, unwrapped };
}

/** ─────────────────────────────
 *  9시→…→3시(270°→…→90°) 구간 투명 처리
 *  - 호 내부: opacity = 0
 *  - 경계 밖 FEATHER_DEG까지: 0→1로 부드럽게 복귀(smoothstep)
 *  - 그 밖: 1
 *  ※ FEATHER_DEG 키워서 전환을 더 완만하게 만들 수 있음
 */
const FEATHER_DEG = 16;

function opacityForArc_9to3(thetaDeg) {
  const a = mod(thetaDeg, 360);
  const inside = (a >= 90 && a <= 270); // [270,360) ∪ [0,90]
  if (inside) return 0;

  // 경계(90°, 270°)로부터의 거리
  // 호 바깥 구간만 오므로 거리 = min(a-90, 270-a) (여기서 a∈(90,270))
  if (a > 90 && a < 270) {
    const d = Math.min(a - 90, 270 - a);
    if (d >= FEATHER_DEG) return 1;
    const t = d / FEATHER_DEG;
    const smooth = t * t * (3 - 2 * t); // smoothstep
    return smooth; // 0→1
  }

  // 수치 오차 보호
  return 1;
}

const LogoOrbit = React.memo(function LogoOrbit({
  items,
  rotationAngle,      // deg
  orbitTiltDeg = 0,   // 타원 세로 반지름 계산용
  instant = false,
  showGuide = false,
  gapAnchorDeg = 0,   // 패턴 시작 각(12시=0°)
}) {
  const n = items?.length ?? 0;
  if (!n) return null;
  if (n !== 8) console.warn('LogoOrbit: 이 버전은 8개 로고를 전제로 만든 간격 규칙입니다.');

  // 타원 파라미터 (궤도는 화면상 고정)
  const a = RADIUS;
  const k = Math.cos(Math.abs(orbitTiltDeg) * Math.PI / 180); // 0..1
  const b = a * k;

  // [고정] 각도 기반 슬롯 기준각
  const anchorsDeg = useMemo(() => computeAngleAnchorsDeg(n, gapAnchorDeg), [n, gapAnchorDeg]);

  // 매핑/위상 상태
  const prevAngleRef  = useRef(rotationAngle);
  const phaseDegRef   = useRef(null);      // 전역 위상(언랩 도수)
  const slotOfRef     = useRef(null);      // 로고 i → 슬롯 j
  const anchorsKeyRef = useRef(null);
  const itemsCountRef = useRef(n);

  // anchors/n 바뀌면 초기화
  const anchorsKey = anchorsDeg.map(v => v.toFixed(6)).join('|');
  if (anchorsKeyRef.current !== anchorsKey || itemsCountRef.current !== n) {
    anchorsKeyRef.current = anchorsKey;
    itemsCountRef.current = n;
    slotOfRef.current = null;
    phaseDegRef.current = null;
  }

  // 회전 변화량 → 전역 위상 변화량(도) (시계 + → θ 감소)
  const deltaAngle = rotationAngle - prevAngleRef.current;
  const deltaPhaseDeg = -deltaAngle;
  prevAngleRef.current = rotationAngle;

  // 초기화: 균등 배치를 anchorsDeg에 "1회 정렬"로 매칭
  if (!slotOfRef.current || phaseDegRef.current == null) {
    const rotDeg = mod(rotationAngle, 360);
    const base = Array.from({ length: n }, (_, i) => mod(i * (360 / n) - rotDeg, 360));
    const { order, unwrapped } = sortAndUnwrapDeg(
      base.reduce((obj, v, i) => (obj[i] = v, obj), {})
    );

    const slotOf = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      const iIdx = order[j];
      slotOf[iIdx] = j;
    }

    const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const C0 = mean(unwrapped.map((u, j) => u - anchorsDeg[j]));

    slotOfRef.current = slotOf;
    phaseDegRef.current = C0; // 언랩 도수
  } else {
    // 매 프레임: 전역 위상만 누적
    phaseDegRef.current += deltaPhaseDeg;
  }

  const slotOf = slotOfRef.current;
  const phaseDeg = phaseDegRef.current ?? 0;
  const showGuideFinal = showGuide || FORCE_GUIDE;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 80 }}>
      {/* 중앙 기준 + LIFT_Y (궤도 도형은 고정) */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, calc(-50% + ${LIFT_Y}px))`,
          width: 0,
          height: 0,
        }}
      >
        {/* 가이드 타원 */}
        {showGuideFinal && (
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

        {/* 아이템 배치 */}
        {items.map((dish, i) => {
          const src = dish?.logo;
          if (!src) return null;

          // θ(도): 슬롯 기준각 + 전역 위상
          const thetaDeg = anchorsDeg[slotOf[i]] + phaseDeg; // 언랩 허용
          const rad = (thetaDeg * Math.PI) / 180;

          // 12시=0°, 반시계+, 타원 파라미터식
          const x = a * Math.sin(rad);
          const y = b * Math.cos(rad);

          // 9→…→3시 호에서 투명
          const opacity = opacityForArc_9to3(thetaDeg);

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
                  : `transform ${ORBIT_ROTATE_MS}ms ${ORBIT_EASE}, opacity ${ORBIT_ROTATE_MS}ms ${ORBIT_EASE}`,
                willChange: 'transform, opacity',
                opacity,
              }}
            >
              <div
                style={{
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
                }}
              >
                <img
                  src={src}
                  alt={`${dish?.title ?? 'logo'} logo`}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default LogoOrbit;
