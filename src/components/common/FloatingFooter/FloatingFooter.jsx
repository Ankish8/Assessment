import React from 'react';
import PropTypes from 'prop-types';
import styles from './FloatingFooter.module.css';

const FloatingFooter = ({ 
  children, 
  className = '', 
  hasValidationAlert = false, 
  validationMessage = '', 
  showAlert = false 
}) => {
  return (
    <div className={`${styles.bottomSection} ${className}`}>
      <div className={styles.bottomContainer}>
        {hasValidationAlert && showAlert && validationMessage && (
          <div className={styles.validationAlert}>
            <i className="fas fa-exclamation-triangle"></i>
            {validationMessage}
          </div>
        )}
        
        <div className={styles.actionButtons}>
          {children}
        </div>
      </div>
    </div>
  );
};

FloatingFooter.propTypes = {
  /** Content to display in the footer (typically buttons) */
  children: PropTypes.node.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
  /** Whether to show validation alerts */
  hasValidationAlert: PropTypes.bool,
  /** Validation message to display */
  validationMessage: PropTypes.string,
  /** Whether to show the alert */
  showAlert: PropTypes.bool,
};

export default FloatingFooter;