export const AI_INTERVIEW_STEPS = [
  { id: '1', label: 'Job Profile' },
  { id: '2', label: 'Job Description' },
  { id: '3', label: 'Skills/Questions Details' },
  { id: '4', label: 'Interview Details' },
  { id: '5', label: 'Interview Preferences' },
];

export const AI_INTERVIEW_STEP_NUMBERS = {
  JOB_PROFILE: 1,
  JOB_DESCRIPTION: 2,
  SKILLS_QUESTIONS: 3,
  INTERVIEW_DETAILS: 4,
  INTERVIEW_PREFERENCES: 5,
};

export const INTERVIEW_STATES = {
  READY: 'ready',
  STAGE: 'stage', 
  ABANDONED: 'abandoned',
};

export const INTERVIEW_STATE_OPTIONS = [
  {
    value: INTERVIEW_STATES.READY,
    label: 'Ready',
    description: 'Question that has been reviewed and is ready to be used',
    colorClass: 'stateReady'
  },
  {
    value: INTERVIEW_STATES.STAGE,
    label: 'Stage',
    description: 'Question which is added partially or completely but not yet reviewed',
    colorClass: 'stateStage'
  },
  {
    value: INTERVIEW_STATES.ABANDONED,
    label: 'Abandoned',
    description: 'Question which is rejected or no longer needed',
    colorClass: 'stateAbandoned'
  }
];