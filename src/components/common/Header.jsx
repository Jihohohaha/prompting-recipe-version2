// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main_logo.png';

const Header = () => {
  return (
    <header className="fixed top-4 left-4 z-[9999] bg-black p-2 rounded-[10px]">
      <Link to="/?step=5">
        <img src={mainLogo} alt="Main Logo" className="h-10 w-auto" />
      </Link>
    </header>
  );
};

export default Header;
