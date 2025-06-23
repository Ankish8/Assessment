import React from 'react';

export interface SelectorOption {
  /**
   * Unique value for the option
   */
  value: string | number;
  
  /**
   * Display label for the option
   */
  label?: string;
  
  /**
   * Optional description text
   */
  description?: string;
  
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  
  /**
   * Optional badge element
   */
  badge?: React.ReactNode;
  
  /**
   * Disable this specific option
   */
  disabled?: boolean;
}

export interface SelectorProps {
  /**
   * Array of options to choose from
   */
  options?: SelectorOption[];
  
  /**
   * Selected value for single selection
   */
  selectedValue?: string | number;
  
  /**
   * Selected values for multiple selection
   */
  selectedValues?: (string | number)[];
  
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (value: any) => void;
  
  /**
   * Selection mode
   * @default 'single'
   */
  variant?: 'single' | 'multiple';
  
  /**
   * Layout style
   * @default 'grid'
   */
  layout?: 'grid' | 'list' | 'inline';
  
  /**
   * Size variant
   * @default 'base'
   */
  size?: 'sm' | 'base' | 'lg';
  
  /**
   * Disable the entire selector
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Label for the selector
   */
  label?: string;
  
  /**
   * Helper text below the selector
   */
  helperText?: string;
  
  /**
   * Show select all button for multiple selection
   * @default false
   */
  showSelectAll?: boolean;
  
  /**
   * Callback for select all action
   */
  onSelectAll?: (values: (string | number)[]) => void;
  
  /**
   * Label for select all button
   * @default 'Select All'
   */
  selectAllLabel?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export function Selector({
  options = [],
  selectedValue,
  selectedValues = [],
  onSelectionChange,
  variant = 'single',
  layout = 'grid',
  size = 'base',
  disabled = false,
  className = '',
  label,
  helperText,
  showSelectAll = false,
  onSelectAll,
  selectAllLabel = 'Select All',
  ...props
}: SelectorProps & React.ComponentProps<'div'>) {
  
  // Design tokens converted to actual values (exact from original)
  const tokens = {
    // Colors
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#f8f6fa',
    backgroundTertiary: '#f0f0f0',
    backgroundDisabled: '#f5f5f5',
    borderPrimary: '#ddd6e3',
    borderSecondary: '#c4b8cd',
    borderHover: '#c4b8cd',
    primary50: '#f9f5fa',
    primary100: '#f0e6f2',
    primary200: '#d4a3dd',
    primary600: '#611F69',
    primary700: '#5a1f60',
    textPrimary: '#2a1f35',
    textSecondary: '#6b5671',
    textTertiary: '#8a7490',
    
    // Typography
    fontSizeXs: '12px',
    fontSizeSm: '14px',
    fontSizeBase: '16px',
    fontWeightMedium: 500,
    lineHeightTight: 1.25,
    lineHeightBase: 1.5,
    
    // Spacing
    spacing1: '4px',
    spacing2: '8px',
    spacing3: '12px',
    spacing4: '16px',
    spacing5: '20px',
    
    // Radius & shadows
    radiusSm: '4px',
    radiusMd: '8px',
    radiusFull: '50%',
    shadowFocus: '0 0 0 4px #ebd4ef',
    
    // Animation
    animationDurationFast: '150ms',
    animationDurationBase: '200ms',
    animationEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const isMultiple = variant === 'multiple';
  const selected = isMultiple ? selectedValues : [selectedValue];

  const handleOptionClick = (optionValue: string | number) => {
    if (disabled) return;

    if (isMultiple) {
      const newSelected = selected.includes(optionValue)
        ? selected.filter(v => v !== optionValue)
        : [...selected, optionValue];
      onSelectionChange?.(newSelected);
    } else {
      onSelectionChange?.(optionValue);
    }
  };

  const handleSelectAll = () => {
    if (disabled) return;
    
    const allValues = options.map(option => option.value);
    const allSelected = allValues.every(value => selected.includes(value));
    
    if (allSelected) {
      onSelectAll?.([]); 
    } else {
      onSelectAll?.(allValues);
    }
  };

  const allSelected = isMultiple && options.length > 0 && 
    options.every(option => selected.includes(option.value));

  // Styles
  const containerStyles: React.CSSProperties = {
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.textPrimary,
    marginBottom: tokens.spacing3,
    lineHeight: tokens.lineHeightTight,
  };

  const selectAllContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: tokens.spacing3,
  };

  const selectAllButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: tokens.primary600,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    cursor: 'pointer',
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    borderRadius: tokens.radiusSm,
    transition: `all ${tokens.animationDurationFast} ${tokens.animationEaseInOut}`,
  };

