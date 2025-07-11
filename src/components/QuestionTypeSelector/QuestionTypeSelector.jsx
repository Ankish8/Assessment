import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionTypeSelector.module.css';

// Question type data organized by tabs
const submissionTypes = [
  {
    id: 'submission',
    title: 'General Submission',
    description: 'Accepts text, code, files, images, audio, and URLs.',
    iconClass: 'fas fa-file-alt',
    colorClass: 'iconSubmission',
    features: [
      'Text & code responses',
      'File uploads (documents, images)',
      'Audio recordings & URLs'
    ],
    route: '/submission-questions'
  },
  {
    id: 'fill-blanks',
    title: 'Fill in the Blanks',
    description: 'Test specific knowledge by completing missing parts of text or code.',
    iconClass: 'fas fa-pen',
    colorClass: 'iconBlanks',
    features: [
      'Targeted knowledge testing',
      'Quick to evaluate',
      'Reduces guessing'
    ],
    route: '/fill-in-the-blanks'
  },
  {
    id: 'ui-framework',
    title: 'Frontend Development',
    description: 'Code assessment using HTML, CSS, and JavaScript.',
    iconClass: 'fas fa-code',
    colorClass: 'iconUi',
    features: [
      'Live code editor',
      'Real-time preview',
      'Cross-browser testing'
    ],
    route: '/ui-framework'
  },
  {
    id: 'react-framework',
    title: 'React Development',
    description: 'Test React skills with components, hooks, and state management.',
    iconClass: 'fab fa-react',
    colorClass: 'iconReact',
    features: [
      'Component-based challenges',
      'Hooks & state management',
      'JSX & React ecosystem'
    ],
    route: '/question-details?type=react-framework'
  },
  {
    id: 'speaking',
    title: 'Speaking Assessment',
    description: 'Evaluate pronunciation, fluency, and speaking confidence.',
    iconClass: 'fas fa-microphone',
    colorClass: 'iconSpeaking',
    features: [
      'Pronunciation analysis',
      'Fluency & pace evaluation',
      'Confidence scoring'
    ],
    route: '/speaking/question-statement'
  },
  {
    id: 'reading',
    title: 'Reading Comprehension',
    description: 'Test reading skills through passages and comprehension questions.',
    iconClass: 'fas fa-book',
    colorClass: 'iconReading',
    features: [
      'Passage-based questions',
      'Comprehension analysis',
      'Vocabulary assessment'
    ],
    route: '/question-details?type=reading'
  },
  {
    id: 'video',
    title: 'Video Presentation',
    description: 'Assess presentation skills and communication through video recording.',
    iconClass: 'fas fa-video',
    colorClass: 'iconVideo',
    features: [
      'Video recording & playback',
      'Presentation skills analysis',
      'Body language assessment'
    ],
    route: '/video/job-description'
  }
];

const interviewTypes = [
  {
    id: 'bot-interview',
    title: 'Structured Bot Interview',
    description: 'Standardized interview with consistent questions and evaluation.',
    iconClass: 'fas fa-robot',
    colorClass: 'iconBot',
    features: [
      'Consistent question set',
      'Standardized evaluation',
      'Bias-free assessment'
    ],
    route: '/question-details?type=bot-interview'
  },
  {
    id: 'ai-interview',
    title: 'Adaptive AI Interview',
    description: 'Dynamic interview that adapts questions based on responses.',
    iconClass: 'fas fa-brain',
    colorClass: 'iconAi',
    features: [
      'Dynamic question generation',
      'Adaptive difficulty levels',
      'Personalized experience'
    ],
    route: '/question-details?type=ai-interview'
  }
];

const QuestionTypeSelector = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('submission');
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (questionType) => {
    // Navigate immediately without setting selected state to avoid purple flash
    navigate(questionType.route);
  };

  const handleTabSwitch = (tabId) => {
    setActiveTab(tabId);
    setSelectedType(null);
  };

  const renderCard = (questionType, index) => (
    <div
      key={questionType.id}
      className={`${styles.card} ${selectedType === questionType.id ? styles.selected : ''}`}
      tabIndex={0}
      role="button"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseDown={(e) => e.preventDefault()} // Prevent default mouse down behavior
      onClick={(e) => {
        e.preventDefault();
        handleTypeSelect(questionType);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTypeSelect(questionType);
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles[questionType.colorClass]}`}>
          <i className={questionType.iconClass}></i>
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{questionType.title}</h3>
          <p className={styles.cardDescription}>{questionType.description}</p>
          <ul className={styles.cardFeatures}>
            {questionType.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>
          <i 
            className={`fas fa-arrow-left ${styles.backIcon}`}
            onClick={() => navigate(-1)}
            role="button"
            tabIndex={0}
            aria-label="Go back"
          ></i>
          Create Assessment
        </h1>
        <p className={styles.mainSubtitle}>
          Choose the assessment type that best fits your evaluation needs
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${activeTab === 'submission' ? styles.active : ''}`}
          onClick={() => handleTabSwitch('submission')}
          aria-label="Submission Type assessments"
        >
          <i className="fas fa-clipboard-list"></i> Submission Type
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'interview' ? styles.active : ''}`}
          onClick={() => handleTabSwitch('interview')}
          aria-label="Interview Type assessments"
        >
          <i className="fas fa-comments"></i> Interview Type
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Submission Type Tab */}
        <div className={`${styles.tabPanel} ${activeTab === 'submission' ? styles.active : ''}`}>
          <div className={styles.tabPanelInner}>
            <div className={styles.grid}>
              {submissionTypes.map((type, index) => renderCard(type, index))}
            </div>
          </div>
        </div>

        {/* Interview Type Tab */}
        <div className={`${styles.tabPanel} ${activeTab === 'interview' ? styles.active : ''}`}>
          <div className={styles.tabPanelInner}>
            <div className={styles.grid}>
              {interviewTypes.map((type, index) => renderCard(type, index))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;