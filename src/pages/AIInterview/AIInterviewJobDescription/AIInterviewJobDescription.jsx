import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import CustomFooter from '../../../components/common/CustomFooter/CustomFooter';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import { AI_INTERVIEW_STEPS, AI_INTERVIEW_STEP_NUMBERS } from '../shared/constants';
import styles from './AIInterviewJobDescription.module.css';

const AIInterviewJobDescription = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [jobDescription, setJobDescription] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handlePrevious = () => {
    navigate('/ai-interview/job-profile');
  };

  const handleContinue = () => {
    setHasAttemptedSubmit(true);
    
    if (!isValid) {
      return;
    }
    
    navigate('/ai-interview/skills-questions');
  };

  const handleFileUpload = (file) => {
    if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleAIGenerate = () => {
    // AI generation logic would go here
    console.log('AI Generate clicked');
  };

  const isValid = jobDescription.trim().length > 0;

  return (
    <div className={styles.container}>
      <CompactHeader 
        title="AI Interview" 
        onBack={handlePrevious}
      />
      
      <div className={styles.progressContainer}>
        <CompactProgressSteps 
          steps={AI_INTERVIEW_STEPS} 
          currentStep={AI_INTERVIEW_STEP_NUMBERS.JOB_DESCRIPTION} 
        />
      </div>

      <div className={styles.content}>
        <Card variant="elevated" padding="lg" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitle}>
              <i className="fas fa-file-alt"></i>
              Job Description Details
            </h2>
            <p className={styles.sectionDescription}>
              AI bot will generate interview questions on the basis of job description
            </p>
          </div>

          <div className={styles.textareaContainer}>
            <div className={styles.textareaHeader}>
              <label className={styles.fieldLabel}>
                Job Description <span className={styles.required}>*</span>
              </label>
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleAIGenerate}
                className={styles.aiGenerateButton}
              >
                <i className="fas fa-magic"></i>
                AI Generate
              </Button>
            </div>

            <div 
              className={`${styles.textareaWrapper} ${isDragOver ? styles.dragOver : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description or drag & drop a .txt file here..."
                className={styles.textarea}
              />
              {isDragOver && (
                <div className={styles.dropOverlay}>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Drop your .txt file here</p>
                </div>
              )}
            </div>

            <div className={styles.bottomActions}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleUploadClick}
                className={styles.uploadButton}
              >
                <i className="fas fa-upload"></i>
                Upload File
              </Button>
            </div>
          </div>

          {hasAttemptedSubmit && !isValid && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-triangle"></i>
              Please provide job description
            </div>
          )}
        </Card>
      </div>

      <CustomFooter
        hasValidationAlert={hasAttemptedSubmit && !isValid}
        validationMessage="Please provide job description to continue"
        showAlert={hasAttemptedSubmit && !isValid}
      >
        <Button variant="secondary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button 
          variant="primary" 
          onClick={handleContinue}
          disabled={hasAttemptedSubmit && !isValid}
        >
          Save & Continue
        </Button>
      </CustomFooter>
    </div>
  );
};

export default AIInterviewJobDescription;