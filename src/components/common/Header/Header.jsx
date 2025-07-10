import React from 'react';
import styles from './Header.module.css';

// Hook to safely use navigate only when router context exists
const useSafeNavigate = () => {
  try {
    const { useNavigate } = require('react-router-dom');
    return useNavigate();
  } catch {
    return null;
  }
};

const Header = ({ title, onBack, showBackButton = true }) => {
  const navigate = useSafeNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigate) {
      navigate(-1);
    } else {
      // Fallback for when no router is available (like in Storybook)
      window.history.back();
    }
  };

  return (
    <div className={styles.header}>
      {showBackButton && (
        <button className={styles.backButton} onClick={handleBack} aria-label="Go back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default Header;