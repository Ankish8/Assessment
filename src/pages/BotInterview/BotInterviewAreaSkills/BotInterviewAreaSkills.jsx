import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../../components/common/CompactHeader/CompactHeader';
import CompactProgressSteps from '../../../components/common/CompactProgressSteps/CompactProgressSteps';
import Card from '../../../components/common/Card/Card';
import Button from '../../../components/common/Button/Button';
import Modal from '../../../components/common/Modal/Modal';
import Input from '../../../components/common/Input/Input';
import { 
  BOT_INTERVIEW_STEPS, 
  BOT_INTERVIEW_STEP_NUMBERS
} from '../shared/constants';
import styles from './BotInterviewAreaSkills.module.css';
import '../../../styles/utilities.css';

// Mock data for demonstration - will be replaced with actual API calls
const availableSkills = [
  'Arrays', 'Strings', 'Hash Maps', 'Two Pointers', 'Binary Search', 'Sorting',
  'Recursion', 'Dynamic Programming', 'Graphs', 'Trees', 'Linked Lists', 'Stacks',
  'Queues', 'Heaps', 'Greedy', 'Backtracking', 'Bit Manipulation', 'Mathematics',
  'System Design', 'Architecture', 'Leadership', 'Communication', 'Strategy', 
  'Analysis', 'Database', 'SQL', 'Design', 'User Experience', 'Analytics', 'Statistics'
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

const jobRoles = [
  'Software Engineer', 'Senior Software Engineer', 'Engineering Manager', 
  'Product Manager', 'Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer',
  'UI/UX Designer', 'Data Analyst', 'Data Scientist', 'DevOps Engineer', 
  'System Architect', 'Technical Lead', 'Project Manager'
];

const mockQuestions = [
  { 
    id: 1, 
    title: 'Two Sum Problem', 
    skills: ['Arrays', 'Hash Maps'], 
    level: 'Beginner', 
    duration: '15 min',
    jobRole: 'Software Engineer',
    content: 'Given an array of integers and a target sum, find two numbers that add up to the target.',
    description: 'Classic algorithmic problem to test basic problem-solving skills'
  },
  { 
    id: 2, 
    title: 'Binary Tree Traversal', 
    skills: ['Trees', 'Recursion'], 
    level: 'Intermediate', 
    duration: '20 min',
    jobRole: 'Software Engineer',
    content: 'Implement in-order, pre-order, and post-order tree traversal algorithms.',
    description: 'Tests understanding of tree data structures and recursion'
  },
  { 
    id: 3, 
    title: 'Dynamic Programming Problem', 
    skills: ['Dynamic Programming'], 
    level: 'Advanced', 
    duration: '30 min',
    jobRole: 'Senior Software Engineer',
    content: 'Solve a complex optimization problem using dynamic programming approach.',
    description: 'Advanced problem-solving with optimization techniques'
  },
  { 
    id: 4, 
    title: 'System Design Question', 
    skills: ['System Design', 'Architecture'], 
    level: 'Advanced', 
    duration: '45 min',
    jobRole: 'Senior Software Engineer',
    content: 'Design a scalable chat application like WhatsApp.',
    description: 'Tests system design and architectural thinking'
  },
  { 
    id: 5, 
    title: 'String Manipulation', 
    skills: ['Strings', 'Two Pointers'], 
    level: 'Beginner', 
    duration: '10 min',
    jobRole: 'Software Engineer',
    content: 'Process and manipulate string input using efficient algorithms.',
    description: 'Basic string processing and algorithm optimization'
  },
  { 
    id: 6, 
    title: 'Leadership Scenario', 
    skills: ['Leadership', 'Communication'], 
    level: 'Intermediate', 
    duration: '25 min',
    jobRole: 'Engineering Manager',
    content: 'How would you handle a conflict between team members?',
    description: 'Tests leadership and people management skills'
  },
  { 
    id: 7, 
    title: 'Product Strategy', 
    skills: ['Strategy', 'Analysis'], 
    level: 'Advanced', 
    duration: '35 min',
    jobRole: 'Product Manager',
    content: 'Design a go-to-market strategy for a new mobile app.',
    description: 'Tests strategic thinking and market analysis'
  },
  { 
    id: 8, 
    title: 'Database Optimization', 
    skills: ['Database', 'SQL'], 
    level: 'Intermediate', 
    duration: '20 min',
    jobRole: 'Backend Engineer',
    content: 'Optimize a slow-performing database query.',
    description: 'Tests database knowledge and optimization skills'
  },
  { 
    id: 9, 
    title: 'UI/UX Design Challenge', 
    skills: ['Design', 'User Experience'], 
    level: 'Intermediate', 
    duration: '30 min',
    jobRole: 'UI/UX Designer',
    content: 'Design an intuitive checkout flow for an e-commerce app.',
    description: 'Tests design thinking and user experience skills'
  },
  { 
    id: 10, 
    title: 'Data Analysis Case', 
    skills: ['Analytics', 'Statistics'], 
    level: 'Advanced', 
    duration: '40 min',
    jobRole: 'Data Analyst',
    content: 'Analyze user behavior data to identify growth opportunities.',
    description: 'Tests analytical skills and data interpretation'
  }
];

const BotInterviewAreaSkills = () => {
  const navigate = useNavigate();
  
  // State management
  const [areas, setAreas] = useState([
    { id: 1, title: 'General Skills', questionCount: 3, selectedSkills: [], selectedLevels: [], assignedQuestions: [], isComplete: false }
  ]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddAreaModalOpen, setIsAddAreaModalOpen] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  
  // Filter state
  const [filterState, setFilterState] = useState({
    selectedSkills: [],
    selectedLevels: [],
    selectedJobRoles: [],
    searchQuery: ''
  });
  
  // New area form
  const [newAreaForm, setNewAreaForm] = useState({
    title: '',
    questionCount: 1
  });
  
  // Edit area state
  const [editingArea, setEditingArea] = useState(null);
  const [isEditAreaModalOpen, setIsEditAreaModalOpen] = useState(false);
  
  // Validation state
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSaveAndContinue = () => {
    const errors = validateAreas();
    if (errors.length === 0) {
      navigate('/bot-interview/question-details');
    } else {
      setValidationErrors(errors);
    }
  };

  const handlePrevious = () => {
    navigate('/bot-interview/question-statement');
  };

  const validateAreas = () => {
    const errors = [];
    areas.forEach((area, index) => {
      if (area.assignedQuestions.length === 0) {
        errors.push(`Area "${area.title}" needs at least one question assigned`);
      }
      if (area.assignedQuestions.length !== area.questionCount) {
        errors.push(`Area "${area.title}" needs exactly ${area.questionCount} questions (currently has ${area.assignedQuestions.length})`);
      }
    });
    return errors;
  };

  const handleAddArea = () => {
    if (newAreaForm.title.trim() && areas.length < 6) {
      const newArea = {
        id: Date.now(),
        title: newAreaForm.title,
        questionCount: parseInt(newAreaForm.questionCount),
        selectedSkills: [],
        selectedLevels: [],
        assignedQuestions: [],
        isComplete: false
      };
      setAreas([...areas, newArea]);
      setNewAreaForm({ title: '', questionCount: 1 });
      setIsAddAreaModalOpen(false);
    }
  };

  const handleAddAreaKeyPress = (e) => {
    if (e.key === 'Enter' && newAreaForm.title.trim() && areas.length < 6) {
      e.preventDefault();
      handleAddArea();
    }
  };

  const handleDeleteArea = (areaId) => {
    setAreas(areas.filter(area => area.id !== areaId));
  };

  const handleEditArea = (area) => {
    setEditingArea({
      id: area.id,
      title: area.title,
      questionCount: area.questionCount
    });
    setIsEditAreaModalOpen(true);
  };

  const handleUpdateArea = () => {
    if (editingArea && editingArea.title.trim()) {
      setAreas(areas.map(area => 
        area.id === editingArea.id 
          ? { ...area, title: editingArea.title, questionCount: parseInt(editingArea.questionCount) }
          : area
      ));
      setEditingArea(null);
      setIsEditAreaModalOpen(false);
    }
  };

  const handleSkillsChange = (areaId, selectedSkills) => {
    setAreas(areas.map(area => 
      area.id === areaId 
        ? { ...area, selectedSkills }
        : area
    ));
  };

  const handleQuestionAssign = (areaId, question) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        const updatedQuestions = [...area.assignedQuestions, question];
        return {
          ...area,
          assignedQuestions: updatedQuestions,
          isComplete: updatedQuestions.length === area.questionCount
        };
      }
      return area;
    }));
  };

  const handleQuestionRemove = (areaId, questionId) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        const updatedQuestions = area.assignedQuestions.filter(q => q.id !== questionId);
        return {
          ...area,
          assignedQuestions: updatedQuestions,
          isComplete: updatedQuestions.length === area.questionCount
        };
      }
      return area;
    }));
  };

  const applyFilters = () => {
    let filtered = mockQuestions;
    
    if (filterState.selectedLevels.length > 0) {
      filtered = filtered.filter(q => 
        filterState.selectedLevels.includes(q.level)
      );
    }
    
    if (filterState.selectedJobRoles.length > 0) {
      filtered = filtered.filter(q => 
        filterState.selectedJobRoles.includes(q.jobRole)
      );
    }
    
    if (filterState.searchQuery.trim()) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        q.content.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      );
    }
    
    setFilteredQuestions(filtered);
  };

  const resetFilters = () => {
    setFilterState({
      selectedSkills: [],
      selectedLevels: [],
      selectedJobRoles: [],
      searchQuery: ''
    });
    setFilteredQuestions(mockQuestions);
  };

  // Apply filters when filter state changes
  useEffect(() => {
    applyFilters();
  }, [filterState]);

  // Update validation when areas change
  useEffect(() => {
    const errors = validateAreas();
    setValidationErrors(errors);
  }, [areas]);

  return (
    <div className={styles.container}>
      <CompactHeader 
        title="Bot Interview"
        icon="fas fa-robot"
      />
      
      <CompactProgressSteps 
        steps={BOT_INTERVIEW_STEPS}
        currentStep={BOT_INTERVIEW_STEP_NUMBERS.AREA_SKILLS}
      />

      <div className={`${styles.content} floating-footer-spacing`}>
        {/* Top Controls */}
        <div className={styles.topControls}>
          <div className={styles.controlsLeft}>
            <h2 className={styles.sectionTitle}>Configure Interview Areas & Skills</h2>
            <p className={styles.sectionDescription}>
              Create skill-based areas and assign relevant questions for the AI bot interview
            </p>
          </div>
          <div className={styles.controlsRight}>
            <div className={styles.inlineFilters}>
              <select 
                className={styles.filterSelect}
                value={filterState.selectedLevels[0] || ''}
                onChange={(e) => {
                  const level = e.target.value;
                  setFilterState(prev => ({
                    ...prev,
                    selectedLevels: level ? [level] : []
                  }));
                  applyFilters();
                }}
              >
                <option value="">All Levels</option>
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
              <select 
                className={styles.filterSelect}
                value={filterState.selectedJobRoles[0] || ''}
                onChange={(e) => {
                  const role = e.target.value;
                  setFilterState(prev => ({
                    ...prev,
                    selectedJobRoles: role ? [role] : []
                  }));
                  applyFilters();
                }}
              >
                <option value="">All Roles</option>
                {jobRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              
              <Input
                placeholder="Search questions..."
                value={filterState.searchQuery}
                onChange={(e) => {
                  setFilterState(prev => ({
                    ...prev,
                    searchQuery: e.target.value
                  }));
                  applyFilters();
                }}
                size="sm"
                className={styles.searchInput}
              />
            </div>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsAddAreaModalOpen(true)}
              disabled={areas.length >= 6}
            >
              <i className="fas fa-plus"></i>
              Add Area {areas.length >= 6 ? '(Max 6)' : `(${areas.length}/6)`}
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Question Library */}
          <div className={styles.questionLibrary}>
            <Card variant="elevated" padding="lg">
              <div className={styles.libraryHeader}>
                <h3 className={styles.libraryTitle}>
                  Question Library
                  <span className={styles.questionCount}>({filteredQuestions.length} questions)</span>
                </h3>
                {(filterState.selectedLevels.length > 0 || filterState.selectedJobRoles.length > 0 || filterState.searchQuery) && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <i className="fas fa-times"></i>
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className={styles.questionList}>
                {filteredQuestions.map(question => (
                  <div
                    key={question.id}
                    className={styles.questionCard}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify(question));
                    }}
                  >
                    <div className={styles.questionHeader}>
                      <h4 className={styles.questionTitle}>{question.title}</h4>
                      <span className={`${styles.levelBadge} ${styles[question.level.toLowerCase()]}`}>
                        {question.level}
                      </span>
                    </div>
                    <div className={styles.questionMeta}>
                      <div className={styles.questionMetaRow}>
                        <span className={styles.duration}>
                          <i className="fas fa-clock"></i>
                          {question.duration}
                        </span>
                        <span className={styles.jobRole}>
                          <i className="fas fa-user-tie"></i>
                          {question.jobRole}
                        </span>
                      </div>
                      <div className={styles.questionSkills}>
                        {question.skills.map(skill => (
                          <span key={skill} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.questionContent}>{question.content}</p>
                    <div className={styles.dragHandle}>
                      <i className="fas fa-arrows-alt"></i>
                    </div>
                  </div>
                ))}
                
                {filteredQuestions.length === 0 && (
                  <div className={styles.emptyState}>
                    <i className="fas fa-search"></i>
                    <p>No questions match your current filters</p>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Areas Grid */}
          <div className={styles.areasGrid}>
            {areas.map(area => (
              <Card 
                key={area.id} 
                variant="elevated" 
                padding="lg" 
                className={`${styles.areaCard} ${area.isComplete ? styles.complete : ''}`}
              >
                <div className={styles.areaHeader}>
                  <div className={styles.areaTitle}>
                    <h3>{area.title}</h3>
                    <div className={styles.areaStatus}>
                      <span className={styles.questionProgress}>
                        {area.assignedQuestions.length}/{area.questionCount} questions
                      </span>
                      {area.isComplete && (
                        <i className="fas fa-check-circle" style={{color: 'var(--color-primary-600)'}}></i>
                      )}
                    </div>
                  </div>
                  <div className={styles.areaActions}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditArea(area)}
                      className={styles.editButton}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteArea(area.id)}
                      className={styles.deleteButton}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>

                <div 
                  className={styles.dropZone}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (area.assignedQuestions.length < area.questionCount) {
                      e.currentTarget.classList.add(styles.dragOver);
                    } else {
                      e.currentTarget.classList.add(styles.dragOverFull);
                    }
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove(styles.dragOver);
                    e.currentTarget.classList.remove(styles.dragOverFull);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove(styles.dragOver);
                    e.currentTarget.classList.remove(styles.dragOverFull);
                    const question = JSON.parse(e.dataTransfer.getData('application/json'));
                    const alreadyAssigned = area.assignedQuestions.some(q => q.id === question.id);
                    if (area.assignedQuestions.length < area.questionCount && !alreadyAssigned) {
                      handleQuestionAssign(area.id, question);
                    }
                  }}
                >
                  {area.assignedQuestions.map(question => (
                    <div key={question.id} className={styles.assignedQuestion}>
                      <div className={styles.assignedQuestionContent}>
                        <div className={styles.assignedQuestionHeader}>
                          <h5>{question.title}</h5>
                          <span className={`${styles.levelBadge} ${styles[question.level.toLowerCase()]}`}>
                            {question.level}
                          </span>
                        </div>
                        <div className={styles.assignedQuestionMeta}>
                          <span className={styles.duration}>
                            <i className="fas fa-clock"></i>
                            {question.duration}
                          </span>
                          <span className={styles.jobRole}>
                            <i className="fas fa-user-tie"></i>
                            {question.jobRole}
                          </span>
                        </div>
                        <div className={styles.assignedQuestionSkills}>
                          {question.skills.map(skill => (
                            <span key={skill} className={styles.skillTag}>{skill}</span>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleQuestionRemove(area.id, question.id)}
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    </div>
                  ))}
                  
                  {area.assignedQuestions.length === 0 && (
                    <div className={styles.emptyDropZone}>
                      <i className="fas fa-arrow-down"></i>
                      <p>Drag questions here</p>
                      <span>({area.questionCount} questions needed)</span>
                    </div>
                  )}
                  
                  {area.assignedQuestions.length > 0 && area.assignedQuestions.length < area.questionCount && (
                    <div className={styles.addMoreZone}>
                      <i className="fas fa-plus"></i>
                      <span>Drop {area.questionCount - area.assignedQuestions.length} more questions</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className={styles.bottomActions}>
          {validationErrors.length > 0 && (
            <div className={styles.validationAlert}>
              <i className="fas fa-exclamation-triangle"></i>
              <div className={styles.validationMessages}>
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.actionButtons}>
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveAndContinue}
              disabled={validationErrors.length > 0}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>


      {/* Add Area Modal */}
      <Modal
        isOpen={isAddAreaModalOpen}
        onClose={() => setIsAddAreaModalOpen(false)}
        title="Add New Area"
        size="base"
      >
        <div className={styles.addAreaContent} onKeyPress={handleAddAreaKeyPress}>
          {areas.length >= 6 && (
            <div className={styles.limitMessage}>
              <i className="fas fa-info-circle"></i>
              <span>Maximum of 6 areas allowed. Delete an existing area to add a new one.</span>
            </div>
          )}
          <Input
            label="Area Title"
            placeholder="e.g. Data Structures, Algorithms, System Design"
            value={newAreaForm.title}
            onChange={(e) => {
              e.stopPropagation();
              setNewAreaForm(prev => ({
                ...prev,
                title: e.target.value
              }));
            }}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            required
          />
          <Input
            label="Number of Questions"
            type="number"
            min="1"
            max="50"
            value={newAreaForm.questionCount}
            onChange={(e) => {
              e.stopPropagation();
              setNewAreaForm(prev => ({
                ...prev,
                questionCount: e.target.value
              }));
            }}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onKeyPress={handleAddAreaKeyPress}
            helpText="How many questions should be assigned to this area?"
            required
          />
          <div className={styles.addAreaActions}>
            <Button 
              variant="ghost" 
              onClick={() => setIsAddAreaModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleAddArea}
              disabled={!newAreaForm.title.trim() || areas.length >= 6}
            >
              Add Area
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Area Modal */}
      <Modal
        isOpen={isEditAreaModalOpen}
        onClose={() => setIsEditAreaModalOpen(false)}
        title="Edit Area"
        size="base"
      >
        <div className={styles.addAreaContent}>
          <Input
            label="Area Title"
            placeholder="e.g. Data Structures, Algorithms, System Design"
            value={editingArea?.title || ''}
            onChange={(e) => {
              e.stopPropagation();
              setEditingArea(prev => ({
                ...prev,
                title: e.target.value
              }));
            }}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            required
          />
          <Input
            label="Number of Questions"
            type="number"
            min="1"
            max="50"
            value={editingArea?.questionCount || 1}
            onChange={(e) => {
              e.stopPropagation();
              setEditingArea(prev => ({
                ...prev,
                questionCount: e.target.value
              }));
            }}
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            helpText="How many questions should be assigned to this area?"
            required
          />
          <div className={styles.addAreaActions}>
            <Button 
              variant="ghost" 
              onClick={() => setIsEditAreaModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleUpdateArea}
              disabled={!editingArea?.title?.trim()}
            >
              Update Area
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BotInterviewAreaSkills;