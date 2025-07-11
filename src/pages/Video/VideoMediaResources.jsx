import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './VideoMediaResources.module.css';

const VideoMediaResources = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({
    videoUpload: true,
    screenRecording: false,
    webcamOnly: false
  });
  const [maxFileSize, setMaxFileSize] = useState('50');
  const [allowedFormats, setAllowedFormats] = useState(['mp4', 'mov', 'avi']);

  const handleSaveAndContinue = () => {
    // Navigate to next step - Question Details
    navigate('/video/question-details');
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleFormatToggle = (format) => {
    setAllowedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
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
              <i className="fas fa-video"></i>
              <span>Video Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
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
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Management Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Professional Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <span>4</span>
            </div>
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
            <h2 className={styles.sectionTitle}>Video Recording Configuration</h2>
            <p className={styles.sectionDescription}>
              Configure how candidates will record their video presentations
            </p>
          </div>

          {/* Recording Options */}
          <div className={styles.section}>
            <h3 className={styles.subsectionTitle}>Recording Options</h3>
            
            <div className={styles.optionsList}>
              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <input
                    type="checkbox"
                    id="videoUpload"
                    checked={selectedOptions.videoUpload}
                    onChange={() => handleOptionChange('videoUpload')}
                    className={styles.optionCheckbox}
                  />
                  <label htmlFor="videoUpload" className={styles.optionLabel}>
                    <i className="fas fa-upload"></i>
                    Video Upload
                  </label>
                </div>
                <p className={styles.optionDescription}>
                  Allow candidates to upload pre-recorded video files
                </p>
              </div>

              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <input
                    type="checkbox"
                    id="screenRecording"
                    checked={selectedOptions.screenRecording}
                    onChange={() => handleOptionChange('screenRecording')}
                    className={styles.optionCheckbox}
                  />
                  <label htmlFor="screenRecording" className={styles.optionLabel}>
                    <i className="fas fa-desktop"></i>
                    Screen Recording
                  </label>
                </div>
                <p className={styles.optionDescription}>
                  Enable screen recording for presentation slides
                </p>
              </div>

              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <input
                    type="checkbox"
                    id="webcamOnly"
                    checked={selectedOptions.webcamOnly}
                    onChange={() => handleOptionChange('webcamOnly')}
                    className={styles.optionCheckbox}
                  />
                  <label htmlFor="webcamOnly" className={styles.optionLabel}>
                    <i className="fas fa-video"></i>
                    Webcam Only
                  </label>
                </div>
                <p className={styles.optionDescription}>
                  Restrict to webcam recording only (no screen sharing)
                </p>
              </div>
            </div>
          </div>

          {/* File Settings */}
          <div className={styles.section}>
            <h3 className={styles.subsectionTitle}>File Settings</h3>
            
            <div className={styles.settingsGrid}>
              <div className={styles.settingGroup}>
                <label htmlFor="maxFileSize" className={styles.settingLabel}>
                  Maximum File Size (MB)
                </label>
                <select
                  id="maxFileSize"
                  value={maxFileSize}
                  onChange={(e) => setMaxFileSize(e.target.value)}
                  className={styles.settingSelect}
                >
                  <option value="25">25 MB</option>
                  <option value="50">50 MB</option>
                  <option value="100">100 MB</option>
                  <option value="200">200 MB</option>
                </select>
              </div>
            </div>
          </div>

          {/* Allowed Formats */}
          <div className={styles.section}>
            <h3 className={styles.subsectionTitle}>Allowed Video Formats</h3>
            
            <div className={styles.formatsList}>
              {['mp4', 'mov', 'avi', 'webm', 'mkv'].map(format => (
                <label key={format} className={styles.formatOption}>
                  <input
                    type="checkbox"
                    checked={allowedFormats.includes(format)}
                    onChange={() => handleFormatToggle(format)}
                    className={styles.formatCheckbox}
                  />
                  <span className={styles.formatLabel}>
                    .{format.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
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
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMediaResources;