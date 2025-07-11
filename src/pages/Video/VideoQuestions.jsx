import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Modal from '../../components/common/Modal/Modal';
import styles from './VideoQuestions.module.css';

const VideoQuestions = () => {
  const navigate = useNavigate();
  
  // State Management
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      type: 'management',
      title: 'Leadership in Crisis',
      skills: ['Leadership', 'Communication', 'Decision Making'],
      description: 'Describe a time when you had to lead your team through a challenging situation. How did you communicate the changes, maintain team morale, and ensure project delivery?',
      timeAllocation: 4,
      order: 1
    },
    {
      id: 'q2',
      type: 'management',
      title: 'Team Collaboration',
      skills: ['Teamwork', 'Conflict Resolution', 'Communication'],
      description: 'Tell us about a time when you had to work with a difficult team member. How did you handle the situation and what was the outcome?',
      timeAllocation: 3,
      order: 2
    },
    {
      id: 'q3',
      type: 'professional',
      title: 'Technical Problem Solving',
      skills: ['Problem Solving', 'Technical Analysis', 'System Design'],
      description: 'Walk us through how you would approach debugging a complex performance issue in a production system. Include your methodology and tools.',
      timeAllocation: 6,
      order: 3
    },
    {
      id: 'q4',
      type: 'professional',
      title: 'Architecture Design',
      skills: ['System Architecture', 'Scalability', 'Technical Design'],
      description: 'Design a scalable system architecture for a high-traffic e-commerce platform. Explain your design decisions and trade-offs.',
      timeAllocation: 7,
      order: 4
    }
  ]);

  const [uiState, setUiState] = useState({
    activeFilter: 'all',
    searchTerm: '',
    isAddingQuestion: false,
    editingQuestion: null,
    showHelpModal: false
  });

  const [newQuestion, setNewQuestion] = useState({
    type: 'management',
    title: '',
    skills: [],
    description: '',
    timeAllocation: 3
  });

  const [skillInput, setSkillInput] = useState('');

  // Predefined skills for autocomplete
  const predefinedSkills = {
    management: [
      'Leadership', 'Communication', 'Team Management', 'Conflict Resolution',
      'Decision Making', 'Strategic Planning', 'Project Management', 'Mentoring',
      'Delegation', 'Performance Management', 'Change Management', 'Negotiation'
    ],
    professional: [
      'Technical Analysis', 'Problem Solving', 'System Design', 'Code Review',
      'Architecture', 'Scalability', 'Performance Optimization', 'Security',
      'Database Design', 'API Design', 'Testing', 'DevOps', 'Debugging'
    ]
  };

  // Filter and search logic
  const filteredQuestions = questions.filter(question => {
    const matchesFilter = uiState.activeFilter === 'all' || question.type === uiState.activeFilter;
    const matchesSearch = question.title.toLowerCase().includes(uiState.searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(uiState.searchTerm.toLowerCase()) ||
                         question.skills.some(skill => skill.toLowerCase().includes(uiState.searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Calculate totals
  const managementQuestions = questions.filter(q => q.type === 'management');
  const professionalQuestions = questions.filter(q => q.type === 'professional');
  const totalManagementTime = managementQuestions.reduce((sum, q) => sum + q.timeAllocation, 0);
  const totalProfessionalTime = professionalQuestions.reduce((sum, q) => sum + q.timeAllocation, 0);
  const totalTime = totalManagementTime + totalProfessionalTime;

  // Form validation
  const isFormValid = newQuestion.title.trim().length >= 3 && 
                     newQuestion.description.trim().length >= 20 && 
                     newQuestion.skills.length > 0;

  // Event handlers
  const handleAddQuestion = () => {
    if (!isFormValid) return;
    
    const question = {
      id: `q${Date.now()}`,
      ...newQuestion,
      order: questions.length + 1
    };
    
    setQuestions([...questions, question]);
    setNewQuestion({
      type: 'management',
      title: '',
      skills: [],
      description: '',
      timeAllocation: 3
    });
    setUiState(prev => ({ ...prev, isAddingQuestion: false }));
  };

  const handleEditQuestion = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setNewQuestion(question);
      setUiState(prev => ({ ...prev, editingQuestion: questionId, isAddingQuestion: true }));
    }
  };

  const handleUpdateQuestion = () => {
    if (!isFormValid) return;
    
    setQuestions(questions.map(q => 
      q.id === uiState.editingQuestion ? { ...newQuestion, id: q.id, order: q.order } : q
    ));
    setNewQuestion({
      type: 'management',
      title: '',
      skills: [],
      description: '',
      timeAllocation: 3
    });
    setUiState(prev => ({ ...prev, isAddingQuestion: false, editingQuestion: null }));
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !newQuestion.skills.includes(skillInput.trim())) {
      setNewQuestion(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setNewQuestion(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleTimeAllocationChange = (value) => {
    setNewQuestion(prev => ({ ...prev, timeAllocation: parseInt(value) }));
  };

  const handleSaveAndContinue = () => {
    // Navigate to next step - Media & Resources
    navigate('/video/media-resources');
  };

  const resetForm = () => {
    setNewQuestion({
      type: 'management',
      title: '',
      skills: [],
      description: '',
      timeAllocation: 3
    });
    setSkillInput('');
    setUiState(prev => ({ ...prev, isAddingQuestion: false, editingQuestion: null }));
  };

  return (
    <div className={styles.container}>
      {/* Compact Header */}
      <div className={styles.compactHeader}>
        <div className={styles.headerContent}>
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
              <span>Video Assessment - Questions</span>
            </div>
          </div>
          <button 
            className={styles.helpButton}
            onClick={() => setUiState(prev => ({ ...prev, showHelpModal: true }))}
          >
            <i className="fas fa-question-circle"></i>
            Help
          </button>
        </div>
      </div>

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div className={styles.progressContent}>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.current}`}>
              <span>2</span>
            </div>
            <span className={styles.stepLabel}>Questions</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>3</div>
            <span className={styles.stepLabel}>Media & Resources</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepIndicator}>4</div>
            <span className={styles.stepLabel}>Question Details</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.lastStep}`}>
            <div className={styles.stepIndicator}>5</div>
            <span className={styles.stepLabel}>Evaluation Parameters</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Question Type Overview Cards */}
        <div className={styles.overviewSection}>
          <h2 className={styles.sectionTitle}>Question Types Overview</h2>
          <div className={styles.overviewCards}>
            <Card 
              variant="elevated" 
              className={`${styles.overviewCard} ${styles.managementCard}`}
              clickable
              onClick={() => setUiState(prev => ({ ...prev, activeFilter: 'management' }))}
            >
              <div className={styles.overviewCardContent}>
                <div className={styles.overviewCardHeader}>
                  <div className={styles.overviewCardIcon}>
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3 className={styles.overviewCardTitle}>Management Questions</h3>
                </div>
                <p className={styles.overviewCardDescription}>
                  Soft skills focus - leadership, communication, teamwork
                </p>
                <div className={styles.overviewCardStats}>
                  <div className={styles.overviewCardStat}>
                    <span className={styles.statValue}>{managementQuestions.length}</span>
                    <span className={styles.statLabel}>Questions</span>
                  </div>
                  <div className={styles.overviewCardStat}>
                    <span className={styles.statValue}>{totalManagementTime}</span>
                    <span className={styles.statLabel}>Min Total</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewQuestion(prev => ({ ...prev, type: 'management' }));
                    setUiState(prev => ({ ...prev, isAddingQuestion: true }));
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Add Management Question
                </Button>
              </div>
            </Card>

            <Card 
              variant="elevated" 
              className={`${styles.overviewCard} ${styles.professionalCard}`}
              clickable
              onClick={() => setUiState(prev => ({ ...prev, activeFilter: 'professional' }))}
            >
              <div className={styles.overviewCardContent}>
                <div className={styles.overviewCardHeader}>
                  <div className={styles.overviewCardIcon}>
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h3 className={styles.overviewCardTitle}>Professional Questions</h3>
                </div>
                <p className={styles.overviewCardDescription}>
                  Technical expertise - problem solving, job-specific skills
                </p>
                <div className={styles.overviewCardStats}>
                  <div className={styles.overviewCardStat}>
                    <span className={styles.statValue}>{professionalQuestions.length}</span>
                    <span className={styles.statLabel}>Questions</span>
                  </div>
                  <div className={styles.overviewCardStat}>
                    <span className={styles.statValue}>{totalProfessionalTime}</span>
                    <span className={styles.statLabel}>Min Total</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewQuestion(prev => ({ ...prev, type: 'professional' }));
                    setUiState(prev => ({ ...prev, isAddingQuestion: true }));
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Add Professional Question
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={styles.searchFilterSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search questions..."
                className={styles.searchInput}
                value={uiState.searchTerm}
                onChange={(e) => setUiState(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
            </div>
            <select 
              className={styles.filterSelect}
              value={uiState.activeFilter}
              onChange={(e) => setUiState(prev => ({ ...prev, activeFilter: e.target.value }))}
            >
              <option value="all">All Questions</option>
              <option value="management">Management</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setUiState(prev => ({ ...prev, isAddingQuestion: true }))}
          >
            <i className="fas fa-plus"></i>
            Add Question
          </Button>
        </div>

        {/* Questions List */}
        <div className={styles.questionsList}>
          {filteredQuestions.map((question) => (
            <Card 
              key={question.id}
              variant="elevated"
              className={`${styles.questionCard} ${styles[`${question.type}Question`]}`}
              hoverable
            >
              <div className={styles.questionCardContent}>
                <div className={styles.questionCardHeader}>
                  <div className={styles.questionCardLeft}>
                    <div className={styles.questionTypeTag}>
                      <i className={`fas fa-${question.type === 'management' ? 'handshake' : 'cogs'}`}></i>
                      <span>{question.type.toUpperCase()}</span>
                    </div>
                    <h3 className={styles.questionTitle}>{question.title}</h3>
                  </div>
                  <div className={styles.questionCardActions}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleEditQuestion(question.id)}
                      title="Edit question"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleDeleteQuestion(question.id)}
                      title="Delete question"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <div className={styles.questionSkills}>
                  {question.skills.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className={styles.questionTimeAllocation}>
                  <div className={styles.timeBar}>
                    <div 
                      className={styles.timeBarFill}
                      style={{ width: `${(question.timeAllocation / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className={styles.timeText}>
                    <i className="fas fa-clock"></i>
                    {question.timeAllocation} min
                  </span>
                </div>
                
                <p className={styles.questionDescription}>
                  {question.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Add/Edit Question Form */}
        {uiState.isAddingQuestion && (
          <Card variant="elevated" className={styles.addQuestionForm}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>
                {uiState.editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              <button 
                className={styles.closeButton}
                onClick={resetForm}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className={styles.formContent}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Question Type</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="questionType"
                        value="management"
                        checked={newQuestion.type === 'management'}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, type: e.target.value }))}
                      />
                      <span className={styles.radioCustom}></span>
                      <i className="fas fa-handshake"></i>
                      Management
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="questionType"
                        value="professional"
                        checked={newQuestion.type === 'professional'}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, type: e.target.value }))}
                      />
                      <span className={styles.radioCustom}></span>
                      <i className="fas fa-cogs"></i>
                      Professional
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="questionTitle" className={styles.formLabel}>
                    Question Title *
                  </label>
                  <input
                    id="questionTitle"
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter question title"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Skills *</label>
                  <div className={styles.skillsContainer}>
                    <div className={styles.skillTags}>
                      {newQuestion.skills.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                          <button 
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className={styles.removeSkillButton}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className={styles.addSkillContainer}>
                      <input
                        type="text"
                        className={styles.skillInput}
                        placeholder="Add skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        list={`skills-${newQuestion.type}`}
                      />
                      <datalist id={`skills-${newQuestion.type}`}>
                        {predefinedSkills[newQuestion.type].map((skill, index) => (
                          <option key={index} value={skill} />
                        ))}
                      </datalist>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleAddSkill}
                        disabled={!skillInput.trim()}
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="questionDescription" className={styles.formLabel}>
                    Question Description *
                  </label>
                  <textarea
                    id="questionDescription"
                    className={styles.formTextarea}
                    placeholder="Enter detailed question description..."
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="timeAllocation" className={styles.formLabel}>
                    Time Allocation: {newQuestion.timeAllocation} minutes
                  </label>
                  <div className={styles.timeSliderContainer}>
                    <input
                      id="timeAllocation"
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={newQuestion.timeAllocation}
                      onChange={(e) => handleTimeAllocationChange(e.target.value)}
                      className={styles.timeSlider}
                    />
                    <div className={styles.timeSliderLabels}>
                      <span>1 min</span>
                      <span>10 min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <Button 
                  variant="secondary" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={uiState.editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                  disabled={!isFormValid}
                >
                  {uiState.editingQuestion ? 'Update Question' : 'Add Question'}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <i className="fas fa-question-circle"></i>
            </div>
            <h3 className={styles.emptyStateTitle}>No questions found</h3>
            <p className={styles.emptyStateDescription}>
              {uiState.searchTerm || uiState.activeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by adding your first question to get started.'}
            </p>
            <Button 
              variant="primary" 
              onClick={() => setUiState(prev => ({ ...prev, isAddingQuestion: true }))}
            >
              <i className="fas fa-plus"></i>
              Add Question
            </Button>
          </div>
        )}
      </div>

      {/* Footer Summary */}
      <div className={styles.footerSummary}>
        <div className={styles.summaryContent}>
          <div className={styles.summaryStats}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Questions:</span>
              <span className={styles.summaryValue}>{questions.length}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Time:</span>
              <span className={styles.summaryValue}>{totalTime} min</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Management:</span>
              <span className={styles.summaryValue}>{managementQuestions.length} questions ({totalManagementTime} min)</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Professional:</span>
              <span className={styles.summaryValue}>{professionalQuestions.length} questions ({totalProfessionalTime} min)</span>
            </div>
          </div>
          <div className={styles.footerActions}>
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left"></i>
              Previous
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveAndContinue}
              disabled={questions.length === 0}
            >
              Save & Continue
              <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        isOpen={uiState.showHelpModal}
        onClose={() => setUiState(prev => ({ ...prev, showHelpModal: false }))}
        title="Video Assessment Questions Help"
        size="lg"
      >
        <div className={styles.helpContent}>
          <div className={styles.helpSection}>
            <h3 className={styles.helpSectionTitle}>
              <i className="fas fa-handshake"></i>
              Management Questions
            </h3>
            <p className={styles.helpSectionDescription}>
              These focus on assessing soft skills like communication, teamwork, 
              leadership, and conflict resolution. They help gauge how candidates 
              handle relationships, collaborate in teams, and manage workplace 
              dynamics effectively.
            </p>
            <div className={styles.helpExamples}>
              <strong>Example Skills:</strong>
              <ul>
                <li>Leadership & Team Management</li>
                <li>Communication & Presentation</li>
                <li>Conflict Resolution & Negotiation</li>
                <li>Decision Making & Strategic Planning</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.helpSection}>
            <h3 className={styles.helpSectionTitle}>
              <i className="fas fa-cogs"></i>
              Professional Questions
            </h3>
            <p className={styles.helpSectionDescription}>
              These are designed to evaluate a candidate's technical expertise, 
              problem-solving abilities, and job-specific knowledge. They focus 
              on assessing the candidate's ability to perform tasks and apply 
              skills relevant to the role.
            </p>
            <div className={styles.helpExamples}>
              <strong>Example Skills:</strong>
              <ul>
                <li>Technical Analysis & Problem Solving</li>
                <li>System Design & Architecture</li>
                <li>Code Review & Best Practices</li>
                <li>Performance Optimization & Debugging</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.helpSection}>
            <h3 className={styles.helpSectionTitle}>
              <i className="fas fa-lightbulb"></i>
              Best Practices
            </h3>
            <ul className={styles.helpBestPractices}>
              <li>Keep questions clear and specific</li>
              <li>Allocate appropriate time for each question</li>
              <li>Balance management and professional questions</li>
              <li>Use relevant skills tags for better organization</li>
              <li>Provide context in question descriptions</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoQuestions;