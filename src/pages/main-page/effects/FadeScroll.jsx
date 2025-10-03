// FadeScroll.jsx
import React, { forwardRef, useState, useEffect, useRef } from 'react';

const FadeScroll = forwardRef(({ snaps, onScrollComplete }, ref) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
      
      // 스크롤이 90% 이상 완료되면 처음으로 완료된 것으로 간주
      if (progress >= 0.9 && !hasCompletedOnce) {
        setHasCompletedOnce(true);
        if (onScrollComplete) {
          onScrollComplete();
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const getOpacity = (index) => {
    const totalItems = snaps.length;
    const progressPerItem = 1 / totalItems;
    const currentItemStart = index * progressPerItem;
    const currentItemEnd = (index + 1) * progressPerItem;
    
    if (scrollProgress >= currentItemStart && scrollProgress <= currentItemEnd) {
      // 현재 아이템이 활성화된 구간
      const itemProgress = (scrollProgress - currentItemStart) / progressPerItem;
      
      // 더 세밀한 단계적 변화 (16단계 = 6.25%씩)
      const steps = 16;
      const stepSize = 1 / steps;
      const currentStep = Math.floor(itemProgress / stepSize);
      const stepProgress = (itemProgress % stepSize) / stepSize;
      
      // 페이드 인 (처음 8단계)
      if (currentStep < 8) {
        const baseOpacity = currentStep * 0.125; // 12.5%씩 증가
        const stepIncrement = stepProgress * 0.125;
        return Math.min(baseOpacity + stepIncrement, 1);
      }
      // 페이드 아웃 (마지막 8단계)
      else {
        const fadeOutStep = currentStep - 8;
        const baseOpacity = 1 - (fadeOutStep * 0.125); // 12.5%씩 감소
        const stepDecrement = stepProgress * 0.125;
        return Math.max(baseOpacity - stepDecrement, 0);
      }
    }
    
    return 0;
  };

  return (
    <div className="relative w-full h-full">
      {/* 스크롤 가능한 투명 컨테이너 */}
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className="w-full h-full overflow-y-scroll"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* 스크롤 가능한 높이를 만들기 위한 더미 콘텐츠 - 더 정밀한 단계적 제어 */}
        <div style={{ height: `${snaps.length * 80}vh` }} />
      </div>
      
      {/* 고정 위치에 배치된 텍스트들 - 부모 컨테이너에 맞춤 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {snaps.map((text, index) => (
          <p 
            key={index}
            className="absolute text-[#f5f5f5] text-xl font-bold px-4 leading-relaxed whitespace-pre-wrap text-center"
            style={{ 
              opacity: getOpacity(index)
            }}
            data-text-index={index}
            data-opacity={getOpacity(index).toFixed(2)}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
});

export default FadeScroll;