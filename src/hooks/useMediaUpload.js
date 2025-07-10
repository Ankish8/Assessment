import { useState, useCallback } from 'react';
import { validateFileType, validateFileSize, getFileIcon } from '../config/mediaResourcesDefaults';

export const useMediaUpload = (questionType) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const validateFile = useCallback((file) => {
    const errors = [];
    
    if (!validateFileType(file, questionType)) {
      errors.push('File type not supported');
    }
    
    if (!validateFileSize(file, questionType)) {
      errors.push('File size exceeds limit');
    }
    
    return errors;
  }, [questionType]);

  const processFiles = useCallback((files) => {
    const validFiles = [];
    const fileErrors = {};

    Array.from(files).forEach((file) => {
      const validationErrors = validateFile(file);
      
      if (validationErrors.length > 0) {
        fileErrors[file.name] = validationErrors;
      } else {
        const fileObject = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
          icon: getFileIcon(file, questionType),
          formattedSize: formatFileSize(file.size),
          uploadStatus: 'pending'
        };
        validFiles.push(fileObject);
      }
    });

    if (Object.keys(fileErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...fileErrors }));
    }

    return validFiles;
  }, [questionType, validateFile, formatFileSize]);

  const simulateUpload = useCallback((fileId) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const newProgress = Math.min(currentProgress + 10, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadedFiles(current => 
            current.map(file => 
              file.id === fileId 
                ? { ...file, uploadStatus: 'completed' }
                : file
            )
          );
          return { ...prev, [fileId]: 100 };
        }
        
        return { ...prev, [fileId]: newProgress };
      });
    }, 200);
    
    return interval;
  }, []);

  const handleFileUpload = useCallback((files) => {
    const newFiles = processFiles(files);
    
    setUploadedFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      
      // Simulate upload for fillInBlanks with progress tracking
      if (questionType === 'fillInBlanks') {
        newFiles.forEach(file => {
          file.uploadStatus = 'uploading';
          simulateUpload(file.id);
        });
      } else {
        // Mark as completed immediately for other types
        newFiles.forEach(file => {
          file.uploadStatus = 'completed';
        });
      }
      
      return updatedFiles;
    });

    // Clear any previous errors for successfully uploaded files
    setErrors(prev => {
      const newErrors = { ...prev };
      newFiles.forEach(file => {
        delete newErrors[file.name];
      });
      return newErrors;
    });
  }, [processFiles, questionType, simulateUpload]);

  const removeFile = useCallback((fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearAllFiles = useCallback(() => {
    setUploadedFiles([]);
    setUploadProgress({});
    setErrors({});
  }, []);

  return {
    uploadedFiles,
    isDragOver,
    uploadProgress,
    errors,
    handleFileUpload,
    removeFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    formatFileSize,
    clearErrors,
    clearAllFiles
  };
};