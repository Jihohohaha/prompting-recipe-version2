import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import DishContainer from './DishContainer';
import FloatingImage from './FloatingImage';
import KeywordText from './KeywordText';
import OrbitOverlay from './OrbitOverlay';
import { dishes, ROTATION_FACTOR, ROTATION_DIR, SCROLL_RESET_THRESHOLD } from './dishesData';

const ClosueStatueSelect = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [orbitTiltDeg, setOrbitTiltDeg] = useState(0); // 원 클릭으로 토글되는 궤도 기울기(0 ↔ -80)

  // ✅ 직전 상태 복구용 히스토리 스택 (rotationAngle, orbitTiltDeg, selectedDish)
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

  const containerRef = useRef(null);
  const lastScrollY = useRef(0);

  const frontDishIndex = useMemo(() => {
    const normalized = ((-rotationAngle % 360) + 360) % 360;
    const rawIndex = Math.round((normalized - 90) / 45);
    return ((rawIndex % dishes.length) + dishes.length) % dishes.length;
  }, [rotationAngle]);

  const frontDish = dishes[frontDishIndex] ?? dishes[0];

  // 기울어진 상태(-80)면 모든 텍스트 숨김
  const hideText = orbitTiltDeg !== 0;

  // 🍴 포크/스푼 페이드아웃(궤도 기울 때)
  const utensilOpacity = orbitTiltDeg !== 0 ? 0 : 1;
  const utensilStyle = {
    opacity: utensilOpacity,
    transition: 'opacity 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };

  // 🗿 석상 상승량: 요청대로 -200px 고정
  const statueLiftY = orbitTiltDeg !== 0 ? -200 : 0;

  const [dishScales, setDishScales] = useState(Array(dishes.length).fill(1));
  useEffect(() => {
    setDishScales(prev => prev.map((_, i) => (i === frontDishIndex ? 1.1 : 1)));
  }, [frontDishIndex]);

  // 접시 클릭: 상태 저장 후 선택
  const handleDishClick = useCallback((dish) => {
    pushHistory();
    setSelectedDish(dish);
  }, [pushHistory]);

  const canGoBack = history.length > 0;
  const handleBack = useCallback(() => {
    if (!canGoBack) return;
    popHistory();
  }, [canGoBack, popHistory]);

  // 스크롤 기반 회전 (즉시 반응)
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const cur = el.scrollTop;
    const delta = cur - lastScrollY.current;
    if (Math.abs(delta) < 1) return;
    const angleChange = delta * ROTATION_FACTOR * ROTATION_DIR;
    setRotationAngle(prev => prev + angleChange);
    lastScrollY.current = cur;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (cur >= maxScroll * SCROLL_RESET_THRESHOLD.BOTTOM || cur <= maxScroll * SCROLL_RESET_THRESHOLD.TOP) {
      el.scrollTop = el.scrollHeight / 2;
      lastScrollY.current = el.scrollTop;
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight / 2;
    lastScrollY.current = el.scrollTop;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 빨간 원 클릭: 상태 저장 후 궤도 기울기 토글 (-80 ↔ 0)
  const handleOverlayClick = useCallback(() => {
    pushHistory();
    setOrbitTiltDeg(prev => (prev === 0 ? -80 : 0));
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

      <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-orange-400 to-orange-500">
        {/* Scroll proxy */}
        <div
          ref={containerRef}
          className="absolute inset-0 overflow-y-auto z-50 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="h-[1000vh]" />
        </div>

        {/* Title / description */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <h1 className="text-6xl font-bold text-black mb-4 transition-all duration-500 font-koolegant">{frontDish.title}</h1>
          <p className="text-xl text-black transition-all duration-500">{frontDish.description}</p>
        </div>

        {/* Floating decor */}
        <FloatingImage src="/images/main-page/flower.png" alt="Flower" className="bottom-[392px] left-[160px] w-[300px] h-[300px] z-0" />
        <FloatingImage src="/images/main-page/cup.png" alt="Cup" className="bottom-[375px] left-[360px] w-[200px] h-[200px] z-0" />
        <FloatingImage src="/images/main-page/salt.png" alt="Salt" className="bottom-[400px] right-[360px] w-[200px] h-[200px] z-0" />
        <FloatingImage src="/images/main-page/glass.png" alt="Glass" className="bottom-[392px] right-[160px] w-[300px] h-[300px] z-0" />

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

        {/* Utensils (포크/스푼 등) — z-20, 기울 때 페이드아웃 */}
        <img src="/images/main-page/spoon.png" alt="Spoon" className="absolute bottom-[280px] right-[450px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/knife.png" alt="Knife" className="absolute bottom-[150px] left-[400px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/fork1.png" alt="Fork1" className="absolute bottom-[280px] right-[500px] w-[150px] h-[150px] object-contain z-20 pointer-events-none" style={utensilStyle} />
        <img src="/images/main-page/fork2.png" alt="Fork2" className="absolute bottom-[280px] left-[450px] w-[300px] h-[300px] object-contain z-20 pointer-events-none" style={utensilStyle} />

        {/* Statue — 궤도 기울일 때 같이 위로 200px만 상승 */}
        <div
          className="absolute bottom-0 left-1/2 z-30 pointer-events-none"
          style={{
            transform: `translateX(-50%) translateY(${statueLiftY}px)`,
            transition: 'transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <img src="/images/main-page/statue.png" alt="석상" className="w-96 h-[250px] object-contain" />
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
          {/* 접시: 기울 때 zIndex 40으로 석상 앞 */}
          <DishContainer
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            handleDishClick={handleDishClick}
            selectedDish={selectedDish}
            hideText={hideText}
          />

          {/* 빨간 원 오버레이 (클릭 토글) */}
          <OrbitOverlay
            rotationAngle={rotationAngle}
            orbitTiltDeg={orbitTiltDeg}
            frontDishIndex={frontDishIndex}
            dishScales={dishScales}
            selectedDish={selectedDish}
            onCircleClick={() => {
              pushHistory();
              setOrbitTiltDeg(prev => (prev === 0 ? -80 : 0));
            }}
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
