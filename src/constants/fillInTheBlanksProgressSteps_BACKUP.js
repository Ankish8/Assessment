export const FILL_IN_THE_BLANKS_PROGRESS_STEPS = [
  { id: 1, label: 'Question Statement' },
  { id: 2, label: 'Media & Resources' },
  { id: 3, label: 'Question Details' },
  { id: 4, label: 'Evaluation Parameters' },
];

export const FILL_IN_THE_BLANKS_STEP_NUMBERS = {
  QUESTION_STATEMENT: 1,
  MEDIA_RESOURCES: 2,
  QUESTION_DETAILS: 3,
  EVALUATION_PARAMETERS: 4,
};

// URL paths for fill-in-the-blanks flow
export const FILL_IN_THE_BLANKS_ROUTES = {
  QUESTION_STATEMENT: '/fill-in-the-blanks',
  MEDIA_RESOURCES: '/fill-in-the-blanks/media-resources',
  QUESTION_DETAILS: '/fill-in-the-blanks/question-details',
  EVALUATION_PARAMETERS: '/fill-in-the-blanks/evaluation-parameters'
};

// Navigation helpers
export const getNextRoute = (currentStep) => {
  switch (currentStep) {
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_STATEMENT:
      return FILL_IN_THE_BLANKS_ROUTES.MEDIA_RESOURCES;
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES:
      return FILL_IN_THE_BLANKS_ROUTES.QUESTION_DETAILS;
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS:
      return FILL_IN_THE_BLANKS_ROUTES.EVALUATION_PARAMETERS;
    default:
      return null;
  }
};

export const getPreviousRoute = (currentStep) => {
  switch (currentStep) {
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.MEDIA_RESOURCES:
      return FILL_IN_THE_BLANKS_ROUTES.QUESTION_STATEMENT;
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.QUESTION_DETAILS:
      return FILL_IN_THE_BLANKS_ROUTES.MEDIA_RESOURCES;
    case FILL_IN_THE_BLANKS_STEP_NUMBERS.EVALUATION_PARAMETERS:
      return FILL_IN_THE_BLANKS_ROUTES.QUESTION_DETAILS;
    default:
      return null;
  }
};