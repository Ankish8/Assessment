import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  /**
   * Modal visibility state
   * @default false
   */
  isOpen?: boolean;
  
  /**
   * Function called when modal should close
   */
  onClose?: () => void;
  
  /**
   * Modal content
   */
  children?: React.ReactNode;
  
  /**
   * Modal size
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full';
  
  /**
   * Modal variant
   * @default 'default'
   */
  variant?: 'default' | 'dialog' | 'alert' | 'confirmation';
  
  /**
   * Modal title
   */
  title?: string;
  
  /**
   * Modal subtitle
   */
  subtitle?: string;
  
  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Close modal when clicking overlay
   * @default true
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Close modal when pressing Escape key
   * @default true
   */
  closeOnEscapeKey?: boolean;
  
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Additional CSS class for modal
   */
  className?: string;
  
  /**
   * Additional CSS class for overlay
   */
  overlayClassName?: string;
  
  /**
   * Prevent body scroll when modal is open
   * @default true
   */
  preventScroll?: boolean;
  
  /**
   * Element to focus when modal opens
   */
  initialFocus?: React.RefObject<HTMLElement>;
}

export function Modal({
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
}: ModalProps & Omit<React.ComponentProps<'div'>, 'onClose'>) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    backgroundOverlay: 'rgba(16, 24, 40, 0.35)',
    backgroundPrimary: '#ffffff',
    borderPrimary: '#ddd6e3',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    textTertiary: '#8a7490',
    backgroundSecondary: '#f8f6fa',
    primary200: '#d4a3dd',
    error500: '#f04438',
    warning500: '#f79009',
    
    // Typography
    fontSizeXl: '20px',
    fontSizeLg: '18px',
    fontSizeSm: '14px',
    fontWeightSemibold: 600,
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing4: '16px',
    spacing6: '24px',
    spacing8: '32px',
    
    // Radius & shadows
    radiusBase: '6px',
    radiusLg: '12px',
    shadow2xl: '0 32px 40px -12px rgba(16, 24, 40, 0.25)',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDurationFast: '150ms',
    animationDurationBase: '200ms',
    animationEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
    animationEaseBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Z-index
    zModal: 1050,
  };

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
      const handleEscapeKey = (event: KeyboardEvent) => {
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
        if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
          (previousActiveElement.current as HTMLElement).focus();
        }
      };
    }
  }, [isOpen, closeOnEscapeKey, onClose, preventScroll, initialFocus]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleCloseClick = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  const overlayStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.backgroundOverlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing4,
    zIndex: tokens.zModal,
    animation: `overlayIn ${tokens.animationDurationBase} ${tokens.animationEaseOut}`,
  };

  const sizeStyles = {
    sm: {
      width: '100%',
      maxWidth: '400px',
    },
    base: {
      width: '100%',
      maxWidth: '500px',
    },
    lg: {
      width: '100%',
      maxWidth: '700px',
    },
    xl: {
      width: '100%',
      maxWidth: '900px',
    },
    full: {
      width: `calc(100vw - ${tokens.spacing8})`,
      height: `calc(100vh - ${tokens.spacing8})`,
      maxWidth: 'none',
      maxHeight: 'none',
    },
  };

  const variantStyles = {
    default: {},
    dialog: {
      border: `2px solid ${tokens.primary200}`,
    },
    alert: {
      borderLeft: `4px solid ${tokens.error500}`,
    },
    confirmation: {
      borderLeft: `4px solid ${tokens.warning500}`,
    },
  };

  const modalStyles = {
    backgroundColor: tokens.backgroundPrimary,
    borderRadius: tokens.radiusLg,
    boxShadow: tokens.shadow2xl,
    display: 'flex',
    flexDirection: 'column' as const,
    maxHeight: `calc(100vh - ${tokens.spacing8})`,
    overflow: 'hidden' as const,
    animation: `modalIn ${tokens.animationDurationBase} ${tokens.animationEaseBounce}`,
    outline: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacing4,
    padding: tokens.spacing6,
    borderBottom: `1px solid ${tokens.borderPrimary}`,
    flexShrink: 0,
  };

  const headerContentStyles = {
    flex: 1,
    minWidth: 0,
  };

  const titleStyles = {
    fontSize: tokens.fontSizeXl,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.textPrimary,
    margin: `0 0 ${tokens.spacing1} 0`,
    lineHeight: tokens.lineHeightTight,
  };

  const subtitleStyles = {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
    margin: 0,
    lineHeight: tokens.lineHeightBase,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    padding: tokens.spacing2,
    borderRadius: tokens.radiusBase,
    color: tokens.textTertiary,
    cursor: 'pointer',
    transition: `all ${tokens.animationDurationFast} ${tokens.animationEaseInOut}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const contentStyles = {
    flex: 1,
    padding: tokens.spacing6,
    overflowY: 'auto' as const,
    minHeight: 0,
  };

  const footerStyles = {
    borderTop: `1px solid ${tokens.borderPrimary}`,
    padding: tokens.spacing6,
    flexShrink: 0,
  };

  // Add keyframes and responsive styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes overlayIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes modalIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-10px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .modal-close-button:hover {
        background-color: ${tokens.backgroundSecondary} !important;
        color: ${tokens.textSecondary} !important;
      }
      
      .modal-close-button:focus {
        outline: none !important;
        box-shadow: ${tokens.shadowFocus} !important;
      }
      
      /* Responsive adjustments */
      @media (max-width: 640px) {
        .modal-overlay {
          padding: ${tokens.spacing2} !important;
        }
        
        .modal-full {
          width: 100vw !important;
          height: 100vh !important;
          border-radius: 0 !important;
        }
        
        .modal-xl,
        .modal-lg,
        .modal-base {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
        }
        
        .modal-header,
        .modal-content,
        .modal-footer {
          padding: ${tokens.spacing4} !important;
        }
        
        .modal-title {
          font-size: ${tokens.fontSizeLg} !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const modalClassNames = [
    'modal-component',
    `modal-${size}`,
    className
  ].filter(Boolean).join(' ');

  const overlayClassNames = [
    'modal-overlay',
    overlayClassName
  ].filter(Boolean).join(' ');

  const modalContent = (
    <div className={overlayClassNames} style={overlayStyles} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={modalClassNames}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={subtitle ? 'modal-subtitle' : undefined}
        tabIndex={-1}
        style={modalStyles}
        {...props}
      >
        {/* Header */}
        {(header || title || subtitle || showCloseButton) && (
          <div className="modal-header" style={headerStyles}>
            {header || (
              <>
                <div style={headerContentStyles}>
                  {title && <h2 id="modal-title" className="modal-title" style={titleStyles}>{title}</h2>}
                  {subtitle && <p id="modal-subtitle" style={subtitleStyles}>{subtitle}</p>}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    className="modal-close-button"
                    style={closeButtonStyles}
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
        <div className="modal-content" style={contentStyles}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="modal-footer" style={footerStyles}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Check if we're in a browser environment with document.body
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalContent, document.body);
  }
  
  // Fallback for environments without document.body (like Bit dev server)
  return modalContent;
}