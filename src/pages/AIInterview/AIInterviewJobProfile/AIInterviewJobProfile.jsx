import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import Card from '../../../components/common/Card/Card';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import CustomFooter from '../../../components/common/CustomFooter/CustomFooter';
import Selector from '../../../components/common/Selector/Selector';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import { 
  AI_INTERVIEW_STEPS, 
  AI_INTERVIEW_STEP_NUMBERS, 
  INTERVIEW_STATE_OPTIONS 
} from '../shared/constants';
import { 
  formatJobProfilesForSelector, 
  searchJobProfiles 
} from '../shared/jobProfileData';
import { useAIInterviewState } from '../shared/hooks/useAIInterviewState';
import styles from './AIInterviewJobProfile.module.css';
import '../../../styles/utilities.css';

const AIInterviewJobProfile = () => {
  const navigate = useNavigate();
  const { interviewData, errors, updateField, validateStep } = useAIInterviewState();
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [jobProfileOptions, setJobProfileOptions] = useState(formatJobProfilesForSelector());
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Validation
  useEffect(() => {
    const stepValidation = validateStep(AI_INTERVIEW_STEP_NUMBERS.JOB_PROFILE);
    setIsValid(stepValidation.isValid);
  }, [interviewData.selectedJobProfile, interviewData.interviewState, validateStep]);

  // Handle job profile search
  useEffect(() => {
    const filteredOptions = searchJobProfiles(searchTerm);
    setJobProfileOptions(filteredOptions);
  }, [searchTerm]);

  const handleInterviewStateChange = (selectedState) => {
    updateField('interviewState', selectedState);
  };

  const handleJobProfileChange = (selectedProfile) => {
    console.log('handleJobProfileChange called with:', selectedProfile, typeof selectedProfile);
    updateField('selectedJobProfile', String(selectedProfile || ''));
    setSearchTerm(''); // Clear search when selection is made
    setShowSuggestions(false); // Hide suggestions after selection
  };

  const handleJobProfileSearch = (value) => {
    // Handle both direct values and event objects
    const actualValue = typeof value === 'string' ? value : (value?.target?.value || '');
    console.log('handleJobProfileSearch called with:', actualValue, typeof actualValue);
    setSearchTerm(actualValue);
    updateField('selectedJobProfile', actualValue);
    setShowSuggestions(true); // Show suggestions when typing
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (isValid) {
      // Navigate to next step - Job Description
      navigate('/ai-interview/job-description');
    }
  };

  const handlePrevious = () => {
    navigate('/');
  };

  // Get appropriate icon for each state
  const getStateIcon = (state) => {
    switch (state) {
      case 'ready':
        return 'fas fa-eye';
      case 'stage':
        return 'fas fa-edit';
      case 'abandoned':
        return 'fas fa-archive';
      default:
        return 'fas fa-circle';
    }
  };

  return (
    <div className={styles.container}>
      <CompactHeader 
        title="AI Interview" 
        onBack={handlePrevious}
      />
      
      <div className={styles.progressContainer}>
        <CompactProgressSteps 
          steps={AI_INTERVIEW_STEPS} 
          currentStep={AI_INTERVIEW_STEP_NUMBERS.JOB_PROFILE} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Interview Configuration Card */}
            <Card variant="elevated" padding="lg" className={styles.configCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-brain"></i>
                  Interview Configuration
                </h2>
                <p className={styles.sectionDescription}>
                  Set up the basic parameters for your AI interview
                </p>
              </div>

              <div className={styles.configSection}>
                <div className={styles.stateSection}>
                  <label className={styles.fieldLabel}>
                    Interview State
                    <i className={`fas fa-info-circle ${styles.infoIcon}`} title="The purpose of the states is to manage the question development cycle."></i>
                  </label>
                  <div className={styles.stateOptions}>
                    {INTERVIEW_STATE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInterviewStateChange(option.value)}
                        className={`${styles.stateOption} ${
                          interviewData.interviewState === option.value ? styles.stateSelected : ''
                        } ${styles[option.colorClass]}`}
                      >
                        <div className={styles.stateHeader}>
                          <div className={styles.stateTitleSection}>
                            <i className={`${getStateIcon(option.value)} ${styles.stateIcon}`}></i>
                            <span className={styles.stateLabel}>{option.label}</span>
                          </div>
                          {interviewData.interviewState === option.value && (
                            <i className={`fas fa-check-circle ${styles.checkIcon}`}></i>
                          )}
                        </div>
                        <p className={styles.stateDescription}>{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Job Profile Card */}
            <Card variant="elevated" padding="lg" className={styles.profileCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-briefcase"></i>
                  Job Profile
                </h2>
                <p className={styles.sectionDescription}>
                  Specify the role you're interviewing for
                </p>
              </div>

              <div className={styles.profileSection}>
                <Input
                  label="Job Profile Title"
                  value={interviewData.selectedJobProfile}
                  onChange={handleJobProfileSearch}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="e.g. Senior Frontend Developer"
                  error={hasAttemptedSubmit && errors.jobProfile ? errors.jobProfile : ''}
                  startIcon={<i className="fas fa-search"></i>}
                  required
                />

                {/* Job Profile Suggestions */}
                <div className={styles.suggestions}>
                  {searchTerm && jobProfileOptions.length > 0 ? (
                      <>
                        <h4 className={styles.suggestionsTitle}>
                          <i className="fas fa-search"></i>
                          Search Results ({jobProfileOptions.length})
                        </h4>
                        <div className={styles.suggestionsList}>
                          {jobProfileOptions.slice(0, 3).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              className={styles.suggestionItem}
                              onClick={() => handleJobProfileChange(option.label)}
                            >
                              <div className={styles.suggestionHeader}>
                                <span className={styles.suggestionTitle}>{option.label}</span>
                              </div>
                              <p className={styles.suggestionDescription}>{option.description}</p>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className={styles.suggestionsTitle}>
                          <i className="fas fa-fire"></i>
                          Popular Profiles
                        </h4>
                        <div className={styles.suggestionsList}>
                          {formatJobProfilesForSelector().slice(0, 3).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              className={styles.suggestionItem}
                              onClick={() => handleJobProfileChange(option.label)}
                            >
                              <div className={styles.suggestionHeader}>
                                <span className={styles.suggestionTitle}>{option.label}</span>
                              </div>
                              <p className={styles.suggestionDescription}>{option.description}</p>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <CustomFooter
        hasValidationAlert={hasAttemptedSubmit && !isValid}
        validationMessage={hasAttemptedSubmit && !isValid ? "Please complete the required fields before continuing" : ""}
        showAlert={hasAttemptedSubmit && !isValid}
      >
        <Button variant="secondary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSaveAndContinue}
          disabled={hasAttemptedSubmit && !isValid}
        >
          Save & Continue
        </Button>
      </CustomFooter>
    </div>
  );
};

export default AIInterviewJobProfile;