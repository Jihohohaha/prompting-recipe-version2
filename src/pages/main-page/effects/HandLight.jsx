// 극한 성능 최적화된 HandLight
const HandLight = ({ mousePos, radius = 230 }) => {
  if (!mousePos) return {};
  
  // 간소화된 그라디언트 - 적은 색상 단계로 렌더링 부하 감소
  const maskValue = `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 85%, black 100%)`;
  
  return {
    WebkitMaskImage: maskValue,
    maskImage: maskValue,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    // GPU 가속 강제 적용
    willChange: 'mask-position, -webkit-mask-position',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)', // GPU 레이어 강제 생성
    // 렌더링 힌트
    imageRendering: 'optimizeSpeed',
  };
};

export default HandLight;