import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import BottomActions from '../../components/common/BottomActions/BottomActions';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS, getNextRoute, getPreviousRoute } from '../../constants/fillInTheBlanksProgressSteps';
import styles from '../MediaResources/MediaResources.module.css';
import '../../styles/utilities.css';

const FillInTheBlanksMediaResources = () => {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (files) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      const fileObj = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        uploadStatus: 'uploading'
      };

      setAttachments(prev => [...prev, fileObj]);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [fileObj.id]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          setAttachments(prev => 
            prev.map(attachment => 
              attachment.id === fileObj.id 
                ? { ...attachment, uploadStatus: 'completed' }
                : attachment
            )
          );
        }
      }, 200);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '📹';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊';
    return '📎';
  };

  const handleSaveAndContinue = () => {
    console.log('Saving fill-in-the-blanks media resources:', { attachments, videos, images, documents });
    navigate(getNextRoute(FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES));
  };

  const handleBack = () => {
    navigate(getPreviousRoute(FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES));
  };

  return (
    <div className={styles.container}>
      <Header title="Fill In The Blanks - Media & Resources" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS}
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES}
          variant="horizontal"
        />
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className="sectionTitle">Media & Resources</h2>
            <p className="sectionDescription">
              Add images, videos, code snippets, or other resources to enhance your fill-in-the-blanks question. 
              These materials will help students better understand the context.
            </p>
          </div>

          {/* File Upload Section */}
          <div className={styles.uploadSection}>
            <div 
              className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className={styles.uploadIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M16 16L12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9H15.42A8 8 0 1 0 9 20.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.uploadText}>
                <h3>Upload Resources</h3>
                <p>Drag and drop files here, or click to browse</p>
                <p className={styles.supportedFormats}>
                  Supports: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF, DOC, PPT)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className={styles.fileInput}
              />
            </div>
          </div>

          {/* Attachments List */}
          {attachments.length > 0 && (
            <div className={styles.attachmentsSection}>
              <h3 className={styles.attachmentsTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21.44 11.05L12.25 20.54C11.18 21.71 9.47 21.71 8.4 20.54C7.33 19.37 7.33 17.66 8.4 16.49L15.95 8.54C16.66 7.73 17.84 7.73 18.55 8.54C19.26 9.35 19.26 10.53 18.55 11.34L12.12 18.07C11.81 18.38 11.29 18.38 10.98 18.07C10.67 17.76 10.67 17.24 10.98 16.93L16.81 10.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Uploaded Resources ({attachments.length})
              </h3>
              <div className={styles.attachmentsList}>
                {attachments.map(attachment => (
                  <div key={attachment.id} className={styles.attachmentItem}>
                    <div className={styles.fileInfo}>
                      <span className={styles.fileIcon}>{getFileIcon(attachment.type)}</span>
                      <div className={styles.fileDetails}>
                        <span className={styles.fileName}>{attachment.name}</span>
                        <span className={styles.fileSize}>{formatFileSize(attachment.size)}</span>
                      </div>
                    </div>
                    
                    {attachment.uploadStatus === 'uploading' && (
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${uploadProgress[attachment.id] || 0}%` }}
                        />
                      </div>
                    )}
                    
                    {attachment.uploadStatus === 'completed' && (
                      <div className={styles.fileActions}>
                        <button 
                          className={styles.removeButton}
                          onClick={() => removeAttachment(attachment.id)}
                          title="Remove file"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Quick Add Resources */}
        <Card variant="outlined" padding="md" className={styles.quickAddCard}>
          <h3 className={styles.quickAddTitle}>Quick Add Common Resources</h3>
          <div className={styles.quickAddGrid}>
            <button className={styles.quickAddButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Images
            </button>
            <button className={styles.quickAddButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Add Videos
            </button>
            <button className={styles.quickAddButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Documents
            </button>
            <button className={styles.quickAddButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Code Snippet
            </button>
          </div>
        </Card>
      </div>

      <BottomActions
        onNext={handleSaveAndContinue}
        onPrevious={handleBack}
        nextLabel="Save & Continue"
        previousLabel="Back to Question"
        showPrevious={true}
        shortcuts={true}
      />
    </div>
  );
};

export default FillInTheBlanksMediaResources;