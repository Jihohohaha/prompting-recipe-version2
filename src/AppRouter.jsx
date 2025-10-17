// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import GPTStudy from './pages/gpt-study/GPTStudy';
import Recipe1QuizMultipleResult from './pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult'
import Recipe1QuizEssay from './pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay';
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/gpt-study" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab/:subTab" element={<GPTStudy />} />
      <Route path="/test" element={<Recipe1QuizMultipleResult />} />
      <Route path="/test2" element={<Recipe1QuizEssay />} />
    </Routes>
  );
};

export default AppRouter;