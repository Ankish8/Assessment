// Configuration for different question types' details and metadata
export const QUESTION_DETAILS_DEFAULTS = {
  coding: {
    title: "Question Details",
    description: "Configure the basic settings and metadata for your coding question",
    includeLanguageSelector: true,
    skills: {
      popular: ['CPP', 'JAVA', 'PYTHON', 'JS', 'C', 'C#', 'GO', 'PHP', 'RUBY', 'SWIFT', 'KOTLIN', 'SCALA'],
      additional: [
        'TypeScript', 'Rust', 'Dart', 'Perl', 'R', 'MATLAB', 'Objective-C', 'SQL',
        'Shell/Bash', 'Assembly', 'Fortran', 'COBOL', 'Haskell', 'Erlang', 'Clojure',
        'F#', 'VB.NET', 'Delphi', 'Ada', 'Lua', 'Julia', 'Groovy', 'ActionScript',
        'CoffeeScript', 'Elm', 'Crystal', 'Nim', 'D', 'Zig'
      ]
    },
    difficultyDescriptions: {
      easy: "Basic concepts and straightforward implementation",
      intermediate: "Moderate complexity requiring some experience",
      hard: "Advanced concepts and complex problem solving"
    },
    defaultValues: {
      marks: 50,
      level: 'intermediate',
      language: 'PYTHON'
    },
    validation: {
      minMarks: 1,
      maxMarks: 1000,
      requiredFields: ['marks', 'level', 'selectedSkills'],
      minSkills: 1
    },
    navigation: {
      previousRoute: '/default-codes',
      nextRoute: '/evaluation-parameters'
    }
  },

  fillInBlanks: {
    title: "Fill in the Blanks",
    description: "Set the basic parameters and difficulty for this fill-in-the-blanks question",
    includeLanguageSelector: false,
    skills: {
      popular: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'HTML/CSS'],
      additional: [
        'Java', 'C++', 'TypeScript', 'Angular', 'Vue.js', 'PHP', 'Ruby', 'C#',
        'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'MongoDB', 'PostgreSQL', 'MySQL',
        'Redis', 'Docker', 'Kubernetes', 'AWS', 'Git', 'Linux', 'Express.js',
        'Django', 'Flask', 'Spring', 'Laravel', 'Rails', 'ASP.NET', 'GraphQL'
      ]
    },
    difficultyDescriptions: {
      easy: "Basic concepts and straightforward implementation",
      intermediate: "Moderate complexity requiring some experience",
      hard: "Advanced concepts and complex problem solving"
    },
    defaultValues: {
      marks: 30,
      level: 'easy'
    },
    validation: {
      minMarks: 1,
      maxMarks: 500,
      requiredFields: ['marks', 'level', 'selectedSkills'],
      minSkills: 1
    },
    navigation: {
      previousRoute: '/fill-in-the-blanks/media-resources',
      nextRoute: '/fill-in-the-blanks/evaluation-parameters'
    }
  },

  uiFramework: {
    title: "UI Framework - Question Details",
    description: "Set the basic parameters and difficulty for this UI framework question",
    includeLanguageSelector: false,
    skills: {
      popular: ['React', 'Vue.js', 'Angular', 'HTML/CSS', 'JavaScript', 'TypeScript'],
      additional: [
        'Svelte', 'Next.js', 'Nuxt.js', 'Gatsby', 'Ember.js', 'Backbone.js',
        'jQuery', 'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Ant Design',
        'Chakra UI', 'Styled Components', 'Emotion', 'SCSS/SASS', 'Less',
        'Webpack', 'Vite', 'Parcel', 'Rollup', 'Babel', 'ESLint', 'Prettier',
        'Jest', 'Cypress', 'Storybook', 'Figma', 'Adobe XD'
      ]
    },
    difficultyDescriptions: {
      easy: "Basic UI components and simple styling tasks",
      intermediate: "Complex layouts and interactive components", 
      hard: "Advanced patterns and framework architecture"
    },
    defaultValues: {
      marks: 40,
      level: 'intermediate'
    },
    validation: {
      minMarks: 1,
      maxMarks: 750,
      requiredFields: ['marks', 'level', 'selectedSkills'],
      minSkills: 1
    },
    navigation: {
      previousRoute: '/ui-framework/media-resources',
      nextRoute: '/ui-framework/evaluation-parameters'
    }
  }
};

// Helper functions to get configuration
export const getQuestionDetailsConfig = (questionType) => {
  return QUESTION_DETAILS_DEFAULTS[questionType] || QUESTION_DETAILS_DEFAULTS.coding;
};

export const getSkillsForType = (questionType) => {
  const config = getQuestionDetailsConfig(questionType);
  return {
    popular: config.skills.popular,
    additional: config.skills.additional,
    all: [...config.skills.popular, ...config.skills.additional]
  };
};

export const getDifficultyOptions = (questionType) => {
  const config = getQuestionDetailsConfig(questionType);
  return [
    { value: 'easy', label: 'Easy', description: config.difficultyDescriptions.easy },
    { value: 'intermediate', label: 'Intermediate', description: config.difficultyDescriptions.intermediate },
    { value: 'hard', label: 'Hard', description: config.difficultyDescriptions.hard }
  ];
};

export const getValidationRules = (questionType) => {
  const config = getQuestionDetailsConfig(questionType);
  return config.validation;
};

export const getDefaultValues = (questionType) => {
  const config = getQuestionDetailsConfig(questionType);
  return config.defaultValues;
};

export const getNavigationConfig = (questionType) => {
  const config = getQuestionDetailsConfig(questionType);
  return config.navigation;
};