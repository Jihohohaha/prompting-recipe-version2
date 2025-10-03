// 성능 최적화된 HandLight
const HandLight = ({ mousePos, radius = 230 }) => {
  // CSS 변수 사용으로 리플로우 최소화
  return {
    '--mouse-x': `${mousePos.x}px`,
    '--mouse-y': `${mousePos.y}px`,
    '--radius': `${radius}px`,
    WebkitMaskImage: `radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), transparent 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 90%, black 100%)`,
    maskImage: `radial-gradient(circle var(--radius) at var(--mouse-x) var(--mouse-y), transparent 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 90%, black 100%)`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    willChange: 'mask-position, -webkit-mask-position',
  };
};

export default HandLight;