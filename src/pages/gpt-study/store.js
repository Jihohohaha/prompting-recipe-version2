// src/pages/gpt-study/store.js
import { create } from 'zustand';

const useGPTStudyStore = create((set) => ({
  // 현재 활성화된 섹션 인덱스 (0~6)
  activeSection: 0,
  
  // 펼쳐진 탭 정보 { recipeId: number, tabId: string }
  expandedContent: null,
  
  // 액션들
  setActiveSection: (index) => set({ activeSection: index }),
  
  // 탭 펼치기/접기
  setExpandedContent: (content) => set({ expandedContent: content }),
  
  // 특정 탭이 펼쳐져 있는지 확인
  isTabExpanded: (recipeId, tabId) => {
    const state = useGPTStudyStore.getState();
    const { expandedContent } = state;
    
    if (!expandedContent) return false;
    
    return expandedContent.recipeId === recipeId && expandedContent.tabId === tabId;
  },
  
  // 접기
  collapseContent: () => set({ expandedContent: null }),
}));

export default useGPTStudyStore;