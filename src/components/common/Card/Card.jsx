import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  variant = 'elevated',
  padding = 'base',
  radius = 'base',
  hoverable = false,
  clickable = false,
  selected = false,
  children,
  className = '',
  onClick,
  header,
  footer,
  title,
  subtitle,
  action,
  ...props 
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`radius-${radius}`],
    hoverable && styles.hoverable,
    clickable && styles.clickable,
    selected && styles.selected,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (onClick && (clickable || hoverable)) {
      onClick(e);
    }
  };

  const hasHeader = header || title || subtitle || action;

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      {...props}
    >
      {hasHeader && (
        <div className={styles.header}>
          {header || (
            <>
              <div className={styles.headerContent}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
              {action && <div className={styles.action}>{action}</div>}
            </>
          )}
        </div>
      )}
      
      <div className={styles.content}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;