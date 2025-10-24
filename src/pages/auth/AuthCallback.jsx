import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const error = params.get('error');

      if (error) {
        console.error('Authentication error:', error);
        navigate('/login?error=' + encodeURIComponent(error), { replace: true });
        return;
      }

      if (code) {
        try {
          // 백엔드에 인증 코드를 보내 토큰을 요청합니다.
          const response = await apiService.post('/auth/google/callback', { code });
          
          const { accessToken, refreshToken, user } = response.data;

          if (accessToken) {
            // 토큰과 사용자 정보를 localStorage에 저장합니다.
            localStorage.setItem('authToken', accessToken);
            if (refreshToken) {
              localStorage.setItem('refreshToken', refreshToken);
            }
            if (user) {
              localStorage.setItem('userInfo', JSON.stringify(user));
            }
            
            // 로그인 성공 후 메인 페이지로 리디렉션합니다.
            navigate('/', { replace: true });
          } else {
            throw new Error('Access token not received');
          }
        } catch (e) {
          console.error('Authentication failed:', e);
          navigate('/login?error=AuthenticationFailed', { replace: true });
        }
      } else {
        // 코드가 없는 경우 로그인 페이지로 리디렉션합니다.
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [location, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
      로그인 처리 중...
    </div>
  );
};

export default AuthCallback;
