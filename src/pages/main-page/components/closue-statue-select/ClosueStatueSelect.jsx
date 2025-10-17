import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import DishContainer from './DishContainer';
import FloatingImage from './FloatingImage';
import KeywordText from './KeywordText';
import OrbitOverlay from './OrbitOverlay';
import { dishes } from './dishesData';

// 스냅/제스처 설정
const STEP_DEG = 45;            // 한 칸 각도
const WHEEL_STEP = 80;          // wheel 누적 임계치 (트랙패드 감도에 따라 조절)
const TOUCH_STEP_PX = 40;       // 터치 스크롤 임계치
const STEP_COOLDOWN_MS = 300;   // 한 스텝 후 쿨다운(궤도 280ms 모션과 맞춤)

const ClosueStatueSelect = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [orbitTiltDeg, setOrbitTiltDeg] = useState(0); // 0 ↔ -70

  // 히스토리
  const [history, setHistory] = useState([]);
  const pushHistory = useCallback(() => {
    setHistory(prev => [...prev, { rotationAngle, orbitTiltDeg, selectedDish }]);
  }, [rotationAngle, orbitTiltDeg, selectedDish]);
  const popHistory = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      setRotationAngle(last.rotationAngle);
      setOrbitTiltDeg(last.orbitTiltDeg);
      setSelectedDish(last.selectedDish);
      return next;
    });
  }, []);

  // 루트/스크롤 프록시 ref
  const rootRef = useRef(null);
  const containerRef = useRef(null);

  // 스냅 제스처 제어
  const stepLockRef = useRef(false);     // 한 스텝 처리 후 쿨다운 락
  const wheelAccumRef = useRef(0);       // wheel 누적(deltaY)
  const lastTouchYRef = useRef(null);    // 터치 시작 y
  const touchAccumRef = useRef(0);       // 터치 누적

  const frontDishIndex = useMemo(() => {
    const normalized = ((-rotationAngle % 360) + 360) % 360;
    const rawIndex = Math.round((normalized - 90) / 45); // 12시 기준
    return ((rawIndex % dishes.length) + dishes.length) % dishes.length;
  }, [rotationAngle]);

  const frontDish = dishes[frontDishIndex] ?? dishes[0];

  // UI 상태들
  const hideText = orbitTiltDeg !== 0;
  const titleScale = orbitTiltDeg !== 0 ? 2.5 : 1;
  const descriptionScale = orbitTiltDeg !== 0 ? 2 : 1;
  const statueScale = orbitTiltDeg !== 0 ? 1.6 : 1;
  const utensilStyle = {
    opacity: orbitTiltDeg !== 0 ? 0 : 1,
    transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };
  const floatingStyle = {
    opacity: orbitTiltDeg !== 0 ? 0 : 1,
    transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };
  const statueLiftY = orbitTiltDeg !== 0 ? -250 : 0;
  const statueZ = orbitTiltDeg !== 0 ? 20 : 30;

  const [dishScales, setDishScales] = useState(Array(dishes.length).fill(1));
  useEffect(() => {
    setDishScales(prev => prev.map((_, i) => (i === frontDishIndex ? 1.1 : 1)));
  }, [frontDishIndex]);

  const handleDishClick = useCallback((dish) => {
    pushHistory();
    setSelectedDish(dish);
  }, [pushHistory]);

  const canGoBack = history.length > 0;

  // ✅ 한 스텝 회전 공통 함수 (방향: +1 아래/오른쪽, -1 위/왼쪽)
  const doStep = useCallback((dir) => {
    if (stepLockRef.current) return;
    setRotationAngle(prev => prev + STEP_DEG * dir * -1); // 기존 시계방향 설정 유지(ROTATION_DIR=-1)
    stepLockRef.current = true;
    setTimeout(() => { stepLockRef.current = false; }, STEP_COOLDOWN_MS);
  }, []);

  // ✅ 전역 wheel: 우리 컴포넌트 영역에서만 처리 + 그때만 preventDefault
  useEffect(() => {
    const onWheel = (e) => {
      const root = rootRef.current;
      if (!root || !root.contains(e.target)) return; // 영역 밖이면 무시
      e.preventDefault(); // 우리 영역일 때만 기본 스크롤 차단

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

  // ✅ 전역 터치: 우리 영역에서만 스냅 처리(기본 스크롤은 유지)
  useEffect(() => {
    const withinRoot = (target) => {
      const root = rootRef.current;
      return !!root && root.contains(target);
    };

    const onTouchStart = (e) => {
      if (!withinRoot(e.target)) return;
      if (!e.touches || e.touches.length === 0) return;
      lastTouchYRef.current = e.touches[0].clientY;
      touchAccumRef.current = 0;
    };

    const onTouchMove = (e) => {
      if (!withinRoot(e.target)) return;
      if (stepLockRef.current || lastTouchYRef.current == null) return;
      if (!e.touches || e.touches.length === 0) return;

      const y = e.touches[0].clientY;
      const dy = lastTouchYRef.current - y; // 아래로 스와이프 = +dy
      lastTouchYRef.current = y;

      touchAccumRef.current += dy;
      if (Math.abs(touchAccumRef.current) >= TOUCH_STEP_PX) {
        const dir = touchAccumRef.current > 0 ? 1 : -1;
        touchAccumRef.current = 0;
        doStep(dir);
      }
    };

    const onTouchEnd = (e) => {
      if (!withinRoot(e.target)) return;
      lastTouchYRef.current = null;
      touchAccumRef.current = 0;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [doStep]);

  // 빨간 원 클릭: 상태 저장 후 궤도 기울기 토글
  const handleOverlayClick = useCallback(() => {
    pushHistory();
    setOrbitTiltDeg(prev => (prev === 0 ? -70 : 0));
  }, [pushHistory]);

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
        {/* Scroll proxy (실제 스크롤은 막고 wheel/touch로만 회전 제어) */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="h-[1000vh]" />
        </div>

        {/* Title / description */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <h1
            className="text-6xl font-bold text-black mb-4 font-koolegant"
            style={{
              transform: `scale(${titleScale})`,
              transformOrigin: 'center bottom',
              transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {frontDish.title}
          </h1>
          <p
            className="text-xl text-black"
            style={{
              transform: `scale(${descriptionScale})`,
              transformOrigin: 'center bottom',
              transition: 'opacity 0ms', // opacity 추가
              opacity: descriptionScale === 1 ? 1 : 0, // descriptionScale에 따라 투명도 조정
            }}
          >
            {frontDish.description}
          </p>
        </div>

        {/* Floating decor — 빨간 원 클릭 시 페이드아웃 */}
        <div style={floatingStyle}>
          <FloatingImage src="/images/main-page/flower.png" alt="Flower" className="bottom-[392px] left-[160px] w-[300px] h-[300px] z-0" />
          <FloatingImage src="/images/main-page/cup.png" alt="Cup" className="bottom-[375px] left-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/salt.png" alt="Salt" className="bottom-[400px] right-[360px] w-[200px] h-[200px] z-0" />
          <FloatingImage src="/images/main-page/glass.png" alt="Glass" className="bottom-[392px] right-[160px] w-[300px] h-[300px] z-0" />
        </div>

        {/* Keywords — 궤도 기울면 숨김 */}
        {!hideText && (
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

        {/* Utensils (포크/스푼 등) */}
        <img src="/images/main-page/spoon.png" alt="Spoon" className="absolute bottom-[280px] right-[450px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/knife.png" alt="Knife" className="absolute bottom-[150px] left-[400px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/fork1.png" alt="Fork1" className="absolute bottom-[280px] right-[500px] w-[150px] h-[150px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/fork2.png" alt="Fork2" className="absolute bottom-[280px] left-[450px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />

        {/* Statue */}
        <div
          className="absolute bottom-0 left-1/2 pointer-events-none"
          style={{
            zIndex: statueZ,
            transform: `translateX(-50%) translateY(${statueLiftY}px)`,
            transition: 'transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <img
            src="/images/main-page/statue.png"
            alt="석상"
            className="w-96 h-[250px] object-contain"
            style={{
              transform: `scale(${statueScale})`,
              transformOrigin: 'bottom center',
              transition: 'transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
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
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            handleDishClick={handleDishClick}
            selectedDish={selectedDish}
            hideText={hideText}
          />

          <OrbitOverlay
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            selectedDish={selectedDish}
            onCircleClick={handleOverlayClick}
          />
        </div>

        {/* Back(Undo) 버튼 */}
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
