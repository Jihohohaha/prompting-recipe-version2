// src/pages/gpt-study/store.js
import { create } from 'zustand';

const useGPTStudyStore = create((set) => ({
  // 현재 활성화된 섹션 인덱스 (0~6)
  activeSection: 0,
  
  // 펼쳐진 탭 정보 { recipeId: number, tabId: string, subTab?: string }
  // 예: { recipeId: 1, tabId: 'tutorial' } 또는 { recipeId: 1, tabId: 'quiz', subTab: 'essay' }
  expandedContent: null,
  
  // 액션들
  setActiveSection: (index) => set({ activeSection: index }),
  
  // Navigation 클릭 시 사용
  setNavTo: (index) => set({ activeSection: index }),
  
  // 탭 펼치기/접기
  setExpandedContent: (content) => set({ expandedContent: content }),
  
  // ✅ expandContent 별칭 추가 (기존 코드 호환성)
  expandContent: (recipeId, tabId, subTab = null) => set({ 
    expandedContent: { recipeId, tabId, subTab } 
  }),
  
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
  collapseContent: () => set({ expandedContent: null }),
}));

export default useGPTStudyStore;