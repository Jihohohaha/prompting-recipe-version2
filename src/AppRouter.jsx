// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import GPTStudy from './pages/gpt-study/GPTStudy';
import Recipe1QuizMultipleResult from './pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult'
import Recipe1QuizEssay from './pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay';
import SocialLoginPage from './pages/social-login/SocialLoginPage';
import PrivateRoute from './components/PrivateRoute';
import AuthCallback from './pages/auth/AuthCallback';
import Community from './pages/community/Community';
import AIArticles from './pages/community/AIArticles';
import AIGallery from './pages/community/AIGallery';
import Information from './pages/community/Information';
import Creation from './pages/community/Creation';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<SocialLoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
      <Route path="/gpt-study" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab/:subTab" element={<GPTStudy />} />
      <Route path="/test" element={<Recipe1QuizMultipleResult />} />
      <Route path="/test2" element={<Recipe1QuizEssay />} />
      <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
      <Route path="/community/ai-articles" element={<PrivateRoute><AIArticles /></PrivateRoute>} />
      <Route path="/community/ai-gallery" element={<PrivateRoute><AIGallery /></PrivateRoute>} />
      <Route path="/community/information" element={<PrivateRoute><Information /></PrivateRoute>} />
      <Route path="/community/creation" element={<PrivateRoute><Creation /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRouter;