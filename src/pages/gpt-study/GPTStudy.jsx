// src/pages/gpt-study/GPTStudy.jsx
import { useEffect } from 'react';
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const { activeSection, setActiveSection } = useGPTStudyStore();

  // GSAP 플러그인 등록
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    return () => {
      // cleanup: ScrollTrigger 인스턴스 제거
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // 초기 진입 시 recipe1로 리다이렉트
  useEffect(() => {
    if (!slug) {
      navigate('/gpt-study/recipe1', { replace: true });
    }
  }, [slug, navigate]);

  // URL 변경 시 activeSection 업데이트
  useEffect(() => {
    if (!slug) return;
    
    const recipe = getRecipeBySlug(slug);
    if (recipe) {
      setActiveSection(recipe.id - 1); // id는 1부터, index는 0부터
    }
  }, [slug, setActiveSection]);

  // activeSection 변경 시 URL 업데이트
  useEffect(() => {
    if (activeSection === null || activeSection === undefined) return;
    
    const recipe = gptStudyData[activeSection];
    if (recipe && slug !== recipe.slug) {
      window.history.pushState(
        recipe.title,
        recipe.title,
        `/gpt-study/${recipe.slug}`
      );
    }
  }, [activeSection, slug]);

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
        {/* 좌측 Sidebar (1/6) */}
        <Sidebar />
        
        {/* 우측 Content (5/6) */}
        <Content />
      </div>
    </>
  );
};

export default GPTStudy;