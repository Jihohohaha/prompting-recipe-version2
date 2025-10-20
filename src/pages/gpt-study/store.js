// src/pages/gpt-study/store.js
import { create } from 'zustand';

const useGPTStudyStore = create((set) => ({
  // 현재 활성화된 섹션 인덱스 (0~6)
  activeSection: 0,
  
  // 펼쳐진 탭 정보 { recipeId: number, tabId: string, subTab?: string }
  // 예: { recipeId: 1, tabId: 'tutorial' } 또는 { recipeId: 1, tabId: 'quiz', subTab: 'essay' }
  expandedContent: null,
  // timestamp when expandedContent was set (ms)
  expandedAt: null,
  
  // 액션들
  setActiveSection: (index) => set({ activeSection: index }),
  
  // Navigation 클릭 시 사용
  setNavTo: (index) => set({ activeSection: index }),
  
  // 탭 펼치기/접기
  // setExpandedContent kept for API compatibility but will also record expandedAt
  setExpandedContent: (content) => {
    const at = content ? Date.now() : null;
    set({ expandedContent: content, expandedAt: at });
    try { console.info('[store] setExpandedContent', content ? content : null, { expandedAt: at }); } catch (e) {}
  },

  // ✅ expandContent helper: accept either an object payload or positional args
  // Usage:
  //  expandContent({ recipeId, tabId, subTab, opToken })
  //  or expandContent(recipeId, tabId, subTab)
  expandContent: (a, b, c = null) => {
    let payload = null;
    if (a && typeof a === 'object' && !Array.isArray(a)) {
      payload = a;
    } else if (typeof a === 'number') {
      payload = { recipeId: a, tabId: b, subTab: c };
    }
    const at = payload ? Date.now() : null;
    set({ expandedContent: payload, expandedAt: at });
    try { console.info('[store] expandContent', payload ? payload : null, { expandedAt: at }); } catch (e) {}
  },
  
    // flag to temporarily suspend activeSection -> URL navigation (prevent races)
    suspendNavSync: false,
    setSuspendNavSync: (v) => set({ suspendNavSync: v }),
  
    // convenience getter for current suspend flag
    isNavSyncSuspended: () => useGPTStudyStore.getState().suspendNavSync,

    // Operation lock: token-based to coordinate programmatic flows
    _opCounter: 0,
    operationInProgress: false,
    operationToken: null,
    // beginOperation returns a token (number) that must be used to complete/end
    beginOperation: () => {
      const state = useGPTStudyStore.getState();
      const next = (state._opCounter || 0) + 1;
      set({ _opCounter: next, operationInProgress: true, operationToken: next });
      try { console.debug('[store] beginOperation token=', next); } catch (e) {}
      return next;
    },
    // mark operation complete (called by animationComplete handlers)
    completeOperation: (token) => {
      const state = useGPTStudyStore.getState();
      if (!token) return false;
      if (state.operationToken !== token) {
        try { console.debug('[store] completeOperation token mismatch', token, state.operationToken); } catch (e) {}
        // Even if the global operationToken no longer matches (e.g. the
        // initiator already ended the operation), record the completed
        // token so any waiters polling isOperationComplete(token) can
        // proceed. This is defensive and prevents races where multiple
        // animationComplete callbacks happen for the same token.
        set({ _lastCompletedOperation: token });
        return true;
      }
      try { console.debug('[store] completeOperation token=', token); } catch (e) {}
      // Keep operationInProgress true until endOperation is called explicitly
      // but mark that the operation completed; we will leave the final end
      // to endOperation. Record the last completed token so waiters can
      // observe completion.
      set({ _lastCompletedOperation: token });
      return true;
    },
    // check if operation is complete (animation signaled)
    isOperationComplete: (token) => {
      const s = useGPTStudyStore.getState();
      return !!(s._lastCompletedOperation && s._lastCompletedOperation === token);
    },
    // finalize operation and clear lock if token matches
    endOperation: (token) => {
      const state = useGPTStudyStore.getState();
      if (!token) return false;
      if (state.operationToken !== token) {
        try { console.debug('[store] endOperation token mismatch', token, state.operationToken); } catch (e) {}
        return false;
      }
      set({ operationInProgress: false, operationToken: null, _lastCompletedOperation: null });
      try { console.debug('[store] endOperation token=', token); } catch (e) {}
      return true;
    },
  
  // 특정 탭이 펼쳐져 있는지 확인
  isTabExpanded: (recipeId, tabId, subTab = null) => {
    const state = useGPTStudyStore.getState();
    const { expandedContent } = state;
    
    if (!expandedContent) return false;
    
    const isRecipeMatch = expandedContent.recipeId === recipeId;
    const isTabMatch = expandedContent.tabId === tabId;
    const isSubTabMatch = subTab ? expandedContent.subTab === subTab : true;
    
    return isRecipeMatch && isTabMatch && isSubTabMatch;
  },
  
  // 접기
  collapseContent: () => {
    const prev = useGPTStudyStore.getState().expandedContent;
    const prevAt = useGPTStudyStore.getState().expandedAt;
    set({ expandedContent: null, expandedAt: null });
    try { console.info('[store] collapseContent -> expandedContent cleared', { prev, prevAt }); } catch (e) {}
    // Record a global timestamp so UI layers (Content) can react to a collapse
    // and temporarily ignore active-section scans / bottom activation. This
    // avoids immediate jumps when expanded content was large and the scroll
    // position was near the document bottom.
    try { if (typeof window !== 'undefined') window.__GPT_STUDY_LAST_COLLAPSE = Date.now(); } catch(e) {}
  },
}));

export default useGPTStudyStore;

// Expose store for debugging / automated tests in dev
try {
  if (typeof window !== 'undefined') {
    window.__USE_GPT_STUDY_STORE__ = useGPTStudyStore;
  }
} catch (e) {}