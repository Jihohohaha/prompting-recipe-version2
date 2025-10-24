import React from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/images/google_logo.svg';
import '../../styles/socialLogin.css';

const SocialLoginPage = () => {
  const handleGoogleLogin = () => {
    // 백엔드의 Google 로그인 API 엔드포인트로 이동합니다.
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Sign in to create your own recipe</p>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <img src={googleLogo} alt="Google logo" className="google-logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLoginPage;
