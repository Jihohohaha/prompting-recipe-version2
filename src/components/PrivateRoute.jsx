import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // 사용자 요청에 따라 인증 여부와 관계없이 메인 페이지로 이동하도록 수정합니다.
  // 이는 임시적인 조치이며, 실제 인증 시스템에서는 적절한 인증 확인 로직이 필요합니다.
  console.log('PrivateRoute: Authentication check bypassed as per user request. Rendering children.');
  return children;
};

export default PrivateRoute;
