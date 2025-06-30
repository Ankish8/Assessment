import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import FloatingFooter from '../FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../ResponsiveProgressSteps/ResponsiveProgressSteps';
import DifficultySelector from '../DifficultySelector/DifficultySelector';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import SkillsInput from '../SkillsInput/SkillsInput';
import { useQuestionDetailsForm } from '../../../hooks/useQuestionDetailsForm';
import { useSkillsManagement } from '../../../hooks/useSkillsManagement';
import { 
  getQuestionDetailsConfig, 
  getDifficultyOptions,
  getNavigationConfig 
} from '../../../config/questionDetailsDefaults';
import styles from './QuestionDetails.module.css';
import '../../../styles/utilities.css';

const QuestionDetails = ({ 
  questionType = 'coding',
  progressSteps = [],
  currentStep = 1,
  onPrevious,
  onSaveAndContinue,
  className = ''
}) => {
  const navigate = useNavigate();
  const config = getQuestionDetailsConfig(questionType);
  const difficultyOptions = getDifficultyOptions(questionType);
  const navigationConfig = getNavigationConfig(questionType);

  const {
    formData,
    errors,
    isValid,
    hasAttemptedSubmit,
    updateField,
    setAttemptedSubmit
  } = useQuestionDetailsForm(questionType);

  const {
    skillsSearch,
    setSkillsSearch,
    showAllSkills,
    availableSkills,
    handleSkillToggle,
    removeSkill,
    toggleShowAllSkills,
    skillsConfig
  } = useSkillsManagement(questionType, formData.selectedSkills, (skills) => {
    updateField('selectedSkills', skills);
  });

  const handleSaveAndContinue = () => {
    setAttemptedSubmit(true);
    if (!isValid) return;
    
    if (onSaveAndContinue) {
      onSaveAndContinue(formData);
    } else {
      // Default navigation based on question type
      navigate(navigationConfig.nextRoute);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      // Default navigation based on question type
      navigate(navigationConfig.previousRoute);
    }
  };

  const renderLanguageSelector = () => {
    if (!config.includeLanguageSelector) return null;

    return (
      <div className={styles.languageSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <i className="fas fa-code"></i>
            Programming Language
          </h3>
          <p className={styles.sectionDescription}>
            Select the primary programming language for this question
          </p>
        </div>
        <LanguageSelector
          selectedLanguage={formData.language}
          onLanguageChange={(language) => updateField('language', language)}
          error={errors.language}
        />
      </div>
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
        <div className={styles.mainGrid}>
          {/* Left Column - Basic Details */}
          <div className={styles.leftColumn}>
            <Card variant="elevated" padding="lg" className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-cog"></i>
                  Basic Configuration
                </h2>
                <p className={styles.sectionDescription}>
                  {config.description}
                </p>
              </div>

              <div className={styles.formSection}>
                {/* Marks Input */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    <i className="fas fa-star"></i>
                    Total Marks
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter total marks"
                    value={formData.marks}
                    onChange={(e) => updateField('marks', parseInt(e.target.value) || '')}
                    error={hasAttemptedSubmit ? errors.marks : ''}
                    min={config.validation.minMarks}
                    max={config.validation.maxMarks}
                    endIcon={<span className={styles.marksUnit}>pts</span>}
                  />
                  <span className={styles.fieldHelper}>
                    Range: {config.validation.minMarks} - {config.validation.maxMarks} points
                  </span>
                </div>

                {/* Difficulty Level */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    <i className="fas fa-layer-group"></i>
                    Difficulty Level
                  </label>
                  <DifficultySelector
                    options={difficultyOptions}
                    selectedLevel={formData.level}
                    onLevelChange={(level) => updateField('level', level)}
                    error={hasAttemptedSubmit ? errors.level : ''}
                  />
                </div>

                {/* Language Selector (conditional) */}
                {renderLanguageSelector()}
              </div>
            </Card>
          </div>

          {/* Right Column - Metadata & Skills */}
          <div className={styles.rightColumn}>
            {/* Metadata Card */}
            <Card variant="elevated" padding="lg" className={styles.metadataCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-info-circle"></i>
                  Question Metadata
                </h2>
                <p className={styles.sectionDescription}>
                  Provide additional information about the question source and authorship
                </p>
              </div>

              <div className={styles.formSection}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    <i className="fas fa-building"></i>
                    Provider Organization
                  </label>
                  <Input
                    placeholder="Enter provider organization"
                    value={formData.provider}
                    onChange={(e) => updateField('provider', e.target.value)}
                    error={hasAttemptedSubmit ? errors.provider : ''}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    <i className="fas fa-user-edit"></i>
                    Question Author
                  </label>
                  <Input
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    error={hasAttemptedSubmit ? errors.author : ''}
                  />
                </div>
              </div>
            </Card>

            {/* Skills Card */}
            <Card variant="elevated" padding="lg" className={styles.skillsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-tags"></i>
                  Required Skills
                </h2>
                <p className={styles.sectionDescription}>
                  Select the skills and technologies relevant to this question
                </p>
              </div>

              <SkillsInput
                selectedSkills={formData.selectedSkills}
                onSkillToggle={handleSkillToggle}
                onRemoveSkill={removeSkill}
                availableSkills={availableSkills}
                skillsSearch={skillsSearch}
                onSkillsSearchChange={setSkillsSearch}
                showAllSkills={showAllSkills}
                onToggleShowAllSkills={toggleShowAllSkills}
                error={hasAttemptedSubmit ? errors.selectedSkills : ''}
                popularSkills={skillsConfig.popular}
                totalSkillsCount={skillsConfig.all.length}
              />
            </Card>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <FloatingFooter
          hasValidationAlert={true}
          validationMessage="Please fix the validation errors to continue"
          showAlert={!isValid && hasAttemptedSubmit}
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
            disabled={!isValid && hasAttemptedSubmit}
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

export default QuestionDetails;