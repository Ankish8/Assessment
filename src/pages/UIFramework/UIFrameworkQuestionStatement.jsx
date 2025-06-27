import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import Modal from '../../components/common/Modal/Modal';
import { 
  UI_FRAMEWORK_PROGRESS_STEPS, 
  UI_FRAMEWORK_STEP_NUMBERS,
  getNextRoute 
} from '../../constants/uiFrameworkProgressSteps';
import styles from '../SubmissionQuestions/SubmissionQuestions.module.css';
import '../../styles/utilities.css';

const UIFrameworkQuestionStatement = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [codeModificationEnabled, setCodeModificationEnabled] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step using getNextRoute helper
    const nextRoute = getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.QUESTION_STATEMENT);
    navigate(nextRoute);
  };

  useEffect(() => {
    setIsValid(questionText.trim().length >= 3);
  }, [questionText]);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const toolbarButtons = [
    { icon: '📎', label: 'Source', action: () => {} },
    { icon: '📄', label: 'Format', action: () => {} },
    { icon: '↶', label: 'Undo', action: () => {} },
    { icon: '↷', label: 'Redo', action: () => {} },
    { icon: '🔍', label: 'Find', action: () => {} },
    { icon: '⚙️', label: 'Options', action: () => {} }
  ];

  const formatButtons = [
    { icon: '𝐁', label: 'Bold', action: () => {} },
    { icon: '𝐼', label: 'Italic', action: () => {} },
    { icon: '𝐔', label: 'Underline', action: () => {} },
    { icon: '𝐒', label: 'Strikethrough', action: () => {} },
    { icon: '𝑥²', label: 'Superscript', action: () => {} },
    { icon: '𝑥₂', label: 'Subscript', action: () => {} }
  ];

  const insertButtons = [
    { icon: '•', label: 'Bullet List', action: () => {} },
    { icon: '1.', label: 'Numbered List', action: () => {} },
    { icon: '➤', label: 'Indent', action: () => {} },
    { icon: '⇥', label: 'Outdent', action: () => {} },
    { icon: '❝', label: 'Quote', action: () => {} },
    { icon: '≡', label: 'Align', action: () => {} },
    { icon: '🔗', label: 'Link', action: () => {} },
    { icon: '🖼️', label: 'Image', action: () => {} },
    { icon: '⊞', label: 'Table', action: () => {} },
    { icon: '━', label: 'Line', action: () => {} },
    { icon: '😊', label: 'Emoji', action: () => {} },
    { icon: '🧮', label: 'Math', action: () => {} },
    { icon: '𝔸', label: 'Text Style', action: () => {} },
    { icon: '🎨', label: 'Text Color', action: () => {} },
    { icon: '🎯', label: 'Highlight', action: () => {} }
  ];

  return (
    <div className={styles.container}>
      <Header title="UI Framework - Question Statement" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={UI_FRAMEWORK_PROGRESS_STEPS} 
          currentStep={UI_FRAMEWORK_STEP_NUMBERS.QUESTION_STATEMENT} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Add Question</h2>
              <div className={styles.editorToggle}>
                <span className={styles.toggleLabel}>Advanced Editor</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.editorContainer}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarSection}>
                {toolbarButtons.map((button, index) => (
                  <button
                    key={index}
                    className={styles.toolbarButton}
                    onClick={button.action}
                    title={button.label}
                  >
                    {button.icon}
                  </button>
                ))}
              </div>
              
              <div className={styles.toolbarDivider}></div>
              
              <div className={styles.toolbarSection}>
                {formatButtons.map((button, index) => (
                  <button
                    key={index}
                    className={styles.toolbarButton}
                    onClick={button.action}
                    title={button.label}
                  >
                    {button.icon}
                  </button>
                ))}
              </div>
              
              <div className={styles.toolbarDivider}></div>
              
              <div className={styles.toolbarSection}>
                {insertButtons.map((button, index) => (
                  <button
                    key={index}
                    className={styles.toolbarButton}
                    onClick={button.action}
                    title={button.label}
                  >
                    {button.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Editor */}
            <div className={styles.editorWrapper}>
              <div className={styles.editorHeader}>
                <div className={styles.editorInfo}>
                  <span className={styles.characterCount}>
                    {questionText.length} characters
                  </span>
                  {!isValid && questionText.length > 0 && (
                    <span className={styles.validationMessage}>
                      Minimum 3 characters required
                    </span>
                  )}
                </div>
              </div>
              
              <textarea
                className={`${styles.editor} ${!isValid && questionText.length > 0 ? styles.editorError : ''}`}
                placeholder="Write your UI framework question here..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={15}
              />
            </div>
          </div>

          {/* Code Modification Toggle */}
          <div className={styles.codeModificationSection}>
            <div className={styles.toggleContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={codeModificationEnabled}
                  onChange={(e) => setCodeModificationEnabled(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  Enable Code Modification and show Difference
                </span>
              </label>
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <FloatingFooter>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndContinue}
            disabled={!isValid}
            className={styles.saveButton}
          >
            Save & Continue
          </Button>
        </FloatingFooter>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Question Preview"
        size="lg"
      >
        <div className={styles.previewContent}>
          <div className={styles.previewText}>
            {questionText || "No question text to preview"}
          </div>
          {codeModificationEnabled && (
            <div className={styles.previewNote}>
              <strong>Code Modification:</strong> Enabled
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UIFrameworkQuestionStatement;