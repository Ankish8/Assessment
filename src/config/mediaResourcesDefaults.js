// Configuration for different question types' media resources and upload settings
export const MEDIA_RESOURCES_DEFAULTS = {
  coding: {
    title: "Submission Questions",
    description: "Configure how candidates can submit their solutions and add supporting media files",
    fileTypes: {
      accept: "video/*,audio/*",
      maxSizeMB: 50,
      maxSizeBytes: 50 * 1024 * 1024, // 50MB in bytes
      supported: ["MP4", "MOV", "AVI", "MP3", "WAV", "M4A"],
      iconStyle: "fontawesome"
    },
    features: {
      submissionOptions: true,
      allowedLanguages: false,
      progressTracking: false,
      quickAddButtons: false
    },
    submissionOptions: [
      { 
        id: 'text', 
        label: 'Text', 
        icon: 'fas fa-file-alt', 
        description: 'Allow text-based code submissions',
        badge: 'AI Evaluation is available',
        defaultEnabled: true
      },
      { 
        id: 'audio', 
        label: 'Audio', 
        icon: 'fas fa-microphone',
        description: 'Allow voice explanations and recordings',
        defaultEnabled: false
      },
      { 
        id: 'urls', 
        label: 'URLs', 
        icon: 'fas fa-link',
        description: 'Allow submission of external links and repositories',
        defaultEnabled: false
      },
      { 
        id: 'code', 
        label: 'Code Files', 
        icon: 'fas fa-code',
        description: 'Allow upload of source code files',
        badge: 'AI Evaluation is available',
        defaultEnabled: true
      },
      { 
        id: 'files', 
        label: 'Files', 
        icon: 'fas fa-paperclip',
        description: 'Allow upload of documentation and supporting files',
        defaultEnabled: false
      },
      { 
        id: 'images', 
        label: 'Images', 
        icon: 'fas fa-image',
        description: 'Allow upload of screenshots and diagrams', 
        defaultEnabled: false
      }
    ],
    validation: {
      requiresAtLeastOneOption: true,
      requiredOptions: ['text', 'code']
    },
    navigation: {
      previousRoute: '/media-resources-questions',
      nextRoute: '/question-details'
    }
  },

  fillInBlanks: {
    title: "Fill In The Blanks - Media & Resources",
    description: "Add media files and resources to support your fill-in-the-blanks question",
    fileTypes: {
      accept: "image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx",
      maxSizeMB: null, // No explicit limit
      maxSizeBytes: null,
      supported: [
        "Images (JPG, PNG, GIF, WEBP)",
        "Videos (MP4, MOV, AVI, WEBM)", 
        "Documents (PDF, DOC, DOCX)",
        "Presentations (PPT, PPTX)"
      ],
      iconStyle: "emoji"
    },
    features: {
      submissionOptions: false,
      allowedLanguages: false,
      progressTracking: true,
      quickAddButtons: true
    },
    quickAddButtons: [
      { 
        label: "Add Images", 
        icon: "🖼️", 
        type: "image/*",
        description: "Upload images, screenshots, or diagrams"
      },
      { 
        label: "Add Videos", 
        icon: "📹", 
        type: "video/*",
        description: "Upload instructional or reference videos"
      },
      { 
        label: "Add Documents", 
        icon: "📄", 
        type: ".pdf,.doc,.docx",
        description: "Upload PDFs or Word documents"
      },
      { 
        label: "Add Presentations", 
        icon: "📊", 
        type: ".ppt,.pptx",
        description: "Upload PowerPoint presentations"
      }
    ],
    navigation: {
      previousRoute: '/fill-in-the-blanks/create-question',
      nextRoute: '/fill-in-the-blanks/question-details'
    }
  },

  uiFramework: {
    title: "UI Framework - Media & Resources",
    description: "Add supporting media and configure the allowed technologies for this UI framework question",
    fileTypes: {
      accept: "video/*,audio/*",
      maxSizeMB: 50,
      maxSizeBytes: 50 * 1024 * 1024, // 50MB in bytes
      supported: ["MP4", "MOV", "AVI", "MP3", "WAV", "M4A"],
      iconStyle: "fontawesome"
    },
    features: {
      submissionOptions: false,
      allowedLanguages: true,
      progressTracking: false,
      quickAddButtons: false
    },
    allowedLanguages: [
      { 
        name: "HTML", 
        icon: "fab fa-html5", 
        color: "#e34c26",
        description: "HyperText Markup Language"
      },
      { 
        name: "CSS", 
        icon: "fab fa-css3-alt", 
        color: "#1572b6",
        description: "Cascading Style Sheets"
      },
      { 
        name: "JavaScript", 
        icon: "fab fa-js-square", 
        color: "#f7df1e",
        description: "JavaScript programming language"
      }
    ],
    navigation: {
      previousRoute: () => {
        // UI Framework specific navigation logic
        const route = getPreviousRoute(UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES);
        return route || '/ui-framework';
      },
      nextRoute: () => {
        const route = getNextRoute(UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES);
        return route || '/ui-framework/question-details';
      }
    }
  }
};

// Helper functions to get configuration
export const getMediaResourcesConfig = (questionType) => {
  return MEDIA_RESOURCES_DEFAULTS[questionType] || MEDIA_RESOURCES_DEFAULTS.coding;
};

export const getFileTypeConfig = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.fileTypes;
};

export const getSubmissionOptions = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.submissionOptions || [];
};

export const getQuickAddButtons = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.quickAddButtons || [];
};

export const getAllowedLanguages = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.allowedLanguages || [];
};

export const getFeatureFlags = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.features;
};

export const getNavigationConfig = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.navigation;
};

export const getValidationRules = (questionType) => {
  const config = getMediaResourcesConfig(questionType);
  return config.validation || {};
};

// File validation helpers
export const validateFileType = (file, questionType) => {
  const config = getFileTypeConfig(questionType);
  const acceptTypes = config.accept.split(',').map(type => type.trim());
  
  // Check if file type matches any accepted type
  return acceptTypes.some(acceptType => {
    if (acceptType.startsWith('.')) {
      // Extension check
      return file.name.toLowerCase().endsWith(acceptType.toLowerCase());
    } else if (acceptType.includes('*')) {
      // MIME type wildcard check
      const baseType = acceptType.split('/')[0];
      return file.type.startsWith(baseType);
    } else {
      // Exact MIME type check
      return file.type === acceptType;
    }
  });
};

export const validateFileSize = (file, questionType) => {
  const config = getFileTypeConfig(questionType);
  if (config.maxSizeBytes === null) return true;
  return file.size <= config.maxSizeBytes;
};

export const getFileIcon = (file, questionType) => {
  const config = getFileTypeConfig(questionType);
  
  if (config.iconStyle === 'emoji') {
    // Emoji style icons for fillInBlanks
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '📹';
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('document') || file.type.includes('word')) return '📄';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return '📊';
    return '📎';
  } else {
    // FontAwesome style icons for coding/uiFramework
    if (file.type.startsWith('image/')) return 'fas fa-image';
    if (file.type.startsWith('video/')) return 'fas fa-video';
    if (file.type.startsWith('audio/')) return 'fas fa-music';
    if (file.type.includes('pdf')) return 'fas fa-file-pdf';
    if (file.type.includes('document') || file.type.includes('word')) return 'fas fa-file-word';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return 'fas fa-file-powerpoint';
    return 'fas fa-file';
  }
};