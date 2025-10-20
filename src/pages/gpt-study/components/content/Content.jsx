// src/pages/gpt-study/components/content/Content.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { gptStudyData } from '../../data';
import Section from './Section';
import useGPTStudyStore from '../../store';
import { ContentProvider } from './ContentContext';

// ✅ Debounce 유틸리티
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Content = () => {
  // local fallback refs; we'll prefer context refs inside provider
  const localContentRef = useRef(null);
  const DEBUG = true; // set to false to reduce console noise
  const localIsManualRef = useRef(true);
  const ignoreActiveUntilRef = useRef(0);
  const collapseOriginSectionRef = useRef(null);
  const collapseOriginAtRef = useRef(0);
  const contentCtx = null;
  const { slug, tab } = useParams(); // ✅ tab 파라미터 추가
  const { activeSection, setActiveSection, expandedContent, setExpandedContent } = useGPTStudyStore();
  const location = useLocation();
  // AB testing variant pulled from URL query `?ab=`. Values:
  // - baseline (default)
  // - waitLonger (increase image wait timeout)
  // - delayRefresh (add extra ignore time so ScrollTrigger.refresh is delayed)
  // - disableIO (set global flag other components can read to disable IO-heavy observers)
  const abVariant = new URLSearchParams(location.search).get('ab') || 'baseline';
  try { window.__GPT_STUDY_AB = abVariant; } catch (e) {}
  const IMAGE_WAIT_MS = abVariant === 'waitLonger' ? 2200 : 1500;
  const RESTORE_MS = abVariant === 'fastRestore' ? 400 : 800;
  const EXTRA_IGNORE_MS = abVariant === 'delayRefresh' ? 1000 : 0;
  if (abVariant === 'disableIO') {
    try { window.__GPT_STUDY_AB_disableIO = true; } catch (e) {}
  }
  const [isScrolling, setIsScrolling] = useState(false);
  // we'll use localIsManualRef as the single manual-scroll ref
  const [isReady, setIsReady] = useState(false);
  const prevActiveRef = useRef(null);

  // GSAP 플러그인 등록
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }, []);

  // DOM 준비 확인 (using local refs inside provider)
  useEffect(() => {
    const ref = localContentRef;
    if (ref && ref.current) {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    }
  }, []);

  // ✅ URL 변경 시 스크롤 위치 조정
  useEffect(() => {
  if (!localContentRef.current || !isReady || !slug) return;
    if (DEBUG) {
      const c = localContentRef.current;
      console.log('--- Content DEBUG: before programmatic scroll ---');
      try { console.debug(`[Content] suspendNavSync=${useGPTStudyStore.getState().suspendNavSync}`); } catch (e) {}
      console.log(`scrollTop=${c.scrollTop}, clientHeight=${c.clientHeight}, scrollHeight=${c.scrollHeight}`);
      try {
        const center = c.scrollTop + c.clientHeight / 2;
        const sections = Array.from(c.querySelectorAll('[id^="section-"]'));
        const centered = sections.findIndex(s => center >= s.offsetTop && center <= s.offsetTop + s.offsetHeight);
        console.log('centeredSectionIndex=', centered);
      } catch (e) {}
    }

    const recipe = gptStudyData.find(r => r.slug === slug);
    if (!recipe) return;

    const sectionIndex = recipe.id - 1;
  const sectionElement = localContentRef.current.querySelector(`#section-${sectionIndex}`);
    
    if (!sectionElement) return;

    // 스크롤 타겟 결정
    let scrollTarget;
    let offsetY = 0;

    if (tab) {
      // 하위 URL (/recipe1/tutorial, /recipe1/quiz 등)
      // → 탭 인터페이스 바로 아래로 스크롤
      const tabInterface = sectionElement.querySelector(`#tab-interface-${recipe.id}`);
      
      if (tabInterface) {
        const tabBottom = tabInterface.getBoundingClientRect().bottom;
        const sectionTop = sectionElement.getBoundingClientRect().top;
        offsetY = tabBottom - sectionTop;
        scrollTarget = sectionElement;
      } else {
        scrollTarget = sectionElement;
      }
    } else {
      // 기본 URL (/recipe1)
      // → 섹션 상단으로 스크롤
      scrollTarget = sectionElement;
      offsetY = 0;
    }

    // 스크롤 실행 (애니메이션 시작)
  console.log(`📜 URL changed to ${slug}${tab ? `/${tab}` : ''}, scrolling...`);
  try { console.info(`[Content] programmaticScroll START sectionIndex=${sectionIndex} tab=${tab ? tab : 'none'}`); } catch (e) {}

  // use local isManual ref
  localIsManualRef.current = false;
  try { console.debug('[Content] marked isManual=false'); } catch (e) {}
  setIsScrolling(true);

    // 최대 스크롤 가능 위치 계산
    const maxScrollTop = localContentRef.current.scrollHeight - localContentRef.current.clientHeight;
    const targetScrollTop = sectionElement.offsetTop + offsetY;
    const finalScrollTop = Math.min(targetScrollTop, maxScrollTop);

    // If some expanded content is open, collapse it first to avoid mixed state
    // (policy: collapse-before-navigation). Do this via an async IIFE so the
    // collapse + short stabilization delay happen before performing the scroll.
    (async () => {
      try {
        const s = useGPTStudyStore.getState();
        if (s && s.expandedContent) {
          try { console.info('[Content] collapsing expandedContent before programmatic navigation'); } catch (e) {}
          try { s.collapseContent && s.collapseContent(); } catch (e) {}
          // Allow a short delay for layout/ScrollTrigger refresh to stabilize
          await new Promise(r => setTimeout(r, 450));
          // After a programmatic collapse, ignore center-scan/bottom-handler
          // for a short window to avoid immediate activeSection jumps.
          try { ignoreActiveUntilRef.current = Date.now() + 1200 + EXTRA_IGNORE_MS; } catch (e) {}
        }
      } catch (e) {}

      gsap.to(localContentRef.current, {
        scrollTop: finalScrollTop,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
        // After we've scrolled to the section, if a tab is requested, open it
        // and then wait for a sentinel inside the expanded content to be
        // available/stable; then perform a second programmatic scroll so the
        // sentinel is centered. Only after that second scroll we consider the
        // full "scroll to tab" operation complete.
        try {
          const skip = !!(location && location.state && location.state.skipContentScroll);
          if (tab && !skip) {
            try {
              // Acquire operation token to coordinate open/animation/center
              const token = useGPTStudyStore.getState().beginOperation && useGPTStudyStore.getState().beginOperation();
              try { console.debug('[Content] beginOperation token=', token); } catch (e) {}

              // set expanded content so Section mounts and runs its animation
              try { useGPTStudyStore.getState().expandContent && useGPTStudyStore.getState().expandContent({ recipeId: recipe.id, tabId: tab, subTab: null, opToken: token }); } catch (e) {}
              try { useGPTStudyStore.getState().recordExpandedOpenScroll && useGPTStudyStore.getState().recordExpandedOpenScroll(localContentRef.current.scrollTop); } catch (e) {}

              // suspend global nav sync while we perform the open/centering
              try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(true); } catch (e) {}
              try { console.info('[Content] suspendNavSync=true (begin open+center)'); } catch (e) {}

                // wait for Section animation to call completeOperation (poll isOperationComplete)
              const container = localContentRef.current;
              const waitForOperationComplete = async () => {
                let attempts = 0;
                const maxAttempts = 60; // up to ~3s
                try { console.debug('[Content] waitForOperationComplete start token=', token); } catch (e) {}
                while (attempts < maxAttempts) {
                  const done = useGPTStudyStore.getState().isOperationComplete && useGPTStudyStore.getState().isOperationComplete(token);
                  if (done) {
                    try { console.debug('[Content] waitForOperationComplete detected complete at attempt=', attempts, 'token=', token); } catch (e) {}
                    break;
                  }
                  await new Promise(r => setTimeout(r, 50));
                  attempts++;
                }

                if (!(useGPTStudyStore.getState().isOperationComplete && useGPTStudyStore.getState().isOperationComplete(token))) {
                  try { console.warn('[Content] operation did not complete in time, proceeding anyway token=', token); } catch (e) {}
                }

                // Previously we skipped the second centering for tutorial as a
                // temporary mitigation. Remove that skip so tutorial follows the
                // same robust centering flow as other tabs (wait for images/fonts,
                // clamp into section bounds, then scroll). This helps avoid
                // unexpected behavior and lets us validate the full flow.

                // Now perform the same expanded centering logic (align top of expanded)
                try {
                  const expandedEl = container.querySelector(`#expanded-content-${recipe.id}`);
                  if (DEBUG) {
                    try {
                      const ctop = container.scrollTop;
                      const cheight = container.clientHeight;
                      const csh = container.scrollHeight;
                      console.log('[Content][center] before center calc', { recipeId: recipe.id, containerTop: ctop, containerH: cheight, containerScrollH: csh });
                    } catch (e) {}
                  }
                  // Wait for images inside the expanded content to load (or timeout)
                  const waitForImagesLoaded = async (root, timeoutMs = 1500) => {
                    if (!root) return;
                    const imgs = Array.from(root.querySelectorAll('img'));
                    if (!imgs || imgs.length === 0) return;
                    const checks = imgs.map(img => {
                      if (img.complete) return Promise.resolve();
                      return new Promise(res => {
                        const onLoad = () => { try { img.removeEventListener('load', onLoad); } catch(e){}; res(); };
                        img.addEventListener('load', onLoad);
                        // also resolve on error to avoid hanging
                        const onErr = () => { try { img.removeEventListener('error', onErr); } catch(e){}; res(); };
                        img.addEventListener('error', onErr);
                      });
                    });
                    // Race against timeout
                    await Promise.race([
                      Promise.all(checks),
                      new Promise(r => setTimeout(r, timeoutMs))
                    ]);
                  };
                  try { console.debug('[Content] waiting for images inside expanded content to load (or timeout) imageWaitMs=', IMAGE_WAIT_MS); } catch (e) {}
                  await waitForImagesLoaded(expandedEl, IMAGE_WAIT_MS);
                  try { console.debug('[Content] image wait done, proceeding to center'); } catch (e) {}

                  // Wait for fonts to be ready (short timeout) to avoid layout shifts
                  const waitForFontsReady = async (timeoutMs = 600) => {
                    try {
                      if (document && document.fonts && document.fonts.ready) {
                        const fontsPromise = document.fonts.ready;
                        await Promise.race([fontsPromise, new Promise(r => setTimeout(r, timeoutMs))]);
                      }
                    } catch (e) {
                      // ignore if fonts API not available
                    }
                  };
                  await waitForFontsReady(600);
                  // allow a couple of frames for layout stabilization after images/fonts
                  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

                  const sentinel = container.querySelector(`#expanded-end-${recipe.id}`);
                  // compute desiredTop anchored to the expanded/sentinel position but
                  // ensure we clamp strictly to the containing section's visible range
                  // Decide where to anchor the expanded view. Default behaviour used a
                  // sentinel at the end of the expanded content which can push the
                  // container all the way to the document bottom for very large
                  // tutorials. Prefer showing the START of the expanded content
                  // when the expanded content is taller than the viewport so the
                  // user sees the beginning of the tutorial instead of being taken
                  // to the end immediately.
                  let desiredTopRaw;
                  if (expandedEl) {
                    const expandedHeight = expandedEl.offsetHeight || 0;
                    // If expanded content is much larger than the viewport, show its
                    // top instead of trying to center the sentinel at the bottom.
                    if (expandedHeight > container.clientHeight * 0.9) {
                      desiredTopRaw = expandedEl.offsetTop - 16;
                    } else {
                      desiredTopRaw = sentinel ? sentinel.offsetTop - Math.max(24, Math.round(container.clientHeight * 0.08)) : expandedEl.offsetTop - 16;
                    }
                  } else {
                    desiredTopRaw = sentinel ? sentinel.offsetTop - Math.max(24, Math.round(container.clientHeight * 0.08)) : container.scrollTop;
                  }
                  // clamp into [0, maxScroll]
                  const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
                  let bounded = Math.min(Math.max(desiredTopRaw, 0), maxScrollTop);
                  if (DEBUG) {
                    try {
                      console.log('[Content][center] sentinelOffset=', sentinel ? sentinel.offsetTop : null, 'desiredTop=', desiredTop, 'bounded=', bounded);
                    } catch (e) {}
                  }
                  try {
                    const targetSectionEl = container.querySelector(`#section-${sectionIndex}`);
                    if (targetSectionEl) {
                      const minScrollForSection = targetSectionEl.offsetTop;
                        const maxScrollForSection = Math.max(targetSectionEl.offsetTop + targetSectionEl.offsetHeight - container.clientHeight, minScrollForSection);
                        // If our bounded value is outside the section's viewportable range,
                        // clamp it into that range. This prevents centering from sending the
                        // container to the document bottom when the sentinel offset is noisy.
                        const clamped = Math.min(Math.max(bounded, minScrollForSection), maxScrollForSection);
                      if (clamped !== bounded) {
                        if (DEBUG) console.log(`clamping expanded scroll from ${bounded} -> ${clamped} to keep expanded content within section ${sectionIndex}`);
                        bounded = clamped;
                      }
                    }
                  } catch (e) { /* ignore */ }

                  if (DEBUG) console.log(`scrolling expanded content to scrollTop=${bounded}`);
                  try { console.info('[Content] centering START token=', token, 'bounded=', bounded); } catch (e) {}
                  gsap.to(container, {
                    scrollTop: bounded,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: () => {
                      // Delay restoring nav sync to avoid URL races
                      try { ignoreActiveUntilRef.current = Date.now() + 700 + EXTRA_IGNORE_MS; } catch (e) {}
                      try { console.info('[Content] centering COMPLETE token=', token, 'ignoreActiveUntil=', ignoreActiveUntilRef.current, 'abVariant=', abVariant); } catch (e) {}
                      // Do not mark as manual immediately — wait for actual user scroll
                      setIsScrolling(false);
                      console.log(`✅ Scroll completed to ${slug}${tab ? `/${tab}` : ''}`);
                      const restoreMs = RESTORE_MS;
                      try { console.info('[Content] will restore suspendNavSync in', restoreMs, 'ms'); } catch (e) {}
                      setTimeout(() => {
                        try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(false); } catch (e) {}
                        try { console.info('[Content] suspendNavSync=false (delayed end open+center)'); } catch (e) {}
                      }, restoreMs);
                      if (DEBUG) {
                        try {
                          const c2 = localContentRef.current;
                          console.log('--- Content DEBUG: after aligning expanded content ---');
                          console.log(`scrollTop=${c2.scrollTop}, clientHeight=${c2.clientHeight}, scrollHeight=${c2.scrollHeight}`);
                          const center2 = c2.scrollTop + c2.clientHeight / 2;
                          const sections2 = Array.from(c2.querySelectorAll('[id^="section-"]'));
                          const centered2 = sections2.findIndex(s => center2 >= s.offsetTop && center2 <= s.offsetTop + s.offsetHeight);
                          console.log('centeredSectionIndex=', centered2);
                        } catch (e) {}
                      }

                      // finalize operation token (if not already ended by Section)
                      try { useGPTStudyStore.getState().endOperation && useGPTStudyStore.getState().endOperation(token); } catch (e) {}
                    }
                  });
                } catch (e) {
                  console.warn('expanded centering failed', e);
                  try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(false); } catch (e) {}
                  // Do not mark as manual here; user scroll will flip the flag
                  setIsScrolling(false);
                }
              };

              waitForOperationComplete().catch(e => {
                console.warn('operation wait failed', e);
                try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(false); } catch (e) {}
                setIsScrolling(false);
                localIsManualRef.current = true;
              });
            } catch (e) { console.warn('post-scroll open expandedContent failed', e); }
            return;
          }
        } catch (e) { console.warn('post-scroll open expandedContent failed', e); }

        // If no tab requested, we finish normally
          // Do not mark as manual here; let real user input set the flag
          setIsScrolling(false);
          try { ignoreActiveUntilRef.current = Date.now() + 400; } catch (e) {}
          console.log(`✅ Scroll completed to ${slug}${tab ? `/${tab}` : ''}`);
      }
    });
    })();

  }, [slug, tab, isReady]); // ✅ slug, tab 변경 시 실행

  // With per-section triggers each Section manages its own ScrollTrigger.
  // We no longer create central per-section triggers here. Keep a lightweight
  // bottom-detection listener to preserve the "activate last section" UX.
  useEffect(() => {
    if (!localContentRef.current || !isReady) return;

    // Detect real user interactions (wheel/touch/pointer/keyboard) and mark
    // the localIsManualRef accordingly. This prevents programmatic scrolls
    // from being mis-classified as manual and avoids immediate collapse of
    // newly opened expanded content.
    const containerEl = localContentRef.current;
    let userInteracted = false;
    const markManual = (e) => {
      if (userInteracted) return;
      userInteracted = true;
      try { localIsManualRef.current = true; } catch (err) {}
      if (DEBUG) console.debug('[Content] user interaction detected, marked isManual=true', e && e.type);
    };
    // listen for the most common user scroll/interaction events
    containerEl.addEventListener('wheel', markManual, { passive: true });
    containerEl.addEventListener('touchstart', markManual, { passive: true });
    containerEl.addEventListener('pointerdown', markManual, { passive: true });
    // also listen globally for keyboard navigation keys (PageDown/PageUp/Arrow)
    const keyHandler = (ev) => {
      const keys = ['PageDown','PageUp','ArrowDown','ArrowUp','Home','End',' '];
      if (keys.includes(ev.key)) markManual(ev);
    };
    window.addEventListener('keydown', keyHandler);

    const container = localContentRef.current;

    // Center-scan based activeSection detection
    // - Use viewport center (scrollTop + clientHeight/2)
    // - Debounce updates to avoid noisy intersection events
    // - Respect manual scroll flag, in-flight programmatic scrolls, and expandedContent
    let debounceTimer = null;
    const scanAndSetActive = () => {
      try {
        // Bail out if we're inside the grace window or a programmatic operation
        if (Date.now() < (ignoreActiveUntilRef.current || 0)) return;
        const storeState = useGPTStudyStore.getState();
  if (storeState.operationInProgress) return;
  if (storeState.suspendNavSync) return;
  // allow center-scan while expandedContent is open if the user is
  // actively performing a manual scroll (we want the activeSection to
  // update in that case). Otherwise bail out when expandedContent is
  // present to avoid noisy updates during programmatic flows.
  if (!localIsManualRef.current && expandedContent) return;
  if (isScrolling) return;

        const { scrollTop, clientHeight } = container;
        const center = scrollTop + clientHeight / 2;
        const sections = Array.from(container.querySelectorAll('[id^="section-"]'));
        if (!sections || sections.length === 0) return;

        // If expanded content is open, restrict activeSection updates so we don't
        // accidentally jump far down the page (e.g., to recipe7) while the user
        // is scrolling inside a long expanded tutorial. Instead, allow only the
        // expanded section or its immediate neighbor to become active.
        let foundIndex = sections.findIndex(s => center >= s.offsetTop && center <= s.offsetTop + s.offsetHeight);
        if (expandedContent) {
          const expandedIndex = (expandedContent && expandedContent.recipeId) ? expandedContent.recipeId - 1 : null;
          if (expandedIndex !== null && expandedIndex >= 0 && expandedIndex < sections.length) {
            const expEl = sections[expandedIndex];
            const minForExp = expEl.offsetTop;
            const maxForExp = expEl.offsetTop + expEl.offsetHeight - container.clientHeight; // last scrollTop that keeps section visible
            const threshold = 40; // small hysteresis

            // If center is within expanded section's visible range, mark expandedIndex
            if (center >= minForExp && center <= minForExp + expEl.offsetHeight) {
              foundIndex = expandedIndex;
            } else if (center > maxForExp + threshold) {
              // scrolled past expanded content — advance only one section forward
              foundIndex = Math.min(expandedIndex + 1, sections.length - 1);
            } else if (center < minForExp - threshold) {
              // scrolled above expanded content — go to previous section
              foundIndex = Math.max(expandedIndex - 1, 0);
            } else {
              // default fallback: keep expandedIndex
              foundIndex = expandedIndex;
            }
          }
        }

        // Special-case UX: when viewing recipe1/tutorial (expanded tutorial for recipe 1),
        // allow manual scroll to advance only to recipe2 (expandedIndex + 1). Any further
        // manual scrolling should be clamped to recipe2. After transitioning to recipe2,
        // ignore activeSection changes for 2 seconds so the UI stabilizes.
        try {
          if (expandedContent && expandedContent.recipeId === 1 && expandedContent.tabId === 'tutorial' && localIsManualRef.current) {
            const expandedIndex = 0; // recipeId 1 -> index 0
            const allowedMin = expandedIndex;
            const allowedMax = Math.min(sections.length - 1, expandedIndex + 1);
            if (foundIndex < allowedMin) foundIndex = allowedMin;
            if (foundIndex > allowedMax) foundIndex = allowedMax;
          }
        } catch (e) {}

        // If we've recently collapsed expanded content, avoid jumping far from
        // the collapse origin. Clamp the allowed activeSection to origin ±1
        // for a short window to give the UI time to stabilize.
        const now = Date.now();
        if (collapseOriginAtRef.current && (now - collapseOriginAtRef.current) < 2000 && collapseOriginSectionRef.current !== null) {
          const origin = collapseOriginSectionRef.current;
          const minAllowed = Math.max(0, origin - 1);
          const maxAllowed = Math.min(sections.length - 1, origin + 1);
          if (foundIndex < minAllowed) foundIndex = minAllowed;
          if (foundIndex > maxAllowed) foundIndex = maxAllowed;
        }

        if (foundIndex !== -1 && foundIndex !== activeSection) {
          if (DEBUG) console.log('[Content] center-scan found active section', foundIndex);
          setActiveSection(foundIndex);
          // If we just moved from recipe1/tutorial -> recipe2 because of manual scroll,
          // set a 2s ignore window so nothing else reacts immediately.
          try {
            const prev = prevActiveRef.current;
            if (prev === 0 && foundIndex === 1 && expandedContent && expandedContent.recipeId === 1 && expandedContent.tabId === 'tutorial' && localIsManualRef.current) {
              ignoreActiveUntilRef.current = Date.now() + 2000;
              collapseOriginSectionRef.current = foundIndex;
              collapseOriginAtRef.current = Date.now();
              if (DEBUG) console.log('[Content] special clamp: moved 0->1 in recipe1/tutorial, setting ignoreActiveUntil=+2000');
            }
          } catch (e) {}
        }
      } catch (e) {
        console.warn('center-scan failed', e);
      }
    };

    const debouncedScrollHandler = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        scanAndSetActive();
        debounceTimer = null;
      }, 120);
    };

    // backward-compatible bottom detection: if user scrolls to bottom explicitly,
    // activate the last section after a short debounce
    let bottomTimeout = null;
    const bottomHandler = () => {
      try {
        // Prevent bottom-activation while programmatic open/centering is active
        if (Date.now() < (ignoreActiveUntilRef.current || 0)) return;
        const storeState = useGPTStudyStore.getState();
  if (storeState.operationInProgress) return;
  if (storeState.suspendNavSync) return;
  // Do NOT treat "reached bottom" as a trigger to activate the last section
  // while some tab/expanded content is open. That caused users scrolling
  // inside a long expanded tutorial to be bumped to the final recipe.
  // Require expandedContent to be null for bottom-based last-section activation.
  if (expandedContent) return;
  if (isScrolling) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
        // diagnostic log for debugging auto-bottom activation
        if (DEBUG) console.log('[Content][bottomHandler] scrollTop=', scrollTop, 'clientHeight=', clientHeight, 'scrollHeight=', scrollHeight, 'isAtBottom=', isAtBottom);
        if (isAtBottom) {
          if (!bottomTimeout) {
            bottomTimeout = setTimeout(() => {
              if (DEBUG) console.log('📍 Reached bottom (stable), activating last section (diagnostic)');
              try {
                const s = useGPTStudyStore.getState();
                console.log('[Content][bottomHandler] storeState:', { operationInProgress: s.operationInProgress, suspendNavSync: s.suspendNavSync, expandedContent: !!expandedContent });
              } catch (e) {}
              setActiveSection(gptStudyData.length - 1);
              bottomTimeout = null;
            }, 150);
          }
        } else {
          if (bottomTimeout) {
            clearTimeout(bottomTimeout);
            bottomTimeout = null;
          }
        }
      } catch (e) {
        console.warn('bottom handler failed', e);
      }
    };

    container.addEventListener('scroll', debouncedScrollHandler);
    container.addEventListener('scroll', bottomHandler);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      if (bottomTimeout) clearTimeout(bottomTimeout);
      container.removeEventListener('scroll', debouncedScrollHandler);
      container.removeEventListener('scroll', bottomHandler);
      // cleanup user interaction listeners
      try { containerEl.removeEventListener('wheel', markManual); } catch (e) {}
      try { containerEl.removeEventListener('touchstart', markManual); } catch (e) {}
      try { containerEl.removeEventListener('pointerdown', markManual); } catch (e) {}
      try { window.removeEventListener('keydown', keyHandler); } catch (e) {}
    };
  }, [setActiveSection, isReady, isScrolling, expandedContent, activeSection]);

  // ✅ expandedContent 변경 시 ScrollTrigger refresh (debounced)
  useEffect(() => {
    if (!isReady) return;

    const debouncedRefresh = debounce(() => {
      const now = Date.now();
      const ignoreUntil = ignoreActiveUntilRef.current || 0;
      const effectiveIgnoreUntil = ignoreUntil + EXTRA_IGNORE_MS;
      if (now < effectiveIgnoreUntil) {
        const delay = Math.max(50, effectiveIgnoreUntil - now + 50);
        console.log(`🔄 Delaying ScrollTrigger.refresh until after ignoreActiveUntil (+${delay}ms) abVariant=${abVariant}`);
        setTimeout(() => {
          try { console.log('🔄 Refreshing ScrollTrigger (delayed) due to content change'); } catch (e) {}
          ScrollTrigger.refresh();
        }, delay);
      } else {
        try { console.log('🔄 Refreshing ScrollTrigger due to content change'); } catch (e) {}
        ScrollTrigger.refresh();
      }
    }, 100);

    debouncedRefresh();
  }, [expandedContent, isReady]);

  // If store writes a global collapse timestamp, honor it by extending the
  // ignoreActiveUntilRef window so center-scan / bottomHandler do not react
  // immediately after a collapse. This prevents accidental jumps when a
  // large expanded area was just closed.
  useEffect(() => {
    if (!isReady) return;
    try {
      if (typeof window !== 'undefined' && window.__GPT_STUDY_LAST_COLLAPSE) {
        const t = window.__GPT_STUDY_LAST_COLLAPSE;
        // if collapse was recent, set a short ignore window
        const now = Date.now();
        if (now - t < 2000) {
          // give a larger grace after collapse (plus EXTRA_IGNORE_MS)
          // increase from 600ms -> 1200ms to cover ScrollTrigger refreshes
          // and programmatic scrolling that may follow a collapse.
          ignoreActiveUntilRef.current = now + 1200 + EXTRA_IGNORE_MS;
          if (DEBUG) console.log('[Content] detected global collapse, setting ignoreActiveUntil=', ignoreActiveUntilRef.current);
          // remember which section was active at the time of collapse so we can
          // prevent center-scan from jumping far away immediately after.
          try { collapseOriginSectionRef.current = activeSection; collapseOriginAtRef.current = now; } catch (e) {}
          // Also ensure the scroll position is sensibly inside the collapsed
          // section's viewportable range. If the container is near the doc
          // bottom (because the expanded content was tall), animate it up so
          // the collapsed section is fully visible. This avoids center-scan
          // later deciding a faraway section is centered.
          try {
            const container = localContentRef.current;
            if (container && typeof activeSection === 'number') {
              const sec = container.querySelector(`#section-${activeSection}`);
              if (sec) {
                const minScrollForSection = sec.offsetTop;
                const maxScrollForSection = Math.max(sec.offsetTop + sec.offsetHeight - container.clientHeight, minScrollForSection);
                const cur = container.scrollTop;
                // if current is outside the [min, max] by a margin, animate into range
                const margin = 40;
                if (cur > maxScrollForSection + margin) {
                  try {
                    if (DEBUG) console.log('[Content] collapsing-adjust: animating scroll into collapsed section range', { from: cur, to: maxScrollForSection });
                    gsap.to(container, { scrollTop: maxScrollForSection, duration: 0.45, ease: 'power2.out' });
                    // extend ignore window so this animation doesn't race center-scan
                    ignoreActiveUntilRef.current = Date.now() + 900 + EXTRA_IGNORE_MS;
                  } catch (e) { /* ignore */ }
                } else if (cur < minScrollForSection - margin) {
                  try {
                    if (DEBUG) console.log('[Content] collapsing-adjust: animating scroll up into collapsed section range', { from: cur, to: minScrollForSection });
                    gsap.to(container, { scrollTop: minScrollForSection, duration: 0.45, ease: 'power2.out' });
                    ignoreActiveUntilRef.current = Date.now() + 900 + EXTRA_IGNORE_MS;
                  } catch (e) { /* ignore */ }
                }
              }
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
  }, [expandedContent, isReady]);

  // activeSection 변화 감지 → 스크롤 이동 (Sidebar 클릭 시)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (!localContentRef.current || !isReady) return;

    const targetSection = localContentRef.current.querySelector(`#section-${activeSection}`);
    
    if (targetSection) {
      localIsManualRef.current = false;
      setIsScrolling(true);
      
      console.log(`📍 Sidebar clicked, scrolling to section ${activeSection}`);

      gsap.to(localContentRef.current, {
        scrollTo: {
          y: targetSection,
          offsetY: 0,
          autoKill: true
        },
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setIsScrolling(false);
          localIsManualRef.current = true;
          console.log(`✅ Scroll completed to section ${activeSection}`);
        }
      });
    }
  }, [activeSection, isReady]);

  return (
    <ContentProvider contentRef={localContentRef} isManualScrollRef={localIsManualRef}>
      <main 
        ref={localContentRef}
        className={`
          w-5/6 h-screen bg-black overflow-y-auto
          ${isScrolling ? '' : 'snap-y snap-mandatory'}
        `}
      >
        <div className="flex flex-col gap-6">
          {gptStudyData.map((recipe, index) => (
            <Section 
              key={recipe.id} 
              recipe={recipe} 
              index={index}
            />
          ))}
        </div>
        
    <style>{`
          main::-webkit-scrollbar {
            width: 8px;
          }
          main::-webkit-scrollbar-track {
            background: #1a1a1a;
          }
          main::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 4px;
          }
          main::-webkit-scrollbar-thumb:hover {
            background: #666;
          }
        `}</style>
      </main>
    </ContentProvider>
  );
};

export default Content;