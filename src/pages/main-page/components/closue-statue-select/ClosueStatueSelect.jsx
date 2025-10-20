// ClosueStatueSelect.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DishContainer from './DishContainer';
import FloatingImage from './FloatingImage';
import KeywordText from './KeywordText';
import OrbitOverlay from './OrbitOverlay';
import { dishes as dishesBase, getAIMenuFor } from './dishesData';

// ───────────────────────── 상수 및 유틸 ─────────────────────────
const STEP_DEG = 45;
const WHEEL_STEP = 80;
const TOUCH_STEP_PX = 40;
const STEP_COOLDOWN_MS = 300;

const normalize360 = (deg) => ((deg % 360) + 360) % 360;

// 현재 rotationAngle에서 12시(정면)에 오는 index 계산
const getFrontIndex = (angleDeg, len) => {
  if (!len) return 0;
  const normalized = normalize360(-angleDeg);
  const rawIndex = Math.round((normalized - 90) / 45);
  return ((rawIndex % len) + len) % len;
};

// 주어진 index가 12시(정면)에 오도록 만드는 각도
const angleForFrontIndex = (index) => -(90 + 45 * index);

// prev에 가장 가까운 동치각으로 스냅(항상 최단 경로 회전)
const nearestAngle = (targetDeg, currentDeg) => {
  const turns = Math.round((currentDeg - targetDeg) / 360);
  return targetDeg + 360 * turns;
};

// 틸트 모드에서 기준 인덱스들(-45, -90, -135)
const tiltedTriplet = (front, n) => ({
  left : ((front - 5) + n) % n,   // -135°
  center: ((front - 4) + n) % n,  // -90°
  right: (front + 5) % n,         // -45°
});

// 프리-틸트에서 상단 3개(45, 90, 135)
const browseTriplet = (front, n) => ({
  left : ((front - 1) + n) % n,   // 135°
  center: front,                  // 90°
  right: (front + 1) % n,         // 45°
});

// ───────────────────────── 컴포넌트 ─────────────────────────
const ClosueStatueSelect = () => {
  const navigate = useNavigate();

  // 뷰/회전 상태
  const [rotationAngle, setRotationAngle] = useState(0);
  const [orbitTiltDeg, setOrbitTiltDeg] = useState(0); // 0 ↔ -70 (틸트)
  const [showMask, setShowMask] = useState(true);

  // 제목 락(틸트 상태에서 제목 고정)
  const [titleLock, setTitleLock] = useState({ active: false, text: null });
  const lockTitleWith = useCallback((text) => setTitleLock({ active: true, text }), []);
  const unlockTitle   = useCallback(() => setTitleLock({ active: false, text: null }), []);

  // 틸트 모드에서의 아이템 세트
  const [aiItems, setAiItems] = useState([]);

  // 틸트 진입 프레임에서만 즉시 숨김 플래그
  const [instantHide, setInstantHide] = useState(false);

  const isTilt = orbitTiltDeg !== 0;
  const items  = isTilt ? aiItems : dishesBase;
  const n      = items.length || 0;

  // 현재 12시에 온 인덱스
  const frontDishIndex = useMemo(
    () => getFrontIndex(rotationAngle, n),
    [rotationAngle, n]
  );
  const frontDish = useMemo(() => items[frontDishIndex] ?? items[0], [items, frontDishIndex]);

  // 제목 텍스트
  const titleText = titleLock.active && titleLock.text ? titleLock.text : (frontDish?.title ?? '');

  // 틸트가 풀리면 제목 락 해제
  useEffect(() => { if (!isTilt) unlockTitle(); }, [isTilt, unlockTitle]);

  // ───────────────────────── Back 히스토리 ─────────────────────────
  const [history, setHistory] = useState([]);
  const pushHistory = useCallback((anchorFrontIndex = null) => {
    setHistory((prev) => [
      ...prev,
      { rotationAngle, orbitTiltDeg, titleLock, aiItems, anchorFrontIndex }
    ]);
  }, [rotationAngle, orbitTiltDeg, titleLock, aiItems]);

  const popHistory = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      const last = prev[prev.length - 1];

      setOrbitTiltDeg(last.orbitTiltDeg);
      setTitleLock(last.titleLock || { active: false, text: null });
      setAiItems(last.aiItems || []);

      if (typeof last.anchorFrontIndex === 'number') {
        const target = angleForFrontIndex(last.anchorFrontIndex);
        setRotationAngle((prevAngle) => nearestAngle(target, prevAngle));
      } else {
        setRotationAngle((prevAngle) => nearestAngle(last.rotationAngle, prevAngle));
      }
      return next;
    });
  }, []);
  const canGoBack = history.length > 0;

  // ───────────────────────── 입력/회전 처리 ─────────────────────────
  const rootRef = useRef(null);
  const stepLockRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const lastTouchYRef = useRef(null);
  const touchAccumRef = useRef(0);

  const doStep = useCallback((dir) => {
    if (stepLockRef.current) return;
    setRotationAngle((prev) => prev + STEP_DEG * dir * -1);
    stepLockRef.current = true;
    setTimeout(() => (stepLockRef.current = false), STEP_COOLDOWN_MS);
  }, []);

  // 마우스 휠 → 단계 회전
  useEffect(() => {
    const onWheel = (e) => {
      const root = rootRef.current;
      if (!root || !root.contains(e.target)) return;
      e.preventDefault();
      if (stepLockRef.current) return;
      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) >= WHEEL_STEP) {
        const dir = wheelAccumRef.current > 0 ? 1 : -1; // 1 = 아래 스크롤 → 반시계 45°
        wheelAccumRef.current = 0;
        doStep(dir);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [doStep]);

  // 터치 스와이프 → 단계 회전
  useEffect(() => {
    const within = (t) => rootRef.current && rootRef.current.contains(t);
    const onStart = (e) => {
      if (!within(e.target)) return;
      if (!e.touches?.length) return;
      lastTouchYRef.current = e.touches[0].clientY;
      touchAccumRef.current = 0;
    };
    const onMove = (e) => {
      if (!within(e.target)) return;
      if (stepLockRef.current || lastTouchYRef.current == null) return;
      if (!e.touches?.length) return;
      const y = e.touches[0].clientY;
      const dy = lastTouchYRef.current - y;
      lastTouchYRef.current = y;
      touchAccumRef.current += dy;
      if (Math.abs(touchAccumRef.current) >= TOUCH_STEP_PX) {
        const dir = touchAccumRef.current > 0 ? 1 : -1;
        touchAccumRef.current = 0;
        doStep(dir);
      }
    };
    const onEnd = () => {
      lastTouchYRef.current = null;
      touchAccumRef.current = 0;
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [doStep]);

  // ───────────────────────── 틸트 진입 헬퍼 ─────────────────────────
  const enterTiltWithCategoryAtFront = useCallback((baseIdx) => {
    // 복귀를 위해 스냅샷
    pushHistory(baseIdx);

    // 틸트 직전 기준 인덱스를 현재 각도에 가장 가까운 동치각으로 스냅
    setRotationAngle((prevAngle) => nearestAngle(angleForFrontIndex(baseIdx), prevAngle));

    // 카테고리 세트 + 제목 락
    const baseDish = dishesBase[baseIdx] ?? dishesBase[0];
    const nextMenu = getAIMenuFor(baseDish.title);
    setAiItems(nextMenu);
    lockTitleWith(baseDish.title);

    // ⬇️ 틸트 진입 프레임: 사라질 접시들 즉시 언마운트
    setInstantHide(true);
    setOrbitTiltDeg(-70);
    // 다음 틱에 해제(다음부터는 기존 페이드 동작 유지)
    setTimeout(() => setInstantHide(false), 0);

    setPendingBaseIndex(null);
  }, [pushHistory, lockTitleWith]);

  // ───────────────────────── 클릭 핸들러 ─────────────────────────
  const handleDishClick = useCallback((dish, index) => {
    if (!dish) return;

    // 틸트 상태
    if (isTilt) {
      const { left, center, right } = tiltedTriplet(frontDishIndex, n);
      if (index === right) { doStep(1);  return; }   // -45° → 반시계 45°
      if (index === left)  { doStep(-1); return; }   // -135° → 시계 45°
      if (index === center){ if (dish.address) navigate(dish.address); return; } // -90° → 라우팅
      return;
    }

    // 프리-틸트 상태
    const { left, center, right } = browseTriplet(frontDishIndex, dishesBase.length);
    if (index === right) { doStep(1);  return; }     // 45° → 반시계 45°
    if (index === left)  { doStep(-1); return; }     // 135° → 시계 45°
    if (index === center) {
      // 바로 틸트 진입(숨김/스핀 없음, 틸트 프레임에 즉시 언마운트)
      enterTiltWithCategoryAtFront(center);
      return;
    }
  }, [isTilt, frontDishIndex, n, doStep, navigate, enterTiltWithCategoryAtFront]);

  // 오버레이 원 클릭: 사용 안 함(클릭은 DishItem이 전담)
  const handleOverlayToggle = useCallback(() => {}, []);

  // ───────────────────────── 틸트 설명용 디테일 인덱스 ─────────────────────────
  const [detailIndex, setDetailIndex] = useState(null);
  useEffect(() => {
    if (!isTilt || n === 0) { setDetailIndex(null); return; }
    const { center } = tiltedTriplet(frontDishIndex, n); // -90°
    setDetailIndex(center);
  }, [isTilt, frontDishIndex, n]);

  const detailDish = (isTilt && detailIndex != null) ? items[detailIndex] : frontDish;

  // ───────────────────────── 파생 UI 값 ─────────────────────────
  const titleScale = isTilt ? 2.5 : 1;
  const descriptionScale = isTilt ? 2 : 1;
  const floatingStyle = { opacity: isTilt ? 0 : 1, transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)' };

  const [dishScales, setDishScales] = useState(() => Array(items.length).fill(1));
  useEffect(() => {
    setDishScales(Array(items.length).fill(1).map((_, i) => (i === frontDishIndex ? 1.1 : 1)));
  }, [items.length, frontDishIndex]);

  // ───────────────────────── 렌더 ─────────────────────────
  return (
    <>
      {showMask && (
        <div
          className="fixed inset-0 bg-black/85 z-[100] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-500"
          onClick={() => setShowMask(false)}
        >
          <h1 className="text-6xl font-bold text-white mb-8 font-koolegant">Choose Your Dish</h1>
          <p className="text-xl text-white mb-12">오늘의 메뉴를 선택하세요.</p>
          <div className="text-white text-lg">Click</div>
        </div>
      )}

      <div
        ref={rootRef}
        className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500 select-none"
        onDragStart={(e) => e.preventDefault()}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        {/* 스크롤 프록시(휠/터치 스텝 회전용) */}
        <div
          className="absolute inset-0 overflow-y-auto z-50 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <div className="h-[1000vh]" />
        </div>

        {/* 제목/설명 */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <h1
            className="text-6xl font-bold text-black mb-4 font-koolegant"
            style={{ transform: `scale(${titleScale})`, transformOrigin: 'center', transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            {titleText}
          </h1>
          <p
            className="text-xl text-black"
            style={{ transform: `scale(${descriptionScale})`, transformOrigin: 'center', transition: 'opacity 0ms', opacity: descriptionScale === 1 ? 1 : 0 }}
          >
            {frontDish?.description}
          </p>
        </div>

        {/* 부유 장식 */}
        <div style={floatingStyle}>
          <FloatingImage src="/images/main-page/flower.png" alt="Flower" className="bottom-[392px] left-[160px] w-[300px] h-[300px] z-0" />
          <FloatingImage src="/images/main-page/cup.png" alt="Cup" className="bottom-[375px] left-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/salt.png" alt="Salt" className="bottom-[400px] right-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/glass.png" alt="Glass" className="bottom-[392px] right-[160px] w-[300px] h-[300px] z-0" />
        </div>

        {/* 프리-틸트 키워드 */}
        {!isTilt && frontDish && (
          <>
            <KeywordText className="bottom-[470px] left-[290px] -translate-x-1/2" fontSizeClass="text-lg">{frontDish.kw1}</KeywordText>
            <KeywordText className="bottom-[450px] left-[290px] -translate-x-1/2" fontSizeClass="text-sm">{frontDish.ekw1}</KeywordText>
            <KeywordText className="bottom-[480px] left-[470px] -translate-x-1/2" fontSizeClass="text-lg">{frontDish.kw2}</KeywordText>
            <KeywordText className="bottom-[460px] left-[470px] -translate-x-1/2" fontSizeClass="text-sm">{frontDish.ekw2}</KeywordText>
            <KeywordText className="bottom-[470px] right-[460px] translate-x-1/2" fontSizeClass="text-lg">{frontDish.kw3}</KeywordText>
            <KeywordText className="bottom-[450px] right-[460px] translate-x-1/2" fontSizeClass="text-sm">{frontDish.ekw3}</KeywordText>
            <KeywordText className="bottom-[600px] right-[290px] translate-x-1/2" fontSizeClass="text-lg">{frontDish.kw4}</KeywordText>
            <KeywordText className="bottom-[580px] right-[290px] translate-x-1/2" fontSizeClass="text-sm">{frontDish.ekw4}</KeywordText>
          </>
        )}

        {/* 하단 틸트 UI(설명+재료) : 틸트 시 -90° 위치의 접시 기준으로 표시 */}
        {isTilt && (
          <div className='absolute flex left-1/2 -translate-x-1/2 bottom-[20px] h-[160px] rounded-[25px] z-[25] shadow-lg items-center'>
            <div className="relative h-full w-[1000px] rounded-l-[24px] bg-white bg-opacity-[40%]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-black text-[18px] text-center leading-[1.7] font-pretendard font-medium whitespace-pre-line">
                {detailDish?.description}
              </p>
            </div>
            <div className="relative flex flex-col items-center justify-center h-full w-[300px] rounded-r-[24px] bg-black bg-opacity-[70%]">
              <div className="text-[40px] font-koolegant mb-2">Ingredient</div>
              <div className="text-[16px] font-pretendard text-white">
                {[detailDish?.kw1, detailDish?.kw2, detailDish?.kw3].filter(Boolean).join(', ')}
                {detailDish?.kw4 ? `, ${detailDish.kw4}` : ''}
              </div>
            </div>
          </div>
        )}

        {/* 석상 */}
        <div
          className="absolute bottom-0 left-1/2 pointer-events-none"
          style={{
            zIndex: isTilt ? 20 : 30,
            transform: `translateX(-50%) translateY(${isTilt ? -250 : 0}px)`,
            transition: 'transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          <img
            src="/images/main-page/statue.png"
            alt="석상"
            className="w-96 h-[250px] object-contain"
            draggable={false}
            style={{
              transform: `scale(${isTilt ? 1.6 : 1})`,
              transformOrigin: 'bottom center',
              transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          />
        </div>

        {/* 오비트(접시들) */}
        <div
          className="absolute"
          style={{
            left: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
            top: typeof window !== 'undefined' ? window.innerHeight / 2 + 530 : 0,
            transformOrigin: '0 0',
          }}
        >
          <DishContainer
            items={items}
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            handleDishClick={handleDishClick}
            selectedDish={null}
            hideText={false}
            isTiltMode={isTilt}
            instant={instantHide}           // ⬅️ 틸트 프레임에만 즉시 언마운트
          />

          <OrbitOverlay
            items={items}
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            selectedDish={null}
            onCircleClick={handleOverlayToggle}
            isTiltMode={isTilt}
            instant={instantHide}           // ⬅️ 동일
          />
        </div>

        {/* 뒤로가기 */}
        <button
          onClick={() => canGoBack && popHistory()}
          disabled={!canGoBack}
          className={`fixed top-6 left-6 z-[80] px-4 py-2 rounded-xl ${canGoBack ? 'bg-black/70 hover:bg-black/80 cursor-pointer' : 'bg-black/30 cursor-not-allowed'} text-white transition-colors`}
          title={canGoBack ? '뒤로' : '되돌릴 상태 없음'}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default ClosueStatueSelect;
