import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './CompactHeader.module.css';

const CompactHeader = ({ 
  title, 
  icon, 
  showBackButton = true, 
  onBack, 
  actions,
  className = '',
  ...props 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`${styles.compactHeader} ${className}`} {...props}>
      <div className={styles.container}>
        <div className={styles.headerLeft}>
          {showBackButton && (
            <button 
              className={styles.backButton}
              onClick={handleBack}
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <div className={styles.headerTitle}>
            {icon && <i className={icon}></i>}
            <span>{title}</span>
          </div>
        </div>
        {actions && (
          <div className={styles.headerActions}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

CompactHeader.propTypes = {
  /** Header title text */
  title: PropTypes.string.isRequired,
  /** Icon class name (FontAwesome) */
  icon: PropTypes.string,
  /** Whether to show back button */
  showBackButton: PropTypes.bool,
  /** Custom back button handler */
  onBack: PropTypes.func,
  /** Action buttons or elements */
  actions: PropTypes.node,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default CompactHeader;