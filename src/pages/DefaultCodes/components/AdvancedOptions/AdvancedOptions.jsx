import React, { useState } from 'react';
import styles from './AdvancedOptions.module.css';

export function AdvancedOptions({ showCodeBlock, onOptionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleShowCodeBlockChange = (e) => {
    onOptionChange('showCodeBlock', e.target.checked);
  };

  return (
    <div className={styles.advancedSection}>
      <div className={styles.advancedHeader} onClick={handleToggleOpen}>
        <h4>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            className={`${styles.arrowIcon} ${isOpen ? styles.open : ''}`}
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Advanced Options
        </h4>
      </div>
      <div className={`${styles.advancedContent} ${isOpen ? styles.show : ''}`}>
        <div className={styles.optionItem}>
          <div className={styles.optionInfo}>
            <div className={styles.optionLabel}>Show specific code block only</div>
            <div className={styles.optionDescription}>
              Use &lt;showDefaultCode&gt; tags to show only editable sections to candidates
            </div>
            <div className={styles.codeExample}>
              Your code<br/>
              &lt;showDefaultCode&gt;<br/>
              &nbsp;&nbsp;// Editable section<br/>
              &lt;/showDefaultCode&gt;<br/>
              Your code
            </div>
          </div>
          <label className={styles.toggleSwitch}>
            <input 
              type="checkbox" 
              checked={showCodeBlock}
              onChange={handleShowCodeBlockChange}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdvancedOptions;