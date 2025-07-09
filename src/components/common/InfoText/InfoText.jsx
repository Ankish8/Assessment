import React from 'react';
import PropTypes from 'prop-types';
import styles from './InfoText.module.css';

const InfoText = ({ 
  children, 
  icon = 'fas fa-info-circle',
  variant = 'default',
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return styles.info;
      case 'warning':
        return styles.warning;
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      default:
        return styles.default;
    }
  };

  return (
    <div 
      className={`${styles.infoText} ${getVariantStyles()} ${className}`} 
      {...props}
    >
      {icon && <i className={`${icon} ${styles.icon}`}></i>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

InfoText.propTypes = {
  /** Content to display */
  children: PropTypes.node.isRequired,
  /** FontAwesome icon class */
  icon: PropTypes.string,
  /** Visual variant */
  variant: PropTypes.oneOf(['default', 'info', 'warning', 'success', 'error']),
  /** Additional CSS class */
  className: PropTypes.string,
};

export default InfoText;