  const baseSelectorStyles: React.CSSProperties = {
    display: layout === 'inline' ? 'flex' : 'grid',
    gap: size === 'sm' ? tokens.spacing2 : size === 'lg' ? tokens.spacing4 : tokens.spacing3,
  };

  const layoutStyles = {
    grid: {
      gridTemplateColumns: size === 'sm' 
        ? 'repeat(auto-fit, minmax(100px, 1fr))'
        : size === 'lg' 
        ? 'repeat(auto-fit, minmax(140px, 1fr))'
        : 'repeat(auto-fit, minmax(120px, 1fr))',
    },
    list: {
      gridTemplateColumns: '1fr',
    },
    inline: {
      flexWrap: 'wrap' as const,
      gap: tokens.spacing2,
    },
  };

  const selectorStyles: React.CSSProperties = {
    ...baseSelectorStyles,
    ...layoutStyles[layout],
    ...(disabled && {
      opacity: 0.6,
      pointerEvents: 'none',
    }),
  };

  const baseOptionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: size === 'sm' ? tokens.spacing2 : size === 'lg' ? tokens.spacing4 : tokens.spacing3,
    padding: size === 'sm' 
      ? `${tokens.spacing2} ${tokens.spacing3}`
      : size === 'lg'
      ? `${tokens.spacing4} ${tokens.spacing5}`
      : `${tokens.spacing3} ${tokens.spacing4}`,
    border: `1px solid ${tokens.borderPrimary}`,
    borderRadius: tokens.radiusMd,
    backgroundColor: tokens.backgroundPrimary,
    cursor: 'pointer',
    transition: `all ${tokens.animationDurationBase} ${tokens.animationEaseInOut}`,
    outline: 'none',
    position: 'relative',
    ...(layout === 'inline' && {
      flex: '0 0 auto',
      minWidth: 'fit-content',
    }),
    ...(layout === 'list' && {
      justifyContent: 'flex-start',
    }),
  };

  const checkboxStyles: React.CSSProperties = {
    flexShrink: 0,
    width: '16px',
    height: '16px',
    border: `1px solid ${tokens.borderSecondary}`,
    borderRadius: tokens.radiusSm,
    backgroundColor: tokens.backgroundPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${tokens.animationDurationFast} ${tokens.animationEaseInOut}`,
  };

  const optionIconStyles: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.textTertiary,
  };

  const optionContentStyles: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const optionLabelStyles: React.CSSProperties = {
    fontSize: size === 'sm' ? tokens.fontSizeXs : size === 'lg' ? tokens.fontSizeBase : tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.textPrimary,
    lineHeight: tokens.lineHeightTight,
  };

  const optionDescriptionStyles: React.CSSProperties = {
    fontSize: tokens.fontSizeXs,
    color: tokens.textSecondary,
    marginTop: tokens.spacing1,
    lineHeight: tokens.lineHeightBase,
  };

  const optionBadgeStyles: React.CSSProperties = {
    flexShrink: 0,
    padding: `${tokens.spacing1} ${tokens.spacing2}`,
    backgroundColor: tokens.backgroundTertiary,
    color: tokens.textSecondary,
    borderRadius: tokens.radiusFull,
    fontSize: tokens.fontSizeXs,
    fontWeight: tokens.fontWeightMedium,
  };

  const helperTextStyles: React.CSSProperties = {
    marginTop: tokens.spacing2,
    fontSize: tokens.fontSizeXs,
    color: tokens.textSecondary,
    lineHeight: tokens.lineHeightTight,
  };

  // Handle hover and focus effects with CSS-in-JS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .selector-all-button:hover:not(:disabled) {
        background-color: ${tokens.primary50} !important;
        color: ${tokens.primary700} !important;
      }
      
      .selector-all-button:disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
      }
      
      .selector-option:hover:not(.option-disabled) {
        border-color: ${tokens.borderHover} !important;
        background-color: ${tokens.backgroundSecondary} !important;
      }
      
      .selector-option:focus {
        border-color: ${tokens.primary600} !important;
        box-shadow: ${tokens.shadowFocus} !important;
      }
      
      .selector-option.selected {
        border-color: ${tokens.primary600} !important;
        background-color: ${tokens.primary50} !important;
        color: ${tokens.primary700} !important;
      }
      
      .selector-option.selected:hover {
        background-color: ${tokens.primary100} !important;
      }
      
      .selector-option.option-disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
        background-color: ${tokens.backgroundDisabled} !important;
      }
      
      .selector-option.selected .option-checkbox {
        background-color: ${tokens.primary600} !important;
        border-color: ${tokens.primary600} !important;
        color: white !important;
      }
      
      .selector-option:hover:not(.option-disabled) .option-checkbox {
        border-color: ${tokens.borderHover} !important;
      }
      
      .selector-option.selected .option-icon {
        color: ${tokens.primary600} !important;
      }
      
      .selector-option.selected .option-label {
        color: ${tokens.primary700} !important;
      }
      
      .selector-option.selected .option-description {
        color: ${tokens.primary600} !important;
      }
      
      .selector-option.selected .option-badge {
        background-color: ${tokens.primary200} !important;
        color: ${tokens.primary700} !important;
      }
      
      @media (max-width: 640px) {
        .selector-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        
        .selector-grid.size-sm {
          grid-template-columns: 1fr !important;
        }
        
        .selector-inline {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const containerClassNames = [
    'selector-container',
    className
  ].filter(Boolean).join(' ');

  const selectorClassNames = [
    'selector-wrapper',
    `selector-${layout}`,
    `size-${size}`,
    disabled && 'disabled'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassNames} style={containerStyles} {...props}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      
      {showSelectAll && isMultiple && (
        <div style={selectAllContainerStyles}>
          <button
            type="button"
            className="selector-all-button"
            style={selectAllButtonStyles}
            onClick={handleSelectAll}
            disabled={disabled}
          >
            {allSelected ? `Deselect All` : selectAllLabel}
          </button>
        </div>
      )}
      
      <div className={selectorClassNames} style={selectorStyles}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.value);
          const optionClasses = [
            'selector-option',
            isSelected && 'selected',
            option.disabled && 'option-disabled'
          ].filter(Boolean).join(' ');

          const currentOptionStyles = {
            ...baseOptionStyles,
            ...(option.disabled && {
              opacity: 0.5,
              cursor: 'not-allowed',
              backgroundColor: tokens.backgroundDisabled,
            }),
          };

          return (
            <div
              key={option.value || index}
              className={optionClasses}
              style={currentOptionStyles}
              onClick={() => handleOptionClick(option.value)}
              role={isMultiple ? "checkbox" : "radio"}
              aria-checked={isSelected}
              aria-disabled={disabled || option.disabled}
              tabIndex={disabled || option.disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(option.value);
                }
              }}
            >
              {isMultiple && (
                <div className="option-checkbox" style={checkboxStyles}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              )}
              
              {option.icon && (
                <div className="option-icon" style={optionIconStyles}>
                  {option.icon}
                </div>
              )}
              
              <div style={optionContentStyles}>
                <div className="option-label" style={optionLabelStyles}>
                  {option.label || option.value}
                </div>
                {option.description && (
                  <div className="option-description" style={optionDescriptionStyles}>
                    {option.description}
                  </div>
                )}
              </div>
              
              {option.badge && (
                <div className="option-badge" style={optionBadgeStyles}>
                  {option.badge}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {helperText && (
        <div style={helperTextStyles}>
          {helperText}
        </div>
      )}
    </div>
  );
}