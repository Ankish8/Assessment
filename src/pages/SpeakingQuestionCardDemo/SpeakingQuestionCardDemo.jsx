import React from 'react';
import SpeakingQuestionCard from '../../components/SpeakingQuestionCard';
import styles from './SpeakingQuestionCardDemo.module.css';

const SpeakingQuestionCardDemo = () => {
  // Real JSON data from candidateJson files
  const sampleQuestions = [
    {
      // Json1.txt - Poor AI question response
      ...{
        "correctness_score": 2,
        "correctness_feedback": "The response does not effectively address the question 'What is AI?'. It seems to discuss a process involving recording and time management, but it's not relevant to answering what Artificial Intelligence is.",
        "grammar_score": 6,
        "vocabulary_score": 5,
        "grammar_issues": [
          {
            "original": "Mhm. Click on it.",
            "issue": "Fragmented sentence",
            "suggestion": "This doesn't form a complete sentence."
          },
          {
            "original": "The time is okay testgu is finre.",
            "issue": "Spelling and structure issues",
            "suggestion": "The time is okay; the test is fine."
          }
        ],
        "vocabulary_issues": [
          {
            "word": "Mhm",
            "issue": "Informal language",
            "suggestion": "Yes or Okay"
          },
          {
            "word": "testgu",
            "issue": "Typographical error",
            "suggestion": "test"
          }
        ],
        "corrected_text": "Click on it, and it will start recording, providing some feedback. It will show the time. Okay, the test is fine. You also spend maximum time there, which is stored while providing the solution. The close option is disabled, but I don't think we need to close.",
        "ai_feedback_summary": "The candidate's answer did not address the question 'What is AI?'. The response was off-topic and focused on a process involving recording and time management. The grammar was somewhat fragmented, and the vocabulary included informal and misspelled words. The user needs to stay focused on the question and answer clearly and directly."
      },
      
      // Additional fields for demo UI functionality
      id: 1,
      type: "Speaking Assessment - AI Analysis",
      timeSpent: 45,
      totalTimeOutside: 2,
      moveCount: 1,
      attempts: 1,
      confidence: { level: "LOW", percentage: 35 },
      audio: {
        url: null,
        duration: 45,
        transcript: "Click on it, and it will start recording, providing some feedback. It will show the time. Okay, the test is fine. You also spend maximum time there, which is stored while providing the solution. The close option is disabled, but I don't think we need to close.",
        transcriptWords: [
          {word: "Click", confidence: 0.95, sentiment: "neutral"},
          {word: "on", confidence: 0.98, sentiment: "neutral"},
          {word: "it,", confidence: 0.97, sentiment: "neutral"},
          {word: "and", confidence: 0.96, sentiment: "neutral"},
          {word: "it", confidence: 0.94, sentiment: "neutral"},
          {word: "will", confidence: 0.92, sentiment: "neutral"},
          {word: "start", confidence: 0.89, sentiment: "positive"},
          {word: "recording,", confidence: 0.85, sentiment: "neutral"},
          {word: "providing", confidence: 0.83, sentiment: "positive"},
          {word: "some", confidence: 0.87, sentiment: "neutral"},
          {word: "feedback.", confidence: 0.91, sentiment: "positive"}
        ]
      }
    },
    
    {
      // Json2.txt - Java programming question response
      ...{
        "correctness_score": 6,
        "correctness_feedback": "The answer provides a basic idea about Java being a programming language and touches on its platform independence and support for multithreading, which are correct. However, the answer lacks depth and does not mention Java's object-oriented nature, use in building applications, or JVM (Java Virtual Machine), which are also important features.",
        "grammar_score": 5,
        "vocabulary_score": 5,
        "grammar_issues": [
          {
            "original": "hmmm.",
            "issue": "Non-standard use of 'hmmm,' which is informal and not suitable here.",
            "suggestion": "Remove 'hmmm.'"
          },
          {
            "original": "java is a progamming lanunge , it is platformi independents",
            "issue": "Incorrect spelling and grammar",
            "suggestion": "Java is a programming language; it is platform independent,"
          },
          {
            "original": "java is a scalable multhdeathreading supported language.",
            "issue": "Incorrect spelling and grammar",
            "suggestion": "Java supports scalability and multithreading."
          }
        ],
        "vocabulary_issues": [
          {
            "word": "progamming lanunge",
            "issue": "Spelling error: 'progamming lanunge' should be 'programming language'.",
            "suggestion": "programming language"
          },
          {
            "word": "platformi independents",
            "issue": "Spelling error and grammatical mistake: 'platformi independents' should be 'platform independent'.",
            "suggestion": "platform independent"
          },
          {
            "word": "multhdeathreading",
            "issue": "Spelling error: 'multhdeathreading' should be 'multithreading'.",
            "suggestion": "multithreading"
          }
        ],
        "corrected_text": "Java is a programming language; it is platform independent and supports scalability and multithreading.",
        "ai_feedback_summary": "The candidate provided a basic answer about Java but made several grammar and vocabulary errors. The response was somewhat correct but lacked detail. Corrected key vocabulary and grammar issues, including spelling mistakes in 'programming language,' 'platform independent,' and 'multithreading.' The candidate should focus on improving grammar and expanding their response with more detailed information about Java."
      },
      
      // Additional fields for demo UI functionality
      id: 2,
      type: "Speaking Assessment - Java Programming",
      timeSpent: 32,
      totalTimeOutside: 1,
      moveCount: 2,
      attempts: 1,
      confidence: { level: "MODERATE", percentage: 55 },
      audio: {
        url: null,
        duration: 32,
        transcript: "Java is a programming language; it is platform independent and supports scalability and multithreading.",
        transcriptWords: [
          {word: "Java", confidence: 0.95, sentiment: "neutral"},
          {word: "is", confidence: 0.98, sentiment: "neutral"},
          {word: "a", confidence: 0.97, sentiment: "neutral"},
          {word: "programming", confidence: 0.85, sentiment: "positive"},
          {word: "language;", confidence: 0.88, sentiment: "neutral"},
          {word: "it", confidence: 0.94, sentiment: "neutral"},
          {word: "is", confidence: 0.96, sentiment: "neutral"},
          {word: "platform", confidence: 0.82, sentiment: "positive"},
          {word: "independent", confidence: 0.79, sentiment: "positive"}
        ]
      }
    },
    
    {
      // Json3.txt - Photosynthesis question - minimal response
      ...{
        "correctness_score": 0,
        "correctness_feedback": "The answer 'I don't know' does not address the question at all as it does not provide any information or attempt to explain the process of photosynthesis. A more relevant answer should define photosynthesis, explaining how plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose.",
        "grammar_score": 10,
        "vocabulary_score": 5,
        "grammar_issues": [],
        "vocabulary_issues": [
          {
            "word": "dont",
            "issue": "Incorrect contraction missing an apostrophe",
            "suggestion": "don't"
          }
        ],
        "corrected_text": "I don't know.",
        "ai_feedback_summary": "The candidate did not attempt to answer the question about photosynthesis, which is a crucial topic in biology. It would be beneficial for the candidate to study the basic processes and terminology of photosynthesis to improve their scientific literacy."
      },
      
      // Additional fields for demo UI functionality
      id: 3,
      type: "Speaking Assessment - Biology",
      timeSpent: 8,
      totalTimeOutside: 0,
      moveCount: 0,
      attempts: 1,
      confidence: { level: "HIGH", percentage: 95 },
      audio: {
        url: null,
        duration: 8,
        transcript: "I don't know.",
        transcriptWords: [
          {word: "I", confidence: 0.99, sentiment: "neutral"},
          {word: "don't", confidence: 0.96, sentiment: "negative"},
          {word: "know.", confidence: 0.98, sentiment: "negative"}
        ]
      }
    },
    
    {
      // Json4.txt - Another photosynthesis question response
      ...{
        "correctness_score": 2,
        "correctness_feedback": "The candidate acknowledges not knowing the concept. This is not a correct or informative response.",
        "grammar_score": 8,
        "vocabulary_score": 8,
        "grammar_issues": [],
        "vocabulary_issues": [],
        "corrected_text": "I do not know the concept.",
        "ai_feedback_summary": "The candidate did not answer the question correctly, indicating a lack of understanding of the concept. They should be encouraged to learn about photosynthesis and attempt to describe it in their own words. The grammar and vocabulary are acceptable but could be improved with practice."
      },
      
      // Additional fields for demo UI functionality
      id: 4,
      type: "Speaking Assessment - Biology Concepts",
      timeSpent: 12,
      totalTimeOutside: 0,
      moveCount: 1,
      attempts: 1,
      confidence: { level: "HIGH", percentage: 90 },
      audio: {
        url: null,
        duration: 12,
        transcript: "I do not know the concept.",
        transcriptWords: [
          {word: "I", confidence: 0.99, sentiment: "neutral"},
          {word: "do", confidence: 0.98, sentiment: "neutral"},
          {word: "not", confidence: 0.97, sentiment: "negative"},
          {word: "know", confidence: 0.95, sentiment: "negative"},
          {word: "the", confidence: 0.99, sentiment: "neutral"},
          {word: "concept.", confidence: 0.93, sentiment: "neutral"}
        ]
      }
    }
  ];

  return (
    <div className={styles.demoPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Speaking Assessment Analysis - Demo</h1>
          <p>Real assessment data showcasing different response scenarios</p>
        </div>
        
        <div className={styles.questionsSection}>
          {sampleQuestions.map((questionData, index) => (
            <div key={questionData.id} className={styles.questionWrapper}>
              <SpeakingQuestionCard questionData={questionData} />
              {index < sampleQuestions.length - 1 && <hr className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeakingQuestionCardDemo;