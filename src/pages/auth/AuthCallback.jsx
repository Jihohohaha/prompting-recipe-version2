import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const userInfo = params.get('user');
    const error = params.get('error');

    if (error) {
      console.error('Authentication error:', error);
      navigate('/login?error=' + encodeURIComponent(error), { replace: true });
      return;
    }

    if (accessToken) {
      console.log('AuthCallback: Access Token received:', accessToken);
      localStorage.setItem('authToken', accessToken);
      console.log('AuthCallback: authToken after setItem:', localStorage.getItem('authToken'));
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        console.log('AuthCallback: refreshToken after setItem:', localStorage.getItem('refreshToken'));
      }
      if (userInfo) {
        try {
          const user = JSON.parse(decodeURIComponent(userInfo));
          localStorage.setItem('userInfo', JSON.stringify(user));
          console.log('AuthCallback: userInfo after setItem:', localStorage.getItem('userInfo'));
        } catch (e) {
          console.error('AuthCallback: Failed to parse user info', e);
        }
      }
      console.log('AuthCallback: Navigating to / using useNavigate');
      navigate('/', { replace: true });
      return; // Added to prevent further execution in this useEffect run
    } else {
      console.log('AuthCallback: No access token found. Navigating to /login');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
      로그인 처리 중...
    </div>
  );
};

export default AuthCallback;
