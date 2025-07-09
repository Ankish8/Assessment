import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { SPEAKING_PROGRESS_STEPS, SPEAKING_STEP_NUMBERS } from '../../constants/speakingProgressSteps';
import styles from './SpeakingQuestionDetails.module.css';
import '../../styles/utilities.css';

const SpeakingQuestionDetails = () => {
  const navigate = useNavigate();
  const [marks, setMarks] = useState('');
  const [level, setLevel] = useState('easy');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [provider, setProvider] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [skillsSearch, setSkillsSearch] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(true);
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
    'English Fluency', 'Public Speaking', 'Communication', 'Presentation', 'Storytelling', 'Articulation',
    'Voice Projection', 'Clarity', 'Confidence', 'Persuasion', 'Debate', 'Interview Skills'
  ];

  // Additional skills shown when "Show more" is clicked
  const additionalSkills = [
    'Business Communication', 'Technical Presentation', 'Sales Pitch', 'Teaching', 'Leadership Communication', 'Cross-cultural Communication', 
    'Accent Neutrality', 'Diction', 'Pace Control', 'Body Language', 'Active Listening', 'Conflict Resolution',
    'Negotiation', 'Customer Service', 'Phone Etiquette', 'Video Conferencing', 'Webinar Hosting', 'Podcast Speaking'
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

  // Validation - only marks required
  useEffect(() => {
    const newErrors = {};
    
    if (!marks || marks <= 0) {
      newErrors.marks = 'Marks are required and must be greater than 0';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [marks]);

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
    navigate('/speaking/evaluation-parameters');
  };

  const handlePrevious = () => {
    navigate('/speaking/media-resources');
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
            <div className={styles.stepIndicator}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <i className="fas fa-check"></i>
            </div>
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
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Question Configuration Card */}
            <Card variant="elevated" padding="lg" className={styles.configCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.sectionTitle}>
                  Add Question Details
                  <i className={`fas fa-info-circle ${styles.infoIcon}`} title="Set the basic parameters and difficulty for this question"></i>
                </h2>
              </div>

              <div className={styles.configSection}>
                <div className={styles.configGrid}>
                  {/* Left Column */}
                  <div className={styles.leftColumn}>
                    <div className={styles.inputGroup}>
                      <Input
                        label="Marks"
                        type="number"
                        placeholder="Enter marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        error={errors.marks}
                        helperText="Total points awarded for this question"
                        min="1"
                        max="100"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <Input
                        label="Provider"
                        placeholder="Enter provider name"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        helperText="Organization or platform providing this question"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className={styles.rightColumn}>
                    <div className={styles.difficultySection}>
                      <div className={styles.inputGroup}>
                        <label className={styles.fieldLabel}>Difficulty</label>
                        <p className={styles.helperText}>Set the complexity level for this question</p>
                        <div className={styles.difficultyOptions}>
                          {levelOptions.map(option => (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setLevel(option.value)}
                              className={`${styles.difficultyOption} ${level === option.value ? styles.difficultySelected : ''}`}
                            >
                              <span className={styles.difficultyLabel}>{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <Input
                        label="Author"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        helperText="Person who created this question"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills Section */}
            <Card variant="elevated" padding="lg" className={styles.skillsCard}>
              <div className={styles.skillsSection}>
                <div className={styles.skillsHeader}>
                  <label className={styles.fieldLabel}>Skills</label>
                  <p className={styles.helperText}>Add relevant speaking skills and communication topics</p>
                </div>

                <div className={styles.selectedSkillsSection}>
                  <div className={styles.selectedSkillsHeader}>
                    <span className={styles.selectedSkillsLabel}>Selected skills ({selectedSkills.length})</span>
                  </div>
                  <div className={styles.selectedSkills}>
                    {selectedSkills.length > 0 ? (
                      <div className={styles.skillTags}>
                        {selectedSkills.map(skill => (
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
                        ))}
                      </div>
                    ) : (
                      <span className={styles.emptySkills}>No skills selected yet. Choose from the options below</span>
                    )}
                  </div>
                </div>

                <div className={styles.availableSkills}>
                  <div className={styles.availableSkillsHeader}>
                    <span className={styles.availableSkillsLabel}>Available Skills</span>
                  </div>
                  
                  <div className={styles.skillsSearch}>
                    <Input
                      placeholder="Search skills ..."
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
                      <div className={styles.showMoreContainer}>
                        <button
                          type="button"
                          onClick={() => setShowAllSkills(!showAllSkills)}
                          className={styles.showMoreButton}
                        >
                          {showAllSkills ? 'Show Less' : `+${additionalSkills.length} more`}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {!isValid && hasAttemptedSubmit && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              Please enter marks to continue
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="secondary" 
              onClick={handlePrevious}
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

export default SpeakingQuestionDetails;