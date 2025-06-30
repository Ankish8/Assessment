import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import Selector from '../../components/common/Selector/Selector';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { 
  UI_FRAMEWORK_PROGRESS_STEPS, 
  UI_FRAMEWORK_STEP_NUMBERS,
  getNextRoute,
  getPreviousRoute 
} from '../../constants/uiFrameworkProgressSteps';
import styles from '../SubmissionQuestionDetails/SubmissionQuestionDetails.module.css';
import '../../styles/utilities.css';

const UIFrameworkQuestionDetails = () => {
  const navigate = useNavigate();
  const [marks, setMarks] = useState('');
  const [level, setLevel] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [provider, setProvider] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [skillsSearch, setSkillsSearch] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const levelOptions = [
    {
      id: 'easy',
      label: 'Easy',
      description: 'Basic UI components and simple styling tasks',
      value: 'easy',
      icon: 'fas fa-seedling',
      color: 'success'
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: 'Complex layouts and interactive components',
      value: 'intermediate',
      icon: 'fas fa-mountain',
      color: 'warning'
    },
    {
      id: 'hard',
      label: 'Hard',
      description: 'Advanced patterns and framework architecture',
      value: 'hard',
      icon: 'fas fa-fire',
      color: 'error'
    }
  ];

  // UI Framework specific skills
  const popularSkills = [
    'React', 'Vue.js', 'Angular', 'HTML/CSS', 'JavaScript', 'TypeScript',
    'Component Design', 'Responsive Design', 'CSS Frameworks', 'UI/UX',
    'State Management', 'Design Systems'
  ];

  // Additional UI Framework skills
  const additionalSkills = [
    'Svelte', 'Next.js', 'Nuxt.js', 'Styled Components', 'Tailwind CSS', 'Bootstrap',
    'Material-UI', 'Ant Design', 'Chakra UI', 'Sass/SCSS', 'CSS-in-JS',
    'Animation', 'Accessibility', 'Performance', 'Testing', 'Storybook',
    'Figma', 'Adobe XD', 'Web Components', 'Progressive Web Apps'
  ];

  // Get skills to display based on search and show state
  const getDisplayedSkills = () => {
    const allSkills = showAllSkills ? [...popularSkills, ...additionalSkills] : popularSkills;
    
    if (skillsSearch.trim()) {
      return allSkills.filter(skill =>
        skill.toLowerCase().includes(skillsSearch.toLowerCase())
      );
    }
    
    return allSkills;
  };

  const displayedSkills = getDisplayedSkills();

  // Validation
  useEffect(() => {
    const newErrors = {};
    
    if (!marks || marks <= 0) {
      newErrors.marks = 'Marks are required and must be greater than 0';
    }
    
    if (!level) {
      newErrors.level = 'Please select a difficulty level';
    }
    
    if (selectedSkills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [marks, level, selectedSkills]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (!isValid) return;
    // Navigate to next step using helper function
    const nextRoute = getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.QUESTION_DETAILS);
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const handlePrevious = () => {
    // Navigate to previous step using helper function
    const previousRoute = getPreviousRoute(UI_FRAMEWORK_STEP_NUMBERS.QUESTION_DETAILS);
    if (previousRoute) {
      navigate(previousRoute);
    }
  };

  return (
    <div className={styles.container}>
      <Header title="UI Framework - Question Details" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={UI_FRAMEWORK_PROGRESS_STEPS} 
          currentStep={UI_FRAMEWORK_STEP_NUMBERS.QUESTION_DETAILS} 
        />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Question Configuration Card */}
            <Card variant="elevated" padding="lg" className={styles.configCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-cogs"></i>
                  Question Configuration
                </h2>
                <p className={styles.sectionDescription}>
                  Set the basic parameters and difficulty for this UI framework question
                </p>
              </div>

              <div className={styles.configSection}>
                <div className={styles.marksInput}>
                  <Input
                    label="Marks"
                    type="number"
                    placeholder="Enter total marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    error={errors.marks}
                    helperText="Total points awarded for correctly solving this question"
                    startIcon={<i className="fas fa-medal"></i>}
                    min="1"
                    max="100"
                  />
                </div>

                <div className={styles.levelSection}>
                  <label className={styles.fieldLabel}>
                    Difficulty Level
                    <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Choose the appropriate difficulty level for this UI framework question"></i>
                  </label>
                  <div className={styles.levelOptions}>
                    {levelOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setLevel(option.value)}
                        className={`${styles.levelOption} ${level === option.value ? styles.levelSelected : ''} ${styles[option.color]}`}
                      >
                        <div className={styles.levelHeader}>
                          <div className={styles.levelTitleSection}>
                            <i className={`${option.icon} ${styles.levelIcon}`}></i>
                            <span className={styles.levelLabel}>{option.label}</span>
                          </div>
                          {level === option.value && (
                            <i className="fas fa-check-circle"></i>
                          )}
                        </div>
                        <p className={styles.levelDescription}>{option.description}</p>
                      </button>
                    ))}
                  </div>
                  {errors.level && (
                    <div className={styles.errorMessage}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.level}
                    </div>
                  )}
                </div>
              </div>
            </Card>

          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Question Metadata Card */}
            <Card variant="elevated" padding="lg" className={styles.metadataCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-info-circle"></i>
                  Question Metadata
                </h2>
                <p className={styles.sectionDescription}>
                  Additional information about question authorship and source
                </p>
              </div>

              <div className={styles.metadataGrid}>
                <Input
                  label="Provider"
                  placeholder="Organization or platform name"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  helperText="The organization or platform providing this question"
                  startIcon={<i className="fas fa-building"></i>}
                />

                <Input
                  label="Author"
                  placeholder="Question author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  helperText="The person who created this question"
                  startIcon={<i className="fas fa-user"></i>}
                />
              </div>
            </Card>

            {/* Skills & Categories Card */}
            <Card variant="elevated" padding="lg" className={styles.skillsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  <i className="fas fa-tags"></i>
                  Skills & Categories
                </h2>
                <p className={styles.sectionDescription}>
                  Tag this question with relevant UI framework skills and technologies
                </p>
              </div>

              <div className={styles.skillsSection}>
                <div className={styles.selectedSkills}>
                  <label className={styles.fieldLabel}>Selected Skills ({selectedSkills.length})</label>
                  <div className={styles.skillTags}>
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map(skill => (
                        <div key={skill} className={styles.skillTag}>
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className={styles.removeSkill}
                            title="Remove skill"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))
                    ) : (
                      <span className={styles.emptySkills}>No skills selected yet. Choose from the options below.</span>
                    )}
                  </div>
                </div>

                <div className={styles.availableSkills}>
                  <label className={styles.fieldLabel}>Available Skills</label>
                  
                  <div className={styles.skillsSearch}>
                    <Input
                      placeholder="Search skills..."
                      value={skillsSearch}
                      onChange={(e) => setSkillsSearch(e.target.value)}
                      startIcon={<i className="fas fa-search"></i>}
                      size="sm"
                    />
                  </div>

                  <div className={styles.skillsContainer}>
                    <div className={styles.skillsGrid}>
                      {displayedSkills.length > 0 ? (
                        displayedSkills.map(skill => (
                          <button
                            key={skill}
                            onClick={() => handleSkillToggle(skill)}
                            className={`${styles.skillOption} ${selectedSkills.includes(skill) ? styles.skillSelected : ''}`}
                          >
                            <i className={`fas ${selectedSkills.includes(skill) ? 'fa-check-circle' : 'fa-plus-circle'}`}></i>
                            {skill}
                          </button>
                        ))
                      ) : (
                        <div className={styles.noSkillsFound}>
                          <i className="fas fa-search"></i>
                          <span>No skills found matching "{skillsSearch}"</span>
                        </div>
                      )}
                    </div>

                    {!skillsSearch && (
                      <div className={styles.skillsActions}>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAllSkills(!showAllSkills);
                            if (skillsSearch) setSkillsSearch(''); // Clear search when toggling
                          }}
                          className={styles.showMoreButton}
                        >
                          <i className={`fas ${showAllSkills ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                          {showAllSkills ? 'Show Less' : `+${additionalSkills.length} more`}
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.skills && (
                    <div className={styles.errorMessage}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.skills}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <FloatingFooter
          hasValidationAlert={true}
          validationMessage="Please fill in all required fields to continue"
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
            disabled={!isValid}
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

export default UIFrameworkQuestionDetails;