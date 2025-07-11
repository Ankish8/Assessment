import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Selector from '../../components/common/Selector/Selector';
import styles from './VideoQuestionDetails.module.css';

const VideoQuestionDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marks: '',
    difficulty: '',
    skills: [],
    questionProvider: '',
    questionAuthor: ''
  });

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Basic presentation skills' },
    { value: 'medium', label: 'Intermediate', description: 'Moderate presentation complexity' },
    { value: 'hard', label: 'Hard', description: 'Advanced presentation skills' }
  ];

  const skillOptions = [
    { value: 'presentation', label: 'Presentation Skills' },
    { value: 'communication', label: 'Communication' },
    { value: 'body-language', label: 'Body Language' },
    { value: 'confidence', label: 'Confidence' },
    { value: 'clarity', label: 'Clarity of Speech' },
    { value: 'engagement', label: 'Audience Engagement' },
    { value: 'storytelling', label: 'Storytelling' },
    { value: 'time-management', label: 'Time Management' }
  ];

  const handleSaveAndContinue = () => {
    // Navigate to next step - Evaluation Parameters
    navigate('/video/evaluation-parameters');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValid = formData.marks && formData.difficulty && formData.skills.length > 0;

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
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <span>5</span>
            </div>
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
        <div className={styles.contentGrid}>
          {/* Left Column - Configuration */}
          <div className={styles.leftColumn}>
            <Card variant="elevated" padding="lg" className={styles.configCard}>
              <h2 className={styles.sectionTitle}>Question Configuration</h2>
              
              {/* Marks */}
              <div className={styles.fieldGroup}>
                <Input
                  label="Marks *"
                  type="number"
                  placeholder="Enter marks"
                  value={formData.marks}
                  onChange={(e) => handleInputChange('marks', e.target.value)}
                  min="1"
                  max="100"
                />
              </div>

              {/* Difficulty */}
              <div className={styles.fieldGroup}>
                <Selector
                  variant="single"
                  options={difficultyOptions}
                  selectedValue={formData.difficulty}
                  onSelectionChange={(value) => handleInputChange('difficulty', value)}
                  label="Difficulty Level *"
                  layout="grid"
                />
              </div>

              {/* Skills */}
              <div className={styles.fieldGroup}>
                <Selector
                  variant="multiple"
                  options={skillOptions}
                  selectedValues={formData.skills}
                  onSelectionChange={(values) => handleInputChange('skills', values)}
                  label="Skills to Assess *"
                  helperText="Select the presentation skills to evaluate"
                  showSelectAll
                  layout="grid"
                />
              </div>
            </Card>
          </div>

          {/* Right Column - Metadata */}
          <div className={styles.rightColumn}>
            <Card variant="elevated" padding="lg" className={styles.metadataCard}>
              <h2 className={styles.sectionTitle}>Question Metadata</h2>
              
              <div className={styles.fieldGroup}>
                <Input
                  label="Question Provider"
                  placeholder="Enter provider name"
                  value={formData.questionProvider}
                  onChange={(e) => handleInputChange('questionProvider', e.target.value)}
                />
              </div>

              <div className={styles.fieldGroup}>
                <Input
                  label="Question Author"
                  placeholder="Enter author name"
                  value={formData.questionAuthor}
                  onChange={(e) => handleInputChange('questionAuthor', e.target.value)}
                />
              </div>

              {/* Summary */}
              <div className={styles.summary}>
                <h3 className={styles.summaryTitle}>Summary</h3>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Marks:</span>
                    <span className={styles.summaryValue}>
                      {formData.marks || '-'}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Difficulty:</span>
                    <span className={styles.summaryValue}>
                      {formData.difficulty ? difficultyOptions.find(d => d.value === formData.difficulty)?.label : '-'}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Skills:</span>
                    <span className={styles.summaryValue}>
                      {formData.skills.length > 0 ? `${formData.skills.length} selected` : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValid && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please complete all required fields (Marks, Difficulty, Skills)
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
    </div>
  );
};

export default VideoQuestionDetails;