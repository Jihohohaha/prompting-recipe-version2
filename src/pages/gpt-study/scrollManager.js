import gsap from 'gsap';
import logger from './logger';

const SCROLL_DURATION = 0.8; // seconds
const PROGRAMMATIC_BUFFER = 400; // ms
const PROGRAMMATIC_IGNORE = SCROLL_DURATION * 1000 + PROGRAMMATIC_BUFFER;

let container = null;
let ignoreUntil = 0;

const register = (ref) => {
  container = ref && ref.current ? ref.current : null;
};

const getIgnoreUntil = () => ignoreUntil;

const scrollTo = (targetTop) => {
  if (!container) {
    logger.info('scrollManager: no container registered');
    return Promise.reject(new Error('No container registered'));
  }

  const maxTop = container.scrollHeight - container.clientHeight;
  const finalTop = Math.min(targetTop, maxTop);

  try { container.dataset.programmatic = 'true'; } catch (e) {}
  // Temporarily disable CSS scroll snapping to avoid browser snap jumping during programmatic scrolls
  let prevSnap = null;
  try {
    prevSnap = container.style.scrollSnapType || '';
    container.style.scrollSnapType = 'none';
  } catch (e) {}
  ignoreUntil = Date.now() + PROGRAMMATIC_IGNORE;
  try { logger.info(`scrollManager: starting programmatic scroll to ${finalTop}px — ignoreUntil=${ignoreUntil}`); } catch (e) {}

  return new Promise((resolve) => {
    gsap.to(container, {
      scrollTop: finalTop,
      duration: SCROLL_DURATION,
      ease: 'power2.inOut',
      onComplete: () => {
        try { delete container.dataset.programmatic; } catch (e) {}
        // restore previous scroll-snap-type
        try { container.style.scrollSnapType = prevSnap; } catch (e) {}
        try { logger.info('scrollManager: programmatic scroll complete, cleared programmatic marker'); } catch (e) {}
        resolve();
      }
    });
  });
};

export default {
  register,
  scrollTo,
  getIgnoreUntil,
};
