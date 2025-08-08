import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import Modal from '../../../components/common/Modal/Modal';
import { 
  BOT_INTERVIEW_STEPS, 
  BOT_INTERVIEW_STEP_NUMBERS
} from '../shared/constants';
import styles from './BotInterviewQuestionStatement.module.css';
import '../../../styles/utilities.css';

const BotInterviewQuestionStatement = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    navigate('/bot-interview/area-skills');
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
      <CompactHeader 
        title="Bot Interview"
        icon="fas fa-robot"
      />
      
      <CompactProgressSteps 
        steps={BOT_INTERVIEW_STEPS}
        currentStep={BOT_INTERVIEW_STEP_NUMBERS.QUESTION_STATEMENT}
      />

      <div className={`${styles.content} floating-footer-spacing`}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <div className={styles.titleWithTooltip}>
                <h2 className={styles.sectionTitle}>Add Question</h2>
                <div className={styles.tooltipContainer}>
                  <i className="fas fa-question-circle" title="This section provides a markdown editor to write the program statement. What does it mean? Markdown is a lightweight markup language with plain text formatting syntax. Good to know: The expand link opens an expanded view of the editor for a better view of the text while typing / editing."></i>
                </div>
              </div>
              <div className={styles.editorToggle}>
                <span className={styles.toggleLabel}>Advanced Editor</span>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
            <div className={styles.questionLabel}>
              <span>Question Statement</span>
              <span className={styles.exampleText}>(e.g. Software Developer Interview, Project Manager Interview)</span>
            </div>
          </div>

          <div className={styles.editorContainer}>
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
                placeholder="Write your bot interview question here..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={15}
              />
            </div>
          </div>
        </Card>

        <div className={styles.bottomActions}>
          {!isValid && questionText.length > 0 && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please add question content to continue
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveAndContinue}
              disabled={!isValid}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>

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
        </div>
      </Modal>
    </div>
  );
};

export default BotInterviewQuestionStatement;