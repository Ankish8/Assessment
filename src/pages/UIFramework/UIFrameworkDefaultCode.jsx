import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import Tab from '../../components/common/Tab/Tab';
import { 
  UI_FRAMEWORK_PROGRESS_STEPS, 
  UI_FRAMEWORK_STEP_NUMBERS,
  getNextRoute,
  getPreviousRoute
} from '../../constants/uiFrameworkProgressSteps';
import styles from './UIFrameworkDefaultCode.module.css';
import '../../styles/utilities.css';

const DEFAULT_TEMPLATES = {
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
    <script src='script.js'></script>
</head>
<body>
    <p>Helloworld!</p>
</body>
</html>`,
  css: `/*
.class_name {
  color:red
}
*/`,
  javascript: `/*function myFunction(){
alert('Hi');
}*/`
};

const UIFrameworkDefaultCode = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('html');
  const [codeTemplates, setCodeTemplates] = useState(DEFAULT_TEMPLATES);

  const tabs = [
    { id: 'html', label: 'HTML Code', icon: 'fab fa-html5' },
    { id: 'css', label: 'CSS Code', icon: 'fab fa-css3-alt' },
    { id: 'javascript', label: 'JS Code', icon: 'fab fa-js-square' }
  ];

  const handleCodeChange = (value) => {
    setCodeTemplates(prev => ({
      ...prev,
      [activeTab]: value
    }));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeTemplates[activeTab]);
      // Simple feedback - you could add a toast here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleSaveAndContinue = () => {
    navigate(getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.DEFAULT_CODE));
  };

  const handlePrevious = () => {
    navigate(getPreviousRoute(UI_FRAMEWORK_STEP_NUMBERS.DEFAULT_CODE));
  };

  return (
    <div className={styles.container}>
      <Header title="UI Framework - Default Code" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={UI_FRAMEWORK_PROGRESS_STEPS} 
          currentStep={UI_FRAMEWORK_STEP_NUMBERS.DEFAULT_CODE} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              Add Default Code
              <span className={styles.optionalBadge}>(optional)</span>
            </h2>
            <p className={styles.sectionDescription}>
              Provide starter code templates for candidates. These will be pre-filled when they start coding.
            </p>
          </div>

          <div className={styles.codeSection}>
            <div className={styles.tabContainer}>
              <Tab
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                variant="pills"
              />
            </div>

            <div className={styles.editorCard}>
              <div className={styles.editorHeader}>
                <div className={styles.languageInfo}>
                  <i className={tabs.find(tab => tab.id === activeTab)?.icon}></i>
                  <span className={styles.languageLabel}>
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className={styles.copyButton}
                >
                  <i className="fas fa-copy"></i>
                  Copy
                </Button>
              </div>

              <div className={styles.editorContainer}>
                <textarea
                  value={codeTemplates[activeTab]}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className={styles.codeEditor}
                  placeholder={`Enter your ${activeTab.toUpperCase()} template code here...`}
                  spellCheck={false}
                />
              </div>

              <div className={styles.editorFooter}>
                <span className={styles.lineCount}>
                  {codeTemplates[activeTab].split('\n').length} lines
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <FloatingFooter>
        <Button
          variant="ghost"
          onClick={handlePrevious}
          className={styles.previousButton}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveAndContinue}
          className={styles.saveButton}
        >
          Save & Continue
        </Button>
      </FloatingFooter>
    </div>
  );
};

export default UIFrameworkDefaultCode;