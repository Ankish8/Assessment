import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomFooter.module.css';

const CustomFooter = ({ 
  children, 
  showValidationAlert = false,
  validationMessage = '',
  className = '',
  ...props 
}) => {
  return (
    <div className={`${styles.customFooter} ${className}`} {...props}>
      {showValidationAlert && validationMessage && (
        <div className={styles.validationAlert}>
          <i className="fas fa-exclamation-triangle"></i>
          {validationMessage}
        </div>
      )}
      
      <div className={styles.actionButtons}>
        {children}
      </div>
    </div>
  );
};

CustomFooter.propTypes = {
  /** Action buttons or elements */
  children: PropTypes.node.isRequired,
  /** Whether to show validation alert */
  showValidationAlert: PropTypes.bool,
  /** Validation message to display */
  validationMessage: PropTypes.string,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default CustomFooter;