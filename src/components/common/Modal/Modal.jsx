import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({
  isOpen = false,
  onClose,
  children,
  size = 'base',
  variant = 'default',
  title,
  subtitle,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  header,
  footer,
  className = '',
  overlayClassName = '',
  preventScroll = true,
  initialFocus,
  ...props
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement;
      
      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
      
      // Focus management
      if (initialFocus) {
        initialFocus.current?.focus();
      } else {
        modalRef.current?.focus();
      }
      
      // Escape key handler
      const handleEscapeKey = (event) => {
        if (closeOnEscapeKey && event.key === 'Escape') {
          onClose?.();
        }
      };
      
      document.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Restore body scroll
        if (preventScroll) {
          document.body.style.overflow = '';
        }
        
        // Restore focus
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, closeOnEscapeKey, onClose, preventScroll, initialFocus]);

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleCloseClick = () => {
    onClose?.();
  };

  const modalClasses = [
    styles.modal,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const overlayClasses = [
    styles.overlay,
    overlayClassName
  ].filter(Boolean).join(' ');

  if (!isOpen) return null;

  const modalContent = (
    <div className={overlayClasses} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={subtitle ? 'modal-subtitle' : undefined}
        tabIndex={-1}
        {...props}
      >
        {/* Header */}
        {(header || title || subtitle || showCloseButton) && (
          <div className={styles.header}>
            {header || (
              <>
                <div className={styles.headerContent}>
                  {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
                  {subtitle && <p id="modal-subtitle" className={styles.subtitle}>{subtitle}</p>}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={handleCloseClick}
                    aria-label="Close modal"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;