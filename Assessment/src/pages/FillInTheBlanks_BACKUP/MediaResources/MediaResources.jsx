import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import FloatingFooter from '../../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS } from '../../../constants/fillInTheBlanksProgressSteps';
import styles from './MediaResources.module.css';
import '../../../styles/utilities.css';

const MediaResources = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submissionOptions, setSubmissionOptions] = useState({
    text: true, // Default enabled with AI Evaluation
    audio: false,
    urls: false,
    code: false,
    files: false,
    images: false
  });
  const [isValid, setIsValid] = useState(true); // At least one option must be selected

  const submissionOptionsList = [
    {
      id: 'text',
      label: 'Text',
      icon: 'fas fa-file-alt',
      description: 'Written text responses for fill-in-the-blanks',
      badge: 'AI Evaluation available',
      badgeType: 'success'
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: 'fas fa-microphone',
      description: 'Voice recordings for spoken answers',
      badge: null
    },
    {
      id: 'urls',
      label: 'URLs',
      icon: 'fas fa-link',
      description: 'Web links and external resources',
      badge: null
    },
    {
      id: 'code',
      label: 'Code',
      icon: 'fas fa-code',
      description: 'Code snippets for programming blanks',
      badge: null
    },
    {
      id: 'files',
      label: 'Files',
      icon: 'fas fa-folder',
      description: 'Document and file uploads',
      badge: null
    },
    {
      id: 'images',
      label: 'Images',
      icon: 'fas fa-image',
      description: 'Pictures and visual content',
      badge: null
    }
  ];

  useEffect(() => {
    const selectedCount = Object.values(submissionOptions).filter(Boolean).length;
    setIsValid(selectedCount > 0);
  }, [submissionOptions]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileUpload = (files) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const toggleSubmissionOption = (optionId) => {
    setSubmissionOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'fas fa-image';
    if (type.startsWith('video/')) return 'fas fa-video';
    if (type.startsWith('audio/')) return 'fas fa-music';
    if (type.includes('pdf')) return 'fas fa-file-pdf';
    return 'fas fa-file';
  };

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    console.log('Saving fill-in-the-blanks media resources data:', { uploadedFiles, submissionOptions });
    navigate('/fill-in-the-blanks/question-details');
  };

  const handlePrevious = () => {
    navigate('/fill-in-the-blanks');
  };

  const selectedOptionsCount = Object.values(submissionOptions).filter(Boolean).length;

  return (
    <div className={styles.container}>
      <Header title="Fill in the Blanks Question" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS} 
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        {/* Media Upload Section */}
        <Card variant="elevated" padding="lg" className={styles.uploadCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              Add Media (audio/video)
              <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Upload media files to enhance your fill-in-the-blanks question"></i>
            </h2>
            <p className={styles.sectionDescription}>
              Add supporting media to provide context for your fill-in-the-blanks question. Please upload videos in MP4 format for better compatibility.
            </p>
          </div>

          <div 
            className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.dropContent}>
              <div className={styles.dropIcon}>
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <div className={styles.dropText}>
                <strong>Drop files here</strong> or click to browse
              </div>
              <div className={styles.dropSubtext}>
                Supports: MP4, MP3, WAV, MOV (Max 50MB)
              </div>
              <input
                type="file"
                multiple
                accept="video/*,audio/*"
                onChange={handleFileInputChange}
                className={styles.fileInput}
              />
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className={styles.uploadedFiles}>
              <h4 className={styles.uploadedTitle}>Uploaded Files ({uploadedFiles.length})</h4>
              <div className={styles.filesList}>
                {uploadedFiles.map(file => (
                  <div key={file.id} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <i className={`${getFileIcon(file.type)} ${styles.fileIcon}`}></i>
                      <div className={styles.fileDetails}>
                        <span className={styles.fileName}>{file.name}</span>
                        <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeFile(file.id)}
                      title="Remove file"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.uploadActions}>
            <Button variant="primary" className={styles.uploadButton}>
              <i className="fas fa-upload"></i> Upload Media
            </Button>
            <Button variant="outline" className={styles.resourcesButton}>
              <i className="fas fa-plus"></i> Add Resources
            </Button>
          </div>
        </Card>

        {/* Submission Options Section */}
        <Card variant="elevated" padding="lg" className={styles.optionsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>Student can submit answers using:</h2>
            <div className={styles.selectionSummary}>
              <span className={styles.selectedCount}>
                {selectedOptionsCount} option{selectedOptionsCount !== 1 ? 's' : ''} selected
              </span>
              {!isValid && (
                <span className={styles.validationError}>
                  <i className="fas fa-exclamation-triangle"></i> Please select at least one option
                </span>
              )}
            </div>
          </div>

          <div className={styles.optionsGrid}>
            {submissionOptionsList.map(option => (
              <div
                key={option.id}
                className={`${styles.optionCard} ${submissionOptions[option.id] ? styles.selected : ''}`}
                onClick={() => toggleSubmissionOption(option.id)}
              >
                <div className={styles.optionHeader}>
                  <div className={styles.optionIcon}>
                    <i className={option.icon}></i>
                  </div>
                  <div className={styles.optionContent}>
                    <h4 className={styles.optionLabel}>{option.label}</h4>
                    <p className={styles.optionDescription}>{option.description}</p>
                  </div>
                  <div className={styles.optionToggle}>
                    <input
                      type="checkbox"
                      checked={submissionOptions[option.id]}
                      onChange={() => toggleSubmissionOption(option.id)}
                      className={styles.checkbox}
                    />
                  </div>
                </div>
                {option.badge && (
                  <div className={`${styles.optionBadge} ${styles[option.badgeType]}`}>
                    {option.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom Actions */}
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
            disabled={!isValid}
            className={styles.saveButton}
          >
            Save & Continue
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default MediaResources;