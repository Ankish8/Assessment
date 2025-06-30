import React from 'react';
import styles from './LanguageList.module.css';

const LANGUAGES = [
  { id: 'java', name: 'Java', version: '(1.8)' },
  { id: 'c', name: 'C', version: '(gcc 9.3.1)' },
  { id: 'cpp', name: 'C++', version: '(gcc 9.3.1)' },
  { id: 'ruby', name: 'Ruby', version: '(2.0.0)' },
  { id: 'python', name: 'Python', version: '(2.7.5)' },
  { id: 'php', name: 'PHP', version: '(5.4)' },
  { id: 'javascript', name: 'JavaScript', version: '(Node.js v16.17.1)' },
  { id: 'python3', name: 'Python 3', version: '(3.6.4)' },
  { id: 'scala', name: 'Scala', version: '(2.12.1)' },
  { id: 'vb', name: 'VB', version: '(4.6.1)' },
  { id: 'kotlin', name: 'Kotlin', version: '(1.5.31)' }
];

export function LanguageList({ 
  selectedLanguages, 
  currentLanguage, 
  onLanguageSelect, 
  onLanguageChange 
}) {
  const handleLanguageClick = (languageId) => {
    onLanguageSelect(languageId);
    
    // If this language is now selected, make it current
    if (!selectedLanguages.has(languageId)) {
      // Language was just selected, make it current
      onLanguageChange(languageId);
    } else if (selectedLanguages.has(languageId) && currentLanguage === languageId) {
      // If deselecting the current language, switch to another selected language
      const remainingLanguages = Array.from(selectedLanguages).filter(id => id !== languageId);
      if (remainingLanguages.length > 0) {
        onLanguageChange(remainingLanguages[0]);
      }
    }
  };

  const handleLanguageSelect = (languageId) => {
    // Just change the current language without selecting/deselecting
    if (selectedLanguages.has(languageId)) {
      onLanguageChange(languageId);
    }
  };

  return (
    <div className={styles.languageList}>
      {LANGUAGES.map((language) => {
        const isSelected = selectedLanguages.has(language.id);
        const isCurrent = currentLanguage === language.id;
        
        return (
          <div
            key={language.id}
            className={`${styles.languageItem} ${isSelected ? styles.selected : ''} ${isCurrent ? styles.current : ''}`}
            onClick={() => handleLanguageClick(language.id)}
            onDoubleClick={() => handleLanguageSelect(language.id)}
          >
            <div className={styles.languageCheckbox}>
              {isSelected && <span className={styles.checkmark}>✓</span>}
            </div>
            <div className={styles.languageInfo}>
              <div className={styles.languageName}>{language.name}</div>
              <div className={styles.languageVersion}>{language.version}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LanguageList;