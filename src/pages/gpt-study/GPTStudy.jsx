// src/pages/gpt-study/GPTStudy.jsx
import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Sidebar from './components/sidebar/Sidebar';
import Content from './components/content/Content';
import useGPTStudyStore from './store';
import { gptStudyData, getRecipeBySlug } from './data';

const GPTStudy = () => {
  const { slug, tab, subTab } = useParams();
  const navigate = useNavigate();
  const { activeSection, setActiveSection, setExpandedContent } = useGPTStudyStore();
  const isInitialMount = useRef(true);

  // GSAP 플러그인 등록
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 초기 진입 시 recipe1로 리다이렉트
  useEffect(() => {
    if (!slug) {
      console.log('🔄 No slug detected, redirecting to recipe1');
      navigate('/gpt-study/recipe1', { replace: true });
    }
  }, [slug, navigate]);

  // URL 변경 시 activeSection 및 expandedContent 업데이트
  useEffect(() => {
    if (!slug) return;
    
    const recipe = getRecipeBySlug(slug);
    if (recipe) {
      // activeSection 업데이트
      if (isInitialMount.current) {
        console.log(`🔗 Initial URL: ${slug}, setting activeSection to ${recipe.id - 1}`);
        setActiveSection(recipe.id - 1);
        isInitialMount.current = false;
      }
      
      // expandedContent 업데이트
      if (tab) {
        console.log(`📖 Tab detected: ${tab}${subTab ? `/${subTab}` : ''}`);
        setExpandedContent({ 
          recipeId: recipe.id, 
          tabId: tab,
          subTab: subTab || null
        });
      } else {
        setExpandedContent(null);
      }
    }
  }, [slug, tab, subTab, setActiveSection, setExpandedContent]);

  // activeSection 변경 시 URL 업데이트 (탭이 없을 때만)
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    if (tab) return; // 탭이 펼쳐져 있으면 URL 변경 안 함
    
    const recipe = gptStudyData[activeSection];
    if (recipe && slug !== recipe.slug) {
      console.log(`🔄 Active section changed to ${activeSection}, updating URL to ${recipe.slug}`);
      navigate(`/gpt-study/${recipe.slug}`, { replace: true });
    }
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