import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; // Assuming Header is in the same common folder

const HeaderWrapper = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/login';

  return (
    <>
      {showHeader && <Header />}
    </>
  );
};

export default HeaderWrapper;
