import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Button from '../Button/Button';
import FloatingFooter from '../FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../ResponsiveProgressSteps/ResponsiveProgressSteps';
import { useMediaUpload } from '../../../hooks/useMediaUpload';
import { useSubmissionOptions } from '../../../hooks/useSubmissionOptions';
import { 
  getMediaResourcesConfig,
  getFileTypeConfig,
  getFeatureFlags,
  getNavigationConfig,
  getAllowedLanguages,
  getQuickAddButtons
} from '../../../config/mediaResourcesDefaults';
import styles from './MediaResources.module.css';
import '../../../styles/utilities.css';

const MediaResources = ({ 
  questionType = 'coding',
  progressSteps = [],
  currentStep = 1,
  onPrevious,
  onSaveAndContinue,
  className = ''
}) => {
  const navigate = useNavigate();
  const config = getMediaResourcesConfig(questionType);
  const fileTypeConfig = getFileTypeConfig(questionType);
  const features = getFeatureFlags(questionType);
  const navigationConfig = getNavigationConfig(questionType);
  const allowedLanguages = getAllowedLanguages(questionType);
  const quickAddButtons = getQuickAddButtons(questionType);

  const {
    uploadedFiles,
    isDragOver,
    uploadProgress,
    errors: uploadErrors,
    handleFileUpload,
    removeFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    formatFileSize
  } = useMediaUpload(questionType);

  const {
    selectedOptions,
    submissionOptionsConfig,
    errors: optionErrors,
    isValid: optionsValid,
    toggleOption
  } = useSubmissionOptions(questionType);

  const isValid = optionsValid && Object.keys(uploadErrors).length === 0;

  const handleSaveAndContinue = () => {
    if (onSaveAndContinue) {
      onSaveAndContinue({
        uploadedFiles,
        selectedOptions: features.submissionOptions ? selectedOptions : null
      });
    } else {
      // Default navigation
      if (typeof navigationConfig.nextRoute === 'function') {
        navigationConfig.nextRoute();
      } else {
        navigate(navigationConfig.nextRoute);
      }
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      // Default navigation
      if (typeof navigationConfig.previousRoute === 'function') {
        navigationConfig.previousRoute();
      } else {
        navigate(navigationConfig.previousRoute);
      }
    }
  };

  const handleQuickAdd = (buttonConfig) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = buttonConfig.type;
    input.multiple = true;
    input.onchange = (e) => {
      if (e.target.files.length > 0) {
        handleFileUpload(e.target.files);
      }
    };
    input.click();
  };

  const renderMediaUploadSection = () => (
    <Card variant="elevated" padding="lg" className={styles.uploadCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.sectionTitle}>
          <i className="fas fa-cloud-upload-alt"></i>
          Media Files
        </h2>
        <p className={styles.sectionDescription}>
          Upload supporting media files for your question. Supported formats: {fileTypeConfig.supported.join(', ')}
          {fileTypeConfig.maxSizeMB && (
            <span className={styles.sizeLimit}> (Max {fileTypeConfig.maxSizeMB}MB per file)</span>
          )}
        </p>
      </div>

      {/* Drag & Drop Zone */}
      <div 
        className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.dropContent}>
          <i className="fas fa-cloud-upload-alt"></i>
          <h3>Drag and drop files here</h3>
          <p>or click to browse files</p>
          <Button 
            variant="secondary" 
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = fileTypeConfig.accept;
              input.multiple = true;
              input.onchange = (e) => {
                if (e.target.files.length > 0) {
                  handleFileUpload(e.target.files);
                }
              };
              input.click();
            }}
          >
            <i className="fas fa-folder-open"></i>
            Browse Files
          </Button>
        </div>
      </div>

      {/* Quick Add Buttons (fillInBlanks) */}
      {features.quickAddButtons && quickAddButtons.length > 0 && (
        <div className={styles.quickAddSection}>
          <h4 className={styles.quickAddTitle}>Quick Add</h4>
          <div className={styles.quickAddButtons}>
            {quickAddButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                className={styles.quickAddButton}
                onClick={() => handleQuickAdd(button)}
              >
                <span className={styles.quickAddIcon}>{button.icon}</span>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className={styles.uploadedFiles}>
          <h4 className={styles.filesTitle}>Uploaded Files ({uploadedFiles.length})</h4>
          <div className={styles.filesList}>
            {uploadedFiles.map((file) => (
              <div key={file.id} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIconContainer}>
                    {fileTypeConfig.iconStyle === 'emoji' ? (
                      <span className={styles.emojiIcon}>{file.icon}</span>
                    ) : (
                      <i className={`${file.icon} ${styles.fontAwesomeIcon}`}></i>
                    )}
                  </div>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>{file.formattedSize}</span>
                    {features.progressTracking && uploadProgress[file.id] !== undefined && (
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          ></div>
                        </div>
                        <span className={styles.progressText}>
                          {uploadProgress[file.id]}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className={styles.removeButton}
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Errors */}
      {Object.keys(uploadErrors).length > 0 && (
        <div className={styles.errorsList}>
          {Object.entries(uploadErrors).map(([fileName, errors]) => (
            <div key={fileName} className={styles.errorItem}>
              <i className="fas fa-exclamation-triangle"></i>
              <span><strong>{fileName}:</strong> {errors.join(', ')}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  const renderSubmissionOptionsSection = () => {
    if (!features.submissionOptions) return null;

    return (
      <Card variant="elevated" padding="lg" className={styles.submissionCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-clipboard-check"></i>
            Submission Options
          </h2>
          <p className={styles.sectionDescription}>
            Choose how candidates can submit their solutions. At least one option must be selected.
          </p>
        </div>

        <div className={styles.optionsList}>
          {submissionOptionsConfig.map((option) => (
            <div key={option.id} className={styles.submissionOption}>
              <label className={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={selectedOptions[option.id] || false}
                  onChange={() => toggleOption(option.id)}
                />
                <span className={styles.checkmark}></span>
                <div className={styles.optionContent}>
                  <div className={styles.optionHeader}>
                    <i className={option.icon}></i>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.badge && (
                      <span className={styles.optionBadge}>{option.badge}</span>
                    )}
                  </div>
                  <p className={styles.optionDescription}>{option.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>

        {Object.keys(optionErrors).length > 0 && (
          <div className={styles.errorMessage}>
            <i className="fas fa-exclamation-triangle"></i>
            {Object.values(optionErrors)[0]}
          </div>
        )}
      </Card>
    );
  };

  const renderAllowedLanguagesSection = () => {
    if (!features.allowedLanguages || allowedLanguages.length === 0) return null;

    return (
      <Card variant="elevated" padding="lg" className={styles.languagesCard}>
        <div className={styles.cardHeader}>
          <h2 className={styles.sectionTitle}>
            <i className="fas fa-code"></i>
            Allowed Languages
          </h2>
          <p className={styles.sectionDescription}>
            The following programming languages and technologies are enabled for this question
          </p>
        </div>

        <div className={styles.languagesList}>
          {allowedLanguages.map((language, index) => (
            <div key={index} className={styles.languageItem}>
              <i 
                className={language.icon} 
                style={{ color: language.color }}
              ></i>
              <div className={styles.languageInfo}>
                <span className={styles.languageName}>{language.name}</span>
                <span className={styles.languageDescription}>{language.description}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Header title={config.title} />
      
      {progressSteps.length > 0 && (
        <div className={styles.progressContainer}>
          <ResponsiveProgressSteps steps={progressSteps} currentStep={currentStep} />
        </div>
      )}

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.mainContent}>
          {renderMediaUploadSection()}
          {renderSubmissionOptionsSection()}
          {renderAllowedLanguagesSection()}
        </div>

        {/* Fixed Bottom Actions */}
        <FloatingFooter
          hasValidationAlert={features.submissionOptions}
          validationMessage="Please select at least one submission option to continue"
          showAlert={!isValid}
        >
          <Button
            variant="ghost"
            onClick={handlePrevious}
            className={styles.previousButton}
          >
            <i className="fas fa-arrow-left"></i>
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveAndContinue}
            disabled={features.submissionOptions && !isValid}
            className={styles.saveButton}
          >
            Save & Continue
            <i className="fas fa-arrow-right"></i>
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default MediaResources;