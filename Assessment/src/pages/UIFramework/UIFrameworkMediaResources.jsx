import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { 
  UI_FRAMEWORK_PROGRESS_STEPS, 
  UI_FRAMEWORK_STEP_NUMBERS,
  getNextRoute,
  getPreviousRoute
} from '../../constants/uiFrameworkProgressSteps';
import styles from '../MediaResources/MediaResources.module.css';
import '../../styles/utilities.css';

const UIFrameworkMediaResources = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

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
    navigate(getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES));
  };

  const handlePrevious = () => {
    navigate(getPreviousRoute(UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES));
  };


  return (
    <div className={styles.container}>
      <Header title="UI Framework - Media & Resources" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={UI_FRAMEWORK_PROGRESS_STEPS} 
          currentStep={UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        {/* Media Upload Section */}
        <Card variant="elevated" padding="lg" className={styles.uploadCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              Add Media (audio/video)
              <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Upload media files to enhance your UI framework question"></i>
            </h2>
            <p className={styles.sectionDescription}>
              Please upload the video in MP4 format for better compatibility.
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

        {/* Allowed Languages Section */}
        <Card variant="elevated" padding="lg" className={styles.languagesCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              Allowed Languages
              <i className={`fas fa-info-circle ${styles.infoIcon}`} title="These are the programming languages allowed for this UI framework question"></i>
            </h2>
            <p className={styles.sectionDescription}>
              Candidates can use any of these technologies to build their solution
            </p>
          </div>
          
          <div className={styles.languagesGrid}>
            <div className={styles.languageCard}>
              <div className={styles.languageIcon}>
                <i className="fab fa-html5"></i>
              </div>
              <div className={styles.languageContent}>
                <h4 className={styles.languageName}>HTML</h4>
                <p className={styles.languageDescription}>Structure & markup</p>
              </div>
              <div className={styles.languageStatus}>
                <span className={styles.enabledBadge}>Enabled</span>
              </div>
            </div>
            
            <div className={styles.languageCard}>
              <div className={styles.languageIcon}>
                <i className="fab fa-css3-alt"></i>
              </div>
              <div className={styles.languageContent}>
                <h4 className={styles.languageName}>CSS</h4>
                <p className={styles.languageDescription}>Styling & layout</p>
              </div>
              <div className={styles.languageStatus}>
                <span className={styles.enabledBadge}>Enabled</span>
              </div>
            </div>
            
            <div className={styles.languageCard}>
              <div className={styles.languageIcon}>
                <i className="fab fa-js-square"></i>
              </div>
              <div className={styles.languageContent}>
                <h4 className={styles.languageName}>JavaScript</h4>
                <p className={styles.languageDescription}>Interactivity & logic</p>
              </div>
              <div className={styles.languageStatus}>
                <span className={styles.enabledBadge}>Enabled</span>
              </div>
            </div>
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
            className={styles.saveButton}
          >
            Save & Continue
          </Button>
        </FloatingFooter>
      </div>
    </div>
  );
};

export default UIFrameworkMediaResources;