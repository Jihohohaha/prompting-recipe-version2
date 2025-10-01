// src/pages/main-page/effects/HandLight.jsx
// HandLight: 마우스 위치를 받아 마스크 스타일을 반환하는 함수형 컴포넌트
const HandLight = ({ mousePos, radius = 230 }) => {
  if (!mousePos) return {};
  const { x, y } = mousePos;
  // fade, soft edge, gradient 효과를 위한 마스크
  const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.05) 60%,
    rgba(0,0,0,0.15) 70%,
    rgba(0,0,0,0.35) 78%,
    rgba(0,0,0,0.6) 85%,
    rgba(0,0,0,0.85) 92%,
    rgba(0,0,0,1) 100%
  )`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transition: 'mask-position 0.1s, -webkit-mask-position 0.1s',
  };
};

export default HandLight;