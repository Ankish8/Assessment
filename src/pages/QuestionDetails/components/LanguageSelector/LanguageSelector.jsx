import React from 'react';
import styles from './LanguageSelector.module.css';

const languages = [
  { id: 'cpp', label: 'CPP' },
  { id: 'java', label: 'JAVA' },
  { id: 'python', label: 'PYTHON' },
  { id: 'javascript', label: 'JS' },
  { id: 'c', label: 'C' },
  { id: 'csharp', label: 'C#' },
  { id: 'go', label: 'GO' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby', label: 'RUBY' },
  { id: 'swift', label: 'SWIFT' },
  { id: 'kotlin', label: 'KOTLIN' },
  { id: 'scala', label: 'SCALA' }
];

const LanguageSelector = ({ selectedLanguages, onLanguageToggle, onSelectAll }) => {
  const allLanguages = languages.map(lang => lang.label);
  const allSelected = allLanguages.every(lang => selectedLanguages.includes(lang));

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectAll([]);
    } else {
      onSelectAll(allLanguages);
    }
  };

  return (
    <div className={styles.languagesContainer}>
      <div className={styles.languagesHeader}>
        <span className={styles.languagesHeaderText}>Select Languages</span>
        <button className={styles.selectAllBtn} onClick={handleSelectAll}>
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className={styles.languagesGrid}>
        {languages.map((language) => (
          <div key={language.id} className={styles.languageItem}>
            <input
              type="checkbox"
              id={`lang-${language.id}`}
              className={styles.languageCheckbox}
              checked={selectedLanguages.includes(language.label)}
              onChange={() => onLanguageToggle(language.label)}
            />
            <label htmlFor={`lang-${language.id}`} className={styles.languageLabel}>
              {language.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;