// HandLight 디자인 유틸 - 성능 최적화 버전
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

// 마스크 캐시 - 동일한 위치의 마스크 재사용
const maskCache = new Map();
const CACHE_KEY_PRECISION = 5; // 5px 단위로 캐싱

export function getHandLightMask(centerX, centerY, radius = 300) {
  // 캐시 키 생성 (5px 단위로 반올림하여 캐시 효율성 증대)
  const roundedX = Math.round(centerX / CACHE_KEY_PRECISION) * CACHE_KEY_PRECISION;
  const roundedY = Math.round(centerY / CACHE_KEY_PRECISION) * CACHE_KEY_PRECISION;
  const cacheKey = `${roundedX}-${roundedY}-${radius}`;
  
  // 캐시에서 찾기
  if (maskCache.has(cacheKey)) {
    return maskCache.get(cacheKey);
  }
  
  const xvw = (centerX / BASE_WIDTH) * 100;
  const yvh = (centerY / BASE_HEIGHT) * 100;
  
  // 간소화된 그라디언트 (HandLight.jsx와 동일하게)
  const mask = `radial-gradient(circle ${radius}px at ${xvw}vw ${yvh}vh, transparent 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 85%, black 100%)`;
  
  const maskStyle = {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    // 성능 최적화 속성 추가
    willChange: 'mask-position, -webkit-mask-position',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    imageRendering: 'optimizeSpeed',
    // transition 제거 - 렉의 주요 원인
  };
  
  // 캐시에 저장 (최대 50개까지만 저장)
  if (maskCache.size >= 50) {
    const firstKey = maskCache.keys().next().value;
    maskCache.delete(firstKey);
  }
  maskCache.set(cacheKey, maskStyle);
  
  return maskStyle;
}

export { BASE_WIDTH, BASE_HEIGHT };
