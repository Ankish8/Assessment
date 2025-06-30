import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import FloatingFooter from '../../components/common/FloatingFooter/FloatingFooter';
import ResponsiveProgressSteps from '../../components/common/ResponsiveProgressSteps/ResponsiveProgressSteps';
import styles from './SolutionDetails.module.css';
import '../../styles/utilities.css';

const SolutionDetails = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [solutionData, setSolutionData] = useState({
    textSolution: '',
    codeSolution: '',
    codeLanguage: 'javascript',
    resourceUrl: '',
    uploadedFiles: []
  });
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const steps = [
    { id: 'statement', label: 'Question Statement' },
    { id: 'media', label: 'Media & Resources' },
    { id: 'details', label: 'Question Details' },
    { id: 'evaluation', label: 'Evaluation Parameters' },
    { id: 'solution', label: 'Solution Details (Optional)' }
  ];

  const solutionTypes = [
    {
      id: 'text',
      title: 'Written Explanation',
      description: 'Provide a detailed written solution with explanations and methodology',
      icon: 'fas fa-file-alt',
      color: 'primary'
    },
    {
      id: 'code',
      title: 'Code Solution',
      description: 'Provide working code that solves the problem',
      icon: 'fas fa-code',
      color: 'success'
    },
    {
      id: 'resource',
      title: 'External Resource',
      description: 'Link to external documentation or tutorials',
      icon: 'fas fa-external-link-alt',
      color: 'info'
    },
    {
      id: 'files',
      title: 'File Attachments',
      description: 'Upload documents, diagrams, or images',
      icon: 'fas fa-paperclip',
      color: 'warning'
    }
  ];

  const codeLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' }
  ];

  // Validation
  useEffect(() => {
    const newErrors = {};
    
    // Since solution types are optional, only validate if types are selected
    if (selectedTypes.length > 0) {
      if (selectedTypes.includes('text') && !solutionData.textSolution.trim()) {
        newErrors.textSolution = 'Written explanation is required';
      }
      if (selectedTypes.includes('code') && !solutionData.codeSolution.trim()) {
        newErrors.codeSolution = 'Code solution is required';
      }
      if (selectedTypes.includes('resource') && !solutionData.resourceUrl.trim()) {
        newErrors.resourceUrl = 'Resource URL is required';
      }
      if (selectedTypes.includes('files') && solutionData.uploadedFiles.length === 0) {
        newErrors.files = 'Please upload at least one file';
      }
    }

    setErrors(newErrors);
  }, [selectedTypes, solutionData]);

  const handleTypeToggle = (typeId) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleInputChange = (field, value) => {
    setSolutionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files) => {
    setSolutionData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...Array.from(files)]
    }));
  };

  const removeFile = (index) => {
    setSolutionData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSaveAndContinue = () => {
    setHasAttemptedSubmit(true);
    if (selectedTypes.length > 0 && Object.keys(errors).length > 0) return;
    
    console.log('Saving solution data:', { selectedTypes, solutionData });
    navigate('/questions');
  };

  const handlePrevious = () => {
    navigate('/evaluation-parameters');
  };

  const isValid = selectedTypes.length === 0 || Object.keys(errors).length === 0;

  return (
    <div className={styles.container}>
      <Header title="Submission Questions" />
      
      <div className={styles.progressContainer}>
        <ResponsiveProgressSteps steps={steps} currentStep={5} />
      </div>

      <div className={`${styles.content} floating-footer-spacing`}>
        <div className={styles.mainLayout}>
          {/* Left Panel - Solution Type Selection */}
          <div className={styles.leftPanel}>
            <Card variant="elevated" padding="lg" className={styles.selectionCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Solution Content</h3>
                <p className={styles.cardDescription}>
                  Select solution types to provide additional content that helps students understand your approach.
                </p>
              </div>

              <div className={styles.typeSelection}>
                {solutionTypes.map(type => (
                  <div
                    key={type.id}
                    className={`${styles.typeOption} ${selectedTypes.includes(type.id) ? styles.selected : ''}`}
                    onClick={() => handleTypeToggle(type.id)}
                  >
                    <div className={styles.optionContent}>
                      <div className={`${styles.optionIcon} ${styles[`color-${type.color}`]}`}>
                        <i className={type.icon}></i>
                      </div>
                      <div className={styles.optionInfo}>
                        <h4 className={styles.optionTitle}>{type.title}</h4>
                        <p className={styles.optionDescription}>{type.description}</p>
                      </div>
                      <div className={styles.checkboxWrapper}>
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.id)}
                          onChange={() => handleTypeToggle(type.id)}
                          onClick={(e) => e.stopPropagation()}
                          className={styles.checkbox}
                        />
                        <div className={styles.checkmark}>
                          <i className="fas fa-check"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </Card>
          </div>

          {/* Right Panel - Solution Content Forms */}
          <div className={styles.rightPanel}>
            {/* Optional Step Notice */}
            <div className={styles.optionalNotice}>
              <div className={styles.optionalIcon}>
                <i className="fas fa-info-circle"></i>
              </div>
              <div className={styles.optionalContent}>
                <h4 className={styles.optionalTitle}>This step is optional!</h4>
                <p className={styles.optionalText}>
                  You can skip to the next step or select solution types from the left to provide additional content.
                </p>
              </div>
            </div>
            
            {selectedTypes.length === 0 ? (
              <div className={styles.previewArea}>
                <div className={styles.previewHeader}>
                  <p className={styles.previewDescription}>
                    Select solution types from the left panel to provide additional content for your question
                  </p>
                </div>
                
                <div className={styles.benefitCards}>
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className={styles.benefitContent}>
                      <h4>Enhanced Learning</h4>
                      <p>Multiple solution formats help students with different learning styles</p>
                    </div>
                  </div>
                  
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <div className={styles.benefitContent}>
                      <h4>Clear Understanding</h4>
                      <p>Step-by-step explanations make complex problems easier to grasp</p>
                    </div>
                  </div>
                  
                  <div className={styles.benefitCard}>
                    <div className={styles.benefitIcon}>
                      <i className="fas fa-code"></i>
                    </div>
                    <div className={styles.benefitContent}>
                      <h4>Practical Examples</h4>
                      <p>Working code and resources provide hands-on learning opportunities</p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.previewFooter}>
                  <div className={styles.arrow}>
                    <i className="fas fa-arrow-left"></i>
                  </div>
                  <span className={styles.footerText}>Optional: Select solution types from the left or skip this step</span>
                </div>
              </div>
            ) : (
              <div className={styles.solutionForms}>
                {selectedTypes.includes('text') && (
                  <Card variant="elevated" padding="lg" className={styles.contentCard}>
                    <div className={styles.formHeader}>
                      <h3 className={styles.contentTitle}>
                        <i className="fas fa-file-alt"></i>
                        Written Explanation
                      </h3>
                    </div>
                    
                    <div className={styles.editorContainer}>
                      <textarea
                        className={styles.textEditor}
                        placeholder="Write your detailed solution here. Include methodology, key concepts, and step-by-step explanations..."
                        value={solutionData.textSolution}
                        onChange={(e) => handleInputChange('textSolution', e.target.value)}
                        rows={8}
                      />
                      <div className={styles.editorFooter}>
                        <span className={styles.characterCount}>
                          {solutionData.textSolution.length} characters
                        </span>
                      </div>
                    </div>
                    
                    {errors.textSolution && hasAttemptedSubmit && (
                      <div className={styles.errorMessage}>
                        <i className="fas fa-exclamation-triangle"></i>
                        {errors.textSolution}
                      </div>
                    )}
                  </Card>
                )}

                {selectedTypes.includes('code') && (
                  <Card variant="elevated" padding="lg" className={styles.contentCard}>
                    <div className={styles.formHeader}>
                      <h3 className={styles.contentTitle}>
                        <i className="fas fa-code"></i>
                        Code Solution
                      </h3>
                    </div>
                    
                    <div className={styles.codeSection}>
                      <div className={styles.languageSelector}>
                        <label className={styles.label}>Programming Language</label>
                        <select
                          value={solutionData.codeLanguage}
                          onChange={(e) => handleInputChange('codeLanguage', e.target.value)}
                          className={styles.languageSelect}
                        >
                          {codeLanguages.map(lang => (
                            <option key={lang.value} value={lang.value}>
                              {lang.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className={styles.codeEditorContainer}>
                        <textarea
                          className={styles.codeEditor}
                          placeholder={`// Write your ${codeLanguages.find(l => l.value === solutionData.codeLanguage)?.label || 'code'} solution here\n// Include comments to explain the logic\n\nfunction solution() {\n  // Your implementation\n}`}
                          value={solutionData.codeSolution}
                          onChange={(e) => handleInputChange('codeSolution', e.target.value)}
                          rows={12}
                          spellCheck="false"
                        />
                      </div>
                    </div>
                    
                    {errors.codeSolution && hasAttemptedSubmit && (
                      <div className={styles.errorMessage}>
                        <i className="fas fa-exclamation-triangle"></i>
                        {errors.codeSolution}
                      </div>
                    )}
                  </Card>
                )}

                {selectedTypes.includes('resource') && (
                  <Card variant="elevated" padding="lg" className={styles.contentCard}>
                    <div className={styles.formHeader}>
                      <h3 className={styles.contentTitle}>
                        <i className="fas fa-external-link-alt"></i>
                        External Resource
                      </h3>
                    </div>
                    
                    <Input
                      label="Resource URL"
                      placeholder="https://example.com/resource"
                      value={solutionData.resourceUrl}
                      onChange={(e) => handleInputChange('resourceUrl', e.target.value)}
                      error={errors.resourceUrl && hasAttemptedSubmit ? errors.resourceUrl : null}
                      startIcon={<i className="fas fa-link"></i>}
                    />
                  </Card>
                )}

                {selectedTypes.includes('files') && (
                  <Card variant="elevated" padding="lg" className={styles.contentCard}>
                    <div className={styles.formHeader}>
                      <h3 className={styles.contentTitle}>
                        <i className="fas fa-paperclip"></i>
                        File Attachments
                      </h3>
                    </div>
                    
                    <div className={styles.fileUploadSection}>
                      <div className={styles.uploadArea}>
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className={styles.fileInput}
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className={styles.uploadLabel}>
                          <i className="fas fa-cloud-upload-alt"></i>
                          <span>Click to upload files or drag and drop</span>
                          <small>Supports images, documents, and other file types</small>
                        </label>
                      </div>
                      
                      {solutionData.uploadedFiles.length > 0 && (
                        <div className={styles.fileList}>
                          {solutionData.uploadedFiles.map((file, index) => (
                            <div key={index} className={styles.fileItem}>
                              <i className="fas fa-file"></i>
                              <span className={styles.fileName}>{file.name}</span>
                              <button
                                onClick={() => removeFile(index)}
                                className={styles.removeFile}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {errors.files && hasAttemptedSubmit && (
                      <div className={styles.errorMessage}>
                        <i className="fas fa-exclamation-triangle"></i>
                        {errors.files}
                      </div>
                    )}
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <FloatingFooter
        hasValidationAlert={selectedTypes.length > 0}
        validationMessage="Please complete all selected solution types"
        showAlert={!isValid && hasAttemptedSubmit && selectedTypes.length > 0}
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
          disabled={!isValid && selectedTypes.length > 0}
          className={styles.saveButton}
        >
          {selectedTypes.length === 0 ? 'Skip & Continue' : 'Complete & Save'}
          <i className={selectedTypes.length === 0 ? 'fas fa-arrow-right' : 'fas fa-check'}></i>
        </Button>
      </FloatingFooter>
    </div>
  );
};

export default SolutionDetails;