// HandLight 디자인 유틸
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

export function getHandLightMask(centerX, centerY, radius = 300) {
  const xvw = (centerX / BASE_WIDTH) * 100;
  const yvh = (centerY / BASE_HEIGHT) * 100;
  const mask = `radial-gradient(circle ${radius}px at ${xvw}vw ${yvh}vh, transparent 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 90%, black 100%)`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    transition: 'mask-position 0.1s, -webkit-mask-position 0.1s',
  };
}

export { BASE_WIDTH, BASE_HEIGHT };
