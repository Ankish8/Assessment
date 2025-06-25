import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import { FILL_IN_THE_BLANKS_PROGRESS_STEPS, FILL_IN_THE_BLANKS_STEP_NUMBERS } from '../../constants/fillInTheBlanksProgressSteps';
import styles from './QuestionDetails/QuestionDetails.module.css';
import '../../styles/utilities.css';

const FillInTheBlanksQuestionDetails = () => {
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
      description: 'Basic concepts and straightforward implementation',
      value: 'easy',
      icon: 'fas fa-seedling',
      color: 'success'
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      description: 'Moderate complexity requiring some experience',
      value: 'intermediate',
      icon: 'fas fa-mountain',
      color: 'warning'
    },
    {
      id: 'hard',
      label: 'Hard',
      description: 'Advanced concepts and complex problem solving',
      value: 'hard',
      icon: 'fas fa-fire',
      color: 'error'
    }
  ];

  // Popular/Essential skills shown by default
  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'HTML/CSS',
    'Data Structures', 'Algorithms', 'System Design', 'API Development',
    'Git', 'Testing'
  ];

  // Additional skills shown when "Show more" is clicked
  const additionalSkills = [
    'Java', 'C++', 'TypeScript', 'Angular', 'Vue.js', 'MongoDB', 
    'PostgreSQL', 'Docker', 'AWS', 'Machine Learning', 'DevOps',
    'Database Design', 'C#', 'PHP', 'Ruby', 'Go', 'Microservices',
    'GraphQL', 'REST API', 'Security', 'Mobile Development'
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
    // Navigate to next step - Evaluation Parameters
    navigate('/fill-in-the-blanks/evaluation-parameters');
  };

  const handlePrevious = () => {
    navigate('/fill-in-the-blanks/media-resources');
  };

  return (
    <div className={styles.container}>
      <Header title="Fill in the Blanks" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps 
          steps={FILL_IN_THE_BLANKS_PROGRESS_STEPS} 
          currentStep={FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS} 
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
                  Set the basic parameters and difficulty for this fill-in-the-blanks question
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
                    <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Choose the appropriate difficulty level for this question"></i>
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
                  Tag this question with relevant skills and technologies
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
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`${styles.skillOption} ${selectedSkills.includes(skill) ? styles.skillSelected : ''}`}
                          >
                            <span className={styles.skillName}>{skill}</span>
                            {selectedSkills.includes(skill) && (
                              <i className="fas fa-check"></i>
                            )}
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
                          onClick={() => setShowAllSkills(!showAllSkills)}
                          className={styles.showMoreButton}
                        >
                          {showAllSkills ? (
                            <>
                              <i className="fas fa-chevron-up"></i>
                              Show Less
                            </>
                          ) : (
                            <>
                              <i className="fas fa-chevron-down"></i>
                              Show More Skills
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {errors.skills && (
                  <div className={styles.errorMessage}>
                    <i className="fas fa-exclamation-triangle"></i>
                    {errors.skills}
                  </div>
                )}
              </div>
            </Card>
          </div>
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
  );
};

export default FillInTheBlanksQuestionDetails;