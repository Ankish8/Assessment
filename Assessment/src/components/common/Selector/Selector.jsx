import React from 'react';
import styles from './Selector.module.css';

const Selector = ({
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
}) => {
  const isMultiple = variant === 'multiple';
  const selected = isMultiple ? selectedValues : [selectedValue];

  const handleOptionClick = (optionValue) => {
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

  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  const selectorClasses = [
    styles.selector,
    styles[layout],
    styles[size],
    disabled && styles.disabled
  ].filter(Boolean).join(' ');

  const allSelected = isMultiple && options.length > 0 && 
    options.every(option => selected.includes(option.value));

  return (
    <div className={containerClasses} {...props}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      
      {showSelectAll && isMultiple && (
        <div className={styles.selectAllContainer}>
          <button
            type="button"
            className={styles.selectAllButton}
            onClick={handleSelectAll}
            disabled={disabled}
          >
            {allSelected ? `Deselect All` : selectAllLabel}
          </button>
        </div>
      )}
      
      <div className={selectorClasses}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.value);
          const optionClasses = [
            styles.option,
            isSelected && styles.selected,
            option.disabled && styles.optionDisabled
          ].filter(Boolean).join(' ');

          return (
            <div
              key={option.value || index}
              className={optionClasses}
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
                <div className={styles.checkbox}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              )}
              
              {option.icon && (
                <div className={styles.optionIcon}>
                  {option.icon}
                </div>
              )}
              
              <div className={styles.optionContent}>
                <div className={styles.optionLabel}>
                  {option.label || option.value}
                </div>
                {option.description && (
                  <div className={styles.optionDescription}>
                    {option.description}
                  </div>
                )}
              </div>
              
              {option.badge && (
                <div className={styles.optionBadge}>
                  {option.badge}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {helperText && (
        <div className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Selector;