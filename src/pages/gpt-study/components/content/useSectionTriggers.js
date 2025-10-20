import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGPTStudyStore from '../../store';

// Ensure plugin is registered (safe to call multiple times)
try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}

/**
 * useSectionTriggers
 * - sectionRef: ref to the section DOM node
 * - options: { index, recipeId, contentRef, isManualScrollRef, expandedContent, setActiveSection, collapseContent }
 *
 * Creates a ScrollTrigger for the section (start: top center, end: bottom center)
 * onEnter/onEnterBack => setActiveSection(index) if manualScroll
 * onLeave/onLeaveBack => if this section is expanded, call collapseContent()
 */
const useSectionTriggers = (sectionRef, options = {}) => {
  const {
    index,
    recipeId,
    contentRef,
    isManualScrollRef,
    expandedContent,
    setActiveSection,
    collapseContent
  } = options;

  useEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    if (!contentRef || !contentRef.current) return;

    const el = sectionRef.current;
    // read optional threshold override from URL: ?ratio=0.4
    const getAllowThreshold = () => {
      try {
        const sp = new URL(window.location.href).searchParams.get('ratio');
        const n = parseFloat(sp);
        if (!Number.isNaN(n)) {
          // clamp to reasonable range
          return Math.min(1, Math.max(0, n));
        }
      } catch (e) {}
      return 0.4;
    };
    const allowThreshold = getAllowThreshold();
    try { console.info(`[trigger] allowThreshold for section=${index} recipe=${recipeId} => ${allowThreshold}`); } catch (e) {}
    let createdTrigger = null;
    let createDelayTimer = null;
    let createInterval = null;
    const shouldDelayCreate = () => {
      try {
        const s = useGPTStudyStore.getState();
        return !!(s.operationInProgress || s.suspendNavSync);
      } catch (e) { return false; }
    };
    const scheduleCreate = () => {
      // Poll until operation lock is gone or until timeout
      const maxWait = 3000; // ms
      const start = Date.now();
      if (!shouldDelayCreate()) {
        createdTrigger = doCreate();
        return;
      }
      createInterval = setInterval(() => {
        if (!shouldDelayCreate()) {
          clearInterval(createInterval);
          createInterval = null;
          createdTrigger = doCreate();
          return;
        }
        if (Date.now() - start > maxWait) {
          clearInterval(createInterval);
          createInterval = null;
          // proceed anyway after timeout
          createdTrigger = doCreate();
        }
      }, 100);
    };
    let enterTimer = null;
    // helper to actually create the trigger
    const doCreate = () => {
      const t = ScrollTrigger.create({
      onRefresh: () => {
        try { console.debug(`[trigger] refresh for section=${index} recipe=${recipeId}`); } catch (e) {}
      },
      trigger: el,
      scroller: contentRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        try { console.debug(`[trigger] onEnter section=${index} recipe=${recipeId} manual=${!!(isManualScrollRef && isManualScrollRef.current)} expanded=${!!expandedContent}`); } catch (e) {}
        // debounce activation slightly to avoid transient race states during
        // layout changes/refreshes. Only set active when still manual.
        try {
          // If expandedContent is open, allow activation only when the
          // section's center ratio exceeds a threshold (so users who scroll
          // well past the section still get the active update).
          if (expandedContent) {
            try {
              const s = useGPTStudyStore.getState();
              console.debug(`[trigger] onEnter expanded open - store.suspendNavSync=${!!s.suspendNavSync} operationInProgress=${!!s.operationInProgress} opToken=${s.opToken||null}`);
            } catch (e) {}
            const container = contentRef && contentRef.current;
            let center = null, secTop = null, secHeight = null, ratio = null;
            if (container && el) {
              center = container.scrollTop + container.clientHeight / 2;
              secTop = el.offsetTop;
              secHeight = el.offsetHeight || 1;
              ratio = (center - secTop) / secHeight; // 0..1 roughly when center within section
            }
            // use allowThreshold from URL or default
            console.debug(`[trigger] onEnter expanded check recipe=${recipeId} center=${center} secTop=${secTop} secHeight=${secHeight} ratio=${ratio} allowThreshold=${allowThreshold}`);
            // If the user is manually scrolling, allow activation even if the
            // center ratio is below the allowThreshold. However, if the
            // special clamp is active for recipe1/tutorial, enforce that the
            // only allowed activation from recipe1 is recipe2 and ignore
            // activations for 2s after the transition.
            const manualScroll = !!(isManualScrollRef && isManualScrollRef.current);
            if (ratio === null || !(ratio >= allowThreshold)) {
              if (manualScroll) {
                // fallthrough to checks below
              } else {
                console.debug(`[trigger] onEnter skipping setActiveSection because expandedContent is open and ratio<${allowThreshold} for recipe=${recipeId}`);
                return;
              }
            }
            // Enforce Content clamp: if expandedContent is recipe1/tutorial,
            // do not allow any section other than index 0 or 1 to activate via
            // triggers during the immediate manual scroll.
            try {
              if (expandedContent && expandedContent.recipeId === 1 && expandedContent.tabId === 'tutorial' && isManualScrollRef && isManualScrollRef.current) {
                const container = contentRef && contentRef.current;
                if (container) {
                  const ignoreUntil = (container.__ignoreActiveUntil || 0) || 0; // rarely set
                  const now = Date.now();
                  // If still in ignore window stored on container or via a global
                  // store, skip activations that would setActiveSection > 1
                  const allowedMax = 1; // only recipe2 allowed
                  if (index > allowedMax) {
                    console.debug(`[trigger] onEnter blocking activation index=${index} > allowedMax=${allowedMax} for recipe1/tutorial`);
                    return;
                  }
                }
              }
            } catch (e) {}
          }
          if (!(isManualScrollRef && isManualScrollRef.current)) return;
          if (enterTimer) clearTimeout(enterTimer);
          enterTimer = setTimeout(() => {
            try {
              try { const prev = useGPTStudyStore.getState().activeSection; console.debug(`[trigger] about to setActiveSection(${index}) prevActive=${prev} recipe=${recipeId}`); } catch (e) {}
              // If expandedContent is open, collapse it and restore nav sync so
              // the activeSection -> URL sync will occur. Prefer the passed
              // collapseContent callback (component-level) but also ensure the
              // global store flag is cleared.
              try {
                if (expandedContent) {
                  console.info(`[trigger] manual activation while expanded; collapsing recipe=${recipeId} and restoring nav sync`);
                  try { collapseContent && collapseContent(); } catch(e) { console.warn('collapseContent callback failed', e); }
                  try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(false); } catch(e) { console.warn('setSuspendNavSync failed', e); }
                }
              } catch (e) {}
              setActiveSection && setActiveSection(index);
              try { const now = useGPTStudyStore.getState().activeSection; console.debug(`[trigger] setActiveSection done newActive=${now} recipe=${recipeId}`); } catch (e) {}
            } catch (e) {}
            enterTimer = null;
          }, 120);
        } catch (e) {}
      },
      onEnterBack: () => {
        try { console.debug(`[trigger] onEnterBack section=${index} recipe=${recipeId} manual=${!!(isManualScrollRef && isManualScrollRef.current)} expanded=${!!expandedContent}`); } catch (e) {}
        try {
          if (expandedContent) {
            try {
              const s = useGPTStudyStore.getState();
              console.debug(`[trigger] onEnterBack expanded open - store.suspendNavSync=${!!s.suspendNavSync} operationInProgress=${!!s.operationInProgress} opToken=${s.opToken||null}`);
            } catch (e) {}
            const container = contentRef && contentRef.current;
            let center = null, secTop = null, secHeight = null, ratio = null;
            if (container && el) {
              center = container.scrollTop + container.clientHeight / 2;
              secTop = el.offsetTop;
              secHeight = el.offsetHeight || 1;
              ratio = (center - secTop) / secHeight;
            }
            // use allowThreshold from URL or default
            console.debug(`[trigger] onEnterBack expanded check recipe=${recipeId} center=${center} secTop=${secTop} secHeight=${secHeight} ratio=${ratio} allowThreshold=${allowThreshold}`);
            const manualScrollBack = !!(isManualScrollRef && isManualScrollRef.current);
            if (ratio === null || !(ratio >= allowThreshold)) {
              if (manualScrollBack) {
                console.debug(`[trigger] onEnterBack allowing setActiveSection due to manual scroll despite ratio=${ratio} < ${allowThreshold} for recipe=${recipeId}`);
                // fallthrough
              } else {
                console.debug(`[trigger] onEnterBack skipping setActiveSection because expandedContent is open and ratio<${allowThreshold} for recipe=${recipeId}`);
                return;
              }
            } else {
              console.debug(`[trigger] onEnterBack allowing setActiveSection while expanded open (ratio=${ratio && ratio.toFixed ? ratio.toFixed(2) : ratio} >= ${allowThreshold}) for recipe=${recipeId}`);
            }
          }
          if (!(isManualScrollRef && isManualScrollRef.current)) return;
          if (enterTimer) clearTimeout(enterTimer);
          enterTimer = setTimeout(() => {
            try {
              try { const prevB = useGPTStudyStore.getState().activeSection; console.debug(`[trigger] about to setActiveSection(back->${index}) prevActive=${prevB} recipe=${recipeId}`); } catch (e) {}
              try {
                if (expandedContent) {
                  console.info(`[trigger] manual activation(back) while expanded; collapsing recipe=${recipeId} and restoring nav sync`);
                  try { collapseContent && collapseContent(); } catch(e) { console.warn('collapseContent callback failed', e); }
                  try { useGPTStudyStore.getState().setSuspendNavSync && useGPTStudyStore.getState().setSuspendNavSync(false); } catch(e) { console.warn('setSuspendNavSync failed', e); }
                }
              } catch (e) {}
              setActiveSection && setActiveSection(index);
              try { const nowB = useGPTStudyStore.getState().activeSection; console.debug(`[trigger] setActiveSection(back) done newActive=${nowB} recipe=${recipeId}`); } catch (e) {}
            } catch (e) {}
            enterTimer = null;
          }, 120);
        } catch (e) {}
      },
      onLeave: () => {
        try { console.debug(`[trigger] onLeave section=${index} recipe=${recipeId} expanded=${!!expandedContent}`); } catch (e) {}
        // clear any pending enter timers
        try { if (enterTimer) { clearTimeout(enterTimer); enterTimer = null; } } catch (e) {}
        // when leaving, if expandedContent is for this recipe, collapse
        if (expandedContent && expandedContent.recipeId === recipeId) {
          // Only collapse when the user manually scrolled well outside the
          // section bounds. Scrolling within a tall expanded content can make
          // the ScrollTrigger think we've left the section even though the
          // user is still inside the expanded area — avoid collapsing in
          // that common case.
          try {
            const manual = !!(isManualScrollRef && isManualScrollRef.current);
            const container = contentRef && contentRef.current;
            let center = null;
            let secTop = null;
            let secBottom = null;
            let secHeight = null;
            if (container && el) {
              center = container.scrollTop + container.clientHeight / 2;
              secTop = el.offsetTop;
              secHeight = el.offsetHeight;
              secBottom = secTop + secHeight;
            }

            const threshold = secHeight ? Math.max(100, secHeight * 0.25) : 200; // px or 25%
            const outside = center !== null && (center < secTop - threshold || center > secBottom + threshold);

            console.debug(`[trigger] onLeave check recipe=${recipeId} manual=${manual} center=${center} secTop=${secTop} secBottom=${secBottom} threshold=${threshold} outside=${outside}`);

            if (!manual) {
              console.debug(`[trigger] onLeave skipping collapse (not manual) recipe=${recipeId}`);
            } else if (!outside) {
              console.debug(`[trigger] onLeave skipping collapse (still within tolerant bounds) recipe=${recipeId}`);
            } else {
              console.info(`[trigger] onLeave collapsing expanded content for recipe=${recipeId} (manual=${manual} outside=${outside})`);
              try { collapseContent && collapseContent(); } catch (e) {}
            }
          } catch (e) {
            console.warn('[trigger] onLeave collapse check failed', e);
          }
        } else {
          try { console.debug(`[trigger] onLeave skipping collapse for recipe=${recipeId} expandedContent=${expandedContent ? JSON.stringify(expandedContent) : 'null'}`); } catch (e) {}
        }
      },
      onLeaveBack: () => {
        try { console.debug(`[trigger] onLeaveBack section=${index} recipe=${recipeId} expanded=${!!expandedContent}`); } catch (e) {}
        try { if (enterTimer) { clearTimeout(enterTimer); enterTimer = null; } } catch (e) {}
        if (expandedContent && expandedContent.recipeId === recipeId) {
          try {
            const manualBack = !!(isManualScrollRef && isManualScrollRef.current);
            const container = contentRef && contentRef.current;
            let center = null;
            let secTop = null;
            let secBottom = null;
            let secHeight = null;
            if (container && el) {
              center = container.scrollTop + container.clientHeight / 2;
              secTop = el.offsetTop;
              secHeight = el.offsetHeight;
              secBottom = secTop + secHeight;
            }
            const thresholdBack = secHeight ? Math.max(100, secHeight * 0.25) : 200;
            const outsideBack = center !== null && (center < secTop - thresholdBack || center > secBottom + thresholdBack);

            console.debug(`[trigger] onLeaveBack check recipe=${recipeId} manual=${manualBack} center=${center} secTop=${secTop} secBottom=${secBottom} threshold=${thresholdBack} outside=${outsideBack}`);

            if (!manualBack) {
              console.debug(`[trigger] onLeaveBack skipping collapse (not manual) recipe=${recipeId}`);
            } else if (!outsideBack) {
              console.debug(`[trigger] onLeaveBack skipping collapse (still within tolerant bounds) recipe=${recipeId}`);
            } else {
              console.info(`[trigger] onLeaveBack collapsing expanded content for recipe=${recipeId} (manual=${manualBack} outside=${outsideBack})`);
              try { collapseContent && collapseContent(); } catch (e) {}
            }
          } catch (e) {
            console.warn('[trigger] onLeaveBack collapse check failed', e);
          }
        } else {
          try { console.debug(`[trigger] onLeaveBack skipping collapse for recipe=${recipeId} expandedContent=${expandedContent ? JSON.stringify(expandedContent) : 'null'}`); } catch (e) {}
        }
      }
      });
      try { console.info(`[trigger] created ScrollTrigger for section=${index} recipe=${recipeId}`); } catch (e) {}
      return t;
    };

    // If an operation is in progress (open/center), delay creating the trigger
    scheduleCreate();

    return () => {
      try { if (enterTimer) clearTimeout(enterTimer); } catch (e) {}
      try {
        if (createInterval) { clearInterval(createInterval); createInterval = null; }
        if (createdTrigger && createdTrigger.kill) { createdTrigger.kill(); try { console.info(`[trigger] killed ScrollTrigger for section=${index} recipe=${recipeId}`); } catch (e) {} }
      } catch (e) {}
    };
  // only recreate when these options change
  }, [sectionRef, contentRef, isManualScrollRef, expandedContent, index, recipeId, setActiveSection, collapseContent]);
};

export default useSectionTriggers;
