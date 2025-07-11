import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import styles from './VideoQuestionStatement.module.css';

const VideoQuestionStatement = () => {
  const navigate = useNavigate();
  const [videoContent, setVideoContent] = useState('');
  const [presentationTopic, setPresentationTopic] = useState('');
  const [timeLimit, setTimeLimit] = useState('3');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step - Media & Resources
    navigate('/video/media-resources');
  };

  useEffect(() => {
    setIsValid(
      videoContent.trim().length >= 10 && 
      presentationTopic.trim().length >= 3
    );
  }, [videoContent, presentationTopic]);

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
              <i className="fas fa-video"></i>
              <span>Video Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <span>2</span>
            </div>
            <span className={styles.stepLabel}>Management Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>3</div>
            <span className={styles.stepLabel}>Professional Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>4</div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>6</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Create Video Presentation Question</h2>
            </div>
            <div className={styles.infoText}>
              <i className="fas fa-info-circle"></i>
              <p>
                Create a video presentation question where candidates will record themselves 
                presenting on a given topic. This assesses communication skills, body language, 
                and presentation abilities.
              </p>
            </div>
          </div>

          {/* Presentation Topic Section */}
          <div className={styles.formSection}>
            <div className={styles.fieldGroup}>
              <label htmlFor="presentationTopic" className={styles.fieldLabel}>
                Presentation Topic *
              </label>
              <input
                id="presentationTopic"
                type="text"
                className={`${styles.topicInput} ${!isValid && presentationTopic.length > 0 ? styles.inputError : ''}`}
                placeholder="Enter the presentation topic (e.g., 'Present your ideal product strategy for our mobile app')"
                value={presentationTopic}
                onChange={(e) => setPresentationTopic(e.target.value)}
              />
              {!isValid && presentationTopic.length > 0 && presentationTopic.length < 3 && (
                <span className={styles.validationMessage}>
                  Topic must be at least 3 characters long
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="timeLimit" className={styles.fieldLabel}>
                Time Limit (minutes)
              </label>
              <select
                id="timeLimit"
                className={styles.timeSelect}
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              >
                <option value="1">1 minute</option>
                <option value="2">2 minutes</option>
                <option value="3">3 minutes</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
              </select>
            </div>
          </div>

          <div className={styles.editorContainer}>
            <div className={styles.editorLabel}>
              <label htmlFor="videoContent" className={styles.fieldLabel}>
                Detailed Instructions *
              </label>
              <p className={styles.fieldDescription}>
                Provide detailed instructions for the candidate on what should be covered in their video presentation.
              </p>
            </div>

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
                    {videoContent.length} characters
                  </span>
                  {!isValid && videoContent.length > 0 && videoContent.length < 10 && (
                    <span className={styles.validationMessage}>
                      Minimum 10 characters required for detailed instructions
                    </span>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handlePreview}
                  disabled={!videoContent.trim()}
                >
                  <i className="fas fa-eye"></i>
                  Preview
                </Button>
              </div>
              
              <textarea
                id="videoContent"
                className={`${styles.editor} ${!isValid && videoContent.length > 0 ? styles.editorError : ''}`}
                placeholder="Enter detailed instructions for the video presentation. Include what should be covered, structure suggestions, evaluation criteria, etc.

Example:
• Introduce yourself and your background
• Present your key points clearly with supporting evidence
• Demonstrate good body language and eye contact
• Conclude with a clear summary and call to action
• Use visual aids if appropriate"
                value={videoContent}
                onChange={(e) => setVideoContent(e.target.value)}
                rows={15}
              />
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValid && (videoContent.length > 0 || presentationTopic.length > 0) && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please complete all required fields with valid content
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              Back
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
        title="Video Presentation Question Preview"
        size="lg"
      >
        <div className={styles.previewContent}>
          <div className={styles.previewHeader}>
            <h3>Video Presentation Assessment</h3>
            <div className={styles.previewMeta}>
              <span className={styles.previewTime}>
                <i className="fas fa-clock"></i>
                Time Limit: {timeLimit} minute{timeLimit !== '1' ? 's' : ''}
              </span>
            </div>
          </div>
          
          <div className={styles.previewSection}>
            <h4>Topic:</h4>
            <p className={styles.previewTopic}>
              {presentationTopic || "No topic provided"}
            </p>
          </div>
          
          <div className={styles.previewSection}>
            <h4>Instructions:</h4>
            <div className={styles.previewText}>
              {videoContent || "No instructions provided"}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoQuestionStatement;