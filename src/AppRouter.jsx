// src/routes/AppRouter.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MainPage from "./pages/main-page/MainPage";
import GPTStudy from "./pages/gpt-study/GPTStudy";
import Recipe1QuizMultipleResult from "./pages/gpt-study/components/content/tabs/expanded/quiz/Recipe1QuizMultipleResult";
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
      <Routes location={location} key={location.pathname}>
        {/* 로그인 & 인증 */}
        <Route path="/login" element={<SocialLoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PageTransition>
                <MainPage />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* GPT Study */}
        <Route
          path="/gpt-study"
          element={
          
              <GPTStudy />
          
          }
        />
        <Route
          path="/gpt-study/:slug"
          element={
            
              <GPTStudy />
           
          }
        />
        <Route
          path="/gpt-study/:slug/:tab"
          element={
         
              <GPTStudy />
            
          }
        />
        <Route
          path="/gpt-study/:slug/:tab/:subTab"
          element={
          //   <PageTransition>
          //     <GPTStudy />
          //   </PageTransition>
          //
          <GPTStudy /> 
          }
        />

        {/* 튜토리얼 */}
        <Route
          path="/tutorial"
          element={
            <PageTransition direction="forward">
              <ScrollPage />
            </PageTransition>
          }
        />

        {/* 선택 페이지 (main 새 추가) */}
        <Route
          path="/select"
          element={
            <PageTransition direction="forward">
              <ClosueStatueSelect />
            </PageTransition>
          }
        />

        {/* 테스트 */}
        <Route
          path="/test"
          element={
            <PageTransition>
              <Recipe1QuizMultipleResult />
            </PageTransition>
          }
        />
        <Route
          path="/test2"
          element={
            <PageTransition>
              <Recipe1QuizEssay />
            </PageTransition>
          }
        />

        {/* 커뮤니티 */}
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <PageTransition>
                <Community />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/community/ai-articles"
          element={
            <PrivateRoute>
              <PageTransition>
                <AIArticles />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/community/ai-gallery"
          element={
            <PrivateRoute>
              <PageTransition>
                <AIGallery />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/community/information"
          element={
            <PrivateRoute>
              <PageTransition>
                <Information />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/community/creation"
          element={
            <PrivateRoute>
              <PageTransition>
                <Creation />
              </PageTransition>
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
