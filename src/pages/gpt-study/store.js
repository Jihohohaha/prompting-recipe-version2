// src/pages/gpt-study/store.js
import { create } from 'zustand';

const useGPTStudyStore = create((set) => ({
  activeSection: 0, // 현재 활성화된 섹션 인덱스 (0~6)
  
  setActiveSection: (index) => set({ activeSection: index }),
  
  // Navigation 클릭 시 사용
  setNavTo: (index) => set({ activeSection: index })
}));

export default useGPTStudyStore;