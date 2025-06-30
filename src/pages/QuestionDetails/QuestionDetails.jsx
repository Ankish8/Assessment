import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import ProgressSteps from '../../components/common/ProgressSteps';
import BottomActions from '../../components/common/BottomActions';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import SkillsInput from './components/SkillsInput/SkillsInput';
import SkillsModal from './components/SkillsModal/SkillsModal';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import { PROGRESS_STEPS, STEP_NUMBERS } from '../../constants/progressSteps';
import styles from './QuestionDetails.module.css';

const QuestionDetails = () => {
  const navigate = useNavigate();
  
  // Form state
  const [questionTitle, setQuestionTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([
    'CPP', 'JAVA', 'PYTHON', 'JS', 'C', 'C#', 'GO', 'PHP', 'RUBY', 'SWIFT', 'KOTLIN', 'SCALA'
  ]);
  const [difficulty, setDifficulty] = useState('easy');
  const [marks, setMarks] = useState('');
  const [provider, setProvider] = useState('');
  const [author, setAuthor] = useState('');
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      // Navigate to Solution Details (Step 5) - not implemented yet
      alert('Solution Details page will be implemented next.');
    }, 1000);
  };

  const handlePrevious = () => {
    navigate('/default-codes');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <Header title="Question Details" onBack={handlePrevious} />
        <ProgressSteps steps={PROGRESS_STEPS} currentStep={STEP_NUMBERS.QUESTION_DETAILS} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.sectionTitle}>
            Question Details
            <div className={styles.infoIcon}>?</div>
          </h2>
          <p className={styles.sectionDescription}>
            Configure the basic settings and metadata for your coding question.
          </p>
        </div>

        <div className={styles.contentBody}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Question Title Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Question Title</h3>
                <p className={styles.fieldDescription}>
                  Give your coding question a clear, descriptive title
                </p>
              </div>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter question title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </div>

            {/* Skills Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Skills</h3>
                <p className={styles.fieldDescription}>
                  Add relevant programming skills and topics
                </p>
              </div>
              <SkillsInput
                selectedSkills={selectedSkills}
                onOpenModal={() => setShowSkillsModal(true)}
                onRemoveSkill={(skill) => 
                  setSelectedSkills(selectedSkills.filter(s => s !== skill))
                }
              />
            </div>

            {/* Languages Allowed Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Languages Allowed</h3>
                <p className={styles.fieldDescription}>
                  Select programming languages allowed for this question
                </p>
              </div>
              <LanguageSelector
                selectedLanguages={selectedLanguages}
                onLanguageToggle={(language) => {
                  if (selectedLanguages.includes(language)) {
                    setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                  } else {
                    setSelectedLanguages([...selectedLanguages, language]);
                  }
                }}
                onSelectAll={(languages) => setSelectedLanguages(languages)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Difficulty Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Difficulty</h3>
                <p className={styles.fieldDescription}>
                  Set the complexity level for this question
                </p>
              </div>
              <DifficultySelector
                selectedDifficulty={difficulty}
                onDifficultyChange={setDifficulty}
              />
            </div>

            {/* Marks Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Marks</h3>
                <p className={styles.fieldDescription}>
                  Total points awarded for this question
                </p>
              </div>
              <input
                type="number"
                className={styles.formInput}
                placeholder="Enter marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
            </div>

            {/* Provider Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Provider</h3>
                <p className={styles.fieldDescription}>
                  Organization or platform providing this question
                </p>
              </div>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter provider name"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
            </div>

            {/* Author Card */}
            <div className={styles.fieldCard}>
              <div className={styles.fieldHeader}>
                <h3 className={styles.fieldTitle}>Author</h3>
                <p className={styles.fieldDescription}>
                  Person who created this question
                </p>
              </div>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

        {/* Skills Modal */}
        {showSkillsModal && (
          <SkillsModal
            selectedSkills={selectedSkills}
            onClose={() => setShowSkillsModal(false)}
            onSkillsChange={setSelectedSkills}
          />
        )}
      </div>
      
      <BottomActions
        onPrevious={handlePrevious}
        onNext={handleSaveAndContinue}
        nextLabel={isSaving ? 'Saving...' : 'Save & Continue'}
        nextDisabled={isSaving}
      />
    </div>
  );
};

export default QuestionDetails;