export const BOT_INTERVIEW_STEPS = [
  { id: 'step-1', label: 'Question Statement' },
  { id: 'step-2', label: 'Area/Skills' }, 
  { id: 'step-3', label: 'Question Details' },
  { id: 'step-4', label: 'Evaluation Parameters' },
  { id: 'step-5', label: 'Solution Details' }
];

export const BOT_INTERVIEW_STEP_NUMBERS = {
  QUESTION_STATEMENT: 0,
  AREA_SKILLS: 1, 
  QUESTION_DETAILS: 2,
  EVALUATION_PARAMETERS: 3,
  SOLUTION_DETAILS: 4
};

export const INTERVIEW_TYPES = [
  {
    id: 'behavioral',
    title: 'Behavioral Interview',
    description: 'Focus on past experiences and behavioral responses',
    icon: 'fas fa-user-friends',
    features: [
      'STAR method questions',
      'Experience-based scenarios',
      'Soft skills evaluation'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Interview', 
    description: 'Assess technical knowledge and problem-solving skills',
    icon: 'fas fa-code',
    features: [
      'Technical problem solving',
      'System design questions',
      'Code review scenarios'
    ]
  },
  {
    id: 'situational',
    title: 'Situational Interview',
    description: 'Present hypothetical scenarios and assess responses',
    icon: 'fas fa-lightbulb',
    features: [
      'Hypothetical scenarios',
      'Decision-making assessment',
      'Problem-solving approach'
    ]
  }
];

export const QUESTION_TEMPLATES = {
  behavioral: [
    "Tell me about a time when you had to work under pressure.",
    "Describe a situation where you had to resolve a conflict with a colleague.",
    "Can you give an example of when you had to learn something new quickly?"
  ],
  technical: [
    "Explain how you would design a scalable web application.",
    "Walk me through your approach to debugging a production issue.",
    "How would you optimize database performance for a high-traffic application?"
  ],
  situational: [
    "If you were given a project with an impossible deadline, how would you handle it?",
    "How would you approach a situation where a team member is not contributing?",
    "What would you do if you discovered a security vulnerability in production?"
  ]
};