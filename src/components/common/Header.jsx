// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/images/main_logo.png';
import MypageModal from './MypageModal';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-4 z-[9999]">
        <Link to="/?step=5" aria-label="Go to main">
          <img src={mainLogo} alt="Main Logo" className="h-10 w-auto" />
        </Link>

        {/* 마이페이지 모달 트리거 */}
        <img
          src="/images/mypagebutton.png"
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mypage-modal"
          className="fixed h-12 w-12 rounded-full bg-white top-[20px] right-[20px] z-[100] shadow-md hover:shadow-lg transition-shadow"
          title="마이페이지"
        />
      </header>

      {/* 마이페이지 모달 */}
      <MypageModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
