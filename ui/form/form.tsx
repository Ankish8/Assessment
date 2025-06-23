import React from 'react';

export interface FormProps {
  /**
   * Form content
   */
  children?: React.ReactNode;
  
  /**
   * Form submission handler
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  
  /**
   * Form layout orientation
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal';
  
  /**
   * Gap between form elements
   * @default 'base'
   */
  gap?: 'sm' | 'base' | 'lg';
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export interface FormGroupProps {
  /**
   * Form group content
   */
  children?: React.ReactNode;
  
  /**
   * Number of columns for grid layout
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export interface FormSectionProps {
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Section subtitle/description
   */
  subtitle?: string;
  
  /**
   * Section content
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export interface FormActionsProps {
  /**
   * Action buttons content
   */
  children?: React.ReactNode;
  
  /**
   * Alignment of action buttons
   * @default 'right'
   */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function Form({ 
  children, 
  onSubmit,
  className = '',
  layout = 'vertical',
  gap = 'base',
  ...props 
}: FormProps & Omit<React.ComponentProps<'form'>, 'onSubmit'>) {
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Spacing
    spacing3: '12px',
    spacing4: '16px',
    spacing6: '24px',
  };

  const gapStyles = {
    sm: { gap: tokens.spacing3 },
    base: { gap: tokens.spacing4 },
    lg: { gap: tokens.spacing6 },
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    ...gapStyles[gap],
  };

  const formClassNames = [
    'form-component',
    `layout-${layout}`,
    `gap-${gap}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <form 
      className={formClassNames}
      style={formStyles}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </form>
  );
}

export function FormGroup({ 
  children,
  className = '',
  columns = 1,
  ...props 
}: FormGroupProps & React.ComponentProps<'div'>) {
  
  const tokens = {
    spacing4: '16px',
  };

  const baseStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: tokens.spacing4,
  };

  const columnStyles = {
    2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: tokens.spacing4,
    },
    3: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: tokens.spacing4,
    },
    4: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: tokens.spacing4,
    },
  };

  const groupStyles = columns > 1 ? columnStyles[columns as 2 | 3 | 4] : baseStyles;

  // Handle responsive styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .form-group.columns-2,
        .form-group.columns-3,
        .form-group.columns-4 {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const groupClassNames = [
    'form-group',
    columns > 1 && `columns-${columns}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClassNames} style={groupStyles} {...props}>
      {children}
    </div>
  );
}

export function FormSection({
  title,
  subtitle,
  children,
  className = '',
  ...props
}: FormSectionProps & React.ComponentProps<'div'>) {
  
  const tokens = {
    // Colors
    borderPrimary: '#ddd6e3',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    
    // Typography
    fontSizeLg: '18px',
    fontSizeSm: '14px',
    fontWeightSemibold: 600,
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing4: '16px',
  };

  const sectionStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: tokens.spacing4,
  };

  const headerStyles = {
    paddingBottom: tokens.spacing2,
    borderBottom: `1px solid ${tokens.borderPrimary}`,
  };

  const titleStyles = {
    fontSize: tokens.fontSizeLg,
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

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: tokens.spacing4,
  };

  const sectionClassNames = [
    'form-section',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClassNames} style={sectionStyles} {...props}>
      {(title || subtitle) && (
        <div className="section-header" style={headerStyles}>
          {title && <h3 className="section-title" style={titleStyles}>{title}</h3>}
          {subtitle && <p className="section-subtitle" style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}
      <div className="section-content" style={contentStyles}>
        {children}
      </div>
    </div>
  );
}

export function FormActions({
  children,
  align = 'right',
  className = '',
  ...props
}: FormActionsProps & React.ComponentProps<'div'>) {
  
  const tokens = {
    // Colors
    borderPrimary: '#ddd6e3',
    
    // Spacing
    spacing2: '8px',
    spacing3: '12px',
    spacing4: '16px',
  };

  const alignmentStyles = {
    left: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    right: { justifyContent: 'flex-end' },
    between: { justifyContent: 'space-between' },
  };

  const actionsStyles = {
    display: 'flex',
    gap: tokens.spacing3,
    paddingTop: tokens.spacing4,
    borderTop: `1px solid ${tokens.borderPrimary}`,
    marginTop: tokens.spacing2,
    ...alignmentStyles[align],
  };

  // Handle responsive styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .form-actions {
          flex-direction: column-reverse !important;
        }
        
        .form-actions.align-right,
        .form-actions.align-center,
        .form-actions.align-between {
          justify-content: stretch !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const actionsClassNames = [
    'form-actions',
    `align-${align}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={actionsClassNames} style={actionsStyles} {...props}>
      {children}
    </div>
  );
}

// Attach sub-components to main Form component
Form.Group = FormGroup;
Form.Section = FormSection;
Form.Actions = FormActions;