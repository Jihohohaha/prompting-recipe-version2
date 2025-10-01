// src/pages/main-page/effects/HandLight.jsx
// HandLight: 마우스 위치를 받아 마스크 스타일을 반환하는 함수형 컴포넌트
const HandLight = ({ mousePos, radius = 230 }) => {
  if (!mousePos) return {};
  const { x, y } = mousePos;
  const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, transparent 0%, transparent 60%, black 61%, black 100%)`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transition: 'mask-position 0.1s, -webkit-mask-position 0.1s',
  };
};

export default HandLight;