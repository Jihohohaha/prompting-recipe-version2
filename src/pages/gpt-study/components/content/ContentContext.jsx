import React, { createContext, useContext, useRef } from 'react';

const ContentContext = createContext(null);

export const ContentProvider = ({ children, contentRef: externalContentRef, isManualScrollRef: externalIsManualRef }) => {
  const internalContentRef = useRef(null);
  const internalIsManualRef = useRef(true);

  const contentRef = externalContentRef || internalContentRef;
  const isManualScrollRef = externalIsManualRef || internalIsManualRef;

  return (
    <ContentContext.Provider value={{ contentRef, isManualScrollRef }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentContext must be used within ContentProvider');
  return ctx;
};

export default ContentContext;
