import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../components/common/CompactHeader/CompactHeader';
import CompactProgressSteps from '../../components/common/CompactProgressSteps/CompactProgressSteps';
import Tab from '../../components/common/Tab/Tab';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import SubPartCard from './components/SubPartCard/SubPartCard';
import HelpModal from './components/HelpModal/HelpModal';
import styles from './VideoQuestions.module.css';

const VideoQuestions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('management');
  const [managementSubParts, setManagementSubParts] = useState([]);
  const [professionalSubParts, setProfessionalSubParts] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [nextSubPartId, setNextSubPartId] = useState(1);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Progress steps for Video Assessment
  const progressSteps = [
    { id: 'job-description', label: 'Add Job Description' },
    { id: 'questions', label: 'Questions' },
    { id: 'media-resources', label: 'Media & Resources' },
    { id: 'question-details', label: 'Question Details' },
    { id: 'evaluation-parameters', label: 'Evaluation Parameters' }
  ];

  const tabs = [
    { id: 'management', label: 'Management Questions', icon: 'fas fa-users' },
    { id: 'professional', label: 'Professional Questions', icon: 'fas fa-briefcase' }
  ];

  const handleTabChange = (index, tabId) => {
    setActiveTab(tabId);
  };

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step - Media & Resources
    navigate('/video/media-resources');
  };

  // Sub part management functions
  const createNewSubPart = () => ({
    id: nextSubPartId,
    title: '',
    description: '',
    skills: [],
    allocatedTime: 1,
    category: activeTab,
    isEditing: true
  });

  const handleAddSubPart = () => {
    const newSubPart = createNewSubPart();
    setNextSubPartId(prev => prev + 1);
    
    if (activeTab === 'management') {
      setManagementSubParts(prev => [...prev, newSubPart]);
    } else {
      setProfessionalSubParts(prev => [...prev, newSubPart]);
    }
  };

  const handleUpdateSubPart = (id, updates) => {
    const updateSubParts = (subParts) => 
      subParts.map(part => part.id === id ? { ...part, ...updates } : part);
    
    if (activeTab === 'management') {
      setManagementSubParts(updateSubParts);
    } else {
      setProfessionalSubParts(updateSubParts);
    }
  };

  const handleDeleteSubPart = (id) => {
    const filterSubParts = (subParts) => subParts.filter(part => part.id !== id);
    
    if (activeTab === 'management') {
      setManagementSubParts(filterSubParts);
    } else {
      setProfessionalSubParts(filterSubParts);
    }
  };

  const getCurrentSubParts = () => {
    return activeTab === 'management' ? managementSubParts : professionalSubParts;
  };

  const getTotalTime = () => {
    const allSubParts = [...managementSubParts, ...professionalSubParts];
    return allSubParts.reduce((total, part) => total + part.allocatedTime, 0);
  };

  // Drag and drop handlers
  const handleDragStart = (e, subPartId) => {
    e.dataTransfer.setData('text/plain', subPartId.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (draggedId === targetId) return; // Same position
    
    const currentSubParts = getCurrentSubParts();
    const draggedIndex = currentSubParts.findIndex(part => part.id === draggedId);
    const targetIndex = currentSubParts.findIndex(part => part.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    // Reorder the array
    const newSubParts = [...currentSubParts];
    const [draggedItem] = newSubParts.splice(draggedIndex, 1);
    newSubParts.splice(targetIndex, 0, draggedItem);
    
    // Update the appropriate state
    if (activeTab === 'management') {
      setManagementSubParts(newSubParts);
    } else {
      setProfessionalSubParts(newSubParts);
    }
  };

  // Calculate validation state with detailed feedback
  const getValidationMessage = () => {
    const totalSubParts = managementSubParts.length + professionalSubParts.length;
    if (totalSubParts === 0) {
      return "Please add at least one sub part to continue";
    }

    const validManagementParts = managementSubParts.filter(part => 
      part.title.trim() && part.skills.length > 0 && part.allocatedTime > 0
    );
    const validProfessionalParts = professionalSubParts.filter(part => 
      part.title.trim() && part.skills.length > 0 && part.allocatedTime > 0
    );
    
    const incompleteManagement = managementSubParts.length - validManagementParts.length;
    const incompleteProfessional = professionalSubParts.length - validProfessionalParts.length;
    
    if (incompleteManagement > 0 || incompleteProfessional > 0) {
      const total = incompleteManagement + incompleteProfessional;
      return `${total} sub part${total > 1 ? 's' : ''} need${total === 1 ? 's' : ''} completion (title and skills required)`;
    }

    if (validManagementParts.length === 0 && validProfessionalParts.length === 0) {
      return "Please complete at least one sub part to continue";
    }

    return null; // Valid state
  };

  React.useEffect(() => {
    const validationMessage = getValidationMessage();
    setIsValid(!validationMessage);
  }, [managementSubParts, professionalSubParts]);

  return (
    <div className={styles.container}>
      {/* Use CompactHeader component */}
      <CompactHeader 
        title="Video Assessment" 
        icon="fas fa-video"
        onBack={() => navigate(-1)}
      />

      {/* Use CompactProgressSteps component */}
      <CompactProgressSteps 
        steps={progressSteps}
        currentStep={1}
      />

      <div className={styles.content}>
        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <Tab 
            tabs={tabs}
            defaultActiveTab={0}
            onChange={handleTabChange}
            className={styles.questionTabs}
          />
        </div>

        {/* Main Questions Section */}
        <Card variant="elevated" padding="none" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>
                {activeTab === 'management' ? 'Management Questions' : 'Professional Questions'}
              </h2>
              <div className={styles.helpSection}>
                <Button 
                  variant="ghost" 
                  size="small"
                  onClick={() => setIsHelpModalOpen(true)}
                >
                  <i className="fas fa-question-circle"></i>
                  Help
                </Button>
              </div>
            </div>
            <p className={styles.sectionDescription}>
              {activeTab === 'management' 
                ? 'Focus on assessing soft skills like communication, teamwork, leadership, and conflict resolution.'
                : 'Assess technical expertise, problem-solving abilities, and job-specific competencies.'
              }
            </p>
          </div>

          {/* Sub Parts Section */}
          <div className={styles.subPartsSection}>
            <div className={styles.subPartsHeader}>
              <h3 className={styles.subPartsTitle}>Sub Parts</h3>
              <Button 
                variant="primary"
                size="small"
                onClick={handleAddSubPart}
              >
                <i className="fas fa-plus"></i>
                Add Sub Part
              </Button>
            </div>


            {/* Sub Parts List */}
            <div className={styles.subPartsList}>
              {getCurrentSubParts().length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <h4>No sub parts added yet</h4>
                  <p>Create your first sub part to get started with {activeTab === 'management' ? 'management' : 'professional'} questions.</p>
                  <Button 
                    variant="primary"
                    onClick={handleAddSubPart}
                  >
                    <i className="fas fa-plus"></i>
                    Add Sub Part
                  </Button>
                </div>
              ) : (
                <div className={styles.subPartsGrid}>
                  {getCurrentSubParts().map(subPart => (
                    <SubPartCard
                      key={subPart.id}
                      subPart={subPart}
                      onUpdate={handleUpdateSubPart}
                      onDelete={handleDeleteSubPart}
                      onSave={(id, data) => {
                        // Handle successful save
                        console.log('Sub part saved:', id, data);
                      }}
                      onCancel={(id) => {
                        // Handle cancel editing
                        console.log('Editing cancelled for:', id);
                      }}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      isDraggable={!subPart.isEditing}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bottom Actions - Same as Step 1 */}
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
              disabled={!isValid}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        questionType={activeTab}
      />
    </div>
  );
};

export default VideoQuestions;