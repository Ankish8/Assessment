import React from 'react';
import SpeakingQuestionCard from '../../components/SpeakingQuestionCard';
import styles from './SpeakingQuestionCardDemo.module.css';

const SpeakingQuestionCardDemo = () => {
  // Sample data representing different performance levels
  const sampleQuestions = [
    {
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
        transcript: "Speaking, type two. Checking. Speaking, type two. Okay, thank you. Bye. Uh.",
        transcriptWords: [
          {word: "Speaking,", confidence: 0.85, sentiment: "neutral"},
          {word: "type", confidence: 0.92, sentiment: "neutral"},
          {word: "two.", confidence: 0.88, sentiment: "neutral"},
          {word: "Checking.", confidence: 0.65, sentiment: "neutral"},
          {word: "Speaking,", confidence: 0.89, sentiment: "neutral"},
          {word: "type", confidence: 0.94, sentiment: "neutral"},
          {word: "two.", confidence: 0.91, sentiment: "neutral"},
          {word: "Okay,", confidence: 0.78, sentiment: "positive"},
          {word: "thank", confidence: 0.95, sentiment: "positive"},
          {word: "you.", confidence: 0.92, sentiment: "positive"},
          {word: "Bye.", confidence: 0.75, sentiment: "positive"},
          {word: "Uh.", confidence: 0.45, sentiment: "negative"}
        ]
      },
      analysis: {
        fluency: {
          score: 2.1,
          maxScore: 5,
          details: [
            "Speaking pace is inconsistent",
            "Some hesitation and pauses",
            "Needs improvement in flow"
          ]
        },
        lexical: {
          score: 2.0,
          maxScore: 5,
          details: [
            "Limited vocabulary range",
            "Basic word choices",
            "Some repetition of phrases"
          ]
        },
        grammar: {
          score: 1.8,
          maxScore: 5,
          details: [
            "Simple sentence structures",
            "Some grammatical errors",
            "Limited complex constructions"
          ]
        },
        pronunciation: {
          score: 2.5,
          maxScore: 5,
          details: [
            "Generally clear pronunciation",
            "Some mispronunciations",
            "Accent affects clarity occasionally"
          ]
        },
        sentiment: "NEUTRAL",
        ielts: {
          band: 4.5
        }
      },
      evaluatorComments: null
    },
    {
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
        transcript: "Good morning. I am excited to present my thoughts on this topic. The key considerations include market analysis, strategic planning, and implementation phases. Thank you for your attention.",
        transcriptWords: [
          {word: "Good", confidence: 0.95, sentiment: "positive"},
          {word: "morning.", confidence: 0.97, sentiment: "positive"},
          {word: "I", confidence: 0.98, sentiment: "neutral"},
          {word: "am", confidence: 0.96, sentiment: "neutral"},
          {word: "excited", confidence: 0.92, sentiment: "positive"},
          {word: "to", confidence: 0.98, sentiment: "neutral"},
          {word: "present", confidence: 0.94, sentiment: "positive"},
          {word: "my", confidence: 0.97, sentiment: "neutral"},
          {word: "thoughts", confidence: 0.89, sentiment: "neutral"},
          {word: "on", confidence: 0.98, sentiment: "neutral"},
          {word: "this", confidence: 0.95, sentiment: "neutral"},
          {word: "topic.", confidence: 0.93, sentiment: "neutral"},
          {word: "The", confidence: 0.97, sentiment: "neutral"},
          {word: "key", confidence: 0.91, sentiment: "positive"},
          {word: "considerations", confidence: 0.85, sentiment: "neutral"},
          {word: "include", confidence: 0.94, sentiment: "neutral"},
          {word: "market", confidence: 0.89, sentiment: "neutral"},
          {word: "analysis,", confidence: 0.87, sentiment: "neutral"},
          {word: "strategic", confidence: 0.82, sentiment: "positive"},
          {word: "planning,", confidence: 0.88, sentiment: "positive"},
          {word: "and", confidence: 0.98, sentiment: "neutral"},
          {word: "implementation", confidence: 0.79, sentiment: "neutral"},
          {word: "phases.", confidence: 0.85, sentiment: "neutral"},
          {word: "Thank", confidence: 0.96, sentiment: "positive"},
          {word: "you", confidence: 0.98, sentiment: "positive"},
          {word: "for", confidence: 0.97, sentiment: "positive"},
          {word: "your", confidence: 0.95, sentiment: "positive"},
          {word: "attention.", confidence: 0.92, sentiment: "positive"}
        ]
      },
      analysis: {
        fluency: {
          score: 4.5,
          maxScore: 5,
          details: [
            "Excellent speaking pace and rhythm",
            "Natural flow with minimal hesitation",
            "Confident delivery throughout"
          ]
        },
        lexical: {
          score: 4.2,
          maxScore: 5,
          details: [
            "Wide range of vocabulary",
            "Appropriate word choices",
            "Good use of professional terminology"
          ]
        },
        grammar: {
          score: 4.3,
          maxScore: 5,
          details: [
            "Complex sentence structures used well",
            "Minor grammatical errors only",
            "Good variety in constructions"
          ]
        },
        pronunciation: {
          score: 4.0,
          maxScore: 5,
          details: [
            "Clear and intelligible pronunciation",
            "Good stress and intonation patterns",
            "Minor accent features present"
          ]
        },
        sentiment: "POSITIVE",
        ielts: {
          band: 7.5
        }
      },
      evaluatorComments: "Excellent communication skills demonstrated. Clear structure and engaging delivery."
    },
    {
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
        transcript: "Um... uh... I think... maybe... yes.",
        transcriptWords: [
          {word: "Um...", confidence: 0.35, sentiment: "negative"},
          {word: "uh...", confidence: 0.28, sentiment: "negative"},
          {word: "I", confidence: 0.75, sentiment: "neutral"},
          {word: "think...", confidence: 0.68, sentiment: "neutral"},
          {word: "maybe...", confidence: 0.42, sentiment: "negative"},
          {word: "yes.", confidence: 0.55, sentiment: "positive"}
        ]
      },
      analysis: {
        fluency: {
          score: 0.5,
          maxScore: 5,
          details: [
            "Very hesitant delivery",
            "Long pauses and fillers",
            "Lacks confidence in speaking"
          ]
        },
        lexical: {
          score: 1.0,
          maxScore: 5,
          details: [
            "Very limited vocabulary",
            "Basic expressions only",
            "Difficulty finding appropriate words"
          ]
        },
        grammar: {
          score: 1.2,
          maxScore: 5,
          details: [
            "Simple phrases only",
            "Frequent grammatical errors",
            "Very basic sentence structures"
          ]
        },
        pronunciation: {
          score: 1.5,
          maxScore: 5,
          details: [
            "Unclear pronunciation at times",
            "Heavy accent affects understanding",
            "Word stress issues present"
          ]
        },
        sentiment: "UNCERTAIN",
        ielts: {
          band: 3.0
        }
      },
      evaluatorComments: "Needs significant improvement in speaking confidence and content organization."
    }
  ];

  return (
    <div className={styles.demoPage}>
      <div className={styles.container}>

        <div className={styles.questionsSection}>
          <SpeakingQuestionCard questionData={sampleQuestions[1]} />
          <SpeakingQuestionCard questionData={sampleQuestions[0]} />
          <SpeakingQuestionCard questionData={sampleQuestions[2]} />
        </div>
      </div>
    </div>
  );
};

export default SpeakingQuestionCardDemo;