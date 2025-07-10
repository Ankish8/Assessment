import React from 'react';
import SpeakingQuestionCard from './SpeakingQuestionCard';

export default {
  title: 'Components/SpeakingQuestionCard',
  component: SpeakingQuestionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced speaking question card component for candidate assessment reports. Features comprehensive AI analysis, audio player, and improved UX design.'
      }
    }
  },
  argTypes: {
    questionData: {
      description: 'Complete question data object containing all assessment information',
      control: { type: 'object' }
    }
  }
};

// Default story with moderate performance
export const Default = {
  args: {
    questionData: {
      id: 2,
      type: "Speaking Type 2",
      score: 1.18,
      maxScore: 5,
      timeSpent: 18,
      totalTimeOutside: 0,
      moveCount: 0,
      attempts: 0,
      confidence: {
        level: "MODERATE",
        percentage: 88.56
      },
      audio: {
        url: null,
        duration: 18,
        transcript: "Speaking, type two. Checking. Speaking, type two. Okay, thank you. Bye. Uh."
      },
      analysis: {
        fluency: {
          score: 2.1,
          maxScore: 5,
          details: ["Clear pronunciation detected", "Natural speech flow: Moderate"]
        },
        grammar: {
          score: 1.8,
          maxScore: 5,
          details: ["Sentence structure: Basic", "Grammar accuracy: 75%"]
        },
        content: {
          score: 0.6,
          maxScore: 5,
          details: ["Message clarity: Low", "Engagement level: Basic"]
        },
        sentiment: "NEUTRAL"
      },
      evaluatorComments: null
    }
  }
};

// High performance example
export const HighPerformance = {
  args: {
    questionData: {
      id: 1,
      type: "Speaking Assessment - Professional",
      score: 4.2,
      maxScore: 5,
      timeSpent: 45,
      totalTimeOutside: 2,
      moveCount: 1,
      attempts: 1,
      confidence: {
        level: "HIGH",
        percentage: 92.3
      },
      audio: {
        url: null,
        duration: 45,
        transcript: "Good morning. I am excited to present my thoughts on this topic. The key considerations include market analysis, strategic planning, and implementation phases. Thank you for your attention."
      },
      analysis: {
        fluency: {
          score: 4.5,
          maxScore: 5,
          details: ["Excellent pronunciation and clarity", "Natural speech flow: Very good", "Appropriate pacing maintained"]
        },
        grammar: {
          score: 4.3,
          maxScore: 5,
          details: ["Complex sentence structures used effectively", "Grammar accuracy: 95%", "Varied vocabulary demonstrated"]
        },
        content: {
          score: 3.8,
          maxScore: 5,
          details: ["Message clarity: High", "Engagement level: Very good", "Structured presentation approach"]
        },
        sentiment: "POSITIVE"
      },
      evaluatorComments: "Excellent communication skills demonstrated. Clear structure and engaging delivery."
    }
  }
};

// Low performance example
export const LowPerformance = {
  args: {
    questionData: {
      id: 3,
      type: "Speaking Type 1 - Basic",
      score: 0.8,
      maxScore: 5,
      timeSpent: 12,
      totalTimeOutside: 5,
      moveCount: 3,
      attempts: 2,
      confidence: {
        level: "LOW",
        percentage: 23.4
      },
      audio: {
        url: null,
        duration: 12,
        transcript: "Um... uh... I think... maybe... yes."
      },
      analysis: {
        fluency: {
          score: 0.5,
          maxScore: 5,
          details: ["Pronunciation unclear", "Multiple hesitations detected", "Irregular speech flow"]
        },
        grammar: {
          score: 1.2,
          maxScore: 5,
          details: ["Simple sentence structures only", "Grammar accuracy: 45%", "Limited vocabulary usage"]
        },
        content: {
          score: 0.7,
          maxScore: 5,
          details: ["Message clarity: Very low", "Engagement level: Poor", "Incomplete thoughts expressed"]
        },
        sentiment: "UNCERTAIN"
      },
      evaluatorComments: "Needs significant improvement in speaking confidence and content organization."
    }
  }
};

// With extensive evaluator feedback
export const WithEvaluatorComments = {
  args: {
    questionData: {
      id: 4,
      type: "Speaking Assessment - Advanced",
      score: 3.5,
      maxScore: 5,
      timeSpent: 32,
      totalTimeOutside: 0,
      moveCount: 0,
      attempts: 1,
      confidence: {
        level: "MODERATE",
        percentage: 76.8
      },
      audio: {
        url: null,
        duration: 32,
        transcript: "The implementation of sustainable practices in modern business requires careful consideration of multiple factors including environmental impact, cost effectiveness, and stakeholder engagement."
      },
      analysis: {
        fluency: {
          score: 3.8,
          maxScore: 5,
          details: ["Good pronunciation overall", "Confident delivery", "Minor pace variations"]
        },
        grammar: {
          score: 3.6,
          maxScore: 5,
          details: ["Good sentence complexity", "Grammar accuracy: 88%", "Professional vocabulary used"]
        },
        content: {
          score: 3.1,
          maxScore: 5,
          details: ["Message clarity: Good", "Engagement level: Moderate", "Could benefit from more examples"]
        },
        sentiment: "NEUTRAL"
      },
      evaluatorComments: "Good technical knowledge demonstrated. Delivery was confident but could be more engaging. Consider adding concrete examples to support key points. Overall performance shows strong potential with room for improvement in presentation style."
    }
  }
};

// Empty/minimal data scenario
export const MinimalData = {
  args: {
    questionData: {
      id: 5,
      type: "Speaking Test",
      score: 0,
      maxScore: 5,
      timeSpent: 0,
      totalTimeOutside: 0,
      moveCount: 0,
      attempts: 0,
      confidence: {
        level: "UNKNOWN",
        percentage: 0
      },
      audio: {
        url: null,
        duration: 0,
        transcript: "No audio submitted"
      },
      analysis: {
        fluency: {
          score: 0,
          maxScore: 5,
          details: ["No audio to analyze"]
        },
        grammar: {
          score: 0,
          maxScore: 5,
          details: ["No content available"]
        },
        content: {
          score: 0,
          maxScore: 5,
          details: ["No submission detected"]
        },
        sentiment: "NONE"
      },
      evaluatorComments: null
    }
  }
};