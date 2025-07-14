import React, { useState } from 'react';
import styles from './SpeakingQuestionCard.module.css';

const SpeakingQuestionCard = ({ questionData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('none'); // 'none', 'confidence', 'sentiment'

  // Transform real API data to component format
  const transformedData = {
    // Use provided data or fallback to defaults
    id: questionData.id || 1,
    type: questionData.type || "Speaking Assessment",
    score: questionData.correctness_score || questionData.score || 0,
    maxScore: 5,
    timeSpent: questionData.timeSpent || 0,
    totalTimeOutside: questionData.totalTimeOutside || 0,
    moveCount: questionData.moveCount || 0,
    attempts: questionData.attempts || 1,
    confidence: questionData.confidence || { level: "MODERATE", percentage: 50 },
    
    audio: {
      url: questionData.audio?.url || null,
      duration: questionData.audio?.duration || 0,
      transcript: questionData.corrected_text || questionData.audio?.transcript || "",
      transcriptWords: questionData.audio?.transcriptWords || []
    },
    
    analysis: {
      fluency: {
        score: questionData.ielts_criteria?.fluency || questionData.analysis?.fluency?.score || 0,
        maxScore: 5,
        details: questionData.grammar_issues?.map(issue => 
          `${issue.issue} - Suggestion: ${issue.suggestion}`) || 
          questionData.analysis?.fluency?.details || []
      },
      lexical: {
        score: questionData.ielts_criteria?.lexical_resource || questionData.vocabulary_score || questionData.analysis?.lexical?.score || 0,
        maxScore: 5,
        details: questionData.vocabulary_issues?.map(issue => 
          `Word: "${issue.word}" - ${issue.issue} - Suggestion: ${issue.suggestion}`) || 
          questionData.analysis?.lexical?.details || []
      },
      grammar: {
        score: questionData.ielts_criteria?.grammar_range_and_accuracy || questionData.grammar_score || questionData.analysis?.grammar?.score || 0,
        maxScore: 5,
        details: questionData.grammar_issues?.map(issue => 
          `"${issue.original}" - ${issue.issue} - Suggestion: "${issue.suggestion}"`) || 
          questionData.analysis?.grammar?.details || []
      },
      pronunciation: {
        score: questionData.ielts_criteria?.pronunciation || questionData.pronunciation_score || questionData.analysis?.pronunciation?.score || 0,
        maxScore: 5,
        details: questionData.pronunciation_issues?.length > 0 
          ? questionData.pronunciation_issues.map(issue => 
              `"${issue.original}" - ${issue.issue} - Suggestion: "${issue.suggestion}"`)
          : questionData.analysis?.pronunciation?.details || ["No specific pronunciation issues identified"]
      },
      sentiment: questionData.analysis?.sentiment || "NEUTRAL",
      ielts: {
        band: questionData.ielts_band_estimate ? 
          parseFloat(questionData.ielts_band_estimate.replace('Band ', '')) : 
          questionData.analysis?.ielts?.band || 0
      }
    },
    
    evaluatorComments: questionData.ai_feedback_summary || questionData.correctness_feedback || questionData.evaluatorComments || null
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAnalysisModeChange = (mode) => {
    setAnalysisMode(mode === analysisMode ? 'none' : mode);
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return 'positive';
    if (sentiment === 'negative') return 'negative';
    return 'neutral';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return 'success';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  const getConfidenceColor = (percentage) => {
    if (percentage >= 70) return 'success';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.questionInfo}>
          <h3>Question {transformedData.id}: {transformedData.type}</h3>
        </div>
        <div className={styles.scoreInfo}>
          <div className={`${styles.scoreCard} ${styles[getScoreColor(questionData.correctness_score || transformedData.score, 5)]}`}>
            <i className="fas fa-chart-bar"></i>
            <div className={styles.scoreDetails}>
              <span className={styles.scoreLabel}>Score:</span>
              <span className={styles.scoreValue}>{questionData.correctness_score || transformedData.score}/5</span>
            </div>
          </div>
          <div className={styles.timeCard}>
            <i className="fas fa-clock"></i>
            <span>Time spent: {transformedData.timeSpent} secs</span>
          </div>
        </div>
      </div>

      {/* Additional Stats - from original design */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <i className="fas fa-external-link-alt"></i>
            <span>Total Time Spent Outside: {transformedData.totalTimeOutside} sec</span>
          </div>
          <div className={styles.statItem}>
            <i className="fas fa-mouse-pointer"></i>
            <span>Total Move Count: {transformedData.moveCount}</span>
          </div>
        </div>
      </div>

      {/* Audio Section */}
      <div className={styles.section}>
        <h4>Audio Submitted</h4>
        <div className={styles.audioPlayer}>
          <button onClick={handlePlayPause} className={styles.playButton}>
            <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
          </button>
          <div className={styles.audioInfo}>
            <span className={styles.duration}>
              <i className="fas fa-clock"></i>
              {formatTime(transformedData.audio.duration)}
            </span>
            {isPlaying && (
              <span className={styles.status}>Playing...</span>
            )}
          </div>
          <div className={styles.audioControls}>
            <button className={styles.speedButton}>
              <i className="fas fa-tachometer-alt"></i>
              1x
            </button>
          </div>
        </div>

        <div className={styles.transcriptSection}>
          <div className={styles.transcriptHeader}>
            <span className={styles.transcriptLabel}>Transcript:</span>
            <div className={styles.analysisControls}>
              <button 
                className={`${styles.analysisButton} ${analysisMode === 'confidence' ? styles.active : ''}`}
                onClick={() => handleAnalysisModeChange('confidence')}
              >
                <i className="fas fa-signal"></i>
                Confidence
              </button>
              <button 
                className={`${styles.analysisButton} ${analysisMode === 'sentiment' ? styles.active : ''}`}
                onClick={() => handleAnalysisModeChange('sentiment')}
              >
                <i className="fas fa-smile"></i>
                Sentiment
              </button>
            </div>
          </div>
          
          <div className={styles.transcriptText}>
            {analysisMode === 'confidence' && transformedData.audio.transcriptWords ? (
              transformedData.audio.transcriptWords.map((item, index) => (
                <span 
                  key={index}
                  className={`${styles.confidenceWord} ${styles[getConfidenceColor(item.confidence * 100)]}`}
                  title={`${Math.round(item.confidence * 100)}% confidence`}
                >
                  {item.word}{index < transformedData.audio.transcriptWords.length - 1 ? ' ' : ''}
                </span>
              ))
            ) : analysisMode === 'sentiment' && transformedData.audio.transcriptWords ? (
              transformedData.audio.transcriptWords.map((item, index) => (
                <span 
                  key={index}
                  className={`${styles.sentimentWord} ${styles[getSentimentColor(item.sentiment)]}`}
                  title={`${item.sentiment} sentiment`}
                >
                  {item.word}{index < transformedData.audio.transcriptWords.length - 1 ? ' ' : ''}
                </span>
              ))
            ) : (
              transformedData.audio.transcript
            )}
          </div>
        </div>
      </div>

      {/* Correctness Feedback */}
      {questionData.correctness_feedback && (
        <div className={styles.section}>
          <h4>Correctness Feedback</h4>
          <div className={styles.feedbackCard}>
            <p>{questionData.correctness_feedback}</p>
          </div>
        </div>
      )}

      {/* Assessment Summary */}
      <div className={styles.section}>
        <h4>Assessment Summary</h4>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>IELTS Band Estimate:</span>
            <span className={styles.summaryValue}>{questionData.ielts_band_estimate || 'N/A'}</span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Grammar Score:</span>
            <span className={`${styles.summaryValue} ${styles[getScoreColor(questionData.grammar_score || 0, 5)]}`}>
              {questionData.grammar_score || 0}/5
            </span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Pronunciation Score:</span>
            <span className={`${styles.summaryValue} ${styles[getScoreColor(questionData.pronunciation_score || 0, 5)]}`}>
              {questionData.pronunciation_score || 0}/5
            </span>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Vocabulary Score:</span>
            <span className={`${styles.summaryValue} ${styles[getScoreColor(questionData.vocabulary_score || 0, 5)]}`}>
              {questionData.vocabulary_score || 0}/5
            </span>
          </div>
        </div>
      </div>

      {/* IELTS Criteria Breakdown */}
      <div className={styles.section}>
        <h4>IELTS Criteria Breakdown</h4>
        <div className={styles.criteriaGrid}>
          <div className={styles.criteriaItem}>
            <span className={styles.criteriaLabel}>Fluency:</span>
            <span className={`${styles.criteriaScore} ${styles[getScoreColor(questionData.ielts_criteria?.fluency || 0, 5)]}`}>
              {questionData.ielts_criteria?.fluency || 0}/5
            </span>
          </div>
          <div className={styles.criteriaItem}>
            <span className={styles.criteriaLabel}>Lexical Resource:</span>
            <span className={`${styles.criteriaScore} ${styles[getScoreColor(questionData.ielts_criteria?.lexical_resource || 0, 5)]}`}>
              {questionData.ielts_criteria?.lexical_resource || 0}/5
            </span>
          </div>
          <div className={styles.criteriaItem}>
            <span className={styles.criteriaLabel}>Grammar Range & Accuracy:</span>
            <span className={`${styles.criteriaScore} ${styles[getScoreColor(questionData.ielts_criteria?.grammar_range_and_accuracy || 0, 5)]}`}>
              {questionData.ielts_criteria?.grammar_range_and_accuracy || 0}/5
            </span>
          </div>
          <div className={styles.criteriaItem}>
            <span className={styles.criteriaLabel}>Pronunciation:</span>
            <span className={`${styles.criteriaScore} ${styles[getScoreColor(questionData.ielts_criteria?.pronunciation || 0, 5)]}`}>
              {questionData.ielts_criteria?.pronunciation || 0}/5
            </span>
          </div>
        </div>
      </div>

      {/* Issues Analysis */}
      {(questionData.grammar_issues?.length > 0 || questionData.vocabulary_issues?.length > 0) && (
        <div className={styles.section}>
          <h4>Issues Analysis</h4>
          <div className={styles.issuesContainer}>
            {questionData.grammar_issues && questionData.grammar_issues.map((issue, index) => (
              <div key={`grammar-${index}`} className={styles.issueCard}>
                <div className={styles.issueType}>Grammar Issue</div>
                <div className={styles.issueOriginal}>
                  <strong>Original:</strong> "{issue.original}"
                </div>
                <div className={styles.issueDescription}>
                  <strong>Issue:</strong> {issue.issue}
                </div>
                <div className={styles.issueSuggestion}>
                  <strong>Suggestion:</strong> "{issue.suggestion}"
                </div>
              </div>
            ))}
            {questionData.vocabulary_issues && questionData.vocabulary_issues.map((issue, index) => (
              <div key={`vocabulary-${index}`} className={styles.issueCard}>
                <div className={styles.issueType}>Vocabulary Issue</div>
                <div className={styles.issueOriginal}>
                  <strong>Problematic phrase:</strong> "{issue.word}"
                </div>
                <div className={styles.issueDescription}>
                  <strong>Issue:</strong> {issue.issue}
                </div>
                <div className={styles.issueSuggestion}>
                  <strong>Suggestion:</strong> "{issue.suggestion}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Corrected Text */}
      {questionData.corrected_text && (
        <div className={styles.section}>
          <h4>Corrected Text</h4>
          <div className={styles.correctedTextCard}>
            <p>"{questionData.corrected_text}"</p>
          </div>
        </div>
      )}

      {/* AI Feedback Summary */}
      {(questionData.ai_feedback_summary || transformedData.evaluatorComments) && (
        <div className={styles.section}>
          <h4>AI Feedback Summary</h4>
          <div className={styles.commentsCard}>
            <p>{questionData.ai_feedback_summary || transformedData.evaluatorComments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakingQuestionCard;