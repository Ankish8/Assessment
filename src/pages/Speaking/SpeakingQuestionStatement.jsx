import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import { SPEAKING_PROGRESS_STEPS, SPEAKING_STEP_NUMBERS } from '../../constants/speakingProgressSteps';
import styles from './SpeakingQuestionStatement.module.css';
import '../../styles/utilities.css';

const SpeakingQuestionStatement = () => {
  const navigate = useNavigate();
  const [speakingContent, setSpeakingContent] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step - Media & Resources
    navigate('/speaking/media-resources');
  };

  useEffect(() => {
    setIsValid(speakingContent.trim().length >= 3);
  }, [speakingContent]);

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
      {/* Compact Header */}
      <div className={styles.compactHeader}>
        <div>
          <div className={styles.headerLeft}>
            <button 
              className={styles.backButton}
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className={styles.headerTitle}>
              <i className="fas fa-microphone"></i>
              <span>Speaking Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Question Statement</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>2</div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>3</div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>4</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Solution Details</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Add Speaking Prompt</h2>
            </div>
            <div className={styles.infoText}>
              <i className="fas fa-info-circle"></i>
              <p>
                Enter the text that candidates will read aloud for speaking assessment. 
                This content will be displayed to candidates during the assessment.
              </p>
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
                    {speakingContent.length} characters
                  </span>
                  {!isValid && speakingContent.length > 0 && (
                    <span className={styles.validationMessage}>
                      Minimum 3 characters required for speaking content
                    </span>
                  )}
                </div>
              </div>
              
              <textarea
                className={`${styles.editor} ${!isValid && speakingContent.length > 0 ? styles.editorError : ''}`}
                placeholder="Enter the text that candidates will read aloud for speaking assessment..."
                value={speakingContent}
                onChange={(e) => setSpeakingContent(e.target.value)}
                rows={15}
              />
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValid && speakingContent.length > 0 && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please enter speaking content to continue
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
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

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Speaking Content Preview"
        size="lg"
      >
        <div className={styles.previewContent}>
          <div className={styles.previewHeader}>
            <h3>Speaking Assessment Content</h3>
            <p>This is what candidates will see and read aloud:</p>
          </div>
          <div className={styles.previewText}>
            {speakingContent || "No speaking content to preview"}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SpeakingQuestionStatement;