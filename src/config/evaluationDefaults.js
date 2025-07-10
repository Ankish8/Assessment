// Configuration for different question types' evaluation parameters
export const EVALUATION_DEFAULTS = {
  coding: {
    criteria: [
      { id: '1', title: 'Code Quality', weightage: 30, description: 'Clean, readable, and well-structured code' },
      { id: '2', title: 'Problem Solving', weightage: 40, description: 'Logical approach and algorithm efficiency' },
      { id: '3', title: 'Best Practices', weightage: 30, description: 'Following coding standards and conventions' }
    ],
    automatedOptions: ['syntax', 'runtime', 'memory', 'testCases'],
    validationRules: {
      minCriteria: 3,
      maxWeight: 100,
      requiresManualToggle: true
    },
    ui: {
      title: 'Submission Questions',
      automatedTitle: 'Automated Evaluation',
      automatedDescription: 'Questions are automatically graded based on test case results and code execution',
      manualTitle: 'Manual Evaluation',
      manualDescription: 'Add human review with custom criteria for code quality, approach, and best practices',
      features: [
        'Instant feedback',
        'Consistent scoring', 
        'Scalable for large groups'
      ],
      manualFeatures: [
        'Custom evaluation criteria',
        'Qualitative assessment',
        'Detailed feedback'
      ]
    }
  },
  
  fillInBlanks: {
    criteria: [
      { id: '1', title: 'Answer Accuracy', weightage: 50, description: 'Correctness of the filled answers' },
      { id: '2', title: 'Spelling & Grammar', weightage: 25, description: 'Language mechanics and presentation' },
      { id: '3', title: 'Context Understanding', weightage: 25, description: 'Understanding of the overall context' }
    ],
    automatedOptions: ['caseSensitive', 'allowPartialMatches', 'acceptableVariations'],
    validationRules: {
      minCriteria: 2,
      maxWeight: 100,
      requiresManualToggle: true
    },
    ui: {
      title: 'Fill-in-the-Blanks Question',
      automatedTitle: 'Automated Evaluation',
      automatedDescription: 'Answers are automatically checked against provided correct answers with text matching',
      manualTitle: 'Manual Evaluation', 
      manualDescription: 'Add human review with custom criteria for answer accuracy, language quality, and understanding',
      features: [
        'Instant feedback',
        'Exact text matching',
        'Scalable for large groups'
      ],
      manualFeatures: [
        'Custom evaluation criteria',
        'Context-aware assessment',
        'Detailed feedback'
      ]
    }
  },
  
  uiFramework: {
    criteria: [
      { id: '1', title: 'Component Structure', weightage: 25, description: 'Proper HTML structure and semantic elements' },
      { id: '2', title: 'CSS Styling', weightage: 30, description: 'Visual design, layout, and responsive behavior' },
      { id: '3', title: 'JavaScript Functionality', weightage: 25, description: 'Interactive features and event handling' },
      { id: '4', title: 'Code Quality', weightage: 20, description: 'Clean, readable, and maintainable code' }
    ],
    automatedOptions: ['screenshot', 'responsive', 'accessibility'],
    validationRules: {
      minCriteria: 3,
      maxWeight: 100,
      requiresManualToggle: false // UI Framework has both enabled by default
    },
    ui: {
      title: 'UI Framework - Evaluation Parameters',
      automatedTitle: 'Auto Evaluation',
      automatedDescription: 'Automated testing with JavaScript',
      manualTitle: 'Manual Evaluation',
      manualDescription: 'Custom criteria for human review',
      features: [
        'Instant feedback',
        'Visual comparison',
        'Responsive testing'
      ],
      manualFeatures: [
        'Custom evaluation criteria',
        'Design assessment',
        'Code review'
      ]
    }
  }
};

// Helper functions to get configuration
export const getDefaultCriteria = (questionType) => {
  return EVALUATION_DEFAULTS[questionType]?.criteria || [];
};

export const getAutomatedOptions = (questionType) => {
  return EVALUATION_DEFAULTS[questionType]?.automatedOptions || [];
};

export const getValidationRules = (questionType) => {
  return EVALUATION_DEFAULTS[questionType]?.validationRules || {};
};

export const getUIConfig = (questionType) => {
  return EVALUATION_DEFAULTS[questionType]?.ui || {};
};