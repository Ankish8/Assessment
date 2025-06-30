export const UI_FRAMEWORK_PROGRESS_STEPS = [
  { id: 1, label: 'Question Statement' },
  { id: 2, label: 'Media & Resources' },
  { id: 3, label: 'Question Details' },
  { id: 4, label: 'Default Code' },
  { id: 5, label: 'Evaluation Parameters' },
  { id: 6, label: 'Solution Details' },
];

export const UI_FRAMEWORK_STEP_NUMBERS = {
  QUESTION_STATEMENT: 1,
  MEDIA_RESOURCES: 2,
  QUESTION_DETAILS: 3,
  DEFAULT_CODE: 4,
  EVALUATION_PARAMETERS: 5,
  SOLUTION_DETAILS: 6,
};

// URL paths for UI framework flow
export const UI_FRAMEWORK_ROUTES = {
  QUESTION_STATEMENT: '/ui-framework',
  MEDIA_RESOURCES: '/ui-framework/media-resources',
  QUESTION_DETAILS: '/ui-framework/question-details',
  DEFAULT_CODE: '/ui-framework/default-code',
  EVALUATION_PARAMETERS: '/ui-framework/evaluation-parameters',
  SOLUTION_DETAILS: '/ui-framework/solution-details'
};

// Navigation helpers
export const getNextRoute = (currentStep) => {
  switch (currentStep) {
    case UI_FRAMEWORK_STEP_NUMBERS.QUESTION_STATEMENT:
      return UI_FRAMEWORK_ROUTES.MEDIA_RESOURCES;
    case UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES:
      return UI_FRAMEWORK_ROUTES.QUESTION_DETAILS;
    case UI_FRAMEWORK_STEP_NUMBERS.QUESTION_DETAILS:
      return UI_FRAMEWORK_ROUTES.DEFAULT_CODE;
    case UI_FRAMEWORK_STEP_NUMBERS.DEFAULT_CODE:
      return UI_FRAMEWORK_ROUTES.EVALUATION_PARAMETERS;
    case UI_FRAMEWORK_STEP_NUMBERS.EVALUATION_PARAMETERS:
      return UI_FRAMEWORK_ROUTES.SOLUTION_DETAILS;
    default:
      return null;
  }
};

export const getPreviousRoute = (currentStep) => {
  switch (currentStep) {
    case UI_FRAMEWORK_STEP_NUMBERS.MEDIA_RESOURCES:
      return UI_FRAMEWORK_ROUTES.QUESTION_STATEMENT;
    case UI_FRAMEWORK_STEP_NUMBERS.QUESTION_DETAILS:
      return UI_FRAMEWORK_ROUTES.MEDIA_RESOURCES;
    case UI_FRAMEWORK_STEP_NUMBERS.DEFAULT_CODE:
      return UI_FRAMEWORK_ROUTES.QUESTION_DETAILS;
    case UI_FRAMEWORK_STEP_NUMBERS.EVALUATION_PARAMETERS:
      return UI_FRAMEWORK_ROUTES.DEFAULT_CODE;
    case UI_FRAMEWORK_STEP_NUMBERS.SOLUTION_DETAILS:
      return UI_FRAMEWORK_ROUTES.EVALUATION_PARAMETERS;
    default:
      return null;
  }
};