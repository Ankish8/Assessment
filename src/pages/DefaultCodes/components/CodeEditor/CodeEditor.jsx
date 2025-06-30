import React, { useRef, useEffect } from 'react';
import styles from './CodeEditor.module.css';

const LANGUAGE_DISPLAY_NAMES = {
  java: 'Java (1.8)',
  c: 'C (gcc 9.3.1)',
  cpp: 'C++ (gcc 9.3.1)',
  ruby: 'Ruby (2.0.0)',
  python: 'Python (2.7.5)',
  php: 'PHP (5.4)',
  javascript: 'JavaScript (Node.js v16.17.1)',
  python3: 'Python 3 (3.6.4)',
  scala: 'Scala (2.12.1)',
  vb: 'VB (4.6.1)',
  kotlin: 'Kotlin (1.5.31)'
};

export function CodeEditor({
  language,
  code,
  theme,
  savedBadgeVisible,
  onCodeChange,
  onThemeToggle,
  onCopy,
  onFormat,
  onReset
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.textContent !== code) {
      editorRef.current.textContent = code;
    }
  }, [code]);

  const handleInput = (e) => {
    onCodeChange(e.target.textContent);
  };

  const handleKeyDown = (e) => {
    // Handle tab key for proper indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const tabNode = document.createTextNode('    '); // 4 spaces
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      selection.removeAllRanges();
      selection.addRange(range);
      onCodeChange(e.target.textContent);
    }
  };

  const renderThemeIcon = () => {
    if (theme === 'light') {
      // Moon icon for light theme
      return (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M11 8C11 10.7614 8.76142 13 6 13C3.23858 13 1 10.7614 1 8C1 5.23858 3.23858 3 6 3C6.36812 3 6.72542 3.04633 7.06613 3.13384C6.42006 3.83808 6 4.78615 6 5.83333C6 7.95042 7.71625 9.66667 9.83333 9.66667C10.8805 9.66667 11.8286 9.24661 12.5328 8.60054C12.6203 8.94125 12.6667 9.29855 12.6667 9.66667C12.6667 10.5871 11.9205 11.3333 11 11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      // Sun icon for dark theme
      return (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 1V2M7 12V13M1 7H2M12 7H13M2.05 2.05L2.757 2.757M11.243 11.243L11.95 11.95M2.05 11.95L2.757 11.243M11.243 2.757L11.95 2.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
  };

  const displayName = LANGUAGE_DISPLAY_NAMES[language] || language;

  return (
    <div className={styles.codeEditorSection}>
      <div className={styles.editorHeader}>
        <div className={styles.editorTitle}>
          <span className={styles.languageLabel}>Language:</span>
          <span className={styles.currentLanguage}>{displayName}</span>
          {savedBadgeVisible && (
            <span className={styles.successBadge}>
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Saved
            </span>
          )}
        </div>
        <div className={styles.editorActions}>
          <button 
            className={`${styles.editorBtn} ${styles.iconOnly}`} 
            onClick={onThemeToggle}
            title={`Toggle theme (⌘T)`}
          >
            {renderThemeIcon()}
          </button>
          <div className={styles.divider}></div>
          <button 
            className={`${styles.editorBtn} ${styles.compact}`} 
            onClick={onCopy}
            title="Copy code (⌘C)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4.66667 4.66667V3.33333C4.66667 2.59695 5.26362 2 6 2H10.6667C11.403 2 12 2.59695 12 3.33333V8C12 8.73638 11.403 9.33333 10.6667 9.33333H9.33333M4.66667 4.66667H3.33333C2.59695 4.66667 2 5.26362 2 6V10.6667C2 11.403 2.59695 12 3.33333 12H8C8.73638 12 9.33333 11.403 9.33333 10.6667V9.33333M4.66667 4.66667H8C8.73638 4.66667 9.33333 5.26362 9.33333 6V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copy
          </button>
          <button 
            className={`${styles.editorBtn} ${styles.compact}`} 
            onClick={onFormat}
            title="Format code (⌘⇧F)"
          >
            Format
          </button>
          <button 
            className={`${styles.editorBtn} ${styles.compact}`} 
            onClick={onReset}
            title="Reset code"
          >
            Reset
          </button>
        </div>
      </div>
      <div 
        ref={editorRef}
        className={`${styles.codeEditor} ${theme === 'light' ? styles.lightTheme : ''}`}
        contentEditable="true" 
        spellCheck="false"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
      >
        {code}
      </div>
    </div>
  );
}

export default CodeEditor;