// src/routes/AppRouter.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MainPage from "./pages/main-page/MainPage";
import GPTStudy from "./pages/gpt-study/GPTStudy";
import Recipe1QuizMultiple from "./pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultiple";
import Recipe1QuizEssay from "./pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizEssay";
import ScrollPage from "./pages/main-page/components/TutorialScroll/TutorialScroll/ScrollPage";
import ClosueStatueSelect from "./pages/main-page/components/closue-statue-select/ClosueStatueSelect";

// backend-integration 쪽 추가 기능
import SocialLoginPage from "./pages/social-login/SocialLoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AuthCallback from "./pages/auth/AuthCallback";
import Community from "./pages/community/Community";
import AIArticles from "./pages/community/AIArticles";
import AIGallery from "./pages/community/AIGallery";
import Information from "./pages/community/Information";
import Creation from "./pages/community/Creation";

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<SocialLoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="/tutorial" element={<ScrollPage />} />
        <Route path="/select" element={<ClosueStatueSelect />} />
        <Route path="/gpt-study" element={<GPTStudy />} />
        <Route path="/gpt-study/:slug" element={<GPTStudy />} />
        <Route path="/gpt-study/:slug/:tab" element={<GPTStudy />} />
        <Route path="/gpt-study/:slug/:tab/:subTab" element={<GPTStudy />} />
        <Route path="/test" element={<Recipe1QuizMultiple />} />
        <Route path="/test2" element={<Recipe1QuizEssay />} />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
        <Route
          path="/community/ai-articles"
          element={
            <PrivateRoute>
              <AIArticles />
            </PrivateRoute>
          }
        />
        <Route
          path="/community/ai-gallery"
          element={
            <PrivateRoute>
              <AIGallery />
            </PrivateRoute>
          }
        />
        <Route
          path="/community/information"
          element={
            <PrivateRoute>
              <Information />
            </PrivateRoute>
          }
        />
        <Route
          path="/community/creation"
          element={
            <PrivateRoute>
              <Creation />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

/* ✅ iOS 스타일 슬라이드 애니메이션 */
const PageTransition = ({ children, direction = "forward" }) => {
  const slideVariants = {
    initial: {
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0.8,
      scale: 0.98,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      x: direction === "forward" ? "-15%" : "100%",
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "visible",
        background: "transparent",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AppRouter;
