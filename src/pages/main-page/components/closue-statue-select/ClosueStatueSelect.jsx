import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import DishContainer from './DishContainer';
import FloatingImage from './FloatingImage';
import KeywordText from './KeywordText';
import OrbitOverlay from './OrbitOverlay';
import { dishes as dishesBase, getAIMenuFor } from './dishesData';

const STEP_DEG = 45;
const WHEEL_STEP = 80;
const TOUCH_STEP_PX = 40;
const STEP_COOLDOWN_MS = 300;

const normalize360 = (deg) => ((deg % 360) + 360) % 360;
const getFrontIndex = (angleDeg, len) => {
  if (!len) return 0;
  const normalized = normalize360(-angleDeg);
  const rawIndex = Math.round((normalized - 90) / 45);
  return ((rawIndex % len) + len) % len;
};

const ClosueStatueSelect = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [orbitTiltDeg, setOrbitTiltDeg] = useState(0); // 0 ↔ -70

  // 제목 락
  const [titleLock, setTitleLock] = useState({ active: false, text: null });
  const lockTitleWith = useCallback((text) => setTitleLock({ active: true, text }), []);
  const unlockTitle  = useCallback(() => setTitleLock({ active: false, text: null }), []);

  // 틸트 모드에서 사용할 AI 메뉴 상태
  const [aiItems, setAiItems] = useState([]);

  const isTilt = orbitTiltDeg !== 0;
  const items = isTilt ? aiItems : dishesBase;

  const frontDishIndex = useMemo(
    () => getFrontIndex(rotationAngle, items.length || 0),
    [rotationAngle, items.length]
  );
  const frontDish = useMemo(() => items[frontDishIndex] ?? items[0], [items, frontDishIndex]);

  const titleText = titleLock.active && titleLock.text ? titleLock.text : frontDish.title;

  useEffect(() => {
    if (!isTilt) unlockTitle();
  }, [isTilt, unlockTitle]);

  // Back 히스토리
  const [history, setHistory] = useState([]);
  const pushHistory = useCallback(() => {
    setHistory((prev) => [...prev, { rotationAngle, orbitTiltDeg, selectedDish, titleLock, aiItems }]);
  }, [rotationAngle, orbitTiltDeg, selectedDish, titleLock, aiItems]);
  const popHistory = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      setRotationAngle(last.rotationAngle);
      setOrbitTiltDeg(last.orbitTiltDeg);
      setSelectedDish(last.selectedDish);
      setTitleLock(last.titleLock || { active: false, text: null });
      setAiItems(last.aiItems || []);
      return next;
    });
  }, []);
  const canGoBack = history.length > 0;

  // refs & 스냅 회전(휠/터치) — 기존 유지
  const rootRef = useRef(null);
  const containerRef = useRef(null);
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

  useEffect(() => {
    const onWheel = (e) => {
      const root = rootRef.current;
      if (!root || !root.contains(e.target)) return;
      e.preventDefault();
      if (stepLockRef.current) return;
      wheelAccumRef.current += e.deltaY;
      if (Math.abs(wheelAccumRef.current) >= WHEEL_STEP) {
        const dir = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current = 0;
        doStep(dir);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [doStep]);

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
    const onEnd = (e) => {
      if (!within(e.target)) return;
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

  // ── 오버레이(붉은 원) 클릭: 틸트 토글
  const handleOverlayToggle = useCallback(() => {
    pushHistory();
    setOrbitTiltDeg((prev) => {
      const next = prev === 0 ? -70 : 0;
      if (prev === 0 && next === -70) {
        // 진입 시 현재 프리-틸트 정면 카테고리로 AI 메뉴 선택
        const baseFront = dishesBase[getFrontIndex(rotationAngle, dishesBase.length)] ?? dishesBase[0];
        const nextMenu = getAIMenuFor(baseFront.title);
        setAiItems(nextMenu);
        const aiFront = nextMenu[getFrontIndex(rotationAngle, nextMenu.length)] ?? nextMenu[0];
        lockTitleWith(frontDish.title);
      }
      return next;
    });
  }, [pushHistory, rotationAngle, lockTitleWith]);

  // 프리-틸트: 정면 접시만 틸트 진입
  const handleDishClick = useCallback((dish, index) => {
    if (!dish) return;
    if (orbitTiltDeg !== 0) return;
    // 정면 클릭만 허용
    const baseFrontIndex = getFrontIndex(rotationAngle, dishesBase.length);
    if (index !== baseFrontIndex) return;

    const baseFront = dishesBase[baseFrontIndex] ?? dishesBase[0];
    const nextMenu = getAIMenuFor(baseFront.title);
    pushHistory();
    setSelectedDish(dish);
    setAiItems(nextMenu);
    const aiFront = nextMenu[getFrontIndex(rotationAngle, nextMenu.length)] ?? nextMenu[0];
    lockTitleWith(aiFront.title);
    setOrbitTiltDeg(-70);
  }, [orbitTiltDeg, rotationAngle, pushHistory, lockTitleWith]);

  // UI 파생(디자인 유지)
  const titleScale = isTilt ? 2.5 : 1;
  const descriptionScale = isTilt ? 2 : 1;
  const statueScale = isTilt ? 1.6 : 1;
  const utensilStyle  = { opacity: isTilt ? 0 : 1, transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)' };
  const floatingStyle = { opacity: isTilt ? 0 : 1, transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)' };
  const statueLiftY = isTilt ? -250 : 0;
  const statueZ = isTilt ? 20 : 30;

  const [dishScales, setDishScales] = useState(() => Array(items.length).fill(1));
  useEffect(() => {
    setDishScales(Array(items.length).fill(1).map((_, i) => (i === frontDishIndex ? 1.1 : 1)));
  }, [items.length, frontDishIndex]);

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

      <div ref={rootRef} className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
        {/* Scroll proxy */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="h-[1000vh]" />
        </div>

        {/* Title / description (상단) */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <h1
            className="text-6xl font-bold text-black mb-4 font-koolegant"
            style={{ transform: `scale(${titleScale})`, transformOrigin: 'center', transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            {titleText}
          </h1>
          <p className="text-xl text-black" style={{ transform: `scale(${descriptionScale})`, transformOrigin: 'center', transition: 'opacity 0ms', opacity: descriptionScale === 1 ? 1 : 0 }}>
            {frontDish.description}
          </p>
        </div>

        {/* Floating decor */}
        <div style={floatingStyle}>
          <FloatingImage src="/images/main-page/flower.png" alt="Flower" className="bottom-[392px] left-[160px] w-[300px] h-[300px] z-0" />
          <FloatingImage src="/images/main-page/cup.png" alt="Cup" className="bottom-[375px] left-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/salt.png" alt="Salt" className="bottom-[400px] right-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/glass.png" alt="Glass" className="bottom-[392px] right-[160px] w-[300px] h-[300px] z-0" />
        </div>

        {/* 프리-틸트 키워드 */}
        {!isTilt && (
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

        {/* ── Tilt UI ───────────────── */}
        {isTilt && (
          <>
            <div className='absolute flex left-1/2 -translate-x-1/2 bottom-[20px] h-[160px] rounded-[25px] z-[25] shadow-lg items-center'>
              {/* 하단 설명 패널 */}
              <div className="relative
              h-full w-[1000px] rounded-l-[24px]
              bg-white bg-opacity-[40%]">
              </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-black text-[18px] text-center leading-[1.7] font-pretendard font-medium whitespace-pre-line">
                    {frontDish.description}
                  </p>
                </div>

              {/* 우측 Ingredient 박스 */}
              <div className="relative flex flex-col items-center justify-center
              h-full w-[300px] rounded-r-[24px]
              bg-black bg-opacity-[70%]">
                <div className="text-[40px] font-koolegant mb-2">Ingredient</div>
                <div className="text-[16px] font-pretendard text-white">
                  {[frontDish.kw1, frontDish.kw2, frontDish.kw3].filter(Boolean).join(', ')}
                  {frontDish.kw4 ? `, ${frontDish.kw4}` : ''}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Statue */}
        <div
          className="absolute bottom-0 left-1/2 pointer-events-none"
          style={{ zIndex: isTilt ? 20 : 30, transform: `translateX(-50%) translateY(${isTilt ? -250 : 0}px)`, transition: 'transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
        >
          <img
            src="/images/main-page/statue.png"
            alt="석상"
            className="w-96 h-[250px] object-contain"
            style={{ transform: `scale(${isTilt ? 1.6 : 1})`, transformOrigin: 'bottom center', transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          />
        </div>

        {/* Orbit center wrapper */}
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
            selectedDish={selectedDish}
            hideText={false}
          />

          <OrbitOverlay
            items={items}
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            selectedDish={selectedDish}
            onCircleClick={handleOverlayToggle}
          />
        </div>

        {/* Back 버튼 */}
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
