// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main_logo.png';

const Header = () => {
  return (
    <header className="fixed top-4 left-4 z-50">
      <Link to="/">
        <img src={mainLogo} alt="Main Logo" className="h-10 w-auto" />
      </Link>
    </header>
  );
};

export default Header;
