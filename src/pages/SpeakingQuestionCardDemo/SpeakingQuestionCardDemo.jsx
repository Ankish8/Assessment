import React from 'react';
import SpeakingQuestionCard from '../../components/SpeakingQuestionCard';
import styles from './SpeakingQuestionCardDemo.module.css';

const SpeakingQuestionCardDemo = () => {
  // Sample data using real JSON API format - YOUR NEW DATA ONLY
  const sampleQuestions = [
    {
      // Real API format
      correctness_score: 1,
      correctness_feedback: "The answer does not address the question about AI at all. It seems unrelated to the concept of Artificial Intelligence and appears to be more about some technical instructions or an unrelated task.",
      ielts_band_estimate: "Band 4.0",
      ielts_criteria: {
        fluency: 3,
        lexical_resource: 3,
        grammar_range_and_accuracy: 4,
        pronunciation: 3
      },
      grammar_score: 4,
      pronunciation_score: 3,
      vocabulary_score: 3,
      grammar_issues: [
        {
          original: "And you also spend maximum time that is store providing solution and close.",
          issue: "Awkward and unclear sentence structure.",
          suggestion: "You also spend the maximum time providing a solution and closing it."
        },
        {
          original: "The close is disabled.",
          issue: "Missing article 'the'.",
          suggestion: "The 'close' button is disabled."
        }
      ],
      pronunciation_issues: [],
      vocabulary_issues: [
        {
          word: "maximum time that is store providing solution and close",
          issue: "This phrase is confusing and contextually inappropriate.",
          suggestion: "Spend the maximum time providing a solution."
        }
      ],
      corrected_text: "Click on it. It will start recording and give some kind of feedback when recording. It will also show the time. You also spend the maximum time providing a solution and closing it. The 'close' button is disabled. I don't think we need to close it.",
      ai_feedback_summary: "The answer fails to address what AI is and seems off-topic, discussing a process involving recording and feedback instead. Grammar and sentence structure are mostly incorrect and difficult to follow.",
      
      // Additional fields for demo purposes (not in real API)
      id: 1,
      type: "Speaking Assessment - AI Analysis",
      timeSpent: 45,
      totalTimeOutside: 2,
      moveCount: 1,
      attempts: 1,
      confidence: { level: "LOW", percentage: 23.4 },
      audio: {
        url: null,
        duration: 45,
        transcriptWords: [
          {word: "Click", confidence: 0.95, sentiment: "neutral"},
          {word: "on", confidence: 0.98, sentiment: "neutral"},
          {word: "it.", confidence: 0.97, sentiment: "neutral"},
          {word: "It", confidence: 0.96, sentiment: "neutral"},
          {word: "will", confidence: 0.94, sentiment: "neutral"},
          {word: "start", confidence: 0.92, sentiment: "positive"},
          {word: "recording", confidence: 0.89, sentiment: "neutral"},
          {word: "and", confidence: 0.98, sentiment: "neutral"},
          {word: "give", confidence: 0.87, sentiment: "positive"},
          {word: "some", confidence: 0.85, sentiment: "neutral"},
          {word: "kind", confidence: 0.83, sentiment: "neutral"},
          {word: "of", confidence: 0.96, sentiment: "neutral"},
          {word: "feedback", confidence: 0.91, sentiment: "positive"},
          {word: "when", confidence: 0.93, sentiment: "neutral"},
          {word: "recording.", confidence: 0.88, sentiment: "neutral"},
          {word: "It", confidence: 0.95, sentiment: "neutral"},
          {word: "will", confidence: 0.94, sentiment: "neutral"},
          {word: "also", confidence: 0.92, sentiment: "neutral"},
          {word: "show", confidence: 0.89, sentiment: "positive"},
          {word: "the", confidence: 0.97, sentiment: "neutral"},
          {word: "time.", confidence: 0.91, sentiment: "neutral"},
          {word: "And", confidence: 0.94, sentiment: "neutral"},
          {word: "you", confidence: 0.96, sentiment: "neutral"},
          {word: "also", confidence: 0.93, sentiment: "neutral"},
          {word: "spend", confidence: 0.88, sentiment: "neutral"},
          {word: "maximum", confidence: 0.78, sentiment: "neutral"},
          {word: "time", confidence: 0.85, sentiment: "neutral"},
          {word: "that", confidence: 0.65, sentiment: "negative"},
          {word: "is", confidence: 0.72, sentiment: "negative"},
          {word: "store", confidence: 0.45, sentiment: "negative"},
          {word: "providing", confidence: 0.67, sentiment: "neutral"},
          {word: "solution", confidence: 0.83, sentiment: "positive"},
          {word: "and", confidence: 0.94, sentiment: "neutral"},
          {word: "close.", confidence: 0.76, sentiment: "neutral"},
          {word: "The", confidence: 0.95, sentiment: "neutral"},
          {word: "close", confidence: 0.82, sentiment: "neutral"},
          {word: "is", confidence: 0.93, sentiment: "neutral"},
          {word: "disabled.", confidence: 0.89, sentiment: "negative"},
          {word: "I", confidence: 0.97, sentiment: "neutral"},
          {word: "don't", confidence: 0.94, sentiment: "negative"},
          {word: "think", confidence: 0.91, sentiment: "neutral"},
          {word: "we", confidence: 0.95, sentiment: "neutral"},
          {word: "need", confidence: 0.88, sentiment: "neutral"},
          {word: "to", confidence: 0.96, sentiment: "neutral"},
          {word: "close", confidence: 0.84, sentiment: "neutral"},
          {word: "it.", confidence: 0.92, sentiment: "neutral"}
        ]
      }
    }
  ];

  return (
    <div className={styles.demoPage}>
      <div className={styles.container}>

        <div className={styles.questionsSection}>
          <SpeakingQuestionCard questionData={sampleQuestions[0]} />
        </div>
      </div>
    </div>
  );
};

export default SpeakingQuestionCardDemo;