// src/pages/main-page/MainPage.jsx

import { useState } from 'react';
import Prologue from './components/prologue/Prologue';
import Closue from './components/closue/Closue';
import ClosueStatueSelect from './components/closue-statue-select/ClosueStatueSelect';

const MainPage = () => {

  const [currentPage, setCurrentPage] = useState('prologue'); // 'prologue', 'closure', 'select'

  const renderPage = () => {
    switch (currentPage) {
      case 'prologue':
        return <Prologue onComplete={() => setCurrentPage('closure')} />;
      case 'closure':
        return <Closue onComplete={() => setCurrentPage('select')} />;
      case 'select':
        return <ClosueStatueSelect />;
      default:
        return <Prologue onComplete={() => setCurrentPage('closure')} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {renderPage()}
    </div>
  );
};

export default MainPage;