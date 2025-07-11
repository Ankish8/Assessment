import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Modal from '../../components/common/Modal/Modal';
import styles from './VideoQuestionsSimple.module.css';

const VideoQuestionsSimple = () => {
  const navigate = useNavigate();
  
  // State for questions
  const [managementQuestions, setManagementQuestions] = useState([]);
  
  const [professionalQuestions, setProfessionalQuestions] = useState([]);

  // UI State
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formQuestionType, setFormQuestionType] = useState('management');
  
  // Form state
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    skills: '',
    description: '',
    timeAllocation: 3
  });

  const handleSaveAndContinue = () => {
    navigate('/video/media-resources');
  };

  const handleAddQuestion = () => {
    const question = {
      id: Date.now(),
      title: newQuestion.title,
      skills: newQuestion.skills.split(',').map(s => s.trim()).filter(s => s),
      description: newQuestion.description,
      timeAllocation: parseInt(newQuestion.timeAllocation)
    };

    if (editingQuestion) {
      // Update existing question
      if (formQuestionType === 'management') {
        setManagementQuestions(prev => prev.map(q => q.id === editingQuestion.id ? question : q));
      } else {
        setProfessionalQuestions(prev => prev.map(q => q.id === editingQuestion.id ? question : q));
      }
    } else {
      // Add new question
      if (formQuestionType === 'management') {
        setManagementQuestions(prev => [...prev, question]);
      } else {
        setProfessionalQuestions(prev => [...prev, question]);
      }
    }

    // Reset form
    setNewQuestion({
      title: '',
      skills: '',
      description: '',
      timeAllocation: 3
    });
    setEditingQuestion(null);
    setShowAddForm(false);
  };

  const handleEditQuestion = (question, type) => {
    setNewQuestion({
      title: question.title,
      skills: question.skills.join(', '),
      description: question.description,
      timeAllocation: question.timeAllocation
    });
    setEditingQuestion(question);
    setFormQuestionType(type);
    setShowAddForm(true);
  };

  const handleDeleteQuestion = (questionId, type) => {
    if (type === 'management') {
      setManagementQuestions(prev => prev.filter(q => q.id !== questionId));
    } else {
      setProfessionalQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  const handleAddSubPart = (type) => {
    setFormQuestionType(type);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setNewQuestion({
      title: '',
      skills: '',
      description: '',
      timeAllocation: 3
    });
    setEditingQuestion(null);
    setShowAddForm(false);
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

      {/* Compact Progress Steps */}
      <div className={styles.compactProgress}>
        <div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepIndicator} ${styles.completed}`}>
              <i className="fas fa-check"></i>
            </div>
            <span className={styles.stepLabel}>Add Job Description</span>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className={`${styles.progressStep} ${styles.current}`}>
            <div className={`${styles.stepIndicator} ${styles.active}`}>
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
        <Card variant="elevated" padding="none" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>Video Assessment Questions</h2>
              <div className={styles.headerActions}>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setIsHelpModalOpen(true)}
                  className={styles.helpButton}
                >
                  Help <i className="fas fa-question-circle"></i>
                </Button>
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className={styles.addFormContainer}>
              <div className={styles.formHeader}>
                <h4 className={styles.formTitle}>
                  {editingQuestion ? 'Edit Question' : `Add ${formQuestionType === 'management' ? 'Leadership' : 'Technical'} Question`}
                </h4>
                <button
                  className={styles.closeFormButton}
                  onClick={handleCancelForm}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className={styles.formContent}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Question Title <i className="fas fa-info-circle" title="Write a clear, specific question you want to ask the candidate."></i>
                  </label>
                  <Input
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={formQuestionType === 'management' ? 'e.g., Describe your leadership style' : 'e.g., Explain your experience with React'}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {formQuestionType === 'management' ? 'Select Leadership Skills' : 'Select Technical Skills'} <i className="fas fa-info-circle" title={formQuestionType === 'management' ? 'Choose soft skills like communication, teamwork, or leadership.' : 'Choose technical skills like programming languages, tools, or frameworks.'}></i>
                  </label>
                  <Input
                    value={newQuestion.skills}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, skills: e.target.value }))}
                    placeholder={formQuestionType === 'management' ? 'e.g., Leadership, Communication, Teamwork' : 'e.g., React, JavaScript, Problem Solving'}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Question Description <i className="fas fa-info-circle" title="Provide context or specific instructions for how the candidate should answer."></i>
                  </label>
                  <textarea
                    className={styles.textArea}
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={formQuestionType === 'management' ? 'e.g., Share a specific example of when you led a team through a challenging situation...' : 'e.g., Walk us through your approach to solving a complex technical problem...'}
                    rows={4}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Response Time (minutes) <i className="fas fa-info-circle" title="How long should the candidate have to answer this question?"></i>
                  </label>
                  <div className={styles.timeControl}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="time"
                        value="1"
                        checked={newQuestion.timeAllocation === 1}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, timeAllocation: 1 }))}
                      />
                      1 min
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="time"
                        value="3"
                        checked={newQuestion.timeAllocation === 3}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, timeAllocation: 3 }))}
                      />
                      3 min
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="time"
                        value="5"
                        checked={newQuestion.timeAllocation === 5}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, timeAllocation: 5 }))}
                      />
                      5 min
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button variant="secondary" onClick={handleCancelForm}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddQuestion}>
                    {editingQuestion ? 'Update' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Management Questions Section */}
          <div className={styles.questionSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionSubTitle}>
                Leadership & Soft Skills <i className="fas fa-info-circle" title="Assess communication, teamwork, leadership, and interpersonal abilities."></i>
              </h3>
              <Button
                variant="secondary"
                size="small"
                onClick={() => handleAddSubPart('management')}
              >
                Add Question
              </Button>
            </div>

            <div className={styles.questionsList}>
              {managementQuestions.map((question) => (
                <div key={question.id} className={styles.questionItem}>
                  <div className={styles.questionHeader}>
                    <h4 className={styles.questionTitle}>{question.title}</h4>
                    <div className={styles.questionActions}>
                      <span className={styles.timeAllocation}>{question.timeAllocation} min</span>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEditQuestion(question, 'management')}
                        title="Edit question"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteQuestion(question.id, 'management')}
                        title="Delete question"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  {question.skills.length > 0 && (
                    <div className={styles.questionSkills}>
                      {question.skills.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  )}
                  {question.description && (
                    <div className={styles.questionDescription}>
                      {question.description}
                    </div>
                  )}
                </div>
              ))}
              
              {managementQuestions.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No leadership & soft skills questions added yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Professional Questions Section */}
          <div className={styles.questionSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionSubTitle}>
                Technical & Job Skills <i className="fas fa-info-circle" title="Evaluate technical expertise, tools, and job-specific knowledge."></i>
              </h3>
              <Button
                variant="secondary"
                size="small"
                onClick={() => handleAddSubPart('professional')}
              >
                Add Question
              </Button>
            </div>

            <div className={styles.questionsList}>
              {professionalQuestions.map((question) => (
                <div key={question.id} className={styles.questionItem}>
                  <div className={styles.questionHeader}>
                    <h4 className={styles.questionTitle}>{question.title}</h4>
                    <div className={styles.questionActions}>
                      <span className={styles.timeAllocation}>{question.timeAllocation} min</span>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEditQuestion(question, 'professional')}
                        title="Edit question"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDeleteQuestion(question.id, 'professional')}
                        title="Delete question"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  {question.skills.length > 0 && (
                    <div className={styles.questionSkills}>
                      {question.skills.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  )}
                  {question.description && (
                    <div className={styles.questionDescription}>
                      {question.description}
                    </div>
                  )}
                </div>
              ))}
              
              {professionalQuestions.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No technical & job skills questions added yet.</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Help Modal */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="How to Structure Your Interview Questions"
        size="small"
      >
        <div className={styles.helpContent}>
          <div className={styles.helpSection}>
            <h4>Leadership & Soft Skills</h4>
            <p>Ask about communication, teamwork, leadership, and problem-solving.<br/>
            Perfect for assessing how candidates work with others and handle challenges.</p>
          </div>
          <div className={styles.helpSection}>
            <h4>Technical & Job Skills</h4>
            <p>Focus on technical expertise, tools, and job-specific knowledge.<br/>
            Evaluate candidates' ability to perform the actual work required for the role.</p>
          </div>
          <div className={styles.helpActions}>
            <Button variant="primary" onClick={() => setIsHelpModalOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        <div className={styles.leftActions}>
          <Button 
            variant="secondary" 
            onClick={() => navigate(-1)}
          >
            Previous
          </Button>
        </div>
        
        <div className={styles.rightActions}>
          <Button 
            variant="primary" 
            onClick={handleSaveAndContinue}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoQuestionsSimple;