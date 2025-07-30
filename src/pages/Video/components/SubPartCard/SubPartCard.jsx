import React, { useState, useEffect } from 'react';
import Input from '../../../../components/common/Input/Input';
import Button from '../../../../components/common/Button/Button';
import SkillsInput from '../../../QuestionDetails/components/SkillsInput/SkillsInput';
import SkillsModal from '../SkillsModal/SkillsModal';
import styles from './SubPartCard.module.css';

const SubPartCard = ({ 
  subPart, 
  onUpdate, 
  onDelete, 
  onSave, 
  onCancel,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggable = true
}) => {
  const [isEditing, setIsEditing] = useState(subPart.isEditing || false);
  const [formData, setFormData] = useState({
    title: subPart.title || '',
    description: subPart.description || '',
    skills: subPart.skills || [],
    allocatedTime: subPart.allocatedTime || 1
  });
  const [errors, setErrors] = useState({});
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

  useEffect(() => {
    setIsEditing(subPart.isEditing || false);
  }, [subPart.isEditing]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Sub part title is required';
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill must be selected';
    }
    
    if (formData.allocatedTime < 1 || formData.allocatedTime > 60) {
      newErrors.allocatedTime = 'Time must be between 1 and 60 minutes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(subPart.id, { ...formData, isEditing: false });
      setIsEditing(false);
      if (onSave) onSave(subPart.id, formData);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: subPart.title || '',
      description: subPart.description || '',
      skills: subPart.skills || [],
      allocatedTime: subPart.allocatedTime || 1
    });
    setErrors({});
    setIsEditing(false);
    onUpdate(subPart.id, { isEditing: false });
    if (onCancel) onCancel(subPart.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onUpdate(subPart.id, { isEditing: true });
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillsChange = (skills) => {
    handleFieldChange('skills', skills);
  };

  const handleOpenSkillsModal = () => {
    setIsSkillsModalOpen(true);
  };

  const handleCloseSkillsModal = () => {
    setIsSkillsModalOpen(false);
  };

  const handleSkillsModalSave = (skills) => {
    handleSkillsChange(skills);
    setIsSkillsModalOpen(false);
  };

  const handleTimeChange = (increment) => {
    const newTime = Math.max(1, Math.min(60, formData.allocatedTime + increment));
    handleFieldChange('allocatedTime', newTime);
  };

  if (isEditing) {
    return (
      <div className={`${styles.subPartCard} ${styles.editing}`}>
        <div className={styles.editingHeader}>
          <h4 className={styles.editingTitle}>
            <i className="fas fa-edit"></i>
            Edit Sub Part
          </h4>
          <div className={styles.editingActions}>
            <Button 
              variant="ghost" 
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>

        <div className={styles.editingForm}>
          {/* Title Input */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Sub Part Title *</label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter sub part title"
              error={errors.title}
              className={styles.titleInput}
            />
          </div>

          {/* Skills Selection */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Select Interpersonal Skills *</label>
            <SkillsInput
              selectedSkills={formData.skills}
              onOpenModal={handleOpenSkillsModal}
              onRemoveSkill={(skill) => {
                const newSkills = formData.skills.filter(s => s !== skill);
                handleSkillsChange(newSkills);
              }}
            />
            {errors.skills && (
              <div className={styles.errorMessage}>{errors.skills}</div>
            )}
          </div>

          {/* Time Allocation */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Allocated Time (min) *</label>
            <div className={styles.timeControl}>
              <Button
                variant="ghost"
                size="small"
                onClick={() => handleTimeChange(-1)}
                disabled={formData.allocatedTime <= 1}
              >
                <i className="fas fa-minus"></i>
              </Button>
              <span className={styles.timeValue}>{formData.allocatedTime}</span>
              <Button
                variant="ghost"
                size="small"
                onClick={() => handleTimeChange(1)}
                disabled={formData.allocatedTime >= 60}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </div>
            {errors.allocatedTime && (
              <div className={styles.errorMessage}>{errors.allocatedTime}</div>
            )}
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Sub Part Description</label>
            <textarea
              className={styles.descriptionTextarea}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Enter detailed description for this sub part..."
              rows={4}
            />
          </div>
        </div>

        {/* Skills Modal */}
        <SkillsModal
          isOpen={isSkillsModalOpen}
          selectedSkills={formData.skills}
          onClose={handleCloseSkillsModal}
          onSkillsChange={handleSkillsModalSave}
        />
      </div>
    );
  }

  // Display mode
  return (
    <div 
      className={`${styles.subPartCard} ${isDraggable ? styles.draggable : ''}`}
      draggable={isDraggable}
      onDragStart={(e) => isDraggable && onDragStart && onDragStart(e, subPart.id)}
      onDragOver={(e) => isDraggable && onDragOver && onDragOver(e)}
      onDrop={(e) => isDraggable && onDrop && onDrop(e, subPart.id)}
    >
      <div className={styles.subPartHeader}>
        {isDraggable && (
          <div className={styles.dragHandle} title="Drag to reorder">
            <i className="fas fa-grip-vertical"></i>
          </div>
        )}
        <h4 className={styles.subPartTitle}>
          {subPart.title || `Sub Part ${subPart.id}`}
        </h4>
        <div className={styles.subPartActions}>
          <span className={styles.timeIndicator}>
            <i className="fas fa-clock"></i>
            {subPart.allocatedTime} min
          </span>
          <Button 
            variant="ghost" 
            size="small"
            onClick={handleEdit}
            title="Edit sub part"
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => onDelete(subPart.id)}
            title="Delete sub part"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </div>
      
      {subPart.skills.length > 0 && (
        <div className={styles.subPartSkills}>
          {subPart.skills.map(skill => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      )}
      
      {subPart.description && (
        <p className={styles.subPartDescription}>
          {subPart.description}
        </p>
      )}

      {(!subPart.title || subPart.skills.length === 0) && (
        <div className={styles.incompleteIndicator}>
          <div className={styles.incompleteMessage}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>This sub part needs more information</span>
          </div>
          <Button 
            variant="primary" 
            size="small"
            onClick={handleEdit}
          >
            Complete Setup
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubPartCard;