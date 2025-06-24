import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import BottomActions from '../../components/common/BottomActions';
import { ToggleCard } from './components/ToggleCard';
import { LanguageList } from './components/LanguageList';
import { CodeEditor } from './components/CodeEditor';
import { AdvancedOptions } from './components/AdvancedOptions';
import { PROGRESS_STEPS, STEP_NUMBERS } from '../../constants/progressSteps';
import styles from './DefaultCodes.module.css';

const DEFAULT_CODE_TEMPLATES = {
  java: `public class Solution {
    public static void main(String[] args) {
        // Your solution here
        
    }
}`,
  c: `#include <stdio.h>

int main() {
    // Your solution here
    
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your solution here
    
    return 0;
}`,
  python: `# Your solution here
`,
  python3: `# Your solution here
`,
  ruby: `# Your solution here
`,
  php: `<?php
// Your solution here
?>`,
  javascript: `// Your solution here
`,
  scala: `object Solution {
    def main(args: Array[String]) {
        // Your solution here
    }
}`,
  vb: `Module Solution
    Sub Main()
        ' Your solution here
    End Sub
End Module`,
  kotlin: `fun main() {
    // Your solution here
}`
};

export function DefaultCodes() {
  const navigate = useNavigate();
  const [defaultCodeEnabled, setDefaultCodeEnabled] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(new Set(['c']));
  const [currentLanguage, setCurrentLanguage] = useState('c');
  const [codeTemplates, setCodeTemplates] = useState(DEFAULT_CODE_TEMPLATES);
  const [editorTheme, setEditorTheme] = useState('dark');
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedBadgeVisible, setSavedBadgeVisible] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    loadSavedState();
  }, []);

  // Auto-save on changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveState();
      showSavedBadge();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [defaultCodeEnabled, selectedLanguages, currentLanguage, codeTemplates, showCodeBlock]);

  const loadSavedState = useCallback(() => {
    try {
      const saved = localStorage.getItem('defaultCodeState');
      if (saved) {
        const state = JSON.parse(saved);
        setDefaultCodeEnabled(state.defaultCodeEnabled || false);
        setSelectedLanguages(new Set(state.selectedLanguages || ['c']));
        setCurrentLanguage(state.currentLanguage || 'c');
        setCodeTemplates({ ...DEFAULT_CODE_TEMPLATES, ...state.codeTemplates });
        setShowCodeBlock(state.showCodeBlock || false);
      }

      const savedTheme = localStorage.getItem('editorTheme') || 'dark';
      setEditorTheme(savedTheme);
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, []);

  const saveState = useCallback(() => {
    try {
      const state = {
        defaultCodeEnabled,
        selectedLanguages: Array.from(selectedLanguages),
        currentLanguage,
        codeTemplates,
        showCodeBlock
      };
      localStorage.setItem('defaultCodeState', JSON.stringify(state));
      localStorage.setItem('editorTheme', editorTheme);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [defaultCodeEnabled, selectedLanguages, currentLanguage, codeTemplates, showCodeBlock, editorTheme]);

  const showSavedBadge = useCallback(() => {
    setSavedBadgeVisible(true);
    setTimeout(() => setSavedBadgeVisible(false), 2000);
  }, []);

  const handleToggleDefaultCode = useCallback((enabled) => {
    setDefaultCodeEnabled(enabled);
  }, []);

  const handleLanguageSelect = useCallback((language) => {
    const newSelectedLanguages = new Set(selectedLanguages);
    
    if (newSelectedLanguages.has(language)) {
      newSelectedLanguages.delete(language);
    } else {
      newSelectedLanguages.add(language);
    }
    
    setSelectedLanguages(newSelectedLanguages);
    
    // If selecting a new language, make it current
    if (newSelectedLanguages.has(language)) {
      setCurrentLanguage(language);
    }
  }, [selectedLanguages]);

  const handleCodeChange = useCallback((code) => {
    setCodeTemplates(prev => ({
      ...prev,
      [currentLanguage]: code
    }));
  }, [currentLanguage]);

  const handleThemeToggle = useCallback(() => {
    const newTheme = editorTheme === 'dark' ? 'light' : 'dark';
    setEditorTheme(newTheme);
  }, [editorTheme]);

  const handleCopyCode = useCallback(() => {
    const code = codeTemplates[currentLanguage];
    if (code) {
      navigator.clipboard.writeText(code);
    }
  }, [codeTemplates, currentLanguage]);

  const handleFormatCode = useCallback(() => {
    const code = codeTemplates[currentLanguage];
    if (code) {
      const formattedCode = code.trim();
      handleCodeChange(formattedCode);
      showSavedBadge();
    }
  }, [codeTemplates, currentLanguage, handleCodeChange, showSavedBadge]);

  const handleResetCode = useCallback(() => {
    const defaultCode = DEFAULT_CODE_TEMPLATES[currentLanguage];
    if (defaultCode) {
      handleCodeChange(defaultCode);
      showSavedBadge();
    }
  }, [currentLanguage, handleCodeChange, showSavedBadge]);

  const handleAdvancedOptionChange = useCallback((option, value) => {
    if (option === 'showCodeBlock') {
      setShowCodeBlock(value);
    }
  }, []);

  const handlePrevious = useCallback(() => {
    navigate('/test-cases');
  }, [navigate]);

  const handleSaveAndContinue = useCallback(() => {
    // Validate if default code is enabled
    if (defaultCodeEnabled) {
      if (selectedLanguages.size === 0) {
        alert('Please select at least one programming language.');
        return;
      }

      // Check if all selected languages have non-empty code
      for (const lang of selectedLanguages) {
        const code = codeTemplates[lang];
        if (!code || code.trim().length === 0) {
          alert(`Please provide starter code for ${lang.toUpperCase()} or deselect it.`);
          return;
        }
      }
    }

    setIsLoading(true);
    saveState();

    // Navigate after delay
    setTimeout(() => {
      navigate('/question-details');
    }, 500);
  }, [defaultCodeEnabled, selectedLanguages, codeTemplates, saveState, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + S: Save & Continue
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSaveAndContinue();
      }
      
      // Cmd/Ctrl + Left Arrow: Previous
      if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
      
      // Cmd/Ctrl + T: Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        handleThemeToggle();
      }
      
      // Cmd/Ctrl + Shift + F: Format code
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        handleFormatCode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveAndContinue, handlePrevious, handleThemeToggle, handleFormatCode]);

  return (
    <div className={styles.page}>
      <div className="container">
        <Header
          title="Default Codes"
          onBack={handlePrevious}
        />

        <ResponsiveProgressSteps steps={PROGRESS_STEPS} currentStep={STEP_NUMBERS.DEFAULT_CODES} />

        <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.sectionTitle}>
            Default Codes
            <div className={styles.infoIcon}>?</div>
          </h2>
          <p className={styles.sectionDescription}>
            Provide starter code templates for candidates in their preferred programming language.
          </p>
        </div>

        <div className={styles.contentBody}>
          <ToggleCard
            enabled={defaultCodeEnabled}
            onToggle={handleToggleDefaultCode}
          />

          {defaultCodeEnabled && (
            <div className={styles.languageSection}>
              <div className={styles.selectionHeader}>
                <h4>Select languages and provide starter code</h4>
                <p>Choose which languages candidates can use and provide appropriate starter code for each.</p>
              </div>

              <div className={styles.twoColumnLayout}>
                <LanguageList
                  selectedLanguages={selectedLanguages}
                  currentLanguage={currentLanguage}
                  onLanguageSelect={handleLanguageSelect}
                  onLanguageChange={setCurrentLanguage}
                />

                <CodeEditor
                  language={currentLanguage}
                  code={codeTemplates[currentLanguage]}
                  theme={editorTheme}
                  savedBadgeVisible={savedBadgeVisible}
                  onCodeChange={handleCodeChange}
                  onThemeToggle={handleThemeToggle}
                  onCopy={handleCopyCode}
                  onFormat={handleFormatCode}
                  onReset={handleResetCode}
                />
              </div>

              <AdvancedOptions
                showCodeBlock={showCodeBlock}
                onOptionChange={handleAdvancedOptionChange}
              />
            </div>
          )}
        </div>
        </div>
      </div>
      
      <BottomActions
        onPrevious={handlePrevious}
        onNext={handleSaveAndContinue}
        nextLabel={isLoading ? 'Saving...' : 'Save & Continue'}
        nextDisabled={isLoading}
      />
    </div>
  );
}

export default DefaultCodes;