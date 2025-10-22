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
  const { activeSection, setActiveSection, expandedContent, collapseContent } = useGPTStudyStore();
  const isInitialMount = useRef(true);

  // 초기 진입 시 recipe1로 리다이렉트
  useEffect(() => {
    if (!slug) {
      console.log('📄 No slug detected, redirecting to recipe1');
      navigate('/gpt-study/recipe1', { replace: true });
    }
  }, [slug, navigate]);

  // ✅ URL → activeSection
  useEffect(() => {
    if (!slug) return;
    
    const recipe = getRecipeBySlug(slug);
    if (!recipe) return;

    const newIndex = recipe.id - 1;
    
    // 초기 마운트 시에만 activeSection 설정
    if (isInitialMount.current) {
      console.log(`🔗 Initial URL: ${slug}, setting activeSection to ${newIndex}`);
      setActiveSection(newIndex);
      isInitialMount.current = false;
    }
  }, [slug, setActiveSection]);

  // ✅ activeSection → URL (Reference 패턴!)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    
    const recipe = gptStudyData[activeSection];
    if (!recipe) return;
    
    // ✅ Reference 로직: expandedContent가 현재 activeSection과 일치하고 tab이 있으면 URL 유지
    if (expandedContent && expandedContent.recipeId - 1 === activeSection && tab) {
      console.log(`📌 Keeping URL: expandedContent matches activeSection ${activeSection} with tab ${tab}`);
      return;
    }
    
    // ✅ 그 외에는 activeSection 기반으로 URL 업데이트
    if (slug !== recipe.slug) {
      console.log(`📄 Active section changed to ${activeSection}, updating URL to ${recipe.slug}`);
      
      // 탭이 열려있었다면 접기
      if (expandedContent) {
        console.log(`🔽 Collapsing tab because activeSection changed`);
        collapseContent();
      }
      
      navigate(`/gpt-study/${recipe.slug}`, { replace: true });
    }
  }, [activeSection, slug, tab, expandedContent, navigate, collapseContent]);

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