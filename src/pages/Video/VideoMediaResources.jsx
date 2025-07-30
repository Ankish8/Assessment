import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompactHeader from '../../components/common/CompactHeader/CompactHeader';
import CompactProgressSteps from '../../components/common/CompactProgressSteps/CompactProgressSteps';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import styles from './VideoMediaResources.module.css';

const VideoMediaResources = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [candidateOptions, setCandidateOptions] = useState(['video']);
  const [minVideoLength, setMinVideoLength] = useState('40');
  const [maxVideoLength, setMaxVideoLength] = useState('120');
  const [candidateResources, setCandidateResources] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // Progress steps for Video Assessment
  const progressSteps = [
    { id: 'job-description', label: 'Add Job Description' },
    { id: 'questions', label: 'Questions' },
    { id: 'media-resources', label: 'Media & Resources' },
    { id: 'question-details', label: 'Question Details' },
    { id: 'evaluation-parameters', label: 'Evaluation Parameters' }
  ];

  const handleSaveAndContinue = () => {
    if (!isValid) return;
    // Navigate to next step - Question Details
    navigate('/video/question-details');
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e) => {
    handleFileUpload(e.target.files);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleOptionToggle = (option) => {
    setCandidateOptions(prev => 
      prev.includes(option) 
        ? prev.filter(opt => opt !== option)
        : [...prev, option]
    );
  };

  const handleAddResource = () => {
    // Trigger file input for candidate resources
    document.getElementById('resourceFileInput').click();
  };

  const handleResourceUpload = (files) => {
    const newResources = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setCandidateResources(prev => [...prev, ...newResources]);
  };

  const handleResourceInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleResourceUpload(e.target.files);
    }
  };

  const handleRemoveResource = (id) => {
    setCandidateResources(prev => prev.filter(resource => resource.id !== id));
  };

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
        currentStep={2}
      />

      <div className={styles.content}>
        <Card variant="elevated" padding="none" className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.sectionTitle}>
                <i className="fas fa-photo-video"></i>
                Media & Resources
              </h2>
            </div>
            <p className={styles.sectionDescription}>
              Add media (audio/videos) and resources related to the assessment problem. These will be shown to candidates during the test.
            </p>
          </div>

          <div className={styles.cardBody}>
            {/* Problem Media Section */}
            <div className={styles.mediaSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.subsectionTitle}>
                  <i className="fas fa-video"></i>
                  Problem Media
                </h3>
                <p className={styles.subsectionDescription}>
                  Upload audio or video files related to the assessment problem
                </p>
              </div>

              <div className={styles.uploadContainer}>
                <div 
                  className={`${styles.uploadArea} ${isDragOver ? styles.dragOver : ''} ${uploadedFile ? styles.hasFile : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!uploadedFile ? (
                    <>
                      <div className={styles.uploadIcon}>
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <h3 className={styles.uploadTitle}>Upload Media</h3>
                      <p className={styles.uploadDescription}>
                        Drag and drop audio/video files here or click to browse<br/>
                        <small>Supported formats: MP4, MP3, WAV, AVI</small>
                      </p>
                      <Button 
                        variant="primary" 
                        className={styles.uploadButton}
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        <i className="fas fa-upload"></i>
                        Upload Media
                      </Button>
                      <input
                        type="file"
                        id="fileInput"
                        accept="video/*,audio/*"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                      />
                    </>
                  ) : (
                    <div className={styles.uploadedFile}>
                      <div className={styles.fileInfo}>
                        <div className={styles.fileIcon}>
                          <i className={uploadedFile.type.startsWith('video/') ? "fas fa-video" : "fas fa-music"}></i>
                        </div>
                        <div className={styles.fileDetails}>
                          <h4 className={styles.fileName}>{uploadedFile.name}</h4>
                          <p className={styles.fileSize}>
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="small"
                        onClick={handleRemoveFile}
                        className={styles.removeButton}
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Problem Resources Section */}
            <div className={styles.resourcesSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.subsectionTitle}>
                  <i className="fas fa-file-alt"></i>
                  Problem Resources
                </h3>
                <p className={styles.subsectionDescription}>
                  Upload additional files and documents related to the assessment problem
                </p>
              </div>

                {candidateResources.length > 0 && (
                  <div className={styles.resourcesList}>
                    {candidateResources.map(resource => (
                      <div key={resource.id} className={styles.resourceItem}>
                        <div className={styles.resourceInfo}>
                          <div className={styles.resourceIcon}>
                            <i className="fas fa-file"></i>
                          </div>
                          <div className={styles.resourceDetails}>
                            <h4 className={styles.resourceName}>{resource.name}</h4>
                            <p className={styles.resourceSize}>
                              {(resource.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="small"
                          onClick={() => handleRemoveResource(resource.id)}
                          className={styles.removeResourceButton}
                        >
                          <i className="fas fa-times"></i>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

              <div className={styles.addResourcesSection}>
                <Button 
                  variant="ghost" 
                  className={styles.addResourcesButton}
                  onClick={handleAddResource}
                >
                  <i className="fas fa-plus"></i>
                  Add Problem Resources
                </Button>
              </div>

              {/* Hidden file input for resources */}
              <input
                type="file"
                id="resourceFileInput"
                multiple
                onChange={handleResourceInputChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Assessment Settings */}
            <div className={styles.optionsSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.subsectionTitle}>
                  <i className="fas fa-cog"></i>
                  Assessment Settings
                </h3>
                <p className={styles.subsectionDescription}>
                  Configure how candidates will interact with the assessment
                </p>
              </div>
              
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>Candidate can submit:</label>
                <div className={styles.optionsList}>
                  <label className={styles.optionItem}>
                    <input 
                      type="checkbox" 
                      checked={candidateOptions.includes('video')}
                      onChange={() => handleOptionToggle('video')}
                      className={styles.optionCheckbox}
                    />
                    <span className={styles.optionLabel}>Video Response</span>
                  </label>
                </div>
              </div>
              
              <div className={styles.settingGroup}>
                <label className={styles.settingLabel}>
                  Min Video Length Limit for Evaluation
                  <i className="fas fa-info-circle" title="Minimum video duration required"></i>
                </label>
                <select 
                  value={minVideoLength}
                  onChange={(e) => setMinVideoLength(e.target.value)}
                  className={styles.settingSelect}
                >
                  <option value="30">30 sec</option>
                  <option value="40">40 sec</option>
                  <option value="60">60 sec</option>
                  <option value="90">90 sec</option>
                  <option value="120">2 min</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

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

export default VideoMediaResources;