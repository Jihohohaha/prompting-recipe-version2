// src/pages/gpt-study/GPTStudy.jsx
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import useGPTStudyStore from './store';
import { gptStudyData, getRecipeBySlug } from './data';

const GPTStudy = () => {
  const { slug, tab } = useParams();
  const navigate = useNavigate();
  const { activeSection, setActiveSection } = useGPTStudyStore();
  const isNavigatingRef = useRef(false); // ✅ 프로그래매틱 네비게이션 플래그

  // 초기 진입 시 recipe1로 리다이렉트
  useEffect(() => {
    if (!slug) {
      console.log('📄 No slug detected, redirecting to recipe1');
      navigate('/gpt-study/recipe1', { replace: true });
    }
  }, [slug, navigate]);

  // ✅ URL → activeSection (단방향만)
  useEffect(() => {
    if (!slug) return;
    
    const recipe = getRecipeBySlug(slug);
    if (!recipe) return;

    const newIndex = recipe.id - 1;
    
    if (activeSection !== newIndex) {
      console.log(`🔗 URL changed: ${slug}, updating activeSection to ${newIndex}`);
      setActiveSection(newIndex);
    }
  }, [slug, setActiveSection]); // ✅ activeSection 제거!

  // ✅ activeSection 변경 시 URL 업데이트 (ScrollTrigger에서 온 경우만)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (tab) return; // 탭이 펼쳐져 있으면 URL 변경 안 함
    
    const recipe = gptStudyData[activeSection];
    if (!recipe) return;
    
    // ✅ 이미 해당 URL이면 무시 (무한 루프 방지)
    if (slug === recipe.slug) return;
    
    // ✅ 네비게이션 중이면 무시
    if (isNavigatingRef.current) return;
    
    console.log(`📄 Active section changed to ${activeSection}, updating URL to ${recipe.slug}`);
    isNavigatingRef.current = true;
    navigate(`/gpt-study/${recipe.slug}`, { replace: true });
    
    // 플래그 해제
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 100);
  }, [activeSection, slug, tab, navigate]);

  const currentRecipe = slug ? getRecipeBySlug(slug) : gptStudyData[0];

  return (
    <>
      <Helmet>
        <title>{currentRecipe?.title || 'GPT Study'} | Prompting Recipe</title>
        <meta 
          name="description" 
          content={currentRecipe?.description || 'GPT 프롬프팅 학습'} 
        />
      </Helmet>

      <div className="flex h-screen bg-black overflow-hidden">
        <Sidebar />
        <Content />
      </div>
    </>
  );
};

export default GPTStudy;