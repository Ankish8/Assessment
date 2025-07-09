import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { SPEAKING_PROGRESS_STEPS, SPEAKING_STEP_NUMBERS } from '../../constants/speakingProgressSteps';
import styles from './SpeakingMediaResources.module.css';
import '../../styles/utilities.css';

const SpeakingMediaResources = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [audioTimeLimit, setAudioTimeLimit] = useState('5'); // Default to 5 minutes (recommended)
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState('');
  const [customTimeUnit, setCustomTimeUnit] = useState('min');
  const [isValid, setIsValid] = useState(true);

  const timeOptions = {
    recommended: { value: '5', label: '5 min', description: 'Most common for speaking assessments' },
    quick: [
      { value: '1', label: '1 min', description: 'Quick response' },
      { value: '2', label: '2 min', description: 'Short answer' }
    ],
    standard: [
      { value: '5', label: '5 min', description: 'Standard response' }
    ],
    extended: [
      { value: '15', label: '15 min', description: 'Detailed explanation' },
      { value: '20', label: '20 min', description: 'Extended response' },
      { value: '30', label: '30 min', description: 'Full presentation' }
    ]
  };

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
    const audioVideoFiles = files.filter(file => 
      file.type.startsWith('audio/') || file.type.startsWith('video/')
    );
    
    const newFiles = audioVideoFiles.map(file => ({
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
    if (type.startsWith('video/')) return 'fas fa-video';
    if (type.startsWith('audio/')) return 'fas fa-volume-up';
    return 'fas fa-file';
  };

  const handleTimeSelection = (value) => {
    setAudioTimeLimit(value);
    setIsCustomTime(false);
  };

  const handleCustomTimeToggle = () => {
    setIsCustomTime(true);
    setAudioTimeLimit('custom');
  };

  const handleCustomTimeChange = (value) => {
    setCustomTimeValue(value);
    // Basic validation for custom time
    const numValue = parseInt(value);
    if (numValue > 0 && numValue <= 120) { // Max 2 hours
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const getEffectiveTimeLimit = () => {
    if (isCustomTime && customTimeValue) {
      return `${customTimeValue} ${customTimeUnit}`;
    }
    return timeOptions.recommended.label;
  };

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step - Question Details
    navigate('/speaking/question-details');
  };

  const handleUploadMedia = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*,video/*';
    input.multiple = true;
    input.onchange = handleFileInputChange;
    input.click();
  };

  const handleAddResources = () => {
    // Placeholder for add resources functionality
    console.log('Add Resources clicked');
  };

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
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Question Statement</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <i className="fas fa-check"></i>
            </div>
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
        {/* Media Upload Section */}
        <Card variant="elevated" padding="lg" className={styles.mediaCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              Add Media (audio/video)
              <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Upload media files to enhance your question"></i>
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
            <Button variant="primary" onClick={handleUploadMedia} className={styles.uploadButton}>
              <i className="fas fa-upload"></i> Upload Media
            </Button>
            <Button variant="outline" onClick={handleAddResources} className={styles.resourcesButton}>
              <i className="fas fa-plus"></i> Add Resources
            </Button>
          </div>
        </Card>

        {/* Candidate Options Section */}
        <Card variant="elevated" padding="lg" className={styles.candidateCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>Candidate can use:</h2>
          </div>

          <div className={styles.candidateOptions}>
            <div className={styles.audioOption}>
              <div className={styles.optionHeader}>
                <div className={styles.optionIcon}>
                  <i className="fas fa-microphone"></i>
                </div>
                <div className={styles.optionContent}>
                  <h4 className={styles.optionLabel}>Audio</h4>
                  <p className={styles.optionDescription}>Voice recordings for speaking assessment</p>
                </div>
              </div>
              
              <div className={styles.audioSettings}>
                <div className={styles.settingRow}>
                  <label className={styles.settingLabel}>Limit for the audio</label>
                  <div className={styles.timeSelection}>
                    <div className={styles.quickOptions}>
                      {[1, 2, 5, 15, 20, 30].map(time => (
                        <button
                          key={time}
                          className={`${styles.timeButton} ${audioTimeLimit === time.toString() && !isCustomTime ? styles.active : ''}`}
                          onClick={() => handleTimeSelection(time.toString())}
                          title={`${time} minute${time > 1 ? 's' : ''}`}
                        >
                          {time} min
                        </button>
                      ))}
                      <button
                        className={`${styles.timeButton} ${styles.customButton} ${isCustomTime ? styles.active : ''}`}
                        onClick={handleCustomTimeToggle}
                        title="Set a custom time limit"
                      >
                        Custom
                      </button>
                    </div>
                    {isCustomTime && (
                      <div className={styles.customInput}>
                        <input
                          type="number"
                          placeholder="Time"
                          value={customTimeValue}
                          onChange={(e) => handleCustomTimeChange(e.target.value)}
                          min="1"
                          max="120"
                        />
                        <select
                          value={customTimeUnit}
                          onChange={(e) => setCustomTimeUnit(e.target.value)}
                        >
                          <option value="min">min</option>
                          <option value="sec">sec</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/speaking/question-statement')}
            >
              Previous
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
    </div>
  );
};

export default SpeakingMediaResources;