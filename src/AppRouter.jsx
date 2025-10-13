// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page/MainPage';
import GPTStudy from './pages/gpt-study/GPTStudy';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/gpt-study" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab" element={<GPTStudy />} />
      <Route path="/gpt-study/:slug/:tab/:subTab" element={<GPTStudy />} />
    </Routes>
  );
};

export default AppRouter